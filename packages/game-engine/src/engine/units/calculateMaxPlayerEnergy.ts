import { IPlayer } from '../../types/IPlayer'
import computedBonus from '../bonus/computedBonus'
import calculateMaxEnergy from './calculateMaxEnergy'

function calculateMaxPlayerEnergy(player: IPlayer, customLevel?: number): number {
  const energyResearch = player.researches.researched.find(
    ({ research }) => research.isFleetEnergyResearch
  )
  const currentEnergyLevel = customLevel || energyResearch?.level || 0

  const energyBonus = computedBonus(player?.perks || [], 'FLEET_ENERGY_BONUS')

  return calculateMaxEnergy(player.race, currentEnergyLevel) * (energyBonus / 100)
}
export default calculateMaxPlayerEnergy
