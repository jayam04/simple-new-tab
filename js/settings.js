import { applyFontToElement, savePreference } from "./helper.js";

import {
  CLASSES,
  DEFAULT_SETTINGS,
  ELEMENTS,
  SECTIONS,
} from "../migration/js/constants.js";

const fontSize = document.getElementById("fontSize");
const fontFamily = document.getElementById("fontFamily");
const newTabName = document.getElementById("newTabName");
const refreshRate = document.getElementById("refreshRate");
const showMilliseconds = document.getElementById("showMilliseconds");
const use12HourFormat = document.getElementById("use12HourFormat");

const link1 = document.getElementById("link1");
const link2 = document.getElementById("link2");
const link3 = document.getElementById("link3");

let currentSection = DEFAULT_SETTINGS.section;

document.addEventListener("DOMContentLoaded", async function () {
  // link1.addEventListener("click", function () {
  //   document.getElementById("main-heading").innerText = "General Settings ✨";
  //   document.getElementById("content1").classList.remove("hidden");
  //   document.getElementById("content2").classList.add("hidden");
  // });

  // link2.addEventListener("click", function () {
  //   document.getElementById("main-heading").innerText =
  //     "Extensions Settings ✨";
  //   document.getElementById("content1").classList.add("hidden");
  //   document.getElementById("content2").classList.remove("hidden");
  // });

  // link3.addEventListener("click", function () {
  //   updateTabInDialog(2);
  // });

  const storageFields = [
    "showMilliseconds",
    "use12HourFormat",
    "newTabName",
    "fontFamily",
    "refreshRate",
    "fontSizeUpdated",
    "fontSize",
  ];

  const preferences = await chrome.storage.sync.get(storageFields);

  showMilliseconds.checked = preferences.showMilliseconds;
  use12HourFormat.checked = preferences.use12HourFormat;
  newTabName.value = preferences.newTabName;
  refreshRate.value = preferences.refreshRate;
  fontFamily.value = preferences.fontFamily;
  fontSize.value = preferences.fontSize;

  newTabName.addEventListener("change", function () {
    const newTabNameValue = this.value;
    savePreference("newTabName", newTabNameValue);
  });

  showMilliseconds.addEventListener("change", function () {
    const showMillisecondsChecked = this.checked;
    savePreference("showMilliseconds", showMillisecondsChecked);
  });

  use12HourFormat.addEventListener("change", function () {
    const use12HourFormatChecked = this.checked;
    savePreference("use12HourFormat", use12HourFormatChecked);
  });

  fontFamily.addEventListener("change", function () {
    const fontFamilyValue = this.value;
    console.log(fontFamilyValue);
    // applyFontToElement("digitalClockNewTab", fontFamilyValue);
    savePreference("fontFamily", fontFamilyValue);
  });

  fontSize.addEventListener("change", function () {
    const fontSizeValue = this.value;
    savePreference("fontSize", fontSizeValue);
    savePreference("fontSizeUpdated", true);
  });

  refreshRate.addEventListener("change", function () {
    const refreshRateValue = this.value;
    savePreference("refreshRate", refreshRateValue);
  });
});

const loadAllSectionSelection = () => {
  // TODO: better name for `sectionHeadings`, also need to change constants.js based on it.
  const sectionHeadings = document.getElementById(ELEMENTS.sectionHeadingsDiv);
  for (let sectionsKey in SECTIONS) {
    let sectionElement = document.createElement("h3");
    sectionElement.id = sectionsKey;
    sectionElement.classList.add(CLASSES.sectionSelection);
    sectionElement.innerText = SECTIONS[sectionsKey].name;
    // Event listener for element
    sectionElement.addEventListener("click", handleSectionSelection);
    // TODO: optimize it to add all children in one go.
    sectionHeadings.appendChild(sectionElement);
    document
      .getElementById(`content-${sectionsKey}`)
      .classList.add(CLASSES.hiddenContent);
  }
  // Mark default section as selected
  document
    .getElementById(DEFAULT_SETTINGS.section)
    .classList.add(CLASSES.selectedSection);
  document
    .getElementById(ELEMENTS.mainHeading)
    .innerText = SECTIONS[DEFAULT_SETTINGS.section].headingName;
  document
    .getElementById(`content-${DEFAULT_SETTINGS.section}`)
    .classList.remove(CLASSES.hiddenContent);
};

const handleSectionSelection = (event) => {
  const selectedSection = event.target.id;
  if (selectedSection === currentSection) {
    return;
  }
  document
    .getElementById(selectedSection)
    .classList.add(CLASSES.selectedSection);
  document
    .getElementById(`content-${selectedSection}`)
    .classList.remove(CLASSES.hiddenContent);
  if (currentSection) {
    document
      .getElementById(currentSection)
      .classList.remove(CLASSES.selectedSection);
    document
      .getElementById(`content-${currentSection}`)
      .classList.add(CLASSES.hiddenContent);
  }
  currentSection = selectedSection;
  // TODO: update heading
  document.getElementById(ELEMENTS.mainHeading).innerText = SECTIONS[currentSection].headingName;
  // TODO: update content, add/remove hidden things
};

document.addEventListener("DOMContentLoaded", () => {
  loadAllSectionSelection();
  // TODO: load sections
});
