// eslint-disable-next-line @typescript-eslint/no-var-requires
const generatePlanets = require('../dist/helpers/generatePlanets.js').default

// TODO: implement universe info

async function up(db) {
  const planets = generatePlanets()

  return await db.collection('planets').insertMany(planets)
}

async function down(db) {
  return db.collection('planets').deleteMany({})
}

module.exports = {
  up,
  down
}
