const links = document.querySelectorAll("nav a"); // Finds links in the class nav a and labels them as 'links'
const pages = document.querySelectorAll(".page"); // Finds elements in every page and labels them as 'pages'
const indicator = document.querySelector(".nav-indicator"); // Finds the element in nav indicator and labels it as 'indicator'

// Move the red bar
function moveIndicator() { // Function name for the red bar indicator

    let active = document.querySelector("nav a.active"); // Finds the active link in the navigation

    if (active) {
        indicator.style.top = active.offsetTop + "px"; // Moves the red bar indicator to match the active link
        indicator.style.height = active.offsetHeight + "px"; // Resized the bar to match the navigation link height
    }

}

// Show selected page
function showPage(index) {

    // Removes active page label as "active" and link
    for (let i = 0; i < pages.length; i++) { 
        pages[i].classList.remove("active");
        links[i].classList.remove("active");
    }

    // Show selected page and label as "active"
    pages[index].classList.add("active");
    links[index].classList.add("active");

    moveIndicator(); //Slides the bar to match the current active page

}

// Navigation click
// Stops from jumping to a new page when clicked and shows current active page 
for (let i = 0; i < links.length; i++) {

    links[i].addEventListener("click", function (e) {

        e.preventDefault();

        showPage(i);

    });

}

// Open Home page upon start
showPage(0);

// Update indicator if window size changes
window.addEventListener("resize", moveIndicator);