import { Client } from "./Client";

export class SendMessage {
  constructor(private client: Client) { }

  async run(message: any) {
    await this.client.send(JSON.stringify(message, null, 2))
  }
}