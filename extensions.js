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
const extensions = [
    { name: 'Stopwatch', url: '/extensions/stopwatch/stopwatch.html', enabled: true },
    // Add more extensions here
];

const extensionsList = document.getElementById('extensions-list');

extensions.forEach(extension => {
    const card = document.createElement('div');
    card.className = 'card mb-3';

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    const title = document.createElement('h5');
    title.className = 'card-title';
    title.textContent = extension.name;

    const toggle = document.createElement('div');
    toggle.className = 'form-check form-switch';

    const toggleInput = document.createElement('input');
    toggleInput.className = 'form-check-input';
    toggleInput.type = 'checkbox';
    toggleInput.id = `toggle-${extension.name}`;
    toggleInput.checked = extension.enabled;

    const toggleLabel = document.createElement('label');
    toggleLabel.className = 'form-check-label';
    toggleLabel.htmlFor = `toggle-${extension.name}`;
    toggleLabel.textContent = 'Enabled';

    toggle.appendChild(toggleInput);
    toggle.appendChild(toggleLabel);

    const link = document.createElement('a');
    link.href = extension.url;
    link.className = 'btn btn-primary mt-2';
    link.textContent = 'Open';

    cardBody.appendChild(title);
    cardBody.appendChild(toggle);
    cardBody.appendChild(link);

    card.appendChild(cardBody);
    extensionsList.appendChild(card);
});
