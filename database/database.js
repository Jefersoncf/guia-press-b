
const Sequelize = require('sequelize');

const connection = new Sequelize('guiapress', 'root', '2550', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = connection;
