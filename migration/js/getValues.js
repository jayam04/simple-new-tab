import { DEFAULT_SETTINGS } from "./constants.js";

// Get some basic settings
let chromeSync = localStorage.getItem("chromeSync");

// Init basic settings if not
if (chromeSync === null) {
  chromeSync = DEFAULT_SETTINGS.chromeSync;
  localStorage.setItem("chromeSync", chromeSync);
}

export const getPreference = (key) => {
    let value = localStorage.getItem(key);
    // TODO: fix if condition not working as expected.
    if (value === undefined) {
        value = DEFAULT_SETTINGS[key];
        console.log(value);
        localStorage.setItem(key, value);
    }
    console.log(`getPreference: ${key} = ${value}`);
    return value;
}

export const savePreference = (key, value) => {
    localStorage.setItem(key, value);
    // Save preference to chrome sync too.
    // TODO: make it faster using async if possible
    if (chromeSync) {
        const data = {};
        data[key] = value;
        chrome.storage.sync.set(data);
    }
}
