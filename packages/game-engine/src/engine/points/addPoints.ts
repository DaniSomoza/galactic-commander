import mongoose from 'mongoose'
import { IPlayerPoints } from '../../models/PlayerModel'

function addPoints(
  playerPoints: IPlayerPoints[],
  points: number,
  origin: mongoose.Types.ObjectId,
  type: IPlayerPoints['type'],
  second: number
): IPlayerPoints[] {
  const newPoints: IPlayerPoints = {
    points,
    origin,
    type,
    second
  }

  return [newPoints, ...playerPoints]
}

export default addPoints
