FROM node:16.15.0-alpine

WORKDIR /api

COPY ./ /api

RUN sh -c 'npm install'
RUN sh -c 'npm run build'

EXPOSE 8080

CMD [ "npm", "start" ]
