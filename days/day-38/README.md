# Day 38 — RBAC & Service Accounts

Learning Objectives
- Implement least-privilege access using Roles, ClusterRoles, RoleBindings and ServiceAccounts.

Core Kubernetes Concepts
- Role vs ClusterRole: scope and usage; RoleBinding binds Role to principal.
- ServiceAccount tokens and how pods assume identities.
- `kubectl auth can-i` to verify permissions.

kubectl Commands to Practice
- `kubectl create serviceaccount ci-runner -n demo`
- `kubectl create role read-pods --verb=get,list,watch --resource=pods -n demo`
- `kubectl create rolebinding bind-read --role=read-pods --serviceaccount=demo:ci-runner -n demo`
- `kubectl auth can-i get pods --as=system:serviceaccount:demo:ci-runner -n demo`

Hands-on Labs / Tasks
1. Create namespace `demo` and create a ServiceAccount `ci-runner`.
2. Create a Role that allows reading pods in `demo` and bind it to the ServiceAccount.
3. Attempt a privileged action (e.g., create secret) and confirm denial.
4. Add audit notes showing `kubectl auth can-i` responses.

Daily Deliverable
- Commit `days/day-38/rbac-examples.yaml` and `README.md` with commands and result snippets.

Common Errors & Debugging Tips
- Forgetting namespace scope when creating Role/RoleBinding; check with `kubectl -n <ns> get rolebindings`.
- Over-granting `ClusterRole` instead of `Role` — use narrow scope.

Free Resources
- https://kubernetes.io/docs/reference/access-authn-authz/rbac/
- https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/
