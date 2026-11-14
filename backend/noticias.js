
const API_KEY = "pub_e74013178569430083b1f1a33ed43fb3"; 
const BASE_URL = "https://newsdata.io/api/1/latest";

// ======================
// ELEMENTOS DO DOM
// ======================
const grid = document.getElementById("noticias-grid");
const loading = document.getElementById("loading");
const erroEl = document.getElementById("erro");
const botoesFiltro = document.querySelectorAll(".filtro-btn");

// ======================
// FUNÇÃO PRINCIPAL - CARREGAR NOTÍCIAS
// ======================
async function carregarNoticias(categoria = "business") {
    loading.style.display = "block";
    erroEl.style.display = "none";
    grid.innerHTML = "";

    try {
        let url = "";

        if (categoria === "todas") {
            // Busca mais ampla
            url = `${BASE_URL}?apikey=${API_KEY}&language=pt&country=br&q=economia OR investimento OR bolsa OR selic OR bitcoin&size=10`;
        } else {
            // Filtro por categoria oficial da API
            url = `${BASE_URL}?apikey=${API_KEY}&language=pt&country=br&category=${categoria}&size=10`;
        }

        const res = await fetch(url);
        const data = await res.json();

        if (data.status !== "success") {
            throw new Error(data.results?.message || "Erro ao buscar notícias");
        }

        if (!data.results || data.results.length === 0) {
            grid.innerHTML = `
                <p style="text-align:center; grid-column: 1 / -1; padding: 60px 0; color: #666;">
                    Nenhuma notícia encontrada nesta categoria no momento.
                </p>
            `;
            return;
        }

        data.results.forEach(noticia => {
            const card = criarCard(noticia);
            grid.appendChild(card);
        });

    } catch (err) {
        console.error(err);
        erroEl.style.display = "block";
        erroEl.innerHTML = `
            <strong>Não foi possível carregar as notícias.</strong><br>
            Verifique se a API Key está correta no arquivo <code>backend/noticias.js</code>.
            <br><br>
            Erro: ${err.message}
        `;
    } finally {
        loading.style.display = "none";
    }
}

// ======================
// CRIAR CARD DA NOTÍCIA
// ======================
function criarCard(noticia) {
    const card = document.createElement("article");
    card.className = "noticia-card";

    const imagem = noticia.image_url
        ? noticia.image_url
        : "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600";

    const dataFormatada = noticia.pubDate
        ? new Date(noticia.pubDate).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "short",
              year: "numeric"
          })
        : "";

    card.innerHTML = `
        <img class="noticia-img" 
             src="${imagem}" 
             alt=""
             onerror="this.src='https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600'">
        
        <div class="noticia-conteudo">
            <span class="noticia-fonte">${noticia.source_id || noticia.source_name || "Fonte"}</span>
            <h3 class="noticia-titulo">${noticia.title || "Sem título"}</h3>
            <p class="noticia-descricao">${noticia.description || "Sem descrição disponível."}</p>
            
            <div class="noticia-meta">
                <span>${dataFormatada}</span>
                <a class="noticia-link" href="${noticia.link}" target="_blank" rel="noopener">
                    Ler mais →
                </a>
            </div>
        </div>
    `;

    // Quando clicar em "Ler mais", salva no histórico
    const link = card.querySelector(".noticia-link");
    link.addEventListener("click", () => {
        salvarNoHistorico({
            titulo: noticia.title,
            descricao: noticia.description,
            link: noticia.link,
            imagem: imagem,
            fonte: noticia.source_id || noticia.source_name,
            data: dataFormatada
        });
    });

    return card;
}

// ======================
// SALVAR NO HISTÓRICO
// ======================
function salvarNoHistorico(noticia) {
    let historico = JSON.parse(localStorage.getItem("financenews_historico") || "[]");

    // Evita duplicar a mesma notícia
    const jaExiste = historico.some(item => item.link === noticia.link);
    if (jaExiste) return;

    historico.push(noticia);

    // Mantém no máximo as 30 últimas
    if (historico.length > 30) {
        historico = historico.slice(-30);
    }

    localStorage.setItem("financenews_historico", JSON.stringify(historico));
}

// ======================
// FILTROS POR CATEGORIA
// ======================
botoesFiltro.forEach(btn => {
    btn.addEventListener("click", () => {
        // Remove a classe active de todos
        botoesFiltro.forEach(b => b.classList.remove("active"));

        // Adiciona no botão clicado
        btn.classList.add("active");

        // Pega a categoria
        const categoria = btn.dataset.category;
        carregarNoticias(categoria);
    });
});

// ======================
// INICIALIZAÇÃO
// ======================
carregarNoticias("business");