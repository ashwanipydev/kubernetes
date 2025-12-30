# Week 02 Project — Three-Tier App with Stateful DB

Project Goal
- Deploy a frontend, backend, and a stateful database with persistent storage.

Architecture
- Frontend Deployment (Service) -> Backend Deployment (Service) -> StatefulSet (DB) with PVCs

Manifests
- frontend-deployment.yaml
- backend-deployment.yaml
- db-statefulset.yaml
- services and configmaps/secrets

Expected Outcome
- Full stack reachable; data persists after DB pod restarts.

Validation Steps
- Insert data through backend, delete DB pod, verify data remains.

Deliverable
- Manifests and runbook in this folder.
