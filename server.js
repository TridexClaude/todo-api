var express = require('express');
var app = express();
var PORT = process.env.PORT || 3001;

app.get('/', function(req, res){
  res.send("Working just fine");
});

app.listen(PORT, function(){
  console.log('Express listening on port: ' + PORT);
});
