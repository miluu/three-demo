import * as THREE from 'three';

import Cloud from './Cloud';

export default class Sky {
  mesh: THREE.Object3D;
  nClouds: number = 20;
  constructor () {
    this.mesh = new THREE.Object3D();
    let stepAngle = Math.PI * 2 / this.nClouds;
    for (let i = 0; i < this.nClouds; i++) {
      let c = new Cloud();
      let a = stepAngle * i;
      let h = 750 + Math.random() * 200;
      c.mesh.position.y = Math.sin(a) * h;
      c.mesh.position.x = Math.cos(a) * h;
      c.mesh.position.z = -400 - Math.random() * 400;
      let s = 1 + Math.random() * 2;
      c.mesh.scale.set(s, s, s);
      this.mesh.add(c.mesh);
    }
  }
}
