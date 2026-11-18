
// ======================
// INDICADORES ECONÔMICOS
// API do Banco Central do Brasil (SGS)
// ======================

const SERIES = {
    selic: 432,
    ipca: 433,
    igpm: 189,
    dolar: 1
};

// Formata os números no padrão brasileiro
function formatarNumero(valor) {
    return Number(valor).toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

// Carrega os indicadores econômicos
async function carregarIndicador(id, codigoSerie, prefixo, sufixo, rotuloData) {
    const valorEl = document.getElementById(id);
    const dataEl = document.getElementById(id + "-data");
    const trendEl = document.getElementById(id + "-trend");

    if (!valorEl || !dataEl || !trendEl) {
        console.error(`Elementos não encontrados para o indicador: ${id}`);
        return;
    }

    try {
        const url = `https://api.bcb.gov.br/dados/serie/bcdata.sgs.${codigoSerie}/dados/ultimos/2?formato=json`;

        const res = await fetch(url);

        if (!res.ok) {
            throw new Error("Erro na resposta da API do Banco Central");
        }

        const data = await res.json();

        if (!data || data.length === 0) {
            throw new Error("Sem dados retornados");
        }

        const ultimo = data[data.length - 1];
        const anterior = data.length > 1 ? data[data.length - 2] : null;

        // Exibe o valor
        valorEl.textContent =
            `${prefixo}${formatarNumero(ultimo.valor)}${sufixo}`;

        // Exibe a data com o rótulo adequado
        dataEl.textContent = `${rotuloData}: ${ultimo.data}`;

        // Compara com o valor anterior
        if (anterior) {
            const subiu = Number(ultimo.valor) > Number(anterior.valor);
            const desceu = Number(ultimo.valor) < Number(anterior.valor);

            if (subiu) {
                trendEl.textContent = "▲";
                trendEl.className = "trend up";
            } else if (desceu) {
                trendEl.textContent = "▼";
                trendEl.className = "trend down";
            } else {
                trendEl.textContent = "▬";
                trendEl.className = "trend";
            }
        }

    } catch (err) {
        console.error(`Erro ao carregar indicador ${id}:`, err);

        valorEl.textContent = "Indisponível";
        dataEl.textContent = "Não foi possível carregar agora";
        trendEl.textContent = "";
    }
}

// Executa o carregamento dos indicadores
carregarIndicador("selic", SERIES.selic, "", "%", "Vigência");

carregarIndicador("ipca", SERIES.ipca, "", "%", "Referência");

carregarIndicador("igpm", SERIES.igpm, "", "%", "Referência");

carregarIndicador("dolar", SERIES.dolar, "R$ ", "", "Data da cotação");


// ======================
// GRÁFICO DO BITCOIN
// API pública da Binance
// ======================

async function carregarGraficoBitcoin() {
    const canvas = document.getElementById("bitcoin-chart");

    if (!canvas) {
        console.log("Gráfico do Bitcoin não encontrado nesta página.");
        return;
    }

    if (typeof Chart === "undefined") {
        console.error("Biblioteca Chart.js não foi carregada.");
        return;
    }

    try {
        const url = "https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1d&limit=7";

        const res = await fetch(url);

        if (!res.ok) {
            throw new Error("Erro na resposta da API Binance");
        }

        const dados = await res.json();

        if (!dados || dados.length === 0) {
            throw new Error("Sem dados retornados pela Binance");
        }

        // Datas do gráfico
        const labels = dados.map((vela) => {
            const data = new Date(vela[0]);

            return data.toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                timeZone: "UTC"
            });
        });

        // Valores de fechamento
        const valores = dados.map((vela) => Number(vela[4]));

        // Evita criar dois gráficos no mesmo canvas
        const graficoExistente = Chart.getChart(canvas);

        if (graficoExistente) {
            graficoExistente.destroy();
        }

        new Chart(canvas, {
            type: "line",

            data: {
                labels: labels,

                datasets: [{
                    label: "Bitcoin (US$)",
                    data: valores,
                    borderColor: "#4FA37B",
                    backgroundColor: "rgba(79,163,123,0.15)",
                    borderWidth: 2,
                    pointRadius: 0,
                    fill: true,
                    tension: 0.3
                }]
            },

            options: {
                responsive: true,
                maintainAspectRatio: false,

                plugins: {
                    legend: {
                        display: false
                    }
                },

                scales: {
                    y: {
                        ticks: {
                            callback: (valor) =>
                                "US$ " + Number(valor).toLocaleString("pt-BR")
                        }
                    }
                }
            }
        });

    } catch (err) {
        console.error("Erro ao carregar gráfico do Bitcoin:", err);

        const contexto = canvas.getContext("2d");

        contexto.clearRect(0, 0, canvas.width, canvas.height);
        contexto.font = "14px Inter";
        contexto.fillStyle = "#7c8b84";

        contexto.fillText(
            "Não foi possível carregar o gráfico agora.",
            10,
            30
        );
    }
}

// Carrega o gráfico
carregarGraficoBitcoin();
