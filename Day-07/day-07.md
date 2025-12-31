<h1 align="center">Day 07: Week 1 Project - Static Web App</h1>

<p align="center">
  <a href="../Day-06/day-06.md">« Day 06</a> | <a href="../README.md">Home</a> | <a href="../Day-08/day-08.md">Day 08 »</a>
</p>

---

## 🎯 Project Overview

**Objective:** Deploy a static website on Kubernetes using NGINX, applying all Week 1 concepts.

**Skills Applied:**
- Container fundamentals
- Kubernetes architecture understanding
- Pod and Deployment creation
- Service exposure
- kubectl operations

---

## 📋 Problem Statement

You are tasked with deploying a company's static website on Kubernetes. The requirements are:
- High availability (multiple replicas)
- External accessibility
- Easy updates and rollbacks
- Resource-efficient deployment

---

## 🏗️ Architecture

```
                    ┌─────────────────────────────────────┐
                    │            KUBERNETES               │
                    │                                     │
    Users ────────▶ │  ┌──────────┐    ┌──────────────┐  │
                    │  │  Service │───▶│  Deployment  │  │
                    │  │ NodePort │    │  (3 replicas)│  │
                    │  └──────────┘    └──────────────┘  │
                    │                    │    │    │     │
                    │                   Pod  Pod  Pod    │
                    │                  nginx nginx nginx │
                    └─────────────────────────────────────┘
```

---

## 📝 Step 1: Create the Website Content

Create a ConfigMap to store the website HTML:

```yaml
# website-content.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: website-content
data:
  index.html: |
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to K8s</title>
        <style>
            body {
                font-family: 'Segoe UI', Arial, sans-serif;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 0;
                color: white;
            }
            .container {
                text-align: center;
                background: rgba(255,255,255,0.1);
                padding: 3rem;
                border-radius: 20px;
                backdrop-filter: blur(10px);
            }
            h1 { font-size: 3rem; margin-bottom: 1rem; }
            p { font-size: 1.2rem; opacity: 0.9; }
            .status { 
                margin-top: 2rem; 
                padding: 1rem; 
                background: rgba(0,255,0,0.2); 
                border-radius: 10px; 
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🚀 Hello from Kubernetes!</h1>
            <p>Your Week 1 project is running successfully.</p>
            <div class="status">
                <strong>Status:</strong> Deployed and Healthy ✅
            </div>
        </div>
    </body>
    </html>
```

---

## 📝 Step 2: Create the Deployment

```yaml
# website-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: static-website
  labels:
    app: static-website
    project: week1
spec:
  replicas: 3
  selector:
    matchLabels:
      app: static-website
  template:
    metadata:
      labels:
        app: static-website
        project: week1
    spec:
      containers:
      - name: nginx
        image: nginx:1.25-alpine
        ports:
        - containerPort: 80
        resources:
          requests:
            memory: "64Mi"
            cpu: "50m"
          limits:
            memory: "128Mi"
            cpu: "100m"
        volumeMounts:
        - name: website-content
          mountPath: /usr/share/nginx/html
        readinessProbe:
          httpGet:
            path: /
            port: 80
          initialDelaySeconds: 5
          periodSeconds: 5
        livenessProbe:
          httpGet:
            path: /
            port: 80
          initialDelaySeconds: 10
          periodSeconds: 10
      volumes:
      - name: website-content
        configMap:
          name: website-content
```

---

## 📝 Step 3: Create the Service

```yaml
# website-service.yaml
apiVersion: v1
kind: Service
metadata:
  name: static-website
  labels:
    app: static-website
spec:
  type: NodePort
  selector:
    app: static-website
  ports:
  - port: 80
    targetPort: 80
    nodePort: 30080
```

---

## 🚀 Deployment Steps

### 1. Apply All Manifests

```bash
# Create a project directory
mkdir -p week1-project && cd week1-project

# Save the YAML files above, then apply
kubectl apply -f website-content.yaml
kubectl apply -f website-deployment.yaml
kubectl apply -f website-service.yaml

# Or apply all at once
kubectl apply -f .
```

### 2. Verify Deployment

```bash
# Check all resources
kubectl get all -l project=week1

# Verify pods are running
kubectl get pods -l app=static-website

# Check deployment status
kubectl rollout status deployment/static-website

# View pod details
kubectl describe pods -l app=static-website
```

### 3. Access the Website

```bash
# For Minikube
minikube service static-website --url

# For kind/Docker Desktop - use port-forward
kubectl port-forward service/static-website 8080:80

# Then open http://localhost:8080 in browser
```

---

## ✅ Validation Checklist

| # | Check | Command | Expected |
|---|-------|---------|----------|
| 1 | Pods running | `kubectl get pods -l app=static-website` | 3/3 Running |
| 2 | Deployment ready | `kubectl get deployment static-website` | 3/3 READY |
| 3 | Service exists | `kubectl get svc static-website` | NodePort 30080 |
| 4 | Website accessible | `curl localhost:8080` | HTML content |
| 5 | Logs clean | `kubectl logs -l app=static-website` | No errors |

---

## 🔄 Additional Exercises

### Exercise 1: Scale the Deployment

```bash
# Scale to 5 replicas
kubectl scale deployment static-website --replicas=5

# Verify
kubectl get pods -l app=static-website
```

### Exercise 2: Update the Website

```bash
# Edit the ConfigMap
kubectl edit configmap website-content

# Restart pods to pick up changes
kubectl rollout restart deployment/static-website
```

### Exercise 3: Simulate Pod Failure

```bash
# Delete a pod
kubectl delete pod <pod-name>

# Watch Kubernetes recreate it
kubectl get pods -w
```

---

## 🧹 Cleanup

```bash
kubectl delete -f .
# Or
kubectl delete deployment static-website
kubectl delete service static-website
kubectl delete configmap website-content
```

---

## 📝 Week 1 Summary

| Day | Topic | Skills Gained |
|-----|-------|---------------|
| 1 | Containers | Docker basics, container lifecycle |
| 2 | Docker Deep Dive | Dockerfile, images, Compose |
| 3 | K8s Overview | Architecture, terminology |
| 4 | K8s Architecture | Components, control plane |
| 5 | Local Cluster | minikube, kind setup |
| 6 | kubectl | Commands, contexts, namespaces |
| 7 | Project | Deployment, Services, real-world app |

---

## ➡️ What's Next?

In **Week 2**, we'll dive into:
- Pods in depth (multi-container, init containers)
- ReplicaSets and Deployments
- All Service types
- Labels, selectors, and annotations

---

<p align="center">
  <a href="../Day-06/day-06.md">« Day 06</a> | <a href="../README.md">Home</a> | <a href="../Day-08/day-08.md">Day 08 »</a>
</p>
