// app.js

let scene, camera, renderer, globe;
let container = document.body;
let globeStyle = 0; // Toggle between different globe styles

// Initialize the scene, camera, renderer, and the globe
function init() {
    // Set up the scene
    scene = new THREE.Scene();

    // Set up the camera with a better position and angle
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 500);  // Adjusted camera position
    camera.lookAt(0, 0, 0);  // Camera looks at the globe's center

    // Set up the renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Set up the lighting for better visibility of the globe
    const light = new THREE.AmbientLight(0x404040, 1); // Ambient light
    scene.add(light);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2); // Stronger directional light
    directionalLight.position.set(0, 0, 1).normalize(); // Direction from above
    scene.add(directionalLight);

    // Create the globe using three-globe
    globe = new ThreeGlobe()
        .globeImageUrl('textures/Earth1.jpg')  // Earth texture (local)
        .bumpImageUrl('textures/Earth2.jpg')  // Topology texture (local)
        .showGraticules(true);  // Optional: gridlines for better visual reference

    scene.add(globe);

    // Make the globe rotate automatically
    function animate() {
        requestAnimationFrame(animate);
        globe.rotateY(0.001);  // Slowly rotate the globe
        renderer.render(scene, camera);
    }

    animate();

    // Handle window resizing
    window.addEventListener('resize', onWindowResize, false);
}

// Handle resizing of the window
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Change the globe style when the button is clicked
function changeGlobeStyle() {
    globeStyle = (globeStyle + 1) % 3;

    if (globeStyle === 0) {
        globe.globeImageUrl('textures/Earth1.jpg');
    } else if (globeStyle === 1) {
        globe.globeImageUrl('textures/Earth2.jpg');
    } else {
        globe.globeImageUrl('textures/Earth2.jpg');
    }
}

// Initialize the app when the window loads
window.onload = init;
