import { GOOGLE_FONT_BASE_URL } from './config/config.js';

export const getFormattedTime = (use12HourFormat, displaySeconds) => {
  const now = new Date();
  let hours = now.getHours().toString().padStart(2, '0');
  let minutes = now.getMinutes().toString().padStart(2, '0');
  let seconds = now.getSeconds().toString().padStart(2, '0');
  let ampm = '';
  if (!displaySeconds) {
    seconds = '';
  } else {
    seconds = `:${seconds}`;
  }
  if (use12HourFormat) {
    if (hours > 12) {
      hours -= 12;
      ampm = ' PM';
    } else {
      ampm = ' AM';
    }
  }
  return `${hours}:${minutes}${seconds}${ampm}`;
};

// `@import url('https://fonts.googleapis.com/css2?family=Long+Cang&family=Patua+One&family=Roboto&display=swap');`;
export const getGoogleFontUrl = (fontName) => {
  const fontURL = `${GOOGLE_FONT_BASE_URL}?family=${fontName.replace(
    ' ',
    '+',
  )}:wght@400;700&display=swap`;
  const importURL = `@import url('${fontURL}');`;
  return importURL;
};

export const applyFontToElement = (fontName, elementId) => {
  const fontStylesheet = document.createElement('link');

  if (!fontName.includes(' ')) {
    fontStylesheet.href = `${GOOGLE_FONT_BASE_URL}?family=${fontName}`;
  } else {
    fontStylesheet.href = `${GOOGLE_FONT_BASE_URL}?family=${fontName.replace(
      ' ',
      '+',
    )}`;
  }
  fontStylesheet.rel = 'stylesheet';
  document.head.appendChild(fontStylesheet);

  const digitalClockElement = document.getElementById(elementId);
  digitalClockElement.style.fontFamily = `'${fontName}', 'Roboto', sans-serif`;
};

export const applyFontSizeToElement = function (fontSizeInPx, elementId) {
  const digitalClockElement = document.getElementById(elementId);
  digitalClockElement.style.fontSize = `${fontSizeInPx}px`;
};

// Function to save a preference to Chrome storage
export const savePreference = async (key, value) => {
  const data = {};
  data[key] = value;
  await chrome.storage.sync.set(data);
};

export const updateClockDisplay = async ({
  elementId,
  forceUpdateFont,
  forceUpdateFontSize,
}) => {
  const storageFields = [
    'showMilliseconds',
    'use12HourFormat',
    'googleFont',
    'fontUpdated',
    'fontSizeUpdated',
    'fontSize',
  ];

  const preferences = await chrome.storage.sync.get(storageFields);

  const {
    showMilliseconds,
    use12HourFormat,
    fontUpdated,
    fontSizeUpdated,
    googleFont,
  } = preferences;

  if (forceUpdateFont || fontUpdated) {
    applyFontToElement(preferences?.googleFont, 'digitalClockNewTab');
    savePreference('fontUpdated', false);
  }

  if (forceUpdateFontSize || fontSizeUpdated) {
    applyFontSizeToElement(preferences?.fontSize, elementId);
  }

  const formattedTime = getFormattedTime(use12HourFormat, showMilliseconds);

  const clockElement = document.getElementById(elementId);
  clockElement.innerText = formattedTime;
  clockElement.style.fontFamily = `'${googleFont}', 'Roboto'`;
};

/**
 * Generates a random pastel color.
 * Pastel colors typically have lower saturation and brightness.
 *
 * @param {number} [minLightness=0.8] - Minimum lightness value (range: 0.8 to 9.5).
 * @param {number} [minSaturation=0.5] - Minimum saturation value (range: 0.5 to 0.9).
 * @returns {string} - Hexadecimal representation of the generated pastel color.
 */

export const generatePastelColor = (
  minLightness = 0.8,
  minSaturation = 0.5,
) => {
  const saturation = Math.random() * 0.4 + minSaturation;
  const lightness = Math.random() * 0.15 + minLightness;
  const hue = Math.random() * 360;
  const rgbColor = hslToRgb(hue / 360, saturation, lightness);
  return rgbToHex(rgbColor[0], rgbColor[1], rgbColor[2]);
};

const hslToRgb = (h, s, l) => {
  let r, g, b;

  if (s === 0) {
    [r, g, b] = [l, l, l];
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      return t < 1 / 6
        ? p + (q - p) * 6 * t
        : t < 1 / 2
        ? q
        : t < 2 / 3
        ? p + (q - p) * (2 / 3 - t) * 6
        : p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
};

const rgbToHex = (r, g, b) => {
  const toHex = (value) => {
    const hex = value.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};
