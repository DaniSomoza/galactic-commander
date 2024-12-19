import { PlayerType } from 'game-api-microservice/src/types/Player'

function calculateResearchLevelInTheQueue(
  researchName: string,
  initialLevel: number,
  researchQueue: string[],
  positionInTheQueue: number,
  activeResearch?: PlayerType['researches']['activeResearch']
): number {
  let level = initialLevel

  if (activeResearch?.research.name === researchName) {
    level++
  }

  for (let i = 0; i < positionInTheQueue; i++) {
    if (researchQueue[i] === researchName) {
      level++
    }
  }

  return level
}

export default calculateResearchLevelInTheQueue
