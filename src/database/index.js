const { Pool, Client } = require('pg');
const fs = require('fs');
const path = require('path');
const log = require('fancy-log');

const env = process.env.NODE_ENV || 'dev';
const host = process.env.POSTGRES_HOST || 'localhost';
const port = process.env.POSTGRES_PORT || '5432';
const user = process.env.POSTGRES_USER || 'dev';
const password = process.env.POSTGRES_PASSWORD || 'dev';
const database = process.env.POSTGRES_DB || 'postgres';

const createDb = async (dbName) => {
  const client = new Client({
    host,
    port,
    database: 'postgres',
    user,
    password,
  });

  try {
    const query = `CREATE DATABASE ${dbName};`;
    await client.connect();
    await client.query(query);
    log(`db '${dbName}' created`);
    await client.end();
  } catch (error) {
    const dbExistsCode = '42P04';
    if (error.code !== dbExistsCode) {
      log(error);
    }
    await client.end();
  }
};

const createPool = () => {
  const pool = new Pool({
    host,
    port,
    database,
    user,
    password,
    // max: 20,
    // idleTimeoutMillis: 30000,
    // connectionTimeoutMillis: 2000,
  });

  pool.on('error', log);
  pool.on('connect', () => {
    log(`Postgres pool connected to database '${database}' at host '${host}' in env '${env}'`);
  });

  return pool;
};

const testDbConn = async (conn) => {
  const res = await conn.query('SELECT NOW()');
  log(`db tested at: ${res.rows[0].now}`);
  return true;
};

const readSQLSchemaToString = (filename) => {
  const schemaFile = path.resolve(__dirname, 'schemas', filename);
  return fs.readFileSync(schemaFile).toString();
};

const createTables = (conn) => conn.query(readSQLSchemaToString('createTables.sql'));
const createTableIndices = (conn) => conn.query(readSQLSchemaToString('createIndices.sql'));
const cleanTables = (conn) => conn.query(readSQLSchemaToString('cleanTables.sql'));
const dropTables = (conn) => conn.query(readSQLSchemaToString('dropTables.sql'));

module.exports = {
  createDb,
  pool: createPool(),
  testDbConn,
  createTables,
  createTableIndices,
  cleanTables,
  dropTables,
};
