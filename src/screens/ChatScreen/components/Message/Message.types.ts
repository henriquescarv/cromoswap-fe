export type MessageProps = {
  message: string,
  sender: 'me' | 'other',
  date?: Date,
}