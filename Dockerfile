FROM node:16-alpine3.11
WORKDIR /app
COPY package.json .
RUN yarn
COPY . ./
EXPOSE 5000