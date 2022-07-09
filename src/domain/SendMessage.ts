import { Client } from "./Client";

export class SendMessage {
  constructor(private client: Client) { }

  run(message: any) {
    this.client.send(JSON.stringify(message, null, 2))
  }
}