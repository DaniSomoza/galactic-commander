import connectToDatabase from './configuration/Database'
import gameEngine from './engine/game-engine'

const ONE_SECOND_INTERVAL = 1_000

async function main() {
  await connectToDatabase()

  setInterval(gameEngine, ONE_SECOND_INTERVAL)
}

main()
