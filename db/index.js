const Sequelize = require('sequelize');
const path = require('path');
const fs = require('fs');
// in case this was not called before this module
require('dotenv').config();

const modelsPath = path.join(__dirname, '/models');
const nodeEnv = process.env.NODE_ENV || 'development';

const {
  [nodeEnv]: {
    port, host, dialect, username, database, password,
  },
} = require('../config/database');

const basename = path.basename(__filename);

const db = {};

const sequelize = new Sequelize(database, username, password, {
  host,
  port,
  dialect,
  pool: {
    max: 20,
    min: 0,
    acquire: 60000,
    idle: 10000,
  },
});

fs.readdirSync(modelsPath)
  .filter(
    (file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js',
  )
  .forEach((file) => {
    // eslint-disable-next-line import/no-dynamic-require, global-require
    const model = require(path.join(__dirname, 'models', file))(
      sequelize,
      Sequelize.DataTypes,
    );

    db[model.name] = model;
  });

// if has associations, call them
Object.values(db).forEach((model) => {
  model?.associate(db);
});

sequelize
  .authenticate()
  .then(() => {
    console.log(
      '\x1b[32m%s\x1b[0m',
      'Postgres: Successfully connected to Database',
    );
  })
  .catch((err) => {
    throw err;
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.rawQuery = async (query, options = {}) => db.sequelize.query(query, {
  type: Sequelize.QueryTypes.SELECT,
  raw: true,
  ...options,
});

module.exports = db;
