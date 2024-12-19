import mongoose from 'mongoose'

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

export const disconnectFromDatabase = async () => {
  try {
    await mongoose.disconnect()
    console.log('Successfully disconnected from the MongoDB database.')
  } catch (error) {
    console.error('Failed to disconnect from the MongoDB database: ', error)
  }
}
