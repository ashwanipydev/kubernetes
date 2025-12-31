<h1 align="center">Day 12: Services - NodePort & LoadBalancer</h1>

<p align="center">
  <a href="../Day-11/day-11.md">« Day 11</a> | <a href="../README.md">Home</a> | <a href="../Day-13/day-13.md">Day 13 »</a>
</p>

---

## 🎯 Learning Objectives

- Configure NodePort Services
- Set up LoadBalancer Services
- Understand ExternalName Services
- Choose the right service type

---

## 📚 NodePort

NodePort exposes the service on each node's IP at a static port (30000-32767).

```
                    External Traffic
                          │
          ┌───────────────┼───────────────┐
          ▼               ▼               ▼
   ┌────────────┐  ┌────────────┐  ┌────────────┐
   │  Node 1    │  │  Node 2    │  │  Node 3    │
   │ :30080     │  │ :30080     │  │ :30080     │
   └─────┬──────┘  └─────┬──────┘  └─────┬──────┘
         │               │               │
         └───────────────┼───────────────┘
                         ▼
                    ┌─────────┐
                    │ Service │
                    └────┬────┘
                ┌────────┼────────┐
                ▼        ▼        ▼
             [Pod]    [Pod]    [Pod]
```

### NodePort YAML

```yaml
apiVersion: v1
kind: Service
metadata:
  name: web-nodeport
spec:
  type: NodePort
  selector:
    app: web
  ports:
  - port: 80
    targetPort: 80
    nodePort: 30080  # Optional, auto-assigned if omitted
```

---

## 📚 LoadBalancer

LoadBalancer provisions an external load balancer (cloud provider).

```
              ┌─────────────────────┐
              │  Cloud Load Balancer│
              │  External IP: x.x.x.x│
              └──────────┬──────────┘
                         │
          ┌──────────────┼──────────────┐
          ▼              ▼              ▼
      [Node 1]       [Node 2]       [Node 3]
          │              │              │
          └──────────────┼──────────────┘
                         ▼
                    [Service]
                         │
              ┌──────────┼──────────┐
              ▼          ▼          ▼
           [Pod]      [Pod]      [Pod]
```

### LoadBalancer YAML

```yaml
apiVersion: v1
kind: Service
metadata:
  name: web-loadbalancer
spec:
  type: LoadBalancer
  selector:
    app: web
  ports:
  - port: 80
    targetPort: 80
```

---

## 📚 ExternalName

Maps a service to an external DNS name.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: external-db
spec:
  type: ExternalName
  externalName: db.example.com
```

---

## ⌨️ Commands

```bash
# Create NodePort
kubectl expose deployment web --type=NodePort --port=80

# Create LoadBalancer
kubectl expose deployment web --type=LoadBalancer --port=80

# Get external IP
kubectl get svc web-loadbalancer

# For minikube LoadBalancer
minikube service web-loadbalancer --url
```

---

## 🔧 Hands-on Exercise

```bash
# Create deployment
kubectl create deployment web --image=nginx --replicas=3

# Expose as NodePort
kubectl expose deployment web --type=NodePort --port=80 --name=web-np

# Get assigned port
kubectl get svc web-np

# Access (minikube)
minikube service web-np

# Expose as LoadBalancer
kubectl expose deployment web --type=LoadBalancer --port=80 --name=web-lb

# Check status (EXTERNAL-IP pending in local clusters)
kubectl get svc web-lb

# Clean up
kubectl delete deployment web
kubectl delete svc web-np web-lb
```

---

## 📝 Service Types Comparison

| Type | Scope | Port Range | Use Case |
|------|-------|------------|----------|
| ClusterIP | Internal | Any | Pod-to-pod |
| NodePort | External | 30000-32767 | Development |
| LoadBalancer | External | Any | Production (cloud) |
| ExternalName | DNS | N/A | External services |

---

## ➡️ What's Next?

Tomorrow: **Day 13 - Labels, Selectors & Annotations** - Organizing resources

---

<p align="center">
  <a href="../Day-11/day-11.md">« Day 11</a> | <a href="../README.md">Home</a> | <a href="../Day-13/day-13.md">Day 13 »</a>
</p>
