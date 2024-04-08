import { applyFontSizeToElement, applyFontToElement } from '/helper.js';

// import {getPreference} from "./getValues.js";
import {
    fetchSettingsFromChrome,
    generatePastelColor,
    updateBackgroundNoise,
    updateDigitalClockNewTab
} from './helper.js';
import { ELEMENTS, STORAGE_VALUES } from './constants.js';
import { getPreference } from './storage.js';
import { preferences } from './preferences.js';

// let noise = getPreference(STORAGE_VALUES.noise);
// let backgroundType = getPreference(STORAGE_VALUES.backgroundType);
// let clockType = getPreference(STORAGE_VALUES.clockType);
// let showSeconds = getPreference(STORAGE_VALUES.showSeconds);
// let fontSize = getPreference(STORAGE_VALUES.fontSize);
// let fontFamily = getPreference(STORAGE_VALUES.fontFamily);
let result = {};
for (const key in preferences) {
    const element = preferences[key];
    let subResult = getPreference(element.storageKey);

    if (subResult === null) {
        subResult = element.defaultValue;
    }

    result[key] = subResult;
}


let noise = result.noise;
let backgroundType = result.theme;
let clockType = result.clockFormat;
let showSeconds = result.showSeconds;
let fontSize = result.fontSize;
let fontFamily = result.fontFamily;
let newTabName = getPreference(preferences.tabTitle.storageKey) || preferences.tabTitle.defaultValue;

console.info(noise, backgroundType, clockType, showSeconds, fontSize, fontFamily, newTabName);

// Background Color
document.body.style.backgroundColor = generatePastelColor(backgroundType === 'pastel');
if (noise !== 'none') {
    await updateBackgroundNoise(noise, backgroundType);
}
if (clockType === '12hr' || clockType === '24hr') {
    await updateDigitalClockNewTab(clockType === '12hr', showSeconds === 'true');
}

let quickSettings = result.quickSettings;
if (quickSettings || quickSettings === 'true') {
    document.getElementById('quick-settings').classList.remove('gone');
}

// Font
applyFontToElement(ELEMENTS.digitalClock, fontFamily);
applyFontSizeToElement(fontSize, ELEMENTS.digitalClock);

// Clock
if (clockType === '12hr' || clockType === '24hr') {
    setInterval(() => updateDigitalClockNewTab(clockType === '12hr', showSeconds === 'true'), 1000 / getPreference(STORAGE_VALUES.refreshRate));
}
// TODO: better way to do it
if (backgroundType === 'pastel-dark') {
    document.getElementById(ELEMENTS.digitalClock).style.color = 'white';
    // document.querySelector(".svgClass").getSVGDocument().getElementById("svgInternalID").setAttribute("fill", "red")

    var svgElements = document.getElementsByClassName('svg');
    for (let element of svgElements) {
        element.style.fill = 'white';
        element.setAttribute('fill', 'white');
    }

    document.getElementById('quick-settings').style.background = 'white';
    for (let element of document.getElementsByClassName('quick-settings-a')) {
        element.style.color = 'black';
    }
}

// New Tab Name
document.title = newTabName;

// Sync data from Chrome to local Storage
await fetchSettingsFromChrome().then(
    data => {
        for (let key in data) {
            switch (key) {
                case 'noise':
                    noise = data[key];
                    break;
                case 'backgroundType':
                    backgroundType = data[key];
                    break;
                case 'clockType':
                    clockType = data[key];
                    break;
                case 'showSeconds':
                    showSeconds = data[key];
                    break;
                case 'fontSize':
                    fontSize = data[key];
                    break;
                case 'fontFamily':
                    fontFamily = data[key];
                    break;
                case 'newTabName':
                    newTabName = data[key];
                    break;
                // TODO: fix, new data is not synced to lacal and also isn't reflected ie. tabName, etc
            }
        }
    }
);
