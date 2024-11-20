import mongoose from 'mongoose'

import taskRepository from 'game-engine/dist/repositories/taskRepository'
import NotFoundError from 'auth-microservice/dist/errors/NotFoundError'

import { getTaskResponseType } from '../types/Task'
import cleanTaskFields from '../utils/cleanTaskFields'

async function getTask(taskId: string): Promise<getTaskResponseType> {
  const objectId = new mongoose.Types.ObjectId(taskId)
  const task = await taskRepository.findTaskById(objectId)

  if (!task) {
    throw new NotFoundError('invalid task', { taskId })
  }

  return { task: cleanTaskFields(task) }
}

const taskService = {
  getTask
}

export default taskService
