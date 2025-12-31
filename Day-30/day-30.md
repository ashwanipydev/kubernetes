<h1 align="center">Day 30: Ingress Controllers</h1>

<p align="center">
  <a href="../Day-29/day-29.md">« Day 29</a> | <a href="../README.md">Home</a> | <a href="../Day-31/day-31.md">Day 31 »</a>
</p>

---

## 🎯 Learning Objectives

- Install NGINX Ingress Controller
- Configure ingress annotations
- Deploy complete ingress example
- Test routing functionality

---

## 📚 Popular Ingress Controllers

| Controller | Provider |
|------------|----------|
| NGINX | Kubernetes community |
| Traefik | Traefik Labs |
| HAProxy | HAProxy |
| Contour | VMware |
| Ambassador | Datawire |
| AWS ALB | Amazon |

---

## 📄 Installing NGINX Ingress

### Minikube

```bash
minikube addons enable ingress
```

### Helm

```bash
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm install ingress-nginx ingress-nginx/ingress-nginx -n ingress-nginx --create-namespace
```

### Verify

```bash
kubectl get pods -n ingress-nginx
kubectl get svc -n ingress-nginx
```

---

## 📄 Common Annotations

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: web-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    nginx.ingress.kubernetes.io/proxy-body-size: "10m"
    nginx.ingress.kubernetes.io/proxy-connect-timeout: "30"
spec:
  ingressClassName: nginx
  rules:
  - host: app.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: web
            port:
              number: 80
```

---

## 🔧 Hands-on Exercise

```bash
# Enable ingress (minikube)
minikube addons enable ingress

# Create backend services
kubectl create deployment web1 --image=nginx
kubectl expose deployment web1 --port=80

kubectl create deployment web2 --image=httpd
kubectl expose deployment web2 --port=80

# Create ingress
cat <<EOF | kubectl apply -f -
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: demo-ingress
spec:
  rules:
  - host: web1.local
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: web1
            port:
              number: 80
  - host: web2.local
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: web2
            port:
              number: 80
EOF

# Get ingress IP
kubectl get ingress

# Test (add to /etc/hosts: <IP> web1.local web2.local)
minikube ip  # Get IP
curl -H "Host: web1.local" http://$(minikube ip)
curl -H "Host: web2.local" http://$(minikube ip)

# Clean up
kubectl delete ingress demo-ingress
kubectl delete deployment web1 web2
kubectl delete svc web1 web2
```

---

## ➡️ What's Next?

Tomorrow: **Day 31 - Network Policies** - Pod-to-pod traffic control

---

<p align="center">
  <a href="../Day-29/day-29.md">« Day 29</a> | <a href="../README.md">Home</a> | <a href="../Day-31/day-31.md">Day 31 »</a>
</p>
