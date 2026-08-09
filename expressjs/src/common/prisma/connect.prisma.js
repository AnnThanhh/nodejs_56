import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "./generated/prisma/client.ts";
import { DATABASE_URL } from "../constants/app.constant.js";

const url = new URL(DATABASE_URL);

const adapter = new PrismaMariaDb({
  host: url.hostname,
  user: url.username,
  password: url.password,
  database: url.pathname.slice(1),
  port: url.port,
});

const prisma = new PrismaClient({
  adapter,
  omit: {
    users: {
      password: true, // mặc định ẩn cột password
    },
  },
});

//kiểm tra kết nối
try {
  await prisma.$queryRaw`SELECT 1 + 1 AS result`;
  console.log("✅ [PRISMA] Connection has been established successfully.");
} catch (error) {
  console.error("❌ [PRISMA] Unable to connect to the database:", error);
}

export { prisma };
