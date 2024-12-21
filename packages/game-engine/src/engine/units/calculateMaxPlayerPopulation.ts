import { IPlayer } from '../../types/IPlayer'
import computedBonus from '../bonus/computedBonus'
import calculateMaxPopulation from './calculateMaxPopulation'

function calculateMaxPlayerPopulation(player: IPlayer, customLevel?: number): number {
  const populationResearch = player.researches.researched.find(
    ({ research }) => research.isTroopsPopulationResearch
  )
  const currentPopulationLevel = customLevel || populationResearch?.level || 0

  const populationBonus = computedBonus(player?.perks || [], 'TROOPS_POPULATION_BONUS')

  return calculateMaxPopulation(player.race, currentPopulationLevel) * (populationBonus / 100)
}

export default calculateMaxPlayerPopulation
