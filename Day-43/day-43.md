<h1 align="center">Day 43: Troubleshooting Storage</h1>

<p align="center">
  <a href="../Day-42/day-42.md">« Day 42</a> | <a href="../README.md">Home</a> | <a href="../Day-44/day-44.md">Day 44 »</a>
</p>

---

## 🎯 Learning Objectives

- Debug PV/PVC binding issues
- Troubleshoot mount problems
- Fix storage class issues
- Recover from storage failures

---

## 📚 Common Storage Issues

| Issue | Possible Causes |
|-------|-----------------|
| PVC Pending | No matching PV, wrong storage class |
| Mount failed | PV not available, wrong access mode |
| Permission denied | fsGroup not set, security context |
| Disk full | Quota exceeded, no expansion |

---

## ⌨️ Debugging Commands

```bash
# Check PVC status
kubectl get pvc
kubectl describe pvc <name>

# Check PV status
kubectl get pv

# Check StorageClass
kubectl get sc

# Check pod volume mounts
kubectl describe pod <name> | grep -A 10 Volumes

# View events
kubectl get events --field-selector reason=FailedMount
```

---

## 📄 PVC Binding Issues

```bash
# Check PVC
kubectl describe pvc my-pvc

# Look for:
# - Requested storage class exists
# - Requested size <= available PV
# - Access mode matches
# - Selector matches PV labels
```

---

## 🔧 Hands-on Exercise

```bash
# Create PVC referencing non-existent storage class
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: debug-pvc
spec:
  accessModes:
    - ReadWriteOnce
  storageClassName: non-existent
  resources:
    requests:
      storage: 1Gi
EOF

# Check status (will be Pending)
kubectl get pvc debug-pvc
kubectl describe pvc debug-pvc

# Fix: Use existing storage class
kubectl delete pvc debug-pvc
kubectl get sc  # Find available class

# Clean up
kubectl delete pvc debug-pvc --ignore-not-found
```

---

## 📝 Storage Checklist

| Check | Command |
|-------|---------|
| PVC bound | `kubectl get pvc` |
| PV available | `kubectl get pv` |
| StorageClass exists | `kubectl get sc` |
| Events | `kubectl describe pvc <name>` |
| Pod mount status | `kubectl describe pod <name>` |

---

## ➡️ What's Next?

Tomorrow: **Day 44 - Production Checklist** - Best practices review

---

<p align="center">
  <a href="../Day-42/day-42.md">« Day 42</a> | <a href="../README.md">Home</a> | <a href="../Day-44/day-44.md">Day 44 »</a>
</p>
