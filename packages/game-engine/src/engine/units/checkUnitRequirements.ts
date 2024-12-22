import { IPlayer } from '../../types/IPlayer'
import { IResearch } from '../../types/IResearch'
import { IUnit } from '../../types/IUnit'

export type UnitRequirement = {
  research: IResearch
  level: number
  playerResearchLevel: number
}
export type CheckUnitRequirementsType = {
  isUnitAvailable: boolean
  requirements: UnitRequirement[]
}

function checkUnitRequirements(unit: IUnit, player: IPlayer): CheckUnitRequirementsType {
  const requiredResearches = unit.requirements.researches

  const isOwnerOfTheSpecialPlanet = player.planets.colonies.some((planet) =>
    planet.units.some((planetUnit) => planetUnit.name === unit.name)
  )

  const isUnitRequirementsCompleted = requiredResearches.every((requiredResearch) => {
    const playerResearch = player.researches.researched.find(
      (playerResearch) => playerResearch.research.name === requiredResearch.research.name
    )

    const playerResearchLevel = playerResearch?.level || 0

    return playerResearchLevel >= requiredResearch.level
  })

  const requirements = requiredResearches.map((requiredResearch) => {
    const playerResearch = player.researches.researched.find(
      (playerResearch) => playerResearch.research.name === requiredResearch.research.name
    )

    const playerResearchLevel = playerResearch?.level || 0

    return {
      research: requiredResearch.research,
      level: requiredResearch.level,
      playerResearchLevel
    }
  })

  const isUnitAvailable = isOwnerOfTheSpecialPlanet || isUnitRequirementsCompleted

  return {
    isUnitAvailable,
    requirements
  }
}

export default checkUnitRequirements
