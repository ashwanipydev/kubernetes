<h1 align="center">Day 19: StatefulSets</h1>

<p align="center">
  <a href="../Day-18/day-18.md">« Day 18</a> | <a href="../README.md">Home</a> | <a href="../Day-20/day-20.md">Day 20 »</a>
</p>

---

## 🎯 Learning Objectives

- Understand StatefulSet purpose
- Deploy stateful applications
- Use stable network identities
- Manage ordered deployment and scaling

---

## 📚 Core Concepts

**StatefulSets** manage stateful applications requiring:
- Stable, unique network identifiers
- Stable, persistent storage
- Ordered, graceful deployment and scaling
- Ordered, automated rolling updates

### StatefulSet vs Deployment

| Feature | Deployment | StatefulSet |
|---------|------------|-------------|
| Pod identity | Random | Stable, ordinal |
| Pod naming | Random suffix | Ordered (web-0, web-1) |
| Storage | Shared PVC | Per-pod PVC |
| Startup order | Parallel | Sequential |

---

## 📄 StatefulSet Example

```yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx-headless
spec:
  clusterIP: None  # Headless service
  selector:
    app: nginx
  ports:
  - port: 80
---
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: web
spec:
  serviceName: nginx-headless
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx
        ports:
        - containerPort: 80
        volumeMounts:
        - name: data
          mountPath: /usr/share/nginx/html
  volumeClaimTemplates:
  - metadata:
      name: data
    spec:
      accessModes: ["ReadWriteOnce"]
      resources:
        requests:
          storage: 1Gi
```

---

## 📚 Pod Identity

Pods get stable identities:
- **Pod name**: `<statefulset>-<ordinal>` (web-0, web-1, web-2)
- **DNS**: `<pod>.<service>.<namespace>.svc.cluster.local`

```
web-0.nginx-headless.default.svc.cluster.local
web-1.nginx-headless.default.svc.cluster.local
web-2.nginx-headless.default.svc.cluster.local
```

---

## ⌨️ Commands

```bash
# Create StatefulSet
kubectl apply -f statefulset.yaml

# View StatefulSets
kubectl get statefulsets
kubectl describe statefulset web

# Scale
kubectl scale statefulset web --replicas=5

# View pods (ordered naming)
kubectl get pods -l app=nginx

# Delete (pods deleted in reverse order)
kubectl delete statefulset web
```

---

## 🔧 Hands-on Exercise

```bash
# Create headless service and StatefulSet
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: Service
metadata:
  name: web-headless
spec:
  clusterIP: None
  selector:
    app: web
  ports:
  - port: 80
---
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: web
spec:
  serviceName: web-headless
  replicas: 3
  selector:
    matchLabels:
      app: web
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
      - name: nginx
        image: nginx
EOF

# Watch ordered creation
kubectl get pods -w -l app=web

# Verify stable DNS
kubectl run test --image=busybox --rm -it -- nslookup web-0.web-headless

# Clean up
kubectl delete statefulset web
kubectl delete service web-headless
```

---

## ➡️ What's Next?

Tomorrow: **Day 20 - Storage Deep Dive** - Dynamic provisioning and storage classes

---

<p align="center">
  <a href="../Day-18/day-18.md">« Day 18</a> | <a href="../README.md">Home</a> | <a href="../Day-20/day-20.md">Day 20 »</a>
</p>
