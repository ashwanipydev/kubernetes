(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        // --- DATA STORE ---
        // Sourced directly from the report content
        const roadmapData = {
            phases: [
                {
                    id: "p1",
                    title: "Phase 1: The Foundation",
                    subtitle: "Linux, Bash, Git",
                    days: [
                        { day: 1, title: "The Operating System", objective: "Install and understand Linux environment.", tasks: ["Install Ubuntu (VM/WSL2)", "Configure SSH key-based auth", "Update packages"], deliverable: "SSH access without password", concepts: "Kernel vs Shell, Virtualization, Package Managers" },
                        { day: 2, title: "Filesystem & Permissions", objective: "Navigate and secure files.", tasks: ["Create directory structure", "Create user 'devops' with sudo", "Setup shared group folder"], deliverable: "setup_users.sh script", concepts: "chmod, chown, /etc, /var, /home" },
                        { day: 3, title: "Text Manipulation", objective: "Process logs via CLI.", tasks: ["Download Apache log", "Use awk/sort to find top 10 IPs"], deliverable: "log_analysis.txt one-liner", concepts: "grep, awk, sed, pipes, redirection" },
                        { day: 4, title: "Shell Scripting Basics", objective: "Automate repetitive tasks.", tasks: ["Write script to check/install Nginx"], deliverable: "provision.sh script", concepts: "Shebang, Loops, Conditionals, Exit Codes" },
                        { day: 5, title: "Git Internals", objective: "Version control basics.", tasks: ["Init repo", ".gitignore logs", "Commit & Checkout"], deliverable: "Repo with commit history", concepts: ".git dir, Staging, HEAD, Diff" },
                        { day: 6, title: "Advanced Git", objective: "Team workflows.", tasks: ["Branching (feature/develop)", "Resolve merge conflict"], deliverable: "Screenshot of resolved conflict", concepts: "Merge vs Rebase, PRs, Conflicts" },
                        { day: 7, title: "Weekly Project: Server Health", isProject: true, objective: "Server Health Monitor Script", tasks: ["Script checks Disk/RAM/CPU", "Alert if Disk > 80%", "Setup Cron job"], deliverable: "Repo: server-health-monitor", stack: "Bash, Cron, Git" }
                    ]
                },
                {
                    id: "p2",
                    title: "Phase 2: Networking & Docker",
                    subtitle: "Containerization Fundamentals",
                    days: [
                        { day: 8, title: "Networking 101", objective: "How computers talk.", tasks: ["curl -v to debug", "ping/traceroute", "netstat for ports"], deliverable: "network_audit.md", concepts: "OSI Model, TCP/UDP, DNS, HTTP, Ports" },
                        { day: 9, title: "Intro to Docker", objective: "Solving 'It works on my machine'.", tasks: ["Install Docker", "Run Nginx container", "Port mapping 8080:80"], deliverable: "Screenshot of localhost:8080", concepts: "Daemon, Images, Containers, Registries" },
                        { day: 10, title: "The Dockerfile", objective: "Building custom images.", tasks: ["Create HTML file", "Dockerfile for Nginx serve", "Build & Run"], deliverable: "Custom Dockerfile & Image", concepts: "FROM, RUN, COPY, CMD vs ENTRYPOINT" },
                        { day: 11, title: "App Containerization", objective: "Python/Node apps.", tasks: ["Write Flask/Express app", "Containerize", "Env vars config"], deliverable: "Running API container", concepts: "Env Vars, requirements.txt, Exposing ports" },
                        { day: 12, title: "Storage & Networking", objective: "Persistence.", tasks: ["Postgres container with Volume", "Connect App to DB via Network"], deliverable: "Data persistence proof", concepts: "Bind Mounts, Named Volumes, Bridge Network" },
                        { day: 13, title: "Docker Compose", objective: "Orchestration.", tasks: ["Convert App+DB to docker-compose.yml"], deliverable: "docker-compose.yml", concepts: "Services, Depends_on, Internal DNS" },
                        { day: 14, title: "Weekly Project: Microservices", isProject: true, objective: "Voting App Deployment", tasks: ["Python App + Redis", "Dockerize Python", "Compose Link", "Redis Persistence"], deliverable: "Repo: docker-voting-app", stack: "Docker, Python, Redis" }
                    ]
                },
                {
                    id: "p3",
                    title: "Phase 3: Automation & CI/CD",
                    subtitle: "GitHub Actions",
                    days: [
                        { day: 15, title: "YAML & JSON", objective: "Config languages.", tasks: ["Write YAML data", "Convert to JSON via CLI"], deliverable: "Validated data.yaml/.json", concepts: "Key-value, Lists, Nesting" },
                        { day: 16, title: "Intro to CI/CD", objective: "Pipelines.", tasks: ["Create GitHub Action workflow", "Print Hello World"], deliverable: "Green checkmark on GitHub", concepts: "CI vs CD, Workflows, Steps" },
                        { day: 17, title: "CI: Testing & Linting", objective: "Catch bugs.", tasks: ["Add Lint job to Day 14 project", "Fail on bad style"], deliverable: "Failed run then Success run", concepts: "Linters, Unit Tests, Exit Codes" },
                        { day: 18, title: "CD: Build & Push", objective: "Artifacts.", tasks: ["Build Docker image in CI", "Push to Hub with SHA tag"], deliverable: "Image on Docker Hub", concepts: "Access Tokens, Tagging" },
                        { day: 19, title: "Secrets Management", objective: "Security.", tasks: ["Move password to GitHub Secrets", "Ref in workflow"], deliverable: "Secure Pipeline", concepts: "Secrets, Env Vars" },
                        { day: 20, title: "Advanced Workflows", objective: "Optimization.", tasks: ["Implement Caching", "Matrix builds (Node versions)"], deliverable: "Compare build times", concepts: "Caching, Matrix, Artifacts" },
                        { day: 21, title: "Weekly Project: Release Pipeline", isProject: true, objective: "Full CI/CD Node.js", tasks: ["Lint/Test", "Build Image", "Trivy Scan", "Push on main only"], deliverable: "Repo: ci-cd-demo", stack: "GitHub Actions, Docker, Trivy" }
                    ]
                },
                {
                    id: "p4",
                    title: "Phase 4: Kubernetes",
                    subtitle: "Orchestration",
                    days: [
                        { day: 22, title: "K8s Architecture", objective: "Theory.", tasks: ["Draw architecture diagram"], deliverable: "Diagram sketch", concepts: "Control Plane, Worker Nodes, Kubelet" },
                        { day: 23, title: "Minikube & Kubectl", objective: "Local Cluster.", tasks: ["Install Minikube", "kubectl get nodes", "Run Nginx pod"], deliverable: "Screenshot kubectl get all", concepts: "Imperative vs Declarative, Contexts" },
                        { day: 24, title: "Pods & Manifests", objective: "Atomic Units.", tasks: ["Write pod.yaml", "Apply", "Exec & Logs"], deliverable: "nginx-pod.yaml", concepts: "Pod Lifecycle, YAML" },
                        { day: 25, title: "Deployments", objective: "Scaling.", tasks: ["Deployment 3 replicas", "Kill pod (self-heal)", "Rolling Update"], deliverable: "deployment.yaml", concepts: "ReplicaSets, Rolling Updates" },
                        { day: 26, title: "Services", objective: "Networking.", tasks: ["Expose via NodePort", "Access via Browser"], deliverable: "service.yaml", concepts: "ClusterIP, NodePort, LoadBalancer" },
                        { day: 27, title: "ConfigMaps & Secrets", objective: "Configuration.", tasks: ["App reading DB_URL (CM) and Pass (Secret)"], deliverable: "configmap.yaml, secret.yaml", concepts: "EnvFrom, Base64" },
                        { day: 28, title: "Weekly Project: K8s Migration", isProject: true, objective: "Migrate Voting App to K8s", tasks: ["Redis Deploy/Svc", "Python Deploy/Svc", "Connect via DNS"], deliverable: "Folder: k8s-manifests", stack: "K8s, Python, Redis" },
                        { day: 29, title: "Persistent Storage", objective: "Stateful.", tasks: ["Add PVC to Redis", "Ensure data survives pod delete"], deliverable: "pvc.yaml", concepts: "PV, PVC, StorageClass" },
                        { day: 30, title: "Ingress", objective: "Routing.", tasks: ["Install Nginx Controller", "Path-based routing"], deliverable: "ingress.yaml", concepts: "Ingress Controller, Hosts" },
                        { day: 31, title: "Namespaces & RBAC", objective: "Security.", tasks: ["Create Namespace", "ServiceAccount with view-only"], deliverable: "rbac.yaml", concepts: "Role, RoleBinding" },
                        { day: 32, title: "Resources & Probes", objective: "Stability.", tasks: ["Add CPU/Mem limits", "Liveness Probe"], deliverable: "Updated deployment", concepts: "Requests vs Limits, Probes" },
                        { day: 33, title: "Helm Basics", objective: "Packages.", tasks: ["Install MySQL via Helm", "Override values"], deliverable: "Running Helm Release", concepts: "Charts, Templates, Releases" },
                        { day: 34, title: "Writing Charts", objective: "Templating.", tasks: ["Create Chart for Python App", "Use values.yaml"], deliverable: "Chart structure", concepts: "Templates, Helpers" },
                        { day: 35, title: "Weekly Project: Helm Microservice", isProject: true, objective: "Helm-ify Stack", tasks: ["Master chart", "Parameterize replicas/tags", "Dev/Prod values"], deliverable: "Repo: k8s-helm-demo", stack: "Helm, K8s" }
                    ]
                },
                {
                    id: "p5",
                    title: "Phase 5: IaC (Terraform)",
                    subtitle: "Infrastructure as Code",
                    days: [
                        { day: 36, title: "Cloud Basics (AWS)", objective: "AWS Free Tier.", tasks: ["Create Account", "Launch EC2 manually", "Terminate"], deliverable: "Clean AWS Account", concepts: "EC2, VPC, IAM, S3" },
                        { day: 37, title: "Terraform Concepts", objective: "IaC Intro.", tasks: ["Local provider main.tf"], deliverable: "tfstate file", concepts: "HCL, Plan, Apply, State" },
                        { day: 38, title: "Terraform + AWS", objective: "Provisioning.", tasks: ["Provision EC2 via TF", "Verify", "Destroy"], deliverable: "main.tf", concepts: "AWS Provider, Auth" },
                        { day: 39, title: "State Management", objective: "Collaboration.", tasks: ["Backend S3 block"], deliverable: "State in S3", concepts: "Remote State, Locking" },
                        { day: 40, title: "Variables & Modules", objective: "Reusability.", tasks: ["Web Server Module", "Call twice"], deliverable: "Modular structure", concepts: "Input Vars, Outputs, DRY" },
                        { day: 41, title: "Networking IaC", objective: "VPC.", tasks: ["Build VPC + Subnet via TF"], deliverable: "network.tf", concepts: "VPC, Subnets, Gateway" },
                        { day: 42, title: "Weekly Project: Infra from Scratch", isProject: true, objective: "Web Server Env", tasks: ["VPC/SG/Subnet", "EC2 + UserData Nginx", "Output IP"], deliverable: "Repo: terraform-aws-webserver", stack: "Terraform, AWS" }
                    ]
                },
                {
                    id: "p6",
                    title: "Phase 6: Observability",
                    subtitle: "Monitoring & Logging",
                    days: [
                        { day: 43, title: "Theory", objective: "Concepts.", tasks: ["Read SRE Book Ch 6"], deliverable: "N/A", concepts: "Logs, Metrics, Traces, RED Method" },
                        { day: 44, title: "Prometheus Setup", objective: "Metrics.", tasks: ["Run Prom in Docker", "Scrape itself"], deliverable: "prometheus.yml", concepts: "TSDB, Scrapers, Targets" },
                        { day: 45, title: "Exporters & PromQL", objective: "Querying.", tasks: ["Node Exporter", "Query memory usage"], deliverable: "PromQL screenshot", concepts: "Node Exporter, PromQL" },
                        { day: 46, title: "Grafana", objective: "Dashboards.", tasks: ["Connect Prom datasource", "Import Dashboard"], deliverable: "Visual Dashboard", concepts: "Panels, Variables" },
                        { day: 47, title: "Logging (Loki)", objective: "Aggregation.", tasks: ["Deploy PLG Stack", "View logs in Explore"], deliverable: "Loki Logs view", concepts: "Promtail, Loki, LogQL" },
                        { day: 48, title: "Alerting", objective: "Notification.", tasks: ["Configure AlertManager", "Fire alert on down"], deliverable: "Firing Alert", concepts: "AlertManager, Receivers" },
                        { day: 49, title: "Weekly Project: Observable Stack", isProject: true, objective: "Monitor App", tasks: ["Instrument Python App", "Expose /metrics", "RPS Dashboard"], deliverable: "Repo: monitoring-demo", stack: "Prometheus, Grafana, Docker" }
                    ]
                },
                {
                    id: "p7",
                    title: "Phase 7: Advanced & Capstone",
                    subtitle: "Security & Final Build",
                    days: [
                        { day: 50, title: "Security (DevSecOps)", objective: "Shift Left.", tasks: ["Trivy Scan images", "Fix vulns"], deliverable: "Clean Scan", concepts: "Least Privilege, SAST" },
                        { day: 51, title: "Autoscaling (HPA)", objective: "Load handling.", tasks: ["Setup HPA", "Load test with Apache Bench"], deliverable: "Pods multiplying", concepts: "HPA, Metrics Server" },
                        { day: 52, title: "GitOps Theory", objective: "CD for K8s.", tasks: ["Install ArgoCD", "Connect to Repo"], deliverable: "ArgoCD UI", concepts: "Drift Detection, Sync" },
                        { day: 53, title: "Capstone Planning", objective: "Design.", tasks: ["Sketch solution"], deliverable: "Architecture Diagram", concepts: "Full Stack Design" },
                        { day: 54, title: "Capstone Part 1", isProject: true, objective: "End-to-End Platform (Infra)", tasks: ["Terraform EKS/Minikube", "Network Setup"], deliverable: "Infra Code", stack: "Terraform" },
                        { day: 55, title: "Capstone Part 2", isProject: true, objective: "End-to-End Platform (CI/CD)", tasks: ["App Docker Build", "Helm Upgrade Pipeline"], deliverable: "CI/CD Code", stack: "GitHub Actions, Helm" },
                        { day: 56, title: "Capstone Part 3", isProject: true, objective: "End-to-End Platform (Ops)", tasks: ["Grafana Dashboards", "Documentation"], deliverable: "Portfolio Repo", stack: "Observability" }
                    ]
                },
                {
                    id: "p8",
                    title: "Phase 8: Career Prep",
                    subtitle: "Interview & Portfolio",
                    days: [
                        { day: 57, title: "Resume & Portfolio", objective: "Impact.", tasks: ["Rewrite Resume", "Pin GitHub Repos"], deliverable: "Updated Profile", concepts: "Impact-driven CV" },
                        { day: 58, title: "Mock Interview: Design", objective: "Whiteboarding.", tasks: ["Design Global E-commerce"], deliverable: "Diagrams", concepts: "Scalability, Caching" },
                        { day: 59, title: "Mock Interview: Debug", objective: "Troubleshooting.", tasks: ["Scenario: Site is slow"], deliverable: "Debug workflow", concepts: "Metrics -> Logs -> DB" },
                        { day: 60, title: "Apply & Contribute", objective: "Job Ready.", tasks: ["5 Job Apps", "1 Open Source PR"], deliverable: "DevOps Engineer Status", concepts: "Contribution" }
                    ]
                }
            ]
        };

        // State
        let activePhaseId = "p1";
        let completedDays = new Set(); // Using Set for easy add/remove

        // --- DOM ELEMENTS ---
        const phaseNav = document.getElementById('phase-nav');
        const dayContentArea = document.getElementById('days-grid');
        const currentPhaseTitle = document.getElementById('current-phase-title');
        const currentPhaseDesc = document.getElementById('current-phase-desc');
        const projectGallery = document.getElementById('project-gallery');
        const progressBar = document.getElementById('progress-bar');
        const progressPercent = document.getElementById('progress-percent');

        // --- INITIALIZATION ---
        function init() {
            initTheme();
            renderCharts();
            renderPhaseNav();
            renderDays(activePhaseId);
            renderProjects();
            updateProgress();
        }

        // --- RENDER FUNCTIONS ---

        function renderCharts() {
            // Chart 1: Distribution (Doughnut)
            const ctx1El = document.getElementById('phaseChart');
            if (ctx1El && window.Chart) {
                const ctx1 = ctx1El.getContext('2d');
                const phaseLabels = roadmapData.phases.map(p => p.title.split(":")[0]);
                const dayCounts = roadmapData.phases.map(p => p.days.length);

                new Chart(ctx1, {
                    type: 'doughnut',
                    data: {
                        labels: phaseLabels,
                        datasets: [{
                            data: dayCounts,
                            backgroundColor: [
                                '#FCA5A5', '#FDBA74', '#FDE047', '#86EFAC', 
                                '#93C5FD', '#C4B5FD', '#F0ABFC', '#D1D5DB'
                            ],
                            borderWidth: 0
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { position: 'right', labels: { boxWidth: 10, font: {size: 10} } }
                        }
                    }
                });
            }

            // Chart 2: Skills (Radar)
            const ctx2El = document.getElementById('skillRadar');
            if (ctx2El && window.Chart) {
                const ctx2 = ctx2El.getContext('2d');
                new Chart(ctx2, {
                    type: 'radar',
                    data: {
                        labels: ['Linux/Bash', 'Networking', 'Docker', 'Kubernetes', 'CI/CD', 'IaC (Terraform)', 'Monitoring', 'Security'],
                        datasets: [{
                            label: 'Skill Level Target',
                            data: [80, 60, 85, 90, 85, 75, 70, 50], // Estimated relative weights based on curriculum days
                            fill: true,
                            backgroundColor: 'rgba(234, 88, 12, 0.2)',
                            borderColor: 'rgb(234, 88, 12)',
                            pointBackgroundColor: 'rgb(234, 88, 12)',
                            pointBorderColor: '#fff',
                            pointHoverBackgroundColor: '#fff',
                            pointHoverBorderColor: 'rgb(234, 88, 12)'
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            r: {
                                angleLines: { display: false },
                                suggestedMin: 0,
                                suggestedMax: 100
                            }
                        }
                    }
                });
            }
        }

        function renderPhaseNav() {
            if (!phaseNav) return;
            phaseNav.innerHTML = '';
            roadmapData.phases.forEach(phase => {
                const btn = document.createElement('button');
                btn.className = `tab-item text-left px-6 py-4 border-b border-stone-200 transition-colors duration-200 w-full focus:outline-none ${phase.id === activePhaseId ? 'active-tab text-stone-900' : 'text-stone-500 hover:text-stone-700'}`;
                btn.innerHTML = `
                    <span class="block text-xs font-bold uppercase tracking-wider mb-1 opacity-70">${phase.id.toUpperCase()}</span>
                    <span class="block font-semibold">${phase.title.split(":")[1] || phase.title}</span>
                `;
                btn.onclick = () => {
                    activePhaseId = phase.id;
                    renderPhaseNav(); // Re-render to update active class
                    renderDays(phase.id);
                };
                phaseNav.appendChild(btn);
            });
        }

        function renderDays(phaseId) {
            const phase = roadmapData.phases.find(p => p.id === phaseId);
            if (!phase || !dayContentArea) return;

            // Update Header
            currentPhaseTitle.innerText = phase.title;
            currentPhaseDesc.innerText = `Focus: ${phase.subtitle}`;

            // Render Grid
            dayContentArea.innerHTML = '';

            phase.days.forEach(day => {
                const isComplete = completedDays.has(day.day);
                const isProject = day.isProject;

                const card = document.createElement('div');
                card.className = `p-5 rounded-xl border transition-all duration-300 ${isComplete ? 'bg-stone-50 border-emerald-200' : 'bg-white border-stone-200 hover:border-orange-300 hover:shadow-md'}`;

                // Icon selection
                let icon = '📝';
                if (isProject) icon = '🏆';
                else if (isComplete) icon = '✅';

                card.innerHTML = `
                    <div class="flex justify-between items-start mb-3">
                        <div class="flex items-center gap-3">
                            <span class="text-2xl">${icon}</span>
                            <div>
                                <h4 class="font-bold text-stone-800">Day ${day.day}: ${day.title}</h4>
                                <p class="text-sm text-stone-500">${day.objective}</p>
                            </div>
                        </div>
                        <button data-day="${day.day}" class="text-sm px-3 py-1 rounded-full border transition-colors ${isComplete ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-stone-100 text-stone-500 border-stone-200 hover:bg-stone-200'}">
                            ${isComplete ? 'Completed' : 'Mark Done'}
                        </button>
                    </div>
                    
                    <div class="bg-stone-50 rounded-lg p-3 text-sm space-y-2 mt-4">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <span class="font-semibold text-stone-700 block mb-1">🛠 Hands-on Tasks:</span>
                                <ul class="list-disc list-inside text-stone-600 pl-1">
                                    ${day.tasks.map(t => `<li>${t}</li>`).join('')}
                                </ul>
                            </div>
                            <div>
                                <span class="font-semibold text-stone-700 block mb-1">📦 Deliverable:</span>
                                <p class="text-stone-600 italic bg-white border border-stone-200 px-2 py-1 rounded inline-block text-xs">${day.deliverable}</p>
                                ${day.concepts ? `
                                <div class="mt-2">
                                    <span class="font-semibold text-stone-700 block mb-1">🧠 Concepts:</span>
                                    <p class="text-stone-500 text-xs">${day.concepts}</p>
                                </div>` : ''}
                            </div>
                        </div>
                    </div>
                    
                    ${isProject ? `<div class="mt-3 text-right"><span class="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded border border-orange-100">Stack: ${day.stack}</span></div>` : ''}
                `;

                // Bind button click
                const btn = card.querySelector('button[data-day]');
                if (btn) {
                    btn.addEventListener('click', function () {
                        toggleDay(day.day);
                    });
                }

                // if we're on projects page this card might include a 'View Repo' anchor added later
                dayContentArea.appendChild(card);
            });
        }

        function renderProjects() {
            if (!projectGallery) return;
            projectGallery.innerHTML = '';
            let projectCount = 0;

            roadmapData.phases.forEach(phase => {
                phase.days.forEach(day => {
                    if (day.isProject) {
                        projectCount++;
                        const pCard = document.createElement('div');
                        pCard.className = "bg-stone-700 rounded-xl p-5 border border-stone-600 hover:border-orange-500 transition-colors group";
                        pCard.innerHTML = `
                            <div class="flex justify-between items-start mb-4">
                                <span class="text-3xl">🚀</span>
                                <span class="text-xs font-mono text-stone-400 bg-stone-800 px-2 py-1 rounded">Day ${day.day}</span>
                            </div>
                            <h3 class="text-lg font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">${day.objective}</h3>
                            <p class="text-stone-300 text-sm mb-4 min-h-[40px]">${day.tasks[0]}</p>
                            <div class="border-t border-stone-600 pt-4 mt-auto">
                                <p class="text-xs text-stone-400 mb-2">Tech Stack:</p>
                                <div class="flex flex-wrap gap-2">
                                    ${day.stack.split(',').map(s => `<span class="px-2 py-0.5 bg-stone-600 text-stone-200 text-xs rounded-md">${s.trim()}</span>`).join('')}
                                </div>
                            </div>
                        `;
                        // Add 'View Repo' button if a repo URL is available
                        const repoUrl = window.PROJECT_REPOS && window.PROJECT_REPOS[day.day];
                        const repoButton = repoUrl ? `<a href="${repoUrl}" target="_blank" rel="noopener noreferrer" class="inline-block mt-4 text-xs font-bold text-stone-900 bg-orange-200 px-3 py-1 rounded hover:bg-orange-300 transition">View Repo</a>` : '';
                        pCard.innerHTML = pCard.innerHTML + repoButton;
                        projectGallery.appendChild(pCard);
                    }
                });
            });
        }

        // Theme / Dark mode helpers
        function applyTheme(theme) {
            if (theme === 'dark') document.documentElement.classList.add('dark');
            else document.documentElement.classList.remove('dark');
            updateToggleIcon();
        }

        function updateToggleIcon() {
            const btn = document.getElementById('themeToggle');
            if (!btn) return;
            btn.textContent = document.documentElement.classList.contains('dark') ? '🌙' : '🌞';
            btn.setAttribute('aria-pressed', document.documentElement.classList.contains('dark') ? 'true' : 'false');
        }

        function toggleTheme() {
            const isDark = document.documentElement.classList.toggle('dark');
            localStorage.setItem('k8sTheme', isDark ? 'dark' : 'light');
            updateToggleIcon();
        }

        function initTheme() {
            const saved = localStorage.getItem('k8sTheme');
            if (saved) applyTheme(saved);
            else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) applyTheme('dark');
            const btn = document.getElementById('themeToggle');
            if (btn) btn.addEventListener('click', toggleTheme);
            updateToggleIcon();
        }

        // --- INTERACTION ---

        window.toggleDay = function (dayNum) {
            if (completedDays.has(dayNum)) {
                completedDays.delete(dayNum);
            } else {
                completedDays.add(dayNum);
            }
            updateProgress();
            renderDays(activePhaseId); // Re-render current view to show state change
        };

        function updateProgress() {
            const totalDays = 60;
            const completedCount = completedDays.size;
            const percent = Math.round((completedCount / totalDays) * 100);

            if (progressBar) progressBar.style.width = `${percent}%`;
            if (progressPercent) progressPercent.innerText = `${percent}%`;

            // Simple visual feedback if 100%
            if (percent === 100 && progressPercent && progressBar) {
                progressPercent.classList.add('text-green-500');
                progressBar.classList.replace('bg-orange-500', 'bg-green-500');
            }
        }

        // Expose data globally for other pages
        window.ROADMAP = roadmapData;
        window.PROJECT_REPOS = {
            7: 'https://github.com/ashwanipydev/server-health-monitor',
            14: 'https://github.com/ashwanipydev/docker-voting-app',
            21: 'https://github.com/ashwanipydev/ci-cd-demo',
            28: 'https://github.com/ashwanipydev/k8s-migration',
            35: 'https://github.com/ashwanipydev/k8s-helm-demo',
            42: 'https://github.com/ashwanipydev/terraform-aws-webserver',
            49: 'https://github.com/ashwanipydev/monitoring-demo',
            54: 'https://github.com/ashwanipydev/capstone-infra',
            55: 'https://github.com/ashwanipydev/capstone-cicd',
            56: 'https://github.com/ashwanipydev/capstone-ops'
        };

        // Start app
        init();
    });
})();
