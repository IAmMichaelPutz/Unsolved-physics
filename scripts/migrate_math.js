const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const BASE_DIR = path.join(__dirname, '..', '..', 'basic-courses', 'mathematical-foundation');
const DB_FILE = path.join(__dirname, '..', 'src', 'data', 'tasks.json');

const subfolders = ['ana1', 'ana2', 'ana3', 'la1', 'la2', 'vorkurs'];

let db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
let highestId = db.tasks.reduce((max, task) => {
    const num = parseInt(task.id.replace('task_', ''), 10);
    return num > max ? num : max;
}, 0);

let addedCount = 0;

subfolders.forEach(subfolder => {
    const dirPath = path.join(BASE_DIR, subfolder);
    if (!fs.existsSync(dirPath)) return;

    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.html') && f !== 'index.html');
    
    files.forEach(file => {
        const filePath = path.join(dirPath, file);
        const html = fs.readFileSync(filePath, 'utf8');
        const $ = cheerio.load(html);
        
        const taskContent = $('.task').html();
        const solutionContent = $('.solution').html() || '';
        
        if (taskContent) {
            highestId++;
            
            // Generate a nice title based on file name
            let title = file.replace('.html', '').replace(/-/g, ' ');
            title = title.charAt(0).toUpperCase() + title.slice(1);
            if (title.startsWith('Aufgabe')) title = 'Übungsaufgabe';

            db.tasks.push({
                id: `task_${highestId}`,
                topicId: 'mathematical-foundation',
                category: 'basic-courses',
                classification: subfolder.toUpperCase(), // e.g. "ANA1", "LA2"
                title: title,
                content: taskContent,
                solution: solutionContent,
                difficulty: "Medium",
                tags: [subfolder]
            });
            addedCount++;
        }
    });
});

fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf8');
console.log(`Successfully migrated ${addedCount} math foundation tasks to tasks.json`);
