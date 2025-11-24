// app.js

let scene, camera, renderer, globe;
let container = document.body;
let globeStyle = 0; // Toggle between different globe styles

// Initialize the scene, camera, renderer, and the globe
function init() {
    // Set up the scene
    scene = new THREE.Scene();

    // Set up the camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 250;

    // Set up the renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Create the globe using three-globe
    globe = new ThreeGlobe()
        .globeImageUrl('//unpkg.com/three-globe/example/img/earth-day.jpg')  // Default globe style
        .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png'); // Topology map

    scene.add(globe);

    // Make the globe rotate automatically
    function animate() {
        requestAnimationFrame(animate);
        globe.rotateY(0.001); // Slowly rotate the globe
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
        globe.globeImageUrl('//unpkg.com/three-globe/example/img/earth-day.jpg');
    } else if (globeStyle === 1) {
        globe.globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg');
    } else {
        globe.globeImageUrl('//unpkg.com/three-globe/example/img/earth-satellite.jpg');
    }
}

// Initialize the app when the window loads
window.onload = init;
