#

docker build --tag anhnbt/node-hello-world-bkacad-anhnbt .
docker tag node-hello-world-bkacad-anhnbt anhnbt/node-hello-world-bkacad-anhnbt:latest

## Get a list of images on your host 
docker images

## Chạy Docker Container

docker run --detach --publish 8080:8080 node-hello-world-bkacad-anhnbt

docker exec -it node-hello-world-bkacad-anhnbt sh
##

docker login
anhnbt/c5cj]yW8?8h"+zM?
docker push anhnbt/node-hello-world-bkacad-anhnbt:latest


https://hub.docker.com/repository/docker/anhnbt/node-hello-world-bkacad-anhnbt/general


#######

kubectl create deployment hello-minikube --image=anhnbt/node-hello-world-bkacad-anhnbt:latest
kubectl expose deployment hello-minikube --type=NodePort --port=8080
kubectl get services hello-minikube
minikube service hello-minikube
kubectl port-forward service/hello-minikube 7080:8080
Tada! Your application is now available at http://localhost:7080/.



kubectl apply -f deployment.yaml --record
kubectl get deploy
kubectl get rs
kubectl get pod