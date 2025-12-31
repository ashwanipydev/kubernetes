<h1 align="center">Day 11: Services - ClusterIP</h1>

<p align="center">
  <a href="../Day-10/day-10.md">« Day 10</a> | <a href="../README.md">Home</a> | <a href="../Day-12/day-12.md">Day 12 »</a>
</p>

---

## 🎯 Learning Objectives

- Understand Service concepts
- Create ClusterIP Services
- Configure service discovery
- Use DNS for pod communication

---

## 📚 Core Concepts

### Why Services?

Pods are ephemeral - they get new IPs when recreated. Services provide:
- **Stable IP address** for a group of Pods
- **Load balancing** across Pods
- **Service discovery** via DNS
- **Decoupling** between consumers and providers

### Service Types Overview

| Type | Accessibility | Use Case |
|------|--------------|----------|
| ClusterIP | Internal only | Pod-to-pod communication |
| NodePort | External via node IP | Development, testing |
| LoadBalancer | External via cloud LB | Production external access |
| ExternalName | DNS alias | External service mapping |

### ClusterIP (Default)

ClusterIP creates an internal-only IP address for pod-to-pod communication.

```
┌─────────────────────────────────────────────────────────┐
│                    Kubernetes Cluster                   │
│                                                         │
│   ┌─────────────┐      ┌─────────────────────────────┐ │
│   │ Client Pod  │─────▶│  Service (ClusterIP)        │ │
│   └─────────────┘      │  IP: 10.96.100.50           │ │
│                        │  Port: 80                    │ │
│                        └──────────┬──────────────────┘ │
│                                   │ Load Balance       │
│                     ┌─────────────┼─────────────┐      │
│                     ▼             ▼             ▼      │
│                ┌────────┐   ┌────────┐   ┌────────┐   │
│                │ Pod 1  │   │ Pod 2  │   │ Pod 3  │   │
│                └────────┘   └────────┘   └────────┘   │
└─────────────────────────────────────────────────────────┘
```

---

## 📄 YAML Examples

### ClusterIP Service

```yaml
apiVersion: v1
kind: Service
metadata:
  name: backend-service
spec:
  type: ClusterIP  # Default, can be omitted
  selector:
    app: backend
  ports:
  - port: 80          # Service port
    targetPort: 8080   # Container port
    protocol: TCP
```

### Multi-Port Service

```yaml
apiVersion: v1
kind: Service
metadata:
  name: multi-port-service
spec:
  selector:
    app: myapp
  ports:
  - name: http
    port: 80
    targetPort: 8080
  - name: https
    port: 443
    targetPort: 8443
```

---

## 🌐 Service Discovery

Kubernetes provides DNS for service discovery:

```bash
# DNS format
<service-name>.<namespace>.svc.cluster.local

# Examples
backend-service.default.svc.cluster.local
backend-service.default  # Short form
backend-service          # Same namespace
```

---

## ⌨️ Commands

```bash
# Create service imperatively
kubectl expose deployment nginx --port=80 --target-port=80

# Create from YAML
kubectl apply -f service.yaml

# View services
kubectl get services
kubectl get svc
kubectl describe svc <name>

# Get endpoints
kubectl get endpoints <service-name>

# Test connectivity
kubectl run test --image=busybox --rm -it -- wget -qO- http://backend-service
```

---

## 🔧 Hands-on Exercise

```bash
# Create a deployment
kubectl create deployment backend --image=nginx --replicas=3

# Expose as ClusterIP service
kubectl expose deployment backend --port=80

# Verify service
kubectl get svc backend
kubectl get endpoints backend

# Test from another pod
kubectl run client --image=busybox --rm -it -- sh
# Inside the pod:
wget -qO- http://backend
nslookup backend

# Clean up
kubectl delete deployment backend
kubectl delete svc backend
```

---

## 📝 Key Points

| Concept | Description |
|---------|-------------|
| **ClusterIP** | Internal IP accessible only within cluster |
| **Selector** | Matches pods with these labels |
| **Port** | Port exposed by the Service |
| **TargetPort** | Port on the Pod/Container |
| **Endpoints** | List of Pod IPs behind the Service |

---

## ➡️ What's Next?

Tomorrow: **Day 12 - Services (NodePort & LoadBalancer)** - External access

---

<p align="center">
  <a href="../Day-10/day-10.md">« Day 10</a> | <a href="../README.md">Home</a> | <a href="../Day-12/day-12.md">Day 12 »</a>
</p>
