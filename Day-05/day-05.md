<h1 align="center">Day 05: Setting Up Local Cluster</h1>

<p align="center">
  <a href="../Day-04/day-04.md">« Day 04</a> | <a href="../README.md">Home</a> | <a href="../Day-06/day-06.md">Day 06 »</a>
</p>

---

## 🎯 Learning Objectives

By the end of today, you will be able to:
- Install and configure minikube
- Set up kind as an alternative
- Enable Docker Desktop Kubernetes
- Verify cluster is working correctly
- Install useful tools and add-ons
- Troubleshoot common setup issues

---

## 📚 Local Cluster Options

| Tool | Best For | Pros | Cons |
|------|----------|------|------|
| **minikube** | Learning, single-node | Feature-rich, add-ons | Higher resource usage |
| **kind** | CI/CD, multi-node | Fast, lightweight | Fewer built-in features |
| **Docker Desktop** | Casual use | Zero setup | Limited configuration |
| **k3s/k3d** | Edge, ARM | Lightweight | Different from production K8s |

---

## 🛠️ Option 1: Minikube Setup

### Prerequisites

- 2+ CPUs
- 2GB+ free memory
- 20GB+ free disk space
- Container runtime (Docker, Podman, or Hyper-V)

### Installation

**Windows (PowerShell as Admin):**
```powershell
# Using Chocolatey
choco install minikube

# Or download directly
Invoke-WebRequest -Uri "https://github.com/kubernetes/minikube/releases/latest/download/minikube-installer.exe" -OutFile "minikube-installer.exe"
.\minikube-installer.exe
```

**macOS:**
```bash
# Using Homebrew
brew install minikube

# Or binary download
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-darwin-amd64
sudo install minikube-darwin-amd64 /usr/local/bin/minikube
```

**Linux:**
```bash
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube
```

### Starting Minikube

```bash
# Start with default settings
minikube start

# Start with custom resources
minikube start --cpus=4 --memory=8192

# Start with specific Kubernetes version
minikube start --kubernetes-version=v1.28.0

# Start with specific driver
minikube start --driver=docker
```

### Useful Minikube Commands

```bash
# Check status
minikube status

# Stop cluster
minikube stop

# Delete cluster
minikube delete

# SSH into node
minikube ssh

# Open dashboard
minikube dashboard

# Get cluster IP
minikube ip

# Enable add-ons
minikube addons enable ingress
minikube addons enable metrics-server

# List add-ons
minikube addons list
```

---

## 🛠️ Option 2: kind Setup

### Installation

**Windows:**
```powershell
choco install kind
```

**macOS:**
```bash
brew install kind
```

**Linux:**
```bash
curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.20.0/kind-linux-amd64
chmod +x ./kind
sudo mv ./kind /usr/local/bin/kind
```

### Creating Cluster

```bash
# Simple cluster
kind create cluster --name k8s-learning

# Multi-node cluster
cat <<EOF | kind create cluster --name multi-node --config=-
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
- role: control-plane
- role: worker
- role: worker
EOF

# List clusters
kind get clusters

# Delete cluster
kind delete cluster --name k8s-learning
```

---

## 🛠️ Option 3: Docker Desktop

1. Open Docker Desktop Settings
2. Go to **Kubernetes** tab
3. Check **Enable Kubernetes**
4. Click **Apply & Restart**
5. Wait for Kubernetes to start (green indicator)

---

## ⌨️ Installing kubectl

**Windows:**
```powershell
choco install kubernetes-cli
```

**macOS:**
```bash
brew install kubectl
```

**Linux:**
```bash
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
```

### Verify Installation

```bash
# Check kubectl version
kubectl version --client

# Check cluster connection
kubectl cluster-info

# View nodes
kubectl get nodes

# View all resources
kubectl get all -A
```

---

## 🔧 Hands-on Exercises

### Exercise 1: Set Up Your Cluster

Choose one option and set up your cluster:

```bash
# Option A: Minikube
minikube start --cpus=2 --memory=4096

# Option B: kind
kind create cluster --name k8s-learning

# Verify
kubectl cluster-info
kubectl get nodes
```

### Exercise 2: Deploy Test Application

```bash
# Create a deployment
kubectl create deployment hello-k8s --image=nginx

# Verify pod is running
kubectl get pods

# Expose as service
kubectl expose deployment hello-k8s --port=80 --type=NodePort

# Get service URL (minikube)
minikube service hello-k8s --url

# Or port-forward (works with all)
kubectl port-forward service/hello-k8s 8080:80

# Test in browser: http://localhost:8080

# Clean up
kubectl delete deployment hello-k8s
kubectl delete service hello-k8s
```

### Exercise 3: Enable Dashboard (Minikube)

```bash
# Enable dashboard
minikube addons enable dashboard
minikube addons enable metrics-server

# Open dashboard
minikube dashboard
```

### Exercise 4: Multi-Node Cluster (kind)

```bash
# Create config file
cat > kind-config.yaml <<EOF
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
- role: control-plane
- role: worker
- role: worker
EOF

# Create cluster
kind create cluster --name multi-node --config kind-config.yaml

# Verify nodes
kubectl get nodes

# Clean up
kind delete cluster --name multi-node
```

---

## 🔍 Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| minikube won't start | Try different driver: `minikube start --driver=docker` |
| kubectl can't connect | Check context: `kubectl config current-context` |
| Pods stuck in Pending | Check resources: `kubectl describe pod <name>` |
| Image pull errors | Check internet connection, image name |
| Node NotReady | Check kubelet: `minikube ssh -- sudo systemctl status kubelet` |

### Useful Debug Commands

```bash
# View cluster info
kubectl cluster-info dump

# Check events
kubectl get events --sort-by='.lastTimestamp'

# View component status
kubectl get componentstatuses

# Check node details
kubectl describe node <node-name>
```

---

## ✅ Validation Checklist

| # | Task | Command | Expected |
|---|------|---------|----------|
| 1 | kubectl installed | `kubectl version --client` | Shows version |
| 2 | Cluster running | `kubectl cluster-info` | Shows cluster info |
| 3 | Nodes ready | `kubectl get nodes` | STATUS: Ready |
| 4 | System pods running | `kubectl get pods -n kube-system` | All Running |
| 5 | Can deploy app | `kubectl create deployment test --image=nginx` | deployment created |

---

## 📝 Summary

| Tool | Command to Start | Best For |
|------|-----------------|----------|
| minikube | `minikube start` | Learning, add-ons |
| kind | `kind create cluster` | CI/CD, multi-node |
| Docker Desktop | GUI toggle | Quick testing |

---

## ➡️ What's Next?

Tomorrow in **Day 06: kubectl Fundamentals**, we'll cover:
- Essential kubectl commands
- Output formats (JSON, YAML, wide)
- Context and namespace management
- Resource management
- Imperative vs declarative operations

---

<p align="center">
  <a href="../Day-04/day-04.md">« Day 04</a> | <a href="../README.md">Home</a> | <a href="../Day-06/day-06.md">Day 06 »</a>
</p>

<p align="center">
  <strong>🧡 Happy Learning! 🧡</strong>
</p>
