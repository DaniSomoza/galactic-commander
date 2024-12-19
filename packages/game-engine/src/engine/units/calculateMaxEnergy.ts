import { IRace } from '../../types/IRace'

const FLEET_ENERGY_FACTOR = 3

function calculateMaxEnergy(race: IRace, level: number): number {
  const isFirstLevel = level === 0

  if (isFirstLevel) {
    return race.baseFleetEnergy
  }

  const previousLevel = level - 1
  const previousEnergy = calculateMaxEnergy(race, previousLevel)

  return Math.floor(previousEnergy + (previousEnergy * FLEET_ENERGY_FACTOR) / level)
}
export default calculateMaxEnergy
