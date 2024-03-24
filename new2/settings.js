// Get references to the settings elements
const backgroundThemeSelect = document.getElementById('background-theme');
const clockFormatSelect = document.getElementById('clock-format');
const showSecondsCheckbox = document.getElementById('show-seconds');
const tabTitleInput = document.getElementById('tab-title');
const fontFamilySelect = document.getElementById('font-family');
const fontSizeInput = document.getElementById('font-size');
const noiseLevelSelect = document.getElementById('noise-level');
const syncProfilesCheckbox = document.getElementById('sync-profiles');
const refreshRateInput = document.getElementById('refresh-rate');
const saveSettingsButton = document.getElementById('save-settings');

// Load the saved settings
// TODO: fix it while implementing and uncomment it
// chrome.storage.sync.get(null, (settings) => {
//   backgroundThemeSelect.value = settings.backgroundTheme || "pastel";
//   clockFormatSelect.value = settings.clockFormat || "12";
//   showSecondsCheckbox.checked = settings.showSeconds || false;
//   tabTitleInput.value = settings.tabTitle || "";
//   fontFamilySelect.value = settings.fontFamily || "Arial";
//   fontSizeInput.value = settings.fontSize || 16;
//   noiseLevelSelect.value = settings.noiseLevel || "none";
//   syncProfilesCheckbox.checked = settings.syncProfiles || false;
//   refreshRateInput.value = settings.refreshRate || 1000;
// });

// Save the settings when the user clicks the "Save Settings" button
saveSettingsButton.addEventListener('click', () => {
    const settings = {
        backgroundTheme: backgroundThemeSelect.value,
        clockFormat: clockFormatSelect.value,
        showSeconds: showSecondsCheckbox.checked,
        tabTitle: tabTitleInput.value,
        fontFamily: fontFamilySelect.value,
        fontSize: parseInt(fontSizeInput.value, 10),
        noiseLevel: noiseLevelSelect.value,
        syncProfiles: syncProfilesCheckbox.checked,
        refreshRate: parseInt(refreshRateInput.value, 10),
    };

    chrome.storage.sync.set(settings, () => {
        console.log('Settings saved');
    });
});


// Add notices from notices.json
fetch('notices.json').then((notices) => {
    // For each response add notice
    notices.json().then((data) => {
        // for each key in data print key
        for (const key in data) {
            const notice = data[key];
            if (notice.duration) {
                startDate = new Date(notice.duration.from);
                endDate = new Date(notice.duration.to);

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

                    document
                        .getElementById('notice-board')
                        .appendChild(noticeElement);
                }
            }
        }
    });
});
