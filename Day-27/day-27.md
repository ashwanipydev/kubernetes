<h1 align="center">Day 27: Rollbacks</h1>

<p align="center">
  <a href="../Day-26/day-26.md">« Day 26</a> | <a href="../README.md">Home</a> | <a href="../Day-28/day-28.md">Day 28 »</a>
</p>

---

## 🎯 Learning Objectives

- Understand rollback mechanics
- View revision history
- Rollback to previous versions
- Rollback to specific revisions

---

## 📚 Core Concepts

Kubernetes keeps deployment history, allowing rollback to previous versions when updates fail.

### Revision History

```bash
# View history
kubectl rollout history deployment/web

# Output:
REVISION  CHANGE-CAUSE
1         <none>
2         kubectl set image deployment/web nginx=nginx:1.25
3         kubectl set image deployment/web nginx=nginx:1.26
```

---

## ⌨️ Rollback Commands

```bash
# Rollback to previous version
kubectl rollout undo deployment/web

# Rollback to specific revision
kubectl rollout undo deployment/web --to-revision=1

# View revision details
kubectl rollout history deployment/web --revision=2

# Set change cause (annotation)
kubectl annotate deployment/web kubernetes.io/change-cause="Updated to v1.25"
```

---

## 📄 Configure Revision History

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web
  annotations:
    kubernetes.io/change-cause: "Initial deployment"
spec:
  revisionHistoryLimit: 10  # Keep 10 ReplicaSets
  replicas: 3
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
        image: nginx:1.24
```

---

## 🔧 Hands-on Exercise

```bash
# Create initial deployment
kubectl create deployment web --image=nginx:1.24 --replicas=3

# Update to 1.25
kubectl set image deployment/web nginx=nginx:1.25
kubectl rollout status deployment/web

# Update to bad image
kubectl set image deployment/web nginx=nginx:invalid
kubectl rollout status deployment/web  # Will hang

# Check pods (ImagePullBackOff)
kubectl get pods

# Rollback
kubectl rollout undo deployment/web

# Verify restored version
kubectl get deployment web -o jsonpath='{.spec.template.spec.containers[0].image}'

# View history
kubectl rollout history deployment/web

# Clean up
kubectl delete deployment web
```

---

## 📝 Key Points

| Command | Action |
|---------|--------|
| `rollout undo` | Revert to previous |
| `--to-revision=N` | Revert to specific version |
| `rollout history` | View all revisions |
| `revisionHistoryLimit` | Control history size |

---

## ➡️ What's Next?

Tomorrow: **Day 28 - Week 4 Project** - Secure app with RBAC

---

<p align="center">
  <a href="../Day-26/day-26.md">« Day 26</a> | <a href="../README.md">Home</a> | <a href="../Day-28/day-28.md">Day 28 »</a>
</p>
