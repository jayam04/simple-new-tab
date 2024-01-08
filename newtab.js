import { getTimeToDisplay } from "./helper.js";

function updateFont(fontFamily) {
    const fontStylesheet = document.createElement("link");
    fontStylesheet.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(
        " ",
        "+"
    )}`;
    fontStylesheet.rel = "stylesheet";
    document.head.appendChild(fontStylesheet);
    const digitalClockElement = document.getElementById("digitalClockNewTab");
    digitalClockElement.style.fontFamily = `'${fontFamily}', sans-serif`;

}
function updateClockNewTab() {
    let showSeconds = true;
    let use12HourFormat = true;

    chrome.storage.sync.get(
        ["showMilliseconds", "use12HourFormat", "googleFont", "fontUpdated"],
        function (result) {
            showSeconds = result.showMilliseconds;
            use12HourFormat = result.use12HourFormat;
            const timeString = getTimeToDisplay(use12HourFormat, showSeconds);

            if (result.fontUpdated) {
                updateFont(result.googleFont);
            }

            document.getElementById("digitalClockNewTab").innerText =
                timeString;
            document.getElementById("digitalClockNewTab").style.fontFamily = `'${result.googleFont}', 'Roboto'`;
        }
    );
}

// Update the clock every second
setInterval(updateClockNewTab, 10);

// Initial update
updateClockNewTab();
