<h1 align="center">Day 14: Week 2 Project - Microservices App</h1>

<p align="center">
  <a href="../Day-13/day-13.md">« Day 13</a> | <a href="../README.md">Home</a> | <a href="../Day-15/day-15.md">Day 15 »</a>
</p>

---

## 🎯 Project Overview

Deploy a multi-tier microservices application with frontend, backend API, and Redis cache.

---

## 🏗️ Architecture

```
                    ┌─────────────────────────────────────────┐
                    │           Kubernetes Cluster            │
                    │                                         │
    Users ─────────▶│  ┌──────────────────────────────────┐  │
                    │  │     Frontend Service              │  │
                    │  │     (NodePort: 30080)            │  │
                    │  └──────────────┬───────────────────┘  │
                    │                 │                       │
                    │                 ▼                       │
                    │  ┌──────────────────────────────────┐  │
                    │  │     Backend API Service          │  │
                    │  │     (ClusterIP)                  │  │
                    │  └──────────────┬───────────────────┘  │
                    │                 │                       │
                    │                 ▼                       │
                    │  ┌──────────────────────────────────┐  │
                    │  │     Redis Service                │  │
                    │  │     (ClusterIP)                  │  │
                    │  └──────────────────────────────────┘  │
                    └─────────────────────────────────────────┘
```

---

## 📝 Step 1: Redis (Database Tier)

```yaml
# redis.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: redis
  labels:
    app: redis
    tier: database
spec:
  replicas: 1
  selector:
    matchLabels:
      app: redis
  template:
    metadata:
      labels:
        app: redis
        tier: database
    spec:
      containers:
      - name: redis
        image: redis:alpine
        ports:
        - containerPort: 6379
        resources:
          requests:
            memory: "64Mi"
            cpu: "50m"
---
apiVersion: v1
kind: Service
metadata:
  name: redis
spec:
  selector:
    app: redis
  ports:
  - port: 6379
```

---

## 📝 Step 2: Backend API

```yaml
# backend.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend
  labels:
    app: backend
    tier: api
spec:
  replicas: 2
  selector:
    matchLabels:
      app: backend
  template:
    metadata:
      labels:
        app: backend
        tier: api
    spec:
      containers:
      - name: api
        image: nginx:alpine
        ports:
        - containerPort: 80
        env:
        - name: REDIS_HOST
          value: "redis"
        resources:
          requests:
            memory: "64Mi"
            cpu: "50m"
---
apiVersion: v1
kind: Service
metadata:
  name: backend
spec:
  selector:
    app: backend
  ports:
  - port: 80
```

---

## 📝 Step 3: Frontend

```yaml
# frontend.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend
  labels:
    app: frontend
    tier: web
spec:
  replicas: 3
  selector:
    matchLabels:
      app: frontend
  template:
    metadata:
      labels:
        app: frontend
        tier: web
    spec:
      containers:
      - name: web
        image: nginx:alpine
        ports:
        - containerPort: 80
        env:
        - name: BACKEND_URL
          value: "http://backend"
        resources:
          requests:
            memory: "64Mi"
            cpu: "50m"
---
apiVersion: v1
kind: Service
metadata:
  name: frontend
spec:
  type: NodePort
  selector:
    app: frontend
  ports:
  - port: 80
    nodePort: 30080
```

---

## 🚀 Deployment Steps

```bash
# Create project directory
mkdir week2-project && cd week2-project

# Save the YAML files above, then deploy in order
kubectl apply -f redis.yaml
kubectl apply -f backend.yaml
kubectl apply -f frontend.yaml

# Verify all resources
kubectl get all -l tier

# Check services
kubectl get svc
```

---

## ✅ Validation Checklist

| # | Check | Command | Expected |
|---|-------|---------|----------|
| 1 | Redis running | `kubectl get pods -l app=redis` | 1/1 Running |
| 2 | Backend running | `kubectl get pods -l app=backend` | 2/2 Running |
| 3 | Frontend running | `kubectl get pods -l app=frontend` | 3/3 Running |
| 4 | Services created | `kubectl get svc` | 3 services |
| 5 | Frontend accessible | `minikube service frontend --url` | Returns URL |

---

## 🔄 Additional Exercises

### Scale the Backend

```bash
kubectl scale deployment backend --replicas=4
```

### Verify Service Discovery

```bash
kubectl exec -it $(kubectl get pod -l app=frontend -o jsonpath='{.items[0].metadata.name}') -- sh
# Inside pod:
nslookup backend
nslookup redis
```

---

## 🧹 Cleanup

```bash
kubectl delete -f .
```

---

## 📝 Week 2 Summary

| Day | Topic |
|-----|-------|
| 8 | Pods Deep Dive |
| 9 | ReplicaSets |
| 10 | Deployments |
| 11 | ClusterIP Services |
| 12 | NodePort & LoadBalancer |
| 13 | Labels & Annotations |
| 14 | Microservices Project |

---

## ➡️ What's Next?

**Week 3** starts with:
- ConfigMaps for configuration
- Secrets for sensitive data
- Volumes and persistent storage

---

<p align="center">
  <a href="../Day-13/day-13.md">« Day 13</a> | <a href="../README.md">Home</a> | <a href="../Day-15/day-15.md">Day 15 »</a>
</p>
