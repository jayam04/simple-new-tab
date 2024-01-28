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

  // Visual
  theme: "light",
  noise: "high",

  // Behavioral

  // Extension
  section: "visual",
};

export const TABS_IN_DIALOG = [
  { heading: "General Settings ✨" },
  { heading: "Extensions Settings ✨" },
  { heading: "About ✨" },
];

// Elements
export const ELEMENTS = {
  digitalClock: "clock",
  analogClock: "clock",
  sectionHeadingsDiv: "section-headings",
};

export const CLASSES = {
  sectionSelection: "tab-selection",
  selectedSection: "tab-selection-selected",
};

export const IDS = {
  sectionHeading: "main-heading",
};
