import connectToDatabase from './configuration/Database'
import gameEngine from './engine/game-engine'

// required to avoid Mongoose Schema not registered error
import './models/ResearchModel'
import './models/UnitModel'
import './models/FleetModel'

const ONE_SECOND_INTERVAL = 1_000

async function main() {
  await connectToDatabase()

  setInterval(gameEngine, ONE_SECOND_INTERVAL)
}

main()
