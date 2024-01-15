import { updateClock, generatePastelColor } from "./helper.js";


function updateClockNewTab(forceUpdateFont = false, forceUpdateFontSize = false) {
    updateClock("digitalClockNewTab", forceUpdateFont, forceUpdateFontSize)
}

// Update Tab Name
chrome.storage.sync.get(['newTabName'], function (result) {
    if (result.newTabName != undefined) {
        document.title = result.newTabName;
    }
    else {
        document.title = "Simple New Tab ✨"
    }
});

// Update the clock every second
setInterval(updateClockNewTab, 10);

// Initial update
updateClockNewTab(true, true);

// Update background
document.body.style.backgroundColor = generatePastelColor();

document.addEventListener("DOMContentLoaded", function() {
})