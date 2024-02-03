import {
    CLASSES,
    DEFAULT_SETTINGS,
    ELEMENTS,
    SECTIONS,
    STORAGE_VALUES,
    VISUAL_ELEMENTS,
} from './constants.js';
import {getPreference, savePreference} from './getValues.js';

let currentSection = DEFAULT_SETTINGS.section;


const loadAllSectionSelection = () => {
    // TODO: better name for `sectionHeadings`, also need to change constants.js based on it.
    const sectionHeadings = document.getElementById(
        ELEMENTS.sectionHeadingsDiv
    );
    for (let sectionsKey in SECTIONS) {
        let sectionElement = document.createElement('h3');
        sectionElement.id = sectionsKey;
        sectionElement.classList.add(CLASSES.sectionSelection);
        sectionElement.innerText = SECTIONS[sectionsKey].name;
        // Event listener for element
        sectionElement.addEventListener('click', handleSectionSelection);
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
    document.getElementById(ELEMENTS.mainHeading).innerText =
        SECTIONS[DEFAULT_SETTINGS.section].headingName;
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
    document.getElementById(ELEMENTS.mainHeading).innerText =
        SECTIONS[currentSection].headingName;
};

document.addEventListener('DOMContentLoaded', () => {
    loadAllSectionSelection();
});

//  Event-listeners and default values
for (let element of VISUAL_ELEMENTS) {
    if (element === "showSeconds") {
        document.getElementById(ELEMENTS[element]).addEventListener('change', () => {
            savePreference(STORAGE_VALUES[element], document.getElementById(ELEMENTS[element]).checked)
        })
        document.getElementById(ELEMENTS[element]).checked = getPreference(STORAGE_VALUES[element])
        continue;
    }
    document.getElementById(ELEMENTS[element]).addEventListener('change', () => {
        savePreference(STORAGE_VALUES[element], document.getElementById(ELEMENTS[element]).value)
    })
    document.getElementById(ELEMENTS[element]).value = getPreference(STORAGE_VALUES[element])
}
