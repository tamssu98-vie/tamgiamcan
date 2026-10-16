import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Background3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 25;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    } catch {
      // Fallback if WebGL fails
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = 'fixed';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.width = '100vw';
    renderer.domElement.style.height = '100vh';
    renderer.domElement.style.pointerEvents = 'none';
    renderer.domElement.style.zIndex = '0';
    renderer.domElement.style.opacity = '0.65';
    container.appendChild(renderer.domElement);

    // Group for objects to rotate together with mouse parallax
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Tạo Particle Texture mềm dạng Glow
    const createGlowTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.25, 'rgba(16, 185, 129, 0.8)'); // emerald
        gradient.addColorStop(0.5, 'rgba(5, 150, 105, 0.4)');
        gradient.addColorStop(1, 'rgba(5, 150, 105, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 64, 64);
      }
      return new THREE.CanvasTexture(canvas);
    };

    const particleTexture = createGlowTexture();

    // 2. Điểm hạt chuyển hóa (Metabolism Bio-Particles)
    const particleCount = 180;
    const posArray = new Float32Array(particleCount * 3);
    const colorArray = new Float32Array(particleCount * 3);

    const emeraldColor = new THREE.Color('#10b981');
    const tealColor = new THREE.Color('#06b6d4');
    const goldColor = new THREE.Color('#f59e0b');

    for (let i = 0; i < particleCount; i++) {
      // Tán xạ trong không gian 3D dạng elip
      const r = 18 * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);

      posArray[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      posArray[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7; // hơi dẹt
      posArray[i * 3 + 2] = r * Math.cos(phi) * 0.8;

      // Phối màu hạt: chủ đạo xanh ngọc (emerald), nhấn cyan & vàng kim
      const randColor = Math.random();
      const col = randColor < 0.65 ? emeraldColor : randColor < 0.85 ? tealColor : goldColor;
      colorArray[i * 3] = col.r;
      colorArray[i * 3 + 1] = col.g;
      colorArray[i * 3 + 2] = col.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.75,
      map: particleTexture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    mainGroup.add(particles);

    // 3. Khối hình học 3D wireframe nổi (Cellular / Metabolism rings)
    const ringsGroup = new THREE.Group();

    // Vòng quỹ đạo Torus 1
    const torusGeo1 = new THREE.TorusGeometry(8, 0.04, 16, 100);
    const torusMat1 = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.22,
      wireframe: false
    });
    const torus1 = new THREE.Mesh(torusGeo1, torusMat1);
    torus1.rotation.x = Math.PI / 3;
    ringsGroup.add(torus1);

    // Vòng quỹ đạo Torus 2
    const torusGeo2 = new THREE.TorusGeometry(11, 0.03, 16, 100);
    const torusMat2 = new THREE.MeshBasicMaterial({
      color: 0x0ea5e9,
      transparent: true,
      opacity: 0.16
    });
    const torus2 = new THREE.Mesh(torusGeo2, torusMat2);
    torus2.rotation.y = Math.PI / 4;
    torus2.rotation.x = -Math.PI / 6;
    ringsGroup.add(torus2);

    // Khối Icosahedron tượng trưng cấu trúc tế bào sinh học khỏe mạnh
    const icoGeo = new THREE.IcosahedronGeometry(2.8, 1);
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0x34d399,
      wireframe: true,
      transparent: true,
      opacity: 0.18
    });
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    icoMesh.position.set(7, 3, -4);
    ringsGroup.add(icoMesh);

    // Khối Dodecahedron thứ hai ở góc đối diện
    const dodeGeo = new THREE.DodecahedronGeometry(2.2, 0);
    const dodeMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      wireframe: true,
      transparent: true,
      opacity: 0.15
    });
    const dodeMesh = new THREE.Mesh(dodeGeo, dodeMat);
    dodeMesh.position.set(-8, -4, -3);
    ringsGroup.add(dodeMesh);

    mainGroup.add(ringsGroup);

    // 4. Parallax chuột tương tác
    const targetMouse = { x: 0, y: 0 };
    const currentMouse = { x: 0, y: 0 };

    const handlePointerMove = (e: MouseEvent) => {
      targetMouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let isPaused = false;

    const handleVisibilityChange = () => {
      isPaused = document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (isPaused || prefersReducedMotion) {
        return;
      }

      const delta = clock.getDelta();

      // Lerp mouse
      currentMouse.x += (targetMouse.x - currentMouse.x) * 0.05;
      currentMouse.y += (targetMouse.y - currentMouse.y) * 0.05;

      // Xoay nhẹ nhàng các cụm hình
      mainGroup.rotation.y += delta * 0.08;
      mainGroup.rotation.x = currentMouse.y * 0.25;
      mainGroup.rotation.y += currentMouse.x * 0.02;

      // Xoay các khối tế bào hình học
      icoMesh.rotation.x += delta * 0.3;
      icoMesh.rotation.y += delta * 0.4;

      dodeMesh.rotation.y -= delta * 0.25;
      dodeMesh.rotation.z += delta * 0.2;

      torus1.rotation.z += delta * 0.05;
      torus2.rotation.z -= delta * 0.04;

      // Camera di chuyển nhẹ theo chuột tạo chiều sâu 3D (Parallax)
      camera.position.x = currentMouse.x * 2.5;
      camera.position.y = currentMouse.y * 1.8;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    // Initial render
    renderer.render(scene, camera);
    if (!prefersReducedMotion) {
      animate();
    }

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);

      // Clean up Three.js resources
      particleGeo.dispose();
      particleMat.dispose();
      particleTexture.dispose();
      torusGeo1.dispose();
      torusMat1.dispose();
      torusGeo2.dispose();
      torusMat2.dispose();
      icoGeo.dispose();
      icoMat.dispose();
      dodeGeo.dispose();
      dodeMat.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true" />;
}
