var MongoClient = require( 'mongodb' ).MongoClient;;

var _db:any

let Client = {
 connectToServer: (callback: Function) => {
    MongoClient.connect( "mongodb://localhost:27017/machinomy", function( err:any, db:any ) {
      _db = db
      return callback(err)
    } );
  },

  db: () => {
    return _db
  }
}

export default Client
