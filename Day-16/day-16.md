<h1 align="center">Day 16: Secrets</h1>

<p align="center">
  <a href="../Day-15/day-15.md">« Day 15</a> | <a href="../README.md">Home</a> | <a href="../Day-17/day-17.md">Day 17 »</a>
</p>

---

## 🎯 Learning Objectives

- Understand Secret types and use cases
- Create Secrets securely
- Inject Secrets into Pods
- Apply Secret best practices

---

## 📚 Core Concepts

**Secrets** store sensitive data like passwords, tokens, and keys. Data is base64-encoded (not encrypted by default).

### Secret Types

| Type | Use Case |
|------|----------|
| `Opaque` | Generic secrets (default) |
| `kubernetes.io/tls` | TLS certificates |
| `kubernetes.io/dockerconfigjson` | Docker registry credentials |
| `kubernetes.io/basic-auth` | Basic authentication |
| `kubernetes.io/ssh-auth` | SSH keys |

---

## 📄 Creating Secrets

### From Literal

```bash
kubectl create secret generic db-credentials \
  --from-literal=username=admin \
  --from-literal=password=s3cr3t
```

### From File

```bash
echo -n 'admin' > username.txt
echo -n 's3cr3t' > password.txt
kubectl create secret generic db-credentials \
  --from-file=username=username.txt \
  --from-file=password=password.txt
```

### YAML (values must be base64-encoded)

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: db-credentials
type: Opaque
data:
  username: YWRtaW4=      # echo -n 'admin' | base64
  password: czNjcjN0      # echo -n 's3cr3t' | base64
```

### YAML with stringData (auto-encodes)

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: db-credentials
type: Opaque
stringData:
  username: admin
  password: s3cr3t
```

---

## 📄 Using Secrets

### As Environment Variables

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: app
spec:
  containers:
  - name: app
    image: nginx
    env:
    - name: DB_USER
      valueFrom:
        secretKeyRef:
          name: db-credentials
          key: username
    - name: DB_PASS
      valueFrom:
        secretKeyRef:
          name: db-credentials
          key: password
```

### As Volume Mount

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: app
spec:
  containers:
  - name: app
    image: nginx
    volumeMounts:
    - name: secret-volume
      mountPath: /etc/secrets
      readOnly: true
  volumes:
  - name: secret-volume
    secret:
      secretName: db-credentials
```

---

## ⌨️ Commands

```bash
# Create secret
kubectl create secret generic my-secret --from-literal=key=value

# View secrets (values hidden)
kubectl get secrets
kubectl describe secret my-secret

# Decode secret value
kubectl get secret my-secret -o jsonpath='{.data.key}' | base64 -d

# Delete secret
kubectl delete secret my-secret
```

---

## 🔧 Hands-on Exercise

```bash
# Create secret
kubectl create secret generic api-key \
  --from-literal=key=abc123xyz

# Use in pod
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: Pod
metadata:
  name: api-client
spec:
  containers:
  - name: app
    image: nginx
    env:
    - name: API_KEY
      valueFrom:
        secretKeyRef:
          name: api-key
          key: key
EOF

# Verify
kubectl exec api-client -- printenv API_KEY

# Clean up
kubectl delete pod api-client
kubectl delete secret api-key
```

---

## 📝 Best Practices

| Practice | Description |
|----------|-------------|
| Enable encryption at rest | Configure etcd encryption |
| Use RBAC | Limit secret access |
| Avoid committing secrets | Use sealed-secrets or external vaults |
| Rotate regularly | Update secrets periodically |

---

## ➡️ What's Next?

Tomorrow: **Day 17 - Volumes** - Container storage basics

---

<p align="center">
  <a href="../Day-15/day-15.md">« Day 15</a> | <a href="../README.md">Home</a> | <a href="../Day-17/day-17.md">Day 17 »</a>
</p>
