FROM node:14.16.0-alpine3.12
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn
COPY src src
COPY .env .
CMD [ "yarn","start"]

