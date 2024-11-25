import StatusCodes from 'http-status-codes'

import { createJWT } from 'auth-microservice/dist/lib/jwt'
import PIRATE_FLEET_ATTACK_RESEARCH from 'game-engine/dist/assets/researches/pirates/pirate-fleet-attack-research'
import UNIVERSE_TEST_MOCK from 'game-engine/dist/test/mocks/universeMocks'
import universeRepository from 'game-engine/dist/repositories/universeRepository'
import taskRepository from 'game-engine/dist/repositories/taskRepository'
import playerRepository from 'game-engine/dist/repositories/playerRepository'
import {
  START_RESEARCH_TASK_TYPE,
  PENDING_TASK_STATUS,
  StartResearchTaskType
} from 'game-engine/dist/types/ITask'
import { PLAYER_TEST_1_PIRATE } from 'game-engine/dist/test/mocks/playerMocks'

import { testServer } from './helpers/testServer'
import getSecond from 'game-engine/dist/helpers/getSecond'

describe('researches task', () => {
  it('creates a new valid research task', async () => {
    const newResearchData = {
      researchName: PIRATE_FLEET_ATTACK_RESEARCH.name,
      universeName: UNIVERSE_TEST_MOCK.name
    }

    const universe = await universeRepository.findUniverseByName(UNIVERSE_TEST_MOCK.name)
    const player = await playerRepository.findPlayerByUsername(
      PLAYER_TEST_1_PIRATE.user.username,
      universe!._id
    )

    const raceResearches = player!.race.researches
    const research = raceResearches.find(
      (research) => research.name === PIRATE_FLEET_ATTACK_RESEARCH.name
    )

    const userData = {
      username: PLAYER_TEST_1_PIRATE.user.username,
      email: PLAYER_TEST_1_PIRATE.user.email,
      isActivated: true,
      isAdmin: false,
      isBanned: false
    }

    const authHeader = `Bearer ${createJWT(userData)}`

    const response = await testServer.server.inject({
      method: 'POST',
      url: '/research',
      headers: { authorization: authHeader },
      body: newResearchData
    })

    const { task: taskCreated } = JSON.parse(response.body)

    expect(response.statusCode).toEqual(StatusCodes.CREATED)
    expect(taskCreated.type).toEqual(START_RESEARCH_TASK_TYPE)
    expect(taskCreated.universe).toEqual(universe!.id.toString())
    expect(taskCreated.status).toEqual(PENDING_TASK_STATUS)
    expect(taskCreated.data.player).toEqual(player?._id.toString())
    expect(taskCreated.data.research).toEqual(research?._id.toString())
    expect(taskCreated.isCancellable).toEqual(false)
    expect(taskCreated.executeTaskAt).toEqual(null)
    expect(taskCreated.processedAt).toEqual(null)

    const newStartResearchTask = await taskRepository.findTaskById<StartResearchTaskType>(
      taskCreated.taskId
    )

    expect(newStartResearchTask?.type).toEqual(START_RESEARCH_TASK_TYPE)
    expect(newStartResearchTask?.status).toEqual(PENDING_TASK_STATUS)
    expect(newStartResearchTask?.data.player).toEqual(player?._id)
    expect(newStartResearchTask?.data.research).toEqual(research?._id)
    expect(newStartResearchTask?.isCancellable).toEqual(false)
    expect(newStartResearchTask?.executeTaskAt).toEqual(null)
    expect(newStartResearchTask?.processedAt).toEqual(null)
  })

  it('creates a new valid research task using scheduleAt', async () => {
    const executeTaskAt = getSecond(new Date().getTime() + 10_000)

    const newResearchData = {
      researchName: PIRATE_FLEET_ATTACK_RESEARCH.name,
      universeName: UNIVERSE_TEST_MOCK.name,
      executeTaskAt
    }

    const userData = {
      username: PLAYER_TEST_1_PIRATE.user.username,
      email: PLAYER_TEST_1_PIRATE.user.email,
      isActivated: true,
      isAdmin: false,
      isBanned: false
    }

    const authHeader = `Bearer ${createJWT(userData)}`

    const response = await testServer.server.inject({
      method: 'POST',
      url: '/research',
      headers: { authorization: authHeader },
      body: newResearchData
    })

    const { task: taskCreated } = JSON.parse(response.body)

    expect(response.statusCode).toEqual(StatusCodes.CREATED)
    expect(taskCreated.type).toEqual(START_RESEARCH_TASK_TYPE)
    expect(taskCreated.status).toEqual(PENDING_TASK_STATUS)
    expect(taskCreated.executeTaskAt).toEqual(executeTaskAt)
  })

  it('returns error for invalid players', async () => {
    const newResearchData = {
      researchName: PIRATE_FLEET_ATTACK_RESEARCH.name,
      universeName: UNIVERSE_TEST_MOCK.name
    }

    const userData = {
      username: 'invalid_player',
      email: PLAYER_TEST_1_PIRATE.user.email,
      isActivated: true,
      isAdmin: false,
      isBanned: false
    }

    const authHeader = `Bearer ${createJWT(userData)}`

    const response = await testServer.server.inject({
      method: 'POST',
      url: '/research',
      headers: { authorization: authHeader },
      body: newResearchData
    })

    const error = JSON.parse(response.body)

    expect(response.statusCode).toEqual(StatusCodes.NOT_FOUND)
    expect(error.error).toEqual('invalid player')
  })

  it('returns error for invalid research', async () => {
    const newResearchData = {
      researchName: 'invalid_research',
      universeName: UNIVERSE_TEST_MOCK.name
    }

    const userData = {
      username: PLAYER_TEST_1_PIRATE.user.username,
      email: PLAYER_TEST_1_PIRATE.user.email,
      isActivated: true,
      isAdmin: false,
      isBanned: false
    }

    const authHeader = `Bearer ${createJWT(userData)}`

    const response = await testServer.server.inject({
      method: 'POST',
      url: '/research',
      headers: { authorization: authHeader },
      body: newResearchData
    })

    const error = JSON.parse(response.body)

    expect(response.statusCode).toEqual(StatusCodes.NOT_FOUND)
    expect(error.error).toEqual('invalid research')
  })

  it('returns an error when the scheduleAt time is a past date', async () => {
    const pastDateTime = new Date().getTime() - 10_000

    const newResearchData = {
      researchName: PIRATE_FLEET_ATTACK_RESEARCH.name,
      universeName: UNIVERSE_TEST_MOCK.name,
      executeTaskAt: pastDateTime
    }

    const userData = {
      username: PLAYER_TEST_1_PIRATE.user.username,
      email: PLAYER_TEST_1_PIRATE.user.email,
      isActivated: true,
      isAdmin: false,
      isBanned: false
    }

    const authHeader = `Bearer ${createJWT(userData)}`

    const response = await testServer.server.inject({
      method: 'POST',
      url: '/research',
      headers: { authorization: authHeader },
      body: newResearchData
    })

    const error = JSON.parse(response.body)

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(error.error).toEqual('invalid schedule')
  })
})
