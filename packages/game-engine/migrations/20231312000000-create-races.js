// eslint-disable-next-line @typescript-eslint/no-var-requires
const races = require('../dist/assets/races/races.js').default

async function up(db) {
  const researches = await db.collection('researches').find().toArray()

  const racesWithResearches = races.map((race) => ({
    ...race,
    researches: researches
      .filter((research) => research.raceName === race.name)
      .map((research) => research._id)
  }))

  await db.collection('races').insertMany(racesWithResearches)
}

async function down(db) {
  return db.collection('races').deleteMany({})
}

module.exports = {
  up,
  down
}
