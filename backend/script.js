
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