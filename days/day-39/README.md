# Day 39 — Pod Security Standards & Admission Controllers

Learning Objectives
- Enforce Pod Security Standards to prevent privileged / risky pod configurations.

Core Kubernetes Concepts
- Pod Security Admission (PSA) levels: `restricted`, `baseline`, `privileged`.
- Admission controllers: evaluate and mutate/validate API requests before persisting.

kubectl Commands to Practice
- `kubectl label namespace demo pod-security.kubernetes.io/enforce=restricted --overwrite`
- `kubectl apply -f pod-privileged.yaml -n demo` (expect failure under `restricted`)
- `kubectl get events -n demo`

Hands-on Labs / Tasks
1. Create namespace `demo` and label it with PSA enforcement `restricted`.
2. Attempt to apply a manifest that requests `privileged: true` and observe denial.
3. Test deployment of a compliant pod and verify it succeeds.

Daily Deliverable
- `days/day-39/pod-security.md` with manifests and observed errors.

Common Errors & Debugging Tips
- Cluster must support PSA; older clusters might use PodSecurityPolicy (deprecated).
- Check `kubectl get events` and admission webhook logs for failure details.

Free Resources
- https://kubernetes.io/docs/concepts/security/pod-security-standards/
