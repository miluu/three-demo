import * as THREE from 'three';
import {COLORS} from '../const';

export default class Sea {
  mesh: THREE.Mesh;
  constructor () {
    let geom = new THREE.CylinderGeometry(600, 600, 800, 40, 10);
    geom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
    let mat = new THREE.MeshPhongMaterial({
      color: COLORS.blue,
      transparent: true,
      opacity: 6,
      shading: THREE.FlatShading
    });
    this.mesh = new THREE.Mesh(geom, mat);
    this.mesh.receiveShadow = true;
  }
}
