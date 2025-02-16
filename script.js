async function buscarDados() {
    const ticker = document.getElementById('ticker').value.toUpperCase();
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = '<p>Carregando...</p>';

    // Usar proxy para contornar CORS (exemplo: cors-anywhere)
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const url = `${proxyUrl}https://www.fundamentus.com.br/detalhes.php?papel=${ticker}`;

    try {
        const response = await fetch(url, {
            headers: { 'Origin': 'https://www.fundamentus.com.br' } // Simula origem válida
        });
        const html = await response.text();
        
        // Converter HTML para DOM
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        // Extrair dados
        const preco = doc.querySelector('.data.valor').textContent.trim();
        const pl = doc.querySelector('td:contains("P/L") + td').textContent.trim();
        const dy = doc.querySelector('td:contains("Div. Yield") + td').textContent.trim();

        resultado.innerHTML = `
            <h2>${ticker}</h2>
            <p>Preço: R$ ${preco}</p>
            <p>P/L: ${pl}</p>
            <p>Dividend Yield: ${dy}</p>
        `;
    } catch (error) {
        resultado.innerHTML = 'Erro ao buscar dados. Tente outro ticker.';
    }
}