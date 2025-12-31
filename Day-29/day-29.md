<h1 align="center">Day 29: Ingress Concepts</h1>

<p align="center">
  <a href="../Day-28/day-28.md">« Day 28</a> | <a href="../README.md">Home</a> | <a href="../Day-30/day-30.md">Day 30 »</a>
</p>

---

## 🎯 Learning Objectives

- Understand Ingress purpose
- Configure path-based routing
- Set up host-based routing
- Configure TLS termination

---

## 📚 Core Concepts

**Ingress** manages external HTTP/HTTPS access to services, providing:
- URL-based routing
- SSL/TLS termination
- Name-based virtual hosting
- Load balancing

### Ingress vs Services

| Feature | Service (LoadBalancer) | Ingress |
|---------|----------------------|---------|
| Layer | L4 (TCP/UDP) | L7 (HTTP/HTTPS) |
| Cost | One LB per service | Single LB for many services |
| Routing | Port-based | Path/Host-based |
| TLS | Per-service | Centralized |

---

## 📄 Basic Ingress

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: web-ingress
spec:
  rules:
  - host: app.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: web-service
            port:
              number: 80
```

---

## 📄 Path-Based Routing

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: multi-path-ingress
spec:
  rules:
  - host: app.example.com
    http:
      paths:
      - path: /api
        pathType: Prefix
        backend:
          service:
            name: api-service
            port:
              number: 8080
      - path: /
        pathType: Prefix
        backend:
          service:
            name: frontend-service
            port:
              number: 80
```

---

## 📄 TLS Configuration

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: tls-ingress
spec:
  tls:
  - hosts:
    - app.example.com
    secretName: tls-secret
  rules:
  - host: app.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: web-service
            port:
              number: 80
```

---

## ⌨️ Commands

```bash
# View ingress
kubectl get ingress
kubectl describe ingress web-ingress

# Create TLS secret
kubectl create secret tls tls-secret \
  --cert=tls.crt --key=tls.key
```

---

## 📝 Path Types

| Type | Matching |
|------|----------|
| `Exact` | Matches exact path |
| `Prefix` | Matches URL path prefix |
| `ImplementationSpecific` | Controller-dependent |

---

## ➡️ What's Next?

Tomorrow: **Day 30 - Ingress Controllers** - Setting up NGINX Ingress

---

<p align="center">
  <a href="../Day-28/day-28.md">« Day 28</a> | <a href="../README.md">Home</a> | <a href="../Day-30/day-30.md">Day 30 »</a>
</p>
