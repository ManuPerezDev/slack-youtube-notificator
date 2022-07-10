export interface Push {
  video: {
    id: string
    title: string
    link: string
  }
  channel: {
    id: string
    name: string
    link: string
  }
  published: Date
  updated: Date
}