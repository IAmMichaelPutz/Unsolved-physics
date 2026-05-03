const PhysicsPortal = () => {
  const quantumExercises = {
    "Grundlegende Konzepte": [
      { name: "Grundlagen der Quantenmechanik", href: "Aufgabe_57.html" },
      { name: "Quantenmechanik - Grundkonzepte", href: "Aufgabe_85.html" },
      { name: "Quantenmechanik: Grundlegende Konzepte", href: "Aufgabe_86.html" },
      { name: "Welle-Teilchen-Dualismus", href: "Aufgabe_99.html" },
      { name: "Unschärferelation", href: "Aufgabe_94.html" },
      { name: "Heisenberg'sche Unschärferelation beim Doppelspaltexperiment", href: "Aufgabe_66.html" }
    ],
    "Atomphysik": [
      { name: "Atomstrahlexperiment", href: "Aufgabe_38.html" },
      { name: "Bohrsches Atommodell", href: "Aufgabe_46.html" },
      { name: "Bohrsches Atommodell - Korrespondenzprinzip", href: "Aufgabe_43.html" },
      { name: "Bohrsches Atommodell - Strahlungsfrequenz", href: "Aufgabe_44.html" },
      { name: "Bohrsches Atommodell in der Festkörperphysik", href: "Aufgabe_45.html" }
    ],
    "Wasserstoffatom und Spektren": [
      { name: "Aufenthaltswahrscheinlichkeiten im Wasserstoffatom", href: "Aufgabe_39.html" },
      { name: "Wasserstoffatom", href: "Aufgabe_95.html" },
      { name: "Wasserstoffspektrum", href: "Aufgabe_97.html" },
      { name: "Feinstruktur des Wasserstoffs", href: "Aufgabe_54.html" },
      { name: "Feinstruktur in wasserstoffähnlichen Atomen", href: "Aufgabe_55.html" }
    ],
    "Wellenfunktionen": [
      { name: "Quantenmechanische Wellenfunktion", href: "Aufgabe_87.html" },
      { name: "Wellenpaket", href: "Aufgabe_98.html" },
      { name: "Ortswellenfunktion und Wahrscheinlichkeitsinterpretation", href: "Aufgabe_79.html" },
      { name: "Wellenpakete", href: "Aufgabe_106.html" }
    ],
    "Potentiale und Oszillatoren": [
      { name: "Potentialbarriere", href: "Aufgabe_48.html" },
      { name: "Potentialkasten", href: "Aufgabe_82.html" },
      { name: "Potentialmulde", href: "Aufgabe_83.html" },
      { name: "Potentialstufe", href: "Aufgabe_84.html" },
      { name: "Eindimensionaler harmonischer Oszillator", href: "Aufgabe_51.html" },
      { name: "Harmonischer Oszillator", href: "Aufgabe_65.html" }
    ],
    "Drehimpuls und Magnetismus": [
      { name: "Drehimpulskopplung", href: "Aufgabe_50.html" },
      { name: "Kopplung von Drehimpulsen und spektroskopische Notation", href: "Aufgabe_73.html" },
      { name: "Magnetischer Dipol", href: "Aufgabe_75.html" },
      { name: "Stern-Gerlach Experiment", href: "Aufgabe_90.html" },
      { name: "Zeeman-Effekt", href: "Aufgabe_100.html" }
    ],
    "Mehrteilchensysteme": [
      { name: "Helium", href: "Aufgabe_67.html" },
      { name: "Lithiummoleküle", href: "Aufgabe_74.html" },
      { name: "Mehrelektronenatome", href: "Aufgabe_76.html" },
      { name: "Pauli-Prinzip, Gesamtdrehimpuls des Atoms", href: "Aufgabe_80.html" }
    ],
    "Streuung und Experimente": [
      { name: "Bragg-Winkel", href: "Aufgabe_47.html" },
      { name: "Rutherfordstreuung", href: "Aufgabe_89.html" },
      { name: "Streuung am Coulomb-Feld", href: "Aufgabe_91.html" },
      { name: "Kernspintomograph", href: "Aufgabe_72.html" }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="fixed w-full bg-white bg-opacity-80 backdrop-blur-lg border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
            Unsolved Physics Fun
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 pt-24 pb-16">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
          Allgemeine Fragen zur Quantenmechanik
        </h1>

        <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
          <h2 className="text-xl font-semibold mb-4">Theoretische Grundlagen</h2>
          <p className="text-gray-700">
            Eine Sammlung von Physikübungen mit ausführlichen Lösungen. Wählen Sie eine Übung aus dem Inhaltsverzeichnis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(quantumExercises).map(([category, exercises]) => (
            <div key={category} className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">{category}</h3>
              <ul className="space-y-2">
                {exercises.map((exercise, idx) => (
                  <li key={idx}>
                    <a 
                      href={exercise.href}
                      className="text-gray-700 hover:text-blue-500 transition-colors"
                    >
                      {exercise.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

ReactDOM.render(<PhysicsPortal />, document.getElementById('root'));