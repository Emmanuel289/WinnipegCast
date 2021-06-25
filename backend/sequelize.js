/**
 * Import and instantiate Sequelize Object
 */
const Sequelize = require('sequelize');
const config = require('./config');


const c = config;


const sequelize = new Sequelize({
  "username": c.username,
  "password": c.password,
  "database": c.database,
  "host":     c.host,

  dialect: 'postgres',
  storage: ':memory:'
});

module.exports = sequelize;