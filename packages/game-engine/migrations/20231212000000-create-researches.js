// eslint-disable-next-line @typescript-eslint/no-var-requires
const researches = require('../dist/assets/researches/researches').default

async function up(db) {
  return await db.collection('researches').insertMany(researches)
}

async function down(db) {
  return db.collection('researches').deleteMany({})
}

module.exports = {
  up,
  down
}
