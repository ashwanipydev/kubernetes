# Week 05 Project — Autoscaling Under Load

Project Goal
- Demonstrate Horizontal Pod Autoscaler (HPA) reacting to load; document behavior.

Architecture
- App Deployment + HPA + optional Cluster Autoscaler (cloud)

Manifests
- deployment.yaml
- hpa.yaml
- load-generator Job manifest

Expected Outcome
- Pods scale up under load and scale down when load subsides.

Validation Steps
- Run load job, observe `kubectl get hpa` and `kubectl top pods`.

Deliverable
- Manifests and load test steps in this folder.
