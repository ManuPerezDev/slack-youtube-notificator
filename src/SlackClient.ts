import CONFIG from "../config.json";
import { App } from "@slack/bolt";
import { Client } from "./domain/Client";

export class SlackClient implements Client {
  send(message: string) {
    const slackApp = new App({
      token: CONFIG.SLACK_CLIENT.TOKEN,
      signingSecret: CONFIG.SLACK_CLIENT.SIGN_IN_SECRET,
      socketMode: true, // enable the following to use socket mode
      appToken: CONFIG.SLACK_CLIENT.APP_TOKEN
    });
    
    slackApp.start(CONFIG.SLACK_CLIENT.PORT).then((result: any) => console.log(result));

    slackApp.client.chat.postMessage({
      channel: CONFIG.SLACK_CLIENT.CHANNEL,
      text: message
    });
  }
}