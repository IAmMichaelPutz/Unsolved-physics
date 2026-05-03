const fs = require('fs');
const path = require('path');

const FILE_PATH = path.join(__dirname, '..', 'src', 'data', 'tasks.json');
const data = JSON.parse(fs.readFileSync(FILE_PATH, 'utf8'));

data.tasks.forEach(t => {
    if (t.topicId === 'mathematical-foundation') {
        let title = t.title;
        
        // Wörter ausschreiben & korrigieren
        title = title.replace('Diffbarkeit', 'Differenzierbarkeit');
        title = title.replace('Sup Inf', 'Supremum & Infimum');
        title = title.replace('Haufungswerte', 'Häufungswerte');
        title = title.replace('Beweis ungleichung', 'Beweis von Ungleichungen');
        
        // Jedes Wort groß schreiben
        title = title.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

        // Ziffern am Ende in "(Teil X)" umwandeln (z.B. "Differenzierbarkeit 2" -> "Differenzierbarkeit (Teil 2)")
        title = title.replace(/ (\d+)$/, ' (Teil $1)');
        
        t.title = title;
        if (t.title_en) t.title_en = ""; // Reset english title if it exists so it matches
    }
});

fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2), 'utf8');
console.log("Math titles fixed!");
