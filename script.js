async function buscarAcao() {
  const ticker = document.getElementById('ticker').value.toUpperCase();
  const apiKey = 'async function buscarAcao() {
  const ticker = document.getElementById('ticker').value.toUpperCase();
  const apiKey = 'GN6UE66Q3O66L6DE';
  const urlGlobalQuote = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${apiKey}`;
  const urlFundamentos = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=${apiKey}`;

  try {
    const [resQuote, resFundamentos] = await Promise.all([fetch(urlGlobalQuote), fetch(urlFundamentos)]);
    const dataQuote = await resQuote.json();
    const dataFundamentos = await resFundamentos.json();

    const acao = dataQuote['Global Quote'];
    const html = `
      <h2>${ticker}</h2>
      <div class="dados">
        <h3>Cotação</h3>
        <p>Preço: R$ ${acao['05. price']}</p>
        <p>Variação: ${acao['09. change']} (${acao['10. change percent']})</p>
        <p>Abertura/Máxima/Mínima: R$ ${acao['02. open']} / ${acao['03. high']} / ${acao['04. low']}</p>
        <p>Volume: ${formatarVolume(acao['06. volume'])}</p>
      </div>
      <div class="dados">
        <h3>Fundamentos</h3>
        <p>P/L: ${dataFundamentos.PERatio || 'N/A'}</p>
        <p>Dividend Yield: ${dataFundamentos.DividendYield || 'N/A'}</p>
        <p>EBITDA: ${dataFundamentos.EBITDA || 'N/A'}</p>
      </div>
    `;
    document.getElementById('resultado').innerHTML = html;

  } catch (error) {
    document.getElementById('resultado').innerHTML = "Erro na requisição.";
  }
}';
  const urlGlobalQuote = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${apiKey}`;
  const urlFundamentos = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=${apiKey}`;

  try {
    const [resQuote, resFundamentos] = await Promise.all([fetch(urlGlobalQuote), fetch(urlFundamentos)]);
    const dataQuote = await resQuote.json();
    const dataFundamentos = await resFundamentos.json();

    const acao = dataQuote['Global Quote'];
    const html = `
      <h2>${ticker}</h2>
      <div class="dados">
        <h3>Cotação</h3>
        <p>Preço: R$ ${acao['05. price']}</p>
        <p>Variação: ${acao['09. change']} (${acao['10. change percent']})</p>
        <p>Abertura/Máxima/Mínima: R$ ${acao['02. open']} / ${acao['03. high']} / ${acao['04. low']}</p>
        <p>Volume: ${formatarVolume(acao['06. volume'])}</p>
      </div>
      <div class="dados">
        <h3>Fundamentos</h3>
        <p>P/L: ${dataFundamentos.PERatio || 'N/A'}</p>
        <p>Dividend Yield: ${dataFundamentos.DividendYield || 'N/A'}</p>
        <p>EBITDA: ${dataFundamentos.EBITDA || 'N/A'}</p>
      </div>
    `;
    document.getElementById('resultado').innerHTML = html;

  } catch (error) {
    document.getElementById('resultado').innerHTML = "Erro na requisição.";
  }
}