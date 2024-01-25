import mongoose from 'mongoose'
import getTaskModel, {
  ITask,
  NewPlayerTaskType,
  NEW_PLAYER_TASK_TYPE,
  PENDING_TASK_STATUS,
  TaskType,
  StartResearchTaskType
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

async function createStartResearchTask(taskData: ITask<StartResearchTaskType>) {
  const NewPlayerTaskModel = getTaskModel<StartResearchTaskType>()
  const newPlayerTask = new NewPlayerTaskModel(taskData)
  return newPlayerTask.save()
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
    universe: universeId,
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
  getPendingTasksByUniverse,
  findNewPlayerTaskByUsername
}

export default taskRepository
