<h1 align="center">Day 24: LimitRanges</h1>

<p align="center">
  <a href="../Day-23/day-23.md">« Day 23</a> | <a href="../README.md">Home</a> | <a href="../Day-25/day-25.md">Day 25 »</a>
</p>

---

## 🎯 Learning Objectives

- Configure LimitRanges
- Set default resource limits
- Enforce minimum/maximum constraints
- Apply per-container defaults

---

## 📚 Core Concepts

**LimitRange** sets default, min, and max resource constraints for a namespace.

### Differences from ResourceQuota

| ResourceQuota | LimitRange |
|---------------|------------|
| Total namespace limits | Per-object limits |
| Aggregate resources | Individual pod/container |
| Counts objects | Enforces defaults |

---

## 📄 LimitRange Examples

### Container Limits

```yaml
apiVersion: v1
kind: LimitRange
metadata:
  name: container-limits
  namespace: development
spec:
  limits:
  - type: Container
    default:
      cpu: "200m"
      memory: "256Mi"
    defaultRequest:
      cpu: "100m"
      memory: "128Mi"
    min:
      cpu: "50m"
      memory: "64Mi"
    max:
      cpu: "1"
      memory: "1Gi"
```

### Pod Limits

```yaml
apiVersion: v1
kind: LimitRange
metadata:
  name: pod-limits
spec:
  limits:
  - type: Pod
    max:
      cpu: "2"
      memory: "2Gi"
```

### PVC Limits

```yaml
apiVersion: v1
kind: LimitRange
metadata:
  name: storage-limits
spec:
  limits:
  - type: PersistentVolumeClaim
    min:
      storage: 1Gi
    max:
      storage: 10Gi
```

---

## ⌨️ Commands

```bash
# View limit ranges
kubectl get limitrange -n development
kubectl describe limitrange container-limits -n development
```

---

## 🔧 Hands-on Exercise

```bash
# Create namespace
kubectl create namespace limit-demo

# Apply LimitRange
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: LimitRange
metadata:
  name: demo-limits
  namespace: limit-demo
spec:
  limits:
  - type: Container
    default:
      cpu: "200m"
      memory: "256Mi"
    defaultRequest:
      cpu: "100m"
      memory: "128Mi"
EOF

# Create pod without specifying resources
kubectl run test --image=nginx -n limit-demo

# Check applied defaults
kubectl get pod test -n limit-demo -o yaml | grep -A 10 resources

# Clean up
kubectl delete namespace limit-demo
```

---

## 📝 Summary

| Feature | LimitRange | ResourceQuota |
|---------|------------|---------------|
| Scope | Per-object | Per-namespace |
| Defaults | Yes | No |
| Min/Max | Yes | Aggregate only |

---

## ➡️ What's Next?

Tomorrow: **Day 25 - Health Checks** - Liveness, Readiness, Startup probes

---

<p align="center">
  <a href="../Day-23/day-23.md">« Day 23</a> | <a href="../README.md">Home</a> | <a href="../Day-25/day-25.md">Day 25 »</a>
</p>
