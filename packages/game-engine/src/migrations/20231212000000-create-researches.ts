import { Db } from 'mongodb'
import researches from '../assets/researches/researches'

export async function up(db: Db) {
  return await db.collection('researches').insertMany(researches)
}

export async function down(db: Db) {
  return await db.collection('researches').deleteMany({})
}
