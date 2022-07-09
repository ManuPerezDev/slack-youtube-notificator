import { Client } from "./domain/Client";
const { App } = require("@slack/bolt");
require('dotenv').config();

export class SlackClient implements Client {
  send(message: string) {
    const slackApp = new App({
      token: process.env.SLACK_TOKEN,
      signingSecret: process.env.SLACK_SIGN_IN_SECRET,
      socketMode: true, // enable the following to use socket mode
      appToken: process.env.SLACK_APP_TOKEN
    });
    
    slackApp.start(3001).then((result: any) => console.log(result));

    slackApp.client.chat.postMessage({
      channel: process.env.SLACK_CHANNEL,
      text: message
    });
  }
}