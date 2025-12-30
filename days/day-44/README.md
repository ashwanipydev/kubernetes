# Day 44 — Kustomize & GitOps Concepts

Learning Objectives
- Use Kustomize overlays for environment configuration and understand GitOps workflows.

Core Kubernetes Concepts
- Declarative overlays, resource transformations, and the GitOps reconciliation model.

kubectl Commands to Practice
- `kubectl apply -k overlays/dev`
- `kubectl kustomize overlays/prod | kubectl apply -f -`

Hands-on Labs / Tasks
1. Create a base manifest for an app and two overlays (`dev`, `prod`) using Kustomize.
2. Demonstrate applying overlays locally and switching configurations.
3. Document how Flux/ArgoCD would reconcile from a Git repo (manual simulation).

Daily Deliverable
- `days/day-44/kustomize/` with base and overlay directories and README.

Common Errors & Debugging Tips
- Patching the wrong resource path; use `kustomize build` to validate output.

Free Resources
- https://kustomize.io/
- https://argo-cd.readthedocs.io/ and https://fluxcd.io/
