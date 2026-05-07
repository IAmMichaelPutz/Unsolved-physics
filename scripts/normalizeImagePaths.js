const fs = require('fs');
const path = require('path');

const tasksPath = path.join(__dirname, '..', 'src', 'data', 'tasks.json');
const data = JSON.parse(fs.readFileSync(tasksPath, 'utf8'));

let totalChanged = 0;
let imageMappings = []; // log of old -> new

data.tasks.forEach(task => {
    let imgIndex = 0;

    const replaceImgSrcs = (html) => {
        if (!html) return html;
        return html.replace(/src="([^"]+\.(png|jpg|jpeg|gif|svg|webp))"/gi, (match, oldSrc) => {
            // Already uses the correct standardized path
            if (oldSrc.startsWith(`/images/${task.id}`)) {
                imgIndex++;
                return match;
            }

            imgIndex++;
            // If task has only 1 image: /images/task_XXX.png
            // Multiple images will be handled after full pass - for now generate with index
            const ext = path.extname(oldSrc).toLowerCase() || '.png';
            const newSrc = imgIndex === 1
                ? `/images/${task.id}${ext}`
                : `/images/${task.id}_${imgIndex}${ext}`;

            imageMappings.push({ taskId: task.id, title: task.title, oldSrc, newSrc });
            totalChanged++;
            return `src="${newSrc}"`;
        });
    };

    task.content = replaceImgSrcs(task.content);
    task.solution = replaceImgSrcs(task.solution);
    if (task.content_en) task.content_en = replaceImgSrcs(task.content_en);
    if (task.solution_en) task.solution_en = replaceImgSrcs(task.solution_en);
});

fs.writeFileSync(tasksPath, JSON.stringify(data, null, 2), 'utf8');

// Write a mapping log so the user knows what was renamed
const logPath = path.join(__dirname, '..', 'public', 'image-rename-log.json');
fs.writeFileSync(logPath, JSON.stringify(imageMappings, null, 2), 'utf8');

console.log(`Done. Updated ${totalChanged} image references in tasks.json.`);
console.log('Rename log written to: public/image-rename-log.json');
console.log('\nImage renaming guide:');
imageMappings.forEach(m => {
    console.log(`  ${m.taskId} (${m.title})`);
    console.log(`    OLD: ${m.oldSrc}`);
    console.log(`    NEW: ${m.newSrc}`);
});
