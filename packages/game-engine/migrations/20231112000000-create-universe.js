// eslint-disable-next-line @typescript-eslint/no-var-requires
const universe = require('../dist/assets/universe/universe.js').default

async function up(db) {
  return await db.collection('universes').insertOne(universe)
}

async function down(db) {
  return db.collection('universes').deleteMany({})
}

module.exports = {
  up,
  down
}
