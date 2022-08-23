import { Env, IInput } from './types';

export async function sendMail(response: IInput, env: Env) {
  const { name, email, message } = response;
  const content = {
    sender: {
      name: env.SENDER_NAME,
      email: env.SENDER_EMAIL,
    },
    to: [
      {
        email: env.SEND_TO_EMAIL,
        name: env.SEND_TO_NAME,
      },
    ],
    textContent: `サイトからメッセージが届きましたよ。\n 名前:${name}\n メールアドレス:${email}\n メッセージ:${message}`,
    subject: 'サイトからメッセージが届きました',
    replyTo: {
      email: env.REPLY_TO_EMAIL,
      name: env.REPLY_TO_NAME,
    },
  };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'api-key': env.SIB_API_KEY,
    },
    body: JSON.stringify(content),
  };
  return fetch('https://api.sendinblue.com/v3/smtp/email', options);
}
