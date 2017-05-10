import * as THREE from 'three';

import {COLORS} from './const';

window.addEventListener('init', init);

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

  window.addEventListener('resize', handleWindowResize, false)
}

function createLights () {

}

function createPlane () {

}

function createSea () {

}

function createSky () {

}

function loop () {

}

function handleWindowResize () {

}

