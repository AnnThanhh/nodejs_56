import 'dotenv/config';

export const RABBITMQ_URL = process.env.RABBITMQ_URL;
export const DATABASE_URL = process.env.DATABASE_URL;

console.log(
  '\n',
  {
    'RABBITMQ_URL:': RABBITMQ_URL,
    'DATABASE_URL:': DATABASE_URL,
  },
  '\n',
);
