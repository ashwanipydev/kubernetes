import { 
    state, 
    loadSavedState, 
    toggleComplete, 
    toggleConceptComplete, 
    setAILoading 
} from './modules/state.js';
import { renderDashboard, renderDay } from './modules/ui-renderer.js';
import * as ai from './modules/ai-engine.js';

/**
 * Main Application Controller
 * Orchestrates initialization, global event binding, and AI interactions
 */
async function initApp() {
    // 1. Load data from localStorage
    loadSavedState();
    
    // 2. Setup Theme Management
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            const isDark = document.documentElement.classList.contains('dark');
            localStorage.setItem('k8sTheme', isDark ? 'dark' : 'light');
        });
    }

    // Apply saved theme preference
    const savedTheme = localStorage.getItem('k8sTheme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    }

    /**
     * Bind to window.app for access from HTML event handlers
     */
    window.app = {
        // Navigation & UI
        renderDashboard,
        renderDay,
        
        // State Persistence
        toggleComplete: (dayId) => {
            toggleComplete(dayId);
            renderDashboard(); // Update progress on dashboard
        },
        toggleConcept: (conceptId) => {
            toggleConceptComplete(conceptId);
        },

        // AI Engine Interactions
        explainConcept: async (conceptName) => {
            try {
                setAILoading(true);
                window.app.updateAILoaderUI(true);
                
                const explanation = await ai.explainConcept(conceptName, state.userProfile.level);
                
                console.log(`AI Explanation for ${conceptName}:`, explanation);
                
                return explanation;
            } catch (error) {
                console.error("AI Assistant Error:", error);
            } finally {
                setAILoading(false);
                window.app.updateAILoaderUI(false);
            }
        },

        state // Access to current state
    };

    /**
     * Helper to show/hide global AI loading state
     */
    window.app.updateAILoaderUI = (show) => {
        let loader = document.getElementById('ai-global-loader');
        if (show) {
            if (!loader) {
                loader = document.createElement('div');
                loader.id = 'ai-global-loader';
                loader.className = 'fixed bottom-6 right-6 bg-indigo-600 text-white px-5 py-3 rounded-2xl shadow-2xl z-[100] flex items-center gap-3 animate-bounce border border-indigo-400';
                loader.innerHTML = `<i class="fas fa-brain animate-pulse"></i> <span class="font-bold text-sm">AI is thinking...</span>`;
                document.body.appendChild(loader);
            }
        } else if (loader) {
            loader.remove();
        }
    };

    // 3. Initial Render
    renderDashboard();
}

// Start app when DOM is fully loaded
window.addEventListener('DOMContentLoaded', initApp);
