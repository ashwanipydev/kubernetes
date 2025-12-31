<h1 align="center">Day 42: Troubleshooting Networking</h1>

<p align="center">
  <a href="../Day-41/day-41.md">« Day 41</a> | <a href="../README.md">Home</a> | <a href="../Day-43/day-43.md">Day 43 »</a>
</p>

---

## 🎯 Learning Objectives

- Debug service connectivity
- Troubleshoot DNS issues
- Diagnose network policies
- Test pod-to-pod communication

---

## 📚 Common Network Issues

| Issue | Possible Causes |
|-------|-----------------|
| Service not accessible | Selector mismatch, wrong port |
| DNS resolution failing | CoreDNS not running |
| Pod can't reach external | Network policy, egress rules |
| Connection timeout | Service not ready, firewall |

---

## ⌨️ Debugging Commands

```bash
# Check service
kubectl get svc
kubectl describe svc <name>

# Check endpoints
kubectl get endpoints <service>

# Test DNS
kubectl run test --image=busybox --rm -it -- nslookup <service>

# Test connectivity
kubectl run test --image=busybox --rm -it -- wget -qO- http://<service>:<port>

# Check network policies
kubectl get networkpolicies

# Check CoreDNS
kubectl get pods -n kube-system -l k8s-app=kube-dns
kubectl logs -n kube-system -l k8s-app=kube-dns
```

---

## 📄 Debug Workflow

```
1. Check service exists and has endpoints
2. Verify selector matches pod labels
3. Test DNS resolution
4. Test direct pod IP connectivity
5. Check network policies
```

---

## 🔧 Hands-on Exercise

```bash
# Create deployment and service
kubectl create deployment web --image=nginx
kubectl expose deployment web --port=80

# Test DNS
kubectl run test --image=busybox --rm -it -- nslookup web

# Test connectivity
kubectl run test --image=busybox --rm -it -- wget -qO- http://web

# Check endpoints
kubectl get endpoints web

# Clean up
kubectl delete deployment web
kubectl delete svc web
```

---

## 📝 Quick Checks

| Check | Command |
|-------|---------|
| Service exists | `kubectl get svc <name>` |
| Has endpoints | `kubectl get ep <name>` |
| DNS works | `nslookup <service>` |
| Port open | `wget -qO- http://<svc>:<port>` |
| CoreDNS running | `kubectl get pods -n kube-system` |

---

## ➡️ What's Next?

Tomorrow: **Day 43 - Troubleshooting Storage** - PV/PVC issues

---

<p align="center">
  <a href="../Day-41/day-41.md">« Day 41</a> | <a href="../README.md">Home</a> | <a href="../Day-43/day-43.md">Day 43 »</a>
</p>
