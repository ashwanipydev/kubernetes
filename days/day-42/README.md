# Day 42 — Secure Namespace & RBAC (Project Day)

Learning Objectives
- Harden a namespace with RBAC, PodSecurity, NetworkPolicy and image policy.

Project Goal
- Create an isolated namespace `secure-app` where only approved actions and network flows are allowed.

Architecture & Manifests
- Namespace manifest with PodSecurity labels
- Role, RoleBinding, ServiceAccount manifests for CI and app
- NetworkPolicy denying all ingress except from allowed frontends
- ImagePolicy (admission webhook) configuration (documented)

Hands-on Labs / Tasks
1. Create `secure-app` namespace and apply PodSecurity `baseline`.
2. Apply Role and bind to a ServiceAccount limited to reading secrets/configmaps.
3. Apply NetworkPolicy that allows ingress from `frontend` namespace only.
4. Attempt prohibited actions and record observed denials.

Daily Deliverable
- `projects/week-07/` with manifests, README, and validation commands.

Validation Steps
- `kubectl auth can-i create pods -n secure-app --as=system:serviceaccount:secure-app:ci`
- `kubectl exec` attempts that should be denied; `kubectl get events -n secure-app` for denials.

Common Errors & Debugging Tips
- Policies are namespace-scoped; ensure testing resources are in correct ns.
- Check admission webhook logs if imagePolicy denies images.

Free Resources
- https://kubernetes.io/docs/reference/access-authn-authz/rbac/
- https://kubernetes.io/docs/concepts/security/pod-security-standards/
- https://kubernetes.io/docs/concepts/services-networking/network-policies/
