<h1 align="center">Day 26: Rolling Updates</h1>

<p align="center">
  <a href="../Day-25/day-25.md">« Day 25</a> | <a href="../README.md">Home</a> | <a href="../Day-27/day-27.md">Day 27 »</a>
</p>

---

## 🎯 Learning Objectives

- Perform zero-downtime updates
- Configure update strategies
- Monitor rollout progress
- Pause and resume rollouts

---

## 📚 Core Concepts

### Update Strategies

| Strategy | Behavior |
|----------|----------|
| **RollingUpdate** | Gradual replacement (default) |
| **Recreate** | Kill all, then create new |

### Rolling Update Parameters

| Parameter | Description |
|-----------|-------------|
| `maxSurge` | Max pods above desired count |
| `maxUnavailable` | Max pods that can be down |

---

## 📄 Rolling Update Configuration

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web
spec:
  replicas: 4
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1          # 5 pods max during update
      maxUnavailable: 1    # 3 pods min available
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

## ⌨️ Commands

```bash
# Update image
kubectl set image deployment/web nginx=nginx:1.25

# Watch rollout
kubectl rollout status deployment/web

# View rollout history
kubectl rollout history deployment/web

# Pause rollout
kubectl rollout pause deployment/web

# Resume rollout
kubectl rollout resume deployment/web
```

---

## 🔧 Hands-on Exercise

```bash
# Create deployment
kubectl create deployment web --image=nginx:1.24 --replicas=4

# Watch pods
kubectl get pods -w &

# Trigger rolling update
kubectl set image deployment/web nginx=nginx:1.25

# Check status
kubectl rollout status deployment/web

# View history
kubectl rollout history deployment/web

# Clean up
kubectl delete deployment web
```

---

## 📝 Rollout Visualization

```
Initial: v1.24
[Pod-v1] [Pod-v1] [Pod-v1] [Pod-v1]

Update starts (maxSurge=1, maxUnavailable=1):
[Pod-v1] [Pod-v1] [Pod-v1] [Pod-v2] [Creating...]
[Pod-v1] [Pod-v1] [Pod-v2] [Pod-v2]
[Pod-v1] [Pod-v2] [Pod-v2] [Pod-v2]

Final: v1.25
[Pod-v2] [Pod-v2] [Pod-v2] [Pod-v2]
```

---

## ➡️ What's Next?

Tomorrow: **Day 27 - Rollbacks** - Reverting failed deployments

---

<p align="center">
  <a href="../Day-25/day-25.md">« Day 25</a> | <a href="../README.md">Home</a> | <a href="../Day-27/day-27.md">Day 27 »</a>
</p>
