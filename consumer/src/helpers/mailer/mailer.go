package mailer

import (
	"net/smtp"

	config "consumer/src/config"
	error "consumer/src/helpers/error"

	"github.com/jordan-wright/email"
)

type MailerMessage struct {
	Subject string
	Body    string
	From    string
	To      []string
}

func SendEmail(message MailerMessage) {
	host, port, username, password := config.EmailConfiguration()

	emailMessage := email.NewEmail()
	emailMessage.From = message.From
	emailMessage.To = message.To
	emailMessage.Subject = message.Subject
	emailMessage.Text = []byte(message.Body)

	err := emailMessage.Send(host+":"+port, smtp.CRAMMD5Auth(username, password))
	error.FailOnError(err, "Failed to send email")
}
