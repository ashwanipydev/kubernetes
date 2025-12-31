# Day 05 — Deployments & Rollouts

## Learning Objectives
- Use Deployments for declarative updates, rollouts and rollbacks.

## Core Kubernetes Concepts
- Deployment controller manages ReplicaSets and rollout history; supports `RollingUpdate`.

## kubectl Commands to Practice
- `kubectl rollout status deployment/my-deploy`
- `kubectl rollout undo deployment/my-deploy`

## Hands-on Labs / Tasks
1. Create a Deployment with `nginx` and a tag.
2. Update the image with `kubectl set image` and test rollback.

## Daily Deliverable
- `days/day-05/deployment.yaml` and a rollout log.

## Common Errors & Debugging Tips
- `ImagePullBackOff`: check image name and registry credentials.

## Free Learning Resources
- Deployments: https://kubernetes.io/docs/concepts/workloads/controllers/deployment/
