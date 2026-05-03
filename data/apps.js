// Modal und Style Setup
const style = document.createElement('style');
style.textContent = `
.modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: none;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    backdrop-filter: blur(5px);
}

.modal-content {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    max-width: 800px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.modal-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.5rem;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    color: #666;
}

.modal-close:hover {
    background: #f0f0f0;
}

.modal-actions {
    margin-top: 1.5rem;
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
}

.grid-item {
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.grid-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
    .modal-content {
        width: 95%;
        padding: 1.5rem;
    }
}
`;
document.head.appendChild(style);

// Modal HTML erstellen
const modal = document.createElement('div');
modal.className = 'modal-backdrop';
modal.innerHTML = `
    <div class="modal-content">
        <button class="modal-close">×</button>
        <div class="modal-body"></div>
        <div class="modal-actions">
            <a href="#" class="nav-button" target="_blank">Zur Aufgabe</a>
        </div>
    </div>
`;
document.body.appendChild(modal);

// Modal Funktionalität
function showModal(content, linkUrl) {
    const modalBody = modal.querySelector('.modal-body');
    const modalLink = modal.querySelector('.modal-actions a');
    
    modalBody.innerHTML = content;
    modalLink.href = linkUrl;
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    if (window.MathJax) {
        MathJax.typesetPromise([modalBody]).catch((err) => {
            console.error('MathJax Fehler:', err);
        });
    }
}

function hideModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

// Event Listener für Modal
modal.querySelector('.modal-close').addEventListener('click', hideModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        hideModal();
    }
});

// ESC Taste zum Schließen
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hideModal();
    }
});

// Konfigurationsvariablen für Pagination
const PAGE_SIZE = 12;
let currentPage = 0;
let allData = [];
let isLoading = false;
let hasMoreData = true;

// Helfer-Funktionen für die Fuzzy-Suche
function fuzzyMatch(text, search) {
    if (!text || !search) return 0;
    const str = text.toLowerCase();
    const searchStr = search.toLowerCase();
    let searchIndex = 0;
    
    for (let i = 0; i < str.length; i++) {
        if (searchIndex < searchStr.length && str[i] === searchStr[searchIndex]) {
            searchIndex++;
        }
    }
    
    return searchIndex === searchStr.length;
}

function getSimilarity(str1, str2) {
    if (!str1 || !str2) return 0;
    const stripHtml = (str) => str.replace(/<[^>]*>/g, '');
    
    const s1 = stripHtml(str1).toLowerCase();
    const s2 = stripHtml(str2).toLowerCase();
    
    if (s1 === s2) return 1;
    if (s1.includes(s2) || s2.includes(s1)) return 0.8;
    if (fuzzyMatch(s1, s2)) return 0.6;
    
    let matches = 0;
    const words1 = s1.split(/\s+/);
    const words2 = s2.split(/\s+/);
    
    words1.forEach(word1 => {
        words2.forEach(word2 => {
            if (fuzzyMatch(word1, word2)) matches++;
        });
    });
    
    return matches / Math.max(words1.length, words2.length);
}

async function fetchGridData(query = "", filters = {}, reset = false) {
    console.log('Fetch Grid Data aufgerufen mit:', {
        query,
        filters,
        reset,
        currentState: {
            currentPage,
            dataLength: allData.length,
            isLoading,
            hasMoreData
        }
    });

    if (reset) {
        currentPage = 0;
        const grid = document.querySelector(".grid-container");
        grid.innerHTML = "";
        hasMoreData = true;
    }

    if (!hasMoreData || isLoading) {
        console.log('Abbruch wegen:', { hasMoreData, isLoading });
        return;
    }
    
    isLoading = true;

    const loader = document.createElement("div");
    loader.className = "loader";
    loader.innerHTML = "Lade weitere Daten...";
    document.querySelector(".grid-container").appendChild(loader);

    try {
        if (allData.length === 0 || reset) {
            const response = await fetch("./data.json");
            if (!response.ok) {
                throw new Error(`Netzwerkproblem beim Laden der Daten: ${response.status} ${response.statusText}`);
            }
            allData = await response.json();
            console.log('Daten geladen, Anzahl:', allData.length);
        }

        processAndDisplayData(query, filters, loader);
    } catch (error) {
        console.error('Fetch Error:', error);
        handleError(error, loader);
    }
}

function processAndDisplayData(query, filters, loader) {
    let filteredData = [...allData];
    
    // Text-Suche mit Relevanz
    if (query) {
        filteredData = filteredData.map(item => {
            const titelScore = getSimilarity(item.titel || '', query) * 1.0;
            const aufgabeScore = getSimilarity(item.aufgabe || '', query) * 0.7;
            const fachgebietScore = getSimilarity(item.fachgebiet || '', query) * 0.9;
            const teilbereichScore = getSimilarity(item.teilbereich || '', query) * 0.9;
            
            const relevance = Math.max(
                titelScore,
                aufgabeScore,
                fachgebietScore,
                teilbereichScore
            );

            return { 
                ...item, 
                relevance
            };
        })
        .filter(item => item.relevance > 0.2)
        .sort((a, b) => b.relevance - a.relevance);
    }

    // Filter anwenden
    if (filters.fachgebiet) {
        filteredData = filteredData.filter(item => 
            item.fachgebiet === filters.fachgebiet
        );
    }
    if (filters.teilbereich) {
        filteredData = filteredData.filter(item => 
            item.teilbereich === filters.teilbereich
        );
    }
    if (filters.art) {
        filteredData = filteredData.filter(item => 
            item.art === filters.art
        );
    }

    const startIndex = currentPage * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    hasMoreData = endIndex < filteredData.length;
    const grid = document.querySelector(".grid-container");
    loader.remove();

    if (filteredData.length === 0 && currentPage === 0) {
        const emptyMessage = document.createElement("div");
        emptyMessage.className = "empty-message";
        emptyMessage.innerHTML = `
            <p>Keine Ergebnisse gefunden.</p>
            <p>Bitte versuchen Sie es mit anderen Suchkriterien.</p>
        `;
        grid.appendChild(emptyMessage);
        isLoading = false;
        return;
    }

    paginatedData.forEach(item => {
        const gridItem = document.createElement("div");
        gridItem.className = "grid-item";
        
        // Preview-Text erstellen
        let preview = '';
        if (item.aufgabe) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = item.aufgabe;
            preview = tempDiv.textContent.slice(0, 200) + '...';
        }
        
        // Kachel-Inhalt ohne Link-Button
        gridItem.innerHTML = `
            <h3>${item.titel || ''}</h3>
            <div class="metadata">
                <span class="fachgebiet"><strong>Fachgebiet:</strong> ${item.fachgebiet || ''}</span>
                <span class="teilbereich"><strong>Teilbereich:</strong> ${item.teilbereich || ''}</span>
                <span class="art"><strong>Art:</strong> ${item.art || ''}</span>
            </div>
            <div class="aufgabe-preview">
                ${preview}
            </div>
            ${item.relevance ? `<div class="relevance">Relevanz: ${Math.round(item.relevance * 100)}%</div>` : ''}
        `;
        
        // Click Event für Modal
        gridItem.addEventListener('click', () => {
            const modalContent = `
                <h2>${item.titel || ''}</h2>
                <div class="metadata">
                    <span class="fachgebiet"><strong>Fachgebiet:</strong> ${item.fachgebiet || ''}</span>
                    <span class="teilbereich"><strong>Teilbereich:</strong> ${item.teilbereich || ''}</span>
                    <span class="art"><strong>Art:</strong> ${item.art || ''}</span>
                </div>
                <div class="aufgabe-full">
                    ${item.aufgabe || ''}
                </div>
            `;
            showModal(modalContent, `./exerc/${item['html-name'] || ''}`);
        });
        
        grid.appendChild(gridItem);
    });

    currentPage++;
    isLoading = false;
    observeLastItem();
}

function handleError(error, loader) {
    console.error("Fehler beim Laden der Daten:", error);
    const grid = document.querySelector(".grid-container");
    loader.remove();
    if (currentPage === 0) {
        grid.innerHTML = `
            <div class="error-message">
                <p>Es ist ein Fehler beim Laden der Daten aufgetreten.</p>
                <p>Bitte versuchen Sie es später erneut.</p>
                <p>Details: ${error.message}</p>
            </div>
        `;
    }
    isLoading = false;
}

function getSelectedFilters() {
    return {
        fachgebiet: document.querySelector("#fachgebiet")?.value || '',
        teilbereich: document.querySelector("#teilbereich")?.value || '',
        art: document.querySelector("#art")?.value || ''
    };
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function observeLastItem() {
    const observer = new IntersectionObserver((entries) => {
        const lastEntry = entries[0];
        if (lastEntry.isIntersecting && hasMoreData) {
            const query = document.querySelector("#search")?.value || '';
            fetchGridData(query, getSelectedFilters());
        }
    }, { threshold: 0.1 });

    const gridItems = document.querySelectorAll('.grid-item');
    if (gridItems.length > 0) {
        observer.observe(gridItems[gridItems.length - 1]);
    }
}

// Event Listener
document.addEventListener("DOMContentLoaded", () => {
    console.log('DOM Content Loaded - Initialisiere Event Listener');
    
    const searchInput = document.querySelector("#search");
    if (searchInput) {
        searchInput.addEventListener("input", debounce((e) => {
            const query = e.target.value;
            fetchGridData(query, getSelectedFilters(), true);
        }, 300));
    }

    document.querySelectorAll("#search-filters select").forEach(select => {
        select.addEventListener("change", () => {
            const query = document.querySelector("#search")?.value || '';
            fetchGridData(query, getSelectedFilters(), true);
        });
    });

    // Initial data load
    fetchGridData();
});