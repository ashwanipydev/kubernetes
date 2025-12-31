<h1 align="center">Day 13: Labels, Selectors & Annotations</h1>

<p align="center">
  <a href="../Day-12/day-12.md">« Day 12</a> | <a href="../README.md">Home</a> | <a href="../Day-14/day-14.md">Day 14 »</a>
</p>

---

## 🎯 Learning Objectives

- Use labels to organize resources
- Query resources with selectors
- Add metadata with annotations
- Apply labeling best practices

---

## 📚 Labels

**Labels** are key-value pairs attached to objects for identification and selection.

### Common Label Conventions

| Label | Purpose | Example |
|-------|---------|---------|
| app | Application name | `app: nginx` |
| env | Environment | `env: production` |
| tier | Architecture layer | `tier: frontend` |
| version | App version | `version: v1.2.3` |
| team | Owning team | `team: backend` |

### Applying Labels

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: web-pod
  labels:
    app: web
    env: production
    tier: frontend
    version: v1.0.0
spec:
  containers:
  - name: nginx
    image: nginx
```

---

## 📚 Selectors

### Equality-Based Selectors

```bash
# Single label
kubectl get pods -l app=web

# Multiple labels (AND)
kubectl get pods -l app=web,env=production

# Not equal
kubectl get pods -l env!=production
```

### Set-Based Selectors

```bash
# In a set
kubectl get pods -l 'env in (production, staging)'

# Not in set
kubectl get pods -l 'env notin (development)'

# Key exists
kubectl get pods -l 'app'

# Key doesn't exist
kubectl get pods -l '!canary'
```

---

## 📚 Annotations

**Annotations** store non-identifying metadata (build info, tool config, etc.).

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: web
  annotations:
    description: "Main web server pod"
    owner: "platform-team@company.com"
    prometheus.io/scrape: "true"
    prometheus.io/port: "9090"
spec:
  containers:
  - name: nginx
    image: nginx
```

---

## ⌨️ Commands

```bash
# Add label
kubectl label pod nginx env=production

# Update label
kubectl label pod nginx env=staging --overwrite

# Remove label
kubectl label pod nginx env-

# Show labels
kubectl get pods --show-labels

# Add annotation
kubectl annotate pod nginx description="Web server"

# Filter by label
kubectl get pods -l app=web
kubectl get pods -l 'env in (dev,staging)'
```

---

## 🔧 Hands-on Exercise

```bash
# Create pods with labels
kubectl run prod-web --image=nginx --labels="app=web,env=prod"
kubectl run staging-web --image=nginx --labels="app=web,env=staging"
kubectl run prod-api --image=nginx --labels="app=api,env=prod"

# Query by labels
kubectl get pods -l app=web
kubectl get pods -l env=prod
kubectl get pods -l 'app in (web,api)'
kubectl get pods -l app=web,env=prod

# Show all labels
kubectl get pods --show-labels

# Add annotation
kubectl annotate pod prod-web owner=team-a

# Clean up
kubectl delete pods -l app
```

---

## 📝 Labels vs Annotations

| Aspect | Labels | Annotations |
|--------|--------|-------------|
| Purpose | Identify & select | Attach metadata |
| Selectable | Yes | No |
| Size limit | 63 chars value | 256KB total |
| Use case | Grouping, filtering | Build info, config |

---

## ➡️ What's Next?

Tomorrow: **Day 14 - Week 2 Project** - Microservices deployment

---

<p align="center">
  <a href="../Day-12/day-12.md">« Day 12</a> | <a href="../README.md">Home</a> | <a href="../Day-14/day-14.md">Day 14 »</a>
</p>
