import machinomy from '../index'
import CommandPrompt from './CommandPrompt'
import mongo from '../lib/mongo';

function buy (uri: string, command: CommandPrompt): void {
  let settings = machinomy.configuration.sender()
  let password: string = settings.password || ''
  if (command.parent && command.parent.password) {
    password = command.parent.password
  }

  mongo.connectToServer(()=>{
    if (settings.account) {
      machinomy.buy(uri, settings.account, password).then(contents => {
        mongo.getDb().close()
      }).catch((error: any) => {
        console.error(error)
      })
    } else {
      console.error('Sender account is not defined')
    }
  })
}

export default buy
