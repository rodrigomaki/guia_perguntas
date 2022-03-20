const Sequelize = require('sequelize');

const connection = new Sequelize('guia_perguntas', 'root', '0131Maki*80', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = connection;
