<h1 align="center">Day 36: Helm Basics</h1>

<p align="center">
  <a href="../Day-35/day-35.md">« Day 35</a> | <a href="../README.md">Home</a> | <a href="../Day-37/day-37.md">Day 37 »</a>
</p>

---

## 🎯 Learning Objectives

- Understand Helm concepts
- Work with charts and repositories
- Customize deployments with values
- Manage releases

---

## 📚 Core Concepts

**Helm** is the package manager for Kubernetes.

| Concept | Description |
|---------|-------------|
| **Chart** | Package of K8s resources |
| **Release** | Deployed instance of a chart |
| **Repository** | Collection of charts |
| **Values** | Configuration for charts |

---

## ⌨️ Essential Commands

```bash
# Repository management
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update
helm repo list
helm search repo nginx

# Install chart
helm install my-release bitnami/nginx
helm install my-release bitnami/nginx -f values.yaml
helm install my-release bitnami/nginx --set replicaCount=3

# Manage releases
helm list
helm status my-release
helm history my-release

# Upgrade
helm upgrade my-release bitnami/nginx --set replicaCount=5

# Rollback
helm rollback my-release 1

# Uninstall
helm uninstall my-release

# View chart info
helm show chart bitnami/nginx
helm show values bitnami/nginx
```

---

## 📄 Values File Example

```yaml
# values.yaml
replicaCount: 3

image:
  repository: nginx
  tag: latest

service:
  type: ClusterIP
  port: 80

resources:
  limits:
    cpu: 100m
    memory: 128Mi

ingress:
  enabled: false
```

---

## 🔧 Hands-on Exercise

```bash
# Add repo
helm repo add bitnami https://charts.bitnami.com/bitnami

# Search for nginx
helm search repo nginx

# Install with custom values
helm install web bitnami/nginx \
  --set replicaCount=2 \
  --set service.type=ClusterIP

# View release
helm list
kubectl get pods

# Upgrade
helm upgrade web bitnami/nginx --set replicaCount=3

# View history
helm history web

# Rollback
helm rollback web 1

# Clean up
helm uninstall web
```

---

## ➡️ What's Next?

Tomorrow: **Day 37 - Advanced Helm** - Creating custom charts

---

<p align="center">
  <a href="../Day-35/day-35.md">« Day 35</a> | <a href="../README.md">Home</a> | <a href="../Day-37/day-37.md">Day 37 »</a>
</p>
