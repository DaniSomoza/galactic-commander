import PlayerModel from '../models/PlayerModel'

async function findPlayerByUsername(username: string) {
  return PlayerModel.findOne({ username }).lean().exec()
}

const playerRepository = {
  findPlayerByUsername
}

export default playerRepository
