FROM node:24-alpine

RUN apk add --no-cache openssl bash nano

WORKDIR /usr/src/app

COPY package*.json ./
# COPY prisma ./prisma/

RUN npm install
# RUN npm ci

COPY . .

EXPOSE 8000

CMD ["npm", "run", "start:dev"]