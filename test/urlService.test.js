var test = require('tape');
var urlService = require('../src/urlService.js');

test('detects bad url', function(t) {
  t.notOk(urlService.isValidUrl('asdrr//asdf.asdf.com/'));
  t.end();
});

test('detects proper url', function(t) {
  t.ok(urlService.isValidUrl('https://asdf.asdf.com/'));
  t.end();
});
