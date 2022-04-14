//=================================
//      import style
//=================================
import '../style/style_light.scss';

//=================================
//      import lib
//=================================
import * as THREE from 'three';

//=================================
//      import My Fragment
//=================================
// import img from '../img/env/patern.jpg';

import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader';
import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader';
import * as dat from 'dat.gui';

//================================
//      Main code
//=================================
const gui = new dat.GUI();
// gui.add(scene.position, 'y', 0 ,100)
const cnv = document.getElementById('canvas');
let w = window.innerWidth;
let h = window.innerHeight;

// // Scene
const scene = new THREE.Scene();

// // Camera
const camera = new THREE.PerspectiveCamera(70, w / h, 0.1, 1000);
camera.position.z = 50;

// Light
const pointLight = new THREE.PointLight(0x0f00ff, 0.3, 5, 1);

gui.add(pointLight, 'intensity', 0, 2, 0.01);
gui.add(pointLight, 'distance', 0, 40);



const lamp = new THREE.DirectionalLight(0xff00ff, 1);
// lamp.position.set(0, 0, 0);
gui.add(lamp.position, 'y', -10, 100);
gui.add(lamp.position, 'x', -10, 100);
gui.add(lamp.position, 'z', -10, 100);
gui.add(lamp, 'intensity', 0, 1);
const spotLight = new THREE.SpotLight(0xffffff);
// spotLight.position.set(0, -10, -2);
gui.add(spotLight.position, 'y', -10, 10);
gui.add(spotLight.position, 'x', -10, 10);
gui.add(spotLight.position, 'z', -10, 100);
const mainSpotLight = new THREE.SpotLight(0xfff000);
mainSpotLight.position.set(-1, 5, 0);
scene.add(mainSpotLight);
scene.add(spotLight);
scene.add(lamp);

//Polugon
const polugonGeometry = new THREE.PlaneGeometry(50, 50);
const polugonMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xff00ff, emissive: 0x000000, roughness: 0.5, metalness: 0.5
});
const plane = new THREE.Mesh(polugonGeometry, polugonMaterial);
plane.position.set(1, 1, 0);
plane.rotateX(-45);
scene.add(plane);

// // Mesh
const geometry = new THREE.BoxGeometry(10, 10, 10);
const material = new THREE.MeshPhysicalMaterial({
  color: 0xffffff, emissive: 0x000000, roughness: 0.5, metalness: 0.5
});
const cube = new THREE.Mesh(geometry, material);
cube.position.set(0, 0, 10);
scene.add(cube);

// Loaders
const loader = new GLTFLoader();

//draco
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/lib/');
loader.setDRACOLoader(dracoLoader);

loader.load(
  './img/models/georgLove.glb',
  function (gltf)
  {
    // console.log(scene.children[3].position.x = 10)

    scene.add(gltf.scene);
    scene.children[5].scale.x = 4;
    scene.children[5].scale.y = 4;
    scene.children[5].scale.z = 4;
    // scene.children[5].position.z = 20;
  }
);

// RGBELoader
const rgbeload = new RGBELoader();
rgbeload.load('/img/env/winter.hdr', (texture) =>
{
  const rgbetexture = texture;
  texture.mapping = THREE.ACESFilmicToneMapping;
  scene.background = texture;
  scene.environment = texture;
});



const renderer = new THREE.WebGLRenderer({canvas: cnv});
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
renderer.outputEncoding = THREE.sRGBEncoding;

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;

const animate = () =>
{
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.setSize(w, h);
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};
animate();

/**
 * @function resize пересчитывает размер холста при изменении окна браузера
 */
const resize = () =>
{
  w = window.innerWidth;
  h = window.innerHeight;
  cnv.width = window.innerWidth;
  cnv.height = window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();

  renderer.setSize(w, h);
};
resize();
window.addEventListener('resize', resize);