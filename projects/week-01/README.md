# Week 01 — Multi-tier App Project

This project demonstrates a basic frontend-backend-database app on Kubernetes.

Contents
- `manifests/frontend-deployment.yaml`
- `manifests/frontend-service.yaml`
- `manifests/backend-deployment.yaml`
- `manifests/backend-service.yaml`

Quick start
1. `kubectl apply -f projects/week-01/manifests/`
2. `kubectl get all`

Validation
- Port-forward frontend and visit `http://localhost:8080`.
