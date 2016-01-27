var express = require('express');
var app     = express();
var PORT    = process.env.PORT || 3001;
var todos   = [{
  id: 1,
  description: 'Pick up laundry',
  completed: true
}, {
  id: 2,
  description: 'Walk the dogs',
  completed: false
}, {
  id: 3,
  description: 'Finish this app',
  completed: false
}];

app.get('/', function(req, res){
  res.send("Working just fine");
});

// Get all the todo tasks
app.get('/todos', function(req, res){
  res.json(todos);
});

// Get specific todo task
app.get('/todos/:id', function(req, res){
  var todoId = parseInt(req.params.id, 10);
  var matchedTodo;

  todos.forEach(function(todo){
    if (todoId === todo.id){
      matchedTodo = todo;
    }
  });

  if (matchedTodo){
    res.json(matchedTodo);
  } else {
    res.status(404).send();
  }

  res.send('Checking for todo id: ' + req.params.id);
});


app.listen(PORT, function(){
  console.log('Express listening on port: ' + PORT);
});
