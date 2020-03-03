const log = require('fancy-log');
const { pool, createTables } = require('./');

(async function seed() {
  await createTables(pool);
  log('db tables created');

  // seed data
}());
