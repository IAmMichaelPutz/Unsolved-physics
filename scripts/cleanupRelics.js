const fs = require('fs');
const path = require('path');

const FILE_PATH = path.join(__dirname, '..', 'src', 'data', 'tasks.json');
const data = JSON.parse(fs.readFileSync(FILE_PATH, 'utf8'));

let cleanedCount = 0;

const cleanText = (text) => {
    if (!text) return text;
    let newText = text;
    
    // Sucht nach Relikten wie:
    // id="solution">
    // id="solution"&gt;
    // id="solution1"&gt;
    // id=&quot;solution&quot;&gt;
    // id="task">
    const regex = /id=(?:&quot;|"|')?(?:solution|task)\d*(?:&quot;|"|')?(?:&gt;|>)/gi;
    newText = newText.replace(regex, '');
    
    // Bereinige auch mögliche leere Zeilen am Anfang, die durch das Löschen entstanden sind
    return newText.trim();
};

data.tasks.forEach(task => {
    let modified = false;
    ['content', 'solution', 'content_en', 'solution_en'].forEach(field => {
        if (task[field]) {
            const cleaned = cleanText(task[field]);
            if (cleaned !== task[field]) {
                task[field] = cleaned;
                modified = true;
            }
        }
    });
    if (modified) cleanedCount++;
});

fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2), 'utf8');
console.log(`Cleanup complete! Removed relics from ${cleanedCount} tasks.`);
