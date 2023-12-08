import StatusCodes from 'http-status-codes'

import UserModel from '../models/UserModel'
import * as emailLib from '../lib/email'
import { testServer } from './testSetup'
import { ACTIVE_USER, BANNED_USER, UNCONFIRMED_USER } from './mocks/userMocks'
import { validateHash } from '../lib/encrypt'
import { createJWT } from '../lib/jwt'
import { CleanUserData } from '../utils/cleanUserFields'

describe('users', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('user creation', () => {
    it('creates a new valid user', async () => {
      const newUserData = {
        email: 'new-user@example.com',
        password: 'secret',
        username: 'newUser'
      }

      expect(emailLib.sendEmail).not.toHaveBeenCalled()

      const response = await testServer.server.inject({
        method: 'POST',
        url: '/user',
        body: newUserData
      })

      expect(response.statusCode).toEqual(StatusCodes.CREATED)

      // a new email is sent
      expect(emailLib.sendEmail).toHaveBeenCalled()

      const newUser = await UserModel.findOne({
        username: newUserData.username
      })

      // new user is present in the database
      expect(newUser?.email).toEqual(newUserData.email)
      expect(newUser?.username).toEqual(newUserData.username)

      // correct hashed password is stored in the database
      expect(await validateHash(newUserData.password, newUser?.password as string)).toBe(true)
    })

    it('returns an error if the username already exists', async () => {
      const duplicatedUserData = {
        email: 'duplicated-user@example.com',
        password: 'secret',
        username: ACTIVE_USER.username // duplicated username
      }

      expect(emailLib.sendEmail).not.toHaveBeenCalled()

      const response = await testServer.server.inject({
        method: 'POST',
        url: '/user',
        body: duplicatedUserData
      })

      // no email is sent
      expect(emailLib.sendEmail).not.toHaveBeenCalled()
      expect(response.statusCode).toEqual(StatusCodes.CONFLICT)

      // duplicated user is not present in the database
      const newDuplicatedUser = await UserModel.findOne({
        email: duplicatedUserData.email
      })

      expect(newDuplicatedUser).toBeNull()
    })

    it('returns an error if the email already exists', async () => {
      const duplicatedUserData = {
        email: ACTIVE_USER.email, // duplicated email
        password: 'secret',
        username: 'duplicated'
      }

      expect(emailLib.sendEmail).not.toHaveBeenCalled()

      const response = await testServer.server.inject({
        method: 'POST',
        url: '/user',
        body: duplicatedUserData
      })

      // no email is sent
      expect(emailLib.sendEmail).not.toHaveBeenCalled()
      expect(response.statusCode).toEqual(StatusCodes.CONFLICT)

      // duplicated user is not present in the database
      const newDuplicatedUser = await UserModel.findOne({
        username: duplicatedUserData.username
      })

      expect(newDuplicatedUser).toBeNull()
    })
  })

  describe('user activation', () => {
    it('activates a new user', async () => {
      const unconfirmedUser = await UserModel.findOne({
        username: UNCONFIRMED_USER.username
      })

      expect(unconfirmedUser?.isActivated).toBe(false)

      // activate user
      const response = await testServer.server.inject({
        method: 'POST',
        url: '/user/activate',
        body: {
          activationCode: UNCONFIRMED_USER.activationCode
        }
      })

      expect(response.statusCode).toEqual(StatusCodes.OK)

      const activatedUser = await UserModel.findOne({
        username: UNCONFIRMED_USER.username
      })

      expect(activatedUser?.isActivated).toBe(true)
    })

    it('returns a conflict error if the user is already validated', async () => {
      const user = await UserModel.findOne({
        username: ACTIVE_USER.username
      })

      // already activated
      expect(user?.isActivated).toBe(true)

      // activate user
      const response = await testServer.server.inject({
        method: 'POST',
        url: '/user/activate',
        body: {
          activationCode: ACTIVE_USER.activationCode
        }
      })

      expect(response.statusCode).toEqual(StatusCodes.CONFLICT)
    })

    it('returns a not found error if the activationCode is invalid', async () => {
      // activate user
      const response = await testServer.server.inject({
        method: 'POST',
        url: '/user/activate',
        body: {
          activationCode: 'invalid-activation-code'
        }
      })

      expect(response.statusCode).toEqual(StatusCodes.NOT_FOUND)
    })
  })

  describe('user login', () => {
    it('creates a user session with valid credentials', async () => {
      const response = await testServer.server.inject({
        method: 'POST',
        url: '/user/session',
        body: {
          email: ACTIVE_USER.email,
          password: 'secret' // valid user password
        }
      })

      const { sessionToken } = JSON.parse(response.body)

      expect(response.statusCode).toEqual(StatusCodes.OK)
      expect(sessionToken).toBeDefined()
    })

    it('returns unauthorized error with invalid credentials', async () => {
      const response = await testServer.server.inject({
        method: 'POST',
        url: '/user/session',
        body: {
          email: ACTIVE_USER.email,
          password: 'invalid secret' // invalid user password
        }
      })

      const { sessionToken } = JSON.parse(response.body)

      expect(response.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
      expect(sessionToken).not.toBeDefined()
    })

    it('returns forbidden error if user is not activated', async () => {
      const response = await testServer.server.inject({
        method: 'POST',
        url: '/user/session',
        body: {
          email: UNCONFIRMED_USER.email,
          password: 'secret' // valid user password
        }
      })

      const { sessionToken } = JSON.parse(response.body)

      expect(response.statusCode).toEqual(StatusCodes.FORBIDDEN)
      expect(sessionToken).not.toBeDefined()
    })

    it('returns forbidden error if user is banned', async () => {
      const response = await testServer.server.inject({
        method: 'POST',
        url: '/user/session',
        body: {
          email: BANNED_USER.email,
          password: 'secret' // valid user password
        }
      })

      const { sessionToken } = JSON.parse(response.body)

      expect(response.statusCode).toEqual(StatusCodes.FORBIDDEN)
      expect(sessionToken).not.toBeDefined()
    })
  })

  describe('get user', () => {
    it('returns user data with a valid session', async () => {
      const jwtToken = createJWT(ACTIVE_USER)

      const response = await testServer.server.inject({
        method: 'GET',
        url: '/user',
        headers: {
          authorization: `Bearer ${jwtToken}`
        }
      })

      expect(response.statusCode).toEqual(StatusCodes.OK)

      const { username, email } = JSON.parse(response.body)

      expect(username).toEqual(ACTIVE_USER.username)
      expect(email).toEqual(ACTIVE_USER.email)
    })

    it('returns unauthorized error if the token is not valid', async () => {
      const invalidJwtToken = 'this is an invalid token'

      const response = await testServer.server.inject({
        method: 'GET',
        url: '/user',
        headers: {
          authorization: invalidJwtToken
        }
      })

      expect(response.statusCode).toEqual(StatusCodes.UNAUTHORIZED)

      const { username, email } = JSON.parse(response.body)

      expect(username).not.toBeDefined()
      expect(email).not.toBeDefined()
    })

    it('returns a not found error if the user not exist', async () => {
      const jwtToken = createJWT({
        username: 'invalid user',
        email: 'invalid_email@example.com'
      } as CleanUserData)

      const response = await testServer.server.inject({
        method: 'GET',
        url: '/user',
        headers: {
          authorization: `Bearer ${jwtToken}`
        }
      })

      expect(response.statusCode).toEqual(StatusCodes.NOT_FOUND)

      const { username, email } = JSON.parse(response.body)

      expect(username).not.toBeDefined()
      expect(email).not.toBeDefined()
    })

    it('returns a forbidden error if the user not activated', async () => {
      const jwtToken = createJWT(UNCONFIRMED_USER)

      const response = await testServer.server.inject({
        method: 'GET',
        url: '/user',
        headers: {
          authorization: `Bearer ${jwtToken}`
        }
      })

      expect(response.statusCode).toEqual(StatusCodes.FORBIDDEN)

      const { username, email } = JSON.parse(response.body)

      expect(username).not.toBeDefined()
      expect(email).not.toBeDefined()
    })

    it('returns a forbidden error if the user is banned', async () => {
      const jwtToken = createJWT(BANNED_USER)

      const response = await testServer.server.inject({
        method: 'GET',
        url: '/user',
        headers: {
          authorization: `Bearer ${jwtToken}`
        }
      })

      expect(response.statusCode).toEqual(StatusCodes.FORBIDDEN)

      const { username, email } = JSON.parse(response.body)

      expect(username).not.toBeDefined()
      expect(email).not.toBeDefined()
    })
  })
})
