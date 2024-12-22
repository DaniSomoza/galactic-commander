import mongoose from 'mongoose'

import getTaskModel from '../models/TaskModel'
import {
  ITask,
  NEW_PLAYER_TASK_TYPE,
  NewPlayerTaskType,
  PENDING_TASK_STATUS,
  StartBuildUnitsTaskType,
  StartResearchTaskType,
  TaskType
} from '../types/ITask'

async function getPendingTasks(universeId: mongoose.Types.ObjectId, second: number) {
  const taskModel = getTaskModel<TaskType>()
  return taskModel
    .find({
      status: PENDING_TASK_STATUS,
      universeId,
      $or: [{ executeTaskAt: { $lt: second } }, { executeTaskAt: null }]
    })
    .exec()
}

async function getPendingTasksByType(
  universeId: mongoose.Types.ObjectId,
  second: number,
  type: TaskType
) {
  const taskModel = getTaskModel<TaskType>()
  return taskModel
    .find({
      status: PENDING_TASK_STATUS,
      universeId,
      type,
      $or: [{ executeTaskAt: { $lt: second } }, { executeTaskAt: null }]
    })
    .exec()
}

async function createPlayerTask(taskData: ITask<NewPlayerTaskType>) {
  const NewPlayerTaskModel = getTaskModel<NewPlayerTaskType>()
  const newPlayerTask = new NewPlayerTaskModel(taskData)
  return newPlayerTask.save()
}

async function createStartResearchTask(taskData: ITask<StartResearchTaskType>) {
  const newStartResearchTaskModel = getTaskModel<StartResearchTaskType>()
  const newStartResearchTask = new newStartResearchTaskModel(taskData)
  return newStartResearchTask.save()
}

async function createStartBuildUnitsTask(taskData: ITask<StartBuildUnitsTaskType>) {
  const newStartBuildUnitsTaskModel = getTaskModel<StartBuildUnitsTaskType>()
  const newStartBuildUnitsTask = new newStartBuildUnitsTaskModel(taskData)
  return newStartBuildUnitsTask.save()
}

async function findNewPlayerTaskByUsername(
  username: string,
  universeId: mongoose.Types.ObjectId,
  status = PENDING_TASK_STATUS
) {
  const NewPlayerTaskModel = getTaskModel<NewPlayerTaskType>()
  return NewPlayerTaskModel.findOne({
    type: NEW_PLAYER_TASK_TYPE,
    'data.username': username,
    universeId,
    status
  }).exec()
}

async function findTaskById<Type extends TaskType>(taskId: mongoose.Types.ObjectId) {
  const NewPlayerTaskModel = getTaskModel<Type>()
  return NewPlayerTaskModel.findById(taskId).exec()
}

const taskRepository = {
  findTaskById,
  createPlayerTask,
  createStartResearchTask,
  createStartBuildUnitsTask,
  getPendingTasks,
  getPendingTasksByType,
  findNewPlayerTaskByUsername
}

export default taskRepository
