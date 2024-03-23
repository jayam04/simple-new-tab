let syncWithChrome = localStorage.getItem('syncWithChrome') === true;

export function getPreference(preference) {
    return localStorage.getItem(preference);
}

export function getPreferences(preferences) {
    let result = {};
    preferences.forEach((preference) => {
        result[preference] = getPreference(preference);
    });
    return result;
}

export function setPreference(preference, value) {
    localStorage.setItem(preference, value);

    if (syncWithChrome) {
        chrome.storage.sync.set({ [preference]: value });
    }
}

export function setPreferences(preferences) {
    preferences.forEach((preference) => {
        setPreference(preference, preferences[preference]);
    });
}

export function toggleSyncWithChrome() {
    syncWithChrome = !syncWithChrome;
    localStorage.setItem('syncWithChrome', syncWithChrome);

    if (syncWithChrome) {
        chrome.storage.sync.get(null, (items) => {
            setPreferences(items);
        });
    }
}
