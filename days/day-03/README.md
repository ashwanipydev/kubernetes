# Day 03 — kubectl & YAML Fundamentals

## Learning Objectives
- Learn manifest structure and apply objects with `kubectl`.

## Core Kubernetes Concepts
- Manifest fields: `apiVersion`, `kind`, `metadata`, `spec`.
- Declarative (`kubectl apply`) vs imperative (`kubectl run`).

## kubectl Commands to Practice
- `kubectl apply -f pod.yaml`
- `kubectl apply --dry-run=client -f pod.yaml`
- `kubectl diff -f pod.yaml`

## Hands-on Labs / Tasks
1. Create a `pod.yaml` with `nginx` and apply it.
2. Edit the manifest and use `kubectl apply` to update.

## Daily Deliverable
- `days/day-03/pod.yaml` and notes in this README.

## Common Errors & Debugging Tips
- YAML indentation errors: use `kubectl apply --dry-run` and `kubeval`.

## Free Learning Resources
- Kubernetes API conventions: https://kubernetes.io/docs/reference/using-api/
