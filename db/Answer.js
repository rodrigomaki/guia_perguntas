const Sequelize = require('sequelize');
const connection = require('./database');

const Answer = connection.define('answers', {
  answer: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  question_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

Answer.sync({ force: false })
  .then()
  .catch((err) => console.log('Erro no sync da tabela: ' + err));

module.exports = Answer;
