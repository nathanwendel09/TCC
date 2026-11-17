
function atualizarHeader() {
    const usuarioSalvo = localStorage.getItem("financenews_usuario");
    const container = document.querySelector("header > div");

    if (!container) return;

    if (usuarioSalvo) {
        const usuario = JSON.parse(usuarioSalvo);
        const primeiroNome = usuario.nome.split(" ")[0];
        const inicial = primeiroNome.charAt(0).toUpperCase();

        container.innerHTML = `
            <div class="user-menu">
                <button class="user-btn" id="user-menu-btn"
                    aria-expanded="false" aria-controls="user-dropdown">
                    <span class="user-avatar">${inicial}</span>
                    <span class="user-name">${primeiroNome}</span>
                    <span class="user-arrow">⌄</span>
                </button>

                <div class="user-dropdown" id="user-dropdown">
                    <div class="dropdown-header">
                        <strong>Minha conta</strong>
                        <span>Olá, ${primeiroNome}!</span>
                    </div>

                    <a href="historico.html" class="dropdown-item">
                        Histórico
                    </a>

                    <button class="dropdown-item sair" id="btn-sair">
                        Sair da conta
                    </button>
                </div>
            </div>
        `;

        const menuBtn = document.getElementById("user-menu-btn");
        const dropdown = document.getElementById("user-dropdown");

        menuBtn.addEventListener("click", () => {
            const aberto = dropdown.classList.toggle("show");
            menuBtn.setAttribute("aria-expanded", aberto);
        });

        document.addEventListener("click", (event) => {
            if (!container.contains(event.target)) {
                dropdown.classList.remove("show");
                menuBtn.setAttribute("aria-expanded", "false");
            }
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                dropdown.classList.remove("show");
                menuBtn.setAttribute("aria-expanded", "false");
            }
        });

        document.getElementById("btn-sair").addEventListener("click", async () => {
            if (typeof firebase !== "undefined" && firebase.auth) {
                try {
                    await firebase.auth().signOut();
                } catch (erro) {
                    console.error("Erro ao sair do Firebase:", erro);
                }
            }

            localStorage.removeItem("financenews_usuario");
            window.location.href = "home.html";
        });

    } else {
        container.innerHTML = `
            <a href="login.html" class="btn">Login</a>
        `;
    }
}

document.addEventListener("DOMContentLoaded", atualizarHeader);
