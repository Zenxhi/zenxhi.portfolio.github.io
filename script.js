const links = document.querySelectorAll("nav a");
const pages = document.querySelectorAll(".page");
const nav = document.querySelector("nav");
const indicator = document.querySelector(".nav-indicator");

const pageIds = Array.from(pages).map(page => page.id);

let currentIndex = 0;
let isWheeling = false;

function moveIndicator() {
    const activeLink = document.querySelector("nav a.active");
    if (!activeLink) return;

    const linkRect = activeLink.getBoundingClientRect();
    const navRect = nav.getBoundingClientRect();

    indicator.style.top = (linkRect.top - navRect.top) + "px";
    indicator.style.height = linkRect.height + "px";
}

function showPage(id) {
    const current = document.querySelector(".page.active");
    const next = document.getElementById(id);

    if (!next || current === next) return;

    // Animate current page out
    if (current) {
        current.classList.remove("active");
        current.classList.add("leaving");

        current.addEventListener("animationend", function handler() {
            current.classList.remove("leaving");
            current.removeEventListener("animationend", handler);
        });
    }

    // Animate next page in
    next.classList.add("active", "entering");

    next.addEventListener("animationend", function handler() {
        next.classList.remove("entering");
        next.removeEventListener("animationend", handler);
    });

    links.forEach(link => {
        const linkId = link.getAttribute("href").replace("#", "");
        link.classList.toggle("active", linkId === id);
    });

    moveIndicator();
    currentIndex = pageIds.indexOf(id);
}

function goToIndex(index) {
    const clamped = Math.max(0, Math.min(pageIds.length - 1, index));
    const id = pageIds[clamped];

    showPage(id);
    history.replaceState(null, "", "#" + id);
}

nav.addEventListener("wheel", function (event) {
    event.preventDefault();

    if (isWheeling) return;

    isWheeling = true;

    goToIndex(currentIndex + (event.deltaY > 0 ? 1 : -1));

    setTimeout(() => {
        isWheeling = false;
    }, 600);

}, { passive: false });

links.forEach(link => {
    link.addEventListener("click", function (event) {
        event.preventDefault();

        const id = this.getAttribute("href").replace("#", "");

        showPage(id);
        history.replaceState(null, "", "#" + id);
    });
});

showPage(location.hash.replace("#", "") || "home");

window.addEventListener("resize", moveIndicator);
requestAnimationFrame(moveIndicator);