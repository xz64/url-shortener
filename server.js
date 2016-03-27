var express = require('express');

var port = +process.env.PORT || 8080;
var app = express();

app.get('/new/:url', function(req, res) {
  res.end(req.params.url);
});

app.get('/:id(\\d+)', function(req, res) {
  res.end(req.params.id);
});

app.listen(port);
