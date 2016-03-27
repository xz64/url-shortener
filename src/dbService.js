var dbService = {
  init: function init(collection) {
    this.collection = collection;
  },
  getNextSeq: function getNextSeq() {
    return new Promise(function(resolve, reject) {
      var cursor = this.collection.find().sort({_id: -1}).limit(1);
      cursor.next(function(err, item) {
        if(err) {
          reject(err);
        }
        else {
          resolve(item ? item.seq + 1 : 0);
        }
      });
    }.bind(this));
  }
};

module.exports = dbService;
