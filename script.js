async function buscarAcao() {
    const ticker = document.getElementById('ticker').value.toUpperCase();
    const apiKey = '1WZ57X508P844XWP'; // Obtenha em https://www.alphavantage.co
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data['Global Quote']) {
            const acao = data['Global Quote'];
            const resultadoDiv = document.getElementById('resultado');
            resultadoDiv.innerHTML = `
                <h2>${ticker}</h2>
                <p>Preço: $${acao['05. price']}</p>
                <p>Variação (%): ${acao['10. change percent']}</p>
                <p>Abertura: $${acao['02. open']}</p>
                <p>Máxima do Dia: $${acao['03. high']}</p>
            `;
        } else {
            document.getElementById('resultado').innerHTML = "Ticker não encontrado!";
        }
    } catch (error) {
        document.getElementById('resultado').innerHTML = "Erro na requisição.";
    }
}