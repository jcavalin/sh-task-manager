#!/bin/sh

go mod download && go mod verify
go run src/main.go