<h1 align="center">Day 22: Namespaces</h1>

<p align="center">
  <a href="../Day-21/day-21.md">« Day 21</a> | <a href="../README.md">Home</a> | <a href="../Day-23/day-23.md">Day 23 »</a>
</p>

---

## 🎯 Learning Objectives

- Understand namespace purpose and use cases
- Create and manage namespaces
- Organize resources by namespace
- Implement multi-tenancy patterns

---

## 📚 Core Concepts

**Namespaces** provide virtual clusters within a physical cluster for:
- Resource isolation
- Access control
- Resource quota management
- Environment separation

### Default Namespaces

| Namespace | Purpose |
|-----------|---------|
| `default` | Resources with no namespace |
| `kube-system` | Kubernetes system components |
| `kube-public` | Publicly accessible resources |
| `kube-node-lease` | Node heartbeat data |

---

## 📄 Creating Namespaces

### Imperative

```bash
kubectl create namespace development
```

### Declarative

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: development
  labels:
    env: dev
    team: backend
```

---

## 📄 Using Namespaces

### Deploy to Namespace

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web
  namespace: development  # Specify namespace
spec:
  replicas: 2
  selector:
    matchLabels:
      app: web
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
      - name: nginx
        image: nginx
```

### Command-line

```bash
# Create in namespace
kubectl apply -f deployment.yaml -n development

# View resources in namespace
kubectl get pods -n development

# View all namespaces
kubectl get pods -A
kubectl get pods --all-namespaces
```

---

## ⌨️ Commands

```bash
# Create namespace
kubectl create namespace dev

# List namespaces
kubectl get namespaces
kubectl get ns

# Set default namespace
kubectl config set-context --current --namespace=dev

# View current namespace
kubectl config view --minify | grep namespace

# Delete namespace (deletes ALL resources!)
kubectl delete namespace dev
```

---

## 🔧 Hands-on Exercise

```bash
# Create namespaces
kubectl create namespace dev
kubectl create namespace staging
kubectl create namespace prod

# Deploy to each
kubectl create deployment web --image=nginx -n dev
kubectl create deployment web --image=nginx -n staging
kubectl create deployment web --image=nginx -n prod

# View resources
kubectl get deployments -A | grep web

# Switch default namespace
kubectl config set-context --current --namespace=dev
kubectl get pods  # Shows dev pods

# Reset to default
kubectl config set-context --current --namespace=default

# Clean up
kubectl delete ns dev staging prod
```

---

## 📝 Best Practices

| Practice | Description |
|----------|-------------|
| Environment separation | dev, staging, prod namespaces |
| Team isolation | team-a, team-b namespaces |
| Application grouping | app-frontend, app-backend |
| Use labels | Tag namespaces for filtering |

---

## ➡️ What's Next?

Tomorrow: **Day 23 - Resource Quotas** - Limiting namespace resources

---

<p align="center">
  <a href="../Day-21/day-21.md">« Day 21</a> | <a href="../README.md">Home</a> | <a href="../Day-23/day-23.md">Day 23 »</a>
</p>
