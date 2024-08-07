import { FONT, VISUAL_ELEMENTS } from './constants.js';

export const updateBackgroundNoise = async (noise, theme) => {
    console.log('updateBackgroundNoise', noise);
    let noiseTheme = 'light';
    // TODO: update light dark with variables
    if ((noise === 'high' && theme === 'pastel') || (noise === 'low' && theme === 'pastel-dark')) {
        noiseTheme = 'dark';
    }
    document.getElementById('noise-container')
        .style.backgroundImage = `url(/img/noise/noise-${noiseTheme}.png)`;
};

export const updateDigitalClockNewTab = async (use12HourFormat, showSeconds) => {
    const formattedTime = getFormattedTime(use12HourFormat, showSeconds);

    const clockElement = document.getElementById('clock');
    clockElement.innerText = formattedTime;
};

export const fetchSettingsFromChrome = async () => {
    let changes = [];
    chrome.storage.sync.get(VISUAL_ELEMENTS, (data) => {
        for (let element in VISUAL_ELEMENTS) {
            if (localStorage.getItem(element) !== data[element]) {
                localStorage.setItem(element, data[element]);
                changes.push(element);
            }
        }
    });
    return changes;
};

/**
 * Generates a random pastel color.
 * Pastel colors typically have lower saturation and brightness.
 *
 * @param {boolean} [lightColors = true] - Use light mode or dark mode.
 * @returns {string} - Hexadecimal representation of the generated pastel color.
 */
export const generatePastelColor = (lightColors = true) => {
    let minLightness, minSaturation;
    if (!lightColors) {
        minLightness = 0.2;
        minSaturation = 0.1;
    } else {
        minLightness = 0.8;
        minSaturation = 0.5;
    }
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

export const getGoogleFontUrl = (fontName) => {
    const fontURL = `${FONT.googleFontBaseUrl}?family=${fontName.replace(
        ' ',
        '+'
    )}:wght@400;700&display=swap`;
    return `@import url('${fontURL}');`;
};

export const applyFontToElement = (elementId, fontName) => {
    console.log(elementId, fontName);
    const fontStylesheet = document.createElement('link');

    if (!fontName.includes(' ')) {
        fontStylesheet.href = `${FONT.googleFontBaseUrl}?family=${fontName}`;
    } else {
        fontStylesheet.href = `${FONT.googleFontBaseUrl}?family=${fontName.replace(
            ' ',
            '+'
        )}`;
    }
    fontStylesheet.rel = 'stylesheet';
    document.head.appendChild(fontStylesheet);

    const digitalClockElement = document.getElementById(elementId);
    digitalClockElement.style.fontFamily = `'${fontName}', 'Roboto', sans-serif`;
};

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

export const applyFontSizeToElement = function(fontSizeInPx, elementId) {
    const digitalClockElement = document.getElementById(elementId);
    digitalClockElement.style.fontSize = `${fontSizeInPx}px`;
};
