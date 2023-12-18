// eslint-disable-next-line @typescript-eslint/no-var-requires
const races = require('../dist/assets/races/races.js').default

async function up(db) {
  return await db.collection('races').insertMany(races)
}

async function down(db) {
  return db.collection('races').deleteMany({})
}

module.exports = {
  up,
  down
}
