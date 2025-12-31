<h1 align="center">Day 20: Storage Deep Dive</h1>

<p align="center">
  <a href="../Day-19/day-19.md">« Day 19</a> | <a href="../README.md">Home</a> | <a href="../Day-21/day-21.md">Day 21 »</a>
</p>

---

## 🎯 Learning Objectives

- Configure StorageClasses
- Use dynamic provisioning
- Understand reclaim policies
- Expand volumes

---

## 📚 StorageClasses

**StorageClasses** define storage profiles for dynamic provisioning.

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: fast-storage
provisioner: kubernetes.io/aws-ebs
parameters:
  type: gp3
  iops: "3000"
reclaimPolicy: Delete
allowVolumeExpansion: true
volumeBindingMode: WaitForFirstConsumer
```

### Common Provisioners

| Provider | Provisioner |
|----------|-------------|
| AWS EBS | kubernetes.io/aws-ebs |
| GCE PD | kubernetes.io/gce-pd |
| Azure Disk | kubernetes.io/azure-disk |
| Local | kubernetes.io/no-provisioner |

---

## 📄 Dynamic Provisioning

Create PVC referencing a StorageClass:

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: dynamic-pvc
spec:
  accessModes:
    - ReadWriteOnce
  storageClassName: fast-storage
  resources:
    requests:
      storage: 10Gi
```

The PV is automatically created when the PVC is bound.

---

## 📄 Default StorageClass

```bash
# View storage classes
kubectl get storageclass

# Set default
kubectl patch storageclass <name> -p \
  '{"metadata": {"annotations":{"storageclass.kubernetes.io/is-default-class":"true"}}}'
```

PVCs without a storageClassName use the default.

---

## 📄 Volume Expansion

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: expandable
provisioner: kubernetes.io/aws-ebs
allowVolumeExpansion: true
```

```bash
# Expand PVC
kubectl patch pvc my-pvc -p '{"spec":{"resources":{"requests":{"storage":"20Gi"}}}}'
```

---

## ⌨️ Commands

```bash
# View storage classes
kubectl get sc
kubectl describe sc <name>

# View PVs and PVCs
kubectl get pv,pvc

# Check PV reclaim policy
kubectl get pv -o custom-columns=NAME:.metadata.name,RECLAIM:.spec.persistentVolumeReclaimPolicy
```

---

## 🔧 Hands-on Exercise (Minikube)

```bash
# Check available storage classes
kubectl get sc

# Create PVC using default storage class
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: auto-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi
EOF

# Check dynamic provisioning
kubectl get pv,pvc

# Use in pod
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: Pod
metadata:
  name: storage-pod
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
      claimName: auto-pvc
EOF

# Verify
kubectl exec storage-pod -- df -h /data

# Clean up
kubectl delete pod storage-pod
kubectl delete pvc auto-pvc
```

---

## ➡️ What's Next?

Tomorrow: **Day 21 - Week 3 Project** - Stateful application with PVC

---

<p align="center">
  <a href="../Day-19/day-19.md">« Day 19</a> | <a href="../README.md">Home</a> | <a href="../Day-21/day-21.md">Day 21 »</a>
</p>
