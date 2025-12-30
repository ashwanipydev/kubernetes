/* Extracted JavaScript from index.html */

// --- Data Source ---
const curriculum = [
    {
        title: "Week 1: Foundations",
        desc: "Architecture & First Workloads",
        days: [
            { id: 1, title: "Architecture & Design", concepts: "Control Plane, Worker Nodes, etcd", lab: "Draw architecture from memory.", deliverable: "architecture_diagram.png" },
            { id: 2, title: "Environment Setup", concepts: "Minikube, Kind, kubectl config", lab: "Install tools & configure shell.", deliverable: "Running cluster screenshot" },
            { id: 3, title: "Pod Fundamentals", concepts: "Lifecycle, YAML syntax, Pause container", lab: "Create Pods imperatively vs declaratively.", deliverable: "nginx-pod.yaml" },
            { id: 4, title: "Multi-Container Pods", concepts: "Sidecar pattern, InitContainers", lab: "Deploy app + log shipper sidecar.", deliverable: "sidecar-pod.yaml" },
            { id: 5, title: "Labels & Selectors", concepts: "Equality vs Set-based selectors", lab: "Tag pods & filter with -l.", deliverable: "pod-selection-cheatsheet.md" },
            { id: 6, title: "Debugging Pods", concepts: "Logs, Exec, Events, CrashLoopBackOff", lab: "Break a pod & fix it.", deliverable: "debugging-log.md" },
            { id: 7, title: "Project: Static Site", concepts: "End-to-end deployment", lab: "Host custom HTML on Nginx.", deliverable: "/projects/week-01" }
        ]
    },
    {
        title: "Week 2: Controllers",
        desc: "Deployments & Self-Healing",
        days: [
            { id: 8, title: "ReplicaSets", concepts: "Reconciliation loop, Desired state", lab: "Delete pod manually, watch resurrection.", deliverable: "replicaset.yaml" },
            { id: 9, title: "Deployments I", concepts: "Recreate vs RollingUpdate", lab: "Deploy Nginx, Scale Up/Down.", deliverable: "deployment.yaml" },
            { id: 10, title: "Deployments II", concepts: "Rollbacks, Revision History", lab: "Update image, then undo rollout.", deliverable: "rollout-commands.md" },
            { id: 11, title: "Namespaces & Quotas", concepts: "ResourceQuotas, LimitRanges", lab: "Create dev/prod NS with limits.", deliverable: "namespace-quota.yaml" },
            { id: 12, title: "Jobs & CronJobs", concepts: "Run-to-completion, Parallelism", lab: "Calc Pi (Job) & Curl (Cron).", deliverable: "backup-cronjob.yaml" },
            { id: 13, title: "DaemonSets", concepts: "Node agents, Node selection", lab: "Deploy dummy log-collector.", deliverable: "daemonset.yaml" },
            { id: 14, title: "Project: Multi-Tier App", concepts: "Frontend + Backend", lab: "Flask + Redis self-healing app.", deliverable: "/projects/week-02" }
        ]
    },
    {
        title: "Week 3: Networking",
        desc: "Services & Ingress",
        days: [
            { id: 15, title: "Services (ClusterIP)", concepts: "Internal traffic, DNS discovery", lab: "Connect 2 pods via Service.", deliverable: "clusterip-test.md" },
            { id: 16, title: "Services (NodePort)", concepts: "External access patterns", lab: "Expose app via NodePort.", deliverable: "nodeport-service.yaml" },
            { id: 17, title: "DNS in K8s", concepts: "CoreDNS, FQDN structure", lab: "Debug with dnsutils/nslookup.", deliverable: "dns-debugging.md" },
            { id: 18, title: "Ingress Basics", concepts: "L7 Routing, Host/Path rules", lab: "Route foo.com vs bar.com.", deliverable: "simple-ingress.yaml" },
            { id: 19, title: "Ingress Controllers", concepts: "Nginx Architecture", lab: "Install Controller, make Ingress work.", deliverable: "ingress-controller-setup.md" },
            { id: 20, title: "Network Policies", concepts: "Deny-All, Allow-Specific", lab: "Lock down namespace traffic.", deliverable: "deny-all-policy.yaml" },
            { id: 21, title: "Project: Secure Ingress", concepts: "TLS Termination", lab: "Expose app with self-signed cert.", deliverable: "/projects/week-03" }
        ]
    },
    {
        title: "Week 4: Storage",
        desc: "ConfigMaps, Secrets & PVs",
        days: [
            { id: 22, title: "ConfigMaps", concepts: "Env vars, Mounted volumes", lab: "Inject nginx.conf via CM.", deliverable: "nginx-configmap.yaml" },
            { id: 23, title: "Secrets", concepts: "Base64, Best Practices", lab: "Mount & Decode secret in Pod.", deliverable: "db-secret.yaml" },
            { id: 24, title: "Volumes (Ephemeral)", concepts: "emptyDir, hostPath", lab: "Share data between containers.", deliverable: "shared-volume.yaml" },
            { id: 25, title: "PV & PVC", concepts: "Static Provisioning, Access Modes", lab: "Manually bind PV to PVC.", deliverable: "pv-pvc-static.yaml" },
            { id: 26, title: "StorageClasses", concepts: "Dynamic Provisioning", lab: "Create PVC without PV.", deliverable: "storage-class-test.md" },
            { id: 27, title: "StatefulSets", concepts: "Stable ID, Ordered Deployment", lab: "Deploy Postgres StatefulSet.", deliverable: "statefulset-db.yaml" },
            { id: 28, title: "Project: DB Cluster", concepts: "Persistence logic", lab: "Redis with persistence.", deliverable: "/projects/week-04" }
        ]
    },
    {
        title: "Week 5: Scheduling",
        desc: "Resources, Security & RBAC",
        days: [
            { id: 29, title: "Requests & Limits", concepts: "QoS Classes, OOMKilled", lab: "Deploy OOM pod intentionally.", deliverable: "oom-pod.yaml" },
            { id: 30, title: "Probes", concepts: "Liveness, Readiness, Startup", lab: "Config probe to fail & restart.", deliverable: "probes-demo.yaml" },
            { id: 31, title: "Affinity", concepts: "Taints, Tolerations, NodeSelector", lab: "Taint node, tolerate pod.", deliverable: "taints-tolerations.yaml" },
            { id: 32, title: "Service Accounts", concepts: "Pod Identity", lab: "Create SA, inspect token.", deliverable: "custom-sa.yaml" },
            { id: 33, title: "RBAC Basics", concepts: "Roles, Bindings", lab: "Create 'Pod-Reader' role.", deliverable: "rbac-reader.yaml" },
            { id: 34, title: "RBAC Advanced", concepts: "ClusterRoles, Aggregation", lab: "Grant secret reading perm.", deliverable: "app-admin-rbac.yaml" },
            { id: 35, title: "Project: RBAC Lockdown", concepts: "Multi-tenant security", lab: "Secure team-a vs team-b.", deliverable: "/projects/week-05" }
        ]
    },
    {
        title: "Week 6: Production",
        desc: "Helm, Metrics & Logging",
        days: [
            { id: 36, title: "HPA (Autoscaling)", concepts: "Metrics Server, CPU targets", lab: "Load test busybox loop.", deliverable: "hpa-stress-test.md" },
            { id: 37, title: "Helm Intro", concepts: "Charts, Values", lab: "Install Redis via Helm.", deliverable: "helm-install-log.md" },
            { id: 38, title: "Helm Creation", concepts: "Templates, _helpers.tpl", lab: "Create generic webapp chart.", deliverable: "/my-first-chart/" },
            { id: 39, title: "Kustomize", concepts: "Overlays, Base", lab: "Refactor YAML for Dev/Prod.", deliverable: "kustomization.yaml" },
            { id: 40, title: "Monitoring", concepts: "Prometheus, Grafana", lab: "Install Stack, view dash.", deliverable: "grafana-screenshot.png" },
            { id: 41, title: "Logging", concepts: "EFK Stack, Node logging", lab: "Deploy fluentd/promtail.", deliverable: "logging-architecture.md" },
            { id: 42, title: "Project: Helm Deploy", concepts: "Packaging", lab: "Package Week 4 app.", deliverable: "/projects/week-06" }
        ]
    },
    {
        title: "Week 7: Capstone",
        desc: "Troubleshooting & Final",
        days: [
            { id: 43, title: "Troubleshooting", concepts: "Network, PVC, CRL errors", lab: "Simulate CoreDNS outage.", deliverable: "outage-report.md" },
            { id: 44, title: "GitOps", concepts: "ArgoCD, Flux", lab: "Sync repo to cluster.", deliverable: "argocd-app.yaml" },
            { id: 45, title: "FINAL CAPSTONE", concepts: "Full Prod Cluster", lab: "Microservices, TLS, HPA, GitOps.", deliverable: "/projects/capstone" }
        ]
    }
];

const projects = [
    { week: 1, title: "Static Site", goal: "Host custom HTML page", stack: "Docker, Nginx, Pod", icon: "🌐" },
    { week: 2, title: "Multi-Tier App", goal: "Flask Frontend + Redis Backend", stack: "Deployments, Svc, Liveness Probes", icon: "🔗" },
    { week: 3, title: "Secure Ingress", goal: "HTTPS Domain Access", stack: "Ingress Controller, TLS Secret", icon: "🔒" },
    { week: 4, title: "Persistent DB", goal: "Stateful Redis Cluster", stack: "StatefulSet, PVC, StorageClass", icon: "💾" },
    { week: 5, title: "RBAC Lockdown", goal: "Multi-tenant Isolation", stack: "Namespaces, Roles, RoleBindings", icon: "🛡️" },
    { week: 6, title: "Helm Chart", goal: "Reusable Package", stack: "Helm Templates, Values.yaml", icon: "📦" },
    { week: 7, title: "Production Capstone", goal: "Full Microservices Ops", stack: "GitOps, ArgoCD, Prometheus, HPA", icon: "🎓" }
];

const interviewQuestions = [
    { q: "Difference between Deployment and StatefulSet?", a: "Deployments treat pods as stateless cattle (random names). StatefulSets provide stable network IDs (web-0, web-1), ordered deployment, and stable storage per replica." },
    { q: "How does Service Discovery work?", a: "CoreDNS resolves Service names to ClusterIPs. Kube-proxy (via iptables/IPVS) routes traffic from ClusterIP to healthy Pod IPs." },
    { q: "Debug a CrashLoopBackOff pod?", a: "1. `kubectl describe pod` for events. 2. `kubectl logs` for app errors. 3. `kubectl logs --previous` if it died instantly." },
    { q: "Ingress vs LoadBalancer vs NodePort?", a: "NodePort: Opens port on every worker node. LoadBalancer: Provisions cloud LB (AWS ELB). Ingress: Smart HTTP/S routing (L7) via a single entry point." },
    { q: "Handling Secrets in Production?", a: "Never use plain env vars. Use K8s Secrets (mounted as volumes or env). ideally, use External Secrets Operator to fetch from Vault/AWS Secrets Manager." }
];

// --- Global Chart Instances ---
let topicChartInstance = null;
let intensityChartInstance = null;

// --- Core Functions ---

function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// --- Theme Logic ---
function toggleTheme() {
    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.theme = 'light';
    } else {
        document.documentElement.classList.add('dark');
        localStorage.theme = 'dark';
    }
    renderCharts(); // Re-render to fix colors
}

// --- Render Charts (Dynamic Colors) ---
function renderCharts() {
    const isDark = document.documentElement.classList.contains('dark');
    const textColor = isDark ? '#94a3b8' : '#64748b';
    const gridColor = isDark ? '#334155' : '#e2e8f0';

    // Destroy old instances
    if(topicChartInstance) topicChartInstance.destroy();
    if(intensityChartInstance) intensityChartInstance.destroy();

    // Topic Distribution
    const ctxTopic = document.getElementById('topicChart').getContext('2d');
    topicChartInstance = new Chart(ctxTopic, {
        type: 'doughnut',
        data: {
            labels: ['Architecture', 'Workloads', 'Networking', 'Storage', 'Security', 'Ops/Helm', 'Troubleshooting'],
            datasets: [{
                data: [10, 20, 15, 15, 15, 15, 10],
                backgroundColor: [
                    '#94a3b8', // Arch
                    '#3b82f6', // Workloads (Blue)
                    '#8b5cf6', // Networking (Purple)
                    '#f59e0b', // Storage (Amber)
                    '#ef4444', // Security (Red)
                    '#10b981', // Ops (Green)
                    '#64748b'  // Trouble
                ],
                borderWidth: isDark ? 0 : 2,
                borderColor: isDark ? 'transparent' : '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { 
                    position: 'right',
                    labels: { color: textColor }
                }
            }
        }
    });

    // Intensity Curve
    const ctxIntense = document.getElementById('intensityChart').getContext('2d');
    intensityChartInstance = new Chart(ctxIntense, {
        type: 'line',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7'],
            datasets: [{
                label: 'Learning Intensity',
                data: [30, 45, 80, 60, 75, 70, 95], 
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                fill: true,
                tension: 0.4,
                pointBackgroundColor: isDark ? '#3b82f6' : '#ffffff',
                pointBorderColor: '#3b82f6'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { 
                    beginAtZero: true, 
                    max: 100, 
                    title: { display: true, text: 'Cognitive Load (%)', color: textColor },
                    grid: { color: gridColor },
                    ticks: { color: textColor }
                },
                x: {
                    grid: { color: gridColor },
                    ticks: { color: textColor }
                }
            },
            plugins: {
                legend: { labels: { color: textColor } }
            }
        }
    });
}

// --- Render Syllabus ---
function renderSyllabus() {
    const container = document.getElementById('week-selector');
    
    curriculum.forEach((week, index) => {
        const weekEl = document.createElement('div');
        weekEl.className = "mb-4";
        
        // Week Header
        const header = document.createElement('div');
        header.className = "bg-white dark:bg-slate-800 p-3 rounded-lg border border-stone-200 dark:border-slate-700 shadow-sm mb-2 font-bold text-slate-800 dark:text-slate-200 flex justify-between items-center cursor-default transition-colors";
        header.innerHTML = `<span>${week.title}</span> <span class="text-xs text-slate-400 dark:text-slate-500 font-normal">${week.desc}</span>`;
        weekEl.appendChild(header);

        // Days List
        const daysList = document.createElement('div');
        daysList.className = "pl-2 space-y-1";
        
        week.days.forEach(day => {
            const btn = document.createElement('button');
            btn.className = "w-full text-left px-3 py-2 text-sm rounded-md text-slate-600 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-700 dark:hover:text-blue-300 transition flex items-center";
            btn.innerHTML = `<span class="w-6 text-xs text-slate-400 dark:text-slate-600 font-mono">D${day.id}</span> ${day.title}`;
            
            btn.onclick = () => loadDayDetail(day, week.title);
            daysList.appendChild(btn);
        });

        weekEl.appendChild(daysList);
        container.appendChild(weekEl);
    });
}

function loadDayDetail(day, weekTitle) {
    // UI Toggle
    document.getElementById('day-content-placeholder').classList.add('hidden-content');
    document.getElementById('day-content-active').classList.remove('hidden-content');

    // Populate Content
    document.getElementById('detail-day-number').textContent = `Day ${day.id} • ${weekTitle}`;
    document.getElementById('detail-title').textContent = day.title;
    document.getElementById('detail-lab').textContent = day.lab;
    document.getElementById('detail-deliverable').textContent = day.deliverable;
    document.getElementById('detail-key-concepts').textContent = day.concepts;

    // List-ify concepts for the bullet points
    const conceptsList = day.concepts.split(',').map(c => `<li>${c.trim()}</li>`).join('');
    document.getElementById('detail-concepts').innerHTML = conceptsList;

    // Dynamic Icon
    let icon = '📘';
    if(weekTitle.includes('Foundations')) icon = '🏗️';
    else if(weekTitle.includes('Controllers')) icon = '🎮';
    else if(weekTitle.includes('Networking')) icon = '🌐';
    else if(weekTitle.includes('Storage')) icon = '💾';
    else if(weekTitle.includes('Security')) icon = '🛡️';
    else if(weekTitle.includes('Production')) icon = '🏭';
    else if(weekTitle.includes('Capstone')) icon = '🎓';
    
    document.getElementById('detail-icon').textContent = icon;
}

// --- Render Projects ---
function renderProjects() {
    const grid = document.getElementById('projects-grid');
    projects.forEach(p => {
        const card = document.createElement('div');
        card.className = "bg-white dark:bg-slate-850 p-6 rounded-xl border border-stone-200 dark:border-slate-700 shadow-sm interactive-card relative overflow-hidden transition-colors";
        card.innerHTML = `
            <div class="absolute top-0 right-0 p-4 opacity-10 text-6xl select-none">${p.icon}</div>
            <div class="relative z-10">
                <div class="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase mb-2">Week ${p.week}</div>
                <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">${p.title}</h3>
                <p class="text-sm text-slate-600 dark:text-slate-400 mb-4 h-10">${p.goal}</p>
                <div class="bg-stone-100 dark:bg-slate-800 p-3 rounded text-xs font-mono text-slate-700 dark:text-slate-300">
                    <strong>Stack:</strong> ${p.stack}
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// --- Render Interview Cards ---
function renderInterview() {
    const container = document.getElementById('interview-cards');
    interviewQuestions.forEach((q, idx) => {
        const card = document.createElement('div');
        card.className = "bg-white dark:bg-slate-850 border border-stone-200 dark:border-slate-700 rounded-lg p-5 cursor-pointer hover:border-blue-300 dark:hover:border-blue-500 transition group";
        card.onclick = () => {
            const ans = card.querySelector('.answer');
            ans.classList.toggle('hidden-content');
        };
        card.innerHTML = `
            <div class="flex justify-between items-center">
                <h4 class="font-bold text-slate-800 dark:text-slate-200">Q${idx+1}: ${q.q}</h4>
                <span class="text-xs text-blue-500 dark:text-blue-400 font-semibold group-hover:underline">Reveal Answer</span>
            </div>
            <div class="answer hidden-content mt-4 pt-4 border-t border-stone-100 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                ${q.a}
            </div>
        `;
        container.appendChild(card);
    });
}

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    renderCharts();
    renderSyllabus();
    renderProjects();
    renderInterview();
});
