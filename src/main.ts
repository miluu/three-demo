import * as THREE from 'three';

import {COLORS} from './const';
import Sea from './modules/Sea';
import Sky from './modules/Sky';
import AirPlane from './modules/AirPlane';

window.addEventListener('load', init);

function init () {
  createScene();
  createLights();
  createPlane();
  createSea();
  createSky();
  loop();
  document.addEventListener('mousemove', handleMouseMove, false);
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
  camera.position.z = 70;
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
let shadowLight: THREE.DirectionalLight;
let ambientLight: THREE.AmbientLight;
function createLights () {
  hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, 0.9);
  shadowLight = new THREE.DirectionalLight(0xffffff, 0.9);
  ambientLight = new THREE.AmbientLight(0xdc8874, 0.5);

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
  scene.add(ambientLight);
}

let airPlane: AirPlane;
function createPlane () {
  airPlane = new AirPlane();
  airPlane.mesh.scale.set(0.25, 0.25, 0.25);
  airPlane.mesh.position.y = 100;
  scene.add(airPlane.mesh);
}

let sea: Sea;
function createSea () {
  sea = new Sea();
  sea.mesh.position.y = -600;
  scene.add(sea.mesh);
}

let sky: Sky;
function createSky () {
  sky = new Sky();
  sky.mesh.position.y = -600;
  scene.add(sky.mesh);
}

function loop () {
  renderer.render(scene, camera);
  if (camera.position.z < 200) {
    console.log(camera.position.z);
    camera.position.z += 0.1;
  }
  airPlane.pilot.updateHairs();
  airPlane.propeller.rotation.x += 0.3;
  sea.moveWaves();
  sky.mesh.rotation.z += 0.01;
  requestAnimationFrame(loop);
  updatePlane();
}

function handleWindowResize () {
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;
  renderer.setSize(WIDTH, HEIGHT);
  camera.aspect = WIDTH / HEIGHT;
  camera.updateProjectionMatrix();
}

interface IPos {
  x: number;
  y: number;
}

let mousePos: IPos = {x: 0, y: 0};
function handleMouseMove (event: MouseEvent) {
   let tx = -1 + (event.clientX / WIDTH) * 2;
   let ty = 1 - (event.clientY / HEIGHT) * 2;
   mousePos = {x: tx, y: ty};
}

function updatePlane () {
   let targetY = normalize(mousePos.y, -0.75, 0.75, 25, 175);
   let targetX = normalize(mousePos.x, -0.75, 0.75, -100, 100);
   airPlane.mesh.position.y += (targetY - airPlane.mesh.position.y) * 0.1;
   airPlane.mesh.rotation.z = (targetY - airPlane.mesh.position.y) * 0.0128;
   airPlane.mesh.rotation.x = (airPlane.mesh.position.y - targetY) * 0.0064;
   airPlane.propeller.rotation.x += 0.3;
}

function normalize(v: number, vmin: number, vmax: number, tmin: number, tmax: number) {
   let nv = Math.max(Math.min(v, vmax), vmin);
   let dv = vmax - vmin;
   let pc = (nv - vmin) / dv;
   let dt = tmax - tmin;
   let tv = tmin + (pc * dt);
   return tv;
}

