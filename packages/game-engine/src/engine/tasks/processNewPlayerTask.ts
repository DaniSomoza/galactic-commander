import { Document } from 'mongoose'
import getRandomPlanet from '../../helpers/getRandomPlanet'
import PlayerModel, { IPlayer } from '../../models/PlayerModel'
import planetRepository from '../../repositories/planetRepository'
import raceRepository from '../../repositories/raceRepository'
import { ITaskTypeDocument, NewPlayerTaskType } from '../../models/TaskModel'
import GameEngineError from '../errors/GameEngineError'

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
    throw new GameEngineError('no principal planet available')
  }

  if (!race) {
    throw new GameEngineError('invalid race')
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
    // TODO: check this (and in the tests)
    resourceProduction: 1 // default production: 1 resource per second
  }

  const newPlayer = new PlayerModel(newPlayerData)

  principalPlanet.owner = newPlayer._id
  principalPlanet.isPrincipal = true
  principalPlanet.isExplored = true
  principalPlanet.colonizedAt = second
  principalPlanet.resources = race.baseResources
  principalPlanet.resourceQuality = 100 // max value
  principalPlanet.lastResourceProductionTime = second

  // we create the player before update the planet
  await newPlayer.save()

  return Promise.all([principalPlanet.save()])
}

export default processNewPlayerTask
