<h1 align="center">Day 33: ServiceAccounts</h1>

<p align="center">
  <a href="../Day-32/day-32.md">« Day 32</a> | <a href="../README.md">Home</a> | <a href="../Day-34/day-34.md">Day 34 »</a>
</p>

---

## 🎯 Learning Objectives

- Understand ServiceAccount purpose
- Create and assign ServiceAccounts
- Configure pod identity
- Manage ServiceAccount tokens

---

## 📚 Core Concepts

**ServiceAccount** provides an identity for pods to interact with the Kubernetes API.

| Type | Purpose |
|------|---------|
| User accounts | Human users |
| Service accounts | Pod/application identity |

---

## 📄 Creating ServiceAccounts

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: app-sa
  namespace: default
```

Or imperatively:
```bash
kubectl create serviceaccount app-sa
```

---

## 📄 Assign to Pod

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: app
spec:
  serviceAccountName: app-sa
  containers:
  - name: app
    image: nginx
```

---

## 📄 ServiceAccount with RBAC

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: pod-reader-sa
---
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: pod-reader
rules:
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["get", "list"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: pod-reader-binding
subjects:
- kind: ServiceAccount
  name: pod-reader-sa
roleRef:
  kind: Role
  name: pod-reader
  apiGroup: rbac.authorization.k8s.io
```

---

## ⌨️ Commands

```bash
# Create SA
kubectl create serviceaccount myapp-sa

# View SAs
kubectl get serviceaccounts
kubectl describe sa myapp-sa

# Check pod's SA
kubectl get pod <name> -o jsonpath='{.spec.serviceAccountName}'
```

---

## 🔧 Hands-on Exercise

```bash
# Create ServiceAccount
kubectl create serviceaccount demo-sa

# Create pod using it
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: Pod
metadata:
  name: sa-demo
spec:
  serviceAccountName: demo-sa
  containers:
  - name: app
    image: nginx
EOF

# Verify
kubectl get pod sa-demo -o jsonpath='{.spec.serviceAccountName}'

# Clean up
kubectl delete pod sa-demo
kubectl delete sa demo-sa
```

---

## ➡️ What's Next?

Tomorrow: **Day 34 - Security Best Practices** - Container and pod hardening

---

<p align="center">
  <a href="../Day-32/day-32.md">« Day 32</a> | <a href="../README.md">Home</a> | <a href="../Day-34/day-34.md">Day 34 »</a>
</p>
