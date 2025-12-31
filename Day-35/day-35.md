<h1 align="center">Day 35: Week 5 Project - Helm Deployment</h1>

<p align="center">
  <a href="../Day-34/day-34.md">« Day 34</a> | <a href="../README.md">Home</a> | <a href="../Day-36/day-36.md">Day 36 »</a>
</p>

---

## 🎯 Project Overview

Deploy a complete application using Helm with Ingress, RBAC, and security best practices.

---

## 🏗️ Architecture

```
┌────────────────────────────────────────────────────────┐
│                   Kubernetes Cluster                   │
│                                                        │
│  ┌─────────────┐    ┌─────────────────────────────┐   │
│  │   Ingress   │───▶│        Application          │   │
│  │  Controller │    │    (Helm Chart)             │   │
│  └─────────────┘    │                             │   │
│                     │  ┌────────┐  ┌────────┐     │   │
│                     │  │Frontend│  │Backend │     │   │
│                     │  └────────┘  └────────┘     │   │
│                     │                             │   │
│                     │  NetworkPolicy + RBAC       │   │
│                     └─────────────────────────────┘   │
└────────────────────────────────────────────────────────┘
```

---

## 📝 Step 1: Install Helm

```bash
# Windows (Chocolatey)
choco install kubernetes-helm

# macOS
brew install helm

# Linux
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash

# Verify
helm version
```

---

## 📝 Step 2: Deploy Using Helm

### Add Helm Repository

```bash
# Add bitnami repo
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update
```

### Install NGINX

```bash
# Install nginx with custom values
helm install my-nginx bitnami/nginx \
  --set service.type=ClusterIP \
  --set replicaCount=3

# View release
helm list

# Get pods
kubectl get pods -l app.kubernetes.io/instance=my-nginx
```

---

## 📝 Step 3: Create Custom Values

Create `values.yaml`:
```yaml
replicaCount: 3

service:
  type: ClusterIP
  port: 80

ingress:
  enabled: true
  hostname: app.local
  path: /

resources:
  limits:
    cpu: 200m
    memory: 256Mi
  requests:
    cpu: 100m
    memory: 128Mi

podSecurityContext:
  runAsNonRoot: true
  runAsUser: 1001
```

Install with values:
```bash
helm install my-app bitnami/nginx -f values.yaml
```

---

## 📝 Step 4: Deploy Complete Stack

```bash
# Install Redis
helm install redis bitnami/redis \
  --set auth.enabled=false \
  --set architecture=standalone

# Install WordPress
helm install wordpress bitnami/wordpress \
  --set wordpressUsername=admin \
  --set wordpressPassword=password \
  --set mariadb.auth.rootPassword=rootpass \
  --set service.type=NodePort

# View all releases
helm list
```

---

## ✅ Validation Checklist

| # | Check | Command |
|---|-------|---------|
| 1 | Helm installed | `helm version` |
| 2 | Release deployed | `helm list` |
| 3 | Pods running | `kubectl get pods` |
| 4 | Services created | `kubectl get svc` |

---

## 🧹 Cleanup

```bash
helm uninstall my-nginx
helm uninstall redis
helm uninstall wordpress
```

---

## 📝 Week 5 Summary

| Day | Topic |
|-----|-------|
| 29 | Ingress Concepts |
| 30 | Ingress Controllers |
| 31 | Network Policies |
| 32 | RBAC Fundamentals |
| 33 | ServiceAccounts |
| 34 | Security Best Practices |
| 35 | Helm Deployment Project |

---

## ➡️ What's Next?

**Week 6** covers:
- Advanced Helm
- Monitoring with Prometheus/Grafana
- Logging
- Troubleshooting
- Final production project

---

<p align="center">
  <a href="../Day-34/day-34.md">« Day 34</a> | <a href="../README.md">Home</a> | <a href="../Day-36/day-36.md">Day 36 »</a>
</p>
