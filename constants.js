export const FILES = {
    'fontFile': 'data/fonts.json',
    'notices': 'data/notices.json'
};

export const EXTENSION = {
    name: 'Simple New Tab ✨',
    description: 'Simple, but highly customizable new tabs.'
};

// Colors
export const COLORS = {
    primary: '#0097B2',
    secondary: '#7ED957',
    tertiary: '#ffffff'
};

export const FONT = {
    googleFontBaseUrl: 'https://fonts.googleapis.com/css2'
};

// Defaults
export const DEFAULT_SETTINGS = {
    // Extension
    chromeSync: true,
    newTabName: EXTENSION.name,

    // Visual
    theme: 'pastel',
    noise: 'high',
    clockType: '12hr',
    fontSize: 54,
    fontFamily: 'Protest Riot',
    showSeconds: false,

    // Behavioral
    refreshRate: 5,

    // Extension (Settings Page)
    section: 'visual'
};

// export const STORAGE_VALUES = {
//   clockType: "clockType",
//   backgroundType: "theme",
//   fontFamily: "fontFamily",
//   fontSize: "fontSize",
//   newTabName: "newTabName",
//   noise: "noise",
//   refreshRate: "refreshRate",
//   showSeconds: "showSeconds",
//   chromeSync: "chromeSync",
// }
export const STORAGE_VALUES = {
    clockType: 'format',
    backgroundType: 'theme',
    fontFamily: 'fontFamily',
    fontSize: 'fontSize',
    newTabName: 'title',
    noise: 'noiseLevel',
    refreshRate: 'refreshRate',
    showSeconds: 'seconds',
    chromeSync: 'syncProfiles',
    quickSettings: 'quickSettings'
};

// Elements
export const ELEMENTS = {
    // newtab.html
    digitalClock: 'clock',
    analogClock: 'clock',
    noiseContainer: 'noise-container',
    quickSettings: 'quick-settings',

    // settings.html
    sectionHeadingsDiv: 'section-headings',
    mainHeading: 'main-heading',

    // settings.html/visual
    backgroundType: 'background',
    clockType: 'clock-type',
    newTabName: 'new-tab-name',
    fontSize: 'font-size',
    fontFamily: 'font-family',
    noise: 'noise-settings',
    showSeconds: 'show-seconds',

    // settings.html/behavioral
    refreshRate: 'refresh-rate',
    chromeSync: 'sync-profiles'
    // refreshRateInput: "refresh-rate-input",
    // autoRefreshRate: "auto-refresh-rate",
};

export const VISUAL_ELEMENTS = [
    'backgroundType',
    'clockType',
    'newTabName',
    'fontSize',
    'fontFamily',
    'noise',
    'showSeconds'
];

export const kofi = 'https://ko-fi.com/jayampatel';
export const fontList = 'https://raw.githubusercontent.com/jayam04/simple-new-tab/master/data/fonts.json';
export const noticeList = 'https://raw.githubusercontent.com/jayam04/simple-new-tab/master/data/notices.json';