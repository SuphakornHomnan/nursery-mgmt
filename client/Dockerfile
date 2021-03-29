FROM node:14.16.0-alpine3.12
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn
COPY public public
COPY src src
RUN yarn build
COPY build .
CMD [ "yarn" ,"start:prod"]