const apiURL = "https://bible-api.com/proverbs 3:5"; // Pode mudar para outro versículo

function getQuote() {
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            document.getElementById("quote").textContent = data.text;
        })
        .catch(() => {
            document.getElementById("quote").textContent = "Erro ao carregar provérbio.";
        });
}

// Funções de fala, compartilhamento e tema continuam iguais


const apiURL = "https://api.quotable.io/random";

function getQuote() {
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            document.getElementById("quote").textContent = data.content;
        })
        .catch(() => {
            document.getElementById("quote").textContent = "Erro ao carregar a frase.";
        });
}

function speakQuote() {
    let text = document.getElementById("quote").textContent;
    let speech = new SpeechSynthesisUtterance(text);
    speech.lang = "pt-BR";
    window.speechSynthesis.speak(speech);
}

function shareWhatsApp() {
    let text = document.getElementById("quote").textContent;
    let url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
}

function toggleTheme() {
    document.body.classList.toggle("dark-mode");
}

// Carrega uma frase ao iniciar
getQuote();