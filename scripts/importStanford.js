const fs = require('fs');

const oldData = JSON.parse(fs.readFileSync('../old_archive/blog/stanford-qualifying-exam/data.json', 'utf8'));
const tasksPath = './src/data/tasks.json';
const newData = JSON.parse(fs.readFileSync(tasksPath, 'utf8'));

// Find next task id
const maxId = newData.tasks.reduce((max, t) => {
    const num = parseInt((t.id || '').replace('task_', '')) || 0;
    return num > max ? num : max;
}, 0);

const newTasks = oldData.map((item, i) => ({
    id: `task_${maxId + i + 1}`,
    topicId: 'stanford-qualifying-exam',
    category: 'exams',
    classification: 'PhD',
    title: item.Thema.trim(),
    content: `<h2>${item.Thema.trim()}</h2>`,
    solution: `<h3>Antwort</h3><p>${item.Antwort.trim()}</p>`,
    difficulty: 'Hard',
    tags: ['stanford', 'qualifying-exam', 'phd']
}));

newData.tasks.push(...newTasks);
fs.writeFileSync(tasksPath, JSON.stringify(newData, null, 2), 'utf8');
console.log(`Added ${newTasks.length} Stanford Qualifying Exam tasks.`);
