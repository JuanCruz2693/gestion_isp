const body = document.body,
    sidebar = body.querySelector('nav'),
    toggle = body.querySelector(".toggle"),
    searchBtn = body.querySelector(".search-box"),
    themeActual = localStorage.getItem('theme'),
    switchControl = document.getElementById("modeSwitch"),
    moonIcon = document.querySelector('.bx-moon'),
    sunIcon = document.querySelector('.bx-sun');

toggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
})

searchBtn.addEventListener("click", () => {
    sidebar.classList.remove("close");
})

switchControl.addEventListener("change", () => {
    if (switchControl.checked) {
        body.classList.add("dark");
        localStorage.setItem("theme", "oscuro");
    } else {
        body.classList.remove("dark");
        localStorage.removeItem("theme");
    }
});

if (themeActual === "oscuro") {
    body.classList.add("dark");
    switchControl.checked = true;
}

function cambiarIconosSegunTema(tema) {
    if (tema === "oscuro") {
        moonIcon.style.display = 'block';
        sunIcon.style.display = 'none';
    } else {
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
    }
}

switchControl.addEventListener("change", () => {
    if (switchControl.checked) {
        body.classList.add("dark");
        localStorage.setItem("theme", "oscuro");
        cambiarIconosSegunTema("oscuro");
    } else {
        body.classList.remove("dark");
        localStorage.removeItem("theme");
        cambiarIconosSegunTema("claro");
    }
});

if (themeActual === "oscuro") {
    body.classList.add("dark");
    switchControl.checked = true;
    cambiarIconosSegunTema("oscuro");
} else {
    cambiarIconosSegunTema("claro");
}