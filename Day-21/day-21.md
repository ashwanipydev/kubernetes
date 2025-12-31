<h1 align="center">Day 21: Week 3 Project - WordPress with MySQL</h1>

<p align="center">
  <a href="../Day-20/day-20.md">« Day 20</a> | <a href="../README.md">Home</a> | <a href="../Day-22/day-22.md">Day 22 »</a>
</p>

---

## 🎯 Project Overview

Deploy WordPress with MySQL using persistent storage, demonstrating stateful application management.

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Kubernetes Cluster                       │
│                                                             │
│   ┌─────────────────┐        ┌─────────────────┐           │
│   │    WordPress    │───────▶│     MySQL       │           │
│   │  (Deployment)   │        │  (Deployment)   │           │
│   │   NodePort:30080│        │  ClusterIP:3306 │           │
│   └────────┬────────┘        └────────┬────────┘           │
│            │                          │                     │
│            ▼                          ▼                     │
│   ┌─────────────────┐        ┌─────────────────┐           │
│   │   WordPress PVC │        │    MySQL PVC    │           │
│   │     (5Gi)       │        │     (10Gi)      │           │
│   └─────────────────┘        └─────────────────┘           │
└─────────────────────────────────────────────────────────────┘
```

---

## 📝 Step 1: MySQL Secret

```yaml
# mysql-secret.yaml
apiVersion: v1
kind: Secret
metadata:
  name: mysql-secret
type: Opaque
stringData:
  mysql-root-password: rootpass123
  mysql-password: wppass123
```

---

## 📝 Step 2: MySQL Deployment

```yaml
# mysql.yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: mysql-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 5Gi
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mysql
spec:
  replicas: 1
  selector:
    matchLabels:
      app: mysql
  template:
    metadata:
      labels:
        app: mysql
    spec:
      containers:
      - name: mysql
        image: mysql:8.0
        env:
        - name: MYSQL_ROOT_PASSWORD
          valueFrom:
            secretKeyRef:
              name: mysql-secret
              key: mysql-root-password
        - name: MYSQL_DATABASE
          value: wordpress
        - name: MYSQL_USER
          value: wordpress
        - name: MYSQL_PASSWORD
          valueFrom:
            secretKeyRef:
              name: mysql-secret
              key: mysql-password
        ports:
        - containerPort: 3306
        volumeMounts:
        - name: mysql-data
          mountPath: /var/lib/mysql
      volumes:
      - name: mysql-data
        persistentVolumeClaim:
          claimName: mysql-pvc
---
apiVersion: v1
kind: Service
metadata:
  name: mysql
spec:
  selector:
    app: mysql
  ports:
  - port: 3306
```

---

## 📝 Step 3: WordPress Deployment

```yaml
# wordpress.yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: wordpress-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 5Gi
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: wordpress
spec:
  replicas: 1
  selector:
    matchLabels:
      app: wordpress
  template:
    metadata:
      labels:
        app: wordpress
    spec:
      containers:
      - name: wordpress
        image: wordpress:latest
        env:
        - name: WORDPRESS_DB_HOST
          value: mysql
        - name: WORDPRESS_DB_USER
          value: wordpress
        - name: WORDPRESS_DB_PASSWORD
          valueFrom:
            secretKeyRef:
              name: mysql-secret
              key: mysql-password
        - name: WORDPRESS_DB_NAME
          value: wordpress
        ports:
        - containerPort: 80
        volumeMounts:
        - name: wordpress-data
          mountPath: /var/www/html
      volumes:
      - name: wordpress-data
        persistentVolumeClaim:
          claimName: wordpress-pvc
---
apiVersion: v1
kind: Service
metadata:
  name: wordpress
spec:
  type: NodePort
  selector:
    app: wordpress
  ports:
  - port: 80
    nodePort: 30080
```

---

## 🚀 Deployment Steps

```bash
# Create directory
mkdir week3-project && cd week3-project

# Apply in order
kubectl apply -f mysql-secret.yaml
kubectl apply -f mysql.yaml
kubectl apply -f wordpress.yaml

# Wait for pods
kubectl wait --for=condition=Ready pod -l app=mysql --timeout=120s
kubectl wait --for=condition=Ready pod -l app=wordpress --timeout=120s

# Access WordPress
minikube service wordpress --url
```

---

## ✅ Validation Checklist

| # | Check | Command | Expected |
|---|-------|---------|----------|
| 1 | MySQL running | `kubectl get pods -l app=mysql` | 1/1 Running |
| 2 | WordPress running | `kubectl get pods -l app=wordpress` | 1/1 Running |
| 3 | PVCs bound | `kubectl get pvc` | Bound status |
| 4 | Services created | `kubectl get svc` | mysql, wordpress |
| 5 | WordPress accessible | Open browser URL | WordPress setup page |

---

## 🧹 Cleanup

```bash
kubectl delete -f .
kubectl delete pvc mysql-pvc wordpress-pvc
```

---

## 📝 Week 3 Summary

| Day | Topic |
|-----|-------|
| 15 | ConfigMaps |
| 16 | Secrets |
| 17 | Volumes |
| 18 | PersistentVolumes |
| 19 | StatefulSets |
| 20 | Storage Deep Dive |
| 21 | WordPress + MySQL Project |

---

## ➡️ What's Next?

**Week 4** starts with:
- Namespaces and multi-tenancy
- Resource Quotas and LimitRanges
- Health checks and probes

---

<p align="center">
  <a href="../Day-20/day-20.md">« Day 20</a> | <a href="../README.md">Home</a> | <a href="../Day-22/day-22.md">Day 22 »</a>
</p>
