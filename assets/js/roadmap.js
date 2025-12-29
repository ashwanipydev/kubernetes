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
                        { day: 7, title: "Weekly Project: Server Health", isProject: true, objective: "Server Health Monitor Script", tasks: ["Script checks Disk/RAM/CPU", "Alert if Disk > 80%", "Setup Cron job"], deliverable: "Repo: server-health-monitor", stack: "Bash, Cron, Git", repoDescription: "Lightweight server health monitor with alerts for CPU/memory/disk.", instructions: ["Create a bash script (check-health.sh) that checks disk (df -h), memory (free -m) and CPU load (uptime).","Add threshold checks (e.g., disk > 80%, mem > 85%). Log incidents to /var/log/server-health.log with timestamps.","Implement alerting: send an email or Slack webhook when thresholds are exceeded; also write a marker file for local testing.","Make the script idempotent, return non-zero exit codes on failures, and add basic tests (example input/output).","Install the script on a test VM and create a cron job to run every 5 minutes, verify alerts and logs.","Push code with README and usage instructions to the repository."], estimatedTime: "3-5 hours", difficulty: "Easy" }
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
                        { day: 14, title: "Weekly Project: Microservices", isProject: true, objective: "Voting App Deployment", tasks: ["Python App + Redis", "Dockerize Python", "Compose Link", "Redis Persistence"], deliverable: "Repo: docker-voting-app", stack: "Docker, Python, Redis", repoDescription: "A simple microservices voting app (served by Python backend) backed by Redis.", instructions: ["Create a minimal Python API that records and returns votes using Redis.","Write Dockerfiles for the service and a Redis container; ensure env vars configure Redis address.","Add a docker-compose.yml to bring up the service + Redis and verify persistence across restarts.","Add basic healthchecks and a Docker healthcheck in Dockerfile.","Add unit tests and a README with run/build instructions, commit to GitHub.","(Stretch) Add simple nginx reverse proxy and expose on port 8080 locally."], estimatedTime: "6-10 hours", difficulty: "Medium" }
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
                        { day: 21, title: "Weekly Project: Release Pipeline", isProject: true, objective: "Full CI/CD Node.js", tasks: ["Lint/Test", "Build Image", "Trivy Scan", "Push on main only"], deliverable: "Repo: ci-cd-demo", stack: "GitHub Actions, Docker, Trivy", repoDescription: "A sample Node.js project with a full CI/CD pipeline enforcing lint/tests and secure image publishing.", instructions: ["Create or fork a simple Node.js app and add unit tests and ESLint rules.","Add a GitHub Actions workflow with stages: lint, test, build Docker image, scan image with Trivy.","Configure the workflow to push Docker images to a registry only on the main branch (use a token stored in Secrets).","Fail the build on lint or test errors and add badges to README.","Document how to inspect pipeline runs and how to rotate tokens securely."], estimatedTime: "4-8 hours", difficulty: "Medium" }
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
                        { day: 28, title: "Weekly Project: K8s Migration", isProject: true, objective: "Migrate Voting App to K8s", tasks: ["Redis Deploy/Svc", "Python Deploy/Svc", "Connect via DNS"], deliverable: "Folder: k8s-manifests", stack: "K8s, Python, Redis", repoDescription: "Convert the voting app into Kubernetes manifests and run on Minikube/cluster.", instructions: ["Write Deployment manifests for the Python app and Redis, include resource requests/limits.","Create Services (ClusterIP/NodePort) to expose the apps and test connectivity.","Add ConfigMap/Secret usage for app config and DB URL.","Add a PVC for Redis to ensure persistence and test pod restarts keeping data.","Test a rolling update by changing image tags and verify zero-downtime behavior."], estimatedTime: "6-12 hours", difficulty: "Medium" },
                        { day: 29, title: "Persistent Storage", objective: "Stateful.", tasks: ["Add PVC to Redis", "Ensure data survives pod delete"], deliverable: "pvc.yaml", concepts: "PV, PVC, StorageClass" },
                        { day: 30, title: "Ingress", objective: "Routing.", tasks: ["Install Nginx Controller", "Path-based routing"], deliverable: "ingress.yaml", concepts: "Ingress Controller, Hosts" },
                        { day: 31, title: "Namespaces & RBAC", objective: "Security.", tasks: ["Create Namespace", "ServiceAccount with view-only"], deliverable: "rbac.yaml", concepts: "Role, RoleBinding" },
                        { day: 32, title: "Resources & Probes", objective: "Stability.", tasks: ["Add CPU/Mem limits", "Liveness Probe"], deliverable: "Updated deployment", concepts: "Requests vs Limits, Probes" },
                        { day: 33, title: "Helm Basics", objective: "Packages.", tasks: ["Install MySQL via Helm", "Override values"], deliverable: "Running Helm Release", concepts: "Charts, Templates, Releases" },
                        { day: 34, title: "Writing Charts", objective: "Templating.", tasks: ["Create Chart for Python App", "Use values.yaml"], deliverable: "Chart structure", concepts: "Templates, Helpers" },
                        { day: 35, title: "Weekly Project: Helm Microservice", isProject: true, objective: "Helm-ify Stack", tasks: ["Master chart", "Parameterize replicas/tags", "Dev/Prod values"], deliverable: "Repo: k8s-helm-demo", stack: "Helm, K8s", repoDescription: "Package your app as a Helm chart with configurable values for environments.", instructions: ["Create a Helm chart skeleton (helm create) for the Python app.","Template Deployment/Service and add values for image.tag, replicas, and resources.","Create separate values files for dev and prod and test upgrades with helm install/upgrade.","Add chart testing with helm lint and document parameter overrides in README."], estimatedTime: "4-8 hours", difficulty: "Medium" }
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
                        { day: 42, title: "Weekly Project: Infra from Scratch", isProject: true, objective: "Web Server Env", tasks: ["VPC/SG/Subnet", "EC2 + UserData Nginx", "Output IP"], deliverable: "Repo: terraform-aws-webserver", stack: "Terraform, AWS", repoDescription: "Provision a minimal network and web server using Terraform on AWS (or a local provider).", instructions: ["Write Terraform modules to create a VPC, subnets, and security groups for web traffic.","Provision an EC2 instance with User Data that boots nginx and serves a sample page.","Output the public IP (or bastion details) and verify the server serves content.","Add destroy instructions and ensure tfstate is safe; document how to test and tear down."], estimatedTime: "6-12 hours", difficulty: "Medium" }
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
                        { day: 49, title: "Weekly Project: Observable Stack", isProject: true, objective: "Monitor App", tasks: ["Instrument Python App", "Expose /metrics", "RPS Dashboard"], deliverable: "Repo: monitoring-demo", stack: "Prometheus, Grafana, Docker", repoDescription: "Instrument a sample app, collect metrics with Prometheus, and build Grafana dashboards.", instructions: ["Add Prometheus client instrumentation to the Python app and expose /metrics.","Run Prometheus and Grafana in Docker and configure Prometheus to scrape the app.","Create Grafana dashboards that show RPS, latency, and error rates.","Add an Alertmanager rule to fire when error rates or latency breaches thresholds."], estimatedTime: "6-12 hours", difficulty: "Medium" }
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
                        { day: 54, title: "Capstone Part 1", isProject: true, objective: "End-to-End Platform (Infra)", tasks: ["Terraform EKS/Minikube", "Network Setup"], deliverable: "Infra Code", stack: "Terraform", repoDescription: "Build the foundation infrastructure for the capstone platform (cluster, networking, storage).", instructions: ["Define infrastructure as code (Terraform) to provision a cluster (EKS or local Minikube) and networking components.","Add StorageClasses/PVCs for stateful services and configure LB/Ingress for public access.","Document how to reproduce the environment and provide scripts to destroy resources safely."], estimatedTime: "2-3 days", difficulty: "Hard" },
                        { day: 55, title: "Capstone Part 2", isProject: true, objective: "End-to-End Platform (CI/CD)", tasks: ["App Docker Build", "Helm Upgrade Pipeline"], deliverable: "CI/CD Code", stack: "GitHub Actions, Helm", repoDescription: "Create GitOps-style pipelines to build, test, and deploy the platform and applications.", instructions: ["Build reproducible Docker images and push to a registry; tag with commit SHAs.","Create Helm charts for app deployment and a GitHub Actions workflow to run helm upgrade on change.","Integrate security scans (Trivy) and add promotion gates between staging and production."], estimatedTime: "2-3 days", difficulty: "Hard" },
                        { day: 56, title: "Capstone Part 3", isProject: true, objective: "End-to-End Platform (Ops)", tasks: ["Grafana Dashboards", "Documentation"], deliverable: "Portfolio Repo", stack: "Observability", repoDescription: "Complete the platform with observability, runbooks, and documentation for handoff.", instructions: ["Instrument apps and platform components for metrics, logs, and traces.","Create comprehensive Grafana dashboards and alerting rules tied to runbooks.","Assemble a README and operation guide that explains how to run, debug, and extend the platform."], estimatedTime: "2-3 days", difficulty: "Hard" }
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

        // --- DOM ELEMENTS (queried when view is rendered) ---
        let phaseNav = null;
        let dayContentArea = null;
        let currentPhaseTitle = null;
        let currentPhaseDesc = null;
        let projectGallery = null;
        let progressBar = null;
        let progressPercent = null

        function bindElements(root) {
            phaseNav = root.querySelector('#phase-nav');
            dayContentArea = root.querySelector('#days-grid');
            currentPhaseTitle = root.querySelector('#current-phase-title');
            currentPhaseDesc = root.querySelector('#current-phase-desc');
            projectGallery = root.querySelector('#project-gallery');
            progressBar = root.querySelector('#progress-bar');
            progressPercent = root.querySelector('#progress-percent');
        }

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

        // Expose a Home view renderer for SPA usage
        window.renderHomeView = function (container) {
            if (!container) return;
            container.innerHTML = `
                <section class="max-w-4xl mx-auto text-center space-y-4">
                    <h2 class="text-3xl font-bold text-stone-800">Your Journey to Platform Engineering</h2>
                    <p class="text-stone-600 text-lg leading-relaxed">
                        This interactive application breaks down the massive 60-day DevOps curriculum into manageable, explorable phases. 
                        Analyze the skill distribution below, then dive into the Curriculum Explorer to track your daily tasks, or jump to the Project Gallery to see what you will build.
                    </p>
                </section>

                <section class="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 rounded-2xl shadow-sm border border-stone-100 mt-8">
                    <div class="space-y-4">
                        <div class="border-b border-stone-100 pb-2">
                            <h3 class="text-lg font-bold text-stone-800">Curriculum Weight</h3>
                            <p class="text-sm text-stone-500">Distribution of days across technical domains.</p>
                        </div>
                        <div class="chart-container flex flex-col justify-center" style="height:220px;">
                            <canvas id="phaseChart"></canvas>
                        </div>
                        <p class="text-xs text-stone-400 text-center italic mt-2">Kubernetes & IaC constitute the bulk of the advanced training.</p>
                    </div>
                    <div class="space-y-4">
                        <div class="border-b border-stone-100 pb-2">
                            <h3 class="text-lg font-bold text-stone-800">Skill Acquisition Matrix</h3>
                            <p class="text-sm text-stone-500">Target competency growth areas.</p>
                        </div>
                        <div class="chart-container flex flex-col justify-center" style="height:220px;">
                            <canvas id="skillRadar"></canvas>
                        </div>
                        <p class="text-xs text-stone-400 text-center italic mt-2">Balanced focus between Operations, Development, and Security.</p>
                    </div>
                </section>

                <section id="curriculum" class="mt-8">
                    <div class="mb-6">
                        <h2 class="text-2xl font-bold text-stone-800">Curriculum Explorer</h2>
                        <p class="text-stone-600 mt-2">Select a Phase on the left to view the detailed daily breakdown, tasks, and deliverables.</p>
                    </div>

                    <div class="flex flex-col lg:flex-row bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden min-h-[600px]">
                        <div class="lg:w-1/4 bg-stone-50 border-r border-stone-200 overflow-y-auto max-h-[400px] lg:max-h-none">
                            <nav class="flex flex-col" id="phase-nav"></nav>
                        </div>
                        <div class="lg:w-3/4 p-6 bg-white overflow-y-auto">
                            <div id="day-list-header" class="mb-6 border-b border-stone-100 pb-4">
                                <h3 class="text-xl font-bold text-stone-800" id="current-phase-title">Phase 1: The Foundation</h3>
                                <p class="text-stone-500 text-sm" id="current-phase-desc">Focus: Linux, Bash, Git</p>
                            </div>
                            <div id="days-grid" class="space-y-4"></div>
                        </div>
                    </div>
                </section>

                <section class="bg-stone-800 text-stone-50 rounded-2xl p-8 shadow-lg mt-8">
                    <div class="max-w-3xl mx-auto text-center mb-10">
                        <h2 class="text-2xl font-bold text-white mb-2">🏆 Project Portfolio</h2>
                        <p class="text-stone-400">DevOps is about doing. These hands-on projects simulate real-world scenarios. Completing these builds your GitHub portfolio.</p>
                    </div>
                    <div id="project-gallery" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
                </section>
            `;

            // bind elements and initialize view logic
            bindElements(container);
            init();

            // return cleanup function
            return function cleanup() {
                // currently nothing to cleanup. If we had intervals/listeners, remove them here.
            };
        };

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
