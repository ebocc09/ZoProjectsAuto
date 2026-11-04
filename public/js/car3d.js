import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const INK = 0xd9cfb8;
const BAY = 0x141914;
const BAY_FAR = 0x0c100c;
const GRID_A = 0x2f6a48;
const GRID_B = 0x1e2a22;

const LABELS = {
  "front-suspension": "Front wishbones · 135 POLY",
  "front-dampers": "QA1 Ultra Ride",
  steering: "Steering / uprights",
  "rear-suspension": "Trailing rods / panhard",
  brakes: "Brakes / pedal box",
  engine: "GM 3.0 Vortec",
  cooling: "JEGS radiator",
  driveline: "Axle / driveshaft",
  chassis: "Chassis 1442",
  body: "Kinetic body",
  electrical: "Lights & loom",
  wheels: "P205/75R14",
};

const PICK_RANK = {
  "front-dampers": 12,
  steering: 11,
  brakes: 10,
  cooling: 10,
  electrical: 10,
  engine: 9,
  "front-suspension": 9,
  "rear-suspension": 9,
  driveline: 8,
  wheels: 4,
  chassis: 3,
  body: 1,
};

const VIEWS = {
  hero: { pos: [2.55, 0.92, 3.55], target: [0.05, 0.36, 0] },
  side: { pos: [0.1, 0.68, 5.15], target: [0.08, 0.34, 0] },
  front: { pos: [2.35, 0.48, 2.05], target: [1.05, 0.28, 0.4] },
  rear: { pos: [-2.85, 0.95, 2.75], target: [-0.4, 0.36, 0] },
  engine: { pos: [2.05, 1.75, 0.35], target: [0.9, 0.46, 0] },
  orbit: { pos: [3.4, 1.45, 3.4], target: [0.08, 0.38, 0] },
};

const WB = 2.26;
const TRACK = 1.49;
const WR = 0.328;
const AXLE_Y = WR;
const FX = WB / 2;
const RX = -WB / 2;
const FZ = TRACK / 2;

const BASE_COLOR = {
  body: 0x3d6b4e,
  chassis: 0x6d737a,
  "front-suspension": 0x8a9098,
  "front-dampers": 0xb9c2c8,
  steering: 0x7a8088,
  "rear-suspension": 0x8a9098,
  brakes: 0x5c4034,
  engine: 0x4a4e52,
  cooling: 0x6a3228,
  driveline: 0x6a6e74,
  electrical: 0xe8dcc8,
  wheels: 0x2a2a2a,
};

const BASE_OPACITY = {
  body: 0.5,
  chassis: 0.42,
  "front-suspension": 0.62,
  "front-dampers": 0.7,
  steering: 0.58,
  "rear-suspension": 0.58,
  brakes: 0.55,
  engine: 0.62,
  cooling: 0.6,
  driveline: 0.5,
  electrical: 0.82,
  wheels: 0.58,
};

const fillMats = {};
const inkMats = {};

function fillMat(sys) {
  if (!fillMats[sys]) {
    fillMats[sys] = new THREE.MeshLambertMaterial({
      color: BASE_COLOR[sys] ?? 0x888888,
      transparent: true,
      opacity: BASE_OPACITY[sys] ?? 0.4,
      side: THREE.DoubleSide,
      depthWrite: sys !== "body",
    });
    inkMats[sys] = new THREE.LineBasicMaterial({
      color: INK,
      transparent: true,
      opacity: 0.88,
    });
  }
  return fillMats[sys];
}

function ink(mesh, sys, threshold = 22) {
  mesh.material = fillMat(sys);
  mesh.userData.system = sys;
  mesh.userData.kind = "fill";
  const line = new THREE.LineSegments(
    new THREE.EdgesGeometry(mesh.geometry, threshold),
    inkMats[sys]
  );
  line.userData.system = sys;
  line.userData.kind = "ink";
  line.raycast = () => {};
  mesh.add(line);
  return mesh;
}

function mark(root, sys) {
  root.traverse((n) => {
    if (n.isMesh && !n.userData.system) {
      ink(n, sys);
    }
  });
  return root;
}

function tube(from, to, r, sys) {
  const a = from.clone ? from : new THREE.Vector3(...from);
  const b = to.clone ? to : new THREE.Vector3(...to);
  const dir = b.clone().sub(a);
  const len = dir.length();
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(r, r, len, 8), fillMat(sys));
  mesh.position.copy(a).add(b).multiplyScalar(0.5);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
  return ink(mesh, sys, 18);
}

const HIT_MAT = new THREE.MeshBasicMaterial({
  transparent: true,
  opacity: 0,
  depthWrite: false,
  side: THREE.DoubleSide,
});

function hitBall(x, y, z, r, sys, parent) {
  const m = new THREE.Mesh(new THREE.SphereGeometry(r, 10, 8), HIT_MAT);
  m.position.set(x, y, z);
  m.userData.system = sys;
  m.userData.kind = "hit";
  parent.add(m);
  return m;
}

function hitCapsule(from, to, r, sys, parent) {
  const a = from.clone ? from : new THREE.Vector3(...from);
  const b = to.clone ? to : new THREE.Vector3(...to);
  const dir = b.clone().sub(a);
  const len = Math.max(dir.length(), 0.04);
  const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, len, 8), HIT_MAT);
  m.position.copy(a).add(b).multiplyScalar(0.5);
  m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
  m.userData.system = sys;
  m.userData.kind = "hit";
  parent.add(m);
  return m;
}

function cycleFender() {
  const shape = new THREE.Shape();
  const outer = 0.43;
  const inner = 0.35;
  const start = 0.22;
  const end = Math.PI - 0.1;
  const steps = 22;
  for (let i = 0; i <= steps; i++) {
    const a = start + ((end - start) * i) / steps;
    const x = Math.cos(a) * outer;
    const y = Math.sin(a) * outer;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  for (let i = steps; i >= 0; i--) {
    const a = start + ((end - start) * i) / steps;
    shape.lineTo(Math.cos(a) * inner, Math.sin(a) * inner);
  }
  shape.closePath();
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.3,
    bevelEnabled: true,
    bevelThickness: 0.01,
    bevelSize: 0.008,
    bevelSegments: 1,
    curveSegments: 8,
  });
  geo.translate(0, 0, -0.15);
  return ink(new THREE.Mesh(geo, fillMat("body")), "body", 18);
}

function wheel() {
  const g = new THREE.Group();
  const tire = ink(
    new THREE.Mesh(new THREE.TorusGeometry(WR - 0.072, 0.08, 10, 28), fillMat("wheels")),
    "wheels",
    28
  );
  const rim = ink(
    new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.1, 20), fillMat("wheels")),
    "wheels",
    12
  );
  rim.rotation.x = Math.PI / 2;
  const hub = ink(
    new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.12, 12), fillMat("wheels")),
    "wheels",
    20
  );
  hub.rotation.x = Math.PI / 2;
  const spokeGeo = new THREE.BoxGeometry(0.36, 0.024, 0.02);
  for (let i = 0; i < 5; i++) {
    const s = ink(new THREE.Mesh(spokeGeo, fillMat("wheels")), "wheels", 40);
    s.rotation.z = (i * Math.PI) / 5;
    g.add(s);
  }
  g.add(tire, rim, hub);
  return g;
}

function wishbone(innerA, innerB, outer, sys) {
  const g = new THREE.Group();
  g.add(tube(innerA, outer, 0.014, sys));
  g.add(tube(innerB, outer, 0.014, sys));
  g.add(tube(innerA, innerB, 0.012, sys));
  const bushMat = new THREE.MeshLambertMaterial({
    color: 0x6b3d28,
    transparent: true,
    opacity: 0.85,
    depthWrite: false,
  });
  for (const p of [innerA, innerB]) {
    const bush = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.046, 12), bushMat);
    bush.rotation.x = Math.PI / 2;
    bush.position.copy(p);
    ink(bush, sys, 25);
    g.add(bush);
    hitBall(p.x, p.y, p.z, 0.08, sys, g);
  }
  const bj = new THREE.Mesh(new THREE.SphereGeometry(0.03, 10, 8), fillMat("steering"));
  bj.position.copy(outer);
  ink(bj, "steering", 20);
  g.add(bj);
  hitBall(outer.x, outer.y, outer.z, 0.07, "steering", g);
  return g;
}

function coilover(from, to, sys) {
  const g = new THREE.Group();
  const a = from.clone();
  const b = to.clone();
  const dir = b.clone().sub(a);
  const len = dir.length();
  const mid = a.clone().add(b).multiplyScalar(0.5);
  const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());

  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.024, len * 0.55, 10), fillMat(sys));
  body.quaternion.copy(quat);
  body.position.copy(mid);
  ink(body, sys, 18);
  g.add(body);

  const ringGeo = new THREE.TorusGeometry(0.042, 0.007, 6, 14);
  for (let i = 0; i < 9; i++) {
    const t = i / 8;
    const p = a.clone().lerp(b, 0.18 + t * 0.45);
    const ring = new THREE.Mesh(ringGeo, fillMat(sys));
    ring.quaternion.copy(quat);
    ring.rotateX(Math.PI / 2);
    ring.position.copy(p);
    ink(ring, sys, 40);
    g.add(ring);
  }
  hitCapsule(a, b, 0.09, sys, g);
  return g;
}

function sevenBody() {
  const s = new THREE.Shape();
  s.moveTo(1.62, 0.2);
  s.lineTo(1.66, 0.27);
  s.quadraticCurveTo(1.64, 0.4, 1.48, 0.46);
  s.lineTo(1.18, 0.51);
  s.lineTo(0.52, 0.525);
  s.lineTo(0.38, 0.64);
  s.lineTo(0.3, 0.58);
  s.lineTo(0.26, 0.4);
  s.lineTo(-0.68, 0.4);
  s.lineTo(-0.76, 0.5);
  s.lineTo(-1.12, 0.49);
  s.quadraticCurveTo(-1.2, 0.42, -1.18, 0.28);
  s.lineTo(-1.14, 0.18);
  s.lineTo(1.5, 0.17);
  s.closePath();

  const geo = new THREE.ExtrudeGeometry(s, {
    depth: 0.92,
    bevelEnabled: false,
    curveSegments: 12,
  });
  geo.translate(0, 0, -0.46);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const z = pos.getZ(i);
    let w = 1;
    if (x > 0.35) w = THREE.MathUtils.lerp(1, 0.36, Math.min(1, (x - 0.35) / 1.28));
    else if (x < -0.72) w = THREE.MathUtils.lerp(1, 0.78, Math.min(1, (-0.72 - x) / 0.48));
    pos.setZ(i, z * w);
  }
  pos.needsUpdate = true;
  geo.computeVertexNormals();
  return ink(new THREE.Mesh(geo, fillMat("body")), "body", 16);
}

function buildSeven() {
  const car = new THREE.Group();
  car.name = "seven";

  const chassis = new THREE.Group();
  const railZ = 0.29;
  const yRail = 0.2;
  [-1, 1].forEach((side) => {
    chassis.add(tube([-1.08, yRail, railZ * side], [1.22, yRail, railZ * side], 0.022, "chassis"));
    chassis.add(tube([-0.7, yRail, railZ * side], [-0.7, 0.4, railZ * side], 0.018, "chassis"));
    chassis.add(tube([0.32, yRail, railZ * side], [0.32, 0.52, railZ * side], 0.018, "chassis"));
  });
  for (const x of [-0.92, -0.3, 0.32, 0.95]) {
    chassis.add(tube([x, yRail, -railZ], [x, yRail, railZ], 0.018, "chassis"));
  }
  car.add(chassis);

  const hoop = new THREE.Mesh(
    new THREE.TorusGeometry(0.4, 0.016, 8, 22, Math.PI),
    fillMat("chassis")
  );
  hoop.rotation.y = Math.PI / 2;
  hoop.position.set(-0.58, 0.72, 0);
  ink(hoop, "chassis", 12);
  car.add(hoop);
  car.add(tube([-0.58, 0.72, 0.4], [-0.92, 0.42, 0.22], 0.012, "chassis"));
  car.add(tube([-0.58, 0.72, -0.4], [-0.92, 0.42, -0.22], 0.012, "chassis"));

  car.add(sevenBody());

  const screen = new THREE.Mesh(
    new THREE.BoxGeometry(0.035, 0.4, 0.92),
    new THREE.MeshLambertMaterial({
      color: 0x8aa0b0,
      transparent: true,
      opacity: 0.18,
      depthWrite: false,
      side: THREE.DoubleSide,
    })
  );
  screen.position.set(0.28, 0.82, 0);
  screen.rotation.z = -0.42;
  ink(screen, "body", 12);
  car.add(screen);
  car.add(tube([0.36, 0.62, -0.46], [0.18, 1.02, -0.42], 0.008, "body"));
  car.add(tube([0.36, 0.62, 0.46], [0.18, 1.02, 0.42], 0.008, "body"));
  car.add(tube([0.18, 1.02, -0.42], [0.18, 1.02, 0.42], 0.008, "body"));

  [-0.2, 0.2].forEach((z) => {
    const base = ink(new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.07, 0.3), fillMat("body")), "body");
    base.position.set(-0.22, 0.38, z);
    const back = ink(new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.34, 0.3), fillMat("body")), "body");
    back.position.set(-0.4, 0.54, z);
    back.rotation.z = 0.22;
    car.add(base, back);
  });

  const hlGeo = new THREE.SphereGeometry(0.11, 16, 12);
  [-1, 1].forEach((side) => {
    const bowl = ink(new THREE.Mesh(hlGeo, fillMat("electrical")), "electrical", 18);
    bowl.position.set(1.52, 0.44, 0.24 * side);
    bowl.scale.set(1.2, 1, 1);
    car.add(bowl);
    hitBall(1.52, 0.44, 0.24 * side, 0.18, "electrical", car);
  });

  const tailGeo = new THREE.SphereGeometry(0.06, 10, 8);
  [-1, 1].forEach((side) => {
    const lamp = ink(new THREE.Mesh(tailGeo, fillMat("electrical")), "electrical", 20);
    lamp.position.set(-1.16, 0.42, 0.34 * side);
    car.add(lamp);
    hitBall(-1.16, 0.42, 0.34 * side, 0.12, "electrical", car);
  });

  car.add(tube([1.48, 0.38, 0.34], [-1.08, 0.38, 0.34], 0.012, "electrical"));
  car.add(tube([1.48, 0.38, -0.34], [0.5, 0.34, -0.22], 0.01, "electrical"));
  const fuse = ink(new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.06, 0.18), fillMat("electrical")), "electrical");
  fuse.position.set(0.4, 0.54, 0.1);
  car.add(fuse);
  hitBall(0.4, 0.54, 0.1, 0.14, "electrical", car);

  const wheels = new THREE.Group();
  const fenders = new THREE.Group();
  const wpos = [
    [FX, AXLE_Y, FZ],
    [FX, AXLE_Y, -FZ],
    [RX, AXLE_Y, FZ],
    [RX, AXLE_Y, -FZ],
  ];
  wpos.forEach(([x, y, z]) => {
    const w = wheel();
    w.position.set(x, y, z);
    wheels.add(w);
    const f = cycleFender();
    f.position.set(x, y, z);
    fenders.add(f);
  });
  mark(wheels, "wheels");
  car.add(wheels, fenders);

  [-1, 1].forEach((side) => {
    const z = FZ * side;
    const disc = ink(
      new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.018, 22), fillMat("brakes")),
      "brakes",
      12
    );
    disc.rotation.x = Math.PI / 2;
    disc.position.set(FX, AXLE_Y, z - 0.12 * side);
    car.add(disc);
  });

  const pedal = ink(new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.1, 0.22), fillMat("brakes")), "brakes");
  pedal.position.set(0.42, 0.28, -0.14);
  car.add(pedal);
  hitBall(0.42, 0.28, -0.14, 0.12, "brakes", car);

  const sus = new THREE.Group();
  [-1, 1].forEach((side) => {
    const zIn = 0.3 * side;
    const zOut = (FZ - 0.12) * side;
    const uf = new THREE.Vector3(FX - 0.095, 0.46, zIn);
    const ur = new THREE.Vector3(FX + 0.095, 0.46, zIn);
    const uo = new THREE.Vector3(FX, 0.5, zOut);
    const lf = new THREE.Vector3(FX - 0.165, 0.22, zIn);
    const lr = new THREE.Vector3(FX + 0.165, 0.22, zIn);
    const lo = new THREE.Vector3(FX, 0.21, zOut + 0.04 * side);
    sus.add(wishbone(uf, ur, uo, "front-suspension"));
    sus.add(wishbone(lf, lr, lo, "front-suspension"));
    sus.add(
      coilover(
        new THREE.Vector3(FX - 0.02, 0.22, zOut * 0.72),
        new THREE.Vector3(FX - 0.02, 0.58, zIn + 0.04 * side),
        "front-dampers"
      )
    );
    sus.add(tube(uo, new THREE.Vector3(FX, 0.21, zOut), 0.012, "steering"));
  });
  const rack = tube([FX + 0.02, 0.24, -0.28], [FX + 0.02, 0.24, 0.28], 0.016, "steering");
  sus.add(rack);
  sus.add(tube([FX + 0.02, 0.24, -0.28], [FX, 0.22, -(FZ - 0.14)], 0.01, "steering"));
  sus.add(tube([FX + 0.02, 0.24, 0.28], [FX, 0.22, FZ - 0.14], 0.01, "steering"));
  car.add(sus);

  const wheelSteer = ink(
    new THREE.Mesh(new THREE.TorusGeometry(0.125, 0.012, 8, 22), fillMat("steering")),
    "steering",
    16
  );
  wheelSteer.position.set(0.22, 0.62, -0.18);
  wheelSteer.rotation.x = 1.15;
  car.add(wheelSteer);

  const rear = new THREE.Group();
  [-1, 1].forEach((side) => {
    const z = 0.24 * side;
    rear.add(tube([0.05, 0.26, z], [RX + 0.08, 0.26, FZ * 0.55 * side], 0.016, "rear-suspension"));
    rear.add(
      coilover(
        new THREE.Vector3(RX + 0.15, 0.24, 0.36 * side),
        new THREE.Vector3(RX + 0.2, 0.58, 0.28 * side),
        "rear-suspension"
      )
    );
  });
  rear.add(tube([RX + 0.12, 0.28, -0.42], [RX + 0.12, 0.28, 0.42], 0.012, "rear-suspension"));
  car.add(rear);

  const axle = ink(
    new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, TRACK - 0.2, 10), fillMat("driveline")),
    "driveline",
    12
  );
  axle.rotation.x = Math.PI / 2;
  axle.position.set(RX, AXLE_Y, 0);
  car.add(axle);
  car.add(tube([0.2, 0.22, 0], [RX + 0.12, 0.22, 0], 0.028, "driveline"));

  const engine = new THREE.Group();
  const block = ink(
    new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.28, 0.34), fillMat("engine")),
    "engine",
    12
  );
  block.position.set(0.92, 0.42, 0);
  const head = ink(
    new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.1, 0.3), fillMat("engine")),
    "engine",
    12
  );
  head.position.set(0.92, 0.6, 0);
  engine.add(block, head);
  car.add(engine);
  hitBall(0.92, 0.48, 0, 0.22, "engine", car);

  const rad = ink(
    new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.32, 0.46), fillMat("cooling")),
    "cooling",
    10
  );
  rad.position.set(1.48, 0.38, 0);
  car.add(rad);
  const fan = ink(
    new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.03, 16), fillMat("cooling")),
    "cooling",
    16
  );
  fan.rotation.z = Math.PI / 2;
  fan.position.set(1.42, 0.38, 0);
  car.add(fan);
  hitBall(1.48, 0.38, 0, 0.16, "cooling", car);

  const exhaust = ink(
    new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 1.35, 10), fillMat("body")),
    "body",
    12
  );
  exhaust.rotation.z = Math.PI / 2;
  exhaust.position.set(0.05, 0.16, -0.48);
  car.add(exhaust);

  const battery = ink(
    new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.1, 0.12), fillMat("electrical")),
    "electrical"
  );
  battery.position.set(0.52, 0.32, 0.28);
  car.add(battery);

  return car;
}

function applyHighlight(current, hover) {
  for (const sys of Object.keys(fillMats)) {
    const fill = fillMats[sys];
    const line = inkMats[sys];
    const selected = sys === current;
    const hovered = sys === hover && sys !== current;
    const dim = current && !selected && !hovered;
    if (selected) {
      fill.color.setHex(sys === "front-suspension" ? 0xc45a2a : 0xd98a2b);
      fill.opacity = 0.72;
      line.color.setHex(sys === "front-suspension" ? 0xf0b45a : 0xf4c56a);
      line.opacity = 1;
    } else if (hovered) {
      fill.color.setHex(BASE_COLOR[sys]);
      fill.opacity = Math.min(0.7, (BASE_OPACITY[sys] ?? 0.4) + 0.22);
      line.color.setHex(0xd98a2b);
      line.opacity = 1;
    } else {
      fill.color.setHex(BASE_COLOR[sys]);
      fill.opacity = dim ? (BASE_OPACITY[sys] ?? 0.4) * 0.22 : BASE_OPACITY[sys] ?? 0.4;
      line.color.setHex(INK);
      line.opacity = dim ? 0.18 : 0.88;
    }
  }
}

function ease(t) {
  return t * t * (3 - 2 * t);
}

export function mountStudio(container) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(BAY);
  scene.fog = new THREE.Fog(BAY_FAR, 8, 16);

  const camera = new THREE.PerspectiveCamera(36, 1, 0.05, 40);
  camera.position.set(...VIEWS.hero.pos);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setClearColor(BAY, 1);
  renderer.domElement.style.display = "block";
  renderer.domElement.style.cursor = "grab";
  container.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.18;
  controls.target.set(...VIEWS.hero.target);
  controls.minDistance = 1.6;
  controls.maxDistance = 7.5;
  controls.minPolarAngle = 0.18;
  controls.maxPolarAngle = Math.PI * 0.82;
  controls.autoRotate = false;
  controls.rotateSpeed = 0.32;
  controls.zoomSpeed = 0.45;
  controls.panSpeed = 0.28;
  controls.enablePan = true;
  controls.screenSpacePanning = true;

  scene.add(new THREE.AmbientLight(0xb7c4b4, 0.95));
  const key = new THREE.DirectionalLight(0xe7f0e4, 0.4);
  key.position.set(3, 6, 4);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0x3d6b4e, 0.22);
  fill.position.set(-3, 2, -2);
  scene.add(fill);

  const grid = new THREE.GridHelper(9, 28, GRID_A, GRID_B);
  grid.position.y = 0;
  grid.material.transparent = true;
  grid.material.opacity = 0.28;
  scene.add(grid);

  const pad = new THREE.Mesh(
    new THREE.CircleGeometry(3.2, 64),
    new THREE.MeshBasicMaterial({ color: 0x1a221c, transparent: true, opacity: 0.55 })
  );
  pad.rotation.x = -Math.PI / 2;
  pad.position.y = -0.002;
  scene.add(pad);

  const car = buildSeven();
  scene.add(car);

  const ray = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  let current = null;
  let hover = null;
  let onPick = () => {};
  let onHover = () => {};
  let fly = null;
  let ptrDown = null;

  function pickId(ev) {
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((ev.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((ev.clientY - rect.top) / rect.height) * 2 + 1;
    ray.setFromCamera(mouse, camera);
    const hits = ray.intersectObject(car, true).filter((h) => h.object.userData.system);
    if (!hits.length) return null;
    const nearest = hits[0].distance;
    const near = hits.filter((h) => h.distance - nearest < 0.4);
    let best = near[0];
    let rank = PICK_RANK[best.object.userData.system] || 0;
    for (const h of near) {
      const r = PICK_RANK[h.object.userData.system] || 0;
      if (r > rank) {
        best = h;
        rank = r;
      }
    }
    return best.object.userData.system;
  }

  function systemCenter(id) {
    const box = new THREE.Box3();
    let found = false;
    car.traverse((n) => {
      if (n.isMesh && n.userData.system === id && n.userData.kind !== "hit") {
        box.expandByObject(n);
        found = true;
      }
    });
    return found ? box.getCenter(new THREE.Vector3()) : new THREE.Vector3(0, 0.4, 0);
  }

  function projectTag() {
    const id = hover;
    if (!id) {
      onHover(null);
      return;
    }
    const p = systemCenter(id).project(camera);
    const rect = renderer.domElement.getBoundingClientRect();
    const host = container.getBoundingClientRect();
    onHover({
      id,
      label: LABELS[id] || id,
      x: (p.x * 0.5 + 0.5) * rect.width + (rect.left - host.left),
      y: (-p.y * 0.5 + 0.5) * rect.height + (rect.top - host.top),
    });
  }

  renderer.domElement.addEventListener("pointerdown", (e) => {
    ptrDown = { x: e.clientX, y: e.clientY };
    renderer.domElement.style.cursor = "grabbing";
  });
  renderer.domElement.addEventListener("pointerup", (e) => {
    renderer.domElement.style.cursor = hover ? "pointer" : "grab";
    if (!ptrDown) return;
    const dx = e.clientX - ptrDown.x;
    const dy = e.clientY - ptrDown.y;
    ptrDown = null;
    if (dx * dx + dy * dy > 64) return;
    const id = pickId(e);
    if (id) onPick(id);
  });
  renderer.domElement.addEventListener("pointermove", (e) => {
    if (e.buttons) return;
    const id = pickId(e);
    hover = id;
    renderer.domElement.style.cursor = id ? "pointer" : "grab";
    applyHighlight(current, hover);
  });
  renderer.domElement.addEventListener("pointerleave", () => {
    hover = null;
    applyHighlight(current, hover);
    if (!current) onHover(null);
  });

  const ro = new ResizeObserver(() => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    if (!w || !h) return;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  });
  ro.observe(container);

  let raf = 0;
  function tick() {
    raf = requestAnimationFrame(tick);
    if (fly) {
      fly.t += 0.045;
      const t = Math.min(1, fly.t);
      const s = ease(t);
      camera.position.lerpVectors(fly.fromPos, fly.toPos, s);
      controls.target.lerpVectors(fly.fromTarget, fly.toTarget, s);
      if (t >= 1) fly = null;
    }
    controls.update();
    renderer.render(scene, camera);
    projectTag();
  }
  tick();

  return {
    setHighlight(id) {
      current = id;
      applyHighlight(current, hover);
    },
    setView(name) {
      const v = VIEWS[name] || VIEWS.hero;
      fly = {
        fromPos: camera.position.clone(),
        toPos: new THREE.Vector3(...v.pos),
        fromTarget: controls.target.clone(),
        toTarget: new THREE.Vector3(...v.target),
        t: 0,
      };
    },
    onPick(fn) {
      onPick = fn;
    },
    onHover(fn) {
      onHover = fn;
    },
    dispose() {
      cancelAnimationFrame(raf);
      ro.disconnect();
      controls.dispose();
      renderer.dispose();
      renderer.domElement.remove();
      Object.keys(fillMats).forEach((k) => delete fillMats[k]);
      Object.keys(inkMats).forEach((k) => delete inkMats[k]);
    },
  };
}
