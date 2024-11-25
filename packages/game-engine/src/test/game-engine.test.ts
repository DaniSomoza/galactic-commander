import mongoose from 'mongoose'
import processUniverse from '../engine/processUniverse'
import getSecond from '../helpers/getSecond'
import getTaskModel from '../models/TaskModel'
import universeRepository from '../repositories/universeRepository'
import UNIVERSE_TEST_MOCK from './mocks/universeMocks'
import { TASK_HANDLER } from '../engine/tasks/taskHandlers'
import taskRepository from '../repositories/taskRepository'
import GameEngineError from '../engine/errors/GameEngineError'
import {
  ERROR_TASK_STATUS,
  ITask,
  NEW_PLAYER_TASK_TYPE,
  NewPlayerTaskType,
  PENDING_TASK_STATUS,
  PROCESSED_TASK_STATUS
} from '../types/ITask'

const originalHandler = TASK_HANDLER[NEW_PLAYER_TASK_TYPE].handler

describe('game-engine', () => {
  beforeEach(() => {
    TASK_HANDLER[NEW_PLAYER_TASK_TYPE].handler = jest.fn()
  })

  afterEach(() => {
    TASK_HANDLER[NEW_PLAYER_TASK_TYPE].handler = originalHandler
    jest.restoreAllMocks()
  })

  it('sets universe as processed', async () => {
    const testUniverse = await universeRepository.findUniverseByName(UNIVERSE_TEST_MOCK.name)

    expect(testUniverse?.isProcessingInProgress).toBe(false)

    const timestamp = new Date().getTime()
    const currentSecond = getSecond(timestamp)

    await processUniverse(testUniverse!)

    const testUniverseProcessed = await universeRepository.findUniverseByName(
      UNIVERSE_TEST_MOCK.name
    )

    expect(testUniverseProcessed?.isProcessingInProgress).toBe(false)
    expect(testUniverseProcessed?.lastProcessedTime).toBe(currentSecond)
  })

  it('process a valid task', async () => {
    const testUniverse = await universeRepository.findUniverseByName(UNIVERSE_TEST_MOCK.name)

    const fakeTaskHandler = jest.fn()
    TASK_HANDLER[NEW_PLAYER_TASK_TYPE].handler = fakeTaskHandler

    const fakeTask = createFakeTask(testUniverse!._id)

    const taskModel = getTaskModel<NewPlayerTaskType>()
    await taskModel.create(fakeTask)

    const timestamp = new Date().getTime()
    const currentSecond = getSecond(timestamp)

    const tasks = await taskRepository.getPendingTasks(testUniverse!._id, currentSecond)

    const testTask = tasks[0]

    expect(testTask.status).toBe(PENDING_TASK_STATUS)
    expect(testTask.isCancellable).toBe(false)
    expect(testTask.processingDuration).toBeNull()
    expect(testTask.processedAt).toBeNull()
    expect(fakeTaskHandler).not.toHaveBeenCalled()

    await processUniverse(testUniverse!)

    const tasksProcessed = await taskRepository.findTaskById(testTask._id)

    expect(fakeTaskHandler).toHaveBeenCalled()
    expect(tasksProcessed!.status).toBe(PROCESSED_TASK_STATUS)
    expect(tasksProcessed!.isCancellable).toBe(false)
    expect(tasksProcessed!.processingDuration).toBeGreaterThanOrEqual(0)
    expect(tasksProcessed!.processedAt).toBe(UNIVERSE_TEST_MOCK.lastProcessedTime)
    expect(tasksProcessed!.errorDetails).toBeNull()
  })

  it('process an invalid task', async () => {
    const testUniverse = await universeRepository.findUniverseByName(UNIVERSE_TEST_MOCK.name)

    const fakeTaskHandler = jest.fn().mockImplementation(() => {
      throw new GameEngineError('test invalid Task')
    })

    TASK_HANDLER[NEW_PLAYER_TASK_TYPE].handler = fakeTaskHandler

    const fakeTask = createFakeTask(testUniverse!._id)

    const taskModel = getTaskModel<NewPlayerTaskType>()
    await taskModel.create(fakeTask)

    const timestamp = new Date().getTime()
    const currentSecond = getSecond(timestamp)

    const tasks = await taskRepository.getPendingTasks(testUniverse!._id, currentSecond)

    const testTask = tasks[0]

    expect(testTask.status).toBe(PENDING_TASK_STATUS)
    expect(testTask.isCancellable).toBe(false)
    expect(testTask.processingDuration).toBeNull()
    expect(testTask.processedAt).toBeNull()

    await processUniverse(testUniverse!)

    const tasksProcessed = await taskRepository.findTaskById(testTask._id)

    expect(tasksProcessed!.status).toBe(ERROR_TASK_STATUS)
    expect(tasksProcessed!.isCancellable).toBe(false)
    expect(tasksProcessed!.processingDuration).toBeGreaterThanOrEqual(0)
    expect(tasksProcessed!.processedAt).toBe(UNIVERSE_TEST_MOCK.lastProcessedTime)
    expect(tasksProcessed!.errorDetails).toBe('test invalid Task')
  })
})

function createFakeTask(universeId: mongoose.Types.ObjectId) {
  const newFakeTask: ITask<NewPlayerTaskType> = {
    type: NEW_PLAYER_TASK_TYPE,
    universe: universeId,
    data: {
      username: 'fake_test',
      email: 'fake_test@email.com',
      race: new mongoose.Types.ObjectId()
    },

    status: PENDING_TASK_STATUS,
    isCancellable: false,

    executeTaskAt: null,
    processedAt: null,
    processingDuration: null,

    history: [
      {
        taskStatus: PENDING_TASK_STATUS,
        updatedAt: new Date().getTime()
      }
    ],

    errorDetails: null
  }

  return newFakeTask
}
