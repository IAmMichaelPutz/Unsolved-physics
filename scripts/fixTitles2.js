const fs = require('fs');
const path = require('path');

const FILE_PATH = path.join(__dirname, '..', 'src', 'data', 'tasks.json');
const data = JSON.parse(fs.readFileSync(FILE_PATH, 'utf8'));

const manualFixes = {
    'task_22': 'Öltröpfchen im elektrischen Feld',
    'task_31': 'System von Differentialgleichungen',
    'task_48': 'Elektrisches Feld einer Hohlkugel',
    'task_49': 'Feldenergie einer homogen geladenen Kugel',
    'task_53': 'Satz von Gauß verifizieren',
    'task_56': 'Green-Funktion des Laplace-Operators',
    'task_70': 'Partielle Differentialgleichung lösen',
    'task_92': 'Satz von Stokes verifizieren'
};

data.tasks.forEach(t => {
    // 1. Fix die restlichen generischen Übungsaufgaben anhand der ermittelten Inhalte
    if (manualFixes[t.id]) {
        t.title = manualFixes[t.id];
        // Überschreibe auch die englische Übersetzung falls vorhanden, damit die Titel übereinstimmen
        if (t.title_en) {
            t.title_en = ""; 
        }
    }
    
    // 2. Behebe den ÖÖltröpfchen Bug (doppeltes Ö durch Regex-Replace Fehler)
    if (t.title && t.title.includes('ÖÖltröpfchen')) {
        t.title = t.title.replace('ÖÖltröpfchen', 'Öltröpfchen');
        if (t.title_en) t.title_en = ""; 
    }
});

fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2), 'utf8');
console.log("Titles completely fixed!");
