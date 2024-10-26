const RESEARCH_FACTOR = 4.5

// TODO: document this
function calculateResearchDuration(initialTime: number, level: number): number {
  const isFirstLevel = level === 0

  if (isFirstLevel) {
    return initialTime
  }

  const previousLevel = level - 1
  const previousTime = calculateResearchDuration(initialTime, previousLevel)

  const duration = previousTime + (previousTime * RESEARCH_FACTOR) / 2

  return Math.floor(duration)
}

export default calculateResearchDuration
