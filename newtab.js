import { getTimeToDisplay } from "./helper.js";
import { applyGoogleFont } from "./popup.js"
function updateClockNewTab() {
    let showSeconds = true;
    let use12HourFormat = true;

    chrome.storage.sync.get(
        ["showMilliseconds", "use12HourFormat", "googleFont"],
        function (result) {
            showSeconds = result.showMilliseconds;
            use12HourFormat = result.use12HourFormat;
            const timeString = getTimeToDisplay(use12HourFormat, showSeconds);

            document.getElementById("digitalClockNewTab").innerText =
                timeString;
            document.getElementById("digitalClockNewTab").style.fontFamily = `'${result.googleFont}', 'Roboto'`;
            applyGoogleFont(result.googleFont, "digitalClockNewTab");
        }
    );
}

// Update the clock every second
setInterval(updateClockNewTab, 10);

// Initial update
updateClockNewTab();
