FROM golang:1.20

WORKDIR /usr/app

ADD .docker/start.sh ../
RUN chmod +x ../start.sh
CMD [ "../start.sh" ]