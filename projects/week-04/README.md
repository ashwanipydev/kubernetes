# Week 04 Project — Stateful DB + Backup/Restore

Project Goal
- Deploy a stateful database and implement backup & restore (Velero or snapshot method).

Architecture
- StatefulSet DB with PVCs; backup job or Velero integration to snapshot/restore volumes.

Manifests
- db-statefulset.yaml
- backup-job.yaml or Velero installation manifests

Expected Outcome
- Able to backup DB data and restore to new PVC, verify data integrity.

Validation Steps
- Insert data, perform backup, delete DB pod and PVC if needed, restore and validate data.

Deliverable
- Manifests and runbook in this folder.
