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

export function generatePastelColor(minLightness = 0.8, minSaturation = 0.5) {
    // Pastel colors typically have lower saturation and brightness
    const saturation = Math.random() * 0.4 + minSaturation; // Range: 0.5 to 0.9
    const lightness = Math.random() * 0.15 + minLightness; // Range: 0.8 to 9.5

    // Convert HSL to RGB
    const hue = Math.random() * 360;
    const hslColor = `hsl(${hue}, ${Math.floor(saturation * 100)}%, ${Math.floor(lightness * 100)}%)`;
    const rgbColor = hslToRgb(hue / 360, saturation, lightness);

    // Convert RGB to hex
    const hexColor = rgbToHex(rgbColor[0], rgbColor[1], rgbColor[2]);
    console.log("HSL Color:", hslColor);

    return hexColor;
}

// Convert HSL to RGB
function hslToRgb(h, s, l){
    let r, g, b;
  
    if(s === 0){
        r = g = b = l; // achromatic
    }else{
        const hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };
  
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }
  
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

// Convert RGB to hex
function rgbToHex(r, g, b) {
    const toHex = function (value) {
        const hex = value.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// Example usage
const pastelColor = generatePastelColor();
console.log("Random Pastel Color:", pastelColor);

