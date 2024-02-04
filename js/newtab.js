import {applyFontSizeToElement, applyFontToElement} from "/js/helper.js";

import {} from './helper.js';
import {ELEMENTS, STORAGE_VALUES} from './constants.js';
import {getPreference} from "./getValues.js";
import {
    fetchSettingsFromChrome,
    generatePastelColor,
    updateBackgroundNoise,
    updateDigitalClockNewTab
} from "./helper.js";

let noise = getPreference(STORAGE_VALUES.noise);
let backgroundType = getPreference(STORAGE_VALUES.backgroundType);
let clockType = getPreference(STORAGE_VALUES.clockType);
let showSeconds = getPreference(STORAGE_VALUES.showSeconds);
let fontSize = getPreference(STORAGE_VALUES.fontSize);
let fontFamily = getPreference(STORAGE_VALUES.fontFamily);

// Background Color
document.body.style.backgroundColor = generatePastelColor(backgroundType === "pastel-light");
if (noise !== "none") {
    await updateBackgroundNoise(noise, backgroundType);
}
if (clockType === "12hr" || clockType === "24hr") {
    await updateDigitalClockNewTab(clockType === "12hr", showSeconds === "true")
}

// Font
applyFontToElement(ELEMENTS.digitalClock, fontFamily);
applyFontSizeToElement(fontSize, ELEMENTS.digitalClock);

// Clock
if (clockType === "12hr" || clockType === "24hr") {
    setInterval(() => updateDigitalClockNewTab(clockType === "12hr", showSeconds === "true"), 1000 / getPreference(STORAGE_VALUES.refreshRate));
}
// TODO: better way to do it
if (backgroundType === "pastel-dark") {
    document.getElementById(ELEMENTS.digitalClock).style.color = "white";
    // document.querySelector(".svgClass").getSVGDocument().getElementById("svgInternalID").setAttribute("fill", "red")
    
    var svgElements = document.getElementsByClassName("svg");
    for (let element of svgElements) {
        console.log(element, "ELEMENT");
        element.style.fill = "white";
        element.setAttribute("fill", "white");
    }
}

// Sync data from Chrome to local Storage
await fetchSettingsFromChrome().then(
    data => {
        for (let key in data) {
            switch (key) {
                case "noise":
                    noise = data[key];
                    break;
                case "backgroundType":
                    backgroundType = data[key];
                    break;
                case "clockType":
                    clockType = data[key];
                    break;
                case "showSeconds":
                    showSeconds = data[key];
                    break;
                case "fontSize":
                    fontSize = data[key];
                    break;
                case "fontFamily":
                    fontFamily = data[key];
                    break;
            }
        }
    }
);
