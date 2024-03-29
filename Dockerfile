
FROM node:20-alpine AS base

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
COPY . .
RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "start:prod"]
