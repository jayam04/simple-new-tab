import { preferences } from './preferences.js';
import { getPreference, setPreference } from './storage.js';
import { noticeList } from './constants.js';

// Get references to the settings elements
const backgroundThemeSelect = {
    element: document.getElementById('background-theme'),
    storage: 'theme',
    default: 'pastel'
};
const clockFormatSelect = {
    element: document.getElementById('clock-format'),
    storage: 'format',
    default: '12hr'
};
const showSecondsCheckbox = {
    element: document.getElementById('show-seconds'),
    storage: 'seconds',
    default: false
};
const tabTitleInput = {
    element: document.getElementById('tab-title'),
    storage: 'title',
    default: 'Simple New Tab'
};
// TODO: reomove one
// const fontFamilySelect = {
//     element: document.getElementById('font-family'),
//     storage: 'fontFamily',
//     default: 'Protest Riot',
// };
const fontFamilyInput = {
    element: document.getElementById('font-family-input'),
    storage: 'fontFamily',
    default: 'Protest Riot'
};
const fontSizeInput = {
    element: document.getElementById('font-size'),
    storage: 'fontSize',
    default: 54
};
const noiseLevelSelect = {
    element: document.getElementById('noise-level'),
    storage: 'noiseLevel',
    default: 'low'
};
const quickSettingsCheckbox = {
    element: document.getElementById('show-quick-settings'),
    storage: 'quickSettings',
    default: true
};
const syncProfilesCheckbox = {
    element: document.getElementById('sync-profiles'),
    storage: 'syncWithChrome',
    default: true
};

const refreshRateInput = {
    element: document.getElementById('refresh-rate'),
    storage: 'refreshRate',
    default: 30
};
const saveSettingsButton = {
    element: document.getElementById('save-settings'),
    storage: null
};

const clearStorageButton = {
    element: document.getElementById('clear-storage'),
    storage: null
};

// const toastLiveExample = {element: document.getElementById('liveToast')}

// if (toastTrigger) {
//   const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample.element)
//   toastTrigger.element.addEventListener('click', () => {
//     toastBootstrap.show()
//   })
// }

// Load the saved settings
syncProfilesCheckbox.element.checked =
    localStorage.getItem(syncProfilesCheckbox.storage) === 'true';
let useChrome = localStorage.getItem(syncProfilesCheckbox.storage) === 'true';

let currentSettings = { hehe: 1 };

function updateFields() {
    // useChrome = localStorage.getItem(syncProfilesCheckbox.storage) === 'true';
    // if (useChrome) {
    //     console.log('using chrome');
    //     chrome.storage.sync.get((settings) => {
    //         console.log(settings);
    //         currentSettings = settings.settings || {};
    //         console.log(currentSettings);
    //         backgroundThemeSelect.element.value =
    //             currentSettings[backgroundThemeSelect.storage] ||
    //             backgroundThemeSelect.default;
    //         clockFormatSelect.element.value =
    //             currentSettings[clockFormatSelect.storage] ||
    //             clockFormatSelect.default;
    //         showSecondsCheckbox.element.checked =
    //             currentSettings[showSecondsCheckbox.storage] === null
    //                 ? showSecondsCheckbox.default
    //                 : currentSettings[showSecondsCheckbox.storage];
    //         tabTitleInput.element.value =
    //             currentSettings[tabTitleInput.storage] || tabTitleInput.default;
    //         // fontFamilySelect.element.value = fontFamily || 'Arial';
    //         fontFamilyInput.element.value =
    //             currentSettings[fontFamilyInput.storage] ||
    //             fontFamilyInput.default;
    //         fontSizeInput.element.value =
    //             currentSettings[fontSizeInput.storage] || fontSizeInput.default;
    //         noiseLevelSelect.element.value =
    //             currentSettings[noiseLevelSelect.storage] ||
    //             noiseLevelSelect.default;
    //         quickSettingsCheckbox.element.checked =
    //             currentSettings[quickSettingsCheckbox.storage] === null
    //                 ? quickSettingsCheckbox.default
    //                 : currentSettings[quickSettingsCheckbox.storage];
    //         refreshRateInput.element.value =
    //             currentSettings[refreshRateInput.storage] ||
    //             refreshRateInput.default;
    //     });
    // } else {
    //     console.log('using local');
    backgroundThemeSelect.element.value =
        localStorage.getItem(backgroundThemeSelect.storage) ||
        backgroundThemeSelect.default;
    clockFormatSelect.element.value =
        localStorage.getItem(clockFormatSelect.storage) ||
        clockFormatSelect.default;
    showSecondsCheckbox.element.checked =
        localStorage.getItem(showSecondsCheckbox.storage) === 'true';
    tabTitleInput.element.value =
        getPreference(preferences.tabTitle.storageKey) || preferences.tabTitle.defaultValue;
    // fontFamilySelect.element.value =
    //     localStorage.getItem(fontFamilySelect.storage) ||
    //     fontFamilySelect.default;
    fontFamilyInput.element.value =
        localStorage.getItem(fontFamilyInput.storage) ||
        fontFamilyInput.default;
    fontSizeInput.element.value =
        getPreference(preferences.fontSize.storageKey) || preferences.fontSize.defaultValue;
    noiseLevelSelect.element.value =
        localStorage.getItem(noiseLevelSelect.storage) ||
        noiseLevelSelect.default;
    const syncProfiles = getPreference(preferences.syncWithChrome.storageKey);
    syncProfilesCheckbox.element.checked =
        syncProfiles === null ? preferences.syncWithChrome.defaultValue : syncProfiles === 'true';
    refreshRateInput.element.value =
        getPreference(preferences.refreshRate.storageKey) || preferences.refreshRate.defaultValue;
    const quickSettingsPreference = getPreference(
        preferences.quickSettings.storageKey
    );
    quickSettingsCheckbox.element.checked =
        quickSettingsPreference === null
            ? preferences.quickSettings.defaultValue
            : quickSettingsPreference === 'true';
}

// }

updateFields();

clearStorageButton.element.addEventListener('click', () => {
    if (useChrome) {
        chrome.storage.sync.clear();
    }
    localStorage.clear();

    updateFields();
});

syncProfilesCheckbox.element.addEventListener('change', () => {
    localStorage.setItem(
        syncProfilesCheckbox.storage,
        syncProfilesCheckbox.element.checked
    );
    useChrome = syncProfilesCheckbox.element.checked;
    updateFields();
});

backgroundThemeSelect.element.addEventListener('change', () => {
    setPreference(
        preferences.theme.storageKey,
        backgroundThemeSelect.element.value
    );
});

clockFormatSelect.element.addEventListener('change', () => {
    setPreference(
        preferences.clockFormat.storageKey,
        clockFormatSelect.element.value
    );
});

showSecondsCheckbox.element.addEventListener('change', () => {
    setPreference(
        preferences.showSeconds.storageKey,
        showSecondsCheckbox.element.checked
    );
});

tabTitleInput.element.addEventListener('change', () => {
    setPreference(preferences.tabTitle.storageKey, tabTitleInput.element.value);
});

fontFamilyInput.element.addEventListener('change', () => {
    setPreference(
        preferences.fontFamily.storageKey,
        fontFamilyInput.element.value
    );
});

fontSizeInput.element.addEventListener('change', () => {
    setPreference(preferences.fontSize.storageKey, fontSizeInput.element.value);
});

quickSettingsCheckbox.element.addEventListener('change', () => {
    setPreference(
        preferences.quickSettings.storageKey,
        quickSettingsCheckbox.element.checked
    );
});

const showStopwatchCheckbox = {
    element: document.getElementById('show-stopwatch'),
    storage: 'showStopwatch',
    default: false
};

showStopwatchCheckbox.element.checked = getPreference(preferences.showStopwatch.storageKey) === 'true';

showStopwatchCheckbox.element.addEventListener('change', () => {
    setPreference(
        preferences.showStopwatch.storageKey,
        showStopwatchCheckbox.element.checked
    );
});

refreshRateInput.element.addEventListener('change', () => {
    setPreference(
        preferences.refreshRate.storageKey,
        refreshRateInput.element.value
    );
});

noiseLevelSelect.element.addEventListener('change', () => {
    if (useChrome) {
        currentSettings[noiseLevelSelect.storage] =
            noiseLevelSelect.element.value;
        chrome.storage.sync.set({
            settings: currentSettings
        });
    }
    localStorage.setItem(
        noiseLevelSelect.storage,
        noiseLevelSelect.element.value
    );
});

// Add notices from notices.json
fetch(
    noticeList
).then((notices) => {
    // For each response add notice
    notices.json().then((data) => {
        // for each key in data print key
        for (const key in data) {
            const notice = data[key];
            if (notice.page === 'settings' && notice.duration) {
                const startDate = new Date(notice.duration['from']);
                const endDate = new Date(notice.duration.to);

                if (startDate <= new Date() && new Date() <= endDate) {
                    const noticeElement = document.createElement('div');
                    noticeElement.classList.add('notice-container');
                    noticeElement.id = `notice-${key}`;

                    const noticeTitle = document.createElement('h5');
                    noticeTitle.classList.add('notice-title');
                    noticeTitle.textContent = notice.title;

                    const noticeContent = document.createElement('p');
                    noticeContent.classList.add('notice-content');
                    noticeContent.textContent = notice.content;

                    noticeElement.appendChild(noticeTitle);
                    noticeElement.appendChild(noticeContent);

                    if (notice.url) {
                        const moreInfoHref = document.createElement('a');
                        moreInfoHref.classList.add('notice-more-info');
                        moreInfoHref.href = notice.url;
                        moreInfoHref.textContent = 'more info';

                        noticeElement.appendChild(moreInfoHref);
                    }
                    document
                        .getElementById('notice-board')
                        .appendChild(noticeElement);
                }
            }
        }
    });
});
