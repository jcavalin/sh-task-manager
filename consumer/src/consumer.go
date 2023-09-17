package main

import (
	config "consumer/src/config"
	error "consumer/src/helpers/error"
	mailer "consumer/src/helpers/mailer"
	"encoding/json"
	"log"

	amqp "github.com/rabbitmq/amqp091-go"
)

func main() {
	host, port, username, password, name := config.QueueConfiguration()

	connection, err := amqp.Dial("amqp://" + username + ":" + password + "@" + host + ":" + port)
	error.FailOnError(err, "Failed to connect to RabbitMQ")
	defer connection.Close()

	channel, err := connection.Channel()
	error.FailOnError(err, "Failed to open a channel")
	defer channel.Close()

	queue, err := channel.QueueDeclare(name, false, false, false, false, nil)
	error.FailOnError(err, "Failed to declare a queue")

	messages, err := channel.Consume(queue.Name, "", true, false, false, false, nil)
	error.FailOnError(err, "Failed to register a consumer")

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

func unmarshalQueueMessage(messageBody []byte) mailer.MailerMessage {
	var queueMessage mailer.MailerMessage
	unmarshalError := json.Unmarshal(messageBody, &queueMessage)
	error.FailOnError(unmarshalError, "Failed to decode message")

	return queueMessage
}
