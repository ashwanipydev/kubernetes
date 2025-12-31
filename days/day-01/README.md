# Day 01 — Kubernetes & Container Fundamentals

## Learning Objectives
- Understand containers vs pods
- Install tooling: `kubectl`, `kind`/`minikube`

## Core Kubernetes Concepts
- Container vs Pod: a Pod is the smallest deployable unit, may contain one or more containers.
- Images & OCI: reproducible artifacts used to instantiate containers.

## kubectl Commands to Practice
- `kubectl version`
- `kubectl cluster-info`
- `kubectl get nodes`

## Hands-on Labs / Tasks
1. Install `kind` or `minikube`.
2. Create a single-node cluster: `kind create cluster`.
3. Run `kubectl get all --all-namespaces` and inspect `kube-system`.

## Daily Deliverable
- `days/day-01/README.md` (this file) with short setup notes and a screenshot of `kubectl get nodes`.

## Common Errors & Debugging Tips
- kubeconfig not found: ensure `KUBECONFIG` or `~/.kube/config` exists and points to the cluster.

## Free Learning Resources
- Kubernetes: https://kubernetes.io/docs/
- Kind quickstart: https://kind.sigs.k8s.io/
- Minikube: https://minikube.sigs.k8s.io/
