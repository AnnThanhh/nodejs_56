import "dotenv/config";

export const DATABASE_URL = process.env.DATABASE_URL;
export const ACCESS_TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET_KEY;
console.log(
  "\n",
  {
    "DATABASE_URL:": DATABASE_URL,
    "ACCESS_TOKEN_SECRET_KEY:": ACCESS_TOKEN_SECRET_KEY,
  },
  "\n",
);
