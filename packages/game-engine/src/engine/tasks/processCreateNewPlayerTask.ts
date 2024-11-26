import { Document } from 'mongoose'

import getRandomPlanet from '../../helpers/getRandomPlanet'
import PlayerModel from '../../models/PlayerModel'
import planetRepository from '../../repositories/planetRepository'
import raceRepository from '../../repositories/raceRepository'
import { ITaskTypeDocument } from '../../models/TaskModel'
import GameEngineError from '../errors/GameEngineError'
import universeRepository from '../../repositories/universeRepository'
import playerRepository from '../../repositories/playerRepository'
import getPlanetImgUrl from '../../helpers/getPlanetImgUrl'
import { NewPlayerTaskType } from '../../types/ITask'
import { IPlayer } from '../../types/IPlayer'

async function processCreateNewPlayerTask(
  task: ITaskTypeDocument<NewPlayerTaskType>,
  second: number
): Promise<Document[]> {
  // get all the required data from DB
  const [availablePrincipalPlanets, race, universe, playerAlreadyExists] = await Promise.all([
    planetRepository.findAvailablePrincipalPlanets(),
    raceRepository.findRaceById(task.data.race),
    universeRepository.findUniverseById(task.universe),
    playerRepository.findPlayerByUsername(task.data.username, task.universe)
  ])

  if (availablePrincipalPlanets.length === 0) {
    throw new GameEngineError('no principal planet available')
  }

  if (!race) {
    throw new GameEngineError('invalid race')
  }

  if (!universe) {
    throw new GameEngineError('invalid universe')
  }

  if (playerAlreadyExists) {
    throw new GameEngineError('player already created')
  }

  const principalPlanet = getRandomPlanet(availablePrincipalPlanets)

  const newPlayerData: IPlayer = {
    user: {
      username: task.data.username,
      email: task.data.email
    },

    universe,

    race,

    planets: {
      principal: principalPlanet,
      colonies: [principalPlanet]
    },

    perks: [
      {
        bonus: race.bonus,
        source: race._id,
        sourceName: race.name,
        type: 'Race'
      }
    ],

    researches: {
      researched: [],
      queue: []
    },

    units: {
      troops: {
        population: 0
      },

      fleets: {
        energy: 0
      },

      defenses: {
        structures: 0
      }
    }
  }

  const newPlayer = new PlayerModel(newPlayerData)

  principalPlanet.owner = newPlayer._id
  principalPlanet.isPrincipal = true
  principalPlanet.isExplored = true
  principalPlanet.colonizedAt = second
  principalPlanet.resources = race.baseResources
  principalPlanet.resourceQuality = 100 // max value for principal planets by default
  principalPlanet.imgUrl = getPlanetImgUrl(principalPlanet.resourceQuality)
  principalPlanet.lastResourceProductionTime = second

  // we create the player before update the planet
  await newPlayer.save()

  return Promise.all([principalPlanet.save()])
}

export default processCreateNewPlayerTask
