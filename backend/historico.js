// ======================
// PÁGINA DE HISTÓRICO
// ======================

function carregarHistorico() {
    const historico = JSON.parse(localStorage.getItem("financenews_historico") || "[]");
    const grid = document.getElementById("historico-grid");
    const vazio = document.getElementById("historico-vazio");

    if (historico.length === 0) {
        vazio.style.display = "block";
        return;
    }

    vazio.style.display = "none";
    grid.innerHTML = "";

    // Mostra do mais recente pro mais antigo
    historico.slice().reverse().forEach(noticia => {
        const card = document.createElement("article");
        card.className = "noticia-card";

        card.innerHTML = `
            <img class="noticia-img" src="${noticia.imagem || 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600'}" alt="">
            <div class="noticia-conteudo">
                <span class="noticia-fonte">${noticia.fonte || "Fonte"}</span>
                <h3 class="noticia-titulo">${noticia.titulo}</h3>
                <p class="noticia-descricao">${noticia.descricao || ""}</p>
                <div class="noticia-meta">
                    <span>${noticia.data || ""}</span>
                    <a class="noticia-link" href="${noticia.link}" target="_blank" rel="noopener">Abrir novamente →</a>
                </div>
            </div>
        `;

        grid.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", carregarHistorico);