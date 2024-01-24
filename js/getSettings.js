import {IS_AUTO_SAVE_ON, IS_CHROME_SYNC_ON, SYNC_SETTINGS_IN_REALTIME} from "./constants.mts";

let chromeSync :boolean;
let autoSave :boolean;
let settingsSync :boolean;

export function isChromeSyncOn() :boolean {
    if (chromeSync === undefined) {
        chromeSync = !(localStorage.getItem(IS_CHROME_SYNC_ON) === "false");
    }
    return chromeSync;
}

export function isAutoSaveOn() :boolean {
    if (autoSave === undefined) {
        autoSave = !(localStorage.getItem(IS_AUTO_SAVE_ON) === "false");
    }
    return autoSave;
}

export function syncSettingsInRealtime() :boolean {
    if (settingsSync === undefined) {
        settingsSync = !(localStorage.getItem(SYNC_SETTINGS_IN_REALTIME) === "false");
    }
    return settingsSync;
}
