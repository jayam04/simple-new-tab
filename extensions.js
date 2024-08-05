// This file will handle the logic for enabling/disabling extensions
// Placeholder for future implementation
document.addEventListener('DOMContentLoaded', () => {
    const extensionsList = document.getElementById('extensions-list');

    // Load extensions from the extensions directory
    const extensionsDir = 'extensions/';
    const extensions = [
        { name: 'Stopwatch', path: 'stopwatch/stopwatch.html' }
        // Add more extensions here
    ];

    extensions.forEach(extension => {
        const extensionElement = document.createElement('div');
        extensionElement.classList.add('extension');

        const extensionLink = document.createElement('a');
        extensionLink.href = extension.path;
        extensionLink.target = '_blank';
        extensionLink.textContent = extension.name;

        extensionElement.appendChild(extensionLink);
        extensionsList.appendChild(extensionElement);
    });
});
