import mongoose from 'mongoose'

import 'game-engine/dist/models/ResearchModel'
import 'game-engine/dist/models/PlanetModel'
import 'game-engine/dist/models/PlayerModel'
import 'game-engine/dist/models/RaceModel'
import 'game-engine/dist/models/UnitModel'
import 'game-engine/dist/models/FleetModel'

const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_PORT, MONGO_GAME_DB } = process.env

const connectToDatabase = async () => {
  try {
    const connectionString = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@mongo:${MONGO_PORT}/${MONGO_GAME_DB}?authSource=admin`

    await mongoose.connect(connectionString)

    console.log('Successfully connected to the game MongoDB database.')
  } catch (error) {
    console.error('Failed to connect to the game MongoDB database: ', error)
  }
}

export default connectToDatabase
