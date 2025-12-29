document.addEventListener('DOMContentLoaded', function () {
    const grid = document.getElementById('projects-grid');
    const roadmap = window.ROADMAP;
    const repos = window.PROJECT_REPOS || {};

    if (!grid || !roadmap) return;

    roadmap.phases.forEach(phase => {
        phase.days.forEach(day => {
            if (day.isProject) {
                const card = document.createElement('div');
                card.className = 'bg-stone-700 rounded-xl p-5 border border-stone-600';
                const repoUrl = repos[day.day];
                card.innerHTML = `
                    <div class="flex justify-between items-start mb-4">
                        <div>
                            <h3 class="text-lg font-bold text-white mb-1">Day ${day.day}: ${day.title}</h3>
                            <p class="text-stone-300 text-sm mb-2">${day.objective}</p>
                            <p class="text-stone-400 text-xs mb-2">${day.tasks.slice(0,2).join(' · ')}</p>
                            <div class="mt-3">
                                ${repoUrl ? `<a href="${repoUrl}" target="_blank" rel="noopener noreferrer" class="inline-block text-xs font-bold text-stone-900 bg-orange-200 px-3 py-1 rounded hover:bg-orange-300 transition">View Repo</a>` : '<span class="text-xs text-stone-400">Repo not provided</span>'}
                            </div>
                        </div>
                        <div class="text-stone-400 text-xs">${phase.title}</div>
                    </div>
                `;
                grid.appendChild(card);
            }
        });
    });

    // theme toggle reuse
    const btn = document.getElementById('themeToggle');
    if (btn) btn.addEventListener('click', function () {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem('k8sTheme', isDark ? 'dark' : 'light');
        btn.textContent = isDark ? '🌙' : '🌞';
    });

    // apply stored theme
    const saved = localStorage.getItem('k8sTheme');
    if (saved === 'dark') document.documentElement.classList.add('dark');
});