import { Document } from 'mongoose'

import getRandomPlanet from '../../helpers/getRandomPlanet'
import PlayerModel, { IPlayer } from '../../models/PlayerModel'
import planetRepository from '../../repositories/planetRepository'
import raceRepository from '../../repositories/raceRepository'
import { ITaskTypeDocument, NewPlayerTaskType } from '../../models/TaskModel'
import GameEngineError from '../errors/GameEngineError'
import universeRepository from '../../repositories/universeRepository'
import playerRepository from '../../repositories/playerRepository'
import getPlanetImgUrl from '../../helpers/getPlanetImgUrl'

// TODO: rename to processCreateNewPlayerTask
async function processNewPlayerTask(
  task: ITaskTypeDocument<NewPlayerTaskType>,
  second: number
): Promise<Document[]> {
  // get all the required data from DB
  const [availablePrincipalPlanets, race, universe, player] = await Promise.all([
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

  if (player) {
    throw new GameEngineError('player already created')
  }

  const principalPlanet = getRandomPlanet(availablePrincipalPlanets)

  const newPlayerData: IPlayer = {
    user: {
      username: task.data.username,
      email: task.data.email
    },

    universe: universe._id,

    race: race._id,

    planets: {
      principal: principalPlanet._id,
      colonies: [principalPlanet._id],
      explored: [principalPlanet._id]
    },

    perks: [
      {
        bonus: race.bonus,
        source: race._id,
        type: 'Race'
      }
    ],

    points: [],

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
  // TODO: create specific principal planet image ???
  principalPlanet.imgUrl = getPlanetImgUrl(principalPlanet.resourceQuality)
  principalPlanet.lastResourceProductionTime = second

  // we create the player before update the planet
  await newPlayer.save()

  return Promise.all([principalPlanet.save()])
}

export default processNewPlayerTask
