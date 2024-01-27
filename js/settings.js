import { applyFontToElement, savePreference } from './helper.js';

const fontSize = document.getElementById('fontSize');
const fontFamily = document.getElementById('fontFamily');
const newTabName = document.getElementById('newTabName');
const refreshRate = document.getElementById('refreshRate');
const showMilliseconds = document.getElementById('showMilliseconds');
const use12HourFormat = document.getElementById('use12HourFormat');

document.addEventListener('DOMContentLoaded', async function () {
  const storageFields = [
    'showMilliseconds',
    'use12HourFormat',
    'newTabName',
    'fontFamily',
    'refreshRate',
    'fontSizeUpdated',
    'fontSize',
  ];

  const preferences = await chrome.storage.sync.get(storageFields);

  showMilliseconds.checked = preferences.showMilliseconds;
  use12HourFormat.checked = preferences.use12HourFormat;
  newTabName.value = preferences.newTabName;
  refreshRate.value = preferences.refreshRate;
  fontFamily.value = preferences.fontFamily;
  fontSize.value = preferences.fontSize;

  newTabName.addEventListener('change', function () {
    const newTabNameValue = this.value;
    savePreference('newTabName', newTabNameValue);
  });

  showMilliseconds.addEventListener('change', function () {
    const showMillisecondsChecked = this.checked;
    savePreference('showMilliseconds', showMillisecondsChecked);
  });

  use12HourFormat.addEventListener('change', function () {
    const use12HourFormatChecked = this.checked;
    savePreference('use12HourFormat', use12HourFormatChecked);
  });

  fontFamily.addEventListener('change', function () {
    const fontFamilyValue = this.value;
    applyFontToElement('digitalClockNewTab', fontFamilyValue);
    savePreference('fontFamily', fontFamilyValue);
  });

  fontSize.addEventListener('change', function () {
    const fontSizeValue = this.value;
    savePreference('fontSize', fontSizeValue);
    savePreference('fontSizeUpdated', true);
  });

  refreshRate.addEventListener('change', function () {
    const refreshRateValue = this.value;
    savePreference('refreshRate', refreshRateValue);
  });
});
