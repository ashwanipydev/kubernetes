<h1 align="center">Day 18: Persistent Volumes</h1>

<p align="center">
  <a href="../Day-17/day-17.md">« Day 17</a> | <a href="../README.md">Home</a> | <a href="../Day-19/day-19.md">Day 19 »</a>
</p>

---

## 🎯 Learning Objectives

- Understand PV and PVC concepts
- Create PersistentVolumes
- Request storage with PersistentVolumeClaims
- Understand storage classes

---

## 📚 Core Concepts

### PersistentVolume (PV)
Cluster-level storage resource provisioned by admin or dynamically.

### PersistentVolumeClaim (PVC)
User's request for storage that binds to a PV.

```
┌──────────────────────────────────────────────────────┐
│                   KUBERNETES CLUSTER                  │
│                                                       │
│  ┌─────────────────┐         ┌─────────────────┐     │
│  │ PersistentVolume│◀───────▶│ PersistentVolume│     │
│  │     (PV)        │  Bind   │    Claim (PVC)  │     │
│  │                 │         │                 │     │
│  │ Capacity: 10Gi  │         │ Request: 5Gi   │     │
│  │ AccessMode: RWO │         │                 │     │
│  └─────────────────┘         └────────┬────────┘     │
│                                       │              │
│                                       ▼              │
│                              ┌─────────────────┐     │
│                              │      Pod        │     │
│                              │   volumeMounts  │     │
│                              └─────────────────┘     │
└──────────────────────────────────────────────────────┘
```

---

## 📄 PersistentVolume (PV)

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: my-pv
spec:
  capacity:
    storage: 10Gi
  accessModes:
    - ReadWriteOnce
  persistentVolumeReclaimPolicy: Retain
  storageClassName: manual
  hostPath:
    path: /mnt/data
```

### Access Modes

| Mode | Abbreviation | Description |
|------|--------------|-------------|
| ReadWriteOnce | RWO | Single node read/write |
| ReadOnlyMany | ROX | Multiple nodes read-only |
| ReadWriteMany | RWX | Multiple nodes read/write |

### Reclaim Policies

| Policy | Description |
|--------|-------------|
| Retain | Keep data after PVC deletion |
| Delete | Delete storage when PVC deleted |
| Recycle | Basic scrub (deprecated) |

---

## 📄 PersistentVolumeClaim (PVC)

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: my-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 5Gi
  storageClassName: manual
```

---

## 📄 Using PVC in Pod

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
    - name: data
      mountPath: /data
  volumes:
  - name: data
    persistentVolumeClaim:
      claimName: my-pvc
```

---

## ⌨️ Commands

```bash
# View PVs
kubectl get pv
kubectl describe pv my-pv

# View PVCs
kubectl get pvc
kubectl describe pvc my-pvc

# Check binding
kubectl get pv,pvc
```

---

## 🔧 Hands-on Exercise

```bash
# Create PV
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: PersistentVolume
metadata:
  name: demo-pv
spec:
  capacity:
    storage: 1Gi
  accessModes:
    - ReadWriteOnce
  hostPath:
    path: /tmp/demo-pv
EOF

# Create PVC
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: demo-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 500Mi
EOF

# Verify binding
kubectl get pv,pvc

# Use in pod
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: Pod
metadata:
  name: pv-pod
spec:
  containers:
  - name: app
    image: nginx
    volumeMounts:
    - name: storage
      mountPath: /usr/share/nginx/html
  volumes:
  - name: storage
    persistentVolumeClaim:
      claimName: demo-pvc
EOF

# Verify
kubectl exec pv-pod -- df -h /usr/share/nginx/html

# Clean up
kubectl delete pod pv-pod
kubectl delete pvc demo-pvc
kubectl delete pv demo-pv
```

---

## ➡️ What's Next?

Tomorrow: **Day 19 - StatefulSets** - Stateful workload management

---

<p align="center">
  <a href="../Day-17/day-17.md">« Day 17</a> | <a href="../README.md">Home</a> | <a href="../Day-19/day-19.md">Day 19 »</a>
</p>
