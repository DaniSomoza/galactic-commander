// eslint-disable-next-line @typescript-eslint/no-var-requires
const generatePlanets = require('../dist/helpers/generatePlanets.js').default
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { name } = require('../dist/assets/universe/universe.js').default

async function up(db) {
  const universe = await db.collection('universes').findOne({ name })

  const planets = generatePlanets(universe._id)

  return await db.collection('planets').insertMany(planets)
}

async function down(db) {
  return db.collection('planets').deleteMany({})
}

module.exports = {
  up,
  down
}
