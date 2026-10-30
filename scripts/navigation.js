
const menuButton = document.querySelector("#menu");
const navigation = document.querySelector("#nav-menu");

menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");

    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    menuButton.textContent = isOpen ? "✕" : "☰";
});
