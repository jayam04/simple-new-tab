import {DEFAULT_TAB_NAME} from './config/config.js';
import {generatePastelColor, updateClockDisplay, updateTabInDialog} from './helper.js';
import {CLASSES, DEFAULT_SETTINGS, ELEMENTS, SECTIONS} from "../migration/js/constants.js";

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelector('.show-modal');
const link1 = document.getElementById('link1');
const link2 = document.getElementById('link2');
const link3 = document.getElementById('link3');

// Constants for page
let currentSection = DEFAULT_SETTINGS.section;

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

const loadAllSectionSelection = () => {
  // TODO: better name for `sectionHeadings`, also need to change constants.js based on it.
  const sectionHeadings = document.getElementById(ELEMENTS.sectionHeadingsDiv);
  for (let sectionsKey in SECTIONS) {
      let sectionElement = document.createElement('div');
      sectionElement.id = sectionsKey
      sectionElement.classList.add(CLASSES.sectionSelection);
      sectionElement.innerText = SECTIONS[sectionsKey].name;
      // Event listener for element
      sectionElement.addEventListener("click", handleSectionSelection)
      // TODO: optimize it to add all children in one go.
      sectionHeadings.appendChild(sectionElement);
  }
  // Mark default section as selected
  document.getElementById(DEFAULT_SETTINGS.section).classList.add(CLASSES.selectedSection);
}

const handleSectionSelection = (event) => {
  const selectedSection = event.target.id;
  document.getElementById(selectedSection).classList.add(CLASSES.selectedSection);
  if (currentSection) {
      document.getElementById(currentSection).classList.remove(CLASSES.selectedSection);
  }
  currentSection = selectedSection;
  // TODO: update heading
  // TODO: update content, add/remove hidden things
}

initializeNewTab();

document.addEventListener('DOMContentLoaded', () => {
  loadAllSectionSelection();
  // TODO: load sections
});
