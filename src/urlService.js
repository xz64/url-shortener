var validUrl = require('valid-url');

var urlService = {
  isValidUrl: function isValidUrl(url) {
    return validUrl.isUri(url);
  },
  processUrl: function processUrl(url) {
    if(!this.isValidUrl(url)) {
      return { error: 'Invalid URL format' };
    }
  }
};

module.exports = urlService;
