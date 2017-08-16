
import Promise = require('bluebird')
import mongo from '../mongo';
import Engine from './engine'

/**
 * Database engine.
 */
export default class EngineMongo implements Engine {
  datastore: any
  _find: (query: any) => Promise<any[]>
  _findOne: (query: any) => Promise<any>
  _insert: (document: any) => Promise<void>
  _update: (query: any, update: any, option: object) => Promise<void>

  constructor (path: string, inMemoryOnly: boolean = false) {
    // this.datastore = mongo.getDb();
    // this.datastore = new Datastore({ filename: path, autoload: true, inMemoryOnly: inMemoryOnly })
    // this._find = Promise.promisify(this.datastore.find, { context: this.datastore })
    // this._findOne = Promise.promisify(this.datastore.findOne, { context: this.datastore })
    // this._insert = Promise.promisify(this.datastore.insert, { context: this.datastore })
    // this._update = Promise.promisify(this.datastore.update, { context: this.datastore })
  }

  find<A> (query: {kind: string}): Promise<Array<A>> {
   let collection = query.kind || 'all'
   return new Promise((resolve:any, reject:any) => {
     mongo.getDb().collection(collection).find(query).toArray((err:any, res:any) => {
       resolve(res)
     })
    })
  }

  findOne<A> (query: {kind: string}): Promise<A|null> {
   let collection = query.kind || 'all'
    return new Promise<A>((resolve:any, reject:any) => {
      mongo.getDb().collection(collection).findOne(query, (err:any, res:any) => {
        resolve(res)
      })
    })
  }

  insert(document: {kind: string}): Promise<void> {
   let collection =  document.kind || 'all'
    return new Promise((resolve:any, reject:any) => {
      mongo.getDb().collection(collection).insert(document, (err:any, res:any) => {
        resolve()
      })
    })
  }

  update (query: {kind: string}, update: object): Promise<void> {
   let collection = query.kind || 'all'
    return new Promise((resolve:any, reject:any) => {
      mongo.getDb().collection(collection).update(query, update, {}, (err:any, res:any) => {
        resolve()
      })
    })
  }
}
