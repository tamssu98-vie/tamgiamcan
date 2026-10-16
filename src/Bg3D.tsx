import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Nền 3D: mặt bàn gỗ nhìn xiên với đĩa, bát, đũa trôi chậm; xoay theo chuột/cuộn.
function woodTexture() {
  const c = document.createElement('canvas');
  c.width = 512; c.height = 512;
  const g = c.getContext('2d')!;
  g.fillStyle = '#b98a5a';
  g.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 90; i++) {
    g.strokeStyle = `rgba(90,55,25,${0.05 + Math.random() * 0.12})`;
    g.lineWidth = 1 + Math.random() * 3;
    const y = Math.random() * 512;
    g.beginPath();
    g.moveTo(0, y);
    g.bezierCurveTo(170, y + (Math.random() - 0.5) * 18, 340, y + (Math.random() - 0.5) * 18, 512, y);
    g.stroke();
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(4, 3);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export default function Bg3D() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current!;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    } catch {
      return; // không có WebGL: bỏ qua, app vẫn chạy
    }
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xe9d9c2);
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.set(0, 12, 12);

    scene.add(new THREE.HemisphereLight(0xffffff, 0x8a6a45, 1.6));
    const sun = new THREE.DirectionalLight(0xfff3dd, 1.4);
    sun.position.set(-6, 14, 6);
    scene.add(sun);

    const disposables: { dispose(): void }[] = [];
    const mat = (color: number) => {
      const m = new THREE.MeshStandardMaterial({ color, roughness: 0.55 });
      disposables.push(m);
      return m;
    };
    const geo = <T extends THREE.BufferGeometry>(g: T) => (disposables.push(g), g);

    const tex = woodTexture();
    const tableMat = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.8 });
    disposables.push(tex, tableMat);
    const table = new THREE.Mesh(geo(new THREE.PlaneGeometry(60, 40)), tableMat);
    table.rotation.x = -Math.PI / 2;
    scene.add(table);

    const plateG = geo(new THREE.CylinderGeometry(2, 1.7, 0.2, 40));
    const bowlG = geo(new THREE.SphereGeometry(1.4, 32, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2));
    const stickG = geo(new THREE.CylinderGeometry(0.05, 0.035, 5, 8));
    const white = mat(0xfafafa), green = mat(0x10b981), red = mat(0xc2410c), wood = mat(0x5a3a1c);
    bowlG.translate(0, 0.9, 0);
    const items: THREE.Object3D[] = [];
    const add = (m: THREE.Mesh, x: number, z: number, y = 0.1) => {
      m.position.set(x, y, z);
      scene.add(m);
      items.push(m);
    };
    ([[-9, -3], [8, -5], [-3, -9], [11, 3], [-12, 4]] as const).forEach(([x, z], i) => {
      add(new THREE.Mesh(plateG, i % 2 ? green : white), x, z);
      const b = new THREE.Mesh(bowlG, i % 2 ? white : red);
      b.scale.setScalar(0.55);
      b.position.set(x, 0.2, z);
      scene.add(b);
      items.push(b);
      const s = new THREE.Mesh(stickG, wood);
      s.rotation.set(Math.PI / 2, 0, 0.3 + i * 0.4);
      add(s, x + 3, z + 2, 0.06);
    });

    const resize = () => {
      renderer.setSize(innerWidth, innerHeight, false);
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
    };
    resize();
    addEventListener('resize', resize);

    let mx = 0, my = 0;
    const move = (e: PointerEvent) => {
      mx = e.clientX / innerWidth - 0.5;
      my = e.clientY / innerHeight - 0.5;
    };
    addEventListener('pointermove', move);

    const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    const tick = (t: number) => {
      const s = t / 1000;
      items.forEach((m, i) => { m.position.y += Math.sin(s * 0.6 + i) * 0.0015; });
      camera.position.x += (mx * 5 - camera.position.x) * 0.03;
      camera.position.z += (12 + my * 3 + scrollY * 0.002 - camera.position.z) * 0.03;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
      if (!still && !document.hidden) raf = requestAnimationFrame(tick);
    };
    const onVis = () => { if (!document.hidden && !still) { cancelAnimationFrame(raf); raf = requestAnimationFrame(tick); } };
    document.addEventListener('visibilitychange', onVis);
    raf = requestAnimationFrame(tick);

    // Nghiêng thẻ .t3d theo chuột (ủy quyền một handler cho cả trang)
    const tilt = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || still) return;
      const el = (e.target as Element).closest<HTMLElement>('.t3d');
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--ry', `${((e.clientX - r.left) / r.width - 0.5) * 6}deg`);
      el.style.setProperty('--rx', `${-((e.clientY - r.top) / r.height - 0.5) * 6}deg`);
    };
    const untilt = (e: PointerEvent) => {
      const el = e.target instanceof Element ? e.target.closest<HTMLElement>('.t3d') : null;
      el?.style.removeProperty('--rx'); el?.style.removeProperty('--ry');
    };
    addEventListener('pointermove', tilt);
    document.addEventListener('pointerout', untilt);

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener('resize', resize);
      removeEventListener('pointermove', move);
      removeEventListener('pointermove', tilt);
      document.removeEventListener('pointerout', untilt);
      document.removeEventListener('visibilitychange', onVis);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
    };
  }, []);
  return <canvas ref={ref} className="fixed inset-0 -z-10 w-full h-full pointer-events-none" />;
}
