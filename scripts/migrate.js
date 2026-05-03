const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const BASE_DIR = path.join(__dirname, '..', '..');
const OUTPUT_FILE = path.join(__dirname, '..', 'src', 'data', 'tasks.json');

const directoriesToScan = ['basic-courses', 'advanced-courses'];
const tasks = [];
let idCounter = 1;

directoriesToScan.forEach(dir => {
    const dirPath = path.join(BASE_DIR, dir);
    if (!fs.existsSync(dirPath)) return;

    const topics = fs.readdirSync(dirPath);
    topics.forEach(topic => {
        const topicPath = path.join(dirPath, topic);
        if (fs.statSync(topicPath).isDirectory()) {
            const files = fs.readdirSync(topicPath).filter(f => f.endsWith('.html') && f !== 'index.html');
            
            files.forEach(file => {
                const filePath = path.join(topicPath, file);
                const html = fs.readFileSync(filePath, 'utf-16le'); // Read as UTF-16LE or UTF-8 depending on encoding
                
                // If the file is not UTF-16LE, fallback to UTF-8
                let content = html;
                if (!content.includes('<!DOCTYPE html>')) {
                    content = fs.readFileSync(filePath, 'utf8');
                }

                const $ = cheerio.load(content);
                
                const title = $('title').text().trim() || file.replace('.html', '');
                const taskContent = $('.task').html() || '';
                const solutionContent = $('.solution').html() || '';

                if (taskContent) {
                    tasks.push({
                        id: `task_${idCounter++}`,
                        topicId: topic,
                        category: dir,
                        title: title,
                        content: taskContent.trim(),
                        solution: solutionContent.trim(),
                        difficulty: 'medium', // Default value
                        tags: []
                    });
                }
            });
        }
    });
});

fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
fs.writeFileSync(OUTPUT_FILE, JSON.stringify({ tasks }, null, 2), 'utf8');
console.log(`Successfully migrated ${tasks.length} tasks to ${OUTPUT_FILE}`);
