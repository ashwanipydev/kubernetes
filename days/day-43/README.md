# Day 43 — Helm: Charts, Templating & Lifecycle

Learning Objectives
- Package applications with Helm, manage releases, and use templating effectively.

Core Kubernetes Concepts
- Helm separates release configuration from manifests; values.yaml drives customization.
- Hooks and lifecycle: pre-install, post-install, tests.

kubectl / helm Commands to Practice
- `helm create mychart`
- `helm lint ./mychart`
- `helm install -n demo myrelease ./mychart --create-namespace`
- `helm upgrade --install` and `helm rollback`

Hands-on Labs / Tasks
1. Create a Helm chart for a sample web app and parameterize image/tag, replicas, and service type.
2. Lint, template, and install the chart into `demo` namespace.
3. Perform a values-based upgrade and rollback.

Daily Deliverable
- `days/day-43/helm-chart/` containing chart, sample `values.yaml`, and README.

Common Errors & Debugging Tips
- Excessive logic in templates causes maintenance issues; prefer simple templates and values.
- Use `helm template` to render and inspect generated manifests.

Free Resources
- https://helm.sh/docs/
