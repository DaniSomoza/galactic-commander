import { Db } from 'mongodb'

import races from '../assets/races/races'
import connectToDatabase, { disconnectFromDatabase } from '../configuration/Database'
import researchRepository from '../repositories/researchesRepository'
import raceRepository from '../repositories/raceRepository'
import unitRepository from '../repositories/unitRepository'

export async function up() {
  await connectToDatabase()

  const researches = await researchRepository.findResearches()
  const units = await unitRepository.findUnits()

  // add researches to each race
  const racesWithResearchesAndUnits = races.map((race) => ({
    ...race,
    researches: researches.filter((research) => research.raceName === race.name),
    units: units.filter((unit) => unit.raceName === race.name)
  }))

  await raceRepository.insertRaces(racesWithResearchesAndUnits)

  return await disconnectFromDatabase()
}

export async function down(db: Db) {
  return await db.collection('races').deleteMany({})
}
