import { getGoogleFontUrl } from "./helper.js";

document.addEventListener("DOMContentLoaded", function () {
    // Load stored preferences on popup open
    chrome.storage.sync.get(
        ["showMilliseconds", "use12HourFormat", "googleFont"],
        function (result) {
            document.getElementById("showMilliseconds").checked =
                result.showMilliseconds || false;
            document.getElementById("use12HourFormat").checked =
                result.use12HourFormat || false;
            document.getElementById("googleFontInput").value =
                result.googleFont || "Roboto";
        }
    );

    // Event listener for "Apply Font" button
    document
        .getElementById("applyGoogleFont")
        .addEventListener("click", function () {
            const googleFontValue =
                document.getElementById("googleFontInput").value;
            applyGoogleFont(googleFontValue);
        });

    // Event listener for "Show Milliseconds" checkbox
    document
        .getElementById("showMilliseconds")
        .addEventListener("change", function () {
            const showMilliseconds = this.checked;
            savePreference("showMilliseconds", showMilliseconds);
        });

    // Event listener for "Use 12-Hour Clock" checkbox
    document
        .getElementById("use12HourFormat")
        .addEventListener("change", function () {
            const use12HourFormat = this.checked;
            savePreference("use12HourFormat", use12HourFormat);
        });
});

// Function to apply Google Font and save it to storage
function applyGoogleFont(fontFamily) {
    // document.getElementById(
    //     "googleFontStyle"
    // ).innerText = `body { font-family: '${fontFamily}', sans-serif; }`;
    // document.getElementById("font-import").innerText(getGoogleFontUrl(fontFamily));
    // document.getElementById("digitalClock").setAttribute("font-family", `${fontFamily}, 'Roboto'`);
    const fontStylesheet = document.createElement("link");
    fontStylesheet.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(
        / /g,
        "+"
    )}`;
    fontStylesheet.rel = "stylesheet";
    document.head.appendChild(fontStylesheet);

    // Apply the font to the clock element
    const digitalClockElement = document.getElementById("digitalClock");
    digitalClockElement.style.fontFamily = `'${fontFamily}', sans-serif`;

    savePreference("googleFont", fontFamily);
}

// Function to save a preference to Chrome storage
function savePreference(key, value) {
    const data = {};
    data[key] = value;
    chrome.storage.sync.set(data, function () {
        console.log(`${key} preference saved: ${value}`);
    });
}

function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    const timeString = `${hours}:${minutes}:${seconds}`;

    const digitalClockElement = document.getElementById("digitalClock");
    digitalClockElement.innerText = timeString;
    digitalClockElement.setAttribute("font-family", "Long Cang");
}

document.addEventListener("DOMContentLoaded", function () {
    // Initial update
    updateClock();
});

// Update the clock every second
setInterval(updateClock, 1000);
