import StatusCodes from 'http-status-codes'

import UserModel from '../models/UserModel'
import * as emailLib from '../lib/email'
import { testServer } from './testSetup'
import { ACTIVE_USER } from './mocks/userMocks'
import { validateHash } from '../lib/encrypt'

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
})
