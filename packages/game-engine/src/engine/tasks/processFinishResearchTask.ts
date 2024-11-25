import { IPoint } from '../../types/IPoint'
import { IBonus } from '../../types/IBonus'
import { IRace } from '../../types/IRace'
import { FinishResearchTaskType } from '../../types/ITask'
import GameEngineError from '../errors/GameEngineError'
import PointModel from '../../models/PointModel'
import { ITaskTypeDocument } from '../../models/TaskModel'
import taskRepository from '../../repositories/taskRepository'
import playerRepository from '../../repositories/playerRepository'
import upgradeResearchBonus from '../bonus/upgradeResearchBonus'
import createStartResearchTask from './utils/createStartResearchTask'

async function processFinishResearchTask(
  task: ITaskTypeDocument<FinishResearchTaskType>,
  second: number
) {
  // get all the required data from DB
  const player = await playerRepository.findPlayerById(task.data.player)

  if (!player) {
    throw new GameEngineError('invalid player')
  }

  const research = player.race.researches.find((research) =>
    research._id.equals(task.data.research)
  )

  if (!research) {
    throw new GameEngineError('invalid research')
  }

  const playerResearch = player.researches.researched.find(
    (playerResearch) => playerResearch.research.name === research.name
  )

  const isFirstLevel = !playerResearch

  const newLevel = isFirstLevel ? 1 : playerResearch.level + 1

  // upgrade player researches
  if (isFirstLevel) {
    player.researches.researched.push({
      research,
      level: 1
    })
  } else {
    playerResearch.level = newLevel
  }

  // upgrade player bonus if present in the research
  const hasBonusToUpdate = hasBonus(research.bonus)

  if (hasBonusToUpdate) {
    const PlayerBonus = player.perks.find((perk) => perk.source.equals(task.data.research))

    if (PlayerBonus) {
      PlayerBonus.bonus = upgradeResearchBonus(research.bonus, newLevel)
    } else {
      player.perks.push({
        bonus: research.bonus,
        source: task.data.research,
        sourceName: research.name,
        type: 'Research'
      })
    }
  }

  if (research.isFleetEnergyResearch) {
    player.units.fleets.energy = calculateFleetEnergy(player.race, newLevel)
  }

  if (research.isTroopsPopulationResearch) {
    player.units.troops.population = calculateTroopsPopulation(player.race, newLevel)
  }

  // TODO: intergalacticTravel check?

  const points: IPoint = {
    points: task.data.researchResourceCost,
    source: task.data.research._id,
    sourceName: research.name,
    types: 'Research',
    second
  }

  player.researches.activeResearch = undefined

  // check player research queue
  const nextResearchName = player.researches.queue.shift()
  const nextResearch = player.race.researches.find((research) => research.name === nextResearchName)

  if (nextResearch) {
    // TODO: check if it has enough resources => next Research ???

    const startResearchTask = createStartResearchTask(
      task.universe._id,
      player._id,
      nextResearch._id
    )

    return Promise.all([
      player.save(),
      taskRepository.createStartResearchTask(startResearchTask),
      new PointModel(points)
    ])
  }

  return Promise.all([player.save(), new PointModel(points)])
}

export default processFinishResearchTask

function hasBonus(bonus: IBonus): boolean {
  const hasBonusDefined = Object.keys(bonus).some((perk) => !!bonus[perk as keyof IBonus])
  return bonus && hasBonusDefined
}

const TROOP_POPULATION_FACTOR = 2.55

// TODO: create file in engine/troops ???
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

// TODO: create file in engine/fleets ???
function calculateFleetEnergy(race: IRace, level: number): number {
  const isFirstLevel = level === 1

  if (isFirstLevel) {
    return race.baseFleetEnergy
  }

  const previousLevel = level - 1
  const previousEnergy = calculateFleetEnergy(race, previousLevel)

  return Math.floor(previousEnergy + (previousEnergy * FLEET_ENERGY_FACTOR) / level)
}
