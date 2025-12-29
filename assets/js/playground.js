// Renderable playground view for SPA
function renderPlaygroundView(container) {
    if (!container) return;
    container.innerHTML = `
        <div class="bg-white rounded-2xl p-6 shadow-sm">
            <h2 class="text-2xl font-bold mb-3">Playground</h2>
            <p class="text-stone-600 mb-4">Try small JavaScript snippets. console.log() will appear in the sandbox output.</p>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                    <textarea id="editor" rows="14" class="w-full p-3 border rounded font-mono text-sm" placeholder="console.log('hello world')"></textarea>
                    <div class="mt-3 flex gap-2">
                        <button id="runBtn" class="px-4 py-2 bg-orange-500 text-white rounded">Run</button>
                        <button id="clearBtn" class="px-4 py-2 bg-stone-100 rounded">Clear</button>
                        <span id="playground-status" class="text-sm text-stone-500 ml-2"></span>
                    </div>
                    <div id="output" class="mt-4 p-3 bg-black text-white rounded text-sm" style="min-height:40px;">Ready.</div>
                </div>
                <div>
                    <iframe id="sandbox" sandbox="allow-scripts" class="w-full h-80 bg-[#071018] border rounded"></iframe>
                </div>
            </div>
        </div>
    `;

    const editor = container.querySelector('#editor');
    const runBtn = container.querySelector('#runBtn');
    const clearBtn = container.querySelector('#clearBtn');
    const output = container.querySelector('#output');
    const iframe = container.querySelector('#sandbox');
    const status = container.querySelector('#playground-status');

    function runCode() {
        const code = editor.value;
        const html = `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <style>body{font-family:monospace;padding:12px;background:#0b1220;color:#e6eef8}</style>
</head>
<body>
  <div id="out"></div>
  <script>
    (function(){
      const out = document.getElementById('out');
      function log() { const args = Array.from(arguments).map(a => (typeof a === 'object' ? JSON.stringify(a) : String(a))); out.innerHTML += '<div>' + args.join(' ') + '</div>'; }
      console.log = log; console.error = function(){ log('ERROR:', ...arguments); };
      try { ${code} } catch (e) { log('Exception: ' + e.message); }
    })();
  <\/script>
</body>
</html>`;
        iframe.srcdoc = html;
        output.textContent = 'Running... Check iframe below for console output.';
        if (status) status.textContent = 'Running';
    }

    function clear() {
        editor.value = '';
        output.textContent = 'Ready.';
        iframe.srcdoc = '';
        if (status) status.textContent = '';
    }

    runBtn.addEventListener('click', runCode);
    clearBtn.addEventListener('click', clear);

    // Theme support for output area
    const themeBtn = document.getElementById('themeToggle');
    if (themeBtn) themeBtn.addEventListener('click', function () {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem('k8sTheme', isDark ? 'dark' : 'light');
        themeBtn.textContent = isDark ? '🌙' : '🌞';
        if (output) output.classList.toggle('light', !isDark);
    });

    // apply saved theme
    const saved = localStorage.getItem('k8sTheme');
    if (saved === 'dark') document.documentElement.classList.add('dark');

    // initialize docker sim if present (SPA case)
    let cleanupDocker = null;
    if (window.initDockerSim) cleanupDocker = window.initDockerSim(container);

    // return cleanup
    return function cleanup() {
        runBtn.removeEventListener('click', runCode);
        clearBtn.removeEventListener('click', clear);
        if (cleanupDocker) cleanupDocker();
    };
}

// If playground page is loaded directly, render into main
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
        const pageContainer = document.querySelector('main');
        if (pageContainer && pageContainer.querySelector('#sandbox')) {
            // Already on page with sandbox; do nothing as standalone markup exists
        }
    });
}