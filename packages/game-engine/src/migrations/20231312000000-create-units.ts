import { Db } from 'mongodb'

import connectToDatabase, { disconnectFromDatabase } from '../configuration/Database'
import researchRepository from '../repositories/researchesRepository'
import units from '../assets/units/units'
import unitRepository from '../repositories/unitRepository'

export async function up() {
  await connectToDatabase()

  const researches = await researchRepository.findResearches()

  const unitsWithRequisites = units.map((unit) => ({
    ...unit,
    requirements: {
      researches: unit.requirements.researches.map(({ level, research: playerResearch }) => ({
        level,
        research: researches.find((research) => research.name === playerResearch.name)!
      }))
    }
  }))

  await unitRepository.insertUnits(unitsWithRequisites)

  return await disconnectFromDatabase()
}

export async function down(db: Db) {
  return await db.collection('races').deleteMany({})
}
