import { getTimeToDisplay } from "./helper.js";

function updateClockNewTab() {
    const now = new Date();

    let showSeconds = true;
    let use12HourFormat = true;

    chrome.storage.sync.get(
        ["showMilliseconds", "use12HourFormat"],
        function (result) {
            showSeconds = result.showMilliseconds;
            use12HourFormat = result.use12HourFormat;
            const timeString = getTimeToDisplay(use12HourFormat, showSeconds);

            document.getElementById("digitalClockNewTab").innerText =
                timeString;
        }
    );
}

// Update the clock every second
setInterval(updateClockNewTab, 10);

// Initial update
updateClockNewTab();
