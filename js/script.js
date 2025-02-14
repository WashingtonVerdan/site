pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.8.335/pdf.worker.min.js';

let pdfDoc = null;
let currentPage = 1;
let scale = 1.5;
const canvas = document.getElementById('pdf-canvas');
const ctx = canvas.getContext('2d');
const loading = document.getElementById('loading');
const prevButton = document.getElementById('prev-page');
const nextButton = document.getElementById('next-page');
const pageInfo = document.getElementById('page-info');

function updatePageControls() {
    prevButton.disabled = currentPage <= 1;
    nextButton.disabled = currentPage >= pdfDoc.numPages;
    pageInfo.textContent = `Página ${currentPage} de ${pdfDoc.numPages}`;
}

async function renderPage(pageNum) {
    loading.style.display = 'block';
    const page = await pdfDoc.getPage(pageNum);
    const viewport = page.getViewport({ scale });

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({ canvasContext: ctx, viewport }).promise;

    currentPage = pageNum;
    updatePageControls();
    loading.style.display = 'none';
}

document.getElementById('load-ebook').addEventListener('click', async () => {
    const ebook = document.getElementById('ebook-select').value;
    pdfDoc = await pdfjsLib.getDocument(ebook).promise;
    await renderPage(1);
});

prevButton.addEventListener('click', () => { if (currentPage > 1) renderPage(currentPage - 1); });
nextButton.addEventListener('click', () => { if (currentPage < pdfDoc.numPages) renderPage(currentPage + 1); });
