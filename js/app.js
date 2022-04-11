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
import img from '../img/env/patern.jpg';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui';

//============
console.log(OrbitControls);
//      Main code
//=================================
const cnv = document.getElementById('canvas');
let w = window.innerWidth;
let h = window.innerHeight;

/**
 * @function resize пересчитывает размер холста при изменении окна браузера
 */
const resize = () =>
{
  w = window.innerWidth;
  h = window.innerHeight;
  cnv.width = window.innerWidth;
  cnv.height = window.innerHeight;
};
resize();
window.addEventListener('resize', resize);
const gui = new dat.GUI();


// // Scene
const scene = new THREE.Scene();
// const color = new THREE.Color(0xd5d5d0);
// scene.background = color;

const loader = new THREE.TextureLoader();
loader.load('../img/env/patern.jpg', (texture) =>
{
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  const timesToRepeatHorizontally = 4;
  const timesToRepeatVertically = 2;
  texture.repeat.set(timesToRepeatHorizontally, timesToRepeatVertically);
  scene.background = texture;
});

//GLB
let object = new GLTFLoader();

// object.load('img/objects/georgLove.glb', function (gltf)
// {
//   scene.add(gltf.scene);
// }, undefined, function (error)
// {
//   console.error(error);
// });

// // Camera
const camera = new THREE.PerspectiveCamera(65, w / h, 0.1, 1000);
camera.position.z = 50;

// // Mesh
const geometry = new THREE.BoxGeometry(10, 10, 10);
const material = new THREE.MeshPhysicalMaterial({
  color: 0xffffff, emissive: 0x000000, roughness: 0.5, metalness: 0.5
});
const cube = new THREE.Mesh(geometry, material);
cube.position.set(0, 0, 10);
scene.add(cube);

//Polugon
const polugonGeometry = new THREE.PlaneGeometry(50, 50);
const polugonMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xff00ff, emissive: 0x000000, roughness: 0.5, metalness: 0.5
});
const plane = new THREE.Mesh(polugonGeometry, polugonMaterial);
plane.position.set(1, 1, 0);
plane.rotateX(-45);
scene.add(plane);


// Light
const spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(50, 100, 50);
const mainSpotLight = new THREE.SpotLight(0xffffff);
mainSpotLight.position.set(-100, 50, 0);
scene.add(mainSpotLight);
scene.add(spotLight);

// // Renderer
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
