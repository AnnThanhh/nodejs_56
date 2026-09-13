import 'dotenv/config';

export const RABBITMQ_URL = process.env.RABBITMQ_URL;
export const SMTP_USER = process.env.SMTP_USER;
export const SMTP_PASS = process.env.SMTP_PASS;

console.log(
  '\n',
  {
    'RABBITMQ_URL:': RABBITMQ_URL,
    'SMTP_USER:': SMTP_USER,
    'SMTP_PASS:': SMTP_PASS,
  },
  '\n',
);
