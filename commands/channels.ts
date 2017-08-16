import CommandPrompt from './CommandPrompt'
import machinomy from '../index'
import _ = require('lodash')
import Web3 = require('web3')
import mongo from '../lib/mongo';

function channels (command: CommandPrompt): void {
  let namespace = command.namespace || 'sender'
  let settings = machinomy.configuration.sender()
  let provider = machinomy.configuration.currentProvider()
  let web3 = new Web3(provider)

  let engine = machinomy.storage.engine(settings.databaseFile, true, settings.engine)

  mongo.connectToServer(()=>{
    machinomy.storage.channels(web3, engine, namespace).all().then(found => {
      console.log(found)
      _.each(found, paymentChannel => {
        machinomy.contract(web3).getState(paymentChannel.channelId).then(state => {
          if (state < 2) {
            paymentChannel.state = state
            console.log(paymentChannel)
            mongo.getDb().close()
          }
        })
      })
    })
  })
}

export default channels
