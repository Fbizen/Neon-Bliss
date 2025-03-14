// Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

// Load 3D Model
const loader = new THREE.GLTFLoader();
let model;

loader.load('model.glb', function (gltf) {
    model = gltf.scene;
    model.position.set(0, 0, -5); // Adjust if needed
    scene.add(model);
    console.log("Model loaded successfully!");
}, undefined, function (error) {
    console.error("Error loading model:", error);
});

// Camera Position
camera.position.z = 5;

// Scroll Event - Rotate the Model
let lastScrollY = 0;
const scrollThreshold = 100; // Sensitivity of rotation

function handleScroll() {
    if (!model) return; // Ensure model is loaded before applying transformations

    let scrollY = window.scrollY;
    let rotation = (scrollY / scrollThreshold) * Math.PI * 2; // Convert to radians

    model.rotation.y = rotation; // Rotate left-right
    model.rotation.x = rotation * 0.5; // Slight tilt effect

    lastScrollY = scrollY;
}

window.addEventListener('scroll', handleScroll);

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
