FROM node:24-alpine

RUN apk add --no-cache bash openssl nano

WORKDIR /usr/src/app

# Copy only package.json for faster install
COPY package*.json ./
RUN npm install

# Copy the rest
COPY . .

EXPOSE 8000

# Runtime Prisma generate ensures client exists after bind mount
CMD ["sh", "-c", "npx prisma generate && npm run start:dev"]
