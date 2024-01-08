import { IResearch } from '../../models/ResearchModel'

const RESEARCH_COST_FACTOR = 3

// TODO: implement this properly
function calculateResearchResourceCost(research: IResearch, level: number): number {
  const isFirstLevel = level === 0

  if (isFirstLevel) {
    return research.resourceCost
  }

  const previousLevel = level - 1
  const previousCost = calculateResearchResourceCost(research, previousLevel)

  return previousCost + (previousCost * RESEARCH_COST_FACTOR) / level
}

export default calculateResearchResourceCost
