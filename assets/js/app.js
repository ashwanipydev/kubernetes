import { state, loadSavedState, toggleComplete } from './modules/state.js';
import { renderDashboard, renderDay } from './modules/ui-renderer.js';

// Initialize the application
async function initApp() {
    loadSavedState();
    
    // Setup Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
    });

    // Attach to window for legacy inline HTML onclicks
    window.app = {
        renderDashboard,
        renderDay,
        toggleComplete,
        state
    };

    // Initial Render
    renderDashboard();
}

window.addEventListener('DOMContentLoaded', initApp);