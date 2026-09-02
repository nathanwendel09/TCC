// ======================
// ALTERNAR ABAS (LOGIN / CADASTRO)
// ======================

const tabLogin = document.getElementById("tab-login");
const tabCadastro = document.getElementById("tab-cadastro");
const formLogin = document.getElementById("form-login");
const formCadastro = document.getElementById("form-cadastro");

tabLogin.addEventListener("click", () => {
    tabLogin.classList.add("active");
    tabCadastro.classList.remove("active");
    formLogin.classList.add("active");
    formCadastro.classList.remove("active");
});

tabCadastro.addEventListener("click", () => {
    tabCadastro.classList.add("active");
    tabLogin.classList.remove("active");
    formCadastro.classList.add("active");
    formLogin.classList.remove("active");
});


// ======================
// MOSTRAR / OCULTAR SENHA (botão nosso, não é o do navegador)
// ======================

document.querySelectorAll(".toggle-senha").forEach((botao) => {
    botao.addEventListener("click", () => {
        const input = document.getElementById(botao.dataset.target);
        const mostrando = input.type === "text";

        input.type = mostrando ? "password" : "text";
        botao.textContent = mostrando ? "👁️" : "🙈";
    });
});


// ======================
// LOGIN
// ======================

formLogin.addEventListener("submit", async (e) => {
    e.preventDefault();

    const errorEl = document.getElementById("login-error");
    errorEl.textContent = "";

    const email = document.getElementById("login-email").value.trim();
    const senha = document.getElementById("login-senha").value;

    if (!email || !senha) {
        errorEl.textContent = "Preencha e-mail e senha.";
        return;
    }

    // ======================
    // TODO: quando o backend/MySQL estiver pronto, descomentar:
    //
    // try {
    //     const res = await fetch("backend/api/login.php", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({ email, senha })
    //     });
    //
    //     const data = await res.json();
    //
    //     if (!res.ok || !data.sucesso) {
    //         errorEl.textContent = data.mensagem || "E-mail ou senha inválidos.";
    //         return;
    //     }
    //
    //     // guarda sessão/token e redireciona
    //     localStorage.setItem("financenews_usuario", JSON.stringify(data.usuario));
    //     window.location.href = "home.html";
    //
    // } catch (err) {
    //     console.log("Erro ao fazer login:", err);
    //     errorEl.textContent = "Não foi possível conectar ao servidor.";
    // }
    // ======================

    console.log("Login (simulado, sem backend ainda):", { email, senha });
    errorEl.style.color = "var(--green)";
    errorEl.textContent = "Backend ainda não conectado — login simulado no console.";
});


// ======================
// CADASTRO
// ======================

formCadastro.addEventListener("submit", async (e) => {
    e.preventDefault();

    const errorEl = document.getElementById("cadastro-error");
    errorEl.textContent = "";

    const nome = document.getElementById("cad-nome").value.trim();
    const email = document.getElementById("cad-email").value.trim();
    const senha = document.getElementById("cad-senha").value;
    const confirmar = document.getElementById("cad-confirmar").value;

    if (!nome || !email || !senha || !confirmar) {
        errorEl.textContent = "Preencha todos os campos.";
        return;
    }

    if (senha.length < 6) {
        errorEl.textContent = "A senha precisa ter pelo menos 6 caracteres.";
        return;
    }

    if (senha !== confirmar) {
        errorEl.textContent = "As senhas não coincidem.";
        return;
    }

    // ======================
    // TODO: quando o backend/MySQL estiver pronto, descomentar:
    //
    // try {
    //     const res = await fetch("backend/api/cadastro.php", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({ nome, email, senha })
    //     });
    //
    //     const data = await res.json();
    //
    //     if (!res.ok || !data.sucesso) {
    //         errorEl.textContent = data.mensagem || "Não foi possível criar a conta.";
    //         return;
    //     }
    //
    //     // conta criada, redireciona pro login ou já loga o usuário
    //     tabLogin.click();
    //
    // } catch (err) {
    //     console.log("Erro ao criar conta:", err);
    //     errorEl.textContent = "Não foi possível conectar ao servidor.";
    // }
    // ======================

    console.log("Cadastro (simulado, sem backend ainda):", { nome, email, senha });
    errorEl.style.color = "var(--green)";
    errorEl.textContent = "Backend ainda não conectado — cadastro simulado no console.";
});