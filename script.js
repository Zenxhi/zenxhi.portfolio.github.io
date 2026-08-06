const links = document.querySelectorAll("nav a");
const pages = document.querySelectorAll(".page");
const nav = document.querySelector("nav");
const indicator = document.querySelector(".nav-indicator");

// Move the red bar
function moveIndicator() {

    let active = document.querySelector("nav a.active");

    if (active) {
        indicator.style.top = active.offsetTop + "px";
        indicator.style.height = active.offsetHeight + "px";
    }

}

// Show selected page
function showPage(index) {

    // Remove active page and link
    for (let i = 0; i < pages.length; i++) {
        pages[i].classList.remove("active");
        links[i].classList.remove("active");
    }

    // Show selected page
    pages[index].classList.add("active");
    links[index].classList.add("active");

    moveIndicator();

}

// Navigation click
for (let i = 0; i < links.length; i++) {

    links[i].addEventListener("click", function (e) {

        e.preventDefault();

        showPage(i);

    });

}

// Open Home page
showPage(0);

// Update indicator if window size changes
window.addEventListener("resize", moveIndicator);