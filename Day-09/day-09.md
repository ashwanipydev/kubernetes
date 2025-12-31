<h1 align="center">Day 09: ReplicaSets</h1>

<p align="center">
  <a href="../Day-08/day-08.md">« Day 08</a> | <a href="../README.md">Home</a> | <a href="../Day-10/day-10.md">Day 10 »</a>
</p>

---

## 🎯 Learning Objectives

- Understand ReplicaSet purpose and behavior
- Create and manage ReplicaSets
- Understand label selectors
- Scale applications with ReplicaSets

---

## 📚 Core Concepts

### What is a ReplicaSet?

A **ReplicaSet** ensures a specified number of Pod replicas are running at any time. It provides:
- **Self-healing**: Automatically replaces failed Pods
- **Scaling**: Maintains desired number of replicas
- **Label-based selection**: Manages Pods via labels

### How ReplicaSets Work

```
┌─────────────────────────────────────────────────────┐
│                    ReplicaSet                       │
│              (Desired Replicas: 3)                  │
├─────────────────────────────────────────────────────┤
│                                                     │
│  selector: app=web     Template: nginx:1.25         │
│         │                                           │
│         ▼                                           │
│   ┌─────────┐  ┌─────────┐  ┌─────────┐            │
│   │ Pod     │  │ Pod     │  │ Pod     │            │
│   │ app=web │  │ app=web │  │ app=web │            │
│   └─────────┘  └─────────┘  └─────────┘            │
│                                                     │
│   If any Pod dies, ReplicaSet creates a new one    │
└─────────────────────────────────────────────────────┘
```

---

## 📄 YAML Example

```yaml
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: nginx-replicaset
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
        image: nginx:1.25
        ports:
        - containerPort: 80
        resources:
          requests:
            cpu: "100m"
            memory: "128Mi"
```

---

## ⌨️ Commands

```bash
# Create ReplicaSet
kubectl apply -f replicaset.yaml

# View ReplicaSets
kubectl get replicasets
kubectl get rs
kubectl describe rs nginx-replicaset

# Scale ReplicaSet
kubectl scale rs nginx-replicaset --replicas=5

# Delete ReplicaSet (keeps pods)
kubectl delete rs nginx-replicaset --cascade=orphan

# Delete ReplicaSet (deletes pods)
kubectl delete rs nginx-replicaset
```

---

## 🔧 Hands-on Exercise

```bash
# Create ReplicaSet
cat <<EOF | kubectl apply -f -
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: web-rs
spec:
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
        image: nginx
EOF

# Verify
kubectl get rs
kubectl get pods -l app=web

# Delete one pod and watch self-healing
kubectl delete pod <pod-name>
kubectl get pods -w

# Scale up
kubectl scale rs web-rs --replicas=5

# Clean up
kubectl delete rs web-rs
```

---

## 📝 Key Points

| Aspect | Description |
|--------|-------------|
| **Purpose** | Maintain desired Pod count |
| **Selector** | Identifies Pods to manage |
| **Template** | Pod specification to create |
| **Use Case** | Usually managed by Deployments |

> **Note:** In practice, you rarely create ReplicaSets directly. Use Deployments instead, which manage ReplicaSets for you.

---

## ➡️ What's Next?

Tomorrow: **Day 10 - Deployments** - Declarative updates and rollbacks

---

<p align="center">
  <a href="../Day-08/day-08.md">« Day 08</a> | <a href="../README.md">Home</a> | <a href="../Day-10/day-10.md">Day 10 »</a>
</p>
