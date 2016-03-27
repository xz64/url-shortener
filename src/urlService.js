var validUrl = require('valid-url');
var dbService = require('./dbService.js');

var urlService = {
  isValidUrl: function isValidUrl(url) {
    return validUrl.isUri(url);
  },
  processUrl: function processUrl(url) {
    return new Promise(function(resolve, reject) {
      if(!this.isValidUrl(url)) {
        resolve({ error: 'Invalid URL format'});
      }
      dbService.insertURL(url)
      .then(function(obj) {
        resolve({original_url: obj.url, short_url: this.host + '/' + obj.seq});
      }.bind(this))
      .catch(function(err) {
        reject(err);
      });
    }.bind(this));
  },
  getUrl: function getUrl(seq) {
    return dbService.getURL(seq)
    .then(function(obj) {
      return new Promise(function(resolve, reject) {
        if(obj) {
          resolve(obj.url);
        }
        else {
          reject({ error: 'link does not exist'});
        }
      });
    });
  },
  init: function init(host) {
    this.host = host;
  }
};

module.exports = urlService;
