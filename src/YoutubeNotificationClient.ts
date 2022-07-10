import { SendMessage } from './domain/SendMessage'
import { SlackClient } from './SlackClient'
import { Push } from './domain/Push'
import CONFIG from '../config.json'
const YouTubeNotifier = require('youtube-notification')

export class YoutubeNotificationClient {
  static initialize () {
    const notifier = new YouTubeNotifier({
      hubCallback: CONFIG.NOTIFICATOR.HUB_CALL
    })

    notifier.subscribe(CONFIG.NOTIFICATOR.ACCOUNT_IDS)

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

    return notifier
  }
}
