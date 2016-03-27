var express = require('express');
var MongoClient = require('mongodb').MongoClient;

var dbService = require('./src/dbService.js');
var urlService = require('./src/urlService.js');

var port = +process.env.PORT || 8080;
var host = process.env.NODE_ENV === 'production' ?
  'https://xz64-url-shortener.herokuapp.com' : 'http://localhost:' + port;
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
.then(setupMongo)
.then(function() {
  urlService.init(host);
  dbService.init(collection);
  app.listen(port);
})
.catch(function(err) {
  console.log(err);
});
