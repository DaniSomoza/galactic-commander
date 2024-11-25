import { Db } from 'mongodb'

import universe from '../assets/universe/universe'

export async function up(db: Db) {
  return await db.collection('universes').insertOne(universe)
}

export async function down(db: Db) {
  return await db.collection('universes').deleteMany({})
}
