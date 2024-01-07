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
            applyGoogleFont(googleFontValue, "digitalClock");
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
function applyGoogleFont(fontFamily, elementId) {
    const fontStylesheet = document.createElement("link");
    fontStylesheet.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(
        " ",
        "+"
    )}`;
    fontStylesheet.rel = "stylesheet";
    document.head.appendChild(fontStylesheet);

    if (!elementId) {
        elementId = "digitalClock";
    }

    // Apply the font to the clock element
    const digitalClockElement = document.getElementById(elementId);
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