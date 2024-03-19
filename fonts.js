import { FILES } from './js/constants.js';

// Fetch the font list from a JSON file
fetch(FILES.fontFile)
  .then((response) => response.json())
  .then((data) => {
    const fontFamilySelect = document.getElementById("font-family");
    data.fonts.forEach((font) => {
      const option = document.createElement("option");
      option.value = font;
      option.text = font;
      fontFamilySelect.add(option);
    });
  })
  .catch((error) => console.error("Error fetching font list:", error));