# Day 04 — Pods & ReplicaSets

## Learning Objectives
- Create Pods and ReplicaSets; observe self-healing behavior.

## Core Kubernetes Concepts
- ReplicaSet ensures desired number of pod replicas are running via selectors.

## kubectl Commands to Practice
- `kubectl get rs`
- `kubectl scale rs/my-rs --replicas=3`

## Hands-on Labs / Tasks
1. Deploy a ReplicaSet for `nginx`.
2. Kill a pod and confirm ReplicaSet recreates it.

## Daily Deliverable
- `days/day-04/replicaset.yaml` and a short demo script.

## Common Errors & Debugging Tips
- Selector mismatch between ReplicaSet and Pod template: ensure labels match.

## Free Learning Resources
- ReplicaSet: https://kubernetes.io/docs/concepts/workloads/controllers/replicaset/
