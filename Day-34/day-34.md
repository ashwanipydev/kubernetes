<h1 align="center">Day 34: Security Best Practices</h1>

<p align="center">
  <a href="../Day-33/day-33.md">« Day 33</a> | <a href="../README.md">Home</a> | <a href="../Day-35/day-35.md">Day 35 »</a>
</p>

---

## 🎯 Learning Objectives

- Configure Security Contexts
- Run containers as non-root
- Implement read-only filesystems
- Apply security best practices

---

## 📚 Security Context

**SecurityContext** defines privilege and access control for pods/containers.

---

## 📄 Pod Security Context

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: secure-pod
spec:
  securityContext:
    runAsNonRoot: true
    runAsUser: 1000
    runAsGroup: 3000
    fsGroup: 2000
  containers:
  - name: app
    image: nginx
    securityContext:
      allowPrivilegeEscalation: false
      readOnlyRootFilesystem: true
      capabilities:
        drop:
          - ALL
```

---

## 📄 Key Security Settings

| Setting | Purpose |
|---------|---------|
| `runAsNonRoot` | Prevent running as root |
| `runAsUser` | Specify user ID |
| `readOnlyRootFilesystem` | Prevent file writes |
| `allowPrivilegeEscalation` | Block privilege gains |
| `capabilities.drop` | Remove Linux capabilities |

---

## 📄 Secure Deployment Example

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: secure-app
spec:
  replicas: 2
  selector:
    matchLabels:
      app: secure-app
  template:
    metadata:
      labels:
        app: secure-app
    spec:
      securityContext:
        runAsNonRoot: true
        runAsUser: 1000
        seccompProfile:
          type: RuntimeDefault
      containers:
      - name: app
        image: nginx
        securityContext:
          allowPrivilegeEscalation: false
          readOnlyRootFilesystem: true
          capabilities:
            drop: ["ALL"]
        resources:
          limits:
            memory: "128Mi"
            cpu: "250m"
        volumeMounts:
        - name: tmp
          mountPath: /tmp
        - name: cache
          mountPath: /var/cache/nginx
      volumes:
      - name: tmp
        emptyDir: {}
      - name: cache
        emptyDir: {}
```

---

## 📝 Security Checklist

| Check | Description |
|-------|-------------|
| ✅ Run as non-root | Set `runAsNonRoot: true` |
| ✅ Drop capabilities | `capabilities.drop: ["ALL"]` |
| ✅ Read-only filesystem | `readOnlyRootFilesystem: true` |
| ✅ Resource limits | Prevent resource exhaustion |
| ✅ Network policies | Restrict pod communication |
| ✅ Use secrets | Never hardcode credentials |

---

## 🔧 Hands-on Exercise

```bash
# Create secure pod
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: Pod
metadata:
  name: secure-demo
spec:
  securityContext:
    runAsNonRoot: true
    runAsUser: 1000
  containers:
  - name: app
    image: busybox
    command: ["sleep", "3600"]
    securityContext:
      allowPrivilegeEscalation: false
      readOnlyRootFilesystem: true
EOF

# Verify user
kubectl exec secure-demo -- id

# Try to write (should fail)
kubectl exec secure-demo -- touch /test

# Clean up
kubectl delete pod secure-demo
```

---

## ➡️ What's Next?

Tomorrow: **Day 35 - Week 5 Project** - Helm-based deployment

---

<p align="center">
  <a href="../Day-33/day-33.md">« Day 33</a> | <a href="../README.md">Home</a> | <a href="../Day-35/day-35.md">Day 35 »</a>
</p>
