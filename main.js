import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
document.body.appendChild(renderer.domElement);

// Sets the color of the background
renderer.setClearColor(0x404040);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

// Sets orbit control to move the camera around
const orbit = new OrbitControls(camera, renderer.domElement);

// Camera positioning
camera.position.set(6, 8, 14);
orbit.update();

// Sets a 12 by 12 gird helper
const gridHelper = new THREE.GridHelper(12, 12);
scene.add(gridHelper);

// Sets the x, y, and z axes with each having a length of 4
const axesHelper = new THREE.AxesHelper(4);
scene.add(axesHelper);
//---------------------------------- LIGHTS ------------------------------------
const ambientLight = new THREE.AmbientLight(0xededed, 0.8);
scene.add(ambientLight)

// const light = new THREE.PointLight( 0xffffff, 1, 100 );
// light.position.set( 0, 10, 4 );
// light.castShadow = true; // default false
// scene.add( light );

const light = new THREE.DirectionalLight( 0xffffff, 0.6 );
light.position.set( 6, 15, 5 ); //default; light shining from top
light.castShadow = true; // default false
scene.add( light );

//Set up shadow properties for the light
light.shadow.mapSize.width = 512; // default
light.shadow.mapSize.height = 512; // default
light.shadow.camera.near = 0.5; // default
light.shadow.camera.far = 500; // default
//--------------------------------- LOADING MODELS ----------------------------------------------------
const loader = new GLTFLoader();
loader.load('models/SS_3D_28_Edit_17_Out.glb', function (gltf) {
    const model = gltf.scene;
    console.log(model)
    scene.add(model);
}, undefined, function (error) {

    console.error(error);

});

function animate() {
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});