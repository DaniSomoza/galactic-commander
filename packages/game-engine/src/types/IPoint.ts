import mongoose from 'mongoose'

import { IPlayer } from './IPlayer'
import { ITask, TaskType } from './ITask'

type IPointType = 'Unit' | 'Research' | 'Battle'

export interface IPoint {
  player: IPlayer
  task: ITask<TaskType>
  points: number
  source: mongoose.Types.ObjectId
  sourceName: string
  type: IPointType
  second: number
}
