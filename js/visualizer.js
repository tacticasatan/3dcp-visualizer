let scene, camera, renderer;
let layerCount = 0;
let printing = false;
let houseMesh;

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

    camera.position.z = 10;

    createHouseModel('basic');
}

function createHouseModel(type) {
    if (houseMesh) scene.remove(houseMesh);

    const geometry = new THREE.BoxGeometry(5, 0.1, 5);
    const material = new THREE.MeshLambertMaterial({ color: 0xd75627 });
    houseMesh = new THREE.Mesh(geometry, material);
    houseMesh.position.y = 0;
    scene.add(houseMesh);

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
        const newLayer = houseMesh.clone();
        newLayer.position.y += (layerCount * 0.1);
        scene.add(newLayer);
        layerCount++;
        document.getElementById('stats').innerText = `Layers Printed: ${layerCount}`;
    }

    renderer.render(scene, camera);
}
