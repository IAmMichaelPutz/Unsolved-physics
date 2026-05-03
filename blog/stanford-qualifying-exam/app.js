document.addEventListener('DOMContentLoaded', function() {
    let questions = [];
    let currentTopic = 'all';

    const searchInput = document.querySelector('.search-box input');
    searchInput.removeAttribute('disabled');
    
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            questions = data;
            displayQuestions(questions);
            initializeSearch();
        });

    function initializeSearch() {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.toLowerCase();
            const filtered = questions.filter(q => 
                q.Thema.toLowerCase().includes(searchTerm) ||
                q.Antwort.toLowerCase().includes(searchTerm)
            );
            displayQuestions(filtered);
        });
    }

    function displayQuestions(questionsToShow) {
        const container = document.querySelector('.grid-container');
        container.innerHTML = '';
        
        questionsToShow.forEach((q, index) => {
            const card = document.createElement('div');
            card.className = 'question-card';
            card.style.animationDelay = `${index * 0.1}s`;
            
            card.innerHTML = `
                <div class="question-content">
                    <h3>${q.Thema}</h3>
                    <div class="answer-toggle">Antwort anzeigen</div>
                    <div class="answer hidden">
                        <p>${q.Antwort}</p>
                    </div>
                </div>
            `;
            
            const toggleButton = card.querySelector('.answer-toggle');
            const answer = card.querySelector('.answer');
            
            toggleButton.addEventListener('click', () => {
                answer.classList.toggle('hidden');
                toggleButton.textContent = answer.classList.contains('hidden') 
                    ? 'Antwort anzeigen' 
                    : 'Antwort ausblenden';
            });
            
            container.appendChild(card);
        });
    }

    function shuffleQuestions() {
        const shuffledQuestions = [...questions]
            .sort(() => Math.random() - 0.5);
        displayQuestions(shuffledQuestions);
    }

    // Add shuffle button
    const filterContainer = document.createElement('div');
    filterContainer.className = 'filter-container';
    
    const shuffleButton = document.createElement('button');
    shuffleButton.textContent = 'Fragen mischen';
    shuffleButton.className = 'filter-button';
    shuffleButton.addEventListener('click', shuffleQuestions);
    
    filterContainer.appendChild(shuffleButton);
    document.querySelector('.search-box').after(filterContainer);
});