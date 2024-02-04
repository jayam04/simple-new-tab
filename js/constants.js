// Names
export const SECTIONS = {
  visual: {
    id: "visual",
    name: "🎨 Visual",
    headingName: "🎨 Visual Settings",
  },
  behavioral: {
    id: "behavioral",
    name: "🔧 Behavioral",
    headingName: "🔧 Behavioral Settings",
  },
  extension: {
    id: "extension",
    name: "⚙️ Extension",
    headingName: "⚙️ Extension  Settings ✨",
  },
  "about-us": {
    id: "about-us",
    name: "👥 About Us",
    headingName: "👥 About ✨",
  },
};

export const EXTENSION = {
  name: "Simple New Tab ✨",
  description: "Simple, but highly customizable new tabs.",
};

// Colors
export const COLORS = {
  primary: "#0097B2",
  secondary: "#7ED957",
  tertiary: "#ffffff",
};

export const FONT = {
  googleFontBaseUrl: "https://fonts.googleapis.com/css2",
};

// Defaults
export const DEFAULT_SETTINGS = {
  // Extension
  chromeSync: true,
  newTabName: EXTENSION.name,

  // Visual
  theme: "pastel-light",
  noise: "high",
  clockType: "12hr",
  fontSize: 54,
  fontFamily: "Salsa",
  showSeconds: false,

  // Behavioral
  refreshRate: 5,

  // Extension (Settings Page)
  section: "visual",
};

export const STORAGE_VALUES = {
  clockType: "clockType",
  backgroundType: "theme",
  fontFamily: "fontFamily",
  fontSize: "fontSize",
  newTabName: "newTabName",
  noise: "noise",
  refreshRate: "refreshRate",
  showSeconds: "showSeconds",
  chromeSync: "chromeSync",
}

export const TABS_IN_DIALOG = [
  { heading: "General Settings ✨" },
  { heading: "Extensions Settings ✨" },
  { heading: "About ✨" },
];

// Elements
export const ELEMENTS = {
  // newtab.html
  digitalClock: "clock",
  analogClock: "clock",
  noiseContainer: "noise-container",
  quickSettings: "quick-settings",

  // settings.html
  sectionHeadingsDiv: "section-headings",
  mainHeading: "main-heading",

  // settings.html/visual
  backgroundType: "background",
  clockType: "clock-type",
  newTabName: "new-tab-name",
  fontSize: "font-size",
  fontFamily: "font-family",
  noise: "noise-settings",
  showSeconds: "show-seconds",

  // settings.html/behavioral
  refreshRate: "refresh-rate",
  chromeSync: "sync-profiles",
  // refreshRateInput: "refresh-rate-input",
  // autoRefreshRate: "auto-refresh-rate",
};

export const CLASSES = {
  sectionSelection: "tab-selection",
  selectedSection: "tab-selection-selected",
  hiddenContent: "hidden-content",
  quickSettingsIcons: "quick-settings-icon",
};

export const IDS = {
  sectionHeading: "main-heading",
};

export const EXTRAS = {
  clockType: "clockType",
  backgroundType: "theme",
}

export const VISUAL_ELEMENTS = [
  "backgroundType",
  "clockType",
  "newTabName",
  "fontSize",
  "fontFamily",
  "noise",
  "showSeconds"
];

export const BEHAVIORAL_ELEMENTS = [
  "refreshRate",
  "chromeSync",
];
