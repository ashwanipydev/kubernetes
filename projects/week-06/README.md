# Week 06 Project — Observability Stack (Prometheus, Grafana, Logging)

Project Goal
- Deploy Prometheus + Grafana + logging (Fluent Bit / Loki) and instrument an app for metrics and logs.

Architecture
- App Deployment -> Prometheus scrape -> Grafana dashboard; Fluent Bit collects logs to Loki.

Manifests
- prometheus manifests or kube-prometheus stack
- grafana deployment and datasource config
- fluent-bit daemonset and loki config

Expected Outcome
- Dashboards show metrics; logs are searchable and correlated with traces/requests.

Validation Steps
- Generate traffic, check dashboards and logs, trigger alert rule.

Deliverable
- Manifests, dashboard JSON, and README with instructions.
