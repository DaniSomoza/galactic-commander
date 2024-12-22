import { Db } from 'mongodb'
import researches from '../assets/researches/researches'

export async function up(db: Db) {
  // TODO: use mongoose Model

  return await db.collection('researches').insertMany(researches)
}

export async function down(db: Db) {
  return await db.collection('researches').deleteMany({})
}
