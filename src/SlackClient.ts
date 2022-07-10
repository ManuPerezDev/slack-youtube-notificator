import CONFIG from '../config.json'
import { App } from '@slack/bolt'
import { Client } from './domain/Client'

export class SlackClient implements Client {
  async send (message: string): Promise<void> {
    const slackApp = new App({
      token: CONFIG.SLACK_CLIENT.TOKEN,
      signingSecret: CONFIG.SLACK_CLIENT.SIGN_IN_SECRET,
      socketMode: true, // enable the following to use socket mode
      appToken: CONFIG.SLACK_CLIENT.APP_TOKEN
    })

    await slackApp.start(CONFIG.SLACK_CLIENT.PORT)

    await slackApp.client.chat.postMessage({
      channel: CONFIG.SLACK_CLIENT.CHANNEL,
      text: message
    })

    await slackApp.stop()
  }
}
