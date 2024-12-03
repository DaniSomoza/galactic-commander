import { Db } from 'mongodb'

import universe from '../assets/universe/universe'
import generatePlanets from '../helpers/generatePlanets'
import universeRepository from '../repositories/universeRepository'
import connectToDatabase, { disconnectFromDatabase } from '../configuration/Database'
import planetRepository from '../repositories/planetRepository'

// TODO: add specials planets
// TODO: add specials
// TODO: add special units

export async function up() {
  await connectToDatabase()

  const universeDocument = await universeRepository.findUniverseByName(universe.name)

  if (!universeDocument) {
    throw new Error('Migration Error: Universe not found')
  }

  const planets = generatePlanets(universeDocument)

  await planetRepository.insertPlanets(planets)

  return await disconnectFromDatabase()
}

export async function down(db: Db) {
  return await db.collection('planets').deleteMany({})
}
