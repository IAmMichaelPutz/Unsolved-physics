const fs = require('fs');
const path = require('path');
const axios = require('axios');

const API_KEY = '6d698f6f-85ed-4032-9c5d-ab6ac74997ec:fx';
const API_URL = 'https://api-free.deepl.com/v2/translate';
const FILE_PATH = path.join(__dirname, '..', 'src', 'data', 'tasks.json');

async function translateText(text) {
    if (!text || text.trim() === '') return '';
    try {
        const response = await axios.post(API_URL, {
            text: [text],
            target_lang: 'EN-US',
            tag_handling: 'html' // Keeps HTML and MathJax intact!
        }, {
            headers: {
                'Authorization': `DeepL-Auth-Key ${API_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data.translations[0].text;
    } catch (error) {
        if (error.response && error.response.status === 456) {
            console.error("DEEPL LIMIT ERREICHT (456 Quota exceeded). Das Limit des Free-Abos ist aufgebraucht.");
        } else {
            console.error("DeepL API Error:", error.response ? error.response.data : error.message);
        }
        throw error;
    }
}

async function runTranslation() {
    console.log("Lade Aufgaben...");
    const rawData = fs.readFileSync(FILE_PATH, 'utf8');
    const data = JSON.parse(rawData);
    const tasks = data.tasks;

    let totalChars = 0;
    
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        
        // Skip if already translated
        if (task.title_en && task.content_en && task.solution_en) {
            continue;
        }

        console.log(`Übersetze Aufgabe ${i + 1}/${tasks.length}: ${task.title}...`);
        
        try {
            if (!task.title_en && task.title) {
                task.title_en = await translateText(task.title);
                totalChars += task.title.length;
            }
            if (!task.content_en && task.content) {
                task.content_en = await translateText(task.content);
                totalChars += task.content.length;
            }
            if (!task.solution_en && task.solution) {
                task.solution_en = await translateText(task.solution);
                totalChars += task.solution.length;
            }

            // Save after every task so we never lose progress if it crashes
            fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2), 'utf8');
            
            // Short delay to avoid hitting rate limits
            await new Promise(r => setTimeout(r, 200));
            
        } catch (e) {
            console.log(`Abgebrochen bei Aufgabe ${i+1}. Bisher verarbeitete Zeichen in dieser Sitzung: ${totalChars}`);
            break; 
        }
    }
    console.log(`Übersetzungsprozess beendet. Zeichen verarbeitet: ${totalChars}`);
}

runTranslation();
