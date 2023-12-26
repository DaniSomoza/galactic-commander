import universeRepository from '../repositories/universeRepository'
import processUniverse from './processUniverse'

async function gameEngine() {
  const universes = await universeRepository.findUniverses()

  universes.forEach((universe) => processUniverse(universe))
}

export default gameEngine
