export interface IInput {
  name: string;
  email: string;
  message: string;
}
export interface Env {
  SENDER_NAME: string;
  SENDER_EMAIL: string;
  SEND_TO_EMAIL: string;
  SEND_TO_NAME: string;
  REPLY_TO_EMAIL: string;
  REPLY_TO_NAME: string;
  SIB_API_KEY: string;
}
