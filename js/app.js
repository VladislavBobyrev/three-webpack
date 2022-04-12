//=================================
//      import style
//=================================
// import '../style/style_light.scss';

//=================================
//      import lib
//=================================
import * as THREE from 'three';

//=================================
//      import My Fragment
//=================================
import img from '../img/env/patern.jpg';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader';
import * as dat from 'dat.gui';

//================================
//      Main code
//=================================
const gui = new dat.GUI();

const cnv = document.getElementById('canvas');
let w = window.innerWidth;
let h = window.innerHeight;

// // Scene
const scene = new THREE.Scene();

// // Camera
const camera = new THREE.PerspectiveCamera(65, w / h, 0.1, 1000);
camera.position.z = 50;

// Light
const spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(50, 100, 50);
const mainSpotLight = new THREE.SpotLight(0xffffff);
mainSpotLight.position.set(-100, 50, 0);
scene.add(mainSpotLight);
scene.add(spotLight);

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
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/');
loader.setDRACOLoader(dracoLoader);

loader.load(
  '/img/objects/georgLove.glb',
  function (gltf)
  {
    scene.add(gltf.scene);
  },
  function (xhr)
  {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error)
  {
    console.log('An error happened');
  }
);

const renderer = new THREE.WebGLRenderer({canvas: cnv});
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = false;

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
