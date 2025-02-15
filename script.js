document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var codigo = document.getElementById("codigo").value;
    
    // Lista de códigos válidos (adicionados manualmente)
    var codigosValidos = ["123456", "ABCDEF"];

    if (codigosValidos.includes(codigo)) {
        window.location.href = "leitura.html";
    } else {
        alert("Código inválido! Verifique e tente novamente.");
    }
});
