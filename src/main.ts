import * as THREE from 'three';

import {COLORS} from './const';
import Sea from './modules/Sea';

window.addEventListener('load', init);

function init () {
  createScene();
  createLights();
  createPlane();
  createSea();
  createSky();
  loop();
}

let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let fieldOfView: number;
let aspectRatio: number;
let nearPlane: number;
let farPlane: number;
let HEIGHT: number;
let WIDTH: number;
let renderer: THREE.WebGLRenderer;
let container: HTMLElement;
function createScene () {
  console.log('createScene');
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;

  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);

  aspectRatio = WIDTH / HEIGHT;
  fieldOfView = 60;
  nearPlane = 1;
  farPlane = 10000;
  camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
  camera.position.x = 0;
  camera.position.z = 200;
  camera.position.y = 100;

  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
  });

  renderer.setSize(WIDTH, HEIGHT);
  renderer.shadowMap.enabled = true;

  container = document.getElementById('world');
  container.appendChild(renderer.domElement);

  window.addEventListener('resize', handleWindowResize, false);
}

let hemisphereLight: THREE.HemisphereLight;
let shadowLight;
function createLights () {
  hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, 0.9);
  shadowLight = new THREE.DirectionalLight(0xffffff, 0.9);

  shadowLight.position.set(150, 350, 350);
  shadowLight.castShadow = true;
  console.log(shadowLight.shadow.camera);
  (<any>shadowLight.shadow.camera).left = -400;
  (<any>shadowLight.shadow.camera).right = 400;
  (<any>shadowLight.shadow.camera).top = 400;
  (<any>shadowLight.shadow.camera).bottom = -400;
  (<any>shadowLight.shadow.camera).near = 1;
  (<any>shadowLight.shadow.camera).far = 1000;
  shadowLight.shadow.mapSize.width = 2048;
  shadowLight.shadow.mapSize.height = 2048;

  scene.add(hemisphereLight);
  scene.add(shadowLight);
}

function createPlane () {

}

let sea;
function createSea () {
  sea = new Sea();
  sea.mesh.position.y = -600;
  scene.add(sea.mesh);
}

function createSky () {

}

function loop () {
  console.log('loop');
  renderer.render(scene, camera);
}

function handleWindowResize () {
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;
  renderer.setSize(WIDTH, HEIGHT);
  camera.aspect = WIDTH / HEIGHT;
  camera.updateProjectionMatrix();
}

