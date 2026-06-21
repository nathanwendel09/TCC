// ======================
// CARROSSEL
// ======================

const slides = document.querySelectorAll(".slide");
let atual = 0;

setInterval(() => {
    slides[atual].classList.remove("active");
    atual = (atual + 1) % slides.length;
    slides[atual].classList.add("active");
}, 3000);


// ======================
// MODO ESCURO
// ======================

const button = document.getElementById("theme-toggle");

button.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    button.innerHTML = document.body.classList.contains("dark-mode")
        ? "☀️"
        : "🌙";
});


// ======================
// DADOS DE MERCADO (FINTECH)
// ======================

let ultimosValores = {};

function calcularVariacao(novo, antigo) {
    if (!antigo) return 0;
    return ((novo - antigo) / antigo) * 100;
}

async function carregarMoedas() {
    try {
        const res = await fetch(
            "https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,GBP-BRL,BTC-BRL"
        );

        const data = await res.json();

        atualizar("dolar", data.USDBRL.bid);
        atualizar("euro", data.EURBRL.bid);
        atualizar("libra", data.GBPBRL.bid);
        atualizar("bitcoin", data.BTCBRL.bid);

    } catch (err) {
        console.log("Erro API:", err);
    }
}


// ======================
// UPDATE UI FINTECH STYLE
// ======================

function atualizar(id, valor) {
    const el = document.getElementById(id);
    const novo = Number(valor);
    const antigo = ultimosValores[id];

    const variacao = calcularVariacao(novo, antigo);

    // cor estilo mercado
    if (variacao > 0) {
        el.style.color = "#4FA37B";
    } else if (variacao < 0) {
        el.style.color = "#ff4d4d";
    } else {
        el.style.color = "#fff";
    }

    ultimosValores[id] = novo;

    el.innerHTML = `
        R$ ${novo.toFixed(2)}
        <small style="margin-left:8px; font-size:12px;">
            ${variacao ? variacao.toFixed(2) + "%" : "--"}
        </small>
    `;

    // animação “pulse fintech”
    el.style.transform = "scale(1.08)";
    el.style.transition = "0.2s";

    setTimeout(() => {
        el.style.transform = "scale(1)";
    }, 200);
}


// ======================
// AUTO UPDATE (REAL TIME FEEL)
// ======================

carregarMoedas();
setInterval(carregarMoedas, 8000);
    
    


