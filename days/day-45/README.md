# Day 45 — Rolling Updates, Canary & Blue/Green (Final Day)

Learning Objectives
- Implement zero-downtime deployment patterns, traffic shifting, and create a production rollout checklist.

Core Kubernetes Concepts
- RollingUpdate parameters, readiness gates, service cutover strategies for blue/green.
- Canary deployments: gradual traffic shifts and observability during rollout.

kubectl Commands to Practice
- `kubectl rollout status deployment/myapp`
- `kubectl set image deployment/myapp myapp=myrepo/myapp:v2`
- `kubectl rollout undo deployment/myapp`

Hands-on Labs / Tasks
1. Deploy app with proper readiness/liveness probes and perform a rolling update.
2. Implement a manual canary by creating a second deployment `myapp-canary` and shifting traffic via service selectors or Ingress rules.
3. Practice rollback scenarios and document monitoring checks to confirm success.

Daily Deliverable
- `days/day-45/final-playbook.md` — includes step-by-step runbook for production rollout and rollback.

Common Errors & Debugging Tips
- Missing readiness probe causing traffic to unhealthy pods; use metrics/alerts to confirm health before cutover.
- Insufficient observability during canary — ensure logs, metrics and traces are available.

Free Resources
- Kubernetes docs on Deployments and Rolling Updates; articles on progressive delivery (e.g., Weaveworks, CNCF blog).
