<h1 align="center">Day 25: Health Checks</h1>

<p align="center">
  <a href="../Day-24/day-24.md">« Day 24</a> | <a href="../README.md">Home</a> | <a href="../Day-26/day-26.md">Day 26 »</a>
</p>

---

## 🎯 Learning Objectives

- Configure liveness probes
- Set up readiness probes
- Implement startup probes
- Choose appropriate probe types

---

## 📚 Core Concepts

### Probe Types

| Probe | Purpose | Failure Action |
|-------|---------|----------------|
| **Liveness** | Is container running? | Restart container |
| **Readiness** | Ready to serve traffic? | Remove from service |
| **Startup** | Has app started? | Delay other probes |

### Probe Methods

| Method | Description |
|--------|-------------|
| `httpGet` | HTTP request to endpoint |
| `tcpSocket` | TCP connection check |
| `exec` | Execute command in container |
| `grpc` | gRPC health check |

---

## 📄 Liveness Probe

Detects if container is stuck or deadlocked.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: web
spec:
  containers:
  - name: nginx
    image: nginx
    livenessProbe:
      httpGet:
        path: /healthz
        port: 80
      initialDelaySeconds: 10
      periodSeconds: 5
      timeoutSeconds: 1
      failureThreshold: 3
```

---

## 📄 Readiness Probe

Determines if pod can receive traffic.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: web
spec:
  containers:
  - name: nginx
    image: nginx
    readinessProbe:
      httpGet:
        path: /ready
        port: 80
      initialDelaySeconds: 5
      periodSeconds: 5
      successThreshold: 1
      failureThreshold: 3
```

---

## 📄 Startup Probe

For slow-starting containers.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: slow-app
spec:
  containers:
  - name: app
    image: myapp
    startupProbe:
      httpGet:
        path: /healthz
        port: 8080
      failureThreshold: 30
      periodSeconds: 10
    livenessProbe:
      httpGet:
        path: /healthz
        port: 8080
      periodSeconds: 10
```

---

## 📄 Complete Example

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web
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
        ports:
        - containerPort: 80
        livenessProbe:
          httpGet:
            path: /
            port: 80
          initialDelaySeconds: 10
          periodSeconds: 10
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
# View probe status in describe
kubectl describe pod <name>

# Check events for probe failures
kubectl get events --field-selector reason=Unhealthy
```

---

## 🔧 Hands-on Exercise

```bash
# Deploy with probes
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: Pod
metadata:
  name: health-demo
spec:
  containers:
  - name: nginx
    image: nginx
    livenessProbe:
      httpGet:
        path: /
        port: 80
      initialDelaySeconds: 5
      periodSeconds: 5
    readinessProbe:
      httpGet:
        path: /
        port: 80
      initialDelaySeconds: 3
      periodSeconds: 3
EOF

# Check status
kubectl describe pod health-demo | grep -A 10 "Liveness\|Readiness"

# Clean up
kubectl delete pod health-demo
```

---

## ➡️ What's Next?

Tomorrow: **Day 26 - Rolling Updates** - Zero-downtime deployments

---

<p align="center">
  <a href="../Day-24/day-24.md">« Day 24</a> | <a href="../README.md">Home</a> | <a href="../Day-26/day-26.md">Day 26 »</a>
</p>
