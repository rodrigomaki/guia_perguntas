const Sequelize = require('sequelize');
const connection = require('./database');

const Question = connection.define('question', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

Question.sync({ force: false })
  .then()
  .catch((err) => console.log('Erro no sync da tabela: ' + err));

module.exports = Question;
