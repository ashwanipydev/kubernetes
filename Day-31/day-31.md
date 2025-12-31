<h1 align="center">Day 31: Network Policies</h1>

<p align="center">
  <a href="../Day-30/day-30.md">« Day 30</a> | <a href="../README.md">Home</a> | <a href="../Day-32/day-32.md">Day 32 »</a>
</p>

---

## 🎯 Learning Objectives

- Understand network policy concepts
- Configure ingress policies
- Configure egress policies
- Implement pod isolation

---

## 📚 Core Concepts

**Network Policies** control traffic flow between pods using rules based on:
- Pod selectors
- Namespace selectors
- IP blocks
- Ports

> **Note:** Requires a CNI that supports Network Policies (Calico, Cilium, Weave).

---

## 📄 Default Deny All

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: deny-all
  namespace: production
spec:
  podSelector: {}
  policyTypes:
  - Ingress
  - Egress
```

---

## 📄 Allow Specific Ingress

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-frontend
spec:
  podSelector:
    matchLabels:
      app: backend
  policyTypes:
  - Ingress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: frontend
    ports:
    - protocol: TCP
      port: 8080
```

---

## 📄 Allow Egress to DNS

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-dns
spec:
  podSelector: {}
  policyTypes:
  - Egress
  egress:
  - to:
    - namespaceSelector:
        matchLabels:
          kubernetes.io/metadata.name: kube-system
      podSelector:
        matchLabels:
          k8s-app: kube-dns
    ports:
    - protocol: UDP
      port: 53
```

---

## ⌨️ Commands

```bash
# View network policies
kubectl get networkpolicies
kubectl describe networkpolicy <name>
```

---

## 🔧 Hands-on Exercise

```bash
# Create pods
kubectl run frontend --image=nginx --labels="app=frontend"
kubectl run backend --image=nginx --labels="app=backend"

# Test connectivity (should work)
kubectl exec frontend -- curl -s --max-time 2 backend

# Apply deny-all policy
cat <<EOF | kubectl apply -f -
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: deny-all
spec:
  podSelector:
    matchLabels:
      app: backend
  policyTypes:
  - Ingress
EOF

# Test again (should fail with CNI support)
kubectl exec frontend -- curl -s --max-time 2 backend

# Allow frontend
cat <<EOF | kubectl apply -f -
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-frontend
spec:
  podSelector:
    matchLabels:
      app: backend
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: frontend
EOF

# Clean up
kubectl delete pod frontend backend
kubectl delete networkpolicy --all
```

---

## ➡️ What's Next?

Tomorrow: **Day 32 - RBAC Fundamentals** - Role-based access control

---

<p align="center">
  <a href="../Day-30/day-30.md">« Day 30</a> | <a href="../README.md">Home</a> | <a href="../Day-32/day-32.md">Day 32 »</a>
</p>
