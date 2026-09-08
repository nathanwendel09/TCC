// ======================
// INDICADORES ECONÔMICOS (API do Banco Central - SGS)
// Documentação: https://dadosabertos.bcb.gov.br/dataset/20399-taxa-selic-definida-pelo-copom
// Não precisa de chave/cadastro.
// ======================

const SERIES = {
    selic: 432,   // Meta da Taxa Selic
    ipca: 433,    // IPCA (variação mensal)
    igpm: 189,    // IGP-M (variação mensal)
    dolar: 1      // Dólar comercial (compra)
};

async function carregarIndicador(id, codigoSerie, sufixo) {
    const valorEl = document.getElementById(id);
    const dataEl = document.getElementById(id + "-data");
    const trendEl = document.getElementById(id + "-trend");

    try {
        // pega os 2 últimos valores pra dar pra comparar e mostrar a seta
        const url = `https://api.bcb.gov.br/dados/serie/bcdata.sgs.${codigoSerie}/dados/ultimos/2?formato=json`;
        const res = await fetch(url);
        const data = await res.json();

        if (!data || data.length === 0) {
            throw new Error("Sem dados retornados");
        }

        const ultimo = data[data.length - 1];
        const anterior = data.length > 1 ? data[data.length - 2] : null;

        valorEl.textContent = `${Number(ultimo.valor).toFixed(2)}${sufixo}`;
        dataEl.textContent = `Atualizado em ${ultimo.data}`;

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
        console.log(`Erro ao carregar indicador ${id}:`, err);
        valorEl.textContent = "Indisponível";
        dataEl.textContent = "Não foi possível carregar agora";
    }
}

carregarIndicador("selic", SERIES.selic, "%");
carregarIndicador("ipca", SERIES.ipca, "%");
carregarIndicador("igpm", SERIES.igpm, "%");
carregarIndicador("dolar", SERIES.dolar, " R$");


// ======================
// GRÁFICO DO BITCOIN (API da Binance - pública, sem chave)
// Documentação: https://binance-docs.github.io/apidocs/spot/en/#kline-candlestick-data
// ======================

async function carregarGraficoBitcoin() {
    const canvas = document.getElementById("bitcoin-chart");

    try {
        const url = "https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1d&limit=7";
        const res = await fetch(url);
        const dados = await res.json();

        // cada item: [ openTime, open, high, low, close, volume, closeTime, ... ]
        const labels = dados.map((vela) => {
            const d = new Date(vela[0]);
            return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
        });

        const valores = dados.map((vela) => Number(vela[4])); // preço de fechamento

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
                    legend: { display: false }
                },
                scales: {
                    y: {
                        ticks: {
                            callback: (valor) => "US$ " + Number(valor).toLocaleString("pt-BR")
                        }
                    }
                }
            }
        });

    } catch (err) {
        console.log("Erro ao carregar gráfico do Bitcoin:", err);
        const contexto = canvas.getContext("2d");
        contexto.font = "14px Inter";
        contexto.fillStyle = "#7c8b84";
        contexto.fillText("Não foi possível carregar o gráfico agora.", 10, 30);
    }
}

carregarGraficoBitcoin();