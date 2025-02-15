const HF_API_KEY = 'SUA_CHAVE_HUGGING_FACE'; // Obtenha em huggingface.co/settings/tokens

async function searchBooks(query) {
    // Busca básica na Open Library
    const olResponse = await fetch(`https://openlibrary.org/search.json?q=${query}`);
    const olData = await olResponse.json();
    
    // Complementa com Google Books para descrições
    const books = await Promise.all(olData.docs.slice(0, 5).map(async (book) => {
        const gBooksResponse = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${book.title}&maxResults=1`
        );
        const gBooksData = await gBooksResponse.json();
        
        // Gera descrição criativa com IA
        const description = await generateDescription(
            gBooksData.items?.[0]?.volumeInfo?.description || book.title
        );

        return {
            title: book.title,
            author: book.author_name?.[0] || 'Autor desconhecido',
            cover: `https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-L.jpg`,
            description: description
        };
    });

    displayBooks(books);
}

async function generateDescription(text) {
    // Usa Hugging Face para sumarizar/embelir a descrição
    const response = await fetch(
        "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
        {
            method: "POST",
            headers: { "Authorization": `Bearer ${HF_API_KEY}` },
            body: JSON.stringify({ inputs: text })
        }
    );
    const data = await response.json();
    return data[0]?.generated_text || "Descrição não disponível.";
}

function displayBooks(books) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = books.map(book => `
        <div class="book-card">
            <img src="${book.cover}" alt="${book.title}">
            <h3>${book.title}</h3>
            <p class="author">${book.author}</p>
            <p class="description">${book.description}</p>
        </div>
    `).join('');
}

document.getElementById('search').addEventListener('input', (e) => {
    if (e.target.value.length > 3) searchBooks(e.target.value);
});