# Day 02 — Kubernetes Architecture & Control Plane

## Learning Objectives
- Understand Control Plane components and node roles

## Core Kubernetes Concepts
- `kube-apiserver`: central API that persists objects to `etcd`.
- `etcd`: distributed key-value store for cluster state.
- `kube-scheduler`, `controller-manager`, `kubelet`, `kube-proxy`.

## kubectl Commands to Practice
- `kubectl get pods -n kube-system`
- `kubectl describe node <node>`

## Hands-on Labs / Tasks
1. Inspect `kube-system` pods and describe the control plane components.
2. View logs for API server (in `kind`, use `docker` ps or `kubectl logs -n kube-system`).

## Daily Deliverable
- `days/day-02/README.md` with notes and commands used.

## Common Errors & Debugging Tips
- CrashLoopBackOff in control plane pods: check `kubectl describe pod` and node resources.

## Free Learning Resources
- Kubernetes architecture: https://kubernetes.io/docs/concepts/overview/components/
