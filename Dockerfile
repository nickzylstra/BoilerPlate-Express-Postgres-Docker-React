FROM node:12.15-alpine

RUN mkdir -p /app

WORKDIR /app

COPY . /app

RUN npm install

ENV NODE_ENV="production"

EXPOSE 3000

CMD [ "npm", "run", "start" ]
