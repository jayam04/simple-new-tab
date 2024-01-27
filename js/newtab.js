import { DEFAULT_SETTINGS } from './constants.js';

import {
  applyFontToElement,
  applyFontSizeToElement,
  savePreference,
  getFormattedTime,
  generatePastelColor,
} from './helper.js';

const updateDigitalClockNewTab = async ({
  forceUpdateFont = false,
  forceUpdateFontSize = false,
} = {}) => {
  const storageFields = [
    'showMilliseconds',
    'use12HourFormat',
    'fontFamily',
    'refreshRate',
    'fontSizeUpdated',
    'fontSize',
  ];

  const {
    showMilliseconds,
    use12HourFormat,
    fontFamily,
    fontUpdated,
    fontSize,
    fontSizeUpdated,
  } = await chrome.storage.sync.get(storageFields);

  if (forceUpdateFont || fontUpdated) {
    applyFontToElement('digitalClockNewTab', fontFamily);
    savePreference('fontUpdated', false);
  }

  if (forceUpdateFontSize || fontSizeUpdated) {
    applyFontSizeToElement(fontSize, 'digitalClockNewTab');
  }

  const formattedTime = getFormattedTime(use12HourFormat, showMilliseconds);

  const clockElement = document.getElementById('digitalClockNewTab');
  clockElement.innerText = formattedTime;
  clockElement.style.fontFamily = `'${fontFamily}', 'Roboto'`;
};

const updateTabTitle = async () => {
  const { newTabName } = await chrome.storage.sync.get(['newTabName']);
  document.title = newTabName || DEFAULT_SETTINGS.DEFAULT_TAB_NAME;
};

const setRefreshInterval = async () => {
  const { refreshRate = 5 } = await chrome.storage.sync.get(['refreshRate']);
  setInterval(() => updateDigitalClockNewTab(), 1000 / refreshRate);
};

const initializeNewTab = async () => {
  document.body.style.backgroundColor = generatePastelColor();

  await updateDigitalClockNewTab({
    forceUpdateFont: true,
    forceUpdateFontSize: true,
  });
  await updateTabTitle();
  await setRefreshInterval();
};

initializeNewTab();
