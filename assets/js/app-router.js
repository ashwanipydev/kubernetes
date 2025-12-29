document.addEventListener('DOMContentLoaded', function () {
    // Wait until the window-render functions are available, then init the SPA router
    function ensureReady() {
        if (window.SPARouter && window.renderHomeView && window.renderProjectsView && window.renderPlaygroundView) {
            window.SPARouter.initRouter({
                routes: {
                    '/': window.renderHomeView,
                    '/projects': window.renderProjectsView,
                    '/playground': window.renderPlaygroundView
                },
                fallback: window.renderHomeView
            });
            // Expose navigate helper on window (optional)
            window.navigateTo = window.SPARouter.navigateTo;
        } else {
            setTimeout(ensureReady, 50);
        }
    }
    ensureReady();
});