import { IPlayer } from '../../types/IPlayer'
import { IUnit } from '../../types/IUnit'
import calculateCurrentPlayerEnergy from './calculateCurrentPlayerEnergy'
import calculateCurrentPlayerPopulation from './calculateCurrentPlayerPopulation'
import calculateMaxEnergy from './calculateMaxEnergy'
import calculateMaxPopulation from './calculateMaxPopulation'

function isValidUnitAmount(unit: IUnit, amount: number, player: IPlayer): boolean {
  const isValidAmountValue = unit.isHero ? amount === 1 : amount > 0

  if (!isValidAmountValue) {
    return false
  }

  if (unit.type === 'TROOP') {
    const populationResearch = player.researches.researched.find(
      ({ research }) => research.isTroopsPopulationResearch
    )
    const currentPopulationLevel = populationResearch?.level || 0
    const playerMaxPopulation = calculateMaxPopulation(player.race, currentPopulationLevel)
    const currentPlayerPopulation = calculateCurrentPlayerPopulation(player)

    return currentPlayerPopulation + amount <= playerMaxPopulation
  }

  if (unit.type === 'SPACESHIP') {
    const energyResearch = player.researches.researched.find(
      ({ research }) => research.isFleetEnergyResearch
    )
    const currentEnergyLevel = energyResearch?.level || 0
    const playerMaxEnergy = calculateMaxEnergy(player.race, currentEnergyLevel)
    const currentPlayerEnergy = calculateCurrentPlayerEnergy(player)

    return currentPlayerEnergy + amount * unit.energyCost <= playerMaxEnergy
  }

  // TODO: implement defenses population ????
  return true
}

export default isValidUnitAmount
