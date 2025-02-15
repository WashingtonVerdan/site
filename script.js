const DEEPSEEK_API_KEY = 'SUA_CHAVE_DEEPSEEK';
const OPEN_LIBRARY_URL = 'https://openlibrary.org';

async function getBookRecommendations(query) {
    // Usa DeepSeek-R1 para gerar recomendações
    const response = await fetch('https://api.deepseek.com.br/v1/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
        },
        body: JSON.stringify({
            model: "deepseek-r1",
            messages: [{
                role: "user",
                content: `Recomende 3 livros sobre ${query} com descrições criativas em formato JSON:
                { "books": [{"title": "", "author": "", "description": ""}] }`
            }]
        })
    });

    const data = await response.json();
    return JSON.parse(data.choices[0].message.content);
}

async function getBookCover(title, author) {
    try {
        const response = await fetch(`${OPEN_LIBRARY_URL}/search.json?title=${encodeURIComponent(title)}&author=${encodeURIComponent(author)}`);
        const data = await response.json();
        return data.docs[0]?.cover_i ? `https://covers.openlibrary.org/b/id/${data.docs[0].cover_i}-L.jpg` : 'placeholder.jpg';
    } catch {
        return 'placeholder.jpg';
    }
}

function displayBooks(books) {
    const grid = document.getElementById('results');
    grid.innerHTML = '';

    books.forEach(async (book) => {
        const card = document.createElement('div');
        card.className = 'book-card';
        
        // Carrega capa do livro
        const coverUrl = await getBookCover(book.title, book.author);

        card.innerHTML = `
            <img src="${coverUrl}" class="book-cover" alt="${book.title}">
            <div class="book-info">
                <h3>${book.title}</h3>
                <p><em>${book.author}</em></p>
                <p>${book.description}</p>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

// Event Listeners
document.getElementById('search-btn').addEventListener('click', async () => {
    const query = document.getElementById('search-input').value;
    const recommendations = await getBookRecommendations(query);
    displayBooks(recommendations.books);
});

document.querySelectorAll('.genre-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
        const genre = e.target.dataset.genre;
        const recommendations = await getBookRecommendations(genre);
        displayBooks(recommendations.books);
    });
});