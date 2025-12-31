<h1 align="center">Day 44: Production Checklist</h1>

<p align="center">
  <a href="../Day-43/day-43.md">« Day 43</a> | <a href="../README.md">Home</a> | <a href="../Day-45/day-45.md">Day 45 »</a>
</p>

---

## 🎯 Learning Objectives

- Review production best practices
- Create deployment checklist
- Understand HA requirements
- Prepare for production

---

## 📋 Production Checklist

### ✅ Application Configuration

| Check | Status |
|-------|--------|
| Resource requests/limits set | ☐ |
| Liveness probe configured | ☐ |
| Readiness probe configured | ☐ |
| Multiple replicas | ☐ |
| Pod disruption budget | ☐ |
| Anti-affinity rules | ☐ |

### ✅ Security

| Check | Status |
|-------|--------|
| Run as non-root | ☐ |
| Read-only filesystem | ☐ |
| Drop all capabilities | ☐ |
| Network policies defined | ☐ |
| RBAC configured | ☐ |
| Secrets encrypted | ☐ |

### ✅ Storage

| Check | Status |
|-------|--------|
| PVC for persistent data | ☐ |
| Backup strategy | ☐ |
| Retention policies | ☐ |

### ✅ Observability

| Check | Status |
|-------|--------|
| Logging configured | ☐ |
| Metrics exposed | ☐ |
| Alerts defined | ☐ |
| Dashboards created | ☐ |

### ✅ Networking

| Check | Status |
|-------|--------|
| Ingress configured | ☐ |
| TLS enabled | ☐ |
| Service mesh (if needed) | ☐ |

---

## 📄 Production Deployment Template

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: production-app
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  selector:
    matchLabels:
      app: production-app
  template:
    metadata:
      labels:
        app: production-app
    spec:
      securityContext:
        runAsNonRoot: true
        runAsUser: 1000
      affinity:
        podAntiAffinity:
          preferredDuringSchedulingIgnoredDuringExecution:
          - weight: 100
            podAffinityTerm:
              labelSelector:
                matchLabels:
                  app: production-app
              topologyKey: kubernetes.io/hostname
      containers:
      - name: app
        image: myapp:1.0.0
        ports:
        - containerPort: 8080
        resources:
          requests:
            cpu: "100m"
            memory: "256Mi"
          limits:
            cpu: "500m"
            memory: "512Mi"
        readinessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 5
        livenessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 15
          periodSeconds: 10
        securityContext:
          allowPrivilegeEscalation: false
          readOnlyRootFilesystem: true
          capabilities:
            drop: ["ALL"]
```

---

## 📝 High Availability

| Component | Requirement |
|-----------|-------------|
| Control plane | 3+ masters |
| etcd | 3+ nodes |
| Application | 3+ replicas |
| Nodes | Spread across zones |

---

## ➡️ What's Next?

Tomorrow: **Day 45 - Final Project** - Production-ready K8s setup

---

<p align="center">
  <a href="../Day-43/day-43.md">« Day 43</a> | <a href="../README.md">Home</a> | <a href="../Day-45/day-45.md">Day 45 »</a>
</p>
