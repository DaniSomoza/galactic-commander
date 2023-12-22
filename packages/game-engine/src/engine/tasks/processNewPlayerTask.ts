import { Document } from 'mongoose'
import getRandomPlanet from '../../helpers/getRandomPlanet'
import PlayerModel, { IPlayer } from '../../models/PlayerModel'
import planetRepository from '../../repositories/planetRepository'
import raceRepository from '../../repositories/raceRepository'
import { ITaskTypeDocument, NewPlayerTaskType, PROCESSED_TASK_STATUS } from '../../models/TaskModel'

async function processNewPlayerTask(
  task: ITaskTypeDocument<NewPlayerTaskType>,
  second: number
): Promise<Document[]> {
  // get all the required data from DB
  const [availablePrincipalPlanets, race] = await Promise.all([
    planetRepository.findAvailablePrincipalPlanets(),
    raceRepository.findRaceById(task.data.race)
  ])

  if (availablePrincipalPlanets.length === 0) {
    // TODO: TASK ERROR!
    throw new Error('planets error')
  }

  if (!race) {
    // TODO: TASK ERROR!
    throw new Error('race error')
  }

  const principalPlanet = getRandomPlanet(availablePrincipalPlanets)

  const newPlayerData: IPlayer = {
    username: task.data.username,
    email: task.data.email,

    race,

    principalPlanet,

    planets: [principalPlanet._id],
    planetsExplored: [principalPlanet._id],

    bonus: [race.bonus],

    fleetEnergy: race.baseFleetEnergy,
    troopsPopulation: race.baseTroopsPopulation,
    // TODO: check this
    resourceProduction: 1 // default production: 1 resource per second
  }

  const newPlayer = new PlayerModel(newPlayerData)

  if (!newPlayer) {
    // TODO: TASK ERROR!
    throw new Error('newPlayer error')
  }

  principalPlanet.owner = newPlayer._id
  principalPlanet.isPrincipal = true
  principalPlanet.isExplored = true
  principalPlanet.colonizedAt = second
  principalPlanet.resources = race.baseResources
  principalPlanet.resourceQuality = 100 // max value
  principalPlanet.lastResourceProductionTime = second

  // TODO: create a function for this
  task.status = PROCESSED_TASK_STATUS
  task.history.push({ taskStatus: PROCESSED_TASK_STATUS, updatedAt: second })
  task.isCancellable = false
  task.processedAt = second

  return Promise.all([task.save(), principalPlanet.save(), newPlayer.save()])
}

export default processNewPlayerTask
