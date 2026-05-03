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
    const s1 = str1.toLowerCase();
    const s2 = str2.toLowerCase();
    
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

fetch('jobs.json')
    .then(response => response.json())
    .then(data => {
        const jobContainer = document.getElementById('job-container');
        const searchInput = document.getElementById('search-input');
        const filterLand = document.getElementById('filter-land');
        const filterBereich = document.getElementById('filter-bereich');
        const filterTag = document.getElementById('filter-schwerpunkt');
        const searchBtn = document.getElementById('search-btn');

        let allJobs = data;

        // 1. Dropdowns befüllen
        function populateFilters() {
            const lands = [...new Set(allJobs.map(job => job.Land))].sort();
            const bereiche = [...new Set(allJobs.map(job => job.Bereich))].sort();
            const tags = [...new Set(
                allJobs.flatMap(job => [job.Tag1, job.Tag2, job.Tag3])
            )].sort();

            // Optionen für Land
            filterLand.innerHTML = '<option value="">Land auswählen</option>';
            lands.forEach(land => {
                if (land) {
                    const option = document.createElement('option');
                    option.value = land;
                    option.textContent = land;
                    filterLand.appendChild(option);
                }
            });

            // Optionen für Bereich
            filterBereich.innerHTML = '<option value="">Bereich auswählen</option>';
            bereiche.forEach(bereich => {
                if (bereich) {
                    const option = document.createElement('option');
                    option.value = bereich;
                    option.textContent = bereich;
                    filterBereich.appendChild(option);
                }
            });

            // Optionen für Tags
            filterTag.innerHTML = '<option value="">Schwerpunkt auswählen</option>';
            tags.forEach(tag => {
                if (tag) {
                    const option = document.createElement('option');
                    option.value = tag;
                    option.textContent = tag;
                    filterTag.appendChild(option);
                }
            });
        }

        // 2. Jobs rendern
        function renderJobs(jobs) {
            jobContainer.innerHTML = '';

            jobs.forEach(job => {
                const jobCard = document.createElement('div');
                jobCard.classList.add('job-card');

                const jobHtml = `
                    <div class="job-card-inner">
                        <img src="icons/${job.Icon}" alt="${job.Name} Logo" class="company-icon">
                        <h3>${job.Name}</h3>
                        <p><strong>Standort:</strong> ${job.Standort}</p>
                        <br>
                        <p>${job.Beschreibung}</p>
                        <br>
                        <a href="${job.Website.trim()}" target="_blank" class="job-link">Zur Webseite</a>
                        ${job.relevance ? `<div class="relevance">Relevanz: ${Math.round(job.relevance * 100)}%</div>` : ''}
                    </div>
                `;

                jobCard.innerHTML = jobHtml;
                jobContainer.appendChild(jobCard);
            });

            if (jobs.length === 0) {
                jobContainer.innerHTML = '<p>Keine Jobs gefunden.</p>';
            }
        }

        // 3. Filter- und Suchlogik
        function filterJobs() {
            const keyword = searchInput.value.toLowerCase();
            const selectedLand = filterLand.value;
            const selectedBereich = filterBereich.value;
            const selectedTag = filterTag.value;

            let filteredJobs = [...allJobs];

            // Text-Suche mit Relevanz
            if (keyword) {
                filteredJobs = filteredJobs.map(job => {
                    const nameScore = getSimilarity(job.Name || '', keyword);
                    const descScore = getSimilarity(job.Beschreibung || '', keyword);
                    const locationScore = getSimilarity(job.Standort || '', keyword);
                    const tagScores = [job.Tag1, job.Tag2, job.Tag3]
                        .filter(Boolean)
                        .map(tag => getSimilarity(tag, keyword));
                    const tagScore = tagScores.length ? Math.max(...tagScores) : 0;

                    const relevance = Math.max(
                        nameScore * 1.0,
                        descScore * 0.7,
                        locationScore * 0.8,
                        tagScore * 0.9
                    );

                    return { ...job, relevance };
                })
                .filter(job => job.relevance > 0.2)
                .sort((a, b) => b.relevance - a.relevance);
            }

            // Dropdown-Filter anwenden
            if (selectedLand) {
                filteredJobs = filteredJobs.filter(job => job.Land === selectedLand);
            }
            if (selectedBereich) {
                filteredJobs = filteredJobs.filter(job => job.Bereich === selectedBereich);
            }
            if (selectedTag) {
                filteredJobs = filteredJobs.filter(job => 
                    [job.Tag1, job.Tag2, job.Tag3].includes(selectedTag)
                );
            }

            renderJobs(filteredJobs);
        }

        // 4. Event Listener für Echtzeit-Filterung
        searchInput.addEventListener('input', filterJobs);
        filterLand.addEventListener('change', filterJobs);
        filterBereich.addEventListener('change', filterJobs);
        filterTag.addEventListener('change', filterJobs);

        // 5. Initiale Anzeige
        populateFilters();
        renderJobs(allJobs);
    })
    .catch(error => console.error('Fehler beim Laden der Jobdaten:', error));