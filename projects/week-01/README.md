# Week 01 Project — Sidecar Multi-container Pod

Project Goal
- Build and document a Pod with an application container and a sidecar that processes logs.

Architecture
- Single Pod with two containers sharing an `emptyDir` volume for logs.

Required Manifests
- `pod-sidecar.yaml`
- `service.yaml` (optional)

Expected Outcome
- The sidecar reads/writes from the shared volume and demonstrates local log processing.

Validation Steps
- `kubectl apply -f pod-sidecar.yaml`
- `kubectl logs <pod> -c sidecar`

Deliverable
- This README and manifest files committed under `projects/week-01/`.
