import mongoose from 'mongoose'
import { IPlayerPoint } from '../../models/PlayerModel'

function addPoints(
  playerPoints: IPlayerPoint[],
  points: number,
  origin: mongoose.Types.ObjectId,
  type: IPlayerPoint['type'],
  second: number
): IPlayerPoint[] {
  const newPoints: IPlayerPoint = {
    points,
    origin,
    type,
    second
  }

  return [newPoints, ...playerPoints]
}

export default addPoints
