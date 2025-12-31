<h1 align="center">Day 15: ConfigMaps</h1>

<p align="center">
  <a href="../Day-14/day-14.md">« Day 14</a> | <a href="../README.md">Home</a> | <a href="../Day-16/day-16.md">Day 16 »</a>
</p>

---

## 🎯 Learning Objectives

- Understand ConfigMap purpose
- Create ConfigMaps from files and literals
- Inject configuration as environment variables
- Mount ConfigMaps as volumes

---

## 📚 Core Concepts

**ConfigMaps** store non-confidential configuration data as key-value pairs, allowing you to decouple configuration from container images.

### Use Cases
- Application settings
- Database connection strings (non-sensitive)
- Feature flags
- Configuration files

---

## 📄 Creating ConfigMaps

### From Literal Values

```bash
kubectl create configmap app-config \
  --from-literal=APP_ENV=production \
  --from-literal=LOG_LEVEL=info
```

### From File

```bash
# Create config file
echo "database.host=db.example.com
database.port=5432" > app.properties

kubectl create configmap app-config --from-file=app.properties
```

### YAML Definition

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  APP_ENV: production
  LOG_LEVEL: info
  config.json: |
    {
      "database": "mongodb://localhost:27017",
      "cache": "redis://localhost:6379"
    }
```

---

## 📄 Using ConfigMaps

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
    - name: APP_ENVIRONMENT
      valueFrom:
        configMapKeyRef:
          name: app-config
          key: APP_ENV
    envFrom:
    - configMapRef:
        name: app-config
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
    - name: config
      mountPath: /etc/config
  volumes:
  - name: config
    configMap:
      name: app-config
```

---

## ⌨️ Commands

```bash
# Create ConfigMap
kubectl create configmap my-config --from-literal=key=value
kubectl apply -f configmap.yaml

# View ConfigMaps
kubectl get configmaps
kubectl describe configmap my-config
kubectl get configmap my-config -o yaml

# Edit ConfigMap
kubectl edit configmap my-config

# Delete ConfigMap
kubectl delete configmap my-config
```

---

## 🔧 Hands-on Exercise

```bash
# Create ConfigMap
kubectl create configmap web-config \
  --from-literal=THEME=dark \
  --from-literal=PAGE_SIZE=20

# Create pod using it
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: Pod
metadata:
  name: web
spec:
  containers:
  - name: web
    image: nginx
    envFrom:
    - configMapRef:
        name: web-config
EOF

# Verify
kubectl exec web -- env | grep -E 'THEME|PAGE_SIZE'

# Clean up
kubectl delete pod web
kubectl delete configmap web-config
```

---

## ➡️ What's Next?

Tomorrow: **Day 16 - Secrets** - Managing sensitive data

---

<p align="center">
  <a href="../Day-14/day-14.md">« Day 14</a> | <a href="../README.md">Home</a> | <a href="../Day-16/day-16.md">Day 16 »</a>
</p>
