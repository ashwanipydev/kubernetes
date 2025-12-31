<h1 align="center">Day 04: Kubernetes Architecture</h1>

<p align="center">
  <a href="../Day-03/day-03.md">« Day 03</a> | <a href="../README.md">Home</a> | <a href="../Day-05/day-05.md">Day 05 »</a>
</p>

---

## 🎯 Learning Objectives

By the end of today, you will be able to:
- Describe the Kubernetes cluster architecture
- Explain the role of each control plane component
- Understand node components and their functions
- Trace how a Pod is created from kubectl to running container
- Understand the declarative vs imperative model

---

## 📚 Core Concepts

### Kubernetes Cluster Architecture

A Kubernetes cluster consists of two main components:

1. **Control Plane (Master)**: The brain of the cluster
2. **Worker Nodes**: Where your applications run

### Control Plane Components

| Component | Purpose |
|-----------|---------|
| **kube-apiserver** | Central API endpoint, handles all requests |
| **etcd** | Distributed key-value store for cluster state |
| **kube-scheduler** | Decides which node runs each Pod |
| **kube-controller-manager** | Runs controllers that maintain desired state |

### Node Components

| Component | Purpose |
|-----------|---------|
| **kubelet** | Node agent, manages Pods on the node |
| **kube-proxy** | Network proxy, implements Services |
| **Container Runtime** | Runs containers (containerd, CRI-O) |

---

## 🧠 Control Plane Deep Dive

### kube-apiserver

The API Server is the front door to Kubernetes:
- REST API endpoint for all cluster operations
- Authenticates and authorizes requests
- Validates request syntax
- Only component that talks to etcd

### etcd

The cluster's brain:
- Stores all cluster state
- Distributed key-value store using Raft consensus
- Highly available when run as a cluster
- Only API Server communicates with etcd

### kube-scheduler

Decides where Pods run:
- Watches for newly created Pods
- Considers resource requirements, affinity rules, taints/tolerations
- Assigns Pods to appropriate Nodes

### kube-controller-manager

Runs reconciliation loops:

| Controller | Purpose |
|------------|---------|
| Node Controller | Monitors node health |
| Deployment Controller | Manages rollouts |
| ReplicaSet Controller | Maintains Pod counts |
| Service Controller | Creates cloud load balancers |

---

## 🖥️ Node Components Deep Dive

### kubelet

- Node agent running on every node
- Receives Pod specs from API Server
- Starts/stops containers via container runtime
- Reports node and Pod status

### kube-proxy

- Network proxy on each node
- Implements Service networking
- Uses iptables or IPVS for routing
- Load balances traffic to Pods

### Container Runtime

- Actually runs containers
- containerd (most common)
- CRI-O (Kubernetes-focused)
- Implements Container Runtime Interface (CRI)

---

## 🔄 Pod Creation Flow

When you run `kubectl create deployment nginx --image=nginx`:

1. **kubectl** sends request to API Server
2. **API Server** validates and stores in etcd
3. **Deployment Controller** creates ReplicaSet
4. **ReplicaSet Controller** creates Pod
5. **Scheduler** assigns Pod to Node
6. **kubelet** pulls image and starts container
7. **kubelet** reports status back

---

## 📘 Declarative vs Imperative

### Imperative (Commands)

```bash
kubectl create deployment nginx --image=nginx
kubectl scale deployment nginx --replicas=3
```

### Declarative (YAML)

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx
spec:
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
```

### Why Declarative is Better

| Aspect | Imperative | Declarative |
|--------|------------|-------------|
| Reproducibility | Hard | Easy (version controlled) |
| GitOps | Not compatible | Works perfectly |
| Documentation | Commands lost | YAML documents state |

---

## 🔧 Hands-on Exercises

### Exercise 1: Explore Control Plane

```bash
# View control plane components
kubectl get pods -n kube-system

# Describe API server
kubectl describe pod -n kube-system -l component=kube-apiserver
```

### Exercise 2: Trace Pod Creation

```bash
# Terminal 1: Watch events
kubectl get events -w

# Terminal 2: Create pod
kubectl run trace-demo --image=nginx

# Observe the event sequence
kubectl delete pod trace-demo
```

### Exercise 3: Declarative Deployment

Create `nginx-deploy.yaml`:
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-declarative
spec:
  replicas: 2
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
```

```bash
kubectl apply -f nginx-deploy.yaml
kubectl get deployments
kubectl delete -f nginx-deploy.yaml
```

---

## ✅ Validation Checklist

| # | Question |
|---|----------|
| 1 | What is the role of kube-apiserver? |
| 2 | What does etcd store? |
| 3 | How does the scheduler place Pods? |
| 4 | What does kubelet do? |
| 5 | What is kube-proxy's purpose? |
| 6 | Trace Pod creation flow |

---

## 📝 Summary

| Component | Location | Purpose |
|-----------|----------|---------|
| kube-apiserver | Control Plane | Central API |
| etcd | Control Plane | State storage |
| kube-scheduler | Control Plane | Pod placement |
| kube-controller-manager | Control Plane | State reconciliation |
| kubelet | Node | Pod management |
| kube-proxy | Node | Network routing |
| Container Runtime | Node | Run containers |

---

## ➡️ What's Next?

Tomorrow in **Day 05: Setting Up Local Cluster**, we'll cover:
- Installing minikube
- Alternative: kind
- Cluster verification
- Useful add-ons

---

<p align="center">
  <a href="../Day-03/day-03.md">« Day 03</a> | <a href="../README.md">Home</a> | <a href="../Day-05/day-05.md">Day 05 »</a>
</p>

<p align="center">
  <strong>🧡 Happy Learning! 🧡</strong>
</p>
