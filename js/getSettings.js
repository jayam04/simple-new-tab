import {
  IS_AUTO_SAVE_ON,
  IS_CHROME_SYNC_ON,
  SYNC_SETTINGS_IN_REALTIME,
} from './constants.mts';

let chromeSync;
let autoSave;
let settingsSync;

export function isChromeSyncOn() {
  if (chromeSync === undefined) {
    chromeSync = !(localStorage.getItem(IS_CHROME_SYNC_ON) === 'false');
  }
  return chromeSync;
}

export function isAutoSaveOn() {
  if (autoSave === undefined) {
    autoSave = !(localStorage.getItem(IS_AUTO_SAVE_ON) === 'false');
  }
  return autoSave;
}

export function syncSettingsInRealtime() {
  if (settingsSync === undefined) {
    settingsSync = !(
      localStorage.getItem(SYNC_SETTINGS_IN_REALTIME) === 'false'
    );
  }
  return settingsSync;
}

// Get config for every item in items from chrome storage
export function getFromStorage(items) {
  let requiredResult = {};
  chrome.storage.sync.get(items, (result) => {
    requiredResult = result;
  });
}
