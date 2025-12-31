<h1 align="center">Day 41: Troubleshooting Pods</h1>

<p align="center">
  <a href="../Day-40/day-40.md">« Day 40</a> | <a href="../README.md">Home</a> | <a href="../Day-42/day-42.md">Day 42 »</a>
</p>

---

## 🎯 Learning Objectives

- Debug pod issues
- Identify common problems
- Use debugging commands
- Fix common errors

---

## 📚 Pod Status Issues

| Status | Cause | Fix |
|--------|-------|-----|
| **Pending** | No resources, node selector | Check resources, taints |
| **ImagePullBackOff** | Wrong image name, private registry | Fix image, add imagePullSecrets |
| **CrashLoopBackOff** | App crashing | Check logs, fix app |
| **CreateContainerError** | Invalid config | Check pod spec |
| **OOMKilled** | Memory limit exceeded | Increase limits |

---

## ⌨️ Debugging Commands

```bash
# Get pod status
kubectl get pods
kubectl get pods -o wide

# Describe pod (events, conditions)
kubectl describe pod <name>

# View logs
kubectl logs <pod>
kubectl logs <pod> --previous

# Exec into pod
kubectl exec -it <pod> -- /bin/sh

# Get pod YAML
kubectl get pod <name> -o yaml

# View events
kubectl get events --sort-by='.lastTimestamp'
kubectl get events --field-selector involvedObject.name=<pod>
```

---

## 📄 Debug Workflow

```
1. kubectl get pods        → Check status
2. kubectl describe pod    → Check events
3. kubectl logs            → Check app output
4. kubectl exec            → Inspect container
5. Fix and redeploy
```

---

## 🔧 Hands-on Exercise

```bash
# Create failing pod
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: Pod
metadata:
  name: debug-pod
spec:
  containers:
  - name: app
    image: nginx:nonexistent
EOF

# Debug
kubectl get pod debug-pod
kubectl describe pod debug-pod | grep -A 10 Events

# Fix
kubectl delete pod debug-pod
kubectl run debug-pod --image=nginx

# Verify
kubectl get pod debug-pod

# Clean up
kubectl delete pod debug-pod
```

---

## 📝 Common Fixes

| Problem | Solution |
|---------|----------|
| Image not found | Check image name and tag |
| Permission denied | Check securityContext |
| Insufficient CPU/memory | Adjust requests/limits |
| Mount failed | Check PVC exists and bound |
| Liveness probe failed | Extend timeouts, fix health endpoint |

---

## ➡️ What's Next?

Tomorrow: **Day 42 - Troubleshooting Networking** - Service and DNS issues

---

<p align="center">
  <a href="../Day-40/day-40.md">« Day 40</a> | <a href="../README.md">Home</a> | <a href="../Day-42/day-42.md">Day 42 »</a>
</p>
