// ==============================
// CARROSSEL DE LIVROS
// ==============================

const livrosTrack = document.getElementById("livros-track");
const livrosPrev = document.getElementById("livros-prev");
const livrosNext = document.getElementById("livros-next");

function larguraDoScroll() {
    const primeiroCard = livrosTrack.querySelector(".book-card");
    const estilo = getComputedStyle(livrosTrack);
    const gap = parseInt(estilo.gap) || 20;

    return primeiroCard.offsetWidth + gap;
}

livrosNext.addEventListener("click", () => {
    livrosTrack.scrollBy({
        left: larguraDoScroll(),
        behavior: "smooth"
    });
});

livrosPrev.addEventListener("click", () => {
    livrosTrack.scrollBy({
        left: -larguraDoScroll(),
        behavior: "smooth"
    });
});


// ==============================
// CARROSSEL PRINCIPAL
// ==============================

let slides = document.querySelectorAll(".slide");
let index = 0;

function showSlide() {
    slides.forEach(slide => slide.classList.remove("active"));

    slides[index].classList.add("active");

    index++;

    if (index >= slides.length) {
        index = 0;
    }
}

setInterval(showSlide, 3000);