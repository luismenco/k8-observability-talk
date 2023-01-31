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

## In Kubernetes
Install minikube https://minikube.sigs.k8s.io/docs/start/
Install kubectl https://kubernetes.io/es/docs/tasks/tools/
Install Helm https://helm.sh/docs/intro/install/ 

Create a k8 cluster 
````bash
minikube start --nodes 2 -p demo
````

Minikube Dashboard 
````bash
minikube dashboard -p demo
````
