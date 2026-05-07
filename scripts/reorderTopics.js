const fs = require('fs');
const coursesPath = './src/data/courses.json';
const courses = JSON.parse(fs.readFileSync(coursesPath, 'utf8'));

// The user wants: Mathematische Grundlagen, Mechanik, Elektrodynamik, Optik, Atom- und Molekülphysik, Quantenmechanik, ... Rest
const order = [
    'mathematical-foundation', // Mathematische Grundlagen
    'mechanics',               // Mechanik
    'electrodynamics',         // Elektrodynamik
    'optics',                  // Optik
    'atom-molecular',          // Atom- und Molekülphysik
    'quantum-theory'           // Quantenmechanik
];

const basicCourses = courses.categories.find(c => c.id === 'basic-courses');

if (basicCourses) {
    basicCourses.topics.sort((a, b) => {
        const indexA = order.indexOf(a.id);
        const indexB = order.indexOf(b.id);
        if (indexA !== -1 && indexB !== -1) return indexA - indexB;
        if (indexA !== -1) return -1;
        if (indexB !== -1) return 1;
        return 0; // maintain original order for rest
    });
}

fs.writeFileSync(coursesPath, JSON.stringify(courses, null, 2), 'utf8');
console.log('Reordered basic-courses topics.');
