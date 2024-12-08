import { IRace } from '../../types/IRace'

const TROOP_POPULATION_FACTOR = 2.55

function calculateMaxPopulation(race: IRace, level: number): number {
  const isFirstLevel = level === 0

  if (isFirstLevel) {
    return race.baseTroopsPopulation
  }

  const previousLevel = level - 1
  const previousPopulationValue = calculateMaxPopulation(race, previousLevel)

  return Math.floor(
    previousPopulationValue + (previousPopulationValue * TROOP_POPULATION_FACTOR) / level
  )
}

export default calculateMaxPopulation
