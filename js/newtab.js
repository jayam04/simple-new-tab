import { DEFAULT_TAB_NAME } from './config/config.js';
import { updateClockDisplay, generatePastelColor } from './helper.js';

const updateDigitalClockNewTab = async ({
  forceUpdateFont = false,
  forceUpdateFontSize = false,
} = {}) => {
  await updateClockDisplay({
    elementId: 'digitalClockNewTab',
    forceUpdateFont,
    forceUpdateFontSize,
  });
};

const updateTabTitle = async () => {
  const { newTabName } = await chrome.storage.sync.get(['newTabName']);
  document.title = newTabName || DEFAULT_TAB_NAME;
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
