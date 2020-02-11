const express = require('express');
var bodyParser = require('body-parser');

let todos = [
  {
      id: '0dd194e0e15278b18d2c71e45e880b39',
      title: 'Todo 1',
      description: '1 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      status: 'TODO'
  },
  {
      id: '927808d6813f4f5b8e9874c4d02652b7',
      title: 'Todo 2',
      description: '1 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      status: 'DONE'
  },
  {
      id: '9477f5ea5b163299e31085b6cf386e09',
      title: 'Todo 3',
      description: '1 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      status: 'TODO'
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
    description: req.body.description,
    status: req.body.checked
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
  todo.status = req.body.status;
  todo.description = req.body.description;
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
