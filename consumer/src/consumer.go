package main

import (
	"encoding/json"
	"log"
	"time"

	config "consumer/src/config"
	logger "consumer/src/helpers/logger"
	mailer "consumer/src/helpers/mailer"

	amqp "github.com/rabbitmq/amqp091-go"
)

func main() {
	host, port, username, password, name := config.QueueConfiguration()

	connection := connectToQueue(host, port, username, password, 10)
	defer connection.Close()

	channel, err := connection.Channel()
	logger.FailOnError(err, "Failed to open a channel")
	defer channel.Close()

	queue, err := channel.QueueDeclare(name, false, false, false, false, nil)
	logger.FailOnError(err, "Failed to declare a queue")

	messages, err := channel.Consume(queue.Name, "", true, false, false, false, nil)
	logger.FailOnError(err, "Failed to register a consumer")

	var forever chan struct{}

	go func() {
		for message := range messages {
			log.Printf("Received a message: %s", message.Body)

			queueMessage := unmarshalQueueMessage(message.Body)
			mailer.SendEmail(queueMessage)
		}
	}()

	log.Printf("Consumer waiting for messages...")
	<-forever
}

func connectToQueue(host, port, username, password string, retry int) *amqp.Connection {
	connection, err := amqp.Dial("amqp://" + username + ":" + password + "@" + host + ":" + port)

	if err != nil && retry == 0 {
		logger.FailOnError(err, "Failed to connect to queue")
	}

	if err != nil {
		log.Println("Failed to connect to queue, trying again...")
		time.Sleep(5 * time.Second)

		return connectToQueue(host, port, username, password, retry-1)
	}

	return connection
}

func unmarshalQueueMessage(messageBody []byte) mailer.MailerMessage {
	var queueMessage mailer.MailerMessage
	unmarshalError := json.Unmarshal(messageBody, &queueMessage)
	logger.FailOnError(unmarshalError, "Failed to decode message")

	return queueMessage
}
