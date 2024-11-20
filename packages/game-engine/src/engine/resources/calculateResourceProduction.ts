import { BASE_PERCENTAGE_BONUS } from '../bonus/computedBonus'

// one resource per second as base production per planet
const RESOURCE_PRODUCTION_PER_SECOND = 1

export default function calculateResourceProduction(
  actualSecond: number,
  actualPlanetResources: number,
  lastResourceProductionTime: number,
  planetResourceQuality: number,
  ownerResourceProductionBonus: number = BASE_PERCENTAGE_BONUS
): number {
  const timeInSeconds = (actualSecond - lastResourceProductionTime) / 1_000

  const newPlanetResources =
    RESOURCE_PRODUCTION_PER_SECOND *
    timeInSeconds *
    (ownerResourceProductionBonus / 100) *
    (planetResourceQuality / 100)

  return actualPlanetResources + newPlanetResources
}
