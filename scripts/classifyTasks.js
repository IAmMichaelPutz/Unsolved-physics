const fs = require('fs');
const path = require('path');

const FILE_PATH = path.join(__dirname, '..', 'src', 'data', 'tasks.json');
const data = JSON.parse(fs.readFileSync(FILE_PATH, 'utf8'));

// Regelbasierte Klassifizierung basierend auf Schlüsselwörtern im Titel oder Inhalt
const classifyTask = (task) => {
    // Wenn es schon eine Klassifikation gibt (z.B. ANA1 aus dem Mathe-Vorkurs), behalten wir sie
    if (task.topicId === 'mathematical-foundation' && task.classification) {
        return task.classification;
    }

    const title = (task.title || '').toLowerCase();
    const content = (task.content || '').toLowerCase();
    const text = title + " " + content;

    switch (task.topicId) {
        case 'mechanics':
            if (text.includes('lagrange') || text.includes('zwangsbedingung')) return 'Lagrange-Formalismus';
            if (text.includes('hamilton') || text.includes('poisson') || text.includes('kanonisch')) return 'Hamilton-Mechanik';
            if (text.includes('trägheit') || text.includes('kreisel') || text.includes('starrer körper') || text.includes('zylinder')) return 'Starrer Körper';
            if (text.includes('pendel') || text.includes('oszillator') || text.includes('schwing')) return 'Schwingungen & Oszillatoren';
            if (text.includes('streu') || text.includes('zentral') || text.includes('kepler') || text.includes('planet')) return 'Zentralfeld & Streuung';
            if (text.includes('stoß') || text.includes('erhaltung')) return 'Erhaltungssätze';
            if (text.includes('wurf') || text.includes('schiefe ebene') || title.includes('kinematik') || title.includes('dynamik')) return 'Kinematik & Dynamik';
            return 'Grundlagen & Vermischtes';

        case 'electrodynamics':
            if (text.includes('kondensator') || text.includes('dielektrikum') || text.includes('polarisation')) return 'Elektrostatik in Materie';
            if (text.includes('potential') || text.includes('ladung') || text.includes('gauß') || text.includes('dipol') || text.includes('coulomb')) return 'Elektrostatik';
            if (text.includes('spule') || text.includes('induktion') || text.includes('magnet') || text.includes('biot') || text.includes('ampere')) return 'Magnetostatik & Induktion';
            if (text.includes('maxwell') || text.includes('welle') || text.includes('strahlung') || text.includes('retardiert')) return 'Elektromagnetische Wellen';
            if (text.includes('relativ')) return 'Relativistische Elektrodynamik';
            return 'Grundlagen & Vermischtes';

        case 'quantum-theory':
            if (text.includes('wasserstoff') || text.includes('atom') || text.includes('bohr')) return 'Wasserstoff & Atome';
            if (text.includes('spin') || text.includes('zeeman') || text.includes('feinstruktur') || text.includes('hyperfein') || text.includes('pauli')) return 'Spin & Feinstruktur';
            if (text.includes('oszillator')) return 'Harmonischer Oszillator';
            if (text.includes('potential') && (text.includes('kasten') || text.includes('barriere') || text.includes('stufe') || text.includes('mulde'))) return '1D Potentiale';
            if (text.includes('streu') || text.includes('rutherford') || text.includes('born')) return 'Streutheorie';
            if (text.includes('störung')) return 'Störungstheorie';
            if (text.includes('wellenpaket') || text.includes('unschärfe') || text.includes('wahrscheinlichkeit') || text.includes('grundlagen')) return 'Grundlagen & Postulate';
            return 'Vermischtes';

        case 'thermodynamics':
            if (text.includes('kreisprozess') || text.includes('carnot')) return 'Kreisprozesse';
            if (text.includes('entropie') || text.includes('hauptsatz')) return 'Hauptsätze der Thermodynamik';
            if (text.includes('ideal') || text.includes('gas') || text.includes('van der waals')) return 'Gase';
            if (text.includes('statistik') || text.includes('zustandssumme') || text.includes('boltzmann') || text.includes('fermi') || text.includes('bose')) return 'Statistische Physik';
            return 'Grundlagen & Vermischtes';

        case 'optics':
            if (text.includes('linse') || text.includes('spiegel') || text.includes('teleskop') || text.includes('mikroskop') || text.includes('brennweite')) return 'Geometrische Optik';
            if (text.includes('interferenz') || text.includes('beugung') || text.includes('gitter') || text.includes('spalt')) return 'Wellenoptik';
            if (text.includes('laser') || text.includes('schwarzer körper') || text.includes('strahl')) return 'Photonik & Strahlung';
            return 'Vermischtes';

        default:
            return 'Übungsaufgaben';
    }
};

let classifiedCount = 0;

data.tasks.forEach(t => {
    const newClass = classifyTask(t);
    if (newClass !== t.classification) {
        t.classification = newClass;
        classifiedCount++;
    }
});

fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2), 'utf8');
console.log(`Klassifizierung abgeschlossen! ${classifiedCount} Aufgaben aktualisiert.`);
