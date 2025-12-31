<h1 align="center">Day 32: RBAC Fundamentals</h1>

<p align="center">
  <a href="../Day-31/day-31.md">« Day 31</a> | <a href="../README.md">Home</a> | <a href="../Day-33/day-33.md">Day 33 »</a>
</p>

---

## 🎯 Learning Objectives

- Understand RBAC components
- Create Roles and ClusterRoles
- Bind roles to users/groups
- Implement least privilege access

---

## 📚 RBAC Components

| Resource | Scope | Purpose |
|----------|-------|---------|
| **Role** | Namespace | Permissions within namespace |
| **ClusterRole** | Cluster | Cluster-wide permissions |
| **RoleBinding** | Namespace | Binds Role to subjects |
| **ClusterRoleBinding** | Cluster | Binds ClusterRole cluster-wide |

---

## 📄 Role Example

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: pod-reader
  namespace: development
rules:
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["get", "list", "watch"]
- apiGroups: [""]
  resources: ["pods/log"]
  verbs: ["get"]
```

---

## 📄 ClusterRole Example

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: secret-reader
rules:
- apiGroups: [""]
  resources: ["secrets"]
  verbs: ["get", "list"]
```

---

## 📄 RoleBinding Example

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: read-pods
  namespace: development
subjects:
- kind: User
  name: developer
  apiGroup: rbac.authorization.k8s.io
- kind: ServiceAccount
  name: app-sa
  namespace: development
roleRef:
  kind: Role
  name: pod-reader
  apiGroup: rbac.authorization.k8s.io
```

---

## ⌨️ Commands

```bash
# View roles
kubectl get roles -n development
kubectl describe role pod-reader -n development

# View cluster roles
kubectl get clusterroles

# Check permissions
kubectl auth can-i get pods --as developer -n development
kubectl auth can-i delete pods --as developer -n development
```

---

## 🔧 Hands-on Exercise

```bash
# Create namespace
kubectl create namespace rbac-demo

# Create role
cat <<EOF | kubectl apply -f -
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: pod-manager
  namespace: rbac-demo
rules:
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["get", "list", "create", "delete"]
EOF

# Create rolebinding
cat <<EOF | kubectl apply -f -
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: dev-pod-manager
  namespace: rbac-demo
subjects:
- kind: User
  name: dev-user
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: Role
  name: pod-manager
  apiGroup: rbac.authorization.k8s.io
EOF

# Test permissions
kubectl auth can-i get pods --as dev-user -n rbac-demo      # yes
kubectl auth can-i get secrets --as dev-user -n rbac-demo   # no
kubectl auth can-i get pods --as dev-user -n default        # no

# Clean up
kubectl delete namespace rbac-demo
```

---

## 📝 Common Verbs

| Verb | Action |
|------|--------|
| get | Read single resource |
| list | List resources |
| watch | Watch for changes |
| create | Create resources |
| update | Modify resources |
| patch | Partial update |
| delete | Remove resources |

---

## ➡️ What's Next?

Tomorrow: **Day 33 - ServiceAccounts** - Pod identity management

---

<p align="center">
  <a href="../Day-31/day-31.md">« Day 31</a> | <a href="../README.md">Home</a> | <a href="../Day-33/day-33.md">Day 33 »</a>
</p>
