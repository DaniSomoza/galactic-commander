import mongoose from 'mongoose'
import getTaskModel, {
  ITask,
  NewPlayerTaskType,
  NEW_PLAYER_TASK_TYPE,
  PENDING_TASK_STATUS,
  TaskType
} from '../models/TaskModel'

async function getPendingTasksByUniverse(universeId: mongoose.Types.ObjectId, second: number) {
  const taskModel = getTaskModel<TaskType>()
  return taskModel
    .find({
      status: PENDING_TASK_STATUS,
      universe: universeId,
      $or: [{ executeTaskAt: { $lt: second } }, { executeTaskAt: null }]
    })
    .exec()
}

async function createPlayerTask(taskData: ITask<NewPlayerTaskType>) {
  const NewPlayerTaskModel = getTaskModel<NewPlayerTaskType>()
  const newPlayerTask = new NewPlayerTaskModel(taskData)
  return newPlayerTask.save()
}

async function findNewPlayerTaskByUsername(username: string) {
  const NewPlayerTaskModel = getTaskModel<NewPlayerTaskType>()
  return NewPlayerTaskModel.findOne({
    type: NEW_PLAYER_TASK_TYPE,
    'data.username': username
  }).exec()
}

async function findTaskById(taskId: mongoose.Types.ObjectId) {
  const NewPlayerTaskModel = getTaskModel<NewPlayerTaskType>()
  return NewPlayerTaskModel.findById(taskId).exec()
}

const taskRepository = {
  findTaskById,
  createPlayerTask,
  getPendingTasksByUniverse,
  findNewPlayerTaskByUsername
}

export default taskRepository
