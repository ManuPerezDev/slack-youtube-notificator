const express = require('express');
require('dotenv').config();
const { App } = require("@slack/bolt");
const YouTubeNotifier = require('youtube-notification');

const app = express();
const port = process.env.PORT;

const notifier = new YouTubeNotifier({
  hubCallback: process.env.HUB_CALL,
});

app.use(process.env.END_POINT, notifier.listener());

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})

notifier.subscribe(process.env.ACCOUNT_ID);

const slackApp = new App({
  token: process.env.SLACK_TOKEN,
  signingSecret: process.env.SLACK_SIGN_IN_SECRET,
  socketMode:true, // enable the following to use socket mode
  appToken: process.env.SLACK_APP_TOKEN
});

slackApp.start(3001).then((result) => console.log(result));

notifier.on('subscribe', (data, error) => {
  if(error) console.log(error);
  console.log('Subscribed');
  console.log(data);
});

notifier.on('notified', (data, error) => {
  if(error) console.log(error);
  console.log('New Video');
  console.log(data);
  slackApp.client.chat.postMessage({
      channel: process.env.SLACK_CHANNEL,
      text: JSON.stringify(data, null, 2)
    });
});
