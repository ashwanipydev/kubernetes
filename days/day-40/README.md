# Day 40 — Image Security & Supply Chain

Learning Objectives
- Scan container images for vulnerabilities, generate SBOMs, and sign images for provenance.

Core Kubernetes Concepts
- Build-time vs runtime security; admission controllers to enforce policies.
- Supply chain tools: `trivy` (scan), `syft` (SBOM), `cosign` (signing).

kubectl Commands to Practice
- (CI/demo) `trivy image myrepo/myapp:latest`
- View admission failures: `kubectl get events -n kube-system`

Hands-on Labs / Tasks
1. Build a demo image locally; run `trivy` to produce a scan report.
2. Generate an SBOM with `syft` and inspect contents.
3. Sign the image with `cosign` and verify signature.
4. (Optional) Demonstrate admission control config that validates signatures (conceptual).

Daily Deliverable
- `days/day-40/image-security.md` with scan output, SBOM samples, and signing steps.

Common Errors & Debugging Tips
- Scanners report many low-severity issues; triage by exploitability and CVSS.
- Ensure local registries are accessible to scanner; authenticate if private.

Free Resources
- https://aquasecurity.github.io/trivy/
- https://github.com/anchore/syft
- https://github.com/sigstore/cosign
