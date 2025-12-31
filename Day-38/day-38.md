<h1 align="center">Day 38: Monitoring with Prometheus</h1>

<p align="center">
  <a href="../Day-37/day-37.md">« Day 37</a> | <a href="../README.md">Home</a> | <a href="../Day-39/day-39.md">Day 39 »</a>
</p>

---

## 🎯 Learning Objectives

- Understand Prometheus architecture
- Deploy Prometheus on Kubernetes
- Query metrics with PromQL
- Set up alerting

---

## 📚 Core Concepts

**Prometheus** is an open-source monitoring system with:
- Time-series database
- Pull-based metrics collection
- Powerful query language (PromQL)
- Alerting capabilities

---

## 🏗️ Architecture

```
┌───────────────────────────────────────────────────────────────┐
│                       PROMETHEUS STACK                        │
│                                                               │
│  ┌─────────────┐     ┌─────────────┐     ┌─────────────┐     │
│  │  Prometheus │────▶│   Grafana   │     │ AlertManager│     │
│  │   Server    │     │  Dashboard  │     │             │     │
│  └──────┬──────┘     └─────────────┘     └─────────────┘     │
│         │ Scrape                                              │
│         ▼                                                     │
│  ┌─────────────────────────────────────────────────────┐     │
│  │                    Exporters                         │     │
│  │  node-exporter  kube-state-metrics  app-metrics     │     │
│  └─────────────────────────────────────────────────────┘     │
└───────────────────────────────────────────────────────────────┘
```

---

## 📄 Quick Deploy with Helm

```bash
# Add Prometheus Helm repo
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update

# Install kube-prometheus-stack
helm install prometheus prometheus-community/kube-prometheus-stack \
  --namespace monitoring \
  --create-namespace

# View components
kubectl get pods -n monitoring
```

---

## 📄 Access Prometheus UI

```bash
# Port forward Prometheus
kubectl port-forward -n monitoring svc/prometheus-kube-prometheus-prometheus 9090:9090

# Open http://localhost:9090
```

---

## 📚 Basic PromQL Queries

| Query | Description |
|-------|-------------|
| `up` | Check which targets are up |
| `node_cpu_seconds_total` | CPU usage |
| `container_memory_usage_bytes` | Container memory |
| `rate(http_requests_total[5m])` | Request rate |
| `kube_pod_status_phase` | Pod status |

---

## 🔧 Hands-on Exercise

```bash
# Install monitoring stack (if resources allow)
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm install prometheus prometheus-community/kube-prometheus-stack \
  -n monitoring --create-namespace \
  --set prometheus.prometheusSpec.retention=24h

# Check pods
kubectl get pods -n monitoring

# Port forward
kubectl port-forward -n monitoring svc/prometheus-kube-prometheus-prometheus 9090:9090

# Try queries in UI:
# - up
# - kube_pod_info
# - container_cpu_usage_seconds_total

# Clean up
helm uninstall prometheus -n monitoring
kubectl delete namespace monitoring
```

---

## ➡️ What's Next?

Tomorrow: **Day 39 - Visualization with Grafana** - Dashboards and alerts

---

<p align="center">
  <a href="../Day-37/day-37.md">« Day 37</a> | <a href="../README.md">Home</a> | <a href="../Day-39/day-39.md">Day 39 »</a>
</p>
