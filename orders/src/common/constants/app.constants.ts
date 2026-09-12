import 'dotenv/config';

export const RABBITMQ_URL = process.env.RABBITMQ_URL;

console.log(
  '\n',
  {
    'RABBITMQ_URL:': RABBITMQ_URL,
  },
  '\n',
);
