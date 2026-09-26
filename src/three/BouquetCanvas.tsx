import React, { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { buildFullBouquet, animateWind, FlowerRef } from './bouquetBuilder';

export interface BouquetCanvasProps {
  /** 0–1: 0 = calm, 1 = full breeze */
  windStrength: number;
  /** Wind direction x component (from device tilt or breeze button) */
  windDirX: number;
  /** Wind direction z component */
  windDirZ: number;
  /** Called when user taps/clicks a flower, with that flower's data-id */
  onFlowerClick: (flowerId: number) => void;
  /** IDs that have already been discovered (for glow styling) */
  openedFlowerIds: number[];
  /** Is site in full wind breeze mode? */
  isBreezing: boolean;
}

export const BouquetCanvas: React.FC<BouquetCanvasProps> = ({
  windStrength,
  windDirX,
  windDirZ,
  onFlowerClick,
  openedFlowerIds,
  isBreezing,
}) => {
  const mountRef   = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameRef   = useRef<number>(0);
  const flowerRefs  = useRef<FlowerRef[]>([]);
  const sceneRef   = useRef<THREE.Scene | null>(null);
  const cameraRef  = useRef<THREE.PerspectiveCamera | null>(null);
  const bouquetGroupRef = useRef<THREE.Group | null>(null);
  const windRef    = useRef({ strength: 0, dirX: 0, dirZ: 0 });
  const tiltRef    = useRef({ x: 0, y: 0 });

  // Sync props to refs so animation loop sees latest values without re-mounting
  useEffect(() => {
    windRef.current = { strength: windStrength, dirX: windDirX, dirZ: windDirZ };
  }, [windStrength, windDirX, windDirZ]);

  // ── Raycaster for flower tap ─────────────────────────────────────────────

  const handleCanvasClick = useCallback((evt: MouseEvent | TouchEvent) => {
    if (!rendererRef.current || !cameraRef.current || !flowerRefs.current.length) return;

    const canvas = rendererRef.current.domElement;
    const rect   = canvas.getBoundingClientRect();

    let clientX: number, clientY: number;
    if ('touches' in evt) {
      if (!evt.changedTouches[0]) return;
      clientX = evt.changedTouches[0].clientX;
      clientY = evt.changedTouches[0].clientY;
    } else {
      clientX = evt.clientX;
      clientY = evt.clientY;
    }

    const ndcX = ((clientX - rect.left) / rect.width) * 2 - 1;
    const ndcY = -((clientY - rect.top) / rect.height) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(ndcX, ndcY), cameraRef.current);

    // Collect all meshes from flower groups
    const meshes: THREE.Mesh[] = [];
    const meshToFlowerId = new Map<THREE.Mesh, number>();

    flowerRefs.current.forEach(({ group, flowerId }) => {
      group.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          meshes.push(obj);
          meshToFlowerId.set(obj, flowerId);
        }
      });
    });

    const hits = raycaster.intersectObjects(meshes, false);
    if (hits.length > 0) {
      const hitMesh = hits[0].object as THREE.Mesh;
      const fid = meshToFlowerId.get(hitMesh);
      if (fid !== undefined) {
        onFlowerClick(fid);
      }
    }
  }, [onFlowerClick]);

  // ── Scene Setup (once on mount) ──────────────────────────────────────────

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ── Renderer ──
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x000000, 0); // transparent bg
    rendererRef.current = renderer;
    mount.appendChild(renderer.domElement);

    const updateSize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h);
      if (cameraRef.current) {
        cameraRef.current.aspect = w / h;
        cameraRef.current.updateProjectionMatrix();
      }
    };
    updateSize();

    // ── Scene ──
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // ── Camera ──
    const isMobileInit = window.innerWidth < 768;
    const camera = new THREE.PerspectiveCamera(45, mount.clientWidth / mount.clientHeight, 0.01, 40);
    camera.position.set(0, 0.08, isMobileInit ? 2.5 : 2.2);
    camera.lookAt(0, 0.05, 0);
    cameraRef.current = camera;

    // ── Lighting ──
    // Warm ambient
    scene.add(new THREE.AmbientLight(0xfff2e6, 0.65));

    // Main soft key light (top-left, warm candle)
    const key = new THREE.DirectionalLight(0xffddbb, 1.4);
    key.position.set(-1.5, 2.5, 1.8);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.near = 0.1;
    key.shadow.camera.far  = 12;
    key.shadow.camera.left = -3;
    key.shadow.camera.right = 3;
    key.shadow.camera.top  = 3;
    key.shadow.camera.bottom = -3;
    scene.add(key);

    // Rim light (right side — blue-purple shimmer)
    const rim = new THREE.DirectionalLight(0xbbaedd, 0.55);
    rim.position.set(2.5, 1.0, -1.5);
    scene.add(rim);

    // Fill from below (soft golden bounce)
    const fill = new THREE.PointLight(0xffd27f, 0.7, 5);
    fill.position.set(0, -0.8, 1.2);
    scene.add(fill);

    // Candle flicker point lights
    const candleL = new THREE.PointLight(0xff8c42, 0.8, 4);
    candleL.position.set(-1.8, -0.5, 0.8);
    scene.add(candleL);
    const candleR = new THREE.PointLight(0xff8c42, 0.6, 3.5);
    candleR.position.set(1.6, -0.3, 0.9);
    scene.add(candleR);

    // ── Build Bouquet ──
    const bouquetGroup = new THREE.Group();
    bouquetGroupRef.current = bouquetGroup;
    bouquetGroup.scale.setScalar(1.42);
    bouquetGroup.position.y = -0.15;
    scene.add(bouquetGroup);

    const refs = buildFullBouquet(bouquetGroup);
    flowerRefs.current = refs;

    // ── Soft floor plane (receives shadow) ──
    const floorGeo = new THREE.PlaneGeometry(6, 6);
    const floorMat = new THREE.MeshPhongMaterial({
      color: 0x3b1a12, shininess: 5, transparent: true, opacity: 0.0
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.55;
    floor.receiveShadow = true;
    scene.add(floor);

    // ── Fog for depth ──
    scene.fog = new THREE.FogExp2(0x1a0a12, 0.25);

    // ── Device orientation for tilt ──
    const onOrientation = (e: DeviceOrientationEvent) => {
      const gamma = e.gamma ?? 0; // left-right tilt: -90 to 90
      const beta  = e.beta  ?? 0; // fwd-back tilt: -180 to 180
      tiltRef.current.x = THREE.MathUtils.clamp(beta  / 60, -1, 1);
      tiltRef.current.y = THREE.MathUtils.clamp(gamma / 50, -1, 1);
    };
    window.addEventListener('deviceorientation', onOrientation);

    // ── Resize Observer ──
    const ro = new ResizeObserver(updateSize);
    ro.observe(mount);

    // ── Mouse hover tilt (desktop only) ──
    let mouseX = 0, mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width  - 0.5) * 2;
      mouseY = ((e.clientY - rect.top)  / rect.height - 0.5) * 2;
    };
    mount.addEventListener('mousemove', onMouseMove);

    // ── Click / Touch ──
    mount.addEventListener('click',      handleCanvasClick as EventListener);
    mount.addEventListener('touchend',   handleCanvasClick as EventListener);

    // ── Animation Loop ──
    let time = 0;
    let prevCandle = 0;

    const animate = (ts: number) => {
      frameRef.current = requestAnimationFrame(animate);
      time = ts * 0.001; // seconds

      const w = windRef.current;

      // Candle flicker
      if (time - prevCandle > 0.12) {
        prevCandle = time;
        const flicker = 0.1 * Math.random();
        candleL.intensity = 0.75 + flicker;
        candleR.intensity = 0.55 + flicker * 0.7;
      }

      // Gyro / mouse tilt of whole bouquet
      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        bouquetGroup.rotation.x += (tiltRef.current.x * 0.12 - bouquetGroup.rotation.x) * 0.08;
        bouquetGroup.rotation.z += (tiltRef.current.y * 0.10 - bouquetGroup.rotation.z) * 0.08;
      } else {
        bouquetGroup.rotation.x += (-mouseY * 0.08 - bouquetGroup.rotation.x) * 0.06;
        bouquetGroup.rotation.y += ( mouseX * 0.12 - bouquetGroup.rotation.y) * 0.06;
      }

      // Wind / breeze physics on all flowers
      animateWind(bouquetGroup, time, w.strength, w.dirX, w.dirZ);

      renderer.render(scene, camera);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameRef.current);
      ro.disconnect();
      window.removeEventListener('deviceorientation', onOrientation);
      mount.removeEventListener('mousemove', onMouseMove);
      mount.removeEventListener('click',      handleCanvasClick as EventListener);
      mount.removeEventListener('touchend',   handleCanvasClick as EventListener);
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync click handler when it changes
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const prev = (mount as any).__clickHandler;
    if (prev) {
      mount.removeEventListener('click',    prev);
      mount.removeEventListener('touchend', prev);
    }
    mount.addEventListener('click',    handleCanvasClick as EventListener);
    mount.addEventListener('touchend', handleCanvasClick as EventListener);
    (mount as any).__clickHandler = handleCanvasClick;
    return () => {
      mount.removeEventListener('click',    handleCanvasClick as EventListener);
      mount.removeEventListener('touchend', handleCanvasClick as EventListener);
    };
  }, [handleCanvasClick]);

  return (
    <div
      ref={mountRef}
      className="w-full h-full"
      style={{ cursor: 'none' }}
      aria-label="Interactive 3D flower bouquet for Tannu"
    />
  );
};
