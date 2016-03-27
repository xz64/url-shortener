var express = require('express');
var MongoClient = require('mongodb').MongoClient;

var port = +process.env.PORT || 8080;
var mongoURI = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/urls';
var db;
var collection;
var app = express();

function connectMongo() {
  return new Promise(function(resolve, reject) {
    MongoClient.connect(mongoURI, function(err, _db) {
      if(err) {
        reject(err);
      }
      else {
        db = _db;
        resolve();
      }
    });
  });
}

function setupMongo() {
  return new Promise(function(resolve, reject) {
    db.createCollection('urls', function(err, _collection) {
      if(err) {
        reject(err);
      }
      else {
        db = _db;
        collection = _collection;
        resolve();
      }
    });
  });
}

app.get('/new/:url', function(req, res) {
  res.end(req.params.url);
});

app.get('/:id(\\d+)', function(req, res) {
  res.end(req.params.id);
});

connectMongo()
.then(setupMongo())
.then(function() {
  app.listen(port);
})
.catch(function(err) {
  console.log(err);
});
