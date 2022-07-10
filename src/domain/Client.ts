export interface Client {
  send(message: string): Promise<void>
}
