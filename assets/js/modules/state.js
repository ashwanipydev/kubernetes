/**
 * State Management Module
 * Handles the learning path data and persistent user state
 */

export const learningPath = [
    { 
        day: 1, 
        title: "Container Fundamentals", 
        description: "Docker, Runtimes, and why K8s?", 
        icon: "fa-box",
        concepts: ["OCI Runtime", "Container Isolation", "Image Layers", "Container vs VM"]
    },
    { 
        day: 2, 
        title: "Architecture & Control Plane", 
        description: "Master Node, Worker Nodes, etcd", 
        icon: "fa-sitemap",
        concepts: ["Kube-API Server", "etcd Store", "Kube-Scheduler", "Controller Manager"]
    },
    { 
        day: 3, 
        title: "Pods & Multi-Container Pods", 
        description: "Sidecars, Init Containers, and Lifecycle", 
        icon: "fa-cubes",
        concepts: ["Pod Lifecycle", "Init Containers", "Sidecar Pattern", "Static Pods"]
    },
    { 
        day: 4, 
        title: "ReplicaSets & Deployments", 
        description: "Scaling, Rolling Updates, and Rollbacks", 
        icon: "fa-layer-group",
        concepts: ["Replication Controller", "Rolling Update", "Revision History", "Desired State"]
    },
    { 
        day: 5, 
        title: "Services & Networking", 
        description: "ClusterIP, NodePort, and LoadBalancer", 
        icon: "fa-network-wired",
        concepts: ["Kube-Proxy", "Endpoints", "CoreDNS", "Service Discovery"]
    },
    { 
        day: 6, 
        title: "Namespaces & Resource Quotas", 
        description: "Organizing clusters and limiting usage", 
        icon: "fa-tags", 
        concepts: ["Namespace Scoping", "Resource Quotas", "Limit Ranges"] 
    },
    { day: 7, title: "ConfigMaps & Secrets", description: "Decoupling configuration and sensitive data", icon: "fa-user-shield", concepts: ["Environment Variables", "Volume Mounts", "Base64 Encoding"] },
    { day: 8, title: "Volumes & Persistence (PV/PVC)", description: "Storage classes and data persistence", icon: "fa-database", concepts: ["StorageClass", "Access Modes", "Reclaim Policy"] },
    { day: 9, title: "Ingress Controllers", description: "L7 Load Balancing and Path-based routing", icon: "fa-route", concepts: ["Ingress Rules", "TLS Termination", "Annotation Logic"] },
    { day: 10, title: "Probes & Health Checks", description: "Liveness, Readiness, and Startup probes", icon: "fa-heartbeat", concepts: ["TCP vs HTTP Probes", "Grace Periods", "Failure Thresholds"] },
    { day: 11, title: "Jobs & CronJobs", description: "Running batch processes and schedules", icon: "fa-clock", concepts: ["Parallelism", "Completion Policies", "Schedule Syntax"] },
    { day: 12, title: "DaemonSets", description: "Running pods on every node (Logging/Monitoring)", icon: "fa-microchip", concepts: ["Node Selectors", "Tolerations", "Update Strategy"] },
    { day: 13, title: "StatefulSets", description: "Managing stateful applications and identity", icon: "fa-server", concepts: ["Stable Network ID", "Ordinal Index", "Headless Services"] },
    { day: 14, title: "Taints & Tolerations", description: "Node affinity and scheduling constraints", icon: "fa-magnet", concepts: ["NoSchedule", "NoExecute", "Taint Effects"] },
    { day: 15, title: "Node Affinity & Selectors", description: "Advanced pod placement logic", icon: "fa-location-arrow", concepts: ["Required vs Preferred", "Operator Logic", "Anti-Affinity"] },
    { day: 16, title: "Resource Limits & Requests", description: "Quality of Service (QoS) and Scheduling", icon: "fa-tachometer-alt", concepts: ["CPU/Memory Units", "OOM Killer", "Burstable vs Guaranteed"] },
    { day: 17, title: "Multi-cluster & Contexts", description: "Kubeconfig, contexts, and kubectx", icon: "fa-project-diagram", concepts: ["Kubeconfig Structure", "Merge Logic", "Context Switching"] },
    { day: 18, title: "RBAC (Role Based Access Control)", description: "Roles, ClusterRoles, and Bindings", icon: "fa-key", concepts: ["Verbs & Resources", "Subjects", "Aggregation Rules"] },
    { day: 19, title: "Network Policies", description: "Securing pod-to-pod communication", icon: "fa-shield-alt", concepts: ["Ingress/Egress Rules", "CIDR Blocks", "Default Deny"] },
    { day: 20, title: "Pod Security Standards", description: "Enforcing security best practices", icon: "fa-user-lock", concepts: ["Privileged vs Baseline", "Admission Controller", "Audit Mode"] },
    { day: 21, title: "Helm Package Manager", description: "Charts, Templates, and Releases", icon: "fa-anchor", concepts: ["Values.yaml", "Chart Lifecycle", "Rollbacks"] },
    { day: 22, title: "Monitoring with Prometheus", description: "Metrics, Dashboards, and Alertmanager", icon: "fa-chart-line", concepts: ["PromQL", "Service Discovery", "Exporters"] },
    { day: 23, title: "Logging with ELK/EFK", description: "Centralized logging and troubleshooting", icon: "fa-list-alt", concepts: ["Log Rotation", "Aggregation", "Parsing Filters"] },
    { day: 24, title: "Kustomize", description: "Template-free customization of manifests", icon: "fa-magic", concepts: ["Overlays", "Bases", "Patching"] },
    { day: 25, title: "CI/CD for Kubernetes", description: "GitOps, ArgoCD, and Flux", icon: "fa-sync", concepts: ["Reconciliation Loop", "Sync Policy", "Application Sets"] },
    { day: 26, title: "Service Mesh (Istio/Linkerd)", description: "Traffic management and observability", icon: "fa-spider", concepts: ["mTLS", "Virtual Services", "Gateway"] },
    { day: 27, title: "Autoscaling (HPA/VPA/CA)", description: "Horizontal and Vertical scaling", icon: "fa-expand-arrows-alt" , concepts: ["Metrics Server", "Scale Up/Down Velocity", "Cluster Autoscaler"] },
    { day: 28, title: "Custom Resource Definitions (CRDs)", description: "Extending the K8s API", icon: "fa-puzzle-piece", concepts: ["API Versions", "Validation Schemas", "Subresources"] },
    { day: 29, title: "Operator Pattern", description: "Automating operational tasks with code", icon: "fa-robot", concepts: ["Controller Loop", "Watch Events", "Operator SDK"] },
    { day: 30, title: "CKA/CKAD Exam Prep", description: "Final review and certification tips", icon: "fa-graduation-cap", concepts: ["Time Management", "Alias Setup", "Troubleshooting Nodes"] }
];

export let state = {
    completedDays: new Set(),
    completedConcepts: new Set(),
    userProfile: { level: 'beginner', style: 'practical' },
    isAIExplaining: false
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

export function setAILoading(loading) {
    state.isAIExplaining = loading;
}
