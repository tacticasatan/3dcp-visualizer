let scene, camera, renderer;
let layerCount = 0;
let printing = false;
let wallGroup;

init();
animate();

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5,10,7.5);
    scene.add(light);

    camera.position.set(10, 10, 10);
    camera.lookAt(0, 0, 0);

    wallGroup = new THREE.Group();
    scene.add(wallGroup);

    layerCount = 0;
    document.getElementById('stats').innerText = `Layers Printed: ${layerCount}`;
}

function startPrint() {
    printing = true;
}

function pausePrint() {
    printing = false;
}

function animate() {
    requestAnimationFrame(animate);

    if (printing && layerCount < 50) {
        const material = new THREE.MeshLambertMaterial({ color: 0xd75627 });
        const wallThickness = 0.2;
        const length = 5;

        const walls = [
            new THREE.BoxGeometry(length, wallThickness, wallThickness),  // Front wall
            new THREE.BoxGeometry(length, wallThickness, wallThickness),  // Back wall
            new THREE.BoxGeometry(wallThickness, wallThickness, length),  // Left wall
            new THREE.BoxGeometry(wallThickness, wallThickness, length)   // Right wall
        ];

        const positions = [
            [0, layerCount * wallThickness, length/2],
            [0, layerCount * wallThickness, -length/2],
            [-length/2, layerCount * wallThickness, 0],
            [length/2, layerCount * wallThickness, 0]
        ];

        for (let i = 0; i < 4; i++) {
            const mesh = new THREE.Mesh(walls[i], material);
            mesh.position.set(...positions[i]);
            wallGroup.add(mesh);
        }

        layerCount++;
        document.getElementById('stats

