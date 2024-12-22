import { IResearch } from 'game-engine/types/IResearch'
import { IResearchDocument } from 'game-engine/models/ResearchModel'

import { ResearchType } from '../types/Research'

function cleanResearchFields(research: IResearch | IResearchDocument): ResearchType {
  const {
    name,
    description,
    raceName,
    bonus,
    initialTime,
    resourceCost,
    isTroopsPopulationResearch,
    isFleetEnergyResearch
  } = research

  return {
    name,
    description,
    raceName,
    bonus,
    initialTime,
    resourceCost,
    isTroopsPopulationResearch,
    isFleetEnergyResearch
  }
}

export default cleanResearchFields
