// Simple History API router for SPA navigation

const routes = new Map();
let currentCleanup = null;

function registerRoute(path, renderFn) {
    routes.set(path, renderFn);
}

function renderPath(path) {
    const renderFn = routes.get(path) || routes.get('*');
    const app = document.getElementById('app') || document.querySelector('main');
    if (!app) return;

    // cleanup previous view
    if (typeof currentCleanup === 'function') {
        try { currentCleanup(); } catch (e) { console.error('cleanup error', e); }
        currentCleanup = null;
    }

    // call the render function and capture cleanup if provided
    try {
        const ret = renderFn(app);
        if (typeof ret === 'function') currentCleanup = ret;
    } catch (e) {
        console.error('render error for', path, e);
        app.innerHTML = '<p class="text-red-500">An error occurred while rendering the view.</p>';
    }

    // update active nav
    setActiveNavLink(path);
}

function navigateTo(href, replace=false) {
    const path = new URL(href, location.origin).pathname;
    if (path === location.pathname && !replace) return;
    if (replace) history.replaceState({}, '', path);
    else history.pushState({}, '', path);
    renderPath(path);
}

function linkHandler(e) {
    if (e.defaultPrevented) return;
    const a = e.target.closest('a');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href) return;
    // external links, anchors, mailto, tel
    if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#')) return;
    // let the browser handle ctrl/meta clicks / new tab
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || a.target === '_blank') return;

    e.preventDefault();
    navigateTo(href);
}

function setActiveNavLink(path) {
    const links = document.querySelectorAll('header a');
    links.forEach(a => {
        const href = a.getAttribute('href') || '/';
        if (href === path) a.classList.add('active');
        else a.classList.remove('active');
    });
}

window.addEventListener('popstate', () => renderPath(location.pathname));

// global init for router, call to bind events and register default routes
function initRouter(opts) {
    document.body.addEventListener('click', linkHandler);

    // register provided routes
    if (opts && opts.routes) {
        Object.entries(opts.routes).forEach(([p, fn]) => registerRoute(p, fn));
    }

    // wildcard
    if (!routes.has('*') && opts && opts.fallback) registerRoute('*', opts.fallback);

    // initial render
    renderPath(location.pathname);

    return { navigateTo, registerRoute };
}

window.SPARouter = { initRouter, navigateTo, registerRoute };
