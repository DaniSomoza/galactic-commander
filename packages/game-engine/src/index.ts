import connectToDatabase from './configuration/Database'
import gameEngine from './engine/game-engine'

async function main() {
  await connectToDatabase()

  gameEngine()
}

main()
