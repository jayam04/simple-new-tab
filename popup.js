import {getGoogleFontUrl, setFontToElement, savePreference} from "./helper.js";

document.addEventListener("DOMContentLoaded", function () {
    // Load stored preferences on popup open
    chrome.storage.sync.get(
        ["showMilliseconds", "use12HourFormat", "googleFont", "fontSize", "newTabName"],
        function (result) {
            document.getElementById("showMilliseconds").checked =
                result.showMilliseconds || false;
            document.getElementById("use12HourFormat").checked =
                result.use12HourFormat || false;
            document.getElementById("googleFontInput").value =
                result.googleFont || "Roboto";
            document.getElementById("fontSize").value = result.fontSize;
            document.getElementById("newTabName").value = result.newTabName;
        }
    );

    // Event listner for Tab Name
    document
        .getElementById("newTabName")
        .addEventListener("change", function () {
            savePreference("newTabName", this.value);
        });

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

    document
        .getElementById("fontSize")
        .addEventListener("change", function () {
            savePreference("fontSize", document.getElementById("fontSize").value);
            savePreference("fontSizeUpdated", true)
        })
});

// Function to apply Google Font and save it to storage
function applyGoogleFont(fontFamily, elementId) {
    setFontToElement(fontFamily, elementId)
    savePreference("googleFont", fontFamily);
    savePreference("fontUpdated", true);
}
