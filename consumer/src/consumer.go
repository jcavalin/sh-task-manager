package main

import (
	"encoding/json"
	"log"
	"net/smtp"
	"os"

	email "github.com/jordan-wright/email"
	amqp "github.com/rabbitmq/amqp091-go"
)

type NotifyQueueMessage struct {
	Subject string
	Body    string
	From    string
	To      []string
}

func main() {
	host := os.Getenv("QUEUE_HOST")
	port := os.Getenv("QUEUE_PORT")
	username := os.Getenv("QUEUE_USERNAME")
	password := os.Getenv("QUEUE_PASSWORD")
	name := os.Getenv("QUEUE_NOTIFY_NAME")

	connection, err := amqp.Dial("amqp://" + username + ":" + password + "@" + host + ":" + port)
	failOnError(err, "Failed to connect to RabbitMQ")
	defer connection.Close()

	channel, err := connection.Channel()
	failOnError(err, "Failed to open a channel")
	defer channel.Close()

	queue, err := channel.QueueDeclare(name, false, false, false, false, nil)
	failOnError(err, "Failed to declare a queue")

	messages, err := channel.Consume(queue.Name, "", true, false, false, false, nil)
	failOnError(err, "Failed to register a consumer")

	var forever chan struct{}

	go func() {
		for message := range messages {
			log.Printf("Received a message: %s", message.Body)

			queueMessage := unmarshalQueueMessage(message.Body)
			sendEmail(queueMessage)
		}
	}()

	log.Printf("[*] Waiting for messages. To exit press CTRL+C")
	<-forever
}

func unmarshalQueueMessage(messageBody []byte) NotifyQueueMessage {
	var queueMessage NotifyQueueMessage
	unmarshalError := json.Unmarshal(messageBody, &queueMessage)
	failOnError(unmarshalError, "Failed to decode message")

	return queueMessage
}

func sendEmail(message NotifyQueueMessage) {
	host := os.Getenv("EMAIL_HOST")
	port := os.Getenv("EMAIL_PORT")
	username := os.Getenv("EMAIL_USERNAME")
	password := os.Getenv("EMAIL_PASSWORD")

	emailMessage := email.NewEmail()
	emailMessage.From = message.From
	emailMessage.To = message.To
	emailMessage.Subject = message.Subject
	emailMessage.Text = []byte(message.Body)

	err := emailMessage.Send(host+":"+port, smtp.CRAMMD5Auth(username, password))
	failOnError(err, "Failed to send email")
}

func failOnError(err error, msg string) {
	if err != nil {
		log.Panicf("%s: %s", msg, err)
	}
}
