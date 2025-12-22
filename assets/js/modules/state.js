export const learningPath = [
    { day: 1, title: "Container Fundamentals", description: "Docker, Runtimes, and why K8s?", icon: "fa-box" },
    { day: 2, title: "Architecture & Control Plane", description: "Master Node, Worker Nodes, etcd", icon: "fa-sitemap" },
    { day: 3, title: "Pods & Multi-Container Pods", description: "Sidecars, Init Containers, and Lifecycle", icon: "fa-cubes" },
    { day: 4, title: "ReplicaSets & Deployments", description: "Scaling, Rolling Updates, and Rollbacks", icon: "fa-layer-group" },
    { day: 5, title: "Services & Networking", description: "ClusterIP, NodePort, and LoadBalancer", icon: "fa-network-wired" },
    { day: 6, title: "Namespaces & Resource Quotas", description: "Organizing clusters and limiting usage", icon: "fa-tags" },
    { day: 7, title: "ConfigMaps & Secrets", description: "Decoupling configuration and sensitive data", icon: "fa-user-shield" },
    { day: 8, title: "Volumes & Persistence (PV/PVC)", description: "Storage classes and data persistence", icon: "fa-database" },
    { day: 9, title: "Ingress Controllers", description: "L7 Load Balancing and Path-based routing", icon: "fa-route" },
    { day: 10, title: "Probes & Health Checks", description: "Liveness, Readiness, and Startup probes", icon: "fa-heartbeat" },
    { day: 11, title: "Jobs & CronJobs", description: "Running batch processes and schedules", icon: "fa-clock" },
    { day: 12, title: "DaemonSets", description: "Running pods on every node (Logging/Monitoring)", icon: "fa-microchip" },
    { day: 13, title: "StatefulSets", description: "Managing stateful applications and identity", icon: "fa-server" },
    { day: 14, title: "Taints & Tolerations", description: "Node affinity and scheduling constraints", icon: "fa-magnet" },
    { day: 15, title: "Node Affinity & Selectors", description: "Advanced pod placement logic", icon: "fa-location-arrow" },
    { day: 16, title: "Resource Limits & Requests", description: "Quality of Service (QoS) and Scheduling", icon: "fa-tachometer-alt" },
    { day: 17, title: "Multi-cluster & Contexts", description: "Kubeconfig, contexts, and kubectx", icon: "fa-project-diagram" },
    { day: 18, title: "RBAC (Role Based Access Control)", description: "Roles, ClusterRoles, and Bindings", icon: "fa-key" },
    { day: 19, title: "Network Policies", description: "Securing pod-to-pod communication", icon: "fa-shield-alt" },
    { day: 20, title: "Pod Security Standards", description: "Enforcing security best practices", icon: "fa-user-lock" },
    { day: 21, title: "Helm Package Manager", description: "Charts, Templates, and Releases", icon: "fa-anchor" },
    { day: 22, title: "Monitoring with Prometheus", description: "Metrics, Dashboards, and Alertmanager", icon: "fa-chart-line" },
    { day: 23, title: "Logging with ELK/EFK", description: "Centralized logging and troubleshooting", icon: "fa-list-alt" },
    { day: 24, title: "Kustomize", description: "Template-free customization of manifests", icon: "fa-magic" },
    { day: 25, title: "CI/CD for Kubernetes", description: "GitOps, ArgoCD, and Flux", icon: "fa-sync" },
    { day: 26, title: "Service Mesh (Istio/Linkerd)", description: "Traffic management and observability", icon: "fa-spider" },
    { day: 27, title: "Autoscaling (HPA/VPA/CA)", description: "Horizontal and Vertical scaling", icon: "fa-expand-arrows-alt" },
    { day: 28, title: "Custom Resource Definitions (CRDs)", description: "Extending the K8s API", icon: "fa-puzzle-piece" },
    { day: 29, title: "Operator Pattern", description: "Automating operational tasks with code", icon: "fa-robot" },
    { day: 30, title: "CKA/CKAD Exam Prep", description: "Final review and certification tips", icon: "fa-graduation-cap" }
];

export let state = {
    completedDays: new Set(),
    completedConcepts: new Set(),
    userProfile: { level: 'beginner', style: 'practical' }
};

export function loadSavedState() {
    const savedDays = localStorage.getItem('k8sCompletedDays');
    if (savedDays) state.completedDays = new Set(JSON.parse(savedDays));
    
    const savedConcepts = localStorage.getItem('k8sCompletedConcepts');
    if (savedConcepts) state.completedConcepts = new Set(JSON.parse(savedConcepts));
    
    const savedProfile = localStorage.getItem('k8sUserProfile');
    if (savedProfile) state.userProfile = JSON.parse(savedProfile);
}

export function saveState() {
    localStorage.setItem('k8sCompletedDays', JSON.stringify([...state.completedDays]));
    localStorage.setItem('k8sCompletedConcepts', JSON.stringify([...state.completedConcepts]));
    localStorage.setItem('k8sUserProfile', JSON.stringify(state.userProfile));
}

export function toggleComplete(dayId) {
    if (state.completedDays.has(dayId)) {
        state.completedDays.delete(dayId);
    } else {
        state.completedDays.add(dayId);
    }
    saveState();
}

export function toggleConceptComplete(conceptId) {
    if (state.completedConcepts.has(conceptId)) {
        state.completedConcepts.delete(conceptId);
    } else {
        state.completedConcepts.add(conceptId);
    }
    saveState();
}

export function updateUserProfile(updates) {
    state.userProfile = { ...state.userProfile, ...updates };
    saveState();
}