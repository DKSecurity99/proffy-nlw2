import knex from 'knex';

const db = knex({
  client: 'postgres',
  connection: {
    host: 'localhost',
    user: 'alex',
    password: 'dksecurity',
    database: 'nlw',
  }
});

export default db;
