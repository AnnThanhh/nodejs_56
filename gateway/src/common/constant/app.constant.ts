import 'dotenv/config';

export const DATABASE_URL = process.env.DATABASE_URL;
export const ACCESS_TOKEN_SECRET_KEY = process.env
  .ACCESS_TOKEN_SECRET_KEY as string;
export const REFRESH_TOKEN_SECRET_KEY = process.env
  .REFRESH_TOKEN_SECRET_KEY as string;
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
export const REDIS_URL = process.env.REDIS_URL;

console.log(
  '\n',
  {
    'DATABASE_URL:': DATABASE_URL,
    'ACCESS_TOKEN_SECRET_KEY:': ACCESS_TOKEN_SECRET_KEY,
    'REFRESH_TOKEN_SECRET_KEY:': REFRESH_TOKEN_SECRET_KEY,
    'GOOGLE_CLIENT_ID:': GOOGLE_CLIENT_ID,
    'GOOGLE_CLIENT_SECRET:': GOOGLE_CLIENT_SECRET,
    'REDIS_URL:': REDIS_URL,
  },
  '\n',
);
