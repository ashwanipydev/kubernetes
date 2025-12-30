(function(){
  const TOTAL = 45;
  const STORAGE_KEY = 'k8s45_progress';
  const THEME_KEY = 'k8s45_theme';

  const DAY_TITLES = [
    'Kubernetes Overview & Setup','Containers vs Pods','Kubernetes Architecture','YAML & Declarative Configs','kubectl Power Tools','Namespaces & Quotas','Sidecar Pod Project',
    'ReplicaSets & Scaling','Deployments & Rollouts','Deployment Strategies','StatefulSets Intro','DaemonSets','Jobs & CronJobs','Three-Tier App Project',
    'Services','CoreDNS & DNS','Ingress & Ingress Controllers','Network Policies','Service Mesh Intro','Ingress+TLS Project',
    'ConfigMaps','Secrets Best Practices','Volumes & PV/PVC','StorageClasses','Stateful Patterns','Stateful Project',
    'Resource Requests & Limits','HPA','Node Selectors & Taints','Affinity & Anti-affinity','Autoscaling Project',
    'Probes','Centralized Logging','Metrics Server & Prometheus','Grafana Dashboards','Distributed Tracing','Observability Project',
    'RBAC & Service Accounts','Pod Security Standards','Image Security & Supply Chain','Secrets Rotation','Secure Namespace Project',
    'Helm & Templating','Kustomize & GitOps','Rolling Updates & Canary'
  ];

  function dayTitle(i){ return DAY_TITLES[i-1] || `Day ${i}` }

  const daysList = document.getElementById('daysList');
  const progressBar = document.getElementById('progressBar');
  const progressPercent = document.getElementById('progressPercent');
  const themeBtn = document.getElementById('themeToggle');
  const exportBtn = document.getElementById('exportBtn');
  const importBtn = document.getElementById('importBtn');
  const resetBtn = document.getElementById('resetBtn');

  function loadProgress(){ try{ const raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) : {} }catch(e){return {}} }
  function saveProgress(obj){ localStorage.setItem(STORAGE_KEY, JSON.stringify(obj)) }

  function render(){
    const state = loadProgress();
    daysList.innerHTML = '';
    for(let i=1;i<=TOTAL;i++){
      const li = document.createElement('li'); li.className='day';
      const id = `d${String(i).padStart(2,'0')}`;
      const chk = document.createElement('input'); chk.type='checkbox'; chk.className='checkbox'; chk.id = id; chk.checked = !!state[id];
      chk.addEventListener('change', onToggle);
      const meta = document.createElement('div');
      const h3 = document.createElement('h3');
      const a = document.createElement('a');
      const dayPath = `/days/day-${String(i).padStart(2,'0')}/`;
      a.href = dayPath; a.textContent = `Day ${i}: ${dayTitle(i)}`; a.target = '_blank'; a.rel='noopener noreferrer';
      h3.appendChild(a);
      const p = document.createElement('p'); p.textContent = 'Hands-on lab and deliverable in the day folder.';
      meta.appendChild(h3); meta.appendChild(p);
      li.appendChild(chk); li.appendChild(meta);
      daysList.appendChild(li);
    }
    updateProgress();
  }

  function onToggle(e){ const id = e.target.id; const state = loadProgress(); state[id] = e.target.checked; saveProgress(state); updateProgress(); }

  function updateProgress(){ const state = loadProgress(); const completed = Object.values(state).filter(Boolean).length; const pct = Math.round((completed / TOTAL) * 100); progressBar.style.width = pct + '%'; progressPercent.textContent = pct + '%'; }

  function applyTheme(theme){ if(theme === 'dark') document.documentElement.classList.add('dark'); else document.documentElement.classList.remove('dark'); updateThemeButton(); }
  function updateThemeButton(){ const isDark = document.documentElement.classList.contains('dark'); if(themeBtn) themeBtn.textContent = isDark ? '🌙' : '🌞'; }
  window.toggleTheme = function(){ const isDark = document.documentElement.classList.toggle('dark'); localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light'); updateThemeButton(); };

  function exportProgress(){ const data = localStorage.getItem(STORAGE_KEY) || '{}'; const blob = new Blob([data], {type:'application/json'}); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'k8s45_progress.json'; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url); }
  function importProgress(){ const input = document.createElement('input'); input.type='file'; input.accept='application/json'; input.onchange = e => { const f = e.target.files[0]; if(!f) return; const reader = new FileReader(); reader.onload = ev => { try{ const obj = JSON.parse(ev.target.result); saveProgress(obj); render(); }catch(err){ alert('Invalid JSON'); } }; reader.readAsText(f); }; input.click(); }
  function resetProgress(){ if(confirm('Reset progress?')){ localStorage.removeItem(STORAGE_KEY); render(); } }

  document.addEventListener('DOMContentLoaded', function(){ try{ const saved = localStorage.getItem(THEME_KEY); if(saved) applyTheme(saved); else if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) applyTheme('dark'); }catch(e){}
    if(themeBtn) themeBtn.addEventListener('click', function(){ if(typeof window.toggleTheme === 'function') window.toggleTheme(); });
    if(exportBtn) exportBtn.addEventListener('click', exportProgress);
    if(importBtn) importBtn.addEventListener('click', importProgress);
    if(resetBtn) resetBtn.addEventListener('click', resetProgress);
    render();
  });
})();
