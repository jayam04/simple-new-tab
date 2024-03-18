// Get references to the settings elements
const backgroundThemeSelect = document.getElementById("background-theme");
const clockFormatSelect = document.getElementById("clock-format");
const showSecondsCheckbox = document.getElementById("show-seconds");
const tabTitleInput = document.getElementById("tab-title");
const fontFamilySelect = document.getElementById("font-family");
const fontSizeInput = document.getElementById("font-size");
const noiseLevelSelect = document.getElementById("noise-level");
const syncProfilesCheckbox = document.getElementById("sync-profiles");
const refreshRateInput = document.getElementById("refresh-rate");
const saveSettingsButton = document.getElementById("save-settings");

// Load the saved settings
chrome.storage.sync.get(null, (settings) => {
  backgroundThemeSelect.value = settings.backgroundTheme || "pastel";
  clockFormatSelect.value = settings.clockFormat || "12";
  showSecondsCheckbox.checked = settings.showSeconds || false;
  tabTitleInput.value = settings.tabTitle || "";
  fontFamilySelect.value = settings.fontFamily || "Arial";
  fontSizeInput.value = settings.fontSize || 16;
  noiseLevelSelect.value = settings.noiseLevel || "none";
  syncProfilesCheckbox.checked = settings.syncProfiles || false;
  refreshRateInput.value = settings.refreshRate || 1000;
});

// Save the settings when the user clicks the "Save Settings" button
saveSettingsButton.addEventListener("click", () => {
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
    console.log("Settings saved");
  });
});