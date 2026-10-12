"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface ThreeConstellationProps {
  className?: string;
  particleCount?: number;
  maxDistance?: number;
}

export function ThreeConstellationBackground({
  className = "absolute inset-0 pointer-events-none",
  particleCount = 85,
  maxDistance = 115,
}: ThreeConstellationProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    let clock = new THREE.Clock();
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 600;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
    camera.position.z = 240;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // transparent
    container.appendChild(renderer.domElement);

    // 2. Data Nodes & Secondary Stardust Group
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    interface NodePoint {
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
      baseX: number;
      baseY: number;
      phaseX: number;
      phaseY: number;
      color: THREE.Color;
    }

    const points: NodePoint[] = [];
    const colorsList = [
      new THREE.Color("#2563EB"), // blue (academic)
      new THREE.Color("#3B82F6"), // light blue (placement)
      new THREE.Color("#10B981"), // emerald (attendance)
      new THREE.Color("#F59E0B"), // amber (warning/risk)
      new THREE.Color("#8B5CF6"), // purple (AI segment)
    ];

    const boundX = width > 768 ? 260 : 160;
    const boundY = 160;
    const boundZ = 120;

    for (let i = 0; i < particleCount; i++) {
      const col = colorsList[i % colorsList.length];
      const rx = (Math.random() - 0.5) * boundX * 2;
      const ry = (Math.random() - 0.5) * boundY * 2;
      const rz = (Math.random() - 0.5) * boundZ * 2;
      points.push({
        x: rx,
        y: ry,
        z: rz,
        baseX: rx,
        baseY: ry,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        vz: (Math.random() - 0.5) * 0.18,
        phaseX: Math.random() * Math.PI * 2,
        phaseY: Math.random() * Math.PI * 2,
        color: col,
      });
    }

    // Node Positions Buffer
    const pGeometry = new THREE.BufferGeometry();
    const pPositions = new Float32Array(particleCount * 3);
    const pColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      pPositions[i * 3] = points[i].x;
      pPositions[i * 3 + 1] = points[i].y;
      pPositions[i * 3 + 2] = points[i].z;

      pColors[i * 3] = points[i].color.r;
      pColors[i * 3 + 1] = points[i].color.g;
      pColors[i * 3 + 2] = points[i].color.b;
    }

    pGeometry.setAttribute("position", new THREE.BufferAttribute(pPositions, 3));
    pGeometry.setAttribute("color", new THREE.BufferAttribute(pColors, 3));

    // Custom circle particle texture with smooth radial falloff
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 30);
      gradient.addColorStop(0, "rgba(255,255,255,1)");
      gradient.addColorStop(0.3, "rgba(255,255,255,0.7)");
      gradient.addColorStop(0.7, "rgba(255,255,255,0.15)");
      gradient.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(32, 32, 30, 0, Math.PI * 2);
      ctx.fill();
    }
    const texture = new THREE.CanvasTexture(canvas);

    // Primary nodes: Reduced opacity (0.36) and smaller size (4.2) for subtle elegance
    const pMaterial = new THREE.PointsMaterial({
      size: 4.2,
      map: texture,
      vertexColors: true,
      transparent: true,
      opacity: 0.36,
      blending: THREE.NormalBlending,
      depthWrite: false,
    });

    const pointCloud = new THREE.Points(pGeometry, pMaterial);
    mainGroup.add(pointCloud);

    // Secondary subtle Star-dust layer (depth layer, opacity 0.16)
    const dustCount = 80;
    const dustPositions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * boundX * 2.4;
      dustPositions[i * 3 + 1] = (Math.random() - 0.5) * boundY * 2.4;
      dustPositions[i * 3 + 2] = -120 + (Math.random() - 0.5) * 160;
    }
    const dustGeometry = new THREE.BufferGeometry();
    dustGeometry.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
    const dustMaterial = new THREE.PointsMaterial({
      size: 2.2,
      map: texture,
      color: 0x94a3b8,
      transparent: true,
      opacity: 0.16,
      depthWrite: false,
    });
    const dustCloud = new THREE.Points(dustGeometry, dustMaterial);
    mainGroup.add(dustCloud);

    // Connecting Lines: Reduced opacity (0.14) for non-distracting web
    const maxLines = (particleCount * (particleCount - 1)) / 2;
    const linePositions = new Float32Array(maxLines * 6);
    const lineColors = new Float32Array(maxLines * 6);

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.14,
      blending: THREE.NormalBlending,
      depthWrite: false,
    });

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    mainGroup.add(lines);

    // 3. Mouse Interaction & Parallax
    let targetRotationX = 0;
    let targetRotationY = 0;
    let mouseWorldX = 9999;
    let mouseWorldY = 9999;

    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      targetRotationY = normX * 0.16;
      targetRotationX = -normY * 0.12;

      // Approximate 3D plane projection for cursor repulsion
      mouseWorldX = normX * (boundX * 0.85);
      mouseWorldY = normY * (boundY * 0.85);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // 4. Resize Handling
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth || window.innerWidth;
      const newHeight = container.clientHeight || 600;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    // 5. Animation Loop with Organic Harmonic Drift & Soft Repulsion
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth tilt easing
      mainGroup.rotation.y += (targetRotationY - mainGroup.rotation.y) * 0.035;
      mainGroup.rotation.x += (targetRotationX - mainGroup.rotation.x) * 0.035;
      mainGroup.rotation.z += 0.0004;

      dustCloud.rotation.y -= 0.0002;

      const pos = pGeometry.attributes.position.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const pt = points[i];

        // Organic harmonic wave oscillation
        pt.x += pt.vx + Math.sin(elapsedTime * 0.7 + pt.phaseX) * 0.06;
        pt.y += pt.vy + Math.cos(elapsedTime * 0.7 + pt.phaseY) * 0.06;
        pt.z += pt.vz;

        // Subtle interactive mouse repulsion in 3D
        const dx = pt.x - mouseWorldX;
        const dy = pt.y - mouseWorldY;
        const distToMouse = Math.sqrt(dx * dx + dy * dy);
        const repelRadius = 60;

        if (distToMouse < repelRadius && distToMouse > 0.1) {
          const force = (1.0 - distToMouse / repelRadius) * 0.8;
          pt.x += (dx / distToMouse) * force;
          pt.y += (dy / distToMouse) * force;
        }

        // Smooth boundary reflection
        if (pt.x > boundX) { pt.x = boundX; pt.vx *= -1; }
        if (pt.x < -boundX) { pt.x = -boundX; pt.vx *= -1; }
        if (pt.y > boundY) { pt.y = boundY; pt.vy *= -1; }
        if (pt.y < -boundY) { pt.y = -boundY; pt.vy *= -1; }
        if (pt.z > boundZ) { pt.z = boundZ; pt.vz *= -1; }
        if (pt.z < -boundZ) { pt.z = -boundZ; pt.vz *= -1; }

        pos[i * 3] = pt.x;
        pos[i * 3 + 1] = pt.y;
        pos[i * 3 + 2] = pt.z;
      }
      pGeometry.attributes.position.needsUpdate = true;

      // Recompute connecting lines with soft distance fading
      let lineVertexIndex = 0;
      let colorIndex = 0;

      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const ldx = points[i].x - points[j].x;
          const ldy = points[i].y - points[j].y;
          const ldz = points[i].z - points[j].z;
          const dist = Math.sqrt(ldx * ldx + ldy * ldy + ldz * ldz);

          if (dist < maxDistance) {
            const alpha = 1.0 - dist / maxDistance;

            linePositions[lineVertexIndex++] = points[i].x;
            linePositions[lineVertexIndex++] = points[i].y;
            linePositions[lineVertexIndex++] = points[i].z;

            linePositions[lineVertexIndex++] = points[j].x;
            linePositions[lineVertexIndex++] = points[j].y;
            linePositions[lineVertexIndex++] = points[j].z;

            // Soft blended colors
            const c1 = points[i].color;
            const c2 = points[j].color;
            const lineAlpha = alpha * 0.35;

            lineColors[colorIndex++] = c1.r * lineAlpha;
            lineColors[colorIndex++] = c1.g * lineAlpha;
            lineColors[colorIndex++] = c1.b * lineAlpha;

            lineColors[colorIndex++] = c2.r * lineAlpha;
            lineColors[colorIndex++] = c2.g * lineAlpha;
            lineColors[colorIndex++] = c2.b * lineAlpha;
          }
        }
      }

      lineGeometry.setDrawRange(0, lineVertexIndex / 3);
      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.color.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // 6. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      pGeometry.dispose();
      pMaterial.dispose();
      dustGeometry.dispose();
      dustMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, [particleCount, maxDistance]);

  return <div ref={containerRef} className={className} aria-hidden="true" />;
}
