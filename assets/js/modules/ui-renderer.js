import { learningPath, state, toggleComplete } from './state.js';

/**
 * Main function to render the dashboard view
 */
export function renderDashboard() {
    const mainContent = document.getElementById('mainContent');
    const completedCount = state.completedDays.size;
    const progressPercent = Math.round((completedCount / learningPath.length) * 100);

    mainContent.innerHTML = `
        <div class="space-y-8 animate-fade-in">
            <!-- Header Stats -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-slate-200 dark:border-stone-800 shadow-sm">
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 bg-sky-100 dark:bg-sky-900/30 rounded-xl flex items-center justify-center text-sky-600 dark:text-sky-400">
                            <i class="fas fa-tasks text-xl"></i>
                        </div>
                        <div>
                            <p class="text-sm text-slate-500 dark:text-stone-400">Overall Progress</p>
                            <h3 class="text-2xl font-bold">${progressPercent}%</h3>
                        </div>
                    </div>
                    <div class="mt-4 w-full bg-slate-100 dark:bg-stone-800 rounded-full h-2">
                        <div class="bg-sky-500 h-2 rounded-full transition-all duration-1000" style="width: ${progressPercent}%"></div>
                    </div>
                </div>
                
                <div class="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-slate-200 dark:border-stone-800 shadow-sm">
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                            <i class="fas fa-calendar-check text-xl"></i>
                        </div>
                        <div>
                            <p class="text-sm text-slate-500 dark:text-stone-400">Days Completed</p>
                            <h3 class="text-2xl font-bold">${completedCount} / 30</h3>
                        </div>
                    </div>
                </div>

                <div class="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-slate-200 dark:border-stone-800 shadow-sm">
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                            <i class="fas fa-fire text-xl"></i>
                        </div>
                        <div>
                            <p class="text-sm text-slate-500 dark:text-stone-400">Current Streak</p>
                            <h3 class="text-2xl font-bold">3 Days</h3>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Learning Path Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                ${learningPath.map(item => renderDayCard(item)).join('')}
            </div>
        </div>
    `;
}

/**
 * Renders an individual day card for the dashboard
 */
function renderDayCard(item) {
    const isCompleted = state.completedDays.has(item.day);
    return `
        <div onclick="window.app.renderDay(${item.day})" 
             class="group relative bg-white dark:bg-stone-900 p-6 rounded-2xl border border-slate-200 dark:border-stone-800 hover:border-sky-500 dark:hover:border-sky-500 transition-all cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-1">
            <div class="flex justify-between items-start mb-4">
                <div class="w-12 h-12 bg-slate-100 dark:bg-stone-800 group-hover:bg-sky-500 group-hover:text-white rounded-xl flex items-center justify-center text-slate-600 dark:text-stone-400 transition-colors">
                    <i class="fas ${item.icon} text-xl"></i>
                </div>
                ${isCompleted ? '<i class="fas fa-check-circle text-emerald-500 text-xl"></i>' : ''}
            </div>
            <span class="text-xs font-bold text-sky-500 uppercase tracking-wider">Day ${item.day}</span>
            <h3 class="text-lg font-bold mt-1 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">${item.title}</h3>
            <p class="text-sm text-slate-500 dark:text-stone-400 mt-2 line-clamp-2">${item.description}</p>
        </div>
    `;
}

/**
 * Renders the detailed view for a specific day
 */
export function renderDay(dayId) {
    const item = learningPath.find(d => d.day === dayId);
    const mainContent = document.getElementById('mainContent');
    const isCompleted = state.completedDays.has(dayId);

    mainContent.innerHTML = `
        <div class="animate-fade-in max-w-4xl mx-auto">
            <button onclick="window.app.renderDashboard()" class="mb-6 text-slate-500 hover:text-sky-500 flex items-center gap-2 transition-colors">
                <i class="fas fa-arrow-left"></i> Back to Dashboard
            </button>

            <div class="bg-white dark:bg-stone-900 rounded-3xl border border-slate-200 dark:border-stone-800 overflow-hidden shadow-sm">
                <div class="p-8 border-b border-slate-200 dark:border-stone-800 flex justify-between items-center bg-slate-50/50 dark:bg-stone-800/50">
                    <div>
                        <span class="text-sky-500 font-bold tracking-tighter uppercase text-sm">Module ${dayId}</span>
                        <h2 class="text-3xl font-bold mt-1">${item.title}</h2>
                    </div>
                    <button onclick="window.app.toggleComplete(${dayId}); window.app.renderDay(${dayId})" 
                            class="px-6 py-3 rounded-xl font-bold transition-all ${isCompleted ? 'bg-emerald-500 text-white' : 'bg-slate-200 dark:bg-stone-700 hover:bg-sky-500 hover:text-white'}">
                        ${isCompleted ? '<i class="fas fa-check mr-2"></i> Completed' : 'Mark Complete'}
                    </button>
                </div>
                
                <div class="p-8 prose prose-slate dark:prose-invert max-w-none">
                    <h3>Learning Objectives</h3>
                    <p>${item.description}</p>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                        <div class="p-6 bg-slate-50 dark:bg-stone-800/50 rounded-2xl border border-slate-100 dark:border-stone-700">
                            <h4 class="flex items-center gap-2 mb-4 text-sky-500">
                                <i class="fas fa-lightbulb"></i> Key Concepts
                            </h4>
                            <ul class="space-y-2 list-none p-0">
                                <li class="flex items-center gap-2"><i class="fas fa-check text-xs text-emerald-500"></i> Core Architecture</li>
                                <li class="flex items-center gap-2"><i class="fas fa-check text-xs text-emerald-500"></i> Implementation details</li>
                                <li class="flex items-center gap-2"><i class="fas fa-check text-xs text-emerald-500"></i> Best practices</li>
                            </ul>
                        </div>
                        <div class="p-6 bg-slate-50 dark:bg-stone-800/50 rounded-2xl border border-slate-100 dark:border-stone-700">
                            <h4 class="flex items-center gap-2 mb-4 text-indigo-500">
                                <i class="fas fa-terminal"></i> Practical Lab
                            </h4>
                            <p class="text-sm">Spin up a local cluster and apply the manifests provided in the curriculum.</p>
                            <button class="mt-4 text-sm font-bold text-indigo-500 hover:underline">Start Lab Experience →</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Scroll to top when entering a new page
    window.scrollTo({ top: 0, behavior: 'smooth' });
}