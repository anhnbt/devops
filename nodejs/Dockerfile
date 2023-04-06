# syntax=docker/dockerfile:1

FROM node:18-alpine
ENV CLASS=SHB_DevOps
ENV APP_PORT=8080
ENV APP_ENV=dev

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"] 

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "node", "server.js" ]