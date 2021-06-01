FROM node:10-alpine as builder

COPY package.json .
COPY yarn.lock .
RUN yarn

COPY . .
RUN yarn test
