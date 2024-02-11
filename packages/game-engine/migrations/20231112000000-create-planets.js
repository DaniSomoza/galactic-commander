// eslint-disable-next-line @typescript-eslint/no-var-requires
const generatePlanets = require('../dist/helpers/generatePlanets.js').default

async function up(db) {
  const universe = await db.collection('universe').find()

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
