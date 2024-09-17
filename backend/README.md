minikube start

skaffold dev -p port-forwarding

kubectl get servcies to list all services

kubectl port-forward service/my-node-app-service-1 3001:3001 &
kubectl port-forward service/my-node-app-service-2 3002:3002 &
kubectl port-forward service/my-node-app-service-3 3003:3003 &
kubectl port-forward service/my-node-app-service-4 3004:3004 &
kubectl port-forward service/my-node-app-service-5 3005:3005 &
