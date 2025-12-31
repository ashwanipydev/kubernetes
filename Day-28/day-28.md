<h1 align="center">Day 28: Week 4 Project - Secure App with RBAC</h1>

<p align="center">
  <a href="../Day-27/day-27.md">« Day 27</a> | <a href="../README.md">Home</a> | <a href="../Day-29/day-29.md">Day 29 »</a>
</p>

---

## 🎯 Project Overview

Deploy a multi-environment application with proper namespace isolation, resource limits, and health checks.

---

## 🏗️ Architecture

```
┌───────────────────────────────────────────────────────────┐
│                   Kubernetes Cluster                      │
│                                                           │
│  ┌─────────────────────┐  ┌─────────────────────┐        │
│  │   DEVELOPMENT       │  │   PRODUCTION        │        │
│  │   Namespace          │  │   Namespace          │        │
│  │                     │  │                     │        │
│  │  ResourceQuota      │  │  ResourceQuota      │        │
│  │  LimitRange         │  │  LimitRange         │        │
│  │                     │  │                     │        │
│  │  ┌───────────────┐  │  │  ┌───────────────┐  │        │
│  │  │   Web App     │  │  │  │   Web App     │  │        │
│  │  │   (2 pods)    │  │  │  │   (4 pods)    │  │        │
│  │  └───────────────┘  │  │  └───────────────┘  │        │
│  └─────────────────────┘  └─────────────────────┘        │
└───────────────────────────────────────────────────────────┘
```

---

## 📝 Step 1: Create Namespaces

```yaml
# namespaces.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: development
  labels:
    env: dev
---
apiVersion: v1
kind: Namespace
metadata:
  name: production
  labels:
    env: prod
```

---

## 📝 Step 2: Resource Quotas

```yaml
# quotas.yaml
apiVersion: v1
kind: ResourceQuota
metadata:
  name: dev-quota
  namespace: development
spec:
  hard:
    pods: "10"
    requests.cpu: "2"
    requests.memory: 4Gi
    limits.cpu: "4"
    limits.memory: 8Gi
---
apiVersion: v1
kind: ResourceQuota
metadata:
  name: prod-quota
  namespace: production
spec:
  hard:
    pods: "20"
    requests.cpu: "8"
    requests.memory: 16Gi
    limits.cpu: "16"
    limits.memory: 32Gi
```

---

## 📝 Step 3: LimitRanges

```yaml
# limitranges.yaml
apiVersion: v1
kind: LimitRange
metadata:
  name: default-limits
  namespace: development
spec:
  limits:
  - type: Container
    default:
      cpu: "200m"
      memory: "256Mi"
    defaultRequest:
      cpu: "100m"
      memory: "128Mi"
---
apiVersion: v1
kind: LimitRange
metadata:
  name: default-limits
  namespace: production
spec:
  limits:
  - type: Container
    default:
      cpu: "500m"
      memory: "512Mi"
    defaultRequest:
      cpu: "250m"
      memory: "256Mi"
```

---

## 📝 Step 4: Application Deployment

```yaml
# app-dev.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: webapp
  namespace: development
spec:
  replicas: 2
  selector:
    matchLabels:
      app: webapp
  template:
    metadata:
      labels:
        app: webapp
    spec:
      containers:
      - name: nginx
        image: nginx
        ports:
        - containerPort: 80
        livenessProbe:
          httpGet:
            path: /
            port: 80
          initialDelaySeconds: 10
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /
            port: 80
          initialDelaySeconds: 5
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: webapp
  namespace: development
spec:
  selector:
    app: webapp
  ports:
  - port: 80
```

---

## 🚀 Deployment Steps

```bash
mkdir week4-project && cd week4-project

# Apply all manifests
kubectl apply -f namespaces.yaml
kubectl apply -f quotas.yaml
kubectl apply -f limitranges.yaml
kubectl apply -f app-dev.yaml

# Verify
kubectl get all -n development
kubectl get quota -n development
kubectl get limitrange -n development
```

---

## ✅ Validation Checklist

| # | Check | Command |
|---|-------|---------|
| 1 | Namespaces created | `kubectl get ns` |
| 2 | Quotas applied | `kubectl get quota -A` |
| 3 | LimitRanges set | `kubectl get limitrange -A` |
| 4 | Apps running | `kubectl get pods -n development` |
| 5 | Health checks | `kubectl describe pod -n development` |

---

## 📝 Week 4 Summary

| Day | Topic |
|-----|-------|
| 22 | Namespaces |
| 23 | Resource Quotas |
| 24 | LimitRanges |
| 25 | Health Checks |
| 26 | Rolling Updates |
| 27 | Rollbacks |
| 28 | Week 4 Project |

---

## ➡️ What's Next?

**Week 5** covers:
- Ingress and traffic routing
- RBAC and security
- Helm package management

---

<p align="center">
  <a href="../Day-27/day-27.md">« Day 27</a> | <a href="../README.md">Home</a> | <a href="../Day-29/day-29.md">Day 29 »</a>
</p>
