FROM node:20.6.1-alpine3.17

WORKDIR /usr/app

ADD .docker/start.sh ../
RUN chmod +x ../start.sh
CMD [ "../start.sh" ]