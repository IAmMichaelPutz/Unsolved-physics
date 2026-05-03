const PhysicsPortal = () => {
  const electrodynamicsContent = {
    "Theoretische Physik": {
      "Grundlegende Konzepte": [
        { name: "Satz von Gauß", href: "Aufgabe_166.html" },
        { name: "Verifikation des Gaußschen Satzes", href: "Aufgabe_167.html" },
        { name: "Satz von Stokes", href: "Aufgabe_200.html" },
        { name: "Verifikation des Stokesschen Satzes", href: "Aufgabe_201.html" },
        { name: "Maxwellgleichungen", href: "Aufgabe_177.html" },
        { name: "Green-Funktion", href: "Aufgabe_169.html" },
        { name: "Potentiale und Felder", href: "Aufgabe_186.html" }
      ],
      "Multipolentwicklung und Ladungsverteilungen": [
        { name: "Multipolentwicklung", href: "Aufgabe_153.html" },
        { name: "Multipolentwicklung", href: "Aufgabe_209.html" },
        { name: "Sphärisch symmetrische Ladungsverteilungen", href: "Aufgabe_210.html" },
        { name: "Ladungsdichte für Kugelschale und Kreisscheibe", href: "Aufgabe_141.html" },
        { name: "Ladungsdichte des Wasserstoffatoms", href: "Aufgabe_206.html" }
      ],
      "Kondensatoren und Dielektrika": [
        { name: "Entladung eines Kondensators", href: "Aufgabe_140.html" },
        { name: "Dielektrikum und Grenzbedingungen", href: "Aufgabe_143.html" },
        { name: "Dielektrikum zwischen Kugelschalen", href: "Aufgabe_144.html" },
        { name: "Dielektrische Kugel im elektrischen Feld", href: "Aufgabe_145.html" },
        { name: "Plattenkondensator mit Dielektrika", href: "Aufgabe_182.html" },
        { name: "Plattenkondensator mit teilweise eingeschobenem Dielektrikum", href: "Aufgabe_183.html" },
        { name: "Zylinderkondensator", href: "Aufgabe_207.html" }
      ]
    },
    "Experimentelle Physik": {
      "Elektrostatische Systeme": [
        { name: "Kontinuierliche Ladungsverteilung", href: "Aufgabe_6.html" },
        { name: "Kugel mit Hohlraum", href: "Aufgabe_7.html" },
        { name: "Kugelkondensator", href: "Aufgabe_8.html" },
        { name: "Kugelkondensatoren", href: "Aufgabe_9.html" },
        { name: "Plattenkondensator", href: "Aufgabe_14.html" },
        { name: "Potential einer geladenen Kreislinie", href: "Aufgabe_15.html" },
        { name: "Punktförmige Ladungsverteilung", href: "Aufgabe_16.html" }
      ],
      "Magnetfelder und Induktion": [
        { name: "Magnetfeld eines Stromleiters", href: "Aufgabe_11.html" },
        { name: "Magnetisches Dipolmoment einer Stromschleife", href: "Aufgabe_12.html" },
        { name: "Magnetisierbarer Halbraum", href: "Aufgabe_13.html" },
        { name: "Spule mit Gleichstrom", href: "Aufgabe_18.html" },
        { name: "Toroid", href: "Aufgabe_19.html" }
      ],
      "Technische Anwendungen": [
        { name: "Allpass-Filter", href: "Aufgabe_1.html" },
        { name: "Braunsche Röhre", href: "Aufgabe_2.html" },
        { name: "Elektromagnetische Welle", href: "Aufgabe_4.html" },
        { name: "Öltröpfchen im elektrischen Feld", href: "Aufgabe_10.html" },
        { name: "Relativistische Raumfähre", href: "Aufgabe_17.html" },
        { name: "Wellengleichung im leitenden Medium", href: "Aufgabe_21.html" }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="fixed w-full bg-white bg-opacity-80 backdrop-blur-lg border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
            Unsolved Physics Fun
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="/" className="text-gray-800 hover:text-blue-500 font-medium">Kurse</a>
            <a href="/blog" className="text-gray-800 hover:text-blue-500 font-medium">Blog</a>
            <a href="/jobs" className="text-gray-800 hover:text-blue-500 font-medium">Jobs</a>
            <a href="/data" className="text-gray-800 hover:text-blue-500 font-medium">Datenportal</a>
            <button className="bg-blue-500 text-white px-6 py-2 rounded-full font-semibold">
              Login
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 pt-24 pb-16">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
          Elektrodynamik
        </h1>

        <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
          <h2 className="text-xl font-semibold mb-4">Theoretische Grundlagen</h2>
          <p className="text-gray-700">
            Eine Sammlung von Physikübungen mit ausführlichen Lösungen. Wählen Sie eine Übung aus den untenstehenden Themengebieten.
          </p>
        </div>

        {Object.entries(electrodynamicsContent).map(([mainCategory, subcategories]) => (
          <div key={mainCategory} className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">{mainCategory}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(subcategories).map(([subcategory, exercises]) => (
                <div key={subcategory} className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">{subcategory}</h3>
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
          </div>
        ))}
      </main>
    </div>
  );
};

ReactDOM.render(<PhysicsPortal />, document.getElementById('root'));