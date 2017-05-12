import * as THREE from 'three';
import {COLORS} from '../const';

interface IWave {
  x: number;
  y: number;
  z: number;
  ang: number;
  amp: number;
  speed: number;
}

export default class Sea {
  mesh: THREE.Mesh;
  waves: IWave[];
  geom: THREE.CylinderGeometry;
  constructor () {
    let geom = this.geom = new THREE.CylinderGeometry(600, 600, 800, 40, 10);
    geom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));

    geom.mergeVertices();
    let l = geom.vertices.length;
    this.waves = [];
    for (let i = 0; i < l; i++) {
      let v = geom.vertices[i];
      this.waves.push({
        x: v.x,
        y: v.y,
        z: v.z,
        ang: Math.random() * Math.PI * 2,
        amp: 5 + Math.random() * 15,
        speed: 0.016 + Math.random() * 0.032
      });
    }

    let mat = new THREE.MeshPhongMaterial({
      color: COLORS.blue,
      transparent: true,
      opacity: 0.8,
      shading: THREE.FlatShading
    });
    this.mesh = new THREE.Mesh(geom, mat);
    this.mesh.receiveShadow = true;
  }

  moveWaves () {
    let verts = this.geom.vertices;
    let l = verts.length;

    for (let i = 0; i < l; i++) {
      let v = verts[i];
      let vProps = this.waves[i];
      v.x = vProps.x + Math.cos(vProps.ang) * vProps.amp;
      v.y = vProps.x + Math.sin(vProps.ang) * vProps.amp;
      vProps.ang += vProps.speed;
    }

    this.geom.verticesNeedUpdate = true;
    this.mesh.rotation.z += 0.005;
  }
}
