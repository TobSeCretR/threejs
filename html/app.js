// Set your Cesium ion access token (free account gives you 1 million requests/month)
Cesium.Ion.defaultAccessToken =
import.meta.env?.CESIUM_ION_TOKEN ||      // Vite
    process.env.CESIUM_ION_TOKEN ||           // Node / webpack
    new URLSearchParams(window.location.search).get('token') ||  // fallback URL param
    ''; // ← leave empty as last resort

// Optional: show a helpful message if token is missing
if (!Cesium.Ion.defaultAccessToken) {
    console.warn('⚠️ No Cesium Ion token found! Get one at https://cesium.com/ion/tokens');
}

// ← This is the public default token that works for everyone (you can also sign up for your own free token at cesium.com/ion)

const viewer = new Cesium.Viewer('cesiumContainer', {
    // Temporarily use default OpenStreetMap base layer (no imageryProvider set)
    // This avoids blocking while we load the custom one
    terrainProvider: new Cesium.EllipsoidTerrainProvider(),
    timeline: false,
    animation: false,
    baseLayerPicker: false,
    geocoder: false,
    homeButton: false,
    sceneModePicker: false,
    navigationHelpButton: false,
    fullscreenButton: false
});

// Optional: nicer starting view (Germany)
viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(10.0, 51.0, 2000000),
    orientation: {
        heading: 0,
        pitch: -0.5,
    }
});

// Load world imagery asynchronously (replaces the old createWorldImagery())
Cesium.createWorldImageryAsync({
    style: Cesium.IonWorldImageryStyle.AERIAL_WITH_LABELS
}).then(imageryProvider => {
    // Remove the default base layer and add the new one
    viewer.imageryLayers.removeAll();
    viewer.imageryLayers.addImageryProvider(imageryProvider);
}).catch(error => {
    console.error('Failed to load imagery:', error);
    // Fallback: keep the default OSM if it fails (e.g., offline or token issue)
});

// Load terrain asynchronously
Cesium.createWorldTerrainAsync().then(terrainProvider => {
    viewer.terrainProvider = terrainProvider;
}).catch(error => {
    console.error('Failed to load terrain:', error);
    // Fallback to flat globe if terrain fails
    viewer.terrainProvider = new Cesium.EllipsoidTerrainProvider();
});

// Load Natural Earth country borders (GeoJSON)
const countriesPromise = Cesium.GeoJsonDataSource.load(
    'https://raw.githubusercontent.com/datasets/geo-boundaries-world-110m/master/countries.geojson',
    {
        stroke: Cesium.Color.YELLOW,
        fill: Cesium.Color.fromCssColorString('#000000').withAlpha(0.0),
        strokeWidth: 3,
        clampToGround: false
    }
);

countriesPromise.then(dataSource => {
    viewer.dataSources.add(dataSource);

    // Style each country polygon
    const entities = dataSource.entities.values;
    for (let entity of entities) {
        // entity.name contains the country name
        entity.polygon.extrudedHeight = 1000;        // slight 3D effect
        entity.polygon.perPositionHeight = true;
        entity.polygon.material = Cesium.Color.fromRandom({
            alpha: 0.25,
            minimumRed: 0.3,
            minimumGreen: 0.5,
            minimumBlue: 0.7
        });

        // Highlight on hover
        entity.polygon.outline = true;
        entity.polygon.outlineColor = Cesium.Color.YELLOW;
        entity.polygon.outlineWidth = 3;
    }
});

// Click handler - show country name
const infoDiv = document.getElementById('info');
const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

handler.setInputAction(movement => {
    const picked = viewer.scene.pick(movement.position);
    if (Cesium.defined(picked) && picked.id && picked.id.name) {
        infoDiv.textContent = `Country: ${picked.id.name}`;
    } else {
        infoDiv.textContent = 'Click on any country';
    }
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);

// Optional: auto-rotate the globe like earth3dmap.com
let spin = true;
viewer.scene.postUpdate = function (scene, time) {
    if (spin) {
        const spinRate = 0.5; // degrees per second
        const delta = Cesium.Math.toRadians(spinRate * scene.frameState.time.secondsSinceLastFrame);
        viewer.camera.rotateRight(delta);
    }
};

// Stop spinning when user interacts
viewer.scene.canvas.addEventListener('mousedown', () => spin = false);
viewer.scene.canvas.addEventListener('touchstart', () => spin = false);