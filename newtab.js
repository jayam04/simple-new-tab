import { updateClock, generatePastelColor } from "./helper.js";


function updateClockNewTab(forceUpdateFont = false, forceUpdateFontSize = false) {
    updateClock("digitalClockNewTab", forceUpdateFont, forceUpdateFontSize)
}

// Update the clock every second
setInterval(updateClockNewTab, 10);

// Initial update
updateClockNewTab(true, true);

// Update background
document.body.style.backgroundColor = generatePastelColor();
