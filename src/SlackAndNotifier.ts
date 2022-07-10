import CONFIG from '../config.json'
import express from 'express'
import { SendMessage } from './domain/SendMessage'
import { SlackClient } from './SlackClient'
import { Push } from './domain/Push'
const YouTubeNotifier = require('youtube-notification')

const app = express()
const port = CONFIG.EXPRESS.PORT

const notifier = new YouTubeNotifier({
  hubCallback: CONFIG.NOTIFICATOR.HUB_CALL
})

app.use(CONFIG.EXPRESS.END_POINT, notifier.listener())

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})

notifier.subscribe(CONFIG.NOTIFICATOR.ACCOUNT_ID)

notifier.on('subscribe', (data: Push) => {
  console.log('Subscribed')
  console.log(data)
})

notifier.on('notified', (data: Push) => {
  console.log('New Video')
  console.log(data)

  const slackClient = new SlackClient()
  const service = new SendMessage(slackClient)
  service.run(data).then(() => {}).catch((error) => console.log(error))
})
