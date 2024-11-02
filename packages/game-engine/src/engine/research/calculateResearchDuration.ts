// TODO: document this
function calculateResearchDuration(
  initialTime: number,
  level: number,
  researchBonus: number
): number {
  const baseResearchDuration = getBaseResearchDuration(initialTime, level)

  const researchDuration = baseResearchDuration * (100 / researchBonus)

  return Math.floor(researchDuration)
}

export default calculateResearchDuration

const RESEARCH_FACTOR = 4.5

function getBaseResearchDuration(initialTime: number, level: number): number {
  const isFirstLevel = level === 0

  if (isFirstLevel) {
    return initialTime
  }

  const previousLevel = level - 1
  const previousTime = getBaseResearchDuration(initialTime, previousLevel)

  const baseResearchDuration = previousTime + (previousTime * RESEARCH_FACTOR) / 2

  return baseResearchDuration
}
