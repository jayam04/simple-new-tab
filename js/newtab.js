import { DEFAULT_TAB_NAME } from './config/config.js';
import { updateClockDisplay, generatePastelColor, updateTabInDialog } from './helper.js';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelector('.show-modal');
const link1 = document.getElementById('link1');
const link2 = document.getElementById('link2');
const link3 = document.getElementById('link3');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

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
  btnsOpenModal.addEventListener('click', openModal);
  btnCloseModal.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });

  link1.addEventListener('click', function () {
    document.getElementById('main-heading').innerText = 'General Settings ✨';
    document.getElementById('content1').classList.remove('hidden');
    document.getElementById('content2').classList.add('hidden');
  });

  link2.addEventListener('click', function () {
    document.getElementById('main-heading').innerText =
      'Extensions Settings ✨';
    document.getElementById('content1').classList.add('hidden');
    document.getElementById('content2').classList.remove('hidden');
  });

  link3.addEventListener('click', function () {
    updateTabInDialog(2);
  });

  document.body.style.backgroundColor = generatePastelColor();

  await updateDigitalClockNewTab({
    forceUpdateFont: true,
    forceUpdateFontSize: true,
  });
  await updateTabTitle();
  await setRefreshInterval();
};

initializeNewTab();
