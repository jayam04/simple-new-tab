import { generatePastelColor, updateClock } from "./helper.js";

document.addEventListener("DOMContentLoaded", () => {
    const heading = document.getElementById("main-heading");

    heading.addEventListener("mouseenter", () => {
        let interval = setInterval(() => {
            heading.style.color = generatePastelColor(0.4, 0.5);
        }, 500);

        heading.addEventListener("mouseleave", () => {
            clearInterval(interval);
            heading.style.color = "black";
        });
    });

f});
