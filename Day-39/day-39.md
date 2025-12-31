<h1 align="center">Day 39: Visualization with Grafana</h1>

<p align="center">
  <a href="../Day-38/day-38.md">« Day 38</a> | <a href="../README.md">Home</a> | <a href="../Day-40/day-40.md">Day 40 »</a>
</p>

---

## 🎯 Learning Objectives

- Access Grafana dashboards
- Create custom dashboards
- Configure alerts
- Import community dashboards

---

## 📚 Grafana Overview

**Grafana** is an open-source visualization platform for:
- Creating dashboards
- Querying data sources
- Setting up alerts
- Sharing insights

---

## 📄 Access Grafana

```bash
# Port forward (from kube-prometheus-stack)
kubectl port-forward -n monitoring svc/prometheus-grafana 3000:80

# Default credentials:
# Username: admin
# Password: prom-operator

# Or get password:
kubectl get secret -n monitoring prometheus-grafana -o jsonpath="{.data.admin-password}" | base64 -d
```

---

## 📄 Pre-built Dashboards

The kube-prometheus-stack includes dashboards:
- Kubernetes / Compute Resources / Cluster
- Kubernetes / Compute Resources / Namespace (Pods)
- Node Exporter / Nodes
- CoreDNS
- etcd

---

## 📄 Import Dashboard

1. Go to Dashboards → Import
2. Enter dashboard ID from grafana.com
3. Popular IDs:
   - 315: Kubernetes cluster monitoring
   - 1860: Node Exporter Full
   - 13332: Kube State Metrics

---

## 📄 Create Custom Dashboard

1. Click "+" → Dashboard
2. Add new panel
3. Select data source (Prometheus)
4. Enter PromQL query
5. Customize visualization
6. Save dashboard

### Example Panel Query

```promql
# CPU Usage by Pod
sum(rate(container_cpu_usage_seconds_total{namespace="default"}[5m])) by (pod)
```

---

## 🔧 Hands-on Exercise

```bash
# Access Grafana
kubectl port-forward -n monitoring svc/prometheus-grafana 3000:80

# In browser:
# 1. Login with admin / prom-operator
# 2. Go to Dashboards → Browse
# 3. Explore "Kubernetes / Compute Resources / Cluster"
# 4. Try importing dashboard ID 13332
```

---

## ➡️ What's Next?

Tomorrow: **Day 40 - Logging Concepts** - Centralized logging

---

<p align="center">
  <a href="../Day-38/day-38.md">« Day 38</a> | <a href="../README.md">Home</a> | <a href="../Day-40/day-40.md">Day 40 »</a>
</p>
