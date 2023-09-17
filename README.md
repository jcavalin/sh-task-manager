# SH Tasks Manager System

#### How to execute
To initialize the project, run the following command on the root directory:

```
docker-compose up --build
```

Wait for all services to be up and running, then go to [http://localhost](http://localhost).

<sub>PS: Also, wait for the migrations.</sub>

#### Services
1. Node
    - Application
    - http://localhost
2. Go
    - Consumer
3. MySql
    - Database
    - Port 3306
4. Adminer
    - Database web client
    - http://localhost:8081
    - Server: db
    - Username: mysql
    - Password: mypass
    - Database: app
5. Flyway
    - Migrations
6. Mailhog
    - Email service and client
    - http://localhost:8082
    - Port 1025
7. RabbitMQ
    - Message Broker
    - http://localhost:8083
    - Port 5672
    - Username: myuser
    - Password: mypassword

#### Application
The application has three endpoints:

```
POST /api/v1/login/auth
    - Authenticate a user
    - Example: curl --request POST \
                  --url http://localhost/api/v1/login/auth \
                  --header 'Content-Type: application/json' \
                  --data '{
                    "email": "technician.2@shtaskmapp.com",
                    "password": "technician.2@secret"
                }'
GET /api/v1/tasks
    - Get tasks
    - Example: curl --request GET \
              --url http://localhost/api/v1/tasks \
              --header 'authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

POST /api/v1/tasks
    - Create a new task
    - If any personal information should not be sent outside of the system, just add it between the <private> tags and it will be obfuscated before sending it.
    - Example: curl --request POST \
                  --url http://localhost/api/v1/tasks \
                  --header 'Content-Type: application/json' \
                  --header 'authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' \
                  --data '{
                    "summary" : "Summary <private>this is private</private>",
                    "date": "2023-09-17"
                }'
```

Besides the authentication endpoint, each other needs the ```authorization``` header to be informed in the request.
There are three users available:

```
Technician type:
    - Technician 1 
        - email: technician.1@shtaskmapp.com 
        - password: technician.1@secret
    - Technician 2
        - email: technician.2@shtaskmapp.com 
        - password: technician.2@secret
Manager type:
    - email: manager@shtaskmapp.com 
    - password: manager@secret
```

#### Tests
To run tests, execute the following command:
```
docker-compose exec application npm run test
```