FROM node:24-bookworm-slim

RUN apt-get update \
    && apt-get install -y --no-install-recommends openssl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY --chown=node:node . .

# prisma.config.ts yêu cầu DATABASE_URL ngay cả khi chỉ generate client.
RUN DATABASE_URL=mysql://express:build@mysql:3306/nodejs_56 npx prisma generate

USER node
EXPOSE 3069

# Đồng bộ schema cho database phát triển; không tự chấp nhận mất dữ liệu.
CMD ["sh", "-c", "npx prisma db push && exec node server.js"]
