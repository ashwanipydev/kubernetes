<h1 align="center">Day 23: Resource Quotas & Limits</h1>

<p align="center">
  <a href="../Day-22/day-22.md">« Day 22</a> | <a href="../README.md">Home</a> | <a href="../Day-24/day-24.md">Day 24 »</a>
</p>

---

## 🎯 Learning Objectives

- Configure Resource Quotas
- Set CPU and memory limits
- Prevent resource exhaustion
- Manage object counts

---

## 📚 Core Concepts

**ResourceQuota** limits aggregate resource consumption per namespace.

### Types of Quotas

| Type | Examples |
|------|----------|
| Compute | cpu, memory, requests, limits |
| Storage | PVC count, storage size |
| Object count | pods, services, configmaps |

---

## 📄 ResourceQuota Examples

### Compute Quota

```yaml
apiVersion: v1
kind: ResourceQuota
metadata:
  name: compute-quota
  namespace: development
spec:
  hard:
    requests.cpu: "4"
    requests.memory: 8Gi
    limits.cpu: "8"
    limits.memory: 16Gi
```

### Object Count Quota

```yaml
apiVersion: v1
kind: ResourceQuota
metadata:
  name: object-quota
  namespace: development
spec:
  hard:
    pods: "20"
    services: "10"
    configmaps: "20"
    secrets: "20"
    persistentvolumeclaims: "5"
```

### Storage Quota

```yaml
apiVersion: v1
kind: ResourceQuota
metadata:
  name: storage-quota
  namespace: development
spec:
  hard:
    requests.storage: 100Gi
    persistentvolumeclaims: "10"
```

---

## 📄 Pod Resource Requests/Limits

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: web
spec:
  containers:
  - name: nginx
    image: nginx
    resources:
      requests:
        memory: "128Mi"
        cpu: "250m"
      limits:
        memory: "256Mi"
        cpu: "500m"
```

| Field | Description |
|-------|-------------|
| requests | Guaranteed resources |
| limits | Maximum resources |
| cpu: "250m" | 0.25 CPU core |
| memory: "128Mi" | 128 mebibytes |

---

## ⌨️ Commands

```bash
# View quotas
kubectl get resourcequota -n development
kubectl describe resourcequota compute-quota -n development

# View resource usage
kubectl top pods -n development
kubectl top nodes

# View quota consumption
kubectl get quota -n development -o yaml
```

---

## 🔧 Hands-on Exercise

```bash
# Create namespace
kubectl create namespace quota-demo

# Apply quota
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: ResourceQuota
metadata:
  name: demo-quota
  namespace: quota-demo
spec:
  hard:
    pods: "3"
    requests.cpu: "1"
    requests.memory: 1Gi
EOF

# Check quota
kubectl get quota -n quota-demo

# Create pods (will fail after 3)
kubectl run pod1 --image=nginx -n quota-demo --requests='cpu=100m,memory=128Mi'
kubectl run pod2 --image=nginx -n quota-demo --requests='cpu=100m,memory=128Mi'
kubectl run pod3 --image=nginx -n quota-demo --requests='cpu=100m,memory=128Mi'
kubectl run pod4 --image=nginx -n quota-demo --requests='cpu=100m,memory=128Mi'  # Fails

# Clean up
kubectl delete namespace quota-demo
```

---

## ➡️ What's Next?

Tomorrow: **Day 24 - LimitRanges** - Default resource limits

---

<p align="center">
  <a href="../Day-22/day-22.md">« Day 22</a> | <a href="../README.md">Home</a> | <a href="../Day-24/day-24.md">Day 24 »</a>
</p>
