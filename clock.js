import {updateClock} from "./helper.js";

// function updateClock() {
//     const now = new Date();
//     const hours = now.getHours().toString().padStart(2, "0");
//     const minutes = now.getMinutes().toString().padStart(2, "0");
//     const seconds = now.getSeconds().toString().padStart(2, "0");
//     const timeString = `${hours}:${minutes}:${seconds}`;
//
//     const digitalClockElement = document.getElementById("digitalClock");
//     digitalClockElement.innerText = timeString;
// }

document.addEventListener("DOMContentLoaded", function () {
    // Initial update
    updateClockPopUp(true)
});

function updateClockPopUp(forceUpdateFont = false) {
    updateClock("digitalClock", forceUpdateFont);
}
// Update the clock every second
setInterval(updateClockPopUp, 100);