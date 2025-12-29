// Renderable projects view (can be used as standalone or inside SPA)
function renderProjectsView(container) {
    const roadmap = window.ROADMAP;
    const repos = window.PROJECT_REPOS || {};
    if (!container || !roadmap) return;

    container.innerHTML = `
        <h1 class="text-2xl font-bold mb-4">Project Gallery</h1>
        <p class="text-stone-500 mb-6">All weekly and capstone projects with links to their GitHub repositories.</p>
        <div id="projects-grid" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"></div>
        <div class="mt-6 text-center"><button id="showMoreBtn" class="px-4 py-2 bg-stone-100 rounded">Show more</button></div>
    `;

    const grid = container.querySelector('#projects-grid');

    const projectCards = [];

    roadmap.phases.forEach(phase => {
        phase.days.forEach(day => {
            if (day.isProject) {
                const card = document.createElement('div');
                card.className = 'project-card';
                const repoUrl = repos[day.day];
                // build stack tags
                const stackHtml = day.stack ? `<div class="stack-tags">${day.stack.split(',').map(s => `<span class="stack-tag">${s.trim()}</span>`).join('')}</div>` : '';
                card.innerHTML = `
                    <div class="project-meta">
                        <div>
                            <div style="display:flex;gap:8px;align-items:center;margin-bottom:8px;">
                                <span class="project-badge">Day ${day.day}</span>
                                <h3 class="text-lg font-bold text-white mb-0">${day.title}</h3>
                            </div>
                            <p class="text-stone-300 text-sm mb-2">${day.objective}</p>
                            <p class="text-stone-400 text-xs mb-2">${day.tasks.slice(0,2).join(' · ')}</p>
                            ${stackHtml}
                        </div>
                        <div style="text-align:right;">
                            <div class="text-stone-400 text-xs mb-4">${phase.title}</div>
                            ${repoUrl ? `<a href="${repoUrl}" target="_blank" rel="noopener noreferrer" class="repo-link"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden><path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.86 8.17 6.84 9.49.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.71-2.78.61-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1.01.07 1.54 1.04 1.54 1.04.9 1.54 2.36 1.09 2.94.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.8c.85.004 1.71.12 2.51.35 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85 0 1.33-.01 2.4-.01 2.72 0 .26.18.58.69.48A10.01 10.01 0 0022 12c0-5.52-4.48-10-10-10z" fill="#7f1d1d"/></svg> View Repo</a>` : '<span class="text-xs text-stone-400">Repo not provided</span>'}
                        </div>
                    </div>
                `;
                // add steps panel (hidden by default)
                const steps = document.createElement('div');
                steps.className = 'project-steps';
                steps.style.display = 'none';
                if (day.instructions && Array.isArray(day.instructions)) {
                    const meta = [];
                    if (day.estimatedTime) meta.push(`<div class=\"text-stone-400 text-xs mb-2\"><strong>Est:</strong> ${day.estimatedTime}</div>`);
                    if (day.difficulty) meta.push(`<div class=\"text-stone-400 text-xs mb-2\"><strong>Difficulty:</strong> ${day.difficulty}</div>`);
                    steps.innerHTML = `${meta.join('')}<ol class="text-stone-300 text-sm mt-3">${day.instructions.map(s => `<li class=\"mb-2\">${s}</li>`).join('')}</ol>`;
                } else {
                    steps.innerHTML = `<p class="text-stone-400 text-xs mt-2">No step-by-step instructions provided.</p>`;
                }

                // show/hide button
                const toggleBtn = document.createElement('button');
                toggleBtn.className = 'show-steps-btn';
                toggleBtn.textContent = 'Show steps';
                toggleBtn.style.marginTop = '12px';
                toggleBtn.addEventListener('click', function () {
                    const visible = steps.style.display !== 'none';
                    steps.style.display = visible ? 'none' : 'block';
                    toggleBtn.textContent = visible ? 'Show steps' : 'Hide steps';
                });

                // append elements
                card.appendChild(steps);
                card.appendChild(toggleBtn);

                projectCards.push(card);
            }
        });
    });

    // render only first N projects (3x3)
    const VISIBLE = 9;
    const gridPopulate = (count) => {
        grid.innerHTML = '';
        projectCards.forEach((c, idx) => {
            if (idx < count) grid.appendChild(c);
        });
    };

    let showingAll = false;
    const showMoreBtn = container.querySelector('#showMoreBtn');
    if (showMoreBtn) {
        showMoreBtn.addEventListener('click', function () {
            showingAll = !showingAll;
            gridPopulate(showingAll ? projectCards.length : VISIBLE);
            showMoreBtn.textContent = showingAll ? 'Show less' : 'Show more';
        });
    }

    // initial populate
    gridPopulate(VISIBLE);

    // return cleanup handle
    return function cleanup() {
        // remove listeners if needed (nothing persistent)
    };
}

// If this script runs on projects.html directly, render into the page's container
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
        const pageContainer = document.querySelector('main');
        if (pageContainer && pageContainer.querySelector('#projects-grid')) {
            renderProjectsView(pageContainer);
        }
    });
} else {
    const pageContainer = document.querySelector('main');
    if (pageContainer && pageContainer.querySelector('#projects-grid')) {
        renderProjectsView(pageContainer);
    }
}