import StatusCodes from 'http-status-codes'

import { createJWT } from 'auth-microservice/dist/lib/jwt'
import pirates from 'game-engine/dist/assets/races/pirates'
import UNIVERSE_TEST_MOCK from 'game-engine/dist/test/mocks/universeMocks'
import raceRepository from 'game-engine/dist/repositories/raceRepository'
import taskRepository from 'game-engine/dist/repositories/taskRepository'
import universeRepository from 'game-engine/dist/repositories/universeRepository'
import { NEW_PLAYER_TASK_TYPE, PENDING_TASK_STATUS } from 'game-engine/dist/types/ITask'
import { PLAYER_TEST_1_PIRATE } from 'game-engine/dist/test/mocks/playerMocks'

import { testServer } from './helpers/testServer'

describe('players task', () => {
  it('creates a new valid player task', async () => {
    const newPlayerData = {
      raceName: pirates.name,
      universeName: UNIVERSE_TEST_MOCK.name
    }

    const universe = await universeRepository.findUniverseByName(UNIVERSE_TEST_MOCK.name)

    const userData = {
      username: 'new_test_username',
      email: 'new_test_user@email.com',
      isActivated: true,
      isAdmin: false,
      isBanned: false
    }

    const authHeader = `Bearer ${createJWT(userData)}`

    expect(
      await taskRepository.findNewPlayerTaskByUsername(userData.username, universe!._id)
    ).toBeNull()

    const response = await testServer.server.inject({
      method: 'POST',
      url: '/player',
      headers: { authorization: authHeader },
      body: newPlayerData
    })

    const { task: taskCreated } = JSON.parse(response.body)

    expect(response.statusCode).toEqual(StatusCodes.CREATED)
    expect(taskCreated.type).toEqual(NEW_PLAYER_TASK_TYPE)
    expect(taskCreated.status).toEqual(PENDING_TASK_STATUS)

    const race = await raceRepository.findRaceByName(pirates.name)

    expect(taskCreated.data.username).toEqual(userData.username)
    expect(taskCreated.data.email).toEqual(userData.email)
    expect(taskCreated.data.race).toEqual(race!._id.toString())

    const newPlayerTask = await taskRepository.findNewPlayerTaskByUsername(
      userData.username,
      universe!._id
    )

    expect(newPlayerTask?.data.username).toBe(userData.username)
  })

  it('returns a conflict error if user is not activated', async () => {
    const newPlayerData = {
      raceName: pirates.name,
      universeName: UNIVERSE_TEST_MOCK.name
    }

    const userData = {
      username: 'new_test_username',
      email: 'new_test_user@email.com',
      isActivated: false,
      isAdmin: false,
      isBanned: false
    }

    const authHeader = `Bearer ${createJWT(userData)}`

    const universe = await universeRepository.findUniverseByName(UNIVERSE_TEST_MOCK.name)

    expect(
      await taskRepository.findNewPlayerTaskByUsername(userData.username, universe!._id)
    ).toBeNull()

    const response = await testServer.server.inject({
      method: 'POST',
      url: '/player',
      headers: { authorization: authHeader },
      body: newPlayerData
    })

    expect(response.statusCode).toEqual(StatusCodes.CONFLICT)
    expect(
      await taskRepository.findNewPlayerTaskByUsername(userData.username, universe!._id)
    ).toBeNull()
  })

  it('returns a not found error if race is invalid', async () => {
    const newPlayerData = {
      raceName: 'Invalid race',
      universeName: UNIVERSE_TEST_MOCK.name
    }

    const userData = {
      username: 'new_test_username',
      email: 'new_test_user@email.com',
      isActivated: true,
      isAdmin: false,
      isBanned: false
    }

    const universe = await universeRepository.findUniverseByName(UNIVERSE_TEST_MOCK.name)

    const authHeader = `Bearer ${createJWT(userData)}`

    expect(
      await taskRepository.findNewPlayerTaskByUsername(userData.username, universe!._id)
    ).toBeNull()

    const response = await testServer.server.inject({
      method: 'POST',
      url: '/player',
      headers: { authorization: authHeader },
      body: newPlayerData
    })

    expect(response.statusCode).toEqual(StatusCodes.NOT_FOUND)
    expect(
      await taskRepository.findNewPlayerTaskByUsername(userData.username, universe!._id)
    ).toBeNull()
  })

  it('returns a not found error if universe is invalid', async () => {
    const newPlayerData = {
      raceName: pirates.name,
      universeName: 'invalid universe'
    }

    const userData = {
      username: 'new_test_username',
      email: 'new_test_user@email.com',
      isActivated: true,
      isAdmin: false,
      isBanned: false
    }

    const universe = await universeRepository.findUniverseByName(UNIVERSE_TEST_MOCK.name)

    const authHeader = `Bearer ${createJWT(userData)}`

    expect(
      await taskRepository.findNewPlayerTaskByUsername(userData.username, universe!._id)
    ).toBeNull()

    const response = await testServer.server.inject({
      method: 'POST',
      url: '/player',
      headers: { authorization: authHeader },
      body: newPlayerData
    })

    expect(response.statusCode).toEqual(StatusCodes.NOT_FOUND)
    expect(
      await taskRepository.findNewPlayerTaskByUsername(userData.username, universe!._id)
    ).toBeNull()
  })

  it('returns a conflict error if a player is already created', async () => {
    const newPlayerData = {
      raceName: pirates.name,
      universeName: UNIVERSE_TEST_MOCK.name
    }

    const userData = {
      username: PLAYER_TEST_1_PIRATE.user.username,
      email: 'new_test_user@email.com',
      isActivated: true,
      isAdmin: false,
      isBanned: false
    }

    const universe = await universeRepository.findUniverseByName(UNIVERSE_TEST_MOCK.name)

    const authHeader = `Bearer ${createJWT(userData)}`

    expect(
      await taskRepository.findNewPlayerTaskByUsername(userData.username, universe!._id)
    ).toBeNull()

    const response = await testServer.server.inject({
      method: 'POST',
      url: '/player',
      headers: { authorization: authHeader },
      body: newPlayerData
    })

    expect(response.statusCode).toEqual(StatusCodes.CONFLICT)
    expect(
      await taskRepository.findNewPlayerTaskByUsername(userData.username, universe!._id)
    ).toBeNull()
  })

  it('returns a conflict error if a task player is already created', async () => {
    const newPlayerData = {
      raceName: pirates.name,
      universeName: UNIVERSE_TEST_MOCK.name
    }

    const userData = {
      username: 'new_test_username',
      email: 'new_test_user@email.com',
      isActivated: true,
      isAdmin: false,
      isBanned: false
    }

    const universe = await universeRepository.findUniverseByName(UNIVERSE_TEST_MOCK.name)

    const authHeader = `Bearer ${createJWT(userData)}`

    expect(
      await taskRepository.findNewPlayerTaskByUsername(userData.username, universe!._id)
    ).toBeNull()

    const response = await testServer.server.inject({
      method: 'POST',
      url: '/player',
      headers: { authorization: authHeader },
      body: newPlayerData
    })

    // Task created
    expect(response.statusCode).toEqual(StatusCodes.CREATED)
    expect(
      await taskRepository.findNewPlayerTaskByUsername(userData.username, universe!._id)
    ).not.toBeNull()

    const duplicatedResponse = await testServer.server.inject({
      method: 'POST',
      url: '/player',
      headers: { authorization: authHeader },
      body: newPlayerData
    })

    // duplicated task error
    expect(duplicatedResponse.statusCode).toEqual(StatusCodes.CONFLICT)
  })
})
