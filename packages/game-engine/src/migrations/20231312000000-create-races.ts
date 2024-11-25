import { Db } from 'mongodb'

import races from '../assets/races/races'

export async function up(db: Db) {
  const researches = await db.collection('researches').find().toArray()

  const racesWithResearches = races.map((race) => ({
    ...race,
    researches: researches
      .filter((research) => research.raceName === race.name)
      .map((research) => research._id)
  }))

  await db.collection('races').insertMany(racesWithResearches)
}

export async function down(db: Db) {
  return await db.collection('races').deleteMany({})
}
