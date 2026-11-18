
const menuToggle = document.getElementById("mobileMenuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const menuOverlay = document.getElementById("mobileMenuOverlay");
const menuClose = document.getElementById("mobileMenuClose");

function openMobileMenu() {
    mobileMenu.classList.add("is-open");
    menuOverlay.classList.add("is-open");
    document.body.classList.add("mobile-menu-open");

    mobileMenu.setAttribute("aria-hidden", "false");
    menuToggle.setAttribute("aria-expanded", "true");
}

function closeMobileMenu() {
    mobileMenu.classList.remove("is-open");
    menuOverlay.classList.remove("is-open");
    document.body.classList.remove("mobile-menu-open");

    mobileMenu.setAttribute("aria-hidden", "true");
    menuToggle.setAttribute("aria-expanded", "false");
}

menuToggle.addEventListener("click", openMobileMenu);
menuClose.addEventListener("click", closeMobileMenu);
menuOverlay.addEventListener("click", closeMobileMenu);

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        closeMobileMenu();
    }
});

mobileMenu.querySelectorAll("a").forEach(function(link) {
    link.addEventListener("click", closeMobileMenu);
});
