import * as THREE from 'three';

// ─────────────────────────────────────────────────────────────────────────────
// Geometry Helpers
// ─────────────────────────────────────────────────────────────────────────────

function petalShape(length: number, width: number): THREE.Shape {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.bezierCurveTo(width * 0.65, length * 0.12, width * 0.85, length * 0.58, 0, length);
  shape.bezierCurveTo(-width * 0.85, length * 0.58, -width * 0.65, length * 0.12, 0, 0);
  return shape;
}

function addWindData(obj: THREE.Object3D, speedMult = 1.0) {
  obj.userData.windPhase = Math.random() * Math.PI * 2;
  obj.userData.windSpeed = (0.7 + Math.random() * 0.6) * speedMult;
}

// ─────────────────────────────────────────────────────────────────────────────
// Stem builder
// ─────────────────────────────────────────────────────────────────────────────

function makeStem(
  root: THREE.Group,
  from: THREE.Vector3,
  to: THREE.Vector3,
  color = 0x4a7c59,
  r = 0.024
) {
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i <= 14; i++) {
    const t = i / 14;
    const v = new THREE.Vector3().lerpVectors(from, to, t);
    v.x += Math.sin(t * Math.PI) * 0.06 * (Math.random() - 0.5) * 2;
    v.z += Math.cos(t * Math.PI * 0.8) * 0.04 * (Math.random() - 0.5) * 2;
    pts.push(v);
  }
  const geo = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 16, r, 6, false);
  const mat = new THREE.MeshPhongMaterial({ color, shininess: 18 });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.castShadow = true;
  root.add(mesh);
}

// ─────────────────────────────────────────────────────────────────────────────
// Leaf builder
// ─────────────────────────────────────────────────────────────────────────────

function makeLeaf(
  root: THREE.Group,
  pos: THREE.Vector3,
  rotY: number,
  scale = 1.0,
  color = 0x388e3c
) {
  const shape = new THREE.Shape();
  const l = 0.38 * scale, w = 0.14 * scale;
  shape.moveTo(0, 0);
  shape.quadraticCurveTo(w, l * 0.4, 0, l);
  shape.quadraticCurveTo(-w, l * 0.4, 0, 0);

  const geo = new THREE.ExtrudeGeometry(shape, { depth: 0.005 * scale, bevelEnabled: false, curveSegments: 8 });
  const mat = new THREE.MeshPhongMaterial({ color, shininess: 35, side: THREE.DoubleSide });
  const leaf = new THREE.Mesh(geo, mat);
  leaf.position.copy(pos);
  leaf.rotation.x = -Math.PI / 2;
  leaf.rotation.z = rotY;
  leaf.rotateOnAxis(new THREE.Vector3(Math.cos(rotY), 0, Math.sin(rotY)), 0.62);
  leaf.castShadow = true;
  addWindData(leaf, 0.9);
  root.add(leaf);
  return leaf;
}

// ─────────────────────────────────────────────────────────────────────────────
// Rose builder — layered petals, full 3D volume
// ─────────────────────────────────────────────────────────────────────────────

function makeRose(
  root: THREE.Group,
  outerColor: number,
  innerColor: number,
  pos: THREE.Vector3,
  scale = 1.0,
  numOuterPetals = 20
): THREE.Group {
  const g = new THREE.Group();
  g.position.copy(pos);

  const layers = [
    { n: 5,  radius: 0.00, tilt: 0.45, pL: 0.36, pW: 0.12, yBase: 0.00 },
    { n: 7,  radius: 0.14, tilt: 0.70, pL: 0.44, pW: 0.16, yBase: 0.03 },
    { n: 9,  radius: 0.28, tilt: 0.88, pL: 0.52, pW: 0.19, yBase: 0.08 },
    { n: Math.min(numOuterPetals - 21, 11) + 11,
      radius: 0.42, tilt: 1.10, pL: 0.60, pW: 0.22, yBase: 0.14 },
  ];

  layers.forEach(({ n, radius, tilt, pL, pW, yBase }, li) => {
    const t = li / (layers.length - 1);
    const col = new THREE.Color(outerColor).lerp(new THREE.Color(innerColor), 1 - t);

    for (let i = 0; i < n; i++) {
      const angle = (i / n) * Math.PI * 2 + li * 0.22;
      const shape = petalShape(pL * scale, pW * scale);
      const geo = new THREE.ExtrudeGeometry(shape, {
        depth: 0.007 * scale,
        bevelEnabled: true,
        bevelThickness: 0.003 * scale,
        bevelSize: 0.004 * scale,
        bevelSegments: 3,
        curveSegments: 12,
      });
      const mat = new THREE.MeshPhongMaterial({
        color: col,
        shininess: 62,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.95,
      });

      const petal = new THREE.Mesh(geo, mat);
      petal.rotation.x = -Math.PI / 2;
      petal.rotation.z = angle;
      const rx = Math.cos(angle) * radius * scale;
      const rz = Math.sin(angle) * radius * scale;
      petal.position.set(rx, yBase * scale, rz);
      petal.rotation.y = -angle;
      petal.rotateOnAxis(
        new THREE.Vector3(Math.cos(angle + Math.PI / 2), 0, Math.sin(angle + Math.PI / 2)),
        tilt
      );
      petal.castShadow = true;
      addWindData(petal, 0.5 + li * 0.15);
      g.add(petal);
    }
  });

  // Stigma sphere
  const cg = new THREE.SphereGeometry(0.07 * scale, 10, 10);
  g.add(new THREE.Mesh(cg, new THREE.MeshPhongMaterial({ color: 0xfdd835, shininess: 75 })));

  addWindData(g, 0.65);
  root.add(g);
  return g;
}

// ─────────────────────────────────────────────────────────────────────────────
// Tulip builder — cupped 6-petal chalice shape
// ─────────────────────────────────────────────────────────────────────────────

function makeTulip(
  root: THREE.Group,
  color: number,
  pos: THREE.Vector3,
  scale = 1.0
): THREE.Group {
  const g = new THREE.Group();
  g.position.copy(pos);

  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2;
    const shape = new THREE.Shape();
    const w = 0.21 * scale, h = 0.52 * scale;
    shape.moveTo(0, 0);
    shape.bezierCurveTo(w * 0.9, h * 0.22, w, h * 0.62, 0, h);
    shape.bezierCurveTo(-w, h * 0.62, -w * 0.9, h * 0.22, 0, 0);

    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.009 * scale,
      bevelEnabled: true,
      bevelThickness: 0.004 * scale,
      bevelSize: 0.003 * scale,
      bevelSegments: 3,
      curveSegments: 12,
    });
    const mat = new THREE.MeshPhongMaterial({ color, shininess: 68, side: THREE.DoubleSide });
    const petal = new THREE.Mesh(geo, mat);
    petal.rotation.x = -Math.PI / 2;
    petal.rotation.z = angle;
    petal.position.set(Math.cos(angle) * 0.17 * scale, 0, Math.sin(angle) * 0.17 * scale);
    petal.rotation.y = -angle;
    petal.rotateOnAxis(
      new THREE.Vector3(Math.cos(angle + Math.PI / 2), 0, Math.sin(angle + Math.PI / 2)),
      0.52
    );
    petal.castShadow = true;
    addWindData(petal, 0.7);
    g.add(petal);
  }

  // Stamen column
  const sGeo = new THREE.CylinderGeometry(0.008 * scale, 0.008 * scale, 0.28 * scale, 6);
  g.add(new THREE.Mesh(sGeo, new THREE.MeshPhongMaterial({ color: 0xf9a825, shininess: 80 })));

  addWindData(g, 0.75);
  root.add(g);
  return g;
}

// ─────────────────────────────────────────────────────────────────────────────
// Daisy builder
// ─────────────────────────────────────────────────────────────────────────────

function makeDaisy(
  root: THREE.Group,
  pos: THREE.Vector3,
  scale = 1.0
): THREE.Group {
  const g = new THREE.Group();
  g.position.copy(pos);

  const pCount = 18;
  for (let i = 0; i < pCount; i++) {
    const angle = (i / pCount) * Math.PI * 2;
    const shape = petalShape(0.42 * scale, 0.10 * scale);
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.005 * scale, bevelEnabled: false, curveSegments: 8,
    });
    const mat = new THREE.MeshPhongMaterial({ color: 0xfff9e7, shininess: 28, side: THREE.DoubleSide });
    const petal = new THREE.Mesh(geo, mat);
    petal.rotation.x = -Math.PI / 2;
    petal.rotation.z = angle;
    petal.position.set(Math.cos(angle) * 0.11 * scale, 0, Math.sin(angle) * 0.11 * scale);
    petal.rotation.y = -angle;
    petal.rotateOnAxis(
      new THREE.Vector3(Math.cos(angle + Math.PI / 2), 0, Math.sin(angle + Math.PI / 2)),
      0.32
    );
    addWindData(petal, 1.1);
    g.add(petal);
  }

  // Yellow disc centre
  const cg = new THREE.CylinderGeometry(0.13 * scale, 0.11 * scale, 0.07 * scale, 14);
  g.add(new THREE.Mesh(cg, new THREE.MeshPhongMaterial({ color: 0xfdd835, shininess: 48 })));

  addWindData(g, 1.1);
  root.add(g);
  return g;
}

// ─────────────────────────────────────────────────────────────────────────────
// Hydrangea cluster
// ─────────────────────────────────────────────────────────────────────────────

function makeHydrangea(
  root: THREE.Group,
  color: number,
  pos: THREE.Vector3,
  scale = 1.0
): THREE.Group {
  const g = new THREE.Group();
  g.position.copy(pos);

  for (let i = 0; i < 34; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI * 0.75;
    const r = (0.04 + Math.random() * 0.30) * scale;
    const floret = new THREE.Group();
    floret.position.set(
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.cos(phi) * 0.65,
      r * Math.sin(phi) * Math.sin(theta)
    );
    addWindData(floret, 0.6);

    for (let p = 0; p < 4; p++) {
      const pa = (p / 4) * Math.PI * 2;
      const pg = new THREE.PlaneGeometry(0.088 * scale, 0.10 * scale);
      const pm = new THREE.MeshPhongMaterial({ color, shininess: 42, side: THREE.DoubleSide });
      const petal = new THREE.Mesh(pg, pm);
      petal.rotation.y = pa;
      petal.position.x = Math.cos(pa) * 0.055 * scale;
      petal.position.z = Math.sin(pa) * 0.055 * scale;
      petal.rotation.x = -0.38;
      floret.add(petal);
    }

    const cg = new THREE.SphereGeometry(0.016 * scale, 6, 6);
    floret.add(new THREE.Mesh(cg, new THREE.MeshPhongMaterial({ color: 0xfff176 })));
    g.add(floret);
  }

  addWindData(g, 0.62);
  root.add(g);
  return g;
}

// ─────────────────────────────────────────────────────────────────────────────
// Baby's breath
// ─────────────────────────────────────────────────────────────────────────────

function makeBabysBreath(
  root: THREE.Group,
  pos: THREE.Vector3,
  scale = 1.0
): THREE.Group {
  const g = new THREE.Group();
  g.position.copy(pos);

  for (let i = 0; i < 20; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI * 0.85;
    const r = (0.12 + Math.random() * 0.32) * scale;
    const geo = new THREE.SphereGeometry((0.022 + Math.random() * 0.028) * scale, 6, 6);
    const mat = new THREE.MeshPhongMaterial({ color: 0xffffff, shininess: 38 });
    const sphere = new THREE.Mesh(geo, mat);
    sphere.position.set(
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.cos(phi) * 0.75,
      r * Math.sin(phi) * Math.sin(theta)
    );
    addWindData(sphere, 1.6);
    sphere.castShadow = true;
    g.add(sphere);
  }

  addWindData(g, 1.45);
  root.add(g);
  return g;
}

// ─────────────────────────────────────────────────────────────────────────────
// Kraft paper + ribbon wrapping
// ─────────────────────────────────────────────────────────────────────────────

function makeWrapping(root: THREE.Group, scale = 1.0) {
  // Paper wrap cone
  const wrapGeo = new THREE.ConeGeometry(0.70 * scale, 1.35 * scale, 14, 4, true);
  const wrapMat = new THREE.MeshPhongMaterial({
    color: 0xcfaa82, shininess: 10, side: THREE.DoubleSide, transparent: true, opacity: 0.80,
  });
  const wrap = new THREE.Mesh(wrapGeo, wrapMat);
  wrap.position.y = -0.52 * scale;
  root.add(wrap);

  // Inner cream liner
  const innerGeo = new THREE.ConeGeometry(0.64 * scale, 1.28 * scale, 14, 3, true);
  const innerMat = new THREE.MeshPhongMaterial({
    color: 0xf5ead4, shininess: 5, side: THREE.BackSide, transparent: true, opacity: 0.65,
  });
  const inner = new THREE.Mesh(innerGeo, innerMat);
  inner.position.y = -0.52 * scale;
  root.add(inner);

  // Pink ribbon ring
  const rGeo = new THREE.TorusGeometry(0.26 * scale, 0.023 * scale, 8, 32);
  const rMat = new THREE.MeshPhongMaterial({ color: 0xf48fb1, shininess: 82 });
  const ribbon = new THREE.Mesh(rGeo, rMat);
  ribbon.position.y = -0.38 * scale;
  ribbon.rotation.x = Math.PI / 2;
  root.add(ribbon);

  // Two bow loops
  [-1, 1].forEach((side) => {
    const bGeo = new THREE.TorusGeometry(0.09 * scale, 0.020 * scale, 6, 18);
    const bow = new THREE.Mesh(bGeo, rMat);
    bow.position.set(side * 0.14 * scale, -0.34 * scale, 0);
    bow.rotation.z = side * 0.42;
    root.add(bow);
  });

  // Hanging tag
  const tagGeo = new THREE.PlaneGeometry(0.24 * scale, 0.16 * scale);
  const tagMat = new THREE.MeshPhongMaterial({ color: 0xd4b896, shininess: 14 });
  const tag = new THREE.Mesh(tagGeo, tagMat);
  tag.position.set(0.30 * scale, -0.50 * scale, 0.04 * scale);
  tag.rotation.z = -0.22;
  root.add(tag);
}

// ─────────────────────────────────────────────────────────────────────────────
// Public types & main builder export
// ─────────────────────────────────────────────────────────────────────────────

export interface FlowerRef {
  group: THREE.Group;
  flowerId: number;
  name: string;
}

export function buildFullBouquet(root: THREE.Group): FlowerRef[] {
  const refs: FlowerRef[] = [];

  const reg = (g: THREE.Group, id: number, name: string) => {
    refs.push({ group: g, flowerId: id, name });
  };

  // ── Stems (structural base, no wind) ────────────────────────────────────
  const sv = [
    [new THREE.Vector3(0,    -1.28, 0),    new THREE.Vector3(0.04,  0.22, 0.10),  0x4a7c59, 0.031],
    [new THREE.Vector3(-0.36,-1.22, 0.1),  new THREE.Vector3(-0.41, 0.34, 0.06),  0x4a7c59, 0.026],
    [new THREE.Vector3(0.46, -1.24,-0.04), new THREE.Vector3(0.49,  0.26,-0.12),  0x4a7c59, 0.025],
    [new THREE.Vector3(0.12, -1.28,-0.10), new THREE.Vector3(0.16,  0.68,-0.22),  0x507852, 0.027],
    [new THREE.Vector3(-0.20,-1.10, 0.20), new THREE.Vector3(-0.30, 0.56, 0.32),  0x7cb87e, 0.017],
    [new THREE.Vector3(0.26, -1.02, 0.14), new THREE.Vector3(0.34,  0.50, 0.30),  0x7cb87e, 0.016],
    [new THREE.Vector3(-0.15,-1.14,-0.08), new THREE.Vector3(-0.18, 0.18, 0.22),  0x5a8a62, 0.021],
    [new THREE.Vector3(0.23, -1.20, 0.08), new THREE.Vector3(0.36,  0.42, 0.12),  0x4a7c59, 0.029],
  ] as const;
  sv.forEach(([f, t, c, r]) => makeStem(root, f as THREE.Vector3, t as THREE.Vector3, c as number, r as number));

  // ── Leaves ───────────────────────────────────────────────────────────────
  makeLeaf(root, new THREE.Vector3(-0.28,-0.22, 0.14), 0.80, 0.90, 0x2e7d32);
  makeLeaf(root, new THREE.Vector3( 0.33,-0.30,-0.10),-0.50, 0.82, 0x388e3c);
  makeLeaf(root, new THREE.Vector3(-0.05, 0.10, 0.22), 1.20, 0.74, 0x2e7d32);
  makeLeaf(root, new THREE.Vector3( 0.20, 0.00,-0.18),-1.00, 0.86, 0x43a047);
  makeLeaf(root, new THREE.Vector3(-0.36, 0.18,-0.06), 2.20, 0.88, 0x2e7d32);
  makeLeaf(root, new THREE.Vector3( 0.42, 0.20, 0.12),-0.20, 0.80, 0x388e3c);
  makeLeaf(root, new THREE.Vector3( 0.08, 0.32, 0.18), 0.40, 0.70, 0x43a047);
  makeLeaf(root, new THREE.Vector3(-0.22, 0.40,-0.15), 1.80, 0.78, 0x558b2f);

  // ── Flowers ───────────────────────────────────────────────────────────────

  // 1 — Centre Pink Garden Rose (My Peace)
  reg(makeRose(root, 0xe87e96, 0xf5a0b5, new THREE.Vector3(0.00, 0.20, 0.12), 0.96), 10, 'My Peace');

  // 2 — Upper-back Deep Rose (My Happiness)
  reg(makeRose(root, 0xd46480, 0xee9faa, new THREE.Vector3(0.12, 0.64,-0.18), 0.80), 1, 'My Happiness');

  // 3 — Left Blush Rose (You Always)
  reg(makeRose(root, 0xf4aec0, 0xffdce4, new THREE.Vector3(-0.46, 0.36, 0.10), 0.78), 11, 'You, Always');

  // 4 — Right Burgundy Rose (My Strength)
  reg(makeRose(root, 0xc0395a, 0xde6278, new THREE.Vector3(0.52, 0.30,-0.08), 0.72, 18), 2, 'My Strength');

  // 5 — Left Pink Tulip (My Favourite Conversations)
  reg(makeTulip(root, 0xe892a0, new THREE.Vector3(-0.40, 0.34, 0.08), 0.82), 4, 'My Favourite Conversations');

  // 6 — Right Pink Tulip (My Today & Tomorrow)
  reg(makeTulip(root, 0xf2b5c2, new THREE.Vector3( 0.50, 0.28, 0.06), 0.76), 7, 'My Today and Tomorrow');

  // 7 — Back White Lily / Tulip bud (My Safe Place)
  reg(makeTulip(root, 0xfff8f6, new THREE.Vector3( 0.14, 0.66,-0.22), 0.86), 3, 'My Safe Place');

  // 8 — White Daisy (Our Laughs)
  reg(makeDaisy(root, new THREE.Vector3(-0.17, 0.17, 0.22), 0.72), 6, 'Our Laughs');

  // 9 — Daisy #2 (My Little Habits)
  reg(makeDaisy(root, new THREE.Vector3( 0.30, 0.10, 0.24), 0.64), 5, 'My Little Habits');

  // 10 — Blue Hydrangea cluster (My Inspiration)
  reg(makeHydrangea(root, 0x9fa8d5, new THREE.Vector3( 0.36, 0.40, 0.12), 0.74), 8, 'My Inspiration');

  // 11 — Baby's breath left (Our Beginning)
  reg(makeBabysBreath(root, new THREE.Vector3(-0.30, 0.54, 0.28), 0.74), 9, 'Our Beginning');

  // 12 — Baby's breath right (29 Sept ♡)
  reg(makeBabysBreath(root, new THREE.Vector3( 0.32, 0.48, 0.28), 0.68), 12, '29 Sept ♡');

  // ── Wrapping ──────────────────────────────────────────────────────────────
  makeWrapping(root);

  return refs;
}

// ─────────────────────────────────────────────────────────────────────────────
// Per-frame wind animation
// ─────────────────────────────────────────────────────────────────────────────

export function animateWind(
  root: THREE.Group,
  time: number,
  strength: number,   // 0 = calm, 1 = full breeze
  dirX: number,       // -1 to 1
  dirZ: number
) {
  root.traverse((obj) => {
    const ud = obj.userData;
    if (!ud.windPhase && ud.windPhase !== 0) return;

    const phase  = ud.windPhase;
    const speed  = ud.windSpeed ?? 1.0;
    const amp    = strength * speed;

    if (obj.parent === root || !(obj instanceof THREE.Mesh)) {
      // Group-level: stem-sway the whole flower group
      if (obj instanceof THREE.Group && obj !== root) {
        // Gentle idle sway even at 0 wind
        const idleX = Math.sin(time * speed * 0.8 + phase) * 0.012;
        const idleZ = Math.cos(time * speed * 0.6 + phase + 1.2) * 0.008;

        // Breeze response
        const breezeX = Math.sin(time * speed * 2.2 + phase) * amp * 0.10 * dirZ;
        const breezeZ = Math.cos(time * speed * 1.8 + phase) * amp * 0.08 * dirX;

        obj.rotation.x = idleX + breezeX;
        obj.rotation.z = idleZ + breezeZ;
      }
    } else if (obj instanceof THREE.Mesh) {
      // Mesh-level: individual petal micro-flutter
      const flutterAmp = amp * 0.018 * speed;
      const flutter = Math.sin(time * 4.5 * speed + phase) * flutterAmp;
      // Only add to rotation, don't stomp base values
      obj.rotation.x += flutter * 0.7;
      obj.rotation.z += flutter * 0.4;
    }
  });
}
