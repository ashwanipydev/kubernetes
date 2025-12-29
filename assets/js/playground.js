document.addEventListener('DOMContentLoaded', function () {
    const editor = document.getElementById('editor');
    const runBtn = document.getElementById('runBtn');
    const clearBtn = document.getElementById('clearBtn');
    const output = document.getElementById('output');
    const iframe = document.getElementById('sandbox');

    function runCode() {
        const code = editor.value;
        // Create a small HTML that captures console.log
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
      function log() {
        const args = Array.from(arguments).map(a => (typeof a === 'object' ? JSON.stringify(a) : String(a)));
        out.innerHTML += '<div>' + args.join(' ') + '</div>';
      }
      console.log = log;
      console.error = function(){ log('ERROR:', ...arguments); };
      try {
        ${code}
      } catch (e) {
        log('Exception: ' + e.message);
      }
    })();
  <\/script>
</body>
</html>`;
        iframe.srcdoc = html;
        output.classList.remove('light');
        output.textContent = 'Running... Check iframe below for console output.';
    }

    runBtn.addEventListener('click', runCode);
    clearBtn.addEventListener('click', function () {
        editor.value = '';
        output.textContent = '';
        iframe.srcdoc = '';
    });

    // Theme toggle reuse
    const btn = document.getElementById('themeToggle');
    if (btn) btn.addEventListener('click', function () {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem('k8sTheme', isDark ? 'dark' : 'light');
        btn.textContent = isDark ? '🌙' : '🌞';
        // tweak output style
        const outDiv = document.getElementById('output');
        if (outDiv) {
            if (isDark) outDiv.classList.remove('light');
            else outDiv.classList.add('light');
        }
    });

    // apply saved theme
    const saved = localStorage.getItem('k8sTheme');
    if (saved === 'dark') document.documentElement.classList.add('dark');
});