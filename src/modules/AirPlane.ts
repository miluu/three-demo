import * as THREE from 'three';

import Pilot from './Pilot';
import {COLORS} from '../const';

export default class AirPlane {
  mesh: THREE.Object3D;
  propeller: THREE.Mesh;
  pilot: Pilot;
  constructor () {
    this.mesh = new THREE.Object3D();
    this.pilot = new Pilot();
    let geomCockpit = new THREE.BoxGeometry(80, 50, 50, 1, 1, 1);
    let matCockpit = new THREE.MeshPhongMaterial({
      color: COLORS.red,
      shading: THREE.FlatShading
    });
    geomCockpit.vertices[4].y -= 10;
    geomCockpit.vertices[4].z += 20;
    geomCockpit.vertices[5].y -= 10;
    geomCockpit.vertices[5].z -= 20;
    geomCockpit.vertices[6].y += 30;
    geomCockpit.vertices[6].z += 20;
    geomCockpit.vertices[7].y += 30;
    geomCockpit.vertices[7].z -= 20;

    let cockpit = new THREE.Mesh(geomCockpit, matCockpit);
    cockpit.castShadow = true;
    cockpit.receiveShadow = true;
    this.mesh.add(cockpit);

    let geomEngine = new THREE.BoxGeometry(20, 50, 50, 1, 1, 1);
    let matEngine = new THREE.MeshPhongMaterial({
      color: COLORS.white,
      shading: THREE.FlatShading
    });
    let engine = new THREE.Mesh(geomEngine, matEngine);
    engine.position.x = 40;
    engine.castShadow = true;
    engine.receiveShadow = true;
    this.mesh.add(engine);

    let geomTailPlane = new THREE.BoxGeometry(15, 20, 5, 1, 1, 1);
    let matTailPlane = new THREE.MeshPhongMaterial({
      color: COLORS.red,
      shading: THREE.FlatShading
    });
    let tailPlane = new THREE.Mesh(geomTailPlane, matTailPlane);
    tailPlane.position.set(-35, 25, 0);
    tailPlane.castShadow = true;
    tailPlane.receiveShadow = true;
    this.mesh.add(tailPlane);

    let geomSideWing = new THREE.BoxGeometry(40, 8, 150, 1, 1, 1);
    let matSideWing = new THREE.MeshPhongMaterial({
      color: COLORS.red,
      shading: THREE.FlatShading
    });
    let sideWing = new THREE.Mesh(geomSideWing, matSideWing);
    sideWing.castShadow = true;
    sideWing.receiveShadow = true;
    this.mesh.add(sideWing);

    let geomPropeller = new THREE.BoxGeometry(20, 10, 10, 1, 1, 1);
    let matPropeller = new THREE.MeshPhongMaterial({
        color: COLORS.brown,
        shading: THREE.FlatShading
    });
    this.propeller = new THREE.Mesh(geomPropeller, matPropeller);
    this.propeller.castShadow = true;
    this.propeller.receiveShadow = true;

    let geomBlade = new THREE.BoxGeometry(1, 100, 20, 1, 1, 1);
    let matBlade = new THREE.MeshPhongMaterial({
      color: COLORS.brownDark,
      shading: THREE.FlatShading
    });
    let blade = new THREE.Mesh(geomBlade, matBlade);
    blade.position.set(8, 0, 0);
    blade.castShadow = true;
    blade.receiveShadow = true;
    this.propeller.add(blade);
    this.propeller.position.set(50, 0, 0);
    this.mesh.add(this.propeller);
    this.pilot.mesh.position.set(0, 30, 0);
    this.mesh.add(this.pilot.mesh);
  }
}
