const express = require('express');
var bodyParser = require('body-parser');

let todos = [
  {
      id: '0dd194e0e15278b18d2c71e45e880b39',
      title: 'Todo 1',
      checked: false
  },
  {
      id: '927808d6813f4f5b8e9874c4d02652b7',
      title: 'Todo 2',
      checked: true
  },
  {
      id: '9477f5ea5b163299e31085b6cf386e09',
      title: 'Todo 3',
      checked: false
  }
];

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/', function(req, res){
  res.send('Hello World!');
});

app.get('/todos', function (req, res) {
  res.send(todos);
});

app.post('/todos', function (req, res) {
  var todo = {
    id: `${Date.now()}`,
    title: req.body.title,
    checked: req.body.checked
  }
  todos.push(todo);
  res.sendStatus(200);
});

app.get('/todos/:id', function (req, res) {
  var todo = todos.find(function (todo) {
    return todo.id === req.params.id;
  });
  res.send(todo);
});

app.put('/todos/:id', function (req, res) {
  var todo = todos.find(function (todo) {
    return todo.id === req.params.id
  });
  todo.title = req.body.title;
  todo.checked = req.body.checked;
  res.sendStatus(200);
});

app.delete('/todos/:id', function (req, res) {
  todos = todos.filter(function (todo) {
    return todo.id !== req.params.id
  });
  res.sendStatus(200);
});

app.listen(3000, function () {
  console.log('API app started')
});
