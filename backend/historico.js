// ======================
// PÁGINA DE HISTÓRICO
// ======================

function carregarHistorico() {
    const historico = JSON.parse(localStorage.getItem("financenews_historico") || "[]");
    const grid = document.getElementById("historico-grid");
    const vazio = document.getElementById("historico-vazio");
    const btnLimpar = document.getElementById("btn-limpar-historico");

    // Limpa o grid
    grid.innerHTML = "";

    if (historico.length === 0) {
        vazio.style.display = "block";
        if (btnLimpar) btnLimpar.style.display = "none";
        return;
    }

    vazio.style.display = "none";
    if (btnLimpar) btnLimpar.style.display = "inline-block";

    // Mostra do mais recente para o mais antigo
    historico.slice().reverse().forEach(item => {
        const card = document.createElement("article");
        card.className = "noticia-card";

        // Verifica se é notícia ou vídeo
        const isVideo = item.tipo === "video";

        card.innerHTML = `
            <img class="noticia-img" 
                 src="${item.imagem || 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600'}" 
                 alt=""
                 onerror="this.src='https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600'">
            
            <div class="noticia-conteudo">
                <span class="noticia-fonte">
                    ${isVideo ? "🎥 Vídeo" : (item.fonte || "Notícia")}
                </span>
                <h3 class="noticia-titulo">${item.titulo}</h3>
                <p class="noticia-descricao">${item.descricao || ""}</p>
                
                <div class="noticia-meta">
                    <span>${item.data || ""}</span>
                    <a class="noticia-link" href="${item.link}" target="_blank" rel="noopener">
                        ${isVideo ? "Assistir novamente →" : "Abrir novamente →"}
                    </a>
                </div>
            </div>
        `;

        grid.appendChild(card);
    });
}

// ======================
// BOTÃO APAGAR HISTÓRICO
// ======================
document.addEventListener("DOMContentLoaded", () => {
    carregarHistorico();

    const btnLimpar = document.getElementById("btn-limpar-historico");

    if (btnLimpar) {
        btnLimpar.addEventListener("click", () => {
            const confirmar = confirm("Tem certeza que deseja apagar todo o histórico?");

            if (confirmar) {
                localStorage.removeItem("financenews_historico");
                carregarHistorico(); // atualiza a tela
                alert("Histórico apagado com sucesso!");
            }
        });
    }
});