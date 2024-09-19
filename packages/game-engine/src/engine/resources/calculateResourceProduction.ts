import { Document } from 'mongoose'

import { IPlanetDocument } from '../../models/PlanetModel'
import {
  TaskType,
  ITaskTypeDocument,
  NewPlayerTaskData,
  StartResearchTaskData,
  FinishResearchTaskData
} from '../../models/TaskModel'
import playerRepository from '../../repositories/playerRepository'
import applyBonus, { BASE_BONUS } from '../../helpers/applyBonus'

export default async function calculateResourceProduction(
  tasks: ITaskTypeDocument<TaskType>[],
  second: number
): Promise<Document[]> {
  const planets: IPlanetDocument[] = []

  // TODO: implement targetPlanet feature
  for (const task of tasks) {
    // calculate all player planet production
    if (isPlayerTaskData(task.data)) {
      const player = await playerRepository.findPlayerById(task.data.player)

      if (player) {
        const playerPlanets = player.planets.colonies

        playerPlanets.forEach((playerPlanet) => {
          const isAlreadyIncluded = planets.some((planet) => planet._id.equals(playerPlanet._id))
          if (!isAlreadyIncluded) {
            planets.push(playerPlanet)
          }
        })
      }
    }
  }

  return Promise.all(planets.map((planet) => updatePlanetResources(planet, second)))
}

// one resource per second as base production per planet
const RESOURCE_PRODUCTION_PER_SECOND = 1

function updatePlanetResources(planet: IPlanetDocument, second: number): Promise<Document> {
  const resourceProductionBonus = calculateResourceProductionBonus(planet)

  const timeInSeconds = (second - planet.lastResourceProductionTime) / 1_000

  const resources = RESOURCE_PRODUCTION_PER_SECOND * timeInSeconds * (resourceProductionBonus / 100)

  planet.resources += resources
  planet.lastResourceProductionTime = second

  return planet.save()
}

function calculateResourceProductionBonus(planet: IPlanetDocument): number {
  if (!planet.owner) {
    return BASE_BONUS
  }

  const player = planet.owner
  const productionBonus = applyBonus(player.bonus, 'resourceProductionBonus', true)

  return productionBonus
}

function isPlayerTaskData(
  taskData: NewPlayerTaskData | StartResearchTaskData | FinishResearchTaskData
): taskData is StartResearchTaskData | FinishResearchTaskData {
  return 'player' in taskData
}
