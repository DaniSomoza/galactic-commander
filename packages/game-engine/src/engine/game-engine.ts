import universeRepository from '../repositories/universeRepository'
import processUniverse from './processUniverse'

const ONE_SECOND_INTERVAL = 1_000

// TODO: add logger to the project

async function gameEngine() {
  setInterval(async () => {
    const universes = await universeRepository.findUniverses()
    universes.forEach((universe) => processUniverse(universe))
  }, ONE_SECOND_INTERVAL)
}

export default gameEngine
