# SH Tasks Manager System k8s deployment

Using [minikube](https://kubernetes.io/docs/tutorials/hello-minikube/) 
take the following steps on the root directory of the project:

1. Build and create the application image
    ```
    cd application
    docker build -t sh-task-manager-application . -f ./deploy.Dockerfile
    minikube image load sh-task-manager-application
    ```
   
2. Build and create the consumer image
    ```
    cd consumer
    docker build -t sh-task-manager-consumer . -f ./deploy.Dockerfile
    minikube image load sh-task-manager-consumer
    ```

3. Create a mounting point for migration files
    ```
    minikube mount ./migrations:/mnt/migrations
    ```

4. Deploy the resources
    ```
    kubectl apply -k ./k8s
    ```

5. Start the necessary services
    ```
    minikube service application
    minikube service adminer
    minikube service rabbitmq
    minikube service mailhog
    ```

6. Remove the resources
    ```
    kubectl delete -k ./k8s
    ```