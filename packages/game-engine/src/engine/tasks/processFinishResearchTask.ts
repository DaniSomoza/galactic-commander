import { Document } from 'mongoose'

import { IPlayerResearch } from '../../models/PlayerModel'
import { IBonus, IResearchDocument } from '../../models/ResearchModel'
import { ITaskTypeDocument, FinishResearchTaskType } from '../../models/TaskModel'
import playerRepository from '../../repositories/playerRepository'
import GameEngineError from '../errors/GameEngineError'
import addPoints from '../points/addPoints'
import { IRace } from '../../models/RaceModel'

async function processFinishResearchTask(
  task: ITaskTypeDocument<FinishResearchTaskType>,
  second: number
) {
  // get all the required data from DB
  const player = await playerRepository.findPlayerById(task.data.player)

  if (!player) {
    throw new GameEngineError('invalid player')
  }

  const raceResearches = player.race.researches as IResearchDocument[]
  const research = raceResearches.find((research) => research._id.equals(task.data.research))

  if (!research) {
    throw new GameEngineError('invalid research')
  }

  const playerResearches = player.researches as IPlayerResearch[]
  const playerResearch = playerResearches.find(
    (playerResearch) => playerResearch.research.name === research.name
  )

  const isFirstLevel = !playerResearch

  const newLevel = isFirstLevel ? 1 : playerResearch.level + 1

  // upgrade player researches
  if (isFirstLevel) {
    player.researches.push({
      research,
      level: 1
    })
  } else {
    playerResearch.level = newLevel
  }

  // upgrade player bonus if present in the research
  const hasBonusToUpdate = hasBonus(research.bonus)

  if (hasBonusToUpdate) {
    const PlayerBonus = player.bonus.find((bonus) => bonus.origin.equals(task.data.research))

    if (PlayerBonus) {
      PlayerBonus.bonus = upgradeResearchBonus(research.bonus, newLevel)
    } else {
      player.bonus.push({
        bonus: research.bonus,
        origin: task.data.research,
        type: 'Research'
      })
    }
  }

  if (research.isFleetEnergyResearch) {
    player.fleetEnergy = calculateFleetEnergy(player.race, newLevel)
  }

  if (research.isTroopsPopulationResearch) {
    player.troopsPopulation = calculateTroopsPopulation(player.race, newLevel)
  }

  const points = task.data.researchResourceCost
  player.points = addPoints(player.points, points, task.data.research, 'Research', second)

  player.activeResearch = undefined

  return Promise.all([player.save()])
}

export default processFinishResearchTask

function upgradeResearchBonus(bonus: IBonus, level: number): IBonus {
  const updatedBonus: Partial<IBonus> = {}

  Object.keys((bonus as Document).toObject<IBonus>())
    .filter((key) => key !== '_id')
    .forEach((key) => {
      const value = bonus[key as keyof IBonus]

      if (typeof value === 'number') {
        ;(updatedBonus[key as keyof IBonus] as number) = value * level
      }
    })

  return updatedBonus
}

function hasBonus(bonus: IBonus): boolean {
  return Object.keys((bonus as Document).toObject()).filter((key) => key !== '_id').length > 0
}

const TROOP_POPULATION_FACTOR = 2.55

// create file
function calculateTroopsPopulation(race: IRace, level: number): number {
  const isFirstLevel = level === 1

  if (isFirstLevel) {
    return race.baseTroopsPopulation
  }

  const previousLevel = level - 1
  const previousPopulation = calculateTroopsPopulation(race, previousLevel)

  return Math.floor(previousPopulation + (previousPopulation * TROOP_POPULATION_FACTOR) / level)
}

const FLEET_ENERGY_FACTOR = 4

// create file
function calculateFleetEnergy(race: IRace, level: number): number {
  const isFirstLevel = level === 1

  if (isFirstLevel) {
    return race.baseFleetEnergy
  }

  const previousLevel = level - 1
  const previousEnergy = calculateFleetEnergy(race, previousLevel)

  return Math.floor(previousEnergy + (previousEnergy * FLEET_ENERGY_FACTOR) / level)
}
