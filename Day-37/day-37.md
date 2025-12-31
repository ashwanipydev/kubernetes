<h1 align="center">Day 37: Advanced Helm</h1>

<p align="center">
  <a href="../Day-36/day-36.md">« Day 36</a> | <a href="../README.md">Home</a> | <a href="../Day-38/day-38.md">Day 38 »</a>
</p>

---

## 🎯 Learning Objectives

- Create custom Helm charts
- Use templating functions
- Manage dependencies
- Test charts

---

## 📚 Chart Structure

```
mychart/
├── Chart.yaml          # Chart metadata
├── values.yaml         # Default values
├── templates/          # Template files
│   ├── deployment.yaml
│   ├── service.yaml
│   ├── ingress.yaml
│   ├── _helpers.tpl    # Template helpers
│   └── NOTES.txt       # Post-install notes
├── charts/             # Dependencies
└── .helmignore         # Files to ignore
```

---

## 📄 Chart.yaml

```yaml
apiVersion: v2
name: myapp
description: My application chart
type: application
version: 1.0.0
appVersion: "1.16.0"
dependencies:
  - name: redis
    version: 17.x.x
    repository: https://charts.bitnami.com/bitnami
```

---

## 📄 Template Example

```yaml
# templates/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ include "myapp.fullname" . }}
  labels:
    {{- include "myapp.labels" . | nindent 4 }}
spec:
  replicas: {{ .Values.replicaCount }}
  selector:
    matchLabels:
      {{- include "myapp.selectorLabels" . | nindent 6 }}
  template:
    metadata:
      labels:
        {{- include "myapp.selectorLabels" . | nindent 8 }}
    spec:
      containers:
        - name: {{ .Chart.Name }}
          image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
          ports:
            - containerPort: {{ .Values.service.port }}
```

---

## ⌨️ Commands

```bash
# Create new chart
helm create myapp

# Lint chart
helm lint myapp

# Render templates locally
helm template myapp ./myapp

# Package chart
helm package myapp

# Install from local chart
helm install myapp ./myapp

# Update dependencies
helm dependency update myapp
```

---

## 🔧 Hands-on Exercise

```bash
# Create chart
helm create myapp

# Modify values.yaml
cat > myapp/values.yaml <<EOF
replicaCount: 2
image:
  repository: nginx
  tag: "latest"
service:
  type: ClusterIP
  port: 80
EOF

# Lint
helm lint myapp

# Install
helm install demo ./myapp

# View
kubectl get all -l app.kubernetes.io/instance=demo

# Clean up
helm uninstall demo
rm -rf myapp
```

---

## ➡️ What's Next?

Tomorrow: **Day 38 - Monitoring with Prometheus** - Metrics collection

---

<p align="center">
  <a href="../Day-36/day-36.md">« Day 36</a> | <a href="../README.md">Home</a> | <a href="../Day-38/day-38.md">Day 38 »</a>
</p>
