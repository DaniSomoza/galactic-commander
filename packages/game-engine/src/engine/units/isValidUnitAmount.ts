import { IFleet } from '../../types/IFleet'
import { IPlayer } from '../../types/IPlayer'
import { IPlayerUnits } from '../../types/IPlayerUnits'
import { IUnit } from '../../types/IUnit'
import calculateCurrentPlayerEnergy from './calculateCurrentPlayerEnergy'
import calculateCurrentPlayerPopulation from './calculateCurrentPlayerPopulation'
import calculateMaxPlayerEnergy from './calculateMaxPlayerEnergy'
import calculateMaxPlayerPopulation from './calculateMaxPlayerPopulation'

function isValidUnitAmount(
  unit: IUnit,
  amount: number,
  player: IPlayer,
  playerUnits: IPlayerUnits[],
  fleets: IFleet[]
): boolean {
  const isValidAmountValue = unit.isHero ? amount === 1 : amount > 0

  if (!isValidAmountValue) {
    return false
  }

  if (unit.type === 'TROOP') {
    const playerMaxPopulation = calculateMaxPlayerPopulation(player)
    const currentPlayerPopulation = calculateCurrentPlayerPopulation(player, playerUnits, fleets)

    return currentPlayerPopulation + amount <= playerMaxPopulation
  }

  if (unit.type === 'SPACESHIP') {
    const playerMaxEnergy = calculateMaxPlayerEnergy(player)
    const currentPlayerEnergy = calculateCurrentPlayerEnergy(player, playerUnits, fleets)

    return currentPlayerEnergy + amount * unit.energyCost <= playerMaxEnergy
  }

  // TODO: implement defenses population ????
  return true
}

export default isValidUnitAmount
