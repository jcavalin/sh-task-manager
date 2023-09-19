FROM golang:1.21

WORKDIR /usr/src/app

COPY . .
RUN go mod download && go mod verify

RUN mkdir build
RUN go build -v -o ./build ./src
RUN mv ./build/src ./build/consumer

CMD ["./build/consumer"]