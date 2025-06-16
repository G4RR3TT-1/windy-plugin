// windy-plugin-rain-darkmode
const PLUGIN_NAME = 'rain-darkmode';
const PLUGIN_VERSION = '0.1.0';

windyInit({
    key: '', // leave empty
    plugin: true,
}, async (windyAPI) => {
    const { store, map, overlays, picker, broadcast } = windyAPI;

    // 1. Set rain overlay
    store.set('overlay', 'rain');
    store.set('level', 'surface');
    store.set('product', 'ecmwf');

    // 2. Enable dark mode
    store.set('darkMode', true);

    // 3. Hide all UI for fullscreen/screensaver
    const hideUI = () => {
        document.querySelectorAll('.windy-control, .mobile-menu, #logo, #footer, .leaflet-control-container')
            .forEach(el => el.style.display = 'none');
        document.body.style.cursor = 'none'; // hide cursor
    };

    // 4. Loop animation (play forecast forever)
    const loopAnimation = () => {
        const timeline = document.querySelector('#timeline-control');
        if (timeline && !store.get('isPlaying')) {
            store.set('isPlaying', true);
        }
        setInterval(() => {
            if (!store.get('isPlaying')) {
                store.set('isPlaying', true);
            }
        }, 10000); // safety recheck every 10s
    };

    // Initial run
    hideUI();
    loopAnimation();

    // React to changes (in case Windy re-renders)
    const observer = new MutationObserver(hideUI);
    observer.observe(document.body, { childList: true, subtree: true });

    console.log(`[${PLUGIN_NAME}] Loaded v${PLUGIN_VERSION}`);
});