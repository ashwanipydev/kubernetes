# Day 07 — Week 1 Project: Multi-tier Application

## Project Goal
Deploy a simple 3-tier application: frontend (static site), backend API, and a database.

## Architecture
- Frontend: Deployment + Service
- Backend: Deployment + Service
- Database: StatefulSet (or Deployment with PVC) + PVC

## Kubernetes Manifests Required
- `frontend/deployment.yaml`, `frontend/service.yaml`
- `backend/deployment.yaml`, `backend/service.yaml`
- `db/statefulset.yaml` or `db/deployment-pvc.yaml`
- `config/configmap.yaml`

## Expected Outcome
- Services discover each other via DNS. Frontend can call backend; backend persists to DB.

## Validation Steps
- `kubectl get all` shows resources.
- `kubectl port-forward svc/frontend 8080:80` and open `http://localhost:8080`.
- `kubectl logs` confirm connectivity.

## Daily Deliverable
- `projects/week-01/` with manifests + a project report `days/day-07/project-report.md`.

## Common Errors & Debugging Tips
- Check `kubectl describe pod` for events and `kubectl logs` for app errors.

## Free Learning Resources
- Example multi-tier apps: https://github.com/GoogleCloudPlatform/kubernetes-engine-samples
