<h1 align="center">Day 40: Logging Concepts</h1>

<p align="center">
  <a href="../Day-39/day-39.md">« Day 39</a> | <a href="../README.md">Home</a> | <a href="../Day-41/day-41.md">Day 41 »</a>
</p>

---

## 🎯 Learning Objectives

- Understand Kubernetes logging patterns
- View container logs
- Learn about centralized logging
- Explore EFK/ELK stacks

---

## 📚 Logging Patterns

| Pattern | Description |
|---------|-------------|
| **Node-level** | Log files on nodes |
| **Sidecar** | Logging container in pod |
| **Agent** | DaemonSet log collector |
| **Direct** | App pushes to backend |

---

## ⌨️ kubectl Logging Commands

```bash
# View pod logs
kubectl logs <pod-name>

# Follow logs
kubectl logs -f <pod-name>

# Previous container logs
kubectl logs <pod-name> --previous

# Multi-container pod
kubectl logs <pod-name> -c <container-name>

# All containers
kubectl logs <pod-name> --all-containers

# Last N lines
kubectl logs <pod-name> --tail=100

# Since time
kubectl logs <pod-name> --since=1h

# With labels
kubectl logs -l app=nginx
```

---

## 📚 Centralized Logging Stack

### EFK Stack
- **E**lasticsearch - Storage
- **F**luentd/Fluent Bit - Collection
- **K**ibana - Visualization

### Loki Stack
- **Loki** - Log aggregation
- **Promtail** - Log collection
- **Grafana** - Visualization

---

## 📄 Deploy Loki Stack

```bash
# Add Grafana Helm repo
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update

# Install Loki stack
helm install loki grafana/loki-stack \
  --namespace logging \
  --create-namespace \
  --set grafana.enabled=true
```

---

## 🔧 Hands-on Exercise

```bash
# Create test pod
kubectl run logger --image=busybox -- sh -c 'while true; do echo "Log entry $(date)"; sleep 5; done'

# View logs
kubectl logs logger
kubectl logs logger -f
kubectl logs logger --tail=5

# View logs since time
kubectl logs logger --since=1m

# Clean up
kubectl delete pod logger
```

---

## 📝 Logging Best Practices

| Practice | Description |
|----------|-------------|
| Structured logging | Use JSON format |
| Log to stdout/stderr | K8s captures these |
| Include context | Request ID, user, etc. |
| Appropriate levels | DEBUG, INFO, WARN, ERROR |
| Avoid sensitive data | Don't log secrets |

---

## ➡️ What's Next?

Tomorrow: **Day 41 - Troubleshooting Pods** - Debug techniques

---

<p align="center">
  <a href="../Day-39/day-39.md">« Day 39</a> | <a href="../README.md">Home</a> | <a href="../Day-41/day-41.md">Day 41 »</a>
</p>
