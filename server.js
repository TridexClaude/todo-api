// CRUD Create Read Update Delete - Todo Api

var express     = require('express');
var bodyParser  = require('body-parser');
var _           = require('underscore');


var app         = express();
var PORT        = process.env.PORT || 3001;
var todos       = [];

var todoNextId  = 1;

app.use(bodyParser.json());

app.get('/', function(req, res){
  res.send("Working just fine");
});

// GET all the todo tasks
app.get('/todos', function(req, res){
  res.json(todos);
});

// GET specific todo task
app.get('/todos/:id', function(req, res){
  var todoId      = parseInt(req.params.id, 10);
  var matchedTodo = _.findWhere(todos, {id: todoId});

  if (matchedTodo){
    res.json(matchedTodo);
  } else {
    res.status(404).send();
  }

});

// POST new todo taks
app.post('/todos', function(req, res){
  var body = _.pick(req.body, 'description', 'completed');

  if(!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0){
    return res.status(400).send();
  }

  body.description = body.description.trim();

  body.id = todoNextId;

  todoNextId++;
  todos.push(body);

  res.json(body);
});

// DELETE todo task
app.delete('/todos/:id', function(req, res){
  var todoId      = parseInt(req.params.id, 10);
  var matchedTodo = _.findWhere(todos, {id: todoId});

  if (!matchedTodo){
    res.status(404).json({"error": "no todo task found with Id: " + todoId + ""});
  } else {
    todos = _.without(todos, matchedTodo);
    res.json(matchedTodo);
  }

});

// DELETE todo task
app.put('/todos/:id', function(req, res){
  var todoId      = parseInt(req.params.id, 10);
  var matchedTodo = _.findWhere(todos, {id: todoId});
  var body        = _.pick(req.body, 'description', 'completed');
  var validAttributes = {};

  if (!matchedTodo){
    return res.status(404).send();
  }

  if (body.hasOwnProperty('completed') && _.isBoolean(body.completed)){
    validAttributes.completed = body.completed;
  } else if (body.hasOwnProperty('completed')){
    return res.status(404).send();
  }

  if (body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length > 0){
    validAttributes.description= body.description;
  } else if (body.hasOwnProperty('description')){
    return res.status(400).send();
  }

  _.extend(matchedTodo, validAttributes);
  res.json(matchedTodo);

});


app.listen(PORT, function(){
  console.log('Express listening on port: ' + PORT);
});
