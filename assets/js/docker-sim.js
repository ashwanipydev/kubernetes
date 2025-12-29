// Lightweight Docker CLI simulator for learning commands
(function () {
    'use strict';

    const registry = ['nginx:latest', 'alpine:latest', 'redis:latest', 'python:3.11'];
    const images = new Set(); // images "pulled" by user
    const containers = []; // {id, name, image, state}

    function id() { return Math.random().toString(16).slice(2,10); }

    function writeLine(root, text, cls) {
        const el = document.createElement('div');
        el.className = 'term-line' + (cls ? ' ' + cls : '');
        el.textContent = text;
        root.appendChild(el);
        root.scrollTop = root.scrollHeight;
    }

    function listImages(root) {
        if (images.size === 0) {
            writeLine(root, 'REPOSITORY          TAG       IMAGE ID');
            writeLine(root, '');
            writeLine(root, 'No images. Try: docker pull nginx');
            return;
        }
        writeLine(root, 'REPOSITORY          TAG       IMAGE ID');
        images.forEach(im => {
            const [repo, tag] = im.split(':');
            writeLine(root, `${repo.padEnd(20)} ${tag.padEnd(8)} ${id().slice(0,12)}`);
        });
    }

    function listContainers(root, all) {
        if (containers.length === 0) { writeLine(root, 'CONTAINER ID   IMAGE          NAME     STATUS'); writeLine(root, 'No containers'); return; }
        writeLine(root, 'CONTAINER ID   IMAGE          NAME     STATUS');
        containers.forEach(c => {
            if (!all && c.state !== 'running') return;
            writeLine(root, `${c.id.slice(0,8)}   ${c.image.padEnd(12)} ${c.name.padEnd(8)} ${c.state}`);
        });
    }

    function findContainer(nameOrId) {
        return containers.find(c => c.name === nameOrId || c.id.startsWith(nameOrId));
    }

    function doPull(root, image) {
        // normalize default tag
        if (!image.includes(':')) image = image + ':latest';
        if (!registry.includes(image) && !registry.includes(image.split(':')[0]+':latest')) {
            writeLine(root, `Error: image ${image} not found in simulated registry`,'err');
            return;
        }
        images.add(image);
        writeLine(root, `Pulled ${image}`);
    }

    function doRun(root, args) {
        // support: docker run --name NAME image
        const nameIdx = args.indexOf('--name');
        let name = null;
        if (nameIdx >= 0 && args[nameIdx+1]) name = args[nameIdx+1];
        const image = args[args.length-1];
        if (!image) { writeLine(root, 'Error: no image specified'); return; }
        const imageWithTag = image.includes(':') ? image : image + ':latest';
        if (!images.has(imageWithTag)) {
            writeLine(root, `Image ${imageWithTag} not present locally. Pulling...`);
            doPull(root, imageWithTag);
        }
        const c = { id: id(), name: name || `ctr-${Math.random().toString(16).slice(2,6)}`, image: imageWithTag, state: 'running' };
        containers.push(c);
        writeLine(root, `Started container ${c.id.slice(0,8)} (${c.name}) using ${c.image}`);
    }

    function doStop(root, target) {
        const c = findContainer(target);
        if (!c) { writeLine(root, `No such container: ${target}`); return; }
        if (c.state !== 'running') { writeLine(root, `${c.name} is not running`); return; }
        c.state = 'exited';
        writeLine(root, `Stopped ${c.name}`);
    }

    function doRm(root, target) {
        const idx = containers.findIndex(c => c.name === target || c.id.startsWith(target));
        if (idx === -1) { writeLine(root, `No such container: ${target}`); return; }
        const c = containers[idx];
        if (c.state === 'running') { writeLine(root, `Error: container ${c.name} is running. Stop it first.`); return; }
        containers.splice(idx,1);
        writeLine(root, `Removed ${c.name}`);
    }

    function printHelp(root) {
        writeLine(root, 'Supported commands:');
        writeLine(root, '  help                          Show this help');
        writeLine(root, '  docker images                 List pulled images');
        writeLine(root, '  docker pull <image>           Pull (simulate) an image');
        writeLine(root, '  docker run --name <name> <image>   Run a container');
        writeLine(root, '  docker ps [-a]                List running (or all) containers');
        writeLine(root, '  docker stop <name|id>         Stop a running container');
        writeLine(root, '  docker rm <name|id>           Remove a stopped container');
        writeLine(root, '  clear                         Clear terminal');
        writeLine(root, '  tasks                         Show tasks');
    }

    function initDockerSim(root) {
        const out = root.querySelector('#docker-output');
        const input = root.querySelector('#docker-cmd');
        const runBtn = root.querySelector('#docker-run');
        const clearBtn = root.querySelector('#docker-clear');
        const checkBtn = root.querySelector('#docker-check');
        const tasksOl = root.querySelector('#docker-tasks');

        if (!out || !input || !runBtn) return null;

        function doCmd(raw) {
            if (!raw || !raw.trim()) return;
            writeLine(out, `$ ${raw}`,'cmd');
            const tokens = raw.trim().split(/\s+/);
            const cmd = tokens[0];
            if (cmd === 'help') { printHelp(out); return; }
            if (cmd === 'clear') { out.innerHTML = ''; return; }
            if (cmd === 'tasks') { // reprint tasks
                if (tasksOl) writeLine(out, tasksOl.textContent.replace(/\n/g,'\n'));
                return;
            }
            if (cmd === 'docker') {
                const sub = tokens[1];
                if (sub === 'images') { listImages(out); return; }
                if (sub === 'pull') { doPull(out, tokens[2]); return; }
                if (sub === 'run') { doRun(out, tokens.slice(2)); return; }
                if (sub === 'ps') { const all = tokens.includes('-a'); listContainers(out, all); return; }
                if (sub === 'stop') { doStop(out, tokens[2]); return; }
                if (sub === 'rm') { doRm(out, tokens[2]); return; }
                writeLine(out, `Unsupported docker subcommand: ${sub}`);
                return;
            }
            writeLine(out, `Unknown command: ${raw}`);
        }

        function onRun() { doCmd(input.value); input.value = ''; input.focus(); }
        function onClear() { out.innerHTML = ''; }

        runBtn.addEventListener('click', onRun);
        input.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); onRun(); } });
        clearBtn.addEventListener('click', onClear);

        if (checkBtn) checkBtn.addEventListener('click', function () {
            // simple task checks
            const t1 = images.has('nginx:latest');
            const t2 = containers.some(c => c.name === 'web1' && c.state === 'running');
            const t3 = containers.some(c => c.name === 'web1' && c.state === 'exited');
            const t4 = !containers.some(c => c.name === 'web1');
            writeLine(out, 'Task results:');
            writeLine(out, `  1) Pull nginx: ${t1 ? '✓' : '✗'}`);
            writeLine(out, `  2) Run web1: ${t2 ? '✓' : '✗'}`);
            writeLine(out, `  3) Stop web1: ${t3 ? '✓' : '✗'}`);
            writeLine(out, `  4) Remove web1: ${t4 ? '✓' : '✗'}`);
        });

        // initial hint
        writeLine(out, 'Docker Simulator ready. Try: docker images | docker pull nginx | docker run --name web1 nginx');

        // return cleanup
        return function cleanup() {
            runBtn.removeEventListener('click', onRun);
            input.removeEventListener('keydown', onRun);
            clearBtn.removeEventListener('click', onClear);
            if (checkBtn) checkBtn.removeEventListener('click', function(){});
        };
    }

    // Expose initializer for SPA renderers
    window.initDockerSim = function (root) {
        root = root || document;
        const container = root.querySelector('#docker-output') ? root : null;
        if (!container) return null;
        return initDockerSim(container);
    };

    // Auto-initialize when present on full page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            window.initDockerSim && window.initDockerSim(document);
        });
    } else {
        window.initDockerSim && window.initDockerSim(document);
    }
})();