import { IUnitDocument } from 'game-engine/models/UnitModel'
import { IUnit } from 'game-engine/types/IUnit'

import { UnitType } from '../types/Unit'
import cleanResearchFields from './cleanResearchFields'

function cleanUnitFields(unit: IUnitDocument | IUnit): UnitType {
  const {
    name,
    description,

    raceName,

    type,
    subtype,

    resourceCost,
    energyCost,
    buildBaseTime,

    stats,

    isHero,
    isInvisible,
    isOrganic,
    isCapturable,
    isKamikaze,
    isAirborne,
    isSpecial,
    hasShieldPiercing,

    requirements,

    specials,

    bonus
  } = unit

  return {
    name,
    description,

    raceName,

    type,
    subtype,

    resourceCost,
    energyCost,
    buildBaseTime,

    stats,

    isHero,
    isInvisible,
    isOrganic,
    isCapturable,
    isKamikaze,
    isAirborne,
    isSpecial,
    hasShieldPiercing,

    requirements: {
      researches: requirements.researches.map((playerResearch) => ({
        research: cleanResearchFields(playerResearch.research),
        level: playerResearch.level
      }))
    },

    specials,

    bonus
  }
}

export default cleanUnitFields
