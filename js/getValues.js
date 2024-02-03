import {DEFAULT_SETTINGS} from "./constants.js";

// Get some basic settings
let chromeSync = localStorage.getItem("chromeSync");

// Init basic settings if not
if (chromeSync === null) {
    chromeSync = DEFAULT_SETTINGS.chromeSync;
    localStorage.setItem("chromeSync", chromeSync);
}

export const getPreference = (key) => {
    let value = localStorage.getItem(key);
    console.log(value)
    if (value === undefined || value === null) {
        value = DEFAULT_SETTINGS[key];
        localStorage.setItem(key, value);
    }
    return value;
}

export const savePreference = (key, value) => {
    console.log(`savePreference: ${key} = ${value}`);
    localStorage.setItem(key, value);
    // Save preference to chrome sync too.
    // TODO: make it faster using async if possible
    if (chromeSync) {
        const data = {};
        data[key] = value;
        chrome.storage.sync.set(data);
    }
}
