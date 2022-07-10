import CONFIG from '../config.json'
import express from 'express'
import { YoutubeNotificationClient } from './YoutubeNotificationClient'

const app = express()
const port = CONFIG.EXPRESS.PORT
const notifier = YoutubeNotificationClient.initialize()

app.use(CONFIG.EXPRESS.END_POINT, notifier.listener())

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
