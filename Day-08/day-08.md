<h1 align="center">Day 08: Pods Deep Dive</h1>

<p align="center">
  <a href="../Day-07/day-07.md">« Day 07</a> | <a href="../README.md">Home</a> | <a href="../Day-09/day-09.md">Day 09 »</a>
</p>

---

## 🎯 Learning Objectives

- Understand Pod lifecycle and phases
- Create multi-container Pods
- Implement init containers
- Configure resource requests and limits
- Use Pod scheduling features

---

## 📚 Core Concepts

### What is a Pod?

A Pod is the smallest deployable unit in Kubernetes - a group of one or more containers that share:
- Network namespace (same IP address)
- Storage volumes
- Lifecycle

### Pod Lifecycle Phases

| Phase | Description |
|-------|-------------|
| **Pending** | Pod accepted, waiting for scheduling or image pull |
| **Running** | Pod bound to node, at least one container running |
| **Succeeded** | All containers terminated successfully |
| **Failed** | All containers terminated, at least one failed |
| **Unknown** | Pod state cannot be determined |

---

## 📄 YAML Examples

### Basic Pod

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
  labels:
    app: nginx
spec:
  containers:
  - name: nginx
    image: nginx:1.25
    ports:
    - containerPort: 80
```

### Multi-Container Pod (Sidecar Pattern)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: web-with-sidecar
spec:
  containers:
  - name: web
    image: nginx:1.25
    ports:
    - containerPort: 80
    volumeMounts:
    - name: logs
      mountPath: /var/log/nginx
  - name: log-shipper
    image: busybox
    command: ['sh', '-c', 'tail -f /var/log/nginx/access.log']
    volumeMounts:
    - name: logs
      mountPath: /var/log/nginx
  volumes:
  - name: logs
    emptyDir: {}
```

### Init Container

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: pod-with-init
spec:
  initContainers:
  - name: init-db-check
    image: busybox
    command: ['sh', '-c', 'until nslookup mydb; do echo waiting for db; sleep 2; done']
  containers:
  - name: app
    image: nginx
```

### Resource Limits

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: resource-pod
spec:
  containers:
  - name: app
    image: nginx
    resources:
      requests:
        memory: "128Mi"
        cpu: "250m"
      limits:
        memory: "256Mi"
        cpu: "500m"
```

---

## ⌨️ Commands

```bash
# Create pod
kubectl apply -f pod.yaml
kubectl run nginx --image=nginx

# View pods
kubectl get pods
kubectl get pods -o wide
kubectl describe pod <name>

# Logs
kubectl logs <pod-name>
kubectl logs <pod-name> -c <container-name>

# Exec into pod
kubectl exec -it <pod-name> -- /bin/bash

# Delete pod
kubectl delete pod <name>
```

---

## 🔧 Hands-on Exercise

```bash
# Create multi-container pod
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: Pod
metadata:
  name: multi-container
spec:
  containers:
  - name: nginx
    image: nginx
    ports:
    - containerPort: 80
  - name: sidecar
    image: busybox
    command: ['sh', '-c', 'while true; do echo "sidecar running"; sleep 10; done']
EOF

# View both containers
kubectl get pod multi-container
kubectl logs multi-container -c nginx
kubectl logs multi-container -c sidecar

# Clean up
kubectl delete pod multi-container
```

---

## ➡️ What's Next?

Tomorrow: **Day 09 - ReplicaSets** - Managing Pod replicas

---

<p align="center">
  <a href="../Day-07/day-07.md">« Day 07</a> | <a href="../README.md">Home</a> | <a href="../Day-09/day-09.md">Day 09 »</a>
</p>
