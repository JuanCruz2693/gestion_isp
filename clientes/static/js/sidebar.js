const body = document.body,
    sidebar = body.querySelector('nav'),
    toggle = body.querySelector(".toggle"),
    searchBtn = body.querySelector(".search-box"),
    themeActual = localStorage.getItem('theme'),
    switchControl = document.getElementById("modeSwitch");

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
