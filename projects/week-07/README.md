# Week 07 Project — Secure Namespace & Policies

Project Goal
- Harden an application namespace using RBAC, PodSecurity, NetworkPolicy, and image policy controls.

Architecture
- secure-app namespace with restricted policies and limited service accounts.

Manifests
- Namespace with PodSecurity labels
- Role/RoleBinding for CI and app
- NetworkPolicy restricting ingress/egress
- Image policy config (documented)

Expected Outcome
- Unauthorized actions are denied; only approved network flows and identities are permitted.

Validation Steps
- Run validation commands and document denied operations.

Deliverable
- Manifests and README with validation steps.
