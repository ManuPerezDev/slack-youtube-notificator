const express = require('express');
require('dotenv').config();
const YouTubeNotifier = require('youtube-notification');
const { SendMessage } = require('./domain/SendMessage');
const { SlackClient } = require('./SlackClient');

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

notifier.on('subscribe', (data: any, error: any) => {
  if(error) console.log(error);
  console.log('Subscribed');
  console.log(data);
});

notifier.on('notified', (data: any, error: any) => {
  if(error) console.log(error);
  console.log('New Video');
  console.log(data);
  
  const slackClient = new SlackClient()
  const service = new SendMessage(slackClient)
  service.run(data)
});
