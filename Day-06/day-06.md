<h1 align="center">Day 06: kubectl Fundamentals</h1>

<p align="center">
  <a href="../Day-05/day-05.md">« Day 05</a> | <a href="../README.md">Home</a> | <a href="../Day-07/day-07.md">Day 07 »</a>
</p>

---

## 🎯 Learning Objectives

By the end of today, you will be able to:
- Master essential kubectl commands
- Understand different output formats
- Manage contexts and namespaces
- Use labels and selectors effectively
- Apply imperative and declarative operations

---

## 📚 Core Concepts

### What is kubectl?

**kubectl** (Kubernetes control) is the command-line tool for interacting with Kubernetes clusters. It communicates with the API server to manage cluster resources.

### Command Syntax

```bash
kubectl [command] [TYPE] [NAME] [flags]
```

| Part | Description | Example |
|------|-------------|---------|
| command | Operation to perform | get, create, delete, apply |
| TYPE | Resource type | pod, deployment, service |
| NAME | Resource name (optional) | nginx, my-app |
| flags | Optional modifiers | -n namespace, -o yaml |

---

## ⌨️ Essential Commands

### Viewing Resources

```bash
# Get resources
kubectl get pods                    # List pods in current namespace
kubectl get pods -A                 # List pods in all namespaces
kubectl get pods -n kube-system     # List pods in specific namespace
kubectl get pods -o wide            # Additional columns (IP, node)
kubectl get pods -o yaml            # Full YAML output
kubectl get pods -o json            # JSON output
kubectl get all                     # Get common resources

# Describe resources (detailed info)
kubectl describe pod <pod-name>
kubectl describe node <node-name>
kubectl describe deployment <deploy-name>

# Get specific fields
kubectl get pods -o jsonpath='{.items[*].metadata.name}'
kubectl get pods -o custom-columns=NAME:.metadata.name,STATUS:.status.phase
```

### Creating Resources

```bash
# Imperative commands
kubectl run nginx --image=nginx                    # Create pod
kubectl create deployment nginx --image=nginx     # Create deployment
kubectl expose deployment nginx --port=80         # Create service

# Declarative
kubectl apply -f manifest.yaml        # Create/update from file
kubectl apply -f ./manifests/         # Apply all files in directory
kubectl apply -f https://url/file.yaml  # Apply from URL
```

### Modifying Resources

```bash
# Edit live resource
kubectl edit deployment nginx

# Patch resource
kubectl patch deployment nginx -p '{"spec":{"replicas":3}}'

# Scale
kubectl scale deployment nginx --replicas=5

# Set image
kubectl set image deployment/nginx nginx=nginx:1.25

# Add/update labels
kubectl label pods nginx env=prod
kubectl label pods nginx env=staging --overwrite

# Add annotations
kubectl annotate pods nginx description="My nginx pod"
```

### Deleting Resources

```bash
# Delete by name
kubectl delete pod nginx
kubectl delete deployment nginx

# Delete from file
kubectl delete -f manifest.yaml

# Delete all pods
kubectl delete pods --all

# Force delete (stuck pods)
kubectl delete pod nginx --force --grace-period=0
```

### Debugging Commands

```bash
# View logs
kubectl logs <pod-name>
kubectl logs <pod-name> -c <container>   # Multi-container pod
kubectl logs <pod-name> -f               # Follow logs
kubectl logs <pod-name> --previous       # Previous container logs

# Execute commands
kubectl exec <pod-name> -- ls /app
kubectl exec -it <pod-name> -- /bin/bash

# Port forwarding
kubectl port-forward pod/nginx 8080:80
kubectl port-forward svc/nginx 8080:80

# Copy files
kubectl cp <pod>:/path/file ./local-file
kubectl cp ./local-file <pod>:/path/file
```

---

## 🔧 Context and Configuration

### Working with Contexts

```bash
# View current context
kubectl config current-context

# List all contexts
kubectl config get-contexts

# Switch context
kubectl config use-context <context-name>

# Set default namespace
kubectl config set-context --current --namespace=dev

# View config
kubectl config view
```

### Namespace Management

```bash
# List namespaces
kubectl get namespaces

# Create namespace
kubectl create namespace dev

# Delete namespace (deletes all resources in it!)
kubectl delete namespace dev

# Work in specific namespace
kubectl get pods -n dev
kubectl apply -f manifest.yaml -n dev
```

---

## 📄 Output Formats

| Format | Flag | Use Case |
|--------|------|----------|
| Wide | `-o wide` | Additional columns |
| YAML | `-o yaml` | Full resource definition |
| JSON | `-o json` | Scripting, parsing |
| Name | `-o name` | Just resource names |
| JSONPath | `-o jsonpath='{...}'` | Extract specific fields |
| Custom | `-o custom-columns=...` | Custom table format |

### Examples

```bash
# Wide format
kubectl get pods -o wide

# Get just names
kubectl get pods -o name

# Custom columns
kubectl get pods -o custom-columns=\
'NAME:.metadata.name,STATUS:.status.phase,IP:.status.podIP'

# JSONPath examples
kubectl get pods -o jsonpath='{.items[0].metadata.name}'
kubectl get nodes -o jsonpath='{.items[*].status.addresses[0].address}'
```

---

## 🔧 Hands-on Exercises

### Exercise 1: Basic Operations

```bash
# Create deployment
kubectl create deployment web --image=nginx --replicas=3

# View pods with wide output
kubectl get pods -o wide

# Describe one pod
kubectl describe pod <pod-name>

# View logs
kubectl logs <pod-name>

# Execute command in pod
kubectl exec <pod-name> -- cat /etc/nginx/nginx.conf

# Clean up
kubectl delete deployment web
```

### Exercise 2: Labels and Selectors

```bash
# Create pods with labels
kubectl run app1 --image=nginx --labels="app=web,env=prod"
kubectl run app2 --image=nginx --labels="app=web,env=dev"
kubectl run app3 --image=nginx --labels="app=api,env=prod"

# Select by label
kubectl get pods -l app=web
kubectl get pods -l env=prod
kubectl get pods -l 'app in (web,api)'

# Show labels
kubectl get pods --show-labels

# Clean up
kubectl delete pods -l app
```

### Exercise 3: Namespace Practice

```bash
# Create namespaces
kubectl create namespace development
kubectl create namespace production

# Deploy to different namespaces
kubectl create deployment web --image=nginx -n development
kubectl create deployment web --image=nginx -n production

# View pods in each namespace
kubectl get pods -n development
kubectl get pods -n production
kubectl get pods -A  # All namespaces

# Set default namespace
kubectl config set-context --current --namespace=development

# Clean up
kubectl delete namespace development production
```

### Exercise 4: Output Formats

```bash
# Create a deployment
kubectl create deployment nginx --image=nginx

# Practice different outputs
kubectl get deployment nginx -o yaml > nginx-deploy.yaml
kubectl get deployment nginx -o json | jq '.spec.replicas'
kubectl get pods -o jsonpath='{range .items[*]}{.metadata.name}{"\n"}{end}'

# Clean up
kubectl delete deployment nginx
```

---

## ✅ Validation Checklist

| # | Task | Command |
|---|------|---------|
| 1 | List pods | `kubectl get pods` |
| 2 | Describe pod | `kubectl describe pod <name>` |
| 3 | View logs | `kubectl logs <pod>` |
| 4 | Exec into pod | `kubectl exec -it <pod> -- bash` |
| 5 | Get YAML output | `kubectl get pod <name> -o yaml` |
| 6 | Switch namespace | `kubectl config set-context --current --namespace=<ns>` |

---

## 📝 Summary

### Command Quick Reference

| Action | Command |
|--------|---------|
| List resources | `kubectl get <type>` |
| Details | `kubectl describe <type> <name>` |
| Create | `kubectl apply -f <file>` |
| Delete | `kubectl delete <type> <name>` |
| Logs | `kubectl logs <pod>` |
| Exec | `kubectl exec -it <pod> -- <cmd>` |
| Edit | `kubectl edit <type> <name>` |

---

## ➡️ What's Next?

Tomorrow in **Day 07: Week 1 Project**, we'll:
- Deploy a complete static web application
- Apply all concepts learned this week
- Practice real-world deployment scenarios

---

<p align="center">
  <a href="../Day-05/day-05.md">« Day 05</a> | <a href="../README.md">Home</a> | <a href="../Day-07/day-07.md">Day 07 »</a>
</p>
