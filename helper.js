export function getTimeToDisplay(use12HourFormat, displaySeconds) {
    const now = new Date();
    let hours = now.getHours().toString().padStart(2, "0");
    let minutes = now.getMinutes().toString().padStart(2, "0");
    let seconds = now.getSeconds().toString().padStart(2, "0");
    let ampm = "";
    if (!displaySeconds) {
        seconds = "";
    } else {
        seconds = `:${seconds}`
    }
    if (use12HourFormat) {
        if (hours > 12) {
            hours -= 12;
            ampm = " PM";
        } else {
            ampm = " AM";
        }
    }
    return `${hours}:${minutes}${seconds}${ampm}`;
}

export function getGoogleFontUrl(fontName) {
    // `@import url('https://fonts.googleapis.com/css2?family=Long+Cang&family=Patua+One&family=Roboto&display=swap');`;
    const baseURL = `https://fonts.googleapis.com/css2`;
    const fontPlus = fontName.replace(" ", "+");
    const fontQuery = `family=${fontPlus}:wght@400;700&display=swap`;
    const fontURL = `${baseURL}?${fontQuery}`;
    const importURL = `@import url('${fontURL}');`;
    return importURL;
}

export function setFontToElement(fontName, elementId) {
    const googleFontsCssBaseUrl = `https://fonts.googleapis.com/css2?`;
    const fontStylesheet = document.createElement("link");
    fontStylesheet.href = `${googleFontsCssBaseUrl}family=${fontName.replace(" ", "+")}`;
    fontStylesheet.rel = "stylesheet";
    document.head.appendChild(fontStylesheet);

    const digitalClockElement = document.getElementById(elementId);
    digitalClockElement.style.fontFamily = `'${fontName}', 'Roboto', sans-serif`;
}

export function setFontSizeToElement(fontSizeInPx, elementId) {
    const digitalClockElement = document.getElementById(elementId);
    digitalClockElement.style.fontSize = `${fontSizeInPx}px`;
}

// Function to save a preference to Chrome storage
export function savePreference(key, value) {
    const data = {};
    data[key] = value;
    chrome.storage.sync.set(data, function () {
        console.log(`${key} preference saved: ${value}`);
    });
}

export function updateClock(elementId, forceUpdateFont = false, forceUpdateFontSize = false) {
    let showSeconds = true;
    let use12HourFormat = true;

    chrome.storage.sync.get(
        ["showMilliseconds", "use12HourFormat", "googleFont", "fontUpdated", "fontSizeUpdated", "fontSize"],
        function (result) {
            showSeconds = result.showMilliseconds;
            use12HourFormat = result.use12HourFormat;
            const timeString = getTimeToDisplay(use12HourFormat, showSeconds);

            if (forceUpdateFont || result.fontUpdated) {
                setFontToElement(result.googleFont, "digitalClockNewTab");
                savePreference("fontUpdated", false);
            }

            if (forceUpdateFontSize || result.fontSizeUpdated) {
                setFontSizeToElement(result.fontSize, elementId);
            }

            document.getElementById(elementId).innerText = timeString;
            document.getElementById(elementId).style.fontFamily = `'${result.googleFont}', 'Roboto'`;
        }
    );
}
