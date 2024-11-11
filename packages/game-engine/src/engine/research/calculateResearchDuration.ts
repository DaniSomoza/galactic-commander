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

const RESEARCH_BASE_TIME_FACTOR = 2

function getBaseResearchDuration(initialTime: number, level: number): number {
  const isFirstLevel = level === 0

  if (isFirstLevel) {
    return initialTime
  }

  const previousLevel = level - 1
  const previousTime = getBaseResearchDuration(initialTime, previousLevel)

  const factor = RESEARCH_BASE_TIME_FACTOR - level / (RESEARCH_BASE_TIME_FACTOR * 20)

  const baseResearchDuration = factor * previousTime

  return baseResearchDuration
}
