import mongoose from 'mongoose'

type IPointType = 'Unit' | 'Research' | 'Battle'

export interface IPoint {
  points: number
  source: mongoose.Types.ObjectId
  sourceName: string
  types: IPointType
  second: number
}
