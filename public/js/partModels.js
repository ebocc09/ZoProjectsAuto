import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const mat = {
  steel: new THREE.MeshStandardMaterial({ color: 0xc5ccd4, metalness: 0.32, roughness: 0.46 }),
  dark: new THREE.MeshStandardMaterial({ color: 0x4a5058, metalness: 0.22, roughness: 0.52 }),
  alum: new THREE.MeshStandardMaterial({ color: 0xd8dee6, metalness: 0.28, roughness: 0.38 }),
  chrome: new THREE.MeshStandardMaterial({ color: 0xf2f4f7, metalness: 0.5, roughness: 0.24 }),
  black: new THREE.MeshStandardMaterial({ color: 0x1a1c1e, metalness: 0.2, roughness: 0.72 }),
  rubber: new THREE.MeshStandardMaterial({ color: 0x2a2a2a, metalness: 0.04, roughness: 0.9 }),
  poly: new THREE.MeshStandardMaterial({ color: 0xd0893a, metalness: 0.05, roughness: 0.48 }),
  boot: new THREE.MeshStandardMaterial({ color: 0x222428, metalness: 0.08, roughness: 0.8 }),
  red: new THREE.MeshStandardMaterial({ color: 0x9a2a22, metalness: 0.15, roughness: 0.4 }),
  paint: new THREE.MeshStandardMaterial({ color: 0x2f6a48, metalness: 0.25, roughness: 0.38 }),
  brass: new THREE.MeshStandardMaterial({ color: 0xc6a15a, metalness: 0.8, roughness: 0.32 }),
  leather: new THREE.MeshStandardMaterial({ color: 0x6a3a24, metalness: 0.05, roughness: 0.78 }),
  plastic: new THREE.MeshStandardMaterial({ color: 0x2a2e32, metalness: 0.1, roughness: 0.55 }),
  glass: new THREE.MeshStandardMaterial({ color: 0xd5e4e2, metalness: 0.05, roughness: 0.08, transparent: true, opacity: 0.45 }),
  oil: new THREE.MeshStandardMaterial({ color: 0xc47a1a, metalness: 0.05, roughness: 0.4, transparent: true, opacity: 0.9 }),
  atf: new THREE.MeshStandardMaterial({ color: 0xa32020, metalness: 0.05, roughness: 0.4, transparent: true, opacity: 0.9 }),
  cool: new THREE.MeshStandardMaterial({ color: 0x2f8a4a, metalness: 0.05, roughness: 0.4, transparent: true, opacity: 0.9 }),
  brake: new THREE.MeshStandardMaterial({ color: 0xd4c15a, metalness: 0.05, roughness: 0.4, transparent: true, opacity: 0.9 }),
  clutch: new THREE.MeshStandardMaterial({ color: 0x3a6ea8, metalness: 0.05, roughness: 0.4, transparent: true, opacity: 0.9 }),
};

function mesh(geo, material) {
  const m = new THREE.Mesh(geo, material);
  m.castShadow = true;
  return m;
}
function put(group, m, x, y, z, rx = 0, ry = 0, rz = 0) {
  m.position.set(x, y, z);
  m.rotation.set(rx, ry, rz);
  group.add(m);
  return m;
}
function cyl(r, h, material, seg = 24) {
  return mesh(new THREE.CylinderGeometry(r, r, h, seg), material);
}
function spring(radius, turns, height, tubeR, material) {
  const pts = [];
  const n = Math.round(turns * 20);
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const a = t * turns * Math.PI * 2;
    pts.push(new THREE.Vector3(Math.cos(a) * radius, (t - 0.5) * height, Math.sin(a) * radius));
  }
  const curve = new THREE.CatmullRomCurve3(pts);
  return mesh(new THREE.TubeGeometry(curve, n, tubeR, 6, false), material);
}
function eye(group, y, poly) {
  put(group, mesh(new THREE.TorusGeometry(0.09, 0.028, 10, 18), mat.steel), 0, y, 0, Math.PI / 2, 0, 0);
  if (poly) put(group, mesh(new THREE.TorusGeometry(0.055, 0.02, 8, 16), mat.poly), 0, y, 0, Math.PI / 2, 0, 0);
  put(group, mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.12, 12), mat.dark), 0, y, 0, 0, 0, Math.PI / 2);
}
function heim(group, x, y, z, scale = 1) {
  const g = new THREE.Group();
  put(g, mesh(new THREE.SphereGeometry(0.07, 18, 14), mat.steel), 0, 0, 0);
  put(g, mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.16, 12), mat.dark), 0, 0, 0, Math.PI / 2, 0, 0);
  put(g, cyl(0.028, 0.22, mat.steel), 0.16, 0, 0, 0, 0, Math.PI / 2);
  put(g, mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.04, 6), mat.brass), 0.08, 0, 0, 0, 0, Math.PI / 2);
  g.scale.setScalar(scale);
  g.position.set(x, y, z);
  group.add(g);
}
function ballJoint(group, x, y, z) {
  put(group, mesh(new THREE.SphereGeometry(0.07, 16, 12), mat.steel), x, y, z);
  put(group, mesh(new THREE.CylinderGeometry(0.05, 0.07, 0.06, 16), mat.boot), x, y + 0.06, z);
  put(group, cyl(0.018, 0.14, mat.chrome), x, y + 0.14, z);
  put(group, mesh(new THREE.CylinderGeometry(0.032, 0.032, 0.02, 6), mat.steel), x, y + 0.2, z);
}

const BUILD = {
  bush(g) {
    put(g, mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.12, 32), mat.poly), 0, 0.08, 0);
    put(g, mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.18, 20), mat.steel), 0, 0.1, 0);
    put(g, mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.22, 16), mat.dark), 0, 0.11, 0);
  },
  heim(g) {
    heim(g, 0, 0.1, 0, 1.4);
  },
  ball(g) {
    ballJoint(g, 0, 0.08, 0);
    put(g, mesh(new THREE.BoxGeometry(0.16, 0.04, 0.12), mat.steel), 0, 0.04, 0);
  },
  tierod(g) {
    put(g, cyl(0.025, 0.46, mat.steel), 0, 0.12, 0, 0, 0, Math.PI / 2);
    ballJoint(g, 0.26, 0.08, 0);
    put(g, mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.05, 6), mat.brass), -0.16, 0.12, 0, 0, 0, Math.PI / 2);
  },
  arm(g) {
    const leg = (x0, y0, x1, y1) => {
      const dx = x1 - x0;
      const dy = y1 - y0;
      const bar = mesh(new THREE.BoxGeometry(Math.hypot(dx, dy), 0.09, 0.05), mat.steel);
      bar.position.set((x0 + x1) / 2, (y0 + y1) / 2, 0);
      bar.rotation.z = Math.atan2(dy, dx);
      g.add(bar);
    };
    leg(-0.4, 0.16, 0.26, 0.03);
    leg(-0.4, -0.16, 0.26, -0.03);
    put(g, mesh(new THREE.BoxGeometry(0.08, 0.4, 0.05), mat.steel), -0.4, 0, 0);
    put(g, mesh(new THREE.BoxGeometry(0.12, 0.1, 0.05), mat.steel), 0.26, 0, 0);
    [-0.16, 0.16].forEach((y) => {
      put(g, mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.08, 20), mat.poly), -0.4, y, 0, Math.PI / 2, 0, 0);
      put(g, mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.12, 14), mat.steel), -0.4, y, 0, Math.PI / 2, 0, 0);
      put(g, mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.15, 12), mat.dark), -0.4, y, 0, Math.PI / 2, 0, 0);
    });
    ballJoint(g, 0.34, 0, 0);
  },
  coil(g) {
    put(g, cyl(0.055, 0.62, mat.chrome), 0, 0.46, 0);
    put(g, cyl(0.028, 0.28, mat.dark), 0, 0.78, 0);
    g.add(spring(0.09, 8, 0.5, 0.012, mat.steel));
    g.children[g.children.length - 1].position.y = 0.48;
    eye(g, 0.96, true);
    eye(g, 0.12, true);
  },
  bar(g) {
    put(g, cyl(0.028, 0.7, mat.steel), 0, 0.12, 0, 0, 0, Math.PI / 2);
    heim(g, -0.42, 0.12, 0, 0.85);
    heim(g, 0.42, 0.12, 0, 0.85);
    g.children[g.children.length - 1].rotation.y = Math.PI;
  },
  master(g) {
    put(g, mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.28, 20), mat.alum), 0.05, 0.12, 0, 0, 0, Math.PI / 2);
    put(g, mesh(new THREE.BoxGeometry(0.1, 0.14, 0.08), mat.plastic), -0.04, 0.24, 0);
    put(g, mesh(new THREE.BoxGeometry(0.1, 0.14, 0.08), mat.plastic), 0.12, 0.24, 0);
    put(g, mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.02, 16), mat.black), -0.04, 0.32, 0);
    put(g, mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.02, 16), mat.black), 0.12, 0.32, 0);
    put(g, cyl(0.015, 0.16, mat.steel), -0.16, 0.12, 0, 0, 0, Math.PI / 2);
  },
  rad(g) {
    put(g, mesh(new THREE.BoxGeometry(0.12, 0.7, 0.55), mat.alum), 0, 0.42, 0);
    for (let i = 0; i < 10; i++) {
      put(g, mesh(new THREE.BoxGeometry(0.125, 0.012, 0.52), mat.dark), 0, 0.14 + i * 0.06, 0);
    }
    put(g, mesh(new THREE.BoxGeometry(0.1, 0.62, 0.08), mat.dark), 0, 0.42, 0.3);
    put(g, mesh(new THREE.BoxGeometry(0.1, 0.62, 0.08), mat.dark), 0, 0.42, -0.3);
    const fan = new THREE.Group();
    put(fan, mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.04, 16), mat.black), 0, 0, 0, Math.PI / 2, 0, 0);
    for (let i = 0; i < 6; i++) {
      const b = mesh(new THREE.BoxGeometry(0.16, 0.03, 0.012), mat.black);
      b.position.set(Math.cos((i / 6) * Math.PI * 2) * 0.1, Math.sin((i / 6) * Math.PI * 2) * 0.1, 0);
      b.rotation.z = (i / 6) * Math.PI * 2;
      fan.add(b);
    }
    fan.position.set(0.1, 0.42, 0);
    g.add(fan);
    put(g, mesh(new THREE.TorusGeometry(0.04, 0.012, 8, 12), mat.brass), -0.02, 0.72, 0.18, Math.PI / 2, 0, 0);
  },
  engine(g) {
    put(g, mesh(new THREE.BoxGeometry(0.46, 0.32, 0.36), mat.dark), 0, 0.28, 0);
    put(g, mesh(new THREE.BoxGeometry(0.42, 0.1, 0.32), mat.alum), 0, 0.48, 0);
    put(g, mesh(new THREE.BoxGeometry(0.36, 0.06, 0.22), mat.steel), 0, 0.55, 0);
    for (let i = 0; i < 4; i++) put(g, cyl(0.018, 0.06, mat.chrome), -0.15 + i * 0.1, 0.6, 0.08);
    put(g, mesh(new THREE.BoxGeometry(0.28, 0.08, 0.16), mat.alum), 0, 0.5, -0.16);
    put(g, mesh(new THREE.CylinderGeometry(0.16, 0.2, 0.12, 20), mat.dark), 0.32, 0.28, 0, 0, 0, Math.PI / 2);
    put(g, mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.03, 20), mat.steel), 0.4, 0.28, 0, 0, 0, Math.PI / 2);
  },
  slave(g) {
    put(g, cyl(0.05, 0.22, mat.alum), 0, 0.12, 0, 0, 0, Math.PI / 2);
    put(g, mesh(new THREE.CylinderGeometry(0.055, 0.04, 0.06, 16), mat.boot), 0.12, 0.12, 0, 0, 0, Math.PI / 2);
    put(g, cyl(0.012, 0.12, mat.chrome), 0.2, 0.12, 0, 0, 0, Math.PI / 2);
    put(g, mesh(new THREE.SphereGeometry(0.03, 12, 10), mat.brass), -0.12, 0.12, 0);
  },
  box(g) {
    put(g, mesh(new THREE.BoxGeometry(0.34, 0.28, 0.28), mat.alum), -0.05, 0.2, 0);
    put(g, mesh(new THREE.CylinderGeometry(0.12, 0.14, 0.1, 16), mat.dark), -0.26, 0.2, 0, 0, 0, Math.PI / 2);
    put(g, cyl(0.04, 0.28, mat.steel), 0.22, 0.2, 0, 0, 0, Math.PI / 2);
    put(g, mesh(new THREE.BoxGeometry(0.08, 0.1, 0.08), mat.dark), 0.02, 0.36, 0);
  },
  shaft(g) {
    put(g, cyl(0.035, 0.7, mat.steel), 0, 0.12, 0, 0, 0, Math.PI / 2);
    heim(g, -0.4, 0.12, 0, 0.7);
    heim(g, 0.4, 0.12, 0, 0.7);
    g.children[g.children.length - 1].rotation.y = Math.PI;
  },
  fuse(g) {
    put(g, mesh(new THREE.BoxGeometry(0.55, 0.12, 0.28), mat.plastic), 0, 0.08, 0);
    const colors = [mat.red, mat.poly, mat.cool, mat.brake, mat.chrome, mat.steel, mat.boot];
    colors.forEach((c, i) => put(g, mesh(new THREE.BoxGeometry(0.045, 0.1, 0.08), c), -0.21 + i * 0.07, 0.16, 0));
  },
  strip(g) {
    put(g, mesh(new THREE.BoxGeometry(0.62, 0.06, 0.12), mat.plastic), 0, 0.06, 0);
    for (let i = 0; i < 8; i++) put(g, mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.03, 10), mat.brass), -0.24 + i * 0.07, 0.1, 0);
  },
  lamp(g) {
    put(g, mesh(new THREE.CylinderGeometry(0.16, 0.18, 0.1, 24), mat.chrome), 0, 0.16, 0, Math.PI / 2, 0, 0);
    put(g, mesh(new THREE.SphereGeometry(0.14, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2), mat.glass), 0, 0.16, 0.04);
    put(g, mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.02, 12), mat.alum), 0, 0.16, 0.02, Math.PI / 2, 0, 0);
  },
  taillamp(g) {
    put(g, mesh(new THREE.BoxGeometry(0.36, 0.16, 0.08), mat.chrome), 0, 0.12, 0);
    put(g, mesh(new THREE.BoxGeometry(0.3, 0.12, 0.02), mat.red), 0, 0.12, 0.045);
  },
  horn(g) {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.08, 0),
      new THREE.Vector3(0.12, 0.1, 0.08),
      new THREE.Vector3(0.18, 0.16, -0.02),
      new THREE.Vector3(0.08, 0.2, -0.1),
    ]);
    g.add(mesh(new THREE.TubeGeometry(curve, 24, 0.035, 8, false), mat.black));
    put(g, mesh(new THREE.CylinderGeometry(0.06, 0.08, 0.05, 16), mat.steel), 0.02, 0.08, 0);
  },
  fan(g) {
    put(g, mesh(new THREE.TorusGeometry(0.22, 0.02, 8, 24), mat.black), 0, 0.24, 0);
    put(g, cyl(0.05, 0.06, mat.dark), 0, 0.24, 0, Math.PI / 2, 0, 0);
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2;
      const b = mesh(new THREE.BoxGeometry(0.16, 0.045, 0.012), mat.black);
      b.position.set(Math.cos(a) * 0.1, 0.24 + Math.sin(a) * 0.1, 0);
      b.rotation.z = a;
      g.add(b);
    }
  },
  tire(g) {
    put(g, mesh(new THREE.TorusGeometry(0.34, 0.11, 16, 28), mat.rubber), 0, 0.34, 0);
    put(g, mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.08, 24), mat.steel), 0, 0.34, 0, Math.PI / 2, 0, 0);
    put(g, mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.1, 16), mat.dark), 0, 0.34, 0, Math.PI / 2, 0, 0);
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2;
      put(g, cyl(0.016, 0.05, mat.chrome), Math.cos(a) * 0.13, 0.34 + Math.sin(a) * 0.13, 0, Math.PI / 2, 0, 0);
    }
  },
  plate(g) {
    put(g, mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.08, 24), mat.alum), 0, 0.08, 0);
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2 - 0.2;
      put(g, cyl(0.012, 0.12, mat.chrome), Math.cos(a) * 0.14, 0.12, Math.sin(a) * 0.14);
    }
  },
  hose(g) {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.35, 0.08, 0),
      new THREE.Vector3(-0.1, 0.22, 0.08),
      new THREE.Vector3(0.15, 0.16, -0.06),
      new THREE.Vector3(0.36, 0.1, 0),
    ]);
    g.add(mesh(new THREE.TubeGeometry(curve, 32, 0.028, 8, false), mat.black));
    put(g, mesh(new THREE.CylinderGeometry(0.04, 0.045, 0.07, 6), mat.brass), -0.35, 0.08, 0, 0, 0, Math.PI / 2);
    put(g, mesh(new THREE.CylinderGeometry(0.04, 0.045, 0.07, 6), mat.brass), 0.36, 0.1, 0, 0, 0, Math.PI / 3);
  },
  cyl(g) {
    put(g, cyl(0.05, 0.16, mat.alum), 0, 0.1, 0, 0, 0, Math.PI / 2);
    put(g, cyl(0.012, 0.1, mat.chrome), 0, 0.16, 0.06);
    put(g, cyl(0.012, 0.1, mat.chrome), 0, 0.16, -0.06);
    put(g, mesh(new THREE.SphereGeometry(0.03, 10, 8), mat.boot), 0.1, 0.1, 0);
  },
  gauge(g) {
    put(g, mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.05, 24), mat.chrome), 0, 0.14, 0, Math.PI / 2, 0, 0);
    put(g, mesh(new THREE.CircleGeometry(0.11, 24), mat.black), 0, 0.14, 0.026);
    put(g, mesh(new THREE.BoxGeometry(0.06, 0.008, 0.01), mat.red), 0.02, 0.16, 0.03);
  },
  fork(g) {
    put(g, mesh(new THREE.BoxGeometry(0.36, 0.04, 0.06), mat.steel), 0, 0.1, 0);
    put(g, mesh(new THREE.BoxGeometry(0.06, 0.12, 0.05), mat.steel), 0.18, 0.14, 0.06);
    put(g, mesh(new THREE.BoxGeometry(0.06, 0.12, 0.05), mat.steel), 0.18, 0.14, -0.06);
    put(g, mesh(new THREE.SphereGeometry(0.035, 12, 10), mat.chrome), -0.16, 0.1, 0);
  },
  clutch(g) {
    put(g, mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.04, 24), mat.steel), 0, 0.08, 0);
    put(g, mesh(new THREE.TorusGeometry(0.14, 0.02, 8, 20), mat.dark), 0, 0.1, 0, Math.PI / 2, 0, 0);
    put(g, cyl(0.04, 0.06, mat.alum), 0, 0.1, 0);
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      put(g, cyl(0.012, 0.03, mat.dark), Math.cos(a) * 0.16, 0.11, Math.sin(a) * 0.16);
    }
  },
  belt(g) {
    put(g, mesh(new THREE.TorusGeometry(0.16, 0.025, 8, 20), mat.rubber), -0.12, 0.2, 0);
    put(g, mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.04, 20), mat.steel), -0.12, 0.2, 0);
    put(g, mesh(new THREE.TorusGeometry(0.1, 0.022, 8, 18), mat.rubber), 0.22, 0.16, 0);
    put(g, mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.04, 16), mat.steel), 0.22, 0.16, 0);
  },
  seal(g) {
    put(g, mesh(new THREE.TorusGeometry(0.12, 0.035, 10, 24), mat.rubber), 0, 0.08, 0, Math.PI / 2, 0, 0);
    put(g, mesh(new THREE.TorusGeometry(0.08, 0.012, 8, 20), mat.steel), 0, 0.08, 0, Math.PI / 2, 0, 0);
  },
  fitting(g) {
    put(g, mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.06, 6), mat.brass), -0.08, 0.1, 0, 0, 0, Math.PI / 2);
    put(g, cyl(0.028, 0.16, mat.brass), 0.04, 0.1, 0, 0, 0, Math.PI / 2);
    put(g, mesh(new THREE.SphereGeometry(0.035, 12, 10), mat.alum), 0.14, 0.1, 0);
  },
  tube(g) {
    put(g, cyl(0.03, 0.7, mat.steel), 0, 0.16, 0.08, 0, 0, Math.PI / 2);
    put(g, cyl(0.022, 0.62, mat.dark), 0, 0.1, -0.04, 0, 0, Math.PI / 2);
    put(g, mesh(new THREE.BoxGeometry(0.5, 0.01, 0.28), mat.alum), 0, 0.04, 0);
  },
  bolts(g) {
    for (let i = 0; i < 3; i++) {
      put(g, cyl(0.018, 0.16, mat.steel), -0.1 + i * 0.1, 0.1, 0);
      put(g, mesh(new THREE.CylinderGeometry(0.032, 0.032, 0.02, 6), mat.steel), -0.1 + i * 0.1, 0.18, 0);
    }
  },
  steel(g) {
    put(g, mesh(new THREE.BoxGeometry(0.08, 0.5, 0.08), mat.steel), -0.12, 0.28, 0);
    put(g, mesh(new THREE.BoxGeometry(0.06, 0.5, 0.06), mat.dark), 0.02, 0.28, 0);
    put(g, mesh(new THREE.BoxGeometry(0.28, 0.04, 0.28), mat.alum), 0.08, 0.04, 0);
  },
  paint(g) {
    put(g, mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.22, 20), mat.black), 0, 0.16, 0);
    put(g, cyl(0.04, 0.04, mat.steel), 0, 0.28, 0);
    put(g, mesh(new THREE.BoxGeometry(0.12, 0.08, 0.01), mat.paint), 0, 0.16, 0.1);
  },
  spool(g) {
    put(g, mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.08, 24), mat.brass), 0, 0.12, 0, 0, 0, Math.PI / 2);
    put(g, mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.12, 16), mat.dark), 0, 0.12, 0, 0, 0, Math.PI / 2);
    put(g, mesh(new THREE.TorusGeometry(0.12, 0.012, 6, 16), mat.steel), 0, 0.12, 0);
  },
  bend(g) {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.3, 0.06, 0),
      new THREE.Vector3(0, 0.06, 0),
      new THREE.Vector3(0.16, 0.1, 0),
      new THREE.Vector3(0.22, 0.32, 0),
    ]);
    g.add(mesh(new THREE.TubeGeometry(curve, 28, 0.04, 10, false), mat.steel));
  },
  pipes(g) {
    put(g, cyl(0.08, 0.55, mat.chrome), 0, 0.12, 0, 0, 0, Math.PI / 2);
    put(g, mesh(new THREE.CylinderGeometry(0.09, 0.07, 0.08, 16), mat.dark), -0.28, 0.12, 0, 0, 0, Math.PI / 2);
    put(g, mesh(new THREE.CylinderGeometry(0.07, 0.09, 0.08, 16), mat.chrome), 0.28, 0.12, 0, 0, 0, Math.PI / 2);
  },
  strap(g) {
    put(g, mesh(new THREE.BoxGeometry(0.55, 0.035, 0.08), mat.leather), 0, 0.08, 0);
    put(g, mesh(new THREE.BoxGeometry(0.08, 0.05, 0.1), mat.brass), 0.05, 0.09, 0);
    put(g, mesh(new THREE.TorusGeometry(0.03, 0.008, 6, 10), mat.steel), -0.2, 0.1, 0);
  },
  glass(g) {
    const shape = new THREE.Shape();
    shape.moveTo(-0.42, 0);
    shape.lineTo(-0.34, 0.28);
    shape.lineTo(0.4, 0.3);
    shape.lineTo(0.46, 0);
    const pane = mesh(new THREE.ExtrudeGeometry(shape, { depth: 0.015, bevelEnabled: false }), mat.glass);
    pane.position.y = 0.02;
    g.add(pane);
    put(g, mesh(new THREE.BoxGeometry(0.92, 0.02, 0.03), mat.alum), 0.02, 0.02, 0.01);
  },
  body(g) {
    put(g, mesh(new THREE.SphereGeometry(0.22, 18, 12, 0, Math.PI), mat.paint), -0.28, 0.16, 0, 0, Math.PI / 2, 0);
    put(g, mesh(new THREE.BoxGeometry(0.46, 0.16, 0.36), mat.paint), 0.05, 0.14, 0);
    put(g, mesh(new THREE.BoxGeometry(0.16, 0.1, 0.28), mat.paint), -0.02, 0.24, 0);
    put(g, mesh(new THREE.BoxGeometry(0.18, 0.14, 0.01), mat.glass), 0.08, 0.28, 0);
    put(g, mesh(new THREE.TorusGeometry(0.12, 0.025, 8, 16, Math.PI), mat.paint), -0.1, 0.08, 0.16, 0, 0, Math.PI);
    put(g, mesh(new THREE.TorusGeometry(0.12, 0.025, 8, 16, Math.PI), mat.paint), 0.28, 0.08, 0.16, 0, 0, Math.PI);
  },
  sheet(g) {
    put(g, mesh(new THREE.BoxGeometry(0.5, 0.02, 0.36), mat.alum), 0, 0.02, 0);
    const colors = [mat.red, mat.poly, mat.black, mat.cool];
    colors.forEach((c, i) => {
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.18, 0.04, -0.1 + i * 0.06),
        new THREE.Vector3(0, 0.08, -0.04 + i * 0.03),
        new THREE.Vector3(0.18, 0.04, 0.08 - i * 0.04),
      ]);
      g.add(mesh(new THREE.TubeGeometry(curve, 12, 0.008, 5, false), c));
    });
  },
  mystery(g) {
    put(g, mesh(new THREE.BoxGeometry(0.28, 0.2, 0.22), mat.leather), 0, 0.12, 0);
    put(g, mesh(new THREE.BoxGeometry(0.16, 0.06, 0.01), mat.alum), 0, 0.14, 0.11);
  },
};

function jug(g, liquid) {
  put(g, mesh(new THREE.CylinderGeometry(0.09, 0.1, 0.26, 16), liquid), 0, 0.16, 0);
  put(g, cyl(0.035, 0.05, mat.black), 0, 0.3, 0);
  put(g, mesh(new THREE.BoxGeometry(0.06, 0.08, 0.01), mat.alum), 0, 0.16, 0.1);
}

function buildKind(kind) {
  const g = new THREE.Group();
  if (kind.startsWith("jug-")) {
    const liquid = { oil: mat.oil, atf: mat.atf, cool: mat.cool, brake: mat.brake, clutch: mat.clutch }[kind.slice(4)] || mat.oil;
    jug(g, liquid);
  } else if (BUILD[kind]) {
    BUILD[kind](g);
  } else {
    BUILD.sheet(g);
  }
  return g;
}

function seat(obj) {
  const box = new THREE.Box3().setFromObject(obj);
  const center = box.getCenter(new THREE.Vector3());
  obj.position.x -= center.x;
  obj.position.z -= center.z;
  obj.position.y -= box.min.y;
  const size = new THREE.Box3().setFromObject(obj).getSize(new THREE.Vector3());
  return size;
}

function frameCamera(camera, size) {
  const maxDim = Math.max(size.x, size.y, size.z, 0.2);
  const dist = (maxDim / (2 * Math.tan((camera.fov * Math.PI) / 360))) * 1.45;
  camera.position.set(dist * 0.35, size.y * 0.4 + dist * 0.42, dist * 1.2);
  camera.lookAt(0, size.y * 0.45, 0);
}

function studio(scene) {
  scene.background = new THREE.Color(0x141914);
  scene.add(new THREE.AmbientLight(0xffffff, 0.72));
  const key = new THREE.DirectionalLight(0xfff6ea, 2.4);
  key.position.set(4, 6, 3);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xb9c6d6, 0.7);
  fill.position.set(-4, 2, -2);
  scene.add(fill);
  const rim = new THREE.DirectionalLight(0xffffff, 0.9);
  rim.position.set(-1, 3, -5);
  scene.add(rim);
  const floor = new THREE.Mesh(
    new THREE.CircleGeometry(1.2, 40),
    new THREE.MeshStandardMaterial({ color: 0x101410, roughness: 1, metalness: 0 })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -0.001;
  scene.add(floor);
}

let photos = null;
let viewer = null;

export function partPhoto(kind) {
  return photos ? photos[kind] : "";
}

export async function ensurePartPhotos() {
  if (photos) return photos;
  const kinds = [
    "bush", "heim", "ball", "tierod", "arm", "coil", "bar", "master", "rad", "engine", "slave", "box", "shaft",
    "jug-oil", "jug-atf", "jug-cool", "jug-brake", "jug-clutch",
    "fuse", "strip", "lamp", "taillamp", "horn", "fan", "tire", "plate", "hose", "cyl", "gauge", "fork",
    "clutch", "belt", "seal", "fitting", "tube", "bolts", "steel", "paint", "spool", "bend", "pipes",
    "strap", "glass", "body", "sheet", "mystery",
  ];
  const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true, alpha: false });
  renderer.setSize(520, 340, false);
  renderer.setPixelRatio(1);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  const scene = new THREE.Scene();
  studio(scene);
  const camera = new THREE.PerspectiveCamera(32, 520 / 340, 0.02, 40);
  photos = {};
  for (const kind of kinds) {
    const obj = buildKind(kind);
    const size = seat(obj);
    frameCamera(camera, size);
    scene.add(obj);
    renderer.render(scene, camera);
    photos[kind] = renderer.domElement.toDataURL("image/jpeg", 0.88);
    scene.remove(obj);
    obj.traverse((o) => o.geometry && o.geometry.dispose());
  }
  renderer.dispose();
  window.PART_PHOTOS = photos;
  return photos;
}

export function openPartViewer(canvas, kind) {
  closePartViewer();
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
  renderer.setSize(canvas.clientWidth || 640, canvas.clientHeight || 420, false);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  const scene = new THREE.Scene();
  studio(scene);
  const obj = buildKind(kind);
  const size = seat(obj);
  scene.add(obj);
  const camera = new THREE.PerspectiveCamera(32, (canvas.clientWidth || 640) / (canvas.clientHeight || 420), 0.02, 40);
  frameCamera(camera, size);
  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, size.y * 0.45, 0);
  controls.enableDamping = true;
  controls.update();
  let running = true;
  const tick = () => {
    if (!running) return;
    controls.update();
    renderer.render(scene, camera);
    viewer.frame = requestAnimationFrame(tick);
  };
  viewer = { renderer, scene, obj, controls, running: true, frame: 0, stop() { running = false; } };
  tick();
}

export function closePartViewer() {
  if (!viewer) return;
  viewer.stop();
  cancelAnimationFrame(viewer.frame);
  viewer.controls.dispose();
  viewer.obj.traverse((o) => o.geometry && o.geometry.dispose());
  viewer.renderer.dispose();
  viewer = null;
}
