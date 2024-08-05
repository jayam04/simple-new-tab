document.addEventListener('DOMContentLoaded', () => {
    const extensions = [
        { name: 'Stopwatch Timer', url: '/extensions/stopwatch/stopwatch.html', enabled: true, icon: 'bi bi-stopwatch' },
        // { name: 'Key Bindings', url: '/extensions/keybindings/keybindings.html', enabled: true, icon: 'bi bi-keyboard' },
        // Add more extensions here
    ];

    const extensionsList = document.getElementById('extensions-list');

    extensions.forEach(extension => {
        const card = document.createElement('div');
        card.className = 'card mb-3 clickable';

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const icon = document.createElement('i');
        icon.className = `icon ${extension.icon}`;

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

        toggle.appendChild(toggleInput);
        toggle.appendChild(toggleLabel);

        const link = document.createElement('a');
        link.href = extension.url;
        link.className = 'btn btn-primary mt-2';
        link.textContent = 'Open';

        cardBody.appendChild(icon);
        cardBody.appendChild(title);
        cardBody.appendChild(toggle);
        card.addEventListener('click', (event) => {
            if (!event.target.closest('.form-check-input')) {
                window.location.href = extension.url;
            }
        });

        toggleInput.addEventListener('change', () => {
            extension.enabled = toggleInput.checked;
            // Add code here to save the enabled status if needed
        });

        card.appendChild(cardBody);
        extensionsList.appendChild(card);
    });
});
