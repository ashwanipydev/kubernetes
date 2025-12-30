# Week 03 Project — Ingress + TLS + cert-manager

Project Goal
- Expose an application via Ingress with TLS managed by cert-manager (or self-signed for local).

Architecture
- App Deployment + Service -> Ingress Controller -> cert-manager issuing TLS

Manifests
- ingress.yaml
- cert-manager resources (Certificate, Issuer) or self-signed secret

Expected Outcome
- App available via HTTPS with a valid certificate (self-signed or issued by cert-manager).

Validation Steps
- `kubectl describe certificate` and `curl -v https://<host>` verify TLS.

Deliverable
- Manifests and README in this folder.
