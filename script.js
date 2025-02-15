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