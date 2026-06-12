
const slides = document.querySelectorAll(".slide");

let atual = 0;

setInterval(() => {

    slides[atual].classList.remove("active");

    atual++;

    if(atual >= slides.length){
        atual = 0;
    }

    slides[atual].classList.add("active");

},3000);


// Modo escuro

const button = document.getElementById("theme-toggle");

button.addEventListener("click",()=>{

    document.body.classList.toggle("dark-mode");

    button.innerHTML =
    document.body.classList.contains("dark-mode")
    ? "☀️"
    : "🌙";

});

async function carregarMoedas() {
    try {
        const resposta = await fetch(
                        "https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,GBP-BRL,BTC-BRL"

        );
            const dados = await resposta.json();

    
            document.getElementById("dolar").textContent =    
            "R$" + Number(dados.USDBRL.bid).toFixed(2);

            document.getElementById("euro").textContent =
            "R$" + Number(dados.EURBRL.bid).toFixed(2);

            document.getElementById("libra").textContent  =
            "R$" + Number(dados.GBPBRL.bid).toFixed(2);


            document.getElementById("bitcoin").textContent =
            
            "R$" + Number(dados.BTCBRL.bid).toLocaleString("pt-BR", {
                minimumFractionDigits: 2
            });

        } catch (erro) {
            console.error ("Erro ao carregar moedas:", erro);
        }

        }
        carregarMoedas();
   
    
    


