const fs = require('fs');
const path = require('path');

const tasksPath = path.join(__dirname, '..', 'src', 'data', 'tasks.json');
const imagesDir = path.join(__dirname, '..', 'public', 'images');
const outputPath = path.join(__dirname, '..', 'public', 'admin-images.html');

const data = JSON.parse(fs.readFileSync(tasksPath, 'utf8'));
const tasks = data.tasks;

// Get all image files currently in public/images
const existingImages = new Set();
if (fs.existsSync(imagesDir)) {
    const walk = (dir) => {
        fs.readdirSync(dir).forEach(f => {
            const full = path.join(dir, f);
            if (fs.statSync(full).isDirectory()) walk(full);
            else existingImages.add('/' + path.relative(path.join(__dirname, '..', 'public'), full).replace(/\\/g, '/'));
        });
    };
    walk(imagesDir);
}

// Analyze each task for image references and missing images
const IMG_PATTERN = /src="([^"]+\.(png|jpg|jpeg|gif|svg|webp))"/gi;

const rows = tasks.map(task => {
    const combined = (task.content || '') + (task.solution || '');
    const refs = [];
    let m;
    while ((m = IMG_PATTERN.exec(combined)) !== null) {
        refs.push(m[1]);
    }
    IMG_PATTERN.lastIndex = 0;

    const missing = refs.filter(r => !existingImages.has(r));
    const present = refs.filter(r => existingImages.has(r));

    return {
        id: task.id,
        topicId: task.topicId,
        category: task.category,
        title: task.title,
        imageRefs: refs,
        missingImages: missing,
        presentImages: present,
        hasImagePlaceholder: combined.includes('image-placeholder') || combined.includes('[Bild]') || combined.includes('[Abbildung]'),
        status: refs.length === 0 ? 'no-ref' : (missing.length > 0 ? 'missing' : 'ok')
    };
});

const byStatus = {
    missing: rows.filter(r => r.status === 'missing'),
    noRef: rows.filter(r => r.status === 'no-ref'),
    ok: rows.filter(r => r.status === 'ok'),
};

const topicLabels = {
    'optics': 'Optik', 'mechanics': 'Mechanik', 'electrodynamics': 'Elektrodynamik',
    'quantum-theory': 'Quantenmechanik', 'thermodynamics': 'Thermodynamik',
    'atom-molecular': 'Atom- & Molekülphysik', 'mathematical-foundation': 'Mathematische Grundlagen',
    'solid-state': 'Festkörperphysik', 'kernphysik': 'Kernphysik',
    'relativity-theory': 'Relativitätstheorie', 'stanford-qualifying-exam': 'Stanford QE',
    'mit-qualifying-exam': 'MIT QE',
};

function badge(status) {
    if (status === 'ok') return '<span style="background:#d1fae5;color:#065f46;padding:2px 8px;border-radius:20px;font-size:11px;font-weight:700;">✓ OK</span>';
    if (status === 'missing') return '<span style="background:#fee2e2;color:#991b1b;padding:2px 8px;border-radius:20px;font-size:11px;font-weight:700;">✗ Fehlt</span>';
    return '<span style="background:#f1f5f9;color:#64748b;padding:2px 8px;border-radius:20px;font-size:11px;font-weight:700;">– kein Bild</span>';
}

function refHtml(refs, missing) {
    if (refs.length === 0) return '<span style="color:#94a3b8;font-size:12px;">–</span>';
    return refs.map(r => {
        const isMissing = missing.includes(r);
        const color = isMissing ? '#ef4444' : '#22c55e';
        const icon = isMissing ? '✗' : '✓';
        return `<code style="font-size:11px;background:#f8fafc;padding:2px 6px;border-radius:4px;border:1px solid ${color}33;color:${color};display:inline-block;margin:2px;">${icon} ${r}</code>`;
    }).join(' ');
}

const tableRows = rows.map(r => `
    <tr style="border-bottom:1px solid #f1f5f9;" class="row-${r.status}">
        <td style="padding:10px 12px;font-size:12px;color:#64748b;white-space:nowrap;">${r.id}</td>
        <td style="padding:10px 12px;font-weight:600;font-size:13px;">${r.title}</td>
        <td style="padding:10px 12px;font-size:12px;color:#6366f1;">${topicLabels[r.topicId] || r.topicId}</td>
        <td style="padding:10px 12px;">${badge(r.status)}</td>
        <td style="padding:10px 12px;">${refHtml(r.imageRefs, r.missingImages)}</td>
        <td style="padding:10px 12px;font-size:11px;">
            ${r.imageRefs.length === 0 
                ? `<code style="color:#94a3b8;">/images/${r.id}.png</code>`
                : '–'
            }
        </td>
    </tr>
`).join('');

const html = `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Bild-Verwaltung – Unsolved Physics</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Inter', sans-serif; background: #f8fafc; color: #0f172a; }
header { background: linear-gradient(135deg, #4f46e5, #7c3aed); color: white; padding: 32px 40px; }
header h1 { font-size: 28px; font-weight: 800; }
header p { opacity: 0.8; margin-top: 6px; }
.stats { display: flex; gap: 20px; padding: 24px 40px; flex-wrap: wrap; }
.stat { background: white; border-radius: 16px; padding: 20px 28px; flex: 1; min-width: 160px; box-shadow: 0 1px 3px rgba(0,0,0,0.08); border: 1px solid #e2e8f0; }
.stat .num { font-size: 36px; font-weight: 800; }
.stat .label { font-size: 13px; color: #64748b; margin-top: 4px; }
.red { color: #ef4444; }
.green { color: #22c55e; }
.slate { color: #94a3b8; }
.controls { padding: 0 40px 16px; display: flex; gap: 12px; flex-wrap: wrap; align-items: center; }
.btn { padding: 8px 16px; border-radius: 10px; border: 1px solid #e2e8f0; background: white; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.15s; }
.btn:hover { background: #4f46e5; color: white; border-color: #4f46e5; }
.btn.active { background: #4f46e5; color: white; border-color: #4f46e5; }
input[type=text] { padding: 8px 14px; border-radius: 10px; border: 1px solid #e2e8f0; font-size: 13px; width: 260px; outline: none; }
input[type=text]:focus { border-color: #4f46e5; box-shadow: 0 0 0 3px #4f46e520; }
.table-wrap { margin: 0 40px 40px; background: white; border-radius: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.08); border: 1px solid #e2e8f0; overflow: hidden; }
table { width: 100%; border-collapse: collapse; }
thead th { padding: 12px 12px; text-align: left; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #94a3b8; background: #f8fafc; border-bottom: 1px solid #e2e8f0; font-weight: 700; }
tr:hover { background: #fafafa; }
</style>
</head>
<body>
<header>
    <h1>🖼️ Bild-Verwaltung</h1>
    <p>Übersicht aller Aufgaben und ihrer Bilder – Stand: ${new Date().toLocaleString('de-AT')}</p>
</header>

<div class="stats">
    <div class="stat"><div class="num red">${byStatus.missing.length}</div><div class="label">Fehlende Bilder</div></div>
    <div class="stat"><div class="num green">${byStatus.ok.length}</div><div class="label">Bilder vorhanden</div></div>
    <div class="stat"><div class="num slate">${byStatus.noRef.length}</div><div class="label">Aufgaben ohne Bild</div></div>
    <div class="stat"><div class="num" style="color:#4f46e5;">${existingImages.size}</div><div class="label">Dateien in /images</div></div>
    <div class="stat"><div class="num" style="color:#0f172a;">${tasks.length}</div><div class="label">Aufgaben gesamt</div></div>
</div>

<div class="controls">
    <button class="btn active" onclick="filterAll()">Alle</button>
    <button class="btn" onclick="filterStatus('row-missing')">❌ Fehlt</button>
    <button class="btn" onclick="filterStatus('row-ok')">✅ OK</button>
    <button class="btn" onclick="filterStatus('row-no-ref')">– Kein Bild</button>
    <input type="text" id="search" oninput="applySearch()" placeholder="Suche nach Titel oder ID...">
</div>

<div class="table-wrap">
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Aufgabentitel</th>
                <th>Thema</th>
                <th>Status</th>
                <th>Referenzierte Bilder</th>
                <th>Empfohlener Dateiname</th>
            </tr>
        </thead>
        <tbody id="tbody">
            ${tableRows}
        </tbody>
    </table>
</div>

<script>
let activeClass = null;
function filterAll() { activeClass = null; applyFilters(); setActiveBtn(0); }
function filterStatus(cls) { activeClass = cls; applyFilters(); }
function setActiveBtn(i) {
    document.querySelectorAll('.btn').forEach((b, idx) => b.classList.toggle('active', idx === i));
}
document.querySelectorAll('.btn').forEach((b, i) => {
    b.addEventListener('click', () => setActiveBtn(i));
});
function applyFilters() {
    const q = document.getElementById('search').value.toLowerCase();
    document.querySelectorAll('#tbody tr').forEach(tr => {
        const matchClass = !activeClass || tr.classList.contains(activeClass);
        const matchText = !q || tr.textContent.toLowerCase().includes(q);
        tr.style.display = (matchClass && matchText) ? '' : 'none';
    });
}
function applySearch() { applyFilters(); }
</script>
</body>
</html>`;

fs.writeFileSync(outputPath, html, 'utf8');
console.log('Generated: public/admin-images.html');
console.log(`Missing: ${byStatus.missing.length} | OK: ${byStatus.ok.length} | No ref: ${byStatus.noRef.length}`);
