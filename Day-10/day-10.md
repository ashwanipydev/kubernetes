<h1 align="center">Day 10: Deployments</h1>

<p align="center">
  <a href="../Day-09/day-09.md">« Day 09</a> | <a href="../README.md">Home</a> | <a href="../Day-11/day-11.md">Day 11 »</a>
</p>

---

## 🎯 Learning Objectives

- Create and manage Deployments
- Understand deployment strategies
- Perform rolling updates
- Execute rollbacks
- Scale applications

---

## 📚 Core Concepts

### What is a Deployment?

A **Deployment** provides declarative updates for Pods and ReplicaSets. It manages:
- Pod creation via ReplicaSets
- Rolling updates with zero downtime
- Rollback to previous versions
- Scaling operations

### Deployment Strategies

| Strategy | Description | Use Case |
|----------|-------------|----------|
| **RollingUpdate** | Gradually replaces old pods | Default, zero-downtime |
| **Recreate** | Kill all old pods, then create new | Stateful apps requiring downtime |

---

## 📄 YAML Examples

### Basic Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels:
    app: nginx
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.24
        ports:
        - containerPort: 80
```

### Deployment with Strategy

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
spec:
  replicas: 4
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1        # Max pods above desired
      maxUnavailable: 1  # Max pods that can be unavailable
  selector:
    matchLabels:
      app: web
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
      - name: web
        image: nginx:1.24
        ports:
        - containerPort: 80
        readinessProbe:
          httpGet:
            path: /
            port: 80
          initialDelaySeconds: 5
          periodSeconds: 5
```

---

## ⌨️ Commands

```bash
# Create deployment
kubectl create deployment nginx --image=nginx:1.24 --replicas=3
kubectl apply -f deployment.yaml

# View deployments
kubectl get deployments
kubectl describe deployment nginx

# Scale
kubectl scale deployment nginx --replicas=5

# Update image (triggers rolling update)
kubectl set image deployment/nginx nginx=nginx:1.25

# Check rollout status
kubectl rollout status deployment/nginx

# View rollout history
kubectl rollout history deployment/nginx

# Rollback
kubectl rollout undo deployment/nginx
kubectl rollout undo deployment/nginx --to-revision=2

# Pause/Resume rollout
kubectl rollout pause deployment/nginx
kubectl rollout resume deployment/nginx
```

---

## 🔧 Hands-on Exercise

```bash
# Create deployment
kubectl create deployment web --image=nginx:1.24 --replicas=3

# Verify
kubectl get deploy,rs,pods

# Update image (rolling update)
kubectl set image deployment/web nginx=nginx:1.25

# Watch the rollout
kubectl rollout status deployment/web

# Check history
kubectl rollout history deployment/web

# Rollback
kubectl rollout undo deployment/web

# Clean up
kubectl delete deployment web
```

---

## 📝 Rolling Update Visualization

```
Before Update: nginx:1.24
┌───────┐ ┌───────┐ ┌───────┐
│Pod v1 │ │Pod v1 │ │Pod v1 │
└───────┘ └───────┘ └───────┘

During Update (maxSurge=1, maxUnavailable=1):
┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐
│Pod v1 │ │Pod v1 │ │Pod v2 │ │Pod v2 │
└───────┘ └───────┘ └───────┘ └───────┘

After Update: nginx:1.25
┌───────┐ ┌───────┐ ┌───────┐
│Pod v2 │ │Pod v2 │ │Pod v2 │
└───────┘ └───────┘ └───────┘
```

---

## ➡️ What's Next?

Tomorrow: **Day 11 - Services (ClusterIP)** - Internal pod communication

---

<p align="center">
  <a href="../Day-09/day-09.md">« Day 09</a> | <a href="../README.md">Home</a> | <a href="../Day-11/day-11.md">Day 11 »</a>
</p>
