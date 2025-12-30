Kubernetes 45-Day Progress Tracker

This static tracker provides a 45-day checklist for the Kubernetes learning path. It stores progress in LocalStorage (`k8s45_progress`) and supports dark/light mode.

Preview locally:

```bash
cd progress-tracker
python3 -m http.server 8080
# open http://localhost:8080
```

Files:
- index.html — UI
- styles.css — styles
- tracker.js — logic and persistence

Deploy: publish `progress-tracker/` to GitHub Pages (branch `gh-pages` or via `main` path).
