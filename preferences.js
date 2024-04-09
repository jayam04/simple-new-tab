function Preference(
    storageKey,
    defaultValue,
    settingsPageId,
    newTabId,
    allowed
) {
    this.storageKey = storageKey;
    this.defaultValue = defaultValue;
    this.settingsPageId = settingsPageId;
    this.newTabId = newTabId;
    this.allowed = allowed;
}

export const preferences = {
    theme: new Preference('theme', 'pastel', 'background-theme', null, [
        'pastel',
        'pastel-dark'
    ]),

    clockFormat: new Preference('clock-format', '12hr', 'clock-format', null, [
        '24hr',
        '12hr',
        'none'
    ]),

    showSeconds: new Preference('seconds', false, 'show-seconds', null, [
        true,
        false
    ]),

    tabTitle: new Preference(
        'title',
        'Simple New Tab',
        'tab-title',
        null,
        null
    ),

    fontFamily: new Preference(
        'fontFamily',
        'Protest Riot',
        'font-family-input',
        null,
        null
    ),

    fontSize: new Preference('font-size', 28, 'font-size', null, null),

    noise: new Preference('noiseLevel', true, 'noise-level', null, [
        'low',
        'high',
        'none'
    ]),

    quickSettings: new Preference(
        'quickSettings',
        true,
        'show-quick-settings',
        null,
        [true, false]
    ),

    refreshRate: new Preference(
        'refreshRate',
        5,
        'refresh-rate',
        null,
        null
    ),

    syncWithChrome: new Preference(
        'syncWithChrome',
        true,
        'sync-profiles',
        null,
        [true, false]
    )
};
