document.addEventListener('DOMContentLoaded', function () {
    // Set active nav link based on current path
    const links = Array.from(document.querySelectorAll('header a'));
    const path = window.location.pathname.split('/').pop() || 'index.html';

    links.forEach(a => {
        const href = a.getAttribute('href') || '';
        if (href === path || (href === 'index.html' && path === '')) {
            a.classList.add('active');
        } else {
            a.classList.remove('active');
        }
    });

    // Sync theme toggle icons across pages
    const saved = localStorage.getItem('k8sTheme');
    const isDark = saved === 'dark' || (!saved && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (isDark) document.documentElement.classList.add('dark');

    const themeBtns = Array.from(document.querySelectorAll('#themeToggle'));
    themeBtns.forEach(btn => {
        btn.textContent = document.documentElement.classList.contains('dark') ? '🌙' : '🌞';
        btn.setAttribute('aria-pressed', document.documentElement.classList.contains('dark') ? 'true' : 'false');
    });

    // Global theme toggle handler (works across SPA views)
    document.body.addEventListener('click', function (e) {
        const t = e.target.closest('#themeToggle');
        if (!t) return;
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem('k8sTheme', isDark ? 'dark' : 'light');
        const allBtns = document.querySelectorAll('#themeToggle');
        allBtns.forEach(b => b.textContent = isDark ? '🌙' : '🌞');
        allBtns.forEach(b => b.setAttribute('aria-pressed', isDark ? 'true' : 'false'));
        e.preventDefault();
    });
});