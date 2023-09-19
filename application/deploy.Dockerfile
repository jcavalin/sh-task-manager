FROM node:20.6.1-alpine3.17

WORKDIR /usr/app

COPY . .
RUN npm install

CMD [ "npm", "run", "start" ]