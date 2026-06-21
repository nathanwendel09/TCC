const btn = document.getElementById("profile-btn");
const dropdown = document.getElementById("profile-dropdown");

btn.addEventListener("click", () => {
    dropdown.classList.toggle("active");
});

document.addEventListener("click", (e) => {
    if (!e.target.closest(".profile")) {
        dropdown.classList.remove("active");
    }
});

// LOGIN SIMPLES
const loginBtn = document.querySelector(".login-btn");
const userName = document.getElementById("user-name");

loginBtn.addEventListener("click", () => {
    const name = prompt("Digite seu nome:");
    if (name) {
        localStorage.setItem("user", name);
        userName.textContent = name;
    }
});

const saved = localStorage.getItem("user");
if (saved) userName.textContent = saved;


// HISTÓRICO
const videos = document.querySelectorAll(".video-card");

videos.forEach(v => {
    v.addEventListener("click", () => {
        const title = v.querySelector("h3").innerText;

        let hist = JSON.parse(localStorage.getItem("hist")) || [];
        hist.push(title);

        localStorage.setItem("hist", JSON.stringify(hist));
    });
});