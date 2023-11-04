const body = document.body,
    sidebar = body.querySelector('nav'),
    toggle = body.querySelector(".toggle"),
    searchBtn = body.querySelector(".search-box"),
    themeActual = localStorage.getItem('theme'),
    switchControl = document.getElementById("modeSwitch"),
    moonIcon = document.querySelector('.bx-moon'),
    sunIcon = document.querySelector('.bx-sun'),
    modeText = body.querySelector(".mode-text"),
    sidebarState = localStorage.getItem('sidebarState');

// Restaurar el estado del sidebar desde el localStorage
if (sidebarState === 'closed') {
    sidebar.classList.add('close');
}

toggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");

    // Guardar el estado del sidebar en el localStorage
    const newSidebarState = sidebar.classList.contains('close') ? 'closed' : 'open';
    localStorage.setItem('sidebarState', newSidebarState);
});

searchBtn.addEventListener("click", () => {
    sidebar.classList.remove("close");
});

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
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
    } else {
        moonIcon.style.display = 'block';
        sunIcon.style.display = 'none';
    }
}

switchControl.addEventListener("change", () => {
    if (switchControl.checked) {
        body.classList.add("dark");
        localStorage.setItem("theme", "oscuro");
        cambiarIconosSegunTema("oscuro");
        modeText.innerText = "Ligth mode";
    } else {
        body.classList.remove("dark");
        localStorage.removeItem("theme");
        cambiarIconosSegunTema("claro");
        modeText.innerText = "Dark mode";
    }
});

if (themeActual === "oscuro") {
    body.classList.add("dark");
    switchControl.checked = true;
    cambiarIconosSegunTema("oscuro");
} else {
    cambiarIconosSegunTema("claro");
}
