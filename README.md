# Project Demonstrating Observability For NodeJs Applications 

This is a project demonstrating Observability using :

* [Prometheus](https://prometheus.io/) for monitoring and alerting
* [Loki](https://grafana.com/oss/loki/) for Distributed Logging
* [jaeger](https://grafana.com/oss/tempo/) for Distributed Tracing
* [Grafana](https://grafana.com/) for visualization

And basically integrates the following

* [Opentelemetry](https://opentelemetry.io/)
* [NodeJs Application](https://nodejs.org/en/)
* [Mongodb Application](https://www.mongodb.com/docs/)
* [Kubernetes](https://kubernetes.io/es/docs/home/)


And basically it demonstrate the best practices for :

* Demonstrate how to use Opentelemetry API
* Logging : Using winston
* Metrics : Using prom-client and prometheus-api-metrics

# Running

## settings
Install Minikube https://minikube.sigs.k8s.io/docs/start/
Install Kubectl https://kubernetes.io/es/docs/tasks/tools/
Install Helm https://helm.sh/docs/intro/install/ 

Create a k8 cluster 
````bash
minikube start --nodes 2 -p demo
````

Minikube Dashboard 
````bash
    minikube dashboard -p demo
````
## install prometheus-stack (grafana,prometheus,node-exporter,kube-state-metrics,alertmanager)
````bash
    helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
    helm repo update
    kubectl create namespace observability
    helm install prometheus-stack prometheus-community/kube-prometheus-stack --values prometheus-stack/prometheus-values.yaml
    kubectl get pods -n observability
    kubectl port-forward service/prometheus-stack-grafana 3000:80 -n observability
         username: admin
         pass:     prom-operator
    kubectl port-forward service/prometheus-stack-kube-prom-prometheus 9090:9090 -n observability
    kubectl port-forward service/alertmanager-operated 9093:9093 -n observability
````

## install Mongodb
````bash
    helm repo add mongodb https://mongodb.github.io/helm-charts
    helm install community-operator mongodb/community-operator --namespace mongodb --create-namespace
    kubectl apply -f mongodb/mongodb.yaml
    kubectl get pods -n mongodb
    kubectl get secret demo-mongodb-admin-admin -n mongodb -o json | jq -r '.data | with_entries(.value |= @base64d)'
    kubectl port-forward services/demo-mongodb-svc 27017 -n mongodb

````

## install Mongodb exporter
````bash
    helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
    helm install mongo-exporter prometheus-community/prometheus-mongodb-exporter --values mongodb/exporter/values.yaml --namespace mongodb
    kubectl port-forward services/mongo-exporter-prometheus-mongodb-exporter  9216 -n mongodb
    Dashboard: https://grafana.com/grafana/dashboards/7353-mongodb-overview/
````
## deploy application
````bash
    docker build -t  menco92/app:latest app/    #tag of registry
    docker push menco92/app:latest
    kubectl create namespace app
    kubectl apply -f app/manifest
    kubectl port-forward service/api-blogs-svc   3005 -n app
````

## deploy loki
````bash
    helm repo add grafana https://grafana.github.io/helm-charts
    helm install loki --namespace=observability grafana/loki-stack --values loki/values.yaml
    https://grafana.com/grafana/dashboards/13186-loki-dashboard/
````
## Metrics App
    https://grafana.com/grafana/dashboards/12230-node-js-dashboard/ 
    
## deploy tracing Jaeger
````bash
    kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.6.3/cert-manager.yaml
    kubectl create -f https://github.com/jaegertracing/jaeger-operator/releases/download/v1.41.0/jaeger-operator.yaml -n observability 
    kubectl apply -f tracing/jaeger.yaml
    kubectl port-forward service/simplest-query 16686 -n observability
````
## deploy Opentelemetry Collector
````bash
    kubectl apply -f https://github.com/open-telemetry/opentelemetry-operator/releases/latest/download/opentelemetry-operator.yaml
    kubectl apply -f tracing/collector.yaml
````


