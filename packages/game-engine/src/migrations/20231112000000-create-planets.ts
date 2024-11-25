import { Db } from 'mongodb'

import universe from '../assets/universe/universe'
import generatePlanets from '../helpers/generatePlanets'

export async function up(db: Db) {
  const planets = generatePlanets(universe)

  return await db.collection('planets').insertMany(planets)
}

export async function down(db: Db) {
  return await db.collection('planets').deleteMany({})
}
