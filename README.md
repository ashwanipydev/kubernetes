<p align="center">
  <img src="./images/icons8-kubernetes-240.png" alt="Kubernetes Logo" width="240"/>
</p>

<h1 align="center">45 Days of Kubernetes</h1>

<p align="center">
  <strong>A comprehensive, hands-on journey from Kubernetes beginner to production-ready expert</strong>
</p>

<p align="center">
  <a href="https://github.com/ashwanipydev/45-Days-Of-Kubernetes">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome"/>
  </a>
  <a href="https://github.com/ashwanipydev/45-Days-Of-Kubernetes/stargazers">
    <img src="https://img.shields.io/github/stars/ashwanipydev/45-Days-Of-Kubernetes" alt="Stars"/>
  </a>
  <a href="https://github.com/ashwanipydev/45-Days-Of-Kubernetes/network/members">
    <img src="https://img.shields.io/github/forks/ashwanipydev/45-Days-Of-Kubernetes" alt="Forks"/>
  </a>
  <a href="https://github.com/ashwanipydev/45-Days-Of-Kubernetes/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/ashwanipydev/45-Days-Of-Kubernetes" alt="License"/>
  </a>
</p>

<p align="center">
  Author: <strong>Ashwani Pandey</strong><br/>
  December 2025
</p>

---

<p align="center">
  <a href="./index.html">Start Learning >></a>
</p>

## 📋 Table of Contents

- [Quick Navigation](#-quick-navigation)
- [Introduction](#-introduction)
- [Who Is This For](#-who-is-this-for)
- [Learning Outcomes](#-learning-outcomes)
- [Prerequisites](#-prerequisites)
- [Tools Required](#-tools-required)
- [How to Use This Repository](#-how-to-use-this-repository)
- [Daily Learning Format](#-daily-learning-format)
- [Learning Path Overview](#-learning-path-overview)
- [Weekly Projects](#-weekly-projects)
- [Days Overview](#-days-overview)
- [Setup Guide](#-setup-guide)
- [Contribution Guidelines](#-contribution-guidelines)
- [License](#-license)

---

## 🚀 Quick Navigation

**Click any day to jump directly to that lesson:**

| Week 1: Foundations | Week 2: Core Objects | Week 3: Config & Storage |
|:-------------------:|:--------------------:|:------------------------:|
| [Day 01](./index.html) | [Day 08](./index.html) | [Day 15](./index.html) |
| [Day 02](./index.html) | [Day 09](./index.html) | [Day 16](./index.html) |
| [Day 03](./index.html) | [Day 10](./index.html) | [Day 17](./index.html) |
| [Day 04](./index.html) | [Day 11](./index.html) | [Day 18](./index.html) |
| [Day 05](./index.html) | [Day 12](./index.html) | [Day 19](./index.html) |
| [Day 06](./index.html) | [Day 13](./index.html) | [Day 20](./index.html) |
| [Day 07](./index.html) 🏗️ | [Day 14](./index.html) 🏗️ | [Day 21](./index.html) 🏗️ |

| Week 4: Resources & Updates | Week 5: Networking & Security | Week 6: Production |
|:---------------------------:|:-----------------------------:|:------------------:|
| [Day 22](./index.html) | [Day 29](./index.html) | [Day 36](./index.html) |
| [Day 23](./index.html) | [Day 30](./index.html) | [Day 37](./index.html) |
| [Day 24](./index.html) | [Day 31](./index.html) | [Day 38](./index.html) |
| [Day 25](./index.html) | [Day 32](./index.html) | [Day 39](./index.html) |
| [Day 26](./index.html) | [Day 33](./index.html) | [Day 40](./index.html) |
| [Day 27](./index.html) | [Day 34](./index.html) | [Day 41](./index.html) |
| [Day 28](./index.html) 🏗️ | [Day 35](./index.html) 🏗️ | [Day 42](./index.html) |
|  |  | [Day 43](./index.html) |
|  |  | [Day 44](./index.html) |
|  |  | [Day 45](./index.html) 🎓 |

> 🏗️ = Weekly Project Day | 🎓 = Final Project & Conclusion

---

## 🚀 Introduction

Congratulations on deciding to participate in the **45 Days of Kubernetes** challenge! This comprehensive program is designed to take you from a complete beginner to a job-ready Kubernetes professional.

Kubernetes (K8s) has become the de facto standard for container orchestration in the industry. Whether you're a developer, DevOps engineer, or system administrator, understanding Kubernetes is now an essential skill for modern cloud-native application development and deployment.

This challenge is structured as a **step-by-step guide** that combines:
- 📚 **Core concepts** with clear explanations
- ⌨️ **Practical kubectl commands** you'll use daily
- 📄 **Real-world YAML examples** you can use immediately
- 🔧 **Hands-on exercises** to reinforce learning
- 🏗️ **Mini-projects** to build your portfolio
- ✅ **Validation steps** to verify your understanding

By the end of this 45-day journey, you'll have the skills and confidence to:
- Deploy and manage production-grade Kubernetes clusters
- Debug and troubleshoot complex container orchestration issues
- Implement security best practices
- Set up monitoring and logging solutions
- Write infrastructure as code using Helm charts

---

## 🎯 Who Is This For

This repository is designed for:

| Audience | Description |
|----------|-------------|
| **Developers** | Looking to deploy applications on Kubernetes for the first time |
| **DevOps Engineers** | Seeking to deepen their container orchestration skills |
| **System Administrators** | Transitioning to cloud-native infrastructure |
| **Cloud Engineers** | Preparing for Kubernetes certifications (CKA, CKAD, CKS) |
| **Students** | Building practical skills for their tech career |
| **Career Changers** | Moving into cloud and DevOps roles |

---

## 🏆 Learning Outcomes

By completing this 45-day challenge, you will be able to:

### Foundational Skills (Week 1-2)
- ✅ Understand container concepts and how they differ from VMs
- ✅ Explain Kubernetes architecture and its core components
- ✅ Create and manage Pods, ReplicaSets, and Deployments
- ✅ Configure Services for internal and external communication
- ✅ Master essential kubectl commands

### Core Operations (Week 3-4)
- ✅ Implement ConfigMaps and Secrets for configuration management
- ✅ Set up persistent storage with Volumes and PVCs
- ✅ Organize workloads with Namespaces and Resource Quotas
- ✅ Configure health checks and probes
- ✅ Perform rolling updates and rollbacks

### Advanced & Production (Week 5-6)
- ✅ Configure Ingress for external traffic routing
- ✅ Implement RBAC for security
- ✅ Deploy applications using Helm charts
- ✅ Set up monitoring with Prometheus and Grafana
- ✅ Implement logging solutions
- ✅ Troubleshoot production issues

---

## 📋 Prerequisites

Before you begin, you should have:

| Prerequisite | Details |
|--------------|---------|
| **Basic Linux knowledge** | Command line navigation, file operations, text editing |
| **Understanding of networking** | IP addresses, ports, DNS basics |
| **Familiarity with YAML** | Basic syntax understanding |
| **Docker fundamentals** | Building and running containers (we'll cover a refresher) |
| **A computer** | Windows, macOS, or Linux with at least 8GB RAM |
| **Internet connection** | For downloading tools and pulling container images |
| **Motivation** | Commitment to learning for 45 days! |

---

## 🛠️ Tools Required

You'll need to install the following tools:

### Essential Tools

| Tool | Purpose | Installation Link |
|------|---------|-------------------|
| **Docker Desktop** | Container runtime | [docker.com](https://www.docker.com/products/docker-desktop/) |
| **kubectl** | Kubernetes CLI | [kubernetes.io](https://kubernetes.io/docs/tasks/tools/) |
| **minikube** | Local Kubernetes cluster | [minikube.sigs.k8s.io](https://minikube.sigs.k8s.io/docs/start/) |
| **Helm** | Kubernetes package manager | [helm.sh](https://helm.sh/docs/intro/install/) |
| **VS Code** | Code editor with YAML support | [code.visualstudio.com](https://code.visualstudio.com/) |

### Optional but Recommended

| Tool | Purpose | Installation Link |
|------|---------|-------------------|
| **kind** | Alternative local K8s cluster | [kind.sigs.k8s.io](https://kind.sigs.k8s.io/) |
| **k9s** | Terminal-based K8s dashboard | [k9scli.io](https://k9scli.io/) |
| **lens** | Kubernetes IDE | [k8slens.dev](https://k8slens.dev/) |
| **kubectx/kubens** | Context/namespace switcher | [github.com/ahmetb/kubectx](https://github.com/ahmetb/kubectx) |

---

## 📖 How to Use This Repository

### Step 1: Star and Fork This Repo

Star this repo to show support and fork it to create your own copy.

### Step 2: Clone Your Fork

```bash
git clone git@github.com:YOUR_USERNAME/45-Days-Of-Kubernetes.git
cd 45-Days-Of-Kubernetes
```

### Step 3: Create a Branch for Exercises

```bash
git checkout -b my-solutions
```

### Step 4: Follow the Daily Structure

Each day, navigate to the corresponding folder and:
1. Read the concept explanation
2. Study the YAML examples
3. Practice the kubectl commands
4. Complete the hands-on exercises
5. Verify your work using the validation steps

### Step 5: Track Your Progress

```bash
# After completing each day's exercises
git add .
git commit -m "Day XX complete"
git push origin my-solutions
```

### Step 6: Stay Updated

```bash
# Add upstream remote
git remote add upstream git@github.com:ashwanipydev/45-Days-Of-Kubernetes.git

# Fetch and merge updates
git fetch upstream
git merge upstream/main
```

---

## 📅 Daily Learning Format

Each day follows a consistent structure:

```
📁 Day-XX/
├── 📄 day-XX.md          # Main lesson content
├── 📁 examples/          # YAML manifests and code samples
├── 📁 exercises/         # Hands-on practice tasks
└── 📁 solutions/         # Exercise solutions (try yourself first!)
```

### Lesson Structure

| Section | Description |
|---------|-------------|
| **🎯 Learning Objectives** | What you'll learn today |
| **📚 Core Concepts** | Theory and explanations |
| **⌨️ kubectl Commands** | Essential commands for the topic |
| **📄 YAML Examples** | Real-world manifest examples |
| **🔧 Hands-on Exercises** | Practice tasks to reinforce learning |
| **🌍 Real-world Scenarios** | Industry use cases |
| **✅ Validation Steps** | How to verify your work |
| **📝 Summary** | Key takeaways |
| **➡️ Next Steps** | Preview of tomorrow's content |

---

## 🗺️ Learning Path Overview

### Week 1-2: Foundations (Days 1-14)
> Building a solid understanding of containers and Kubernetes basics

| Week | Focus Areas |
|------|-------------|
| Week 1 | Containers, Docker, K8s Architecture, Pods, kubectl |
| Week 2 | ReplicaSets, Deployments, Services, Labels, Selectors |

### Week 3-4: Core Operations (Days 15-28)
> Mastering day-to-day Kubernetes operations

| Week | Focus Areas |
|------|-------------|
| Week 3 | ConfigMaps, Secrets, Volumes, Persistent Storage |
| Week 4 | Namespaces, Resource Quotas, Health Checks, Updates |

### Week 5-6: Advanced & Production (Days 29-45)
> Production-ready skills and advanced concepts

| Week | Focus Areas |
|------|-------------|
| Week 5 | Ingress, RBAC, Security, Helm |
| Week 6 | Monitoring, Logging, Troubleshooting, Final Project |

---

## 🏗️ Weekly Projects

Each week culminates in a hands-on mini-project to apply what you've learned:

| Week | Project | Description |
|------|---------|-------------|
| **Week 1** | Static Web App | Deploy a static website using NGINX on Kubernetes |
| **Week 2** | Microservices App | Deploy a multi-tier application with frontend, backend, and database |
| **Week 3** | Stateful Application | Deploy a stateful app with persistent storage (e.g., WordPress + MySQL) |
| **Week 4** | Secure Application | Implement RBAC, network policies, and secure secrets management |
| **Week 5** | Helm Deployment | Create and deploy a Helm chart for a complex application |
| **Week 6** | Production Setup | Complete production-ready cluster with monitoring, logging, and alerting |

---

## 📚 Days Overview

### Week 1: Container Fundamentals & Kubernetes Introduction

| Day | Topic | Description |
|-----|-------|-------------|
| [Day 01](./index.html) | Introduction to Containers | Containers vs VMs, Docker basics, container lifecycle |
| [Day 02](./index.html) | Docker Deep Dive | Dockerfile, building images, Docker Compose |
| [Day 03](./index.html) | Kubernetes Overview | What is K8s, why K8s, use cases |
| [Day 04](./index.html) | Kubernetes Architecture | Control plane, nodes, components |
| [Day 05](./index.html) | Setting Up Local Cluster | Minikube, kind, cluster setup |
| [Day 06](./index.html) | kubectl Fundamentals | Basic commands, output formats, context |
| [Day 07](./index.html) | Week 1 Project | Deploy a static web application |

### Week 2: Core Kubernetes Objects

| Day | Topic | Description |
|-----|-------|-------------|
| [Day 08](./index.html) | Pods Deep Dive | Pod lifecycle, multi-container pods, init containers |
| [Day 09](./index.html) | ReplicaSets | Scaling, selectors, desired state |
| [Day 10](./index.html) | Deployments | Declarative updates, strategies |
| [Day 11](./index.html) | Services - ClusterIP | Internal communication, service discovery |
| [Day 12](./index.html) | Services - NodePort & LoadBalancer | External access patterns |
| [Day 13](./index.html) | Labels, Selectors & Annotations | Organizing resources |
| [Day 14](./index.html) | Week 2 Project | Deploy microservices application |

### Week 3: Configuration & Storage

| Day | Topic | Description |
|-----|-------|-------------|
| [Day 15](./index.html) | ConfigMaps | External configuration, environment variables |
| [Day 16](./index.html) | Secrets | Sensitive data management, encryption |
| [Day 17](./index.html) | Volumes | EmptyDir, hostPath, volume types |
| [Day 18](./index.html) | Persistent Volumes | PV, PVC, storage classes |
| [Day 19](./index.html) | StatefulSets | Stateful workloads, ordered deployment |
| [Day 20](./index.html) | Storage Deep Dive | Dynamic provisioning, reclaim policies |
| [Day 21](./index.html) | Week 3 Project | Stateful application with PVC |

### Week 4: Resource Management & Updates

| Day | Topic | Description |
|-----|-------|-------------|
| [Day 22](./index.html) | Namespaces | Multi-tenancy, isolation |
| [Day 23](./index.html) | Resource Quotas & Limits | CPU, memory management |
| [Day 24](./index.html) | LimitRanges | Default limits, constraints |
| [Day 25](./index.html) | Health Checks | Liveness, readiness, startup probes |
| [Day 26](./index.html) | Rolling Updates | Zero-downtime deployments |
| [Day 27](./index.html) | Rollbacks | Version history, undo changes |
| [Day 28](./index.html) | Week 4 Project | Secure app with RBAC |

### Week 5: Networking & Security

| Day | Topic | Description |
|-----|-------|-------------|
| [Day 29](./index.html) | Ingress Concepts | Path-based routing, TLS |
| [Day 30](./index.html) | Ingress Controllers | NGINX, Traefik setup |
| [Day 31](./index.html) | Network Policies | Pod-to-pod traffic control |
| [Day 32](./index.html) | RBAC Fundamentals | Roles, ClusterRoles, bindings |
| [Day 33](./index.html) | ServiceAccounts | Pod identity, token management |
| [Day 34](./index.html) | Security Best Practices | Pod security, container hardening |
| [Day 35](./index.html) | Week 5 Project | Helm-based deployment |

### Week 6: Production Readiness

| Day | Topic | Description |
|-----|-------|-------------|
| [Day 36](./index.html) | Helm Basics | Charts, values, templating |
| [Day 37](./index.html) | Advanced Helm | Dependencies, hooks, testing |
| [Day 38](./index.html) | Monitoring with Prometheus | Metrics collection, PromQL |
| [Day 39](./index.html) | Visualization with Grafana | Dashboards, alerts |
| [Day 40](./index.html) | Logging Concepts | Centralized logging, EFK stack |
| [Day 41](./index.html) | Troubleshooting Pods | Debug techniques, common issues |
| [Day 42](./index.html) | Troubleshooting Networking | Service debugging, DNS issues |
| [Day 43](./index.html) | Troubleshooting Storage | PV/PVC issues, mount problems |
| [Day 44](./index.html) | Production Checklist | Best practices review |
| [Day 45](./index.html) | Final Project & Conclusion | Production-ready K8s setup |

---

## ⚙️ Setup Guide

### Option 1: Minikube (Recommended for Beginners)

```bash
# Install minikube (macOS)
brew install minikube

# Install minikube (Windows with Chocolatey)
choco install minikube

# Start cluster
minikube start --cpus=2 --memory=4096

# Verify installation
kubectl cluster-info
kubectl get nodes
```

### Option 2: Docker Desktop Kubernetes

1. Install Docker Desktop
2. Open Settings > Kubernetes
3. Check "Enable Kubernetes"
4. Click "Apply & Restart"
5. Verify: `kubectl get nodes`

### Option 3: kind (Kubernetes in Docker)

```bash
# Install kind
brew install kind  # macOS
choco install kind # Windows

# Create cluster
kind create cluster --name k8s-learning

# Verify
kubectl cluster-info --context kind-k8s-learning
```

---

## 🤝 Contribution Guidelines

We welcome contributions! Here's how you can help:

### Ways to Contribute

- 🐛 **Report bugs** - Found an error? Open an issue
- 📝 **Fix typos** - Improve documentation clarity
- 💡 **Add examples** - Share real-world scenarios
- 🌐 **Translate** - Help make content accessible globally
- ⭐ **Star & Share** - Help others discover this resource

### Contribution Process

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/improvement`
3. Make your changes
4. Commit: `git commit -m "Add: description of changes"`
5. Push: `git push origin feature/improvement`
6. Open a Pull Request

### Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on the content, not the person
- Help beginners learn

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](./LICENSE) file for details.

<!-- ```
MIT License

Copyright (c) 2024 Ashwani Kumar

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
``` -->

---

<p align="center">
  <strong>🧡🧡🧡 HAPPY LEARNING! 🧡🧡🧡</strong>
</p>

<p align="center">
  <a href="./index.html">Start Learning >></a>
</p>
