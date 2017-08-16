var Promise = require("bluebird");
var MongoClient = Promise.promisifyAll(require("mongodb").MongoClient);
var MONGO_CONNECTION_STRING = 'mongodb://localhost:27017/usersdb';

var _db:any

let Client = {
 connectToServer: (callback: Function) => {
    MongoClient
      .connect(MONGO_CONNECTION_STRING, {
        promiseLibrary: Promise
      })
      .then(function(db:any) {
        _db = db
        return callback()
      })
      .catch(function(err:any) {
        console.error("ERROR", err);
        return callback(err)
      });
  },

  getDb: () => {
    return _db;
  }
}

export default Client
