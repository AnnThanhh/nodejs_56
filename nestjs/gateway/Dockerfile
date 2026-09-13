#chỉ định base image
FROM node:24.9.0-alpine

#chỉ định thư mục hoạt động mặc định /app
WORKDIR /app

#copy package.json and package-lock.json
COPY package*.json .

#install dependencies
RUN npm install

COPY . .

RUN npm run build

#chỉ định lệnh chạy khi container khởi động
CMD ["node", "dist/main"]

#run chỉ chạy khi build image
#cmd chạy khi container khởi động