import { ITaskTypeDocument, FinishResearchTaskType } from '../../models/TaskModel'
import playerRepository from '../../repositories/playerRepository'
import GameEngineError from '../errors/GameEngineError'
import addPoints from '../points/addPoints'
import { IRace } from '../../models/RaceModel'
import upgradeResearchBonus from '../bonus/upgradeResearchBonus'
import { IBonus } from '../../types/bonus'
import createStartResearchTask from './utils/createStartResearchTask'
import taskRepository from '../../repositories/taskRepository'

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

  const points = task.data.researchResourceCost
  const pointsSource = task.data.research._id
  const pointsSourceName = research.name
  player.points = addPoints(
    player.points,
    points,
    pointsSource,
    pointsSourceName,
    'Research',
    second
  )

  player.researches.activeResearch = undefined

  // check player research queue
  const nextResearchName = player.researches.queue.shift()
  const nextResearch = player.race.researches.find((research) => research.name === nextResearchName)

  if (nextResearch) {
    // TODO: has enough resources???

    const startResearchTask = createStartResearchTask(
      task.universe._id,
      player._id,
      nextResearch._id
    )

    return Promise.all([player.save(), taskRepository.createStartResearchTask(startResearchTask)])
  }

  return Promise.all([player.save()])
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
