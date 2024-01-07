export function getTimeToDisplay(use12HourFormat, displaySeconds) {
    const now = new Date();
    let hours = now.getHours().toString().padStart(2, "0");
    let minutes = now.getMinutes().toString().padStart(2, "0");
    let seconds = now.getSeconds().toString().padStart(2, "0");
    let ampm = "";
    if (!displaySeconds) {
        seconds = "";
    }
    else {
        seconds = `:${seconds}`
    }
    if (use12HourFormat) {
        if (hours > 12) {
            hours -= 12;
            ampm = " PM";
        }
        else {
            ampm = " AM";
        }
    }
    return `${hours}:${minutes}${seconds}${ampm}`;
}

export function getGoogleFontUrl(fontName) {
    // `@import url('https://fonts.googleapis.com/css2?family=Long+Cang&family=Patua+One&family=Roboto&display=swap');`;
    const baseURL = `https://fonts.googleapis.com/css2`;
    const fontPlus = fontName.replace(" ", "+");
    const fontQuery = `family=${fontPlus}:wght@400;700&display=swap`;
    const fontURL = `${baseURL}?${fontQuery}`;
    const importURL = `@import url('${fontURL}');`;
    return importURL;
}
