# Day 06 — Services & Networking Basics

## Learning Objectives
- Expose apps inside the cluster using Services.

## Core Kubernetes Concepts
- Service types: `ClusterIP`, `NodePort`, and `LoadBalancer`.
- CoreDNS provides service name resolution inside cluster.

## kubectl Commands to Practice
- `kubectl expose deployment/my-deploy --type=NodePort --port=80`
- `kubectl get svc`

## Hands-on Labs / Tasks
1. Expose the `nginx` Deployment as ClusterIP and NodePort.
2. Test DNS resolution inside a busybox pod: `nslookup my-service`.

## Daily Deliverable
- `days/day-06/service.yaml` and test results.

## Common Errors & Debugging Tips
- Service not routing: check labels/selectors and `kubectl describe svc`.

## Free Learning Resources
- Services: https://kubernetes.io/docs/concepts/services-networking/service/
- CoreDNS: https://coredns.io/
