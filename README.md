# prometheus-alertmanager-demo
Trying out minikube + prometheus + alert manager + telegram bot integration


Commands in order to setup:

## minikube


minikube start 

eval $(minikube docker-env)


## app // todo: maybe change port to something non standard


docker build -t unhealthy-express:0.0.1 .

kubectl create namespace apps

kubectl apply -f ./k8s/pod.yml


## prometheus


kubectl create namespace monitoring

kubectl create -f  ./prometheus/clusterRole.yaml

kubectl create -f  ./prometheus/config-map.yaml

kubectl create  -f ./prometheus/prometheus-deployment.yaml

kubectl create -f ./prometheus/prometheus-service.yaml --namespace=monitoring



## alertmanager (change AlertManagerConfigmap receiver values for Telegram bot first)


kubectl create -f ./alert-manager/AlertManagerConfigmap.yaml

kubectl create -f ./alert-manager/AlertTemplateConfigMap.yaml

kubectl create -f ./alert-manager/Deployment.yaml

kubectl create -f ./alert-manager/Service.yaml




## node-exporter 


kubectl create -f ./node-exporter/daemonset.yml

kubectl create -f ./alert-manager/service.yml


## fix permissions 


kubectl create clusterrolebinding permissive-binding --clusterrole=cluster-admin --user=admin --user=kubelet --group=system:serviceaccounts
