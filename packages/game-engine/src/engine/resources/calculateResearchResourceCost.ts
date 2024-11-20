import { IResearch } from '../../models/ResearchModel'

const RESEARCH_COST_FACTOR = 3

// TODO: implement this properly
// TODO: Remove IResearch
function calculateResearchResourceCost(research: IResearch, level: number): number {
  const isFirstLevel = level === 0

  if (isFirstLevel) {
    return research.resourceCost
  }

  const previousLevel = level - 1
  const nextLevel = level + 1
  const previousCost = calculateResearchResourceCost(research, previousLevel)

  return previousCost + (previousCost * RESEARCH_COST_FACTOR) / nextLevel
}

export default calculateResearchResourceCost
