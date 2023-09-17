package config

import "os"

func QueueConfiguration() (string, string, string, string, string) {
	host := os.Getenv("QUEUE_HOST")
	port := os.Getenv("QUEUE_PORT")
	username := os.Getenv("QUEUE_USERNAME")
	password := os.Getenv("QUEUE_PASSWORD")
	name := os.Getenv("QUEUE_NOTIFY_NAME")

	return host, port, username, password, name
}

func EmailConfiguration() (string, string, string, string) {
	host := os.Getenv("EMAIL_HOST")
	port := os.Getenv("EMAIL_PORT")
	username := os.Getenv("EMAIL_USERNAME")
	password := os.Getenv("EMAIL_PASSWORD")

	return host, port, username, password
}
