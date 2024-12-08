const { Client } = require('pg');

const ENV = process.env.NODE_ENV || 'development';
const config = require('../config/database')[ENV];

const client = new Client({
  user: config.username,
  host: config.host,
  password: config.password,
  port: 5432,
});

const args = process.argv.slice(2);
const dbName = args[0];

if (!dbName) {
  console.error('Please provide a database name.');
  process.exit(1);
}

async function main() {
  try {
    await client.connect();

    await client.query(`CREATE DATABASE ${dbName} OWNER postgres;`);

    console.log(`Database ${dbName} created successfully with owner postgres.`);
  } catch (err) {
    console.error('Error creating database:', err);
  } finally {
    await client.end();
  }
}

main();
