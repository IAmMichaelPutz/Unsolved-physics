const fs = require('fs');
const tasksPath = './src/data/tasks.json';
const data = JSON.parse(fs.readFileSync(tasksPath, 'utf8'));

// 1. Fix HTML entities like &#x27; -> ' and &quot; -> "
const fixEntities = (str) => {
    if (!str) return str;
    return str.replace(/&#x27;/g, "'")
              .replace(/&quot;/g, '\\"')
              .replace(/&amp;/g, '&')
              .replace(/&lt;/g, '<')
              .replace(/&gt;/g, '>');
};

let modified = 0;
data.tasks.forEach(t => {
    ['title_en', 'content_en', 'solution_en'].forEach(k => {
        if (t[k] && typeof t[k] === 'string' && t[k].includes('&#x27;')) {
            t[k] = fixEntities(t[k]);
            modified++;
        }
    });
});

if (modified > 0) {
    fs.writeFileSync(tasksPath, JSON.stringify(data, null, 2), 'utf8');
    console.log('Fixed HTML entities in ' + modified + ' fields in tasks.json.');
}

const coursesPath = './src/data/courses.json';
const courses = JSON.parse(fs.readFileSync(coursesPath, 'utf8'));

// 2. Reorder categories: Mathematische Grundlagen, Mechanik, Elektrodynamik, Optik, Atom- und Molekuelphysik, Quantenmechanik, ... Rest
const order = [
    'mathematische_methoden', // Mathematische Grundlagen
    'mechanik',
    'electrodynamics',
    'optik',
    'atom_und_molekuelphysik',
    'quantenmechanik'
];

courses.categories.sort((a, b) => {
    const indexA = order.indexOf(a.id);
    const indexB = order.indexOf(b.id);
    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    return 0; // maintain original order for rest
});

fs.writeFileSync(coursesPath, JSON.stringify(courses, null, 2), 'utf8');
console.log('Reordered courses.json.');
