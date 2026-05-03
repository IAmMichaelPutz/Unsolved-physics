# Konzept für Aufgaben-Bilder

## 1. Speicherort
Da wir **Next.js** verwenden, müssen alle statischen Dateien (wie Bilder), die im Browser angezeigt werden sollen, zwingend im Ordner `public` liegen.

Der ideale Ort für deine Bilder zu den Übungsaufgaben ist:
👉 `modern-app/public/images/tasks/`

Um bei Hunderten von Aufgaben den Überblick zu behalten, solltest du innerhalb dieses Ordners Unterordner für die Themenbereiche anlegen:
- `modern-app/public/images/tasks/mechanics/`
- `modern-app/public/images/tasks/electrodynamics/`
- `modern-app/public/images/tasks/quantum-theory/`

## 2. Benennungskonvention (Dateinamen)
Dateinamen sollten idealerweise **nur klein geschrieben** sein, **keine Leerzeichen** oder **Umlaute** enthalten und mit einem Bindestrich `-` getrennt werden.

Sie sollten immer mit der ID der Aufgabe beginnen, damit die Zuordnung sofort klar ist.

**Format:**
`[aufgabe_id]-[kurzbeschreibung].[dateiendung]`

**Beispiele:**
- `aufgabe_1-schaltplan.png`
- `aufgabe_14-kegelpendel.jpg`
- `aufgabe_3-feldlinien.svg`

## 3. Einbindung in die Aufgaben
Wenn du in der `tasks.json` oder direkt im HTML Bilder verlinkst, lässt du den `public`-Teil im Pfad einfach weg. Next.js weiß automatisch, dass `/` im Code für den `public`-Ordner steht.

**Beispiel für den HTML-Code (den du in die JSON einfügen würdest):**
```html
<img src="/images/tasks/electrodynamics/aufgabe_1-schaltplan.png" alt="Schaltplan für Aufgabe 1" class="w-full max-w-md mx-auto my-4 rounded-lg shadow-sm" />
```
*(Tipp: Ich habe dem img-Tag direkt ein paar Tailwind-Klassen mitgegeben, damit das Bild schön zentriert ist, nicht zu riesig wird und abgerundete Ecken hat!)*

## 4. Wie lade ich neue Bilder hoch?
1. Erstelle den Ordnerbaum in `modern-app/public/images/tasks/...`
2. Speichere deine Bilder dort ab (z.B. aus einem Screenshot-Tool).
3. Öffne die `tasks.json`, suche die entsprechende Aufgabe und füge das `<img ... />` Tag an der gewünschten Stelle im Text-String ein. Das Bild erscheint sofort im Frontend!
