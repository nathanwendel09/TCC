// ======================
// CONFIGURAÇÃO DO FIREBASE
// ======================
const firebaseConfig = {
  apiKey: "AIzaSyAOA2gCB688Llhlv4TYS50H7Ypo3A1M85I",
  authDomain: "finance-news-a2d1b.firebaseapp.com",
  projectId: "finance-news-a2d1b",
  storageBucket: "finance-news-a2d1b.firebasestorage.app",
  messagingSenderId: "108697585343",
  appId: "1:108697585343:web:bcaec2ca794c99d477280a",
  measurementId: "G-V0C2JXKBKK"
};

// Inicializa o Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();


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
// MOSTRAR / OCULTAR SENHA
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
    errorEl.style.color = "";

    const email = document.getElementById("login-email").value.trim();
    const senha = document.getElementById("login-senha").value;

    if (!email || !senha) {
        errorEl.textContent = "Preencha e-mail e senha.";
        return;
    }

    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, senha);
        const user = userCredential.user;

        // Salva dados básicos no localStorage
        localStorage.setItem("financenews_usuario", JSON.stringify({
            uid: user.uid,
            email: user.email,
            nome: user.displayName || "Usuário"
        }));

        // Redireciona para a home
        window.location.href = "home.html";

    } catch (err) {
        console.error(err);
        if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
            errorEl.textContent = "E-mail ou senha inválidos.";
        } else if (err.code === "auth/too-many-requests") {
            errorEl.textContent = "Muitas tentativas. Tente novamente mais tarde.";
        } else {
            errorEl.textContent = "Erro ao fazer login. Tente novamente.";
        }
    }
});


// ======================
// CADASTRO
// ======================
formCadastro.addEventListener("submit", async (e) => {
    e.preventDefault();

    const errorEl = document.getElementById("cadastro-error");
    errorEl.textContent = "";
    errorEl.style.color = "";

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

    try {
        // Cria o usuário
        const userCredential = await auth.createUserWithEmailAndPassword(email, senha);
        const user = userCredential.user;

        // Salva o nome no perfil
        await user.updateProfile({
            displayName: nome
        });

        errorEl.style.color = "var(--green)";
        errorEl.textContent = "Conta criada com sucesso! Faça login.";

        // Limpa o formulário e volta para a aba de login
        formCadastro.reset();
        setTimeout(() => {
            tabLogin.click();
        }, 1500);

    } catch (err) {
        console.error(err);
        if (err.code === "auth/email-already-in-use") {
            errorEl.textContent = "Este e-mail já está cadastrado.";
        } else if (err.code === "auth/invalid-email") {
            errorEl.textContent = "E-mail inválido.";
        } else if (err.code === "auth/weak-password") {
            errorEl.textContent = "A senha é muito fraca.";
        } else {
            errorEl.textContent = "Erro ao criar conta. Tente novamente.";
        }
    }
});