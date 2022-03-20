const express = require('express');
const mustache = require('mustache-express');
const path = require('path');
const connection = require('./db/database');
const Question = require('./db/Question');
const Answer = require('./db/Answer');

connection
  .authenticate()
  .then(() => console.log('connection OK'))
  .catch((err) => console.log(err));

const app = express();

// mustache configs
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, './views'));
app.engine('mustache', mustache());

// middlewares
// get body params
app.use(express.urlencoded({ extended: true }));
// static files folder
app.use(express.static('public'));

// routes
app.get('/questions', (req, res) => {
  res.render('pages/question_form');
});

app.post('/savequestion', (req, res) => {
  const { title, description } = req.body;
  Question.create({ title, description })
    .then(res.redirect('/'))
    .catch((err) => console.log(err));
});

app.get('/question/:id', (req, res) => {
  const id = req.params.id;
  Question.findOne({ where: { id } }).then((question) => {
    if (question != undefined) {
      Answer.findAll({
        raw: true,
        where: { question_id: id },
        order: [['updatedAt', 'DESC']],
      }).then((answers) => {
        res.render('pages/question', { question, answers });
      });
    } else {
      res.redirect('/');
    }
  });
});

app.post('/saveanswer', (req, res) => {
  const question_id = req.body.id;
  const answer = req.body.answer;
  Answer.create({ answer, question_id }).then(() =>
    res.redirect(`/question/${question_id}`),
  );
});

app.get('/', (req, res) => {
  Question.findAll({
    raw: true,
    order: [['updatedAt', 'DESC']],
  }).then((questions) => {
    res.render('pages/home', { questions });
  });
});

app.listen(4000, (err) => {
  err ? console.log(`Error: ${err}`) : console.log('Servidor OK');
});
