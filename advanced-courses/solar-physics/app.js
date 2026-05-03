// Platzhalter hinzufügen, wenn darauf geklickt wird
document.querySelectorAll(".placeholder").forEach(button => {
    button.addEventListener("click", () => {
        const input = document.getElementById("search-input");
        const value = button.getAttribute("data-value");

        // Aktuellen Cursor-Standort im Eingabefeld ermitteln und Text einfügen
        const cursorPos = input.selectionStart;
        const textBefore = input.value.substring(0, cursorPos);
        const textAfter = input.value.substring(cursorPos);
        input.value = textBefore + value + textAfter;

        // Cursor nach dem eingefügten Text positionieren
        input.focus();
        input.selectionStart = input.selectionEnd = cursorPos + value.length;
    });
});

// Such-Button: Aktion ausführen
document.getElementById("search-button").addEventListener("click", () => {
    const query = document.getElementById("search-input").value;
    alert(`Suche nach: ${query}`); // Hier kannst du die Suchanfrage an deine API senden
});
