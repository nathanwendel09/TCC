// ======================
// CONTROLE DE USUÁRIO LOGADO + HISTÓRICO
// ======================

function atualizarHeader() {
    const usuarioSalvo = localStorage.getItem("financenews_usuario");
    const container = document.querySelector("header > div"); // o div que tem o botão Login

    if (!container) return;

    if (usuarioSalvo) {
        const usuario = JSON.parse(usuarioSalvo);

        container.innerHTML = `
            <div style="display: flex; align-items: center; gap: 12px;">
                <span style="color: white; font-weight: 500;">Olá, ${usuario.nome.split(' ')[0]}</span>
                
                <a href="historico.html" class="btn" style="padding: 8px 14px; font-size: 14px;">
                    Histórico
                </a>

                <button id="btn-sair" class="btn" style="padding: 8px 14px; font-size: 14px; background: #c0392b;">
                    Sair
                </button>
            </div>
        `;

        // Botão Sair
        document.getElementById("btn-sair").addEventListener("click", () => {
            localStorage.removeItem("financenews_usuario");
            // Também desloga do Firebase
            if (typeof firebase !== "undefined" && firebase.auth) {
                firebase.auth().signOut();
            }
            window.location.href = "home.html";
        });

    } else {
        // Usuário não logado → mostra o botão Login normal
        container.innerHTML = `
            <a href="login.html" class="btn">Login</a>
        `;
    }
}

// Roda assim que a página carregar
document.addEventListener("DOMContentLoaded", atualizarHeader);