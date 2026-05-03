# Infrastruktur- und Architekturplan: Unsolved Physics App

## 1. Systemarchitektur & Technologie-Stack

Die Webseite wird von einer stark fragmentierten, statischen Multi-Page-Architektur (viele `.html`-Dateien) in eine hochmoderne **Single Page Application (SPA)** umgebaut. 

- **Framework:** Next.js (App Router, React 18/19)
- **Styling:** Tailwind CSS (für Utility-First CSS und modernes Design)
- **UI-Komponenten:** shadcn/ui (für moderne, zugängliche Radix-Komponenten wie Sidebar, Cards, Tabs)
- **Paketmanager:** npm
- **Datenquelle:** Zentralisierte JSON-Dateien (z. B. `tasks.json`, `jobs.json`, `blog.json`), um die Inhalte (Kurse, Jobs, Artikel) dynamisch zu laden.

## 2. Struktur der Applikation (Single Page Approach)

Anstatt durch unzählige Unterseiten zu navigieren, wird die Applikation als interaktives Dashboard aufgebaut:

- **Globale Navigation:** Eine Sidebar (links) oder Top-Navigation mit den Hauptbereichen: **Kurse**, **Blog**, **Jobs**, **Datenportal**.
- **Kurs-Dashboard (Startseite):** Zeigt zwei Hauptsektionen:
  - **Basiskurse:** Mechanik, Elektrodynamik, Quantenmechanik, Thermodynamik, Atom- und Molekülphysik, Relativitätstheorie, Kernphysik, Optik, Mathematische Grundlagen.
  - **Fortgeschrittene Kurse:** Hydrodynamik, Dünne Filme, Supraleiter, Festkörperphysik (und alle noch inaktiven Kurse wie Astrophysik als "Coming Soon"-Cards).
- **Inhaltsansicht (Main Area):** Klickt man auf einen Kurs, öffnet sich dynamisch die Liste der Aufgaben (Aufgabe 1, 2, 3...) ohne Page Reload. Klickt man auf eine Aufgabe, wird deren Inhalt sowie die Lösung (via Accordion oder Tabs) angezeigt.

## 3. Datenmodell (JSON)

Anstelle der unzähligen `Aufgabe_X.html` Dateien, wird der gesamte physikalische Content in ein strukturiertes JSON-Format überführt.

### `data/courses.json`
```json
{
  "categories": [
    {
      "id": "basic-courses",
      "title": "Klausuren, Übungen und Lösungen zu den Basiskursen",
      "topics": [
        { "id": "mechanics", "name": "Mechanik", "path": "/courses/basic/mechanics" },
        { "id": "electrodynamics", "name": "Elektrodynamik", "path": "/courses/basic/electrodynamics" },
        { "id": "quantum-theory", "name": "Quantenmechanik", "path": "/courses/basic/quantum-theory" }
        // ... alle weiteren Basiskurse
      ]
    },
    {
      "id": "advanced-courses",
      "title": "Fortgeschrittene Kurse",
      "topics": [
        { "id": "hydrodynamics", "name": "Hydrodynamik", "isActive": true },
        { "id": "astrophysics", "name": "Astrophysik", "isActive": false }
        // ... alle weiteren fortgeschrittenen Kurse
      ]
    }
  ]
}
```

### `data/tasks.json`
```json
{
  "tasks": [
    {
      "id": "aufgabe_1",
      "topicId": "electrodynamics",
      "title": "Aufgabe 1: Elektrisches Feld",
      "content": "<p>Aufgabentext...</p>",
      "solution": "<p>Lösungsweg...</p>",
      "difficulty": "medium",
      "tags": ["Feldlinien", "Coulomb"]
    }
  ]
}
```
*(Zusätzlich können `jobs.json` und `blog.json` für die restlichen Menüpunkte angelegt werden.)*

## 4. Geplante Ordnerstruktur (Next.js App Router)

```text
modern-app/
├── public/                 
│   └── assets/             # Bilder, Logos, Favicon (z.B. favicon-32x32.png)
├── src/
│   ├── app/                
│   │   ├── layout.tsx      # Globales Layout (Header + Navigation + Footer)
│   │   ├── page.tsx        # Startseite (Dashboard mit Kursübersicht)
│   │   ├── courses/        # Dynamische Routen für Kurse
│   │   │   └── [topic]/
│   │   │       └── page.tsx # Zeigt alle Aufgaben für z.B. "Mechanik"
│   │   ├── blog/page.tsx
│   │   ├── jobs/page.tsx
│   │   ├── data/page.tsx   # Datenportal
│   │   └── globals.css     
│   ├── components/         
│   │   ├── ui/             # shadcn UI (Cards, Buttons, Accordions)
│   │   ├── Navigation.tsx  # Menü (Kurse, Blog, Jobs, Datenportal)
│   │   ├── HeroSection.tsx # "Physik & Mathematik im Studium..."
│   │   └── TaskViewer.tsx  # Rendert die Aufgabe und die Lösung
│   ├── data/               
│   │   ├── courses.json    # Kategorien und Themen-Struktur
│   │   ├── tasks.json      # Alle Übungsaufgaben (migriert aus HTML)
│   │   └── jobs.json       # Job-Einträge
│   └── lib/                # Hilfsfunktionen (z.B. JSON-Parser)
├── package.json
└── tailwind.config.ts
```

## 5. Migrations-Phasen

1. **Setup & Initialisierung:** Next.js App erstellen, Tailwind & shadcn konfigurieren.
2. **Layout & UI:** Header, Navigation und Hero-Section exakt nach den Inhalten der alten `index.html` aufbauen, aber modern gestylt.
3. **Daten-Katalogisierung:**
   - Kategorien (Basic & Advanced) aus der `index.html` in `courses.json` übernehmen.
   - Ein Python- oder Node-Skript schreiben, das über alle Ordner in `basic-courses/` und `advanced-courses/` iteriert und die `Aufgabe_X.html` Dateien ausliest und sie gebündelt in `tasks.json` speichert.
4. **Integration:** Das Frontend so verdrahten, dass es nahtlos aus den JSON-Dateien rendert.
5. **Polishing:** Einbau der Suchfunktion (die bisher nur einen Platzhalter hatte) via Client-Side Filtering in React.
