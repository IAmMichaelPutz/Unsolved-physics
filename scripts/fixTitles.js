const fs = require('fs');
const path = require('path');

const FILE_PATH = path.join(__dirname, '..', 'src', 'data', 'tasks.json');
const data = JSON.parse(fs.readFileSync(FILE_PATH, 'utf8'));

const manualFixes = {
    'task_22': 'Öltröpfchen im elektrischen Feld',
    'task_145': 'Rotierende Kreisscheibe',
    'task_149': 'Halbzylinder im Schwerefeld',
    'task_170': 'Masse an horizontaler Stange',
    'task_171': 'Streuung an harter Kugel',
    'task_174': 'Gedämpfter harmonischer Oszillator',
    'task_218': 'Phasen- und Gruppengeschwindigkeit',
    'task_260': 'Ortswellenfunktion und Wahrscheinlichkeiten',
    'task_261': 'Eindimensionale Potentialbarriere',
    'task_264': 'Tunneln durch Potentialbarriere',
    'task_265': 'Teilchen im Potentialkasten',
    'task_270': 'Rutherford-Streuung an Goldfolie',
    'task_274': 'Streuung und Interferenz'
};

let fixedCount = 0;

data.tasks.forEach(t => {
    let originalTitle = t.title;

    // Apply manual fixes based on content analysis
    if (manualFixes[t.id]) {
        t.title = manualFixes[t.id];
    }
    
    // Clean up generic suffixes and fix spelling errors
    if (t.title) {
        t.title = t.title
            .replace(' - Experimentalphysik 3', '')
            .replace(' - Experimentalphysik 4', '')
            .replace(' - Kurzfragen', '')
            .replace('ltröpfchen', 'Öltröpfchen')
            .replace(/^Aufgabe_\d+$/, 'Übungsaufgabe')
            .replace(/^Aufgabenstellung$/, 'Übungsaufgabe')
            .replace('Kurze Fragen der Mechanik', 'Kurzfragen zur Mechanik');
    }

    if (originalTitle !== t.title) {
        fixedCount++;
        // If we also translated this title to English already, we should reset it so the user knows it needs re-translation or it translates correctly next time
        // But since the translation stopped at task 30, we leave it as is or reset. We just leave it.
    }
});

fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2), 'utf8');
console.log(`Titles fixed successfully! Adjusted ${fixedCount} titles.`);
