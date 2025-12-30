# Day 41 — Secrets Rotation & Workload Identity

Learning Objectives
- Implement automated secret rotation and learn workload identity patterns.

Core Kubernetes Concepts
- Short-lived credentials, external secret stores (Vault, External Secrets Operator), Workload Identity patterns.

kubectl Commands to Practice
- `kubectl apply -f vault-demo.yaml` (if using dev mode)
- `kubectl get secret -n demo`

Hands-on Labs / Tasks
1. Run HashiCorp Vault in dev mode and create a secret. Consume it from a pod using a simple script.
2. Demonstrate rotating the secret and updating consumers automatically or via CI.
3. Document workload identity options for cloud providers (IRSA for AWS, Workload Identity for GCP).

Daily Deliverable
- `days/day-41/secret-rotation.md` with rotation steps and example automation script.

Common Errors & Debugging Tips
- Don't use Vault dev mode for production; secrets must not be committed to Git.
- Ensure RBAC and ServiceAccount permissions are scoped correctly for secret retrieval.

Free Resources
- https://www.vaultproject.io/docs
- https://github.com/external-secrets/external-secrets
