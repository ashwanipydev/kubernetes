<h1 align="center">Day 17: Volumes</h1>

<p align="center">
  <a href="../Day-16/day-16.md">« Day 16</a> | <a href="../README.md">Home</a> | <a href="../Day-18/day-18.md">Day 18 »</a>
</p>

---

## 🎯 Learning Objectives

- Understand Kubernetes volume types
- Use emptyDir for temporary storage
- Configure hostPath volumes
- Share data between containers

---

## 📚 Core Concepts

**Volumes** provide persistent storage for containers. Unlike container filesystems, volume data survives container restarts.

### Common Volume Types

| Type | Lifetime | Use Case |
|------|----------|----------|
| `emptyDir` | Pod lifetime | Temp space, cache, sharing |
| `hostPath` | Node lifetime | Node-level data access |
| `configMap` | ConfigMap lifetime | Configuration files |
| `secret` | Secret lifetime | Sensitive files |
| `persistentVolumeClaim` | Until deleted | Persistent data |

---

## 📄 emptyDir Volume

Created when Pod starts, deleted when Pod dies.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: cache-pod
spec:
  containers:
  - name: app
    image: nginx
    volumeMounts:
    - name: cache
      mountPath: /cache
  volumes:
  - name: cache
    emptyDir: {}
```

### Memory-backed emptyDir

```yaml
volumes:
- name: cache
  emptyDir:
    medium: Memory
    sizeLimit: 100Mi
```

---

## 📄 hostPath Volume

Mounts directory from the node.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: hostpath-pod
spec:
  containers:
  - name: app
    image: nginx
    volumeMounts:
    - name: host-data
      mountPath: /data
  volumes:
  - name: host-data
    hostPath:
      path: /var/data
      type: DirectoryOrCreate
```

---

## 📄 Sharing Between Containers

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: shared-volume
spec:
  containers:
  - name: writer
    image: busybox
    command: ['sh', '-c', 'while true; do date >> /shared/log.txt; sleep 5; done']
    volumeMounts:
    - name: shared
      mountPath: /shared
  - name: reader
    image: busybox
    command: ['sh', '-c', 'tail -f /shared/log.txt']
    volumeMounts:
    - name: shared
      mountPath: /shared
  volumes:
  - name: shared
    emptyDir: {}
```

---

## ⌨️ Commands

```bash
# View pod volumes
kubectl describe pod <name>

# Check volume mounts
kubectl exec <pod> -- df -h

# View data in volume
kubectl exec <pod> -- ls /path/to/mount
```

---

## 🔧 Hands-on Exercise

```bash
# Create pod with shared volume
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: Pod
metadata:
  name: volume-demo
spec:
  containers:
  - name: writer
    image: busybox
    command: ['sh', '-c', 'echo "Hello" > /data/message.txt; sleep 3600']
    volumeMounts:
    - name: shared-data
      mountPath: /data
  - name: reader
    image: busybox
    command: ['sh', '-c', 'cat /data/message.txt; sleep 3600']
    volumeMounts:
    - name: shared-data
      mountPath: /data
  volumes:
  - name: shared-data
    emptyDir: {}
EOF

# Wait and check
kubectl wait --for=condition=Ready pod/volume-demo
kubectl logs volume-demo -c reader

# Clean up
kubectl delete pod volume-demo
```

---

## ➡️ What's Next?

Tomorrow: **Day 18 - PersistentVolumes** - Durable storage for stateful apps

---

<p align="center">
  <a href="../Day-16/day-16.md">« Day 16</a> | <a href="../README.md">Home</a> | <a href="../Day-18/day-18.md">Day 18 »</a>
</p>
