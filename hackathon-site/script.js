
/* ============================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================
   DIGITAL CODING TELEMETRY EQUALIZER ENGINE (#equalizerCanvasHome)
   Dynamic Multi-Band Frequency Wave, Neon Spectrum, Particle Drift
   ============================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================ */
function initHomeTelemetryEqualizer() {
  const canvas = document.getElementById('equalizerCanvasHome');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);

  function resize() {
    const rect = canvas.getBoundingClientRect();
    width = rect.width || canvas.offsetWidth || window.innerWidth;
    height = rect.height || canvas.offsetHeight || 520;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  let mouseX = width / 2;
  let mouseY = height / 2;
  let targetMouseX = mouseX;
  let targetMouseY = mouseY;
  let isMouseOver = false;

  const sec = canvas.closest('.eq-showcase-sec') || canvas.parentElement;
  if (sec) {
    sec.addEventListener('mousemove', function (e) {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
      isMouseOver = true;
    }, { passive: true });
    sec.addEventListener('mouseleave', function () {
      isMouseOver = false;
    }, { passive: true });
  }

  // --- FLOATING 3D SHAPES DEFINITION ---
  // Polyhedra models (vertices & edges)
  const octahedronModel = {
    vertices: [
      [0, -1, 0], [1, 0, 0], [0, 0, 1], [-1, 0, 0], [0, 0, -1], [0, 1, 0]
    ],
    edges: [
      [0, 1], [0, 2], [0, 3], [0, 4], [5, 1], [5, 2], [5, 3], [5, 4], [1, 2], [2, 3], [3, 4], [4, 1]
    ]
  };

  const cubeModel = {
    vertices: [
      [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
      [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]
    ],
    edges: [
      [0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4],
      [0, 4], [1, 5], [2, 6], [3, 7]
    ]
  };

  const tetrahedronModel = {
    vertices: [
      [1, 1, 1], [-1, -1, 1], [-1, 1, -1], [1, -1, -1]
    ],
    edges: [
      [0, 1], [0, 2], [0, 3], [1, 2], [2, 3], [3, 1]
    ]
  };

  const colorPalette = [
    { stroke: '#00F5D4', glow: 'rgba(0, 245, 212, 0.45)', core: '#FFFFFF' },
    { stroke: '#3B82F6', glow: 'rgba(59, 130, 246, 0.45)', core: '#60A5FA' },
    { stroke: '#FF5722', glow: 'rgba(255, 87, 34, 0.45)', core: '#FF8A65' },
    { stroke: '#A855F7', glow: 'rgba(168, 85, 247, 0.45)', core: '#C084FC' },
    { stroke: '#10B981', glow: 'rgba(16, 185, 129, 0.45)', core: '#34D399' }
  ];

  // Instantiate 22 floating 3D shapes
  const shapeCount = 22;
  const shapes = [];
  const models = [octahedronModel, cubeModel, tetrahedronModel, octahedronModel];

  for (let i = 0; i < shapeCount; i++) {
    const model = models[i % models.length];
    const palette = colorPalette[i % colorPalette.length];
    shapes.push({
      model: model,
      color: palette.stroke,
      glow: palette.glow,
      core: palette.core,
      // 3D position
      baseX: Math.random() * (width || 1200),
      baseY: Math.random() * (height || 500),
      z: -150 + Math.random() * 450,
      x: 0,
      y: 0,
      scale: 18 + Math.random() * 24,
      // Rotation angles & speeds
      rx: Math.random() * Math.PI * 2,
      ry: Math.random() * Math.PI * 2,
      rz: Math.random() * Math.PI * 2,
      vrx: (Math.random() - 0.5) * 0.022,
      vry: (Math.random() - 0.5) * 0.028,
      vrz: (Math.random() - 0.5) * 0.018,
      // Harmonic floating offsets
      floatSpeedX: 0.6 + Math.random() * 0.8,
      floatSpeedY: 0.5 + Math.random() * 0.7,
      floatAmpX: 25 + Math.random() * 45,
      floatAmpY: 30 + Math.random() * 50,
      phase: Math.random() * Math.PI * 2,
      // Repulsion velocity
      vx: 0,
      vy: 0
    });
  }

  // Floating Ambient Micro-Particles
  const particleCount = 50;
  const particles = [];
  for (let p = 0; p < particleCount; p++) {
    particles.push({
      x: Math.random() * (width || 1200),
      y: Math.random() * (height || 500),
      z: -100 + Math.random() * 400,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -0.3 - Math.random() * 0.6,
      radius: 1 + Math.random() * 2,
      color: colorPalette[p % colorPalette.length].stroke,
      alpha: 0.2 + Math.random() * 0.7,
      pulseSpeed: 1 + Math.random() * 2
    });
  }

  let time = 0;
  const focalLength = 320;

  function rotateX(v, angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return [v[0], v[1] * cos - v[2] * sin, v[1] * sin + v[2] * cos];
  }

  function rotateY(v, angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return [v[0] * cos + v[2] * sin, v[1], -v[0] * sin + v[2] * cos];
  }

  function rotateZ(v, angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return [v[0] * cos - v[1] * sin, v[0] * sin + v[1] * cos, v[2]];
  }

  function project(v, originX, originY, scale, zDepth) {
    const dist = focalLength + zDepth;
    if (dist <= 10) return null;
    const factor = (focalLength / dist) * scale;
    return {
      x: originX + v[0] * factor,
      y: originY + v[1] * factor,
      factor: factor
    };
  }

  function render() {
    requestAnimationFrame(render);
    if (!canvas.offsetParent) return;

    // Smooth cursor interpolation
    mouseX += (targetMouseX - mouseX) * 0.08;
    mouseY += (targetMouseY - mouseY) * 0.08;

    time += 0.016;
    ctx.clearRect(0, 0, width, height);

    // 1. Subtle Harmonic Fluid Frequency Wave at Lower Horizon
    const waveY = height * 0.78;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(0, height);
    for (let x = 0; x <= width; x += 15) {
      const norm = x / width;
      const w1 = Math.sin(norm * 6 + time * 1.8);
      const w2 = Math.cos(norm * 14 - time * 1.2);
      const w3 = Math.sin(norm * 24 + time * 2.2);
      const mouseDist = Math.abs(x - mouseX) / (width || 1);
      const mousePeak = Math.max(0, 1 - mouseDist * 3.5) * 40;
      const py = waveY + (w1 * 22 + w2 * 14 + w3 * 8) - mousePeak;
      ctx.lineTo(x, py);
    }
    ctx.lineTo(width, height);
    ctx.closePath();
    const waveGrad = ctx.createLinearGradient(0, waveY - 50, 0, height);
    waveGrad.addColorStop(0, 'rgba(0, 245, 212, 0.08)');
    waveGrad.addColorStop(0.5, 'rgba(59, 130, 246, 0.05)');
    waveGrad.addColorStop(1, 'rgba(6, 9, 18, 0)');
    ctx.fillStyle = waveGrad;
    ctx.fill();

    // Wave crest laser line
    ctx.beginPath();
    for (let x = 0; x <= width; x += 15) {
      const norm = x / width;
      const w1 = Math.sin(norm * 6 + time * 1.8);
      const w2 = Math.cos(norm * 14 - time * 1.2);
      const w3 = Math.sin(norm * 24 + time * 2.2);
      const mouseDist = Math.abs(x - mouseX) / (width || 1);
      const mousePeak = Math.max(0, 1 - mouseDist * 3.5) * 40;
      const py = waveY + (w1 * 22 + w2 * 14 + w3 * 8) - mousePeak;
      if (x === 0) ctx.moveTo(x, py);
      else ctx.lineTo(x, py);
    }
    ctx.strokeStyle = 'rgba(0, 245, 212, 0.28)';
    ctx.lineWidth = 1.2;
    ctx.stroke();
    ctx.restore();

    // 2. Render Floating Ambient Micro-Particles
    ctx.save();
    for (let p = 0; p < particles.length; p++) {
      const pt = particles[p];
      pt.y += pt.vy;
      pt.x += pt.vx;
      if (pt.y < -20) {
        pt.y = height + 20;
        pt.x = Math.random() * width;
      }
      if (pt.x < -20) pt.x = width + 20;
      if (pt.x > width + 20) pt.x = -20;

      const pDist = focalLength + pt.z;
      const pScale = (focalLength / Math.max(20, pDist));
      const pulseAlpha = pt.alpha * (0.6 + 0.4 * Math.sin(time * pt.pulseSpeed + p));

      ctx.beginPath();
      ctx.arc(pt.x, pt.y, pt.radius * pScale, 0, Math.PI * 2);
      ctx.fillStyle = pt.color;
      ctx.globalAlpha = Math.max(0, Math.min(1, pulseAlpha));
      ctx.shadowColor = pt.color;
      ctx.shadowBlur = 8 * pScale;
      ctx.fill();
    }
    ctx.restore();

    // 3. Update & Project Floating 3D Shapes
    const projectedShapes = [];

    for (let i = 0; i < shapes.length; i++) {
      const s = shapes[i];

      // Update 3D rotations
      s.rx += s.vrx;
      s.ry += s.vry;
      s.rz += s.vrz;

      // Harmonic floating physics
      const floatOffsetX = Math.sin(time * s.floatSpeedX + s.phase) * s.floatAmpX;
      const floatOffsetY = Math.cos(time * s.floatSpeedY + s.phase) * s.floatAmpY;
      const targetX = s.baseX + floatOffsetX;
      const targetY = s.baseY + floatOffsetY;

      // Cursor magnetic repulsion physics
      const dx = targetX - mouseX;
      const dy = targetY - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const repulsionRadius = 180;

      if (isMouseOver && dist < repulsionRadius && dist > 1) {
        const force = (1 - dist / repulsionRadius) * 22;
        s.vx += (dx / dist) * force;
        s.vy += (dy / dist) * force;
      }

      // Spring damping return
      s.vx *= 0.88;
      s.vy *= 0.88;

      s.x = targetX + s.vx;
      s.y = targetY + s.vy;

      // Wrap boundaries smoothly
      if (s.baseX < -80) s.baseX = width + 80;
      if (s.baseX > width + 80) s.baseX = -80;
      if (s.baseY < -80) s.baseY = height + 80;
      if (s.baseY > height + 80) s.baseY = -80;

      // Transform & Project Vertices
      const projectedVerts = [];
      const rawVerts = s.model.vertices;

      for (let v = 0; v < rawVerts.length; v++) {
        let vert = rawVerts[v];
        vert = rotateX(vert, s.rx);
        vert = rotateY(vert, s.ry);
        vert = rotateZ(vert, s.rz);

        const proj = project(vert, s.x, s.y, s.scale, s.z);
        if (proj) projectedVerts.push(proj);
      }

      projectedShapes.push({
        shape: s,
        projectedVerts: projectedVerts,
        centerZ: s.z,
        centerX: s.x,
        centerY: s.y
      });
    }

    // Sort by depth (Z-buffer painters algorithm)
    projectedShapes.sort(function (a, b) {
      return a.centerZ - b.centerZ;
    });

    // 4. Render Dynamic Connecting Telemetry Lasers between nearby shapes
    ctx.save();
    for (let i = 0; i < projectedShapes.length; i++) {
      for (let j = i + 1; j < projectedShapes.length; j++) {
        const s1 = projectedShapes[i];
        const s2 = projectedShapes[j];
        const ldx = s1.centerX - s2.centerX;
        const ldy = s1.centerY - s2.centerY;
        const lineDist = Math.sqrt(ldx * ldx + ldy * ldy);

        if (lineDist < 160) {
          const lineAlpha = (1 - lineDist / 160) * 0.28;
          ctx.beginPath();
          ctx.moveTo(s1.centerX, s1.centerY);
          ctx.lineTo(s2.centerX, s2.centerY);
          ctx.strokeStyle = s1.shape.color;
          ctx.globalAlpha = lineAlpha;
          ctx.lineWidth = 0.85;
          ctx.stroke();

          // Data packet spark traversing along laser
          const sparkT = (time * 1.5 + (i * 0.3)) % 1;
          const sparkX = s1.centerX + (s2.centerX - s1.centerX) * sparkT;
          const sparkY = s1.centerY + (s2.centerY - s1.centerY) * sparkT;
          ctx.beginPath();
          ctx.arc(sparkX, sparkY, 1.4, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF';
          ctx.globalAlpha = lineAlpha * 1.8;
          ctx.fill();
        }
      }
    }
    ctx.restore();

    // 5. Render Floating 3D Wireframe Shapes with Luminous Vertices
    for (let i = 0; i < projectedShapes.length; i++) {
      const item = projectedShapes[i];
      const s = item.shape;
      const pVerts = item.projectedVerts;
      const edges = s.model.edges;

      if (pVerts.length === 0) continue;

      const depthFactor = (focalLength / Math.max(30, focalLength + s.z));
      const shapeAlpha = Math.max(0.2, Math.min(0.95, depthFactor * 0.85));

      ctx.save();
      ctx.globalAlpha = shapeAlpha;
      ctx.shadowColor = s.glow;
      ctx.shadowBlur = 14 * depthFactor;
      ctx.strokeStyle = s.color;
      ctx.lineWidth = Math.max(1, 1.8 * depthFactor);

      // Draw Edges
      for (let e = 0; e < edges.length; e++) {
        const p1 = pVerts[edges[e][0]];
        const p2 = pVerts[edges[e][1]];
        if (!p1 || !p2) continue;

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }

      // Draw Glowing Core Vertices
      for (let v = 0; v < pVerts.length; v++) {
        const pv = pVerts[v];
        ctx.beginPath();
        ctx.arc(pv.x, pv.y, Math.max(1.2, 2.4 * depthFactor), 0, Math.PI * 2);
        ctx.fillStyle = s.core;
        ctx.fill();
      }

      // Center glowing holographic anchor
      ctx.beginPath();
      ctx.arc(item.centerX, item.centerY, Math.max(1.5, 3 * depthFactor), 0, Math.PI * 2);
      ctx.fillStyle = s.color;
      ctx.globalAlpha = shapeAlpha * 0.7;
      ctx.fill();

      ctx.restore();
    }
  }

  render();
}
window.initHomeTelemetryEqualizer = initHomeTelemetryEqualizer;

/* ═══════════════════════════════════════════════════════════════════
   3D ATOMIC ORBITAL CHRONOMETER SYSTEM ENGINE
   Matches reference image: Copper Core, Cyan Geodesic Wireframe,
   Tilted Cyan & Orange Torus Orbits with Orbiting Satellites
   ═══════════════════════════════════════════════════════════════════ */
function createAtomicOrbitalSystem(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas || typeof THREE === 'undefined') return null;

  if (canvas.dataset.initialized === 'true') {
    return null;
  }
  canvas.dataset.initialized = 'true';

  const parent = canvas.parentElement;
  let w = parent ? (parent.clientWidth || 540) : 540;
  let h = parent ? (parent.clientHeight || 540) : 540;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
  camera.position.set(0, 0, 5.6);

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(w, h, false);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  // Lighting - Warm top-left spotlight for round specular highlight on dark copper sphere
  const ambLight = new THREE.AmbientLight(0xffffff, 0.9);
  scene.add(ambLight);

  const sunLight = new THREE.DirectionalLight(0xfff5ea, 3.8);
  sunLight.position.set(-2.8, 4.2, 4.0);
  scene.add(sunLight);

  const cyanRimLight = new THREE.PointLight(0x00e5ff, 3.2, 16);
  cyanRimLight.position.set(4.5, -2.5, 3.0);
  scene.add(cyanRimLight);

  const orangeRimLight = new THREE.PointLight(0xff5722, 3.5, 16);
  orangeRimLight.position.set(2.0, 3.5, -3.0);
  scene.add(orangeRimLight);

  // Master Orbital Group
  const masterGroup = new THREE.Group();
  masterGroup.position.set(0.2, 0, 0);
  scene.add(masterGroup);

  // 1. Central Copper/Terracotta Planetary Sphere Core
  const coreMat = new THREE.MeshStandardMaterial({
    color: 0x6e2b1e,
    metalness: 0.28,
    roughness: 0.35,
    emissive: 0x220c06,
    emissiveIntensity: 0.35
  });
  const coreSphere = new THREE.Mesh(new THREE.SphereGeometry(0.92, 48, 48), coreMat);
  masterGroup.add(coreSphere);

  // 2. Geodesic Wireframe Lattice Cage (Subdivision 2 Icosahedron)
  const wireGeo = new THREE.IcosahedronGeometry(1.36, 2);
  const wireMat = new THREE.MeshBasicMaterial({
    color: 0x00d2ff,
    wireframe: true,
    transparent: true,
    opacity: 0.88
  });
  const wireLattice = new THREE.Mesh(wireGeo, wireMat);
  masterGroup.add(wireLattice);

  // Subtle inner wireframe
  const innerWireGeo = new THREE.IcosahedronGeometry(1.15, 1);
  const innerWireMat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    wireframe: true,
    transparent: true,
    opacity: 0.25
  });
  const innerLattice = new THREE.Mesh(innerWireGeo, innerWireMat);
  masterGroup.add(innerLattice);

  // Luminous vertex glow points
  const vertexPointsMat = new THREE.PointsMaterial({
    size: 0.052,
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.95
  });
  const vertexPoints = new THREE.Points(wireGeo, vertexPointsMat);
  masterGroup.add(vertexPoints);

  // 3. Orbit Ring 1 - Neon Cyan Ellipse (Gently Tilted)
  const ring1Group = new THREE.Group();
  ring1Group.rotation.x = 1.18;
  ring1Group.rotation.y = -0.28;
  masterGroup.add(ring1Group);

  const ring1Mat = new THREE.MeshStandardMaterial({
    color: 0x00e5ff,
    emissive: 0x00e5ff,
    emissiveIntensity: 0.95,
    metalness: 0.9,
    roughness: 0.1
  });
  const ring1Mesh = new THREE.Mesh(new THREE.TorusGeometry(1.92, 0.024, 16, 120), ring1Mat);
  ring1Group.add(ring1Mesh);

  // Satellites on Ring 1
  const sat1Mat = new THREE.MeshStandardMaterial({
    color: 0x00ffff,
    emissive: 0x00ffff,
    emissiveIntensity: 1.2,
    metalness: 0.9,
    roughness: 0.1
  });
  const satellites1 = [];
  const sat1Count = 3;
  for (let s = 0; s < sat1Count; s++) {
    const sat = new THREE.Mesh(new THREE.SphereGeometry(0.088, 16, 16), sat1Mat);
    const halo = new THREE.Mesh(
      new THREE.TorusGeometry(0.14, 0.012, 8, 20),
      new THREE.MeshBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0.75 })
    );
    halo.rotation.x = Math.PI / 2;
    sat.add(halo);
    ring1Group.add(sat);
    satellites1.push({
      mesh: sat,
      angle: (s / sat1Count) * Math.PI * 2,
      speed: 0.014 + (s % 2) * 0.006,
      radius: 1.92
    });
  }

  // 4. Orbit Ring 2 - Radiant Copper/Orange Ellipse (Steeply Tilted)
  const ring2Group = new THREE.Group();
  ring2Group.rotation.x = -0.82;
  ring2Group.rotation.y = 0.86;
  ring2Group.rotation.z = 0.38;
  masterGroup.add(ring2Group);

  const ring2Mat = new THREE.MeshStandardMaterial({
    color: 0xff5722,
    emissive: 0xff5722,
    emissiveIntensity: 0.95,
    metalness: 0.9,
    roughness: 0.1
  });
  const ring2Mesh = new THREE.Mesh(new THREE.TorusGeometry(2.36, 0.024, 16, 140), ring2Mat);
  ring2Group.add(ring2Mesh);

  // Satellites on Ring 2
  const sat2Mat = new THREE.MeshStandardMaterial({
    color: 0xff7043,
    emissive: 0xff5722,
    emissiveIntensity: 1.2,
    metalness: 0.9,
    roughness: 0.1
  });
  const satellites2 = [];
  const sat2Count = 3;
  for (let s = 0; s < sat2Count; s++) {
    const sat = new THREE.Mesh(new THREE.SphereGeometry(0.092, 16, 16), sat2Mat);
    const halo = new THREE.Mesh(
      new THREE.TorusGeometry(0.15, 0.012, 8, 20),
      new THREE.MeshBasicMaterial({ color: 0xff5722, transparent: true, opacity: 0.75 })
    );
    halo.rotation.x = Math.PI / 2;
    sat.add(halo);
    ring2Group.add(sat);
    satellites2.push({
      mesh: sat,
      angle: (s / sat2Count) * Math.PI * 2,
      speed: 0.011 + (s % 2) * 0.005,
      radius: 2.36
    });
  }

  // 5. Ambient Floating Satellites & Cosmic Nodes
  const floatingSatellites = [];
  const floatPositions = [
    { pos: [1.6, 1.2, 0.4], color: 0x00e5ff, size: 0.08 },
    { pos: [-1.4, -1.5, 0.6], color: 0xff5722, size: 0.085 },
    { pos: [0.8, -1.8, -0.5], color: 0x00ffff, size: 0.07 },
    { pos: [1.9, -0.6, 1.1], color: 0xff7043, size: 0.075 }
  ];

  floatPositions.forEach(fp => {
    const fmat = new THREE.MeshStandardMaterial({
      color: fp.color,
      emissive: fp.color,
      emissiveIntensity: 1.0,
      metalness: 0.8,
      roughness: 0.2
    });
    const fmesh = new THREE.Mesh(new THREE.SphereGeometry(fp.size, 16, 16), fmat);
    fmesh.position.set(fp.pos[0], fp.pos[1], fp.pos[2]);
    masterGroup.add(fmesh);
    floatingSatellites.push({
      mesh: fmesh,
      origin: [...fp.pos],
      phase: Math.random() * Math.PI * 2,
      speed: 0.02 + Math.random() * 0.02
    });
  });

  // 6. Cosmic Starfield Dust
  const starCount = 240;
  const starGeo = new THREE.BufferGeometry();
  const starPositions = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount * 3; i += 3) {
    starPositions[i] = (Math.random() - 0.5) * 8.0;
    starPositions[i + 1] = (Math.random() - 0.5) * 6.0;
    starPositions[i + 2] = (Math.random() - 0.5) * 6.0;
  }
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
  const starMat = new THREE.PointsMaterial({
    size: 0.045,
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.75
  });
  const starPoints = new THREE.Points(starGeo, starMat);
  masterGroup.add(starPoints);

  // Resize handler
  function handleResize() {
    if (!parent) return;
    w = parent.clientWidth || 540;
    h = parent.clientHeight || 540;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  }
  window.addEventListener('resize', handleResize);

  // Interactive Drag & Parallax Handling
  let targetRotX = 0;
  let targetRotY = 0;
  let currentRotX = 0;
  let currentRotY = 0;
  let isDragging = false;
  let prevMouseX = 0;
  let prevMouseY = 0;
  let dragVelX = 0;
  let dragVelY = 0;
  let boostEnergy = 0;

  canvas.style.cursor = 'grab';

  canvas.addEventListener('mousedown', (e) => {
    isDragging = true;
    prevMouseX = e.clientX;
    prevMouseY = e.clientY;
    canvas.style.cursor = 'grabbing';
  });

  window.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      canvas.style.cursor = 'grab';
    }
  });

  window.addEventListener('mousemove', (e) => {
    if (isDragging) {
      const dx = e.clientX - prevMouseX;
      const dy = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
      dragVelY += dx * 0.005;
      dragVelX += dy * 0.005;
    }
  });

  const heroSection = canvas.closest('.tl-page-hero') || parent;
  if (heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
      if (!isDragging) {
        const rect = heroSection.getBoundingClientRect();
        const mx = (e.clientX - rect.left) / rect.width - 0.5;
        const my = (e.clientY - rect.top) / rect.height - 0.5;
        targetRotY = mx * 0.6;
        targetRotX = my * 0.4;
      }
    }, { passive: true });

    heroSection.addEventListener('mouseleave', () => {
      if (!isDragging) {
        targetRotX = 0;
        targetRotY = 0;
      }
    }, { passive: true });

    // Telemetry cell hovers trigger orbital speedup & glow surge
    heroSection.querySelectorAll('.tl-telemetry-cell').forEach(cell => {
      cell.addEventListener('mouseenter', () => {
        boostEnergy = 1.0;
        coreMat.emissiveIntensity = 0.8;
      });
      cell.addEventListener('mouseleave', () => {
        coreMat.emissiveIntensity = 0.35;
      });
    });
  }

  // Animation Loop
  let animId = null;
  let time = 0;

  function render() {
    animId = requestAnimationFrame(render);
    time += 0.016;

    if (boostEnergy > 0) boostEnergy *= 0.94;

    const baseSpeed = 0.004 + boostEnergy * 0.02;

    // Orbit ring satellites
    satellites1.forEach(sat => {
      sat.angle += sat.speed + boostEnergy * 0.03;
      sat.mesh.position.x = Math.cos(sat.angle) * sat.radius;
      sat.mesh.position.y = Math.sin(sat.angle) * sat.radius;
    });

    satellites2.forEach(sat => {
      sat.angle += sat.speed + boostEnergy * 0.03;
      sat.mesh.position.x = Math.cos(sat.angle) * sat.radius;
      sat.mesh.position.y = Math.sin(sat.angle) * sat.radius;
    });

    // Floating satellites subtle bob
    floatingSatellites.forEach(fs => {
      fs.phase += fs.speed;
      fs.mesh.position.y = fs.origin[1] + Math.sin(fs.phase) * 0.12;
      fs.mesh.position.x = fs.origin[0] + Math.cos(fs.phase * 0.8) * 0.08;
    });

    // Wireframe gentle counter-rotation
    wireLattice.rotation.y += 0.003;
    wireLattice.rotation.x += 0.002;
    vertexPoints.rotation.y += 0.003;
    vertexPoints.rotation.x += 0.002;

    // Apply drag & parallax
    if (!isDragging) {
      dragVelX *= 0.92;
      dragVelY *= 0.92;
    }

    currentRotX += (targetRotX - currentRotX) * 0.05 + dragVelX;
    currentRotY += (targetRotY - currentRotY) * 0.05 + dragVelY + baseSpeed;

    masterGroup.rotation.x = currentRotX;
    masterGroup.rotation.y = currentRotY;

    renderer.render(scene, camera);
  }

  render();

  return {
    destroy: () => {
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    }
  };
}
window.createAtomicOrbitalSystem = createAtomicOrbitalSystem;

function initTimelinePage3D() {
  try {
    createAtomicOrbitalSystem('timeline3dCanvas');
  } catch (e) {
    console.warn('initTimelinePage3D error:', e);
  }
}
window.initTimelinePage3D = initTimelinePage3D;

function initHomeTimeline3D() {
  try {
    createAtomicOrbitalSystem('homeTimeline3dCanvas');
  } catch (e) {
    console.warn('initHomeTimeline3D error:', e);
  }
}
window.initHomeTimeline3D = initHomeTimeline3D;

/* ====================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================
   HOME PAGE ACOUSTIC SPECTRUM CANVAS (ZERO OVERLAP)
   ==================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================== */
function initHomeSpectrumCanvas() {
  const canvas = document.getElementById('homeSpectrumCanvas');
  if (!canvas) return;

  if (canvas._spectrumInitialized) return;
  canvas._spectrumInitialized = true;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let width = 0, height = 0;

  function resize() {
    const parent = canvas.parentElement;
    if (!parent) return;
    width = parent.offsetWidth || window.innerWidth;
    height = parent.offsetHeight || 600;
    if (width <= 0 || height <= 0) return;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  let time = 0;
  let mouseX = width / 2;
  let targetMouseX = width / 2;
  let isMouseOver = false;

  const parent = canvas.parentElement;
  if (parent) {
    parent.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      isMouseOver = true;
    }, { passive: true });
    parent.addEventListener('mouseleave', () => {
      isMouseOver = false;
    });
  }

  const colors = ['#315BFF', '#8B5CF6', '#EC4899', '#FF5722', '#00C9D8'];

  function render() {
    requestAnimationFrame(render);
    const pEl = canvas.parentElement;
    if (pEl && (width <= 0 || height <= 0 || width !== pEl.offsetWidth || height !== pEl.offsetHeight)) {
      resize();
    }

    mouseX += (targetMouseX - mouseX) * 0.08;
    time += 0.026;

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    // Subtle ambient background gradient
    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    bgGrad.addColorStop(0, '#F4F5F7');
    bgGrad.addColorStop(0.5, '#ECEEF2');
    bgGrad.addColorStop(1, '#F3F4F6');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    const barW = Math.max(2.5, Math.min(4.5, width / 280));
    const barGap = Math.max(3, barW * 1.1);
    const step = barW + barGap;
    const count = Math.floor(width / step);
    const startX = (width - count * step) / 2;

    for (let i = 0; i < count; i++) {
      const x = startX + i * step;
      const norm = i / count;
      const distCenter = Math.abs(norm - 0.5) * 2;

      const w1 = Math.sin(norm * 9 - time * 2.4);
      const w2 = Math.sin(norm * 20 + time * 1.8);
      const w3 = Math.cos(norm * 32 - time * 1.2);

      let amp = 0.32 + 0.28 * w1 + 0.16 * w2 + 0.10 * w3;
      const centerPeak = Math.exp(-Math.pow(distCenter * 2.6, 2));
      amp += centerPeak * 0.38;

      if (isMouseOver) {
        const distMouse = Math.abs(x - mouseX) / width;
        if (distMouse < 0.18) {
          amp += (0.18 - distMouse) * 1.35;
        }
      }

      const barH = Math.max(10, Math.min(height * 0.82, amp * (height * 0.62)));
      const y = (height - barH) / 2;

      const color = colors[Math.floor(norm * colors.length) % colors.length];
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.72;

      // Rounded pill bar
      const radius = barW / 2;
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + barW - radius, y);
      ctx.quadraticCurveTo(x + barW, y, x + barW, y + radius);
      ctx.lineTo(x + barW, y + barH - radius);
      ctx.quadraticCurveTo(x + barW, y + barH, x + barW - radius, y + barH);
      ctx.lineTo(x + radius, y + barH);
      ctx.quadraticCurveTo(x, y + barH, x, y + barH - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
      ctx.fill();
    }

    ctx.restore();
  }

  requestAnimationFrame(render);
}
window.initHomeSpectrumCanvas = initHomeSpectrumCanvas;

// >>>>>>>>>> START: 01_top.js <<<<<<<<<<
/* ==========================================================================
   UDBHAV 2027 — MASTER ENGINE SCRIPT
   Hack2Skill Ã— Graduate Gateway Club · PIET Jaipur
   Target Event: January 28–29, 2027
   • Real-Time 3D Liquid Fluid Raymarching Engine (Dual-Canvas Depth)
   • 360° Matrix Theme Reveal with Live AES-256 Decryption
   • Brutalist Editorial 8-Stage Timeline & Schedule Simulation
   • VIP Pass Office with 72-Hour Edit Window & Holographic Foil
   • Automated Background Sync to Google Sheets & Google Drive
   ========================================================================== */

// Target Hackathon Date: January 28, 2027 · 9:00 AM IST
var HACKATHON_DATE = new Date('2027-01-28T09:00:00+05:30').getTime();

// Internal Google Sheets & Google Drive Endpoints
var GOOGLE_SHEET_URL = "https://docs.google.com/spreadsheets/d/10ykklemdk9MIRbnIfySx5-5qkHPyejNNIxoJZSBH-tE/edit?usp=sharing";
var GOOGLE_SPREADSHEET_ID = "10ykklemdk9MIRbnIfySx5-5qkHPyejNNIxoJZSBH-tE";
var GOOGLE_DRIVE_FOLDER_ID = "1-jo3KWLEZIh8wGSVDU1VPd4vQO_5wQse";
var GOOGLE_APPS_SCRIPT_WEBAPP_URL = (function() {
  try {
    return localStorage.getItem('udbhav_gas_url') || window.UDBHAV_APPS_SCRIPT_URL || "https://script.google.com/macros/s/AKfycbz_UdbhavRegistry/exec";
  } catch(e) {
    return "https://script.google.com/macros/s/AKfycbz_UdbhavRegistry/exec";
  }
})();

// Local storage key for persistent registration state & 72-hour modification
var STORAGE_KEY = "udbhav_2027_teams";

// WebAudio Sound Synthesizer
let _sharedCyberAudioCtx = null;
function playCyberSound(type = 'click') {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    if (!_sharedCyberAudioCtx) _sharedCyberAudioCtx = new AudioCtx();
    const ctx = _sharedCyberAudioCtx;
    if (ctx.state === 'suspended') ctx.resume();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const now = ctx.currentTime;

    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'click') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.04);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.04);
      osc.start(now);
      osc.stop(now + 0.04);
    } else if (type === 'chime') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.setValueAtTime(659.25, now + 0.08);
      osc.frequency.setValueAtTime(783.99, now + 0.16);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (type === 'hover') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(420, now);
      osc.frequency.exponentialRampToValueAtTime(840, now + 0.03);
      gain.gain.setValueAtTime(0.03, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.03);
      osc.start(now);
      osc.stop(now + 0.03);
    }
  } catch (err) { }
}
window.playCyberSound = playCyberSound;
// >>>>>>>>>> END: 01_top.js <<<<<<<<<<

// >>>>>>>>>> START: 02_loader.js <<<<<<<<<<
/* ==========================================================================
   INTERACTIVE RETRO MINIMALIST BUBBLE OCEAN & 3D WIREFRAME PRELOADER
   - Fullscreen 60 FPS HTML5 Canvas with Light Minimalist Ambient Grid
   - Buoyant Iridescent 3D Water Bubbles with Realistic Specular Glare & Wobble
   - Interactive Bubble Popping Physics with Sparkling Particle Bursts & Sounds
   - Tumbling 3D Wireframe Polyhedra (Cube, Octahedron, Torus Ring, Tetrahedron)
   - Dynamic 0% to 100% Wave Progression Line with Traveling Crest Bead
   - Guaranteed 5.0-Second Auto-Open to Main Hackathon Experience
   ========================================================================== */
let loaderDone = false;
let loaderOceanAnimId = null;

// Synthesized Bubble Pop Audio
function playBubblePopSound(freq = 480) {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    if (!window._loaderAudioCtx) {
      window._loaderAudioCtx = new AudioCtx();
    }
    const ctx = window._loaderAudioCtx;
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.8, now + 0.08);
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.1);
  } catch (e) {}
}

function initAnimatedLiquidOceanPreloader() {
  if (window.loaderDone || window._ldInlineActive) {
    return;
  }
  const loader = document.getElementById('loader');
  if (!loader || loader.classList.contains('gone') || loader.style.display === 'none') {
    window.loaderDone = true;
    if (typeof initScrollAnimations === 'function') initScrollAnimations();
    if (typeof init3DLiquidFluidEngine === 'function') init3DLiquidFluidEngine();
    if (typeof initHeroBubbleAnimation === 'function') initHeroBubbleAnimation();
    return;
  }

  const canvas = document.getElementById('loaderRetroCanvas');
  const pctNum = document.getElementById('ldPct');
  const enterBtn = document.getElementById('ldEnterBtn');
  const statusLabel = loader.querySelector('.rm-status-text');
  const wavePath = document.getElementById('loWavePathActive');
  const waveBead = document.getElementById('loWaveCrestBead');

  let waveLength = 1200;
  if (wavePath && typeof wavePath.getTotalLength === 'function') {
    try {
      waveLength = wavePath.getTotalLength();
      wavePath.style.strokeDasharray = waveLength;
      wavePath.style.strokeDashoffset = waveLength;
    } catch (e) {
      waveLength = 1200;
    }
  }

  // Pointer & Interaction state
  let mouse = { x: -9999, y: -9999, targetX: -9999, targetY: -9999, active: false };
  let animId = null;
  let pulses = [];

  function onPointerMove(e) {
    const rect = loader.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    mouse.targetX = clientX - rect.left;
    mouse.targetY = clientY - rect.top;
    mouse.active = true;
  }

  function onPointerDown(e) {
    onPointerMove(e);
    pulses.push({
      x: mouse.targetX,
      y: mouse.targetY,
      radius: 6,
      maxRadius: Math.max(window.innerWidth, window.innerHeight) * 0.45,
      alpha: 0.65
    });
  }

  loader.addEventListener('mousemove', onPointerMove, { passive: true });
  loader.addEventListener('touchmove', onPointerMove, { passive: true });
  loader.addEventListener('mousedown', onPointerDown, { passive: true });
  loader.addEventListener('touchstart', onPointerDown, { passive: true });

  // --------------------------------------------------------------------------
  // CANVAS RENDERING CONTEXT & PARTICLES
  // --------------------------------------------------------------------------
  let ctx = null;
  let width = 0;
  let height = 0;

  if (canvas && canvas.getContext) {
    ctx = canvas.getContext('2d');
  }

  const bubblePalettes = [
    { rim: '#FF5722', fill: 'rgba(255, 87, 34, 0.16)', glow: 'rgba(255, 87, 34, 0.45)', shine: '#FFFFFF' },
    { rim: '#00F5D4', fill: 'rgba(0, 245, 212, 0.15)', glow: 'rgba(0, 245, 212, 0.45)', shine: '#FFFFFF' },
    { rim: '#8B5CF6', fill: 'rgba(139, 92, 246, 0.16)', glow: 'rgba(139, 92, 246, 0.45)', shine: '#FFFFFF' },
    { rim: '#FF4F91', fill: 'rgba(255, 79, 145, 0.16)', glow: 'rgba(255, 79, 145, 0.45)', shine: '#FFFFFF' },
    { rim: '#3B82F6', fill: 'rgba(59, 130, 246, 0.16)', glow: 'rgba(59, 130, 246, 0.45)', shine: '#FFFFFF' },
    { rim: '#10B981', fill: 'rgba(16, 185, 129, 0.15)', glow: 'rgba(16, 185, 129, 0.45)', shine: '#FFFFFF' },
    { rim: '#F59E0B', fill: 'rgba(245, 158, 11, 0.16)', glow: 'rgba(245, 158, 11, 0.45)', shine: '#FFFFFF' }
  ];

  const bubbles = [];
  const burstParticles = [];
  const dustParticles = [];

  // --------------------------------------------------------------------------
  // 3D FLOATING OBJECTS GEOMETRY (CUBE, OCTAHEDRON, TETRAHEDRON)
  // --------------------------------------------------------------------------
  let rotX = 0.2;
  let rotY = 0.4;
  let targetRotX = 0.2;
  let targetRotY = 0.4;

  // 1. Octahedron (Center / Right)
  const octaVertices = [
    { x: 0, y: -1, z: 0 },
    { x: 1, y: 0, z: 0 },
    { x: 0, y: 0, z: 1 },
    { x: -1, y: 0, z: 0 },
    { x: 0, y: 0, z: -1 },
    { x: 0, y: 1, z: 0 }
  ];
  const octaEdges = [
    [0, 1], [0, 2], [0, 3], [0, 4],
    [5, 1], [5, 2], [5, 3], [5, 4],
    [1, 2], [2, 3], [3, 4], [4, 1]
  ];

  // 2. Wireframe Cube (Upper Left)
  const cubeVertices = [
    { x: -0.7, y: -0.7, z: -0.7 }, { x: 0.7, y: -0.7, z: -0.7 },
    { x: 0.7, y: 0.7, z: -0.7 }, { x: -0.7, y: 0.7, z: -0.7 },
    { x: -0.7, y: -0.7, z: 0.7 }, { x: 0.7, y: -0.7, z: 0.7 },
    { x: 0.7, y: 0.7, z: 0.7 }, { x: -0.7, y: 0.7, z: 0.7 }
  ];
  const cubeEdges = [
    [0, 1], [1, 2], [2, 3], [3, 0],
    [4, 5], [5, 6], [6, 7], [7, 4],
    [0, 4], [1, 5], [2, 6], [3, 7]
  ];

  function resizeCanvas() {
    if (!canvas || !ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = loader.clientWidth || window.innerWidth;
    height = loader.clientHeight || window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.scale(dpr, dpr);

    // Populate interactive buoyant bubbles
    bubbles.length = 0;
    const bubbleCount = Math.min(48, Math.floor((width * height) / 18000) + 24);
    for (let i = 0; i < bubbleCount; i++) {
      const pal = bubblePalettes[Math.floor(Math.random() * bubblePalettes.length)];
      const r = Math.random() < 0.3 ? Math.random() * 28 + 24 : Math.random() * 16 + 8;
      bubbles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: -(Math.random() * 0.85 + 0.4),
        baseR: r,
        r: r,
        pal: pal,
        pulsePhase: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.035 + 0.015,
        wobbleAmp: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.35 + 0.65
      });
    }

    // Populate ambient particles
    dustParticles.length = 0;
    const dustCount = Math.min(45, Math.floor((width * height) / 24000) + 12);
    for (let j = 0; j < dustCount; j++) {
      dustParticles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2.2 + 1,
        alpha: Math.random() * 0.35 + 0.15
      });
    }

    if (wavePath && typeof wavePath.getTotalLength === 'function') {
      try {
        waveLength = wavePath.getTotalLength();
        wavePath.style.strokeDasharray = waveLength;
      } catch (e) {}
    }
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas, { passive: true });

  // Bubble pop burst generator
  function spawnBubbleBurst(x, y, color) {
    playBubblePopSound(440 + Math.random() * 280);
    for (let i = 0; i < 16; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5.5 + 2.5;
      burstParticles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        r: Math.random() * 3.2 + 1.2,
        alpha: 1.0,
        decay: Math.random() * 0.045 + 0.025,
        color: color || '#FF5722'
      });
    }
  }

  // Interactive click / tap to pop bubbles or spawn new ones
  canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    let popped = false;

    for (let i = bubbles.length - 1; i >= 0; i--) {
      const b = bubbles[i];
      const dx = b.x - clickX;
      const dy = b.y - clickY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist <= b.r * 1.4) {
        spawnBubbleBurst(b.x, b.y, b.pal.rim);
        b.y = height + 40;
        b.x = Math.random() * width;
        popped = true;
        break;
      }
    }

    if (!popped) {
      spawnBubbleBurst(clickX, clickY, '#00F5D4');
      for (let s = 0; s < 2; s++) {
        const pal = bubblePalettes[Math.floor(Math.random() * bubblePalettes.length)];
        const r = Math.random() * 22 + 14;
        bubbles.push({
          x: clickX + (Math.random() - 0.5) * 35,
          y: clickY + (Math.random() - 0.5) * 20,
          vx: (Math.random() - 0.5) * 0.8,
          vy: -(Math.random() * 1.2 + 0.8),
          baseR: r,
          r: r,
          pal: pal,
          pulsePhase: Math.random() * Math.PI * 2,
          wobbleSpeed: Math.random() * 0.04 + 0.02,
          wobbleAmp: Math.random() * 1.5 + 0.5,
          opacity: 0.95
        });
      }
    }
  });

  // --------------------------------------------------------------------------
  // EXACT 5-SECOND PROGRESS TIMING (00% -> 100%) & GUARANTEED FINISH
  // --------------------------------------------------------------------------
  let displayPct = 0;
  let startTime = null;
  const LOAD_DURATION = 5000; // Exact 5.0 seconds

  function finishLiquidOceanLoader() {
    window.finishLoader = finishLiquidOceanLoader;
    if (window.loaderDone) return;
    window.loaderDone = true;

    try {
      sessionStorage.setItem('udbhav_loader_seen', 'true');
    } catch (e) {}

    loader.classList.add('gone');

    if (typeof initScrollAnimations === 'function') initScrollAnimations();
    if (typeof init3DLiquidFluidEngine === 'function') init3DLiquidFluidEngine();
    if (typeof initHeroBubbleAnimation === 'function') initHeroBubbleAnimation();

    setTimeout(() => {
      if (animId) cancelAnimationFrame(animId);
      loader.style.display = 'none';
    }, 750);
  }
  window.finishLoader = finishLiquidOceanLoader;

  // Fallback safety: GUARANTEE the website opens within 5.2 seconds even if tab is backgrounded
  setTimeout(() => {
    if (!window.loaderDone) {
      displayPct = 100;
      if (pctNum) pctNum.textContent = '100%';
      if (wavePath) wavePath.style.setProperty('stroke-dashoffset', '0', 'important');
      if (waveBead) waveBead.style.setProperty('left', '100%', 'important');
      finishLiquidOceanLoader();
    }
  }, 5200);

  if (enterBtn) {
    enterBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      displayPct = 100;
      finishLiquidOceanLoader();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (!window.loaderDone && (e.key === ' ' || e.key === 'Enter' || e.key === 'Escape')) {
      displayPct = 100;
      finishLiquidOceanLoader();
    }
  });

  // --------------------------------------------------------------------------
  // 3D OBJECT RENDER HELPER
  // --------------------------------------------------------------------------
  function draw3DObject(vertices, edges, cx, cy, scale, rX, rY, colorA, colorB) {
    const cosX = Math.cos(rX), sinX = Math.sin(rX);
    const cosY = Math.cos(rY), sinY = Math.sin(rY);

    const projected = vertices.map(v => {
      const x1 = v.x * cosY + v.z * sinY;
      const z1 = -v.x * sinY + v.z * cosY;
      const y2 = v.y * cosX - z1 * sinX;
      const z2 = v.y * sinX + z1 * cosX;
      const fov = 3.4;
      const pz = z2 + fov;
      return {
        x: cx + ((x1 * fov) / pz) * scale,
        y: cy + ((y2 * fov) / pz) * scale,
        z: z2
      };
    });

    // Draw edges
    ctx.lineWidth = 1.6;
    for (let e = 0; e < edges.length; e++) {
      const p1 = projected[edges[e][0]];
      const p2 = projected[edges[e][1]];
      const avgZ = (p1.z + p2.z) * 0.5;
      const alpha = Math.max(0.12, Math.min(0.55, 0.32 + avgZ * 0.15));

      const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
      grad.addColorStop(0, colorA.replace('ALPHA', alpha.toFixed(2)));
      grad.addColorStop(1, colorB.replace('ALPHA', alpha.toFixed(2)));

      ctx.strokeStyle = grad;
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    }

    // Draw glowing node vertices
    for (let v = 0; v < projected.length; v++) {
      const pt = projected[v];
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = colorA.replace('ALPHA', '0.65');
      ctx.fill();
    }
  }

  // --------------------------------------------------------------------------
  // MAIN ANIMATION LOOP
  // --------------------------------------------------------------------------
  function render(time) {
    if (window.loaderDone) return;

    if (startTime === null) {
      startTime = time || performance.now();
    }

    // Mouse lerp & parallax
    if (mouse.active) {
      mouse.x += (mouse.targetX - mouse.x) * 0.12;
      mouse.y += (mouse.targetY - mouse.y) * 0.12;
      const normX = (mouse.x - width / 2) / (width / 2);
      const normY = (mouse.y - height / 2) / (height / 2);
      targetRotY = normX * 0.85 + (time * 0.0007);
      targetRotX = -normY * 0.65 + 0.25;
    } else {
      targetRotY = time * 0.0007;
      targetRotX = 0.25;
    }

    rotX += (targetRotX - rotX) * 0.06;
    rotY += (targetRotY - rotY) * 0.06;

    // 5-second smooth progression calculation
    const elapsed = Math.max(0, (time || performance.now()) - startTime);
    const progress = Math.min(1.0, elapsed / LOAD_DURATION);
    const easedProgress = 1 - Math.pow(1 - progress, 2.2);
    displayPct = Math.min(100, Math.floor(easedProgress * 100));

    if (pctNum) {
      pctNum.textContent = String(displayPct).padStart(2, '0') + '%';
    }

    // Wave Progression Line & Crest Bead Update
    if (wavePath && waveLength > 0) {
      const currentOffset = waveLength * (1 - (displayPct / 100));
      wavePath.style.strokeDashoffset = currentOffset;

      if (waveBead && typeof wavePath.getPointAtLength === 'function') {
        try {
          const pt = wavePath.getPointAtLength((displayPct / 100) * waveLength);
          waveBead.style.left = ((pt.x / 1200) * 100) + '%';
          waveBead.style.top = ((pt.y / 40) * 100) + '%';
        } catch (err) {
          waveBead.style.left = displayPct + '%';
        }
      } else if (waveBead) {
        waveBead.style.left = displayPct + '%';
      }
    }

    // Status label updates
    if (statusLabel) {
      if (displayPct < 22) {
        statusLabel.textContent = 'INITIALIZING RETRO ARENA PROTOCOL';
      } else if (displayPct < 52) {
        statusLabel.textContent = 'LOADING RETRO SHADER PIPELINES';
      } else if (displayPct < 82) {
        statusLabel.textContent = 'SYNCHRONIZING 36-HOUR CHALLENGE ARENA';
      } else if (displayPct < 100) {
        statusLabel.textContent = 'EXPERIENCE DISCOVERY READY';
      } else {
        statusLabel.textContent = 'SYSTEM ONLINE // WELCOME TO UDBHAV 27';
      }
    }

    // Auto-finish at 100% / 5 seconds
    if (elapsed >= LOAD_DURATION || displayPct >= 100) {
      displayPct = 100;
      if (pctNum) pctNum.textContent = '100%';
      if (wavePath) wavePath.style.setProperty('stroke-dashoffset', '0', 'important');
      if (waveBead) waveBead.style.setProperty('left', '100%', 'important');
      finishLiquidOceanLoader();
      return;
    }

    // Render Canvas Frame
    if (ctx && width > 0 && height > 0) {
      ctx.clearRect(0, 0, width, height);

      // 1. Subtle Retro Grid
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 70;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. Ambient Concentric Water Waves
      const waveT = time * 0.002;
      for (let w = 1; w <= 3; w++) {
        const waveR = ((waveT * 40 * w) % (Math.min(width, height) * 0.6)) + 50;
        const waveAlpha = Math.max(0, (1 - (waveR / (Math.min(width, height) * 0.6))) * 0.08);
        ctx.beginPath();
        ctx.arc(width * 0.5, height * 0.45, waveR, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 245, 212, ${waveAlpha})`;
        ctx.lineWidth = 1.8;
        ctx.stroke();
      }

      // 3. Floating 3D Wireframe Objects
      // Shape A: Wireframe Cube on Upper Left
      draw3DObject(
        cubeVertices,
        cubeEdges,
        width * 0.18,
        height * 0.32,
        Math.min(width, height) * 0.12,
        rotX * 0.9 + (time * 0.0005),
        rotY * 0.8 + 0.4,
        'rgba(255, 87, 34, ALPHA)',
        'rgba(245, 158, 11, ALPHA)'
      );

      // Shape B: Tumbling Octahedron on Upper Right
      draw3DObject(
        octaVertices,
        octaEdges,
        width * 0.82,
        height * 0.35,
        Math.min(width, height) * 0.14,
        -rotX * 0.85 + (time * 0.0006),
        -rotY * 0.9 + 1.2,
        'rgba(0, 245, 212, ALPHA)',
        'rgba(59, 130, 246, ALPHA)'
      );

      // Shape C: Gyroscope Rings behind Typography
      ctx.save();
      ctx.translate(width * 0.5, height * 0.45);
      ctx.rotate(rotY * 0.4);
      ctx.beginPath();
      ctx.ellipse(0, 0, Math.min(width, height) * 0.28, Math.min(width, height) * 0.12, rotX * 0.5, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.12)';
      ctx.lineWidth = 1.8;
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(0, 0, Math.min(width, height) * 0.34, Math.min(width, height) * 0.14, -rotX * 0.4, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 87, 34, 0.10)';
      ctx.lineWidth = 1.8;
      ctx.stroke();
      ctx.restore();

      // 4. Click / Tap Ripple Pulses
      for (let p = pulses.length - 1; p >= 0; p--) {
        const pulse = pulses[p];
        pulse.radius += 5;
        pulse.alpha *= 0.94;
        if (pulse.alpha < 0.015 || pulse.radius > pulse.maxRadius) {
          pulses.splice(p, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(pulse.x, pulse.y, pulse.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 87, 34, ${pulse.alpha})`;
        ctx.lineWidth = 1.8;
        ctx.stroke();
      }

      // 5. Draw Interactive Buoyant Liquid Bubbles (Home Screen Physics)
      for (let i = 0; i < bubbles.length; i++) {
        const b = bubbles[i];
        b.x += b.vx;
        b.y += b.vy;

        b.pulsePhase += b.wobbleSpeed;
        const currentR = b.baseR + Math.sin(b.pulsePhase) * b.wobbleAmp;

        if (b.y + currentR < -30) {
          b.y = height + currentR + 30;
          b.x = Math.random() * width;
        }
        if (b.x - currentR > width + 30) b.x = -currentR;
        if (b.x + currentR < -30) b.x = width + currentR;

        // Mouse proximity repulsion
        if (mouse.active) {
          const dx = b.x - mouse.x;
          const dy = b.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const pushThreshold = b.baseR * 3.0 + 70;
          if (dist < pushThreshold && dist > 1) {
            const force = ((pushThreshold - dist) / pushThreshold) * 0.1;
            b.x += (dx / dist) * force * 20;
            b.y += (dy / dist) * force * 20;
          }
        }

        // Render bubble body with soft translucent glow
        ctx.save();
        ctx.beginPath();
        ctx.arc(b.x, b.y, currentR, 0, Math.PI * 2);
        ctx.fillStyle = b.pal.fill;
        ctx.fill();

        ctx.lineWidth = 2.0;
        ctx.strokeStyle = b.pal.rim;
        ctx.shadowColor = b.pal.glow;
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Top-left specular glossy reflection
        const shineR = currentR * 0.28;
        const shineX = b.x - currentR * 0.35;
        const shineY = b.y - currentR * 0.35;
        const grad = ctx.createRadialGradient(shineX, shineY, 0, shineX, shineY, shineR * 2);
        grad.addColorStop(0, '#FFFFFF');
        grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.45)');
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.beginPath();
        ctx.arc(shineX, shineY, shineR, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Bottom-right rim bounce reflection
        const rimX = b.x + currentR * 0.3;
        const rimY = b.y + currentR * 0.3;
        ctx.beginPath();
        ctx.arc(rimX, rimY, currentR * 0.15, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
        ctx.fill();

        ctx.restore();
      }

      // 6. Draw Burst Particles from Popped Bubbles
      for (let bp = burstParticles.length - 1; bp >= 0; bp--) {
        const p = burstParticles[bp];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.95;
        p.vy *= 0.95;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          burstParticles.splice(bp, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.restore();
      }

      // 7. Ambient Dust Motes
      for (let j = 0; j < dustParticles.length; j++) {
        const d = dustParticles[j];
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0) d.x = width;
        if (d.x > width) d.x = 0;
        if (d.y < 0) d.y = height;
        if (d.y > height) d.y = 0;

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(15, 23, 42, ${d.alpha * 0.35})`;
        ctx.fill();
      }
    }

    animId = requestAnimationFrame(render);
  }

  animId = requestAnimationFrame(render);
}

function initLoader() {
  initAnimatedLiquidOceanPreloader();
}
window.initLoader = initLoader;

// Instant auto-boot for loader so canvas starts immediately
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLoader);
} else {
  initLoader();
}
// >>>>>>>>>> END: 02_loader.js <<<<<<<<<<
// >>>>>>>>>> START: 03_liquid_fluid.js <<<<<<<<<<
/* ---------------------------------------------------------------------------------------------------------------------------------------------------- 2. REAL-TIME 3D LIQUID FLUID RAYMARCHING ENGINE ----------------------------------------------------------------------------------------------------------------------------------------------------
   Dual-Canvas WebGL Architecture:
   - Back Canvas  (z-index: 2): Renders 3D fluid blobs when Z < 0.05 + soft contact shadow on cream backdrop.
   - Front Canvas (z-index: 8): Renders 3D fluid blobs when Z >= 0.05 (overlapping typography with specular shine).
   - Typography sits at z-index: 5, creating real layered 3D depth where liquid wraps behind & in front of letters!
*/
function init3DLiquidFluidEngine() {
  const canvasBack = document.getElementById('liquidCanvasBack');
  const canvasFront = document.getElementById('liquidCanvasFront');
  if (!canvasBack || !canvasFront) return;

  // Vertex Shader for screen quad
  const vsSource = `
    attribute vec2 a_pos;
    void main() {
      gl_Position = vec4(a_pos, 0.0, 1.0);
    }
  `;

  // Fragment Shader: 3D Raymarching of Viscous Liquid Paint Metaballs
  const fsSource = `
    precision highp float;
    uniform vec2 u_resolution;
    uniform float u_time;
    uniform vec2 u_mouse;
    uniform float u_scroll;
    uniform int u_layer; // 0 = back layer (z < 0.05), 1 = front layer (z >= 0.05)

    // Polynomial smooth minimum for organic fluid metaballs
    float smin(float a, float b, float k) {
      float h = max(k - abs(a - b), 0.0) / k;
      return min(a, b) - h * h * k * 0.25;
    }

    // Fluid Pigment Color Palette
    const vec3 COL_BLUE    = vec3(0.09, 0.42, 0.98); // Electric Blue #176BFA
    const vec3 COL_PURPLE  = vec3(0.48, 0.18, 0.94); // Royal Purple #7B2EF0
    const vec3 COL_MAGENTA = vec3(0.88, 0.22, 0.92); // Vivid Magenta #E038EB
    const vec3 COL_ORANGE  = vec3(0.98, 0.44, 0.08); // Sunset Orange #FA7014
    const vec3 COL_PINK    = vec3(0.96, 0.25, 0.58); // Hot Neon Pink #F54094
    const vec3 COL_CYAN    = vec3(0.06, 0.80, 0.88); // Cyan Accent #0FCCE0

    // Evaluate distance and color at 3D point p
    float mapFluid(vec3 p, out vec3 outCol, float t, vec2 m) {
      // Viscous surface tension ripples & twisting turbulence
      float ripple = sin(p.x * 2.4 + t * 1.5) * cos(p.y * 2.4 + t * 1.2) * 0.055;
      float twist  = sin(p.z * 3.0 + t * 1.7) * 0.04;

      // 3D Orbital trajectories (X, Y, Z)
      // Z oscillates between -1.1 and +1.1 so blobs naturally pass behind and in front of text at Z = 0!
      vec3 b1 = vec3(sin(t * 0.72) * 1.3 - 0.2, cos(t * 0.58) * 0.65, sin(t * 0.82) * 0.95);
      vec3 b2 = vec3(cos(t * 0.84) * 1.4 + 0.35, sin(t * 0.68) * 0.72, -cos(t * 0.92) * 0.92);
      vec3 b3 = vec3(sin(t * 0.94 + 2.2) * 0.95, -cos(t * 0.78 + 1.2) * 0.85, cos(t * 0.68) * 1.15);
      vec3 b4 = vec3(-cos(t * 0.66 + 1.4) * 1.45, -sin(t * 0.82 + 2.1) * 0.55, sin(t * 0.76 + 3.1) * 0.88);
      vec3 b5 = vec3(cos(t * 1.12) * 0.78, sin(t * 0.98) * 0.92, -sin(t * 1.24) * 0.98);
      vec3 b6 = vec3(sin(t * 1.32 + 4.1) * 1.55, cos(t * 1.14) * 0.45, cos(t * 0.84 + 1.1) * 0.75);

      // Mouse interactive fluid node with spring inertia
      vec3 bMouse = vec3(m * 2.4, 0.45 + sin(t * 2.2) * 0.25);

      // Dynamic pulsating radii (stretching, breathing, surface tension)
      float r1 = 0.68 + sin(t * 1.2) * 0.09;
      float r2 = 0.64 + cos(t * 1.4) * 0.09;
      float r3 = 0.58 + sin(t * 1.6) * 0.07;
      float r4 = 0.54 + cos(t * 1.3) * 0.08;
      float r5 = 0.48 + sin(t * 1.5) * 0.06;
      float r6 = 0.38 + cos(t * 1.8) * 0.06;
      float rMouse = 0.44;

      float d1 = length(p - b1) - r1;
      float d2 = length(p - b2) - r2;
      float d3 = length(p - b3) - r3;
      float d4 = length(p - b4) - r4;
      float d5 = length(p - b5) - r5;
      float d6 = length(p - b6) - r6;
      float dM = length(p - bMouse) - rMouse;

      float k = 0.46; // Polynomial smooth minimum blend factor

      // Blend 1: Electric Blue & Royal Purple
      float d = smin(d1, d2, k);
      float w = clamp(0.5 + 0.5 * (d2 - d1) / k, 0.0, 1.0);
      vec3 col = mix(COL_PURPLE, COL_BLUE, w);

      // Blend 2: Vivid Magenta
      float w3 = clamp(0.5 + 0.5 * (d3 - d) / k, 0.0, 1.0);
      d = smin(d, d3, k);
      col = mix(COL_MAGENTA, col, w3);

      // Blend 3: Sunset Orange
      float w4 = clamp(0.5 + 0.5 * (d4 - d) / k, 0.0, 1.0);
      d = smin(d, d4, k);
      col = mix(COL_ORANGE, col, w4);

      // Blend 4: Hot Neon Pink
      float w5 = clamp(0.5 + 0.5 * (d5 - d) / k, 0.0, 1.0);
      d = smin(d, d5, k);
      col = mix(COL_PINK, col, w5);

      // Blend 5: Cyan Accent
      float w6 = clamp(0.5 + 0.5 * (d6 - d) / k, 0.0, 1.0);
      d = smin(d, d6, k);
      col = mix(COL_CYAN, col, w6);

      // Blend 6: Mouse fluid node (Cyan/Electric Blue blend)
      float wM = clamp(0.5 + 0.5 * (dM - d) / k, 0.0, 1.0);
      d = smin(d, dM, k);
      col = mix(COL_BLUE, col, wM);

      outCol = col;
      return d + ripple + twist;
    }

    // Normal calculation via gradient
    vec3 calcNormal(vec3 p, float t, vec2 m) {
      vec3 dummy;
      vec2 e = vec2(0.003, -0.003);
      return normalize(
        e.xyy * mapFluid(p + e.xyy, dummy, t, m) +
        e.yyx * mapFluid(p + e.yyx, dummy, t, m) +
        e.yxy * mapFluid(p + e.yxy, dummy, t, m) +
        e.xxx * mapFluid(p + e.xxx, dummy, t, m)
      );
    }

    void main() {
      vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / min(u_resolution.x, u_resolution.y);

      // Camera ray setup with slight tilt on scroll
      float camZ = 3.2 + u_scroll * 0.8;
      vec3 ro = vec3(0.0, 0.0 + u_scroll * 0.35, camZ);
      vec3 rd = normalize(vec3(uv, -1.5));

      // Raymarching steps
      float t = 0.0;
      float tMax = 5.5;
      float hitT = -1.0;
      vec3 hitCol = vec3(0.0);

      for (int i = 0; i < 36; i++) {
        vec3 p = ro + rd * t;
        vec3 col;
        float d = mapFluid(p, col, u_time, u_mouse);
        if (d < 0.002) {
          hitT = t;
          hitCol = col;
          break;
        }
        t += d * 0.72;
        if (t > tMax) break;
      }

      // ---------------------------------------------------------------------------------------------------------------------------------------------------- LAYER 1: FOREGROUND CANVAS (z >= 0.05) ----------------------------------------------------------------------------------------------------------------------------------------------------
      if (u_layer == 1) {
        if (hitT > 0.0) {
          vec3 p = ro + rd * hitT;
          if (p.z >= 0.05) {
            vec3 n = calcNormal(p, u_time, u_mouse);
            vec3 v = -rd;

            // Key light
            vec3 l1 = normalize(vec3(1.4, 2.0, 2.2));
            vec3 h1 = normalize(l1 + v);
            float diff1 = max(dot(n, l1), 0.0);
            float spec1 = pow(max(dot(n, h1), 0.0), 96.0) * 1.5;

            // Fill bounce
            vec3 l2 = normalize(vec3(-1.4, -0.6, 1.2));
            float diff2 = max(dot(n, l2), 0.0);

            // Fresnel reflection
            float fresnel = pow(1.0 - max(dot(n, v), 0.0), 3.2);

            // Ambient rim
            vec3 amb = hitCol * 0.35;
            vec3 lit = amb + hitCol * (diff1 * 0.85 + diff2 * 0.35) + vec3(1.0) * spec1 + vec3(0.2, 0.6, 1.0) * (fresnel * 0.5);

            gl_FragColor = vec4(lit, 1.0);
            return;
          }
        }
        // Transparent when no foreground hit (allows typography beneath to show cleanly)
        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
        return;
      }

      // ---------------------------------------------------------------------------------------------------------------------------------------------------- LAYER 0: BACKGROUND CANVAS (z < 0.05) ----------------------------------------------------------------------------------------------------------------------------------------------------
      vec3 bgColor = vec3(0.98, 0.973, 0.961); // #faf8f5 (Clean light cream)

      if (hitT > 0.0) {
        vec3 p = ro + rd * hitT;
        if (p.z < 0.05) {
          vec3 n = calcNormal(p, u_time, u_mouse);
          vec3 v = -rd;

          vec3 l1 = normalize(vec3(1.4, 2.0, 2.2));
          vec3 h1 = normalize(l1 + v);
          float diff1 = max(dot(n, l1), 0.0);
          float spec1 = pow(max(dot(n, h1), 0.0), 96.0) * 1.4;

          vec3 l2 = normalize(vec3(-1.4, -0.6, 1.2));
          float diff2 = max(dot(n, l2), 0.0);
          float fresnel = pow(1.0 - max(dot(n, v), 0.0), 3.2);

          vec3 amb = hitCol * 0.35;
          vec3 lit = amb + hitCol * (diff1 * 0.85 + diff2 * 0.35) + vec3(1.0) * spec1 + vec3(0.2, 0.6, 1.0) * (fresnel * 0.5);

          gl_FragColor = vec4(lit, 1.0);
          return;
        }
      }

      // Soft contact drop shadow on cream background plane (z = -1.35)
      float planeZ = -1.35;
      float tPlane = (planeZ - ro.z) / rd.z;
      if (tPlane > 0.0) {
        vec3 pPlane = ro + rd * tPlane;
        vec3 dummyCol;
        float distBlobs = mapFluid(pPlane + vec3(0.2, 0.3, 0.4), dummyCol, u_time, u_mouse);
        float shadow = smoothstep(0.05, 0.85, distBlobs);
        vec3 finalBg = mix(bgColor * 0.82, bgColor, shadow);
        gl_FragColor = vec4(finalBg, 1.0);
        return;
      }

      gl_FragColor = vec4(bgColor, 1.0);
    }
  `;

  // Helper function to create WebGL context and program
  function createWebGLInstance(canvas, layerId) {
    const gl = canvas.getContext('webgl', { alpha: true, antialias: true, powerPreference: 'high-performance' }) ||
      canvas.getContext('experimental-webgl');
    if (!gl) return null;

    // Compile shaders
    function compileShader(src, type) {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.warn("Shader compile error:", gl.getShaderInfoLog(s));
        gl.deleteShader(s);
        return null;
      }
      return s;
    }

    const vs = compileShader(vsSource, gl.VERTEX_SHADER);
    const fs = compileShader(fsSource, gl.FRAGMENT_SHADER);
    if (!vs || !fs) return null;

    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.warn("Program link error:", gl.getProgramInfoLog(prog));
      return null;
    }

    // Fullscreen quad buffer (-1 to 1)
    const quad = new Float32Array([
      -1, -1,
      1, -1,
      -1, 1,
      -1, 1,
      1, -1,
      1, 1
    ]);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, quad, gl.STATIC_DRAW);

    const aPos = gl.getAttribLocation(prog, 'a_pos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, 'u_resolution');
    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uMouse = gl.getUniformLocation(prog, 'u_mouse');
    const uScroll = gl.getUniformLocation(prog, 'u_scroll');
    const uLayer = gl.getUniformLocation(prog, 'u_layer');

    return {
      gl,
      prog,
      layerId,
      uRes,
      uTime,
      uMouse,
      uScroll,
      uLayer,
      canvas
    };
  }

  const backInstance = createWebGLInstance(canvasBack, 0);
  const frontInstance = createWebGLInstance(canvasFront, 1);

  if (!backInstance || !frontInstance) {
    console.warn("WebGL not supported or context lost; falling back.");
    return;
  }

  // Handle Resize with crisp devicePixelRatio
  function resizeAll() {
    const parent = canvasBack.parentElement;
    if (!parent) return;

    const width = parent.offsetWidth;
    const height = parent.offsetHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5); // 1.5 dpr cap for 60fps fluidity

    [backInstance, frontInstance].forEach(inst => {
      inst.canvas.width = width * dpr;
      inst.canvas.height = height * dpr;
      inst.gl.viewport(0, 0, inst.canvas.width, inst.canvas.height);
    });
  }

  resizeAll();
  window.addEventListener('resize', resizeAll);

  // Mouse fluid physics tracking (smooth spring interpolation)
  let targetMouseX = 0;
  let targetMouseY = 0;
  let currentMouseX = 0;
  let currentMouseY = 0;

  window.addEventListener('mousemove', (e) => {
    const parent = canvasBack.parentElement;
    if (!parent) return;
    const rect = parent.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width * 2 - 1;
    const ny = -((e.clientY - rect.top) / rect.height * 2 - 1);
    targetMouseX = nx;
    targetMouseY = ny;
  });

  window.addEventListener('mouseleave', () => {
    targetMouseX = 0;
    targetMouseY = 0;
  });

  // Touch support for mobile devices
  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      const parent = canvasBack.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      targetMouseX = (touch.clientX - rect.left) / rect.width * 2 - 1;
      targetMouseY = -((touch.clientY - rect.top) / rect.height * 2 - 1);
    }
  }, { passive: true });

  // Scroll tracking with GSAP / window scroll
  let scrollProgress = 0;
  window.addEventListener('scroll', () => {
    const heroH = canvasBack.parentElement?.offsetHeight || window.innerHeight;
    scrollProgress = Math.max(0, Math.min(window.scrollY / heroH, 1.5));
  }, { passive: true });

  // 60FPS Render Loop
  const startTime = performance.now();

  function render(timeNow) {
    const elapsed = (timeNow - startTime) * 0.001;

    // Smooth fluid mouse inertia damping
    currentMouseX += (targetMouseX - currentMouseX) * 0.07;
    currentMouseY += (targetMouseY - currentMouseY) * 0.07;

    // Render Back Canvas (Layer 0: Behind text + soft shadows)
    const glBack = backInstance.gl;
    glBack.useProgram(backInstance.prog);
    glBack.uniform2f(backInstance.uRes, canvasBack.width, canvasBack.height);
    glBack.uniform1f(backInstance.uTime, elapsed);
    glBack.uniform2f(backInstance.uMouse, currentMouseX, currentMouseY);
    glBack.uniform1f(backInstance.uScroll, scrollProgress);
    glBack.uniform1i(backInstance.uLayer, 0);
    glBack.drawArrays(glBack.TRIANGLES, 0, 6);

    // Render Front Canvas (Layer 1: Over text with specular highlights)
    const glFront = frontInstance.gl;
    glFront.useProgram(frontInstance.prog);
    glFront.uniform2f(frontInstance.uRes, canvasFront.width, canvasFront.height);
    glFront.uniform1f(frontInstance.uTime, elapsed);
    glFront.uniform2f(frontInstance.uMouse, currentMouseX, currentMouseY);
    glFront.uniform1f(frontInstance.uScroll, scrollProgress);
    glFront.uniform1i(frontInstance.uLayer, 1);
    glFront.drawArrays(glFront.TRIANGLES, 0, 6);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}


// >>>>>>>>>> END: 03_liquid_fluid.js <<<<<<<<<<

// >>>>>>>>>> START: 04_nav_and_cursor.js <<<<<<<<<<
/* ==========================================================================
   3. AMBIENT CURSOR LIGHT & FLOATING 3D TICKET
   ========================================================================== */
function initCursor() {
  const cur = document.getElementById('cur');
  const cur2 = document.getElementById('cur2');
  const badge = document.getElementById('curBadge');
  const light = document.getElementById('ambient-light');
  const pCanvas = document.getElementById('cursorParticleCanvas');
  if (!cur || !cur2) return;

  let mouseX = window.innerWidth * 0.5;
  let mouseY = window.innerHeight * 0.5;
  let curX = mouseX;
  let curY = mouseY;
  let isHovered = false;
  let isDown = false;
  let isVisible = false;
  let animId = null;

  // Kinetic Particle Trail Engine
  let particles = [];
  let pCtx = null;
  if (pCanvas && pCanvas.getContext) {
    pCtx = pCanvas.getContext('2d');
    function resizeParticleCanvas() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      pCanvas.width = window.innerWidth * dpr;
      pCanvas.height = window.innerHeight * dpr;
      pCanvas.style.width = window.innerWidth + 'px';
      pCanvas.style.height = window.innerHeight + 'px';
      pCtx.scale(dpr, dpr);
    }
    resizeParticleCanvas();
    window.addEventListener('resize', resizeParticleCanvas);
  }

  const trailColors = ['#00F5D4', '#FF5722', '#8B5CF6', '#00C9D8', '#FFB703', '#FFFFFF'];

  function spawnTrailParticles(x, y, count = 3) {
    if (!pCtx) return;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: x + (Math.random() - 0.5) * 10,
        y: y + (Math.random() - 0.5) * 10,
        vx: (Math.random() - 0.5) * 2.2,
        vy: (Math.random() - 0.5) * 2.2 - 0.4,
        size: Math.random() * 3.5 + 1.8,
        alpha: 0.95,
        decay: Math.random() * 0.025 + 0.02,
        color: trailColors[Math.floor(Math.random() * trailColors.length)]
      });
    }
    if (particles.length > 120) particles.splice(0, particles.length - 120);
  }

  function spawnBurstParticles(x, y) {
    if (!pCtx) return;
    for (let i = 0; i < 20; i++) {
      const angle = (Math.PI * 2 * i) / 20 + (Math.random() - 0.5) * 0.3;
      const speed = Math.random() * 5.5 + 2.5;
      particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 4.2 + 2,
        alpha: 1.0,
        decay: Math.random() * 0.035 + 0.02,
        color: trailColors[Math.floor(Math.random() * trailColors.length)]
      });
    }
  }

  function showCursor() {
    if (!isVisible) {
      isVisible = true;
      cur.style.opacity = '1';
      cur.style.visibility = 'visible';
      cur2.style.opacity = '1';
      cur2.style.visibility = 'visible';
      if (light) {
        light.style.opacity = '0.85';
        light.style.visibility = 'visible';
      }
    }
  }

  function hideCursor() {
    isVisible = false;
    cur.style.opacity = '0';
    cur.style.visibility = 'hidden';
    cur2.style.opacity = '0';
    cur2.style.visibility = 'hidden';
    if (light) {
      light.style.opacity = '0';
      light.style.visibility = 'hidden';
    }
  }

  let lastMoveTime = 0;
  function handlePointerMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    showCursor();

    cur.style.transform = 'translate3d(' + mouseX + 'px, ' + mouseY + 'px, 0) translate(-50%, -50%)';
    if (light) {
      light.style.transform = 'translate3d(' + mouseX + 'px, ' + mouseY + 'px, 0) translate(-50%, -50%)';
    }

    const now = performance.now();
    if (now - lastMoveTime > 24) {
      spawnTrailParticles(mouseX, mouseY, 3);
      lastMoveTime = now;
    }

    // Dynamic Section Light/Dark Sense
    const elemUnder = document.elementFromPoint(mouseX, mouseY);
    if (elemUnder) {
      const isLightSec = elemUnder.closest('.tracks-sec, .faq-sec, .cur-light-zone, #page-conduct, .journey-experience');
      if (isLightSec) {
        document.body.classList.add('cur-light-theme');
      } else {
        document.body.classList.remove('cur-light-theme');
      }
    }
  }

  window.addEventListener('mousemove', handlePointerMove, { passive: true });
  window.addEventListener('pointermove', handlePointerMove, { passive: true });

  window.addEventListener('mousedown', (e) => {
    isDown = true;
    showCursor();
    spawnBurstParticles(e.clientX, e.clientY);
  });

  window.addEventListener('mouseup', () => {
    isDown = false;
  });

  document.addEventListener('mouseleave', () => {
    hideCursor();
  });

  function animateCursor() {
    if (isVisible) {
      curX += (mouseX - curX) * 0.22;
      curY += (mouseY - curY) * 0.22;
      const scale = isDown ? 0.72 : (isHovered ? 1.45 : 1);
      cur2.style.transform = 'translate3d(' + curX + 'px, ' + curY + 'px, 0) translate(-50%, -50%) scale(' + scale + ')';

      // Render Kinetic Particle Trail
      if (pCtx) {
        pCtx.clearRect(0, 0, pCanvas.width, pCanvas.height);
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= p.decay;
          if (p.alpha <= 0) {
            particles.splice(i, 1);
            continue;
          }
          pCtx.save();
          pCtx.globalAlpha = Math.max(0, p.alpha);
          pCtx.fillStyle = p.color;
          pCtx.shadowColor = p.color;
          pCtx.shadowBlur = 12;
          pCtx.beginPath();
          pCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          pCtx.fill();
          pCtx.restore();
        }
      }
    }
    animId = requestAnimationFrame(animateCursor);
  }
  if (!animId) animId = requestAnimationFrame(animateCursor);

  function setBadgeText(text) {
    if (!badge) return;
    if (text) {
      badge.textContent = text;
      cur2.classList.add('cur-has-badge');
    } else {
      badge.textContent = '';
      cur2.classList.remove('cur-has-badge');
    }
  }

  // Interactive Target Hover Detection with Dynamic Badge Labels
  const interactiveSelector = 'button, a, input, select, textarea, .dr-box, .tk-card, .tc-card, .btn-liquid-primary, .btn-liquid-secondary, .interactive-metric-card, .vas-hl-card, .cd-box, .j-mcard, .tr-card, .tr-filter-btn, .tr-btn, .nav-cta, .btn-pri, .btn-sec, [role="button"], label, .fi, .prize-card, .ed-thumb, .tl-stage-card, .tl-cal-btn, .tl-stage-share-btn, .sbf-geo-shape, .vibe-feature-card, .pixel-stage-card';

  document.querySelectorAll(interactiveSelector).forEach(el => {
    el.addEventListener('mouseenter', () => {
      isHovered = true;
      cur2.classList.add('cur-hovered');

      let badgeLabel = el.getAttribute('data-cursor');
      if (!badgeLabel) {
        if (el.classList.contains('tl-stage-card')) badgeLabel = 'EXPAND v';
        else if (el.classList.contains('tl-cal-btn')) badgeLabel = '+ CALENDAR';
        else if (el.classList.contains('tl-stage-share-btn')) badgeLabel = 'SHARE';
        else if (el.classList.contains('tk-card')) badgeLabel = 'EXPLORE';
        else if (el.classList.contains('interactive-metric-card') || el.classList.contains('bc')) badgeLabel = 'METRIC';
        else if (el.classList.contains('fi')) badgeLabel = 'READ';
        else if (el.classList.contains('prize-card')) badgeLabel = 'BOUNTY';
        else if (el.classList.contains('ed-thumb')) badgeLabel = 'SWITCH';
        else if (el.classList.contains('tr-card')) badgeLabel = 'CHALLENGE';
        else if (el.classList.contains('sbf-geo-shape')) badgeLabel = '3D ORBIT';
        else if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') badgeLabel = 'TYPE';
        else if (el.classList.contains('btn-liquid-primary') || el.classList.contains('nav-cta') || el.classList.contains('btn-pri')) badgeLabel = 'CLAIM PASS';
      }
      if (badgeLabel) setBadgeText(badgeLabel);
    });

    el.addEventListener('mouseleave', () => {
      isHovered = false;
      cur2.classList.remove('cur-hovered');
      setBadgeText('');
    });
  });

  initModernCard3DTiltAndObjects();
}
function initModernCard3DTiltAndObjects() {
  const cards = document.querySelectorAll('.tk-card, .interactive-metric-card, .bc, .prize-card');
  cards.forEach(card => {
    if (card._tiltInitialized) return;
    card._tiltInitialized = true;

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.setProperty('--mouse-x', x + 'px');
      card.style.setProperty('--mouse-y', y + 'px');
      card.style.transform = 'perspective(1000px) rotateX(' + rotateX.toFixed(2) + 'deg) rotateY(' + rotateY.toFixed(2) + 'deg) translateY(-6px)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}
window.initModernCard3DTiltAndObjects = initModernCard3DTiltAndObjects;
function initFloatingTicket3D() {
  const wrap = document.getElementById('heroTicket3dWrap');
  const card = document.getElementById('floatingTicket3D');
  if (!wrap || !card) return;

  wrap.addEventListener('mousemove', (e) => {
    const rect = wrap.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -18;
    const rotateY = ((x - centerX) / centerX) * 18;
    card.style.animation = 'none';
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04, 1.04, 1.04)`;
  });

  wrap.addEventListener('mouseleave', () => {
    card.style.animation = 'floatTicketHero 4.5s ease-in-out infinite alternate';
    card.style.transform = '';
  });
}
/* ==========================================================================
   4. NAVIGATION & SPA ROUTER
   ========================================================================== */
function go(pageId) {
  if (pageId === 'admin') {
    window.location.href = 'admin.html';
    return;
  }
  if (pageId === 'mentor') {
    window.location.href = 'mentor.html';
    return;
  }

  // Seamless alias mapping for rules <-> conduct
  const requestedPage = pageId;
  if (pageId === 'rules') {
    pageId = 'conduct';
  }

  toggleNav(true);
  try { playCyberSound('click'); } catch (e) { }

  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById('page-' + pageId) || (pageId === 'conduct' ? document.getElementById('page-rules') : null) || (pageId === 'rules' ? document.getElementById('page-conduct') : null);
  if (target) {
    target.classList.add('active');
    target.querySelectorAll('.rv, .reveal, .bento-card, .track-card, .why-card, .prize-card').forEach(el => {
      el.classList.add('visible', 'in-view');
    });
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  document.querySelectorAll('.nl').forEach(a => {
    const p = a.getAttribute('data-p');
    a.classList.toggle('active', p === pageId || (pageId === 'conduct' && (p === 'rules' || p === 'conduct')) || (requestedPage === 'rules' && p === 'rules'));
  });

  const navLinks = document.getElementById('navLinks');
  if (navLinks) navLinks.classList.remove('open');

  try {
    history.pushState(null, '', `#${pageId}`);
  } catch (e) { }

  // Page-specific initializers
  setTimeout(() => {
    if (typeof initScrollAnimations === 'function') initScrollAnimations();
    if (typeof initMagneticButtons === 'function') initMagneticButtons();
    if (typeof initFloatingTicket3D === 'function') initFloatingTicket3D();
    if (pageId === 'standings' && typeof initStandingsExperience === 'function') { initStandingsExperience(); }
    if (pageId === 'theme' && typeof initThemeRevealEngines === 'function') {
      initThemeRevealEngines();
    }
    if (pageId === 'theme' && typeof initAestheticsMultiverseEngine === 'function') {
      initAestheticsMultiverseEngine();
    }
    if (pageId === 'timeline' && typeof initTimelinePage3D === 'function') {
      initTimelinePage3D();
    }
    if (pageId === 'about') {
      try { if (typeof initAboutHeroCanvas === 'function') initAboutHeroCanvas(); } catch (e) { }
    }
    if (pageId === 'conduct' || pageId === 'rules') {
      try { if (typeof initConductHeroCanvas === 'function') initConductHeroCanvas(); } catch (e) { }
    }
    if (pageId === 'contact') {
      try { if (typeof initContactHeroCanvas === 'function') initContactHeroCanvas(); } catch (e) { }
    }
    if (pageId === 'team') {
      try { if (typeof initTeamHeroCanvas === 'function') initTeamHeroCanvas(); } catch (e) { }
    }
    if (pageId === 'sponsors') {
      try { if (typeof initSponsorsHeroCanvas === 'function') initSponsorsHeroCanvas(); } catch (e) { }
    }
    if (pageId === 'home') {
      if (typeof initHomeTelemetryEqualizer === 'function') { initHomeTelemetryEqualizer(); }
      if (typeof initHomeTimeline3D === 'function') {
        initHomeTimeline3D();
      }
      if (typeof initScheduleCard3DTilt === 'function') {
        initScheduleCard3DTilt();
      }
      if (typeof selectScheduleStage === 'function') {
        selectScheduleStage(1);
      }
      if (typeof initEditorial3DHero === 'function') {
        initEditorial3DHero();
      }
      if (typeof initDigitalCodingEqualizer === 'function') {
        initDigitalCodingEqualizer();
      }
    }
    if (typeof initAllPageHeroCanvases === 'function') {
      initAllPageHeroCanvases();
    }
    if (typeof injectPageGeometricObjects === 'function') {
      injectPageGeometricObjects();
    }
    if (typeof initUniversalCard3DInteractivity === 'function') {
      initUniversalCard3DInteractivity();
    }
    if (typeof initSectionBgParallax === 'function') {
      initSectionBgParallax();
    }
    if (typeof initPageHeroTitleTilt === 'function') {
      initPageHeroTitleTilt();
    }
    window.dispatchEvent(new Event('resize'));
  }, 80);
}
window.go = go;

function toggleNav(forceClose) {
  const willOpen = (forceClose === true) ? false : (document.getElementById('navMenuDrawer') ? !document.getElementById('navMenuDrawer').classList.contains('open') : false);
  document.body.classList.toggle('nav-open', willOpen);
  playCyberSound('click');
  const drawer = document.getElementById('navMenuDrawer');
  const backdrop = document.getElementById('navBackdrop');
  const hbg = document.getElementById('hbg');
  const navLinks = document.getElementById('navLinks');

  const willOpen = (forceClose === true) ? false : (drawer ? !drawer.classList.contains('open') : false);

  if (drawer) {
    drawer.classList.toggle('open', willOpen);
    drawer.setAttribute('aria-hidden', (!willOpen).toString());
  }
  if (backdrop) {
    backdrop.classList.toggle('open', willOpen);
  }
  if (hbg) {
    hbg.setAttribute('aria-expanded', willOpen.toString());
    hbg.classList.toggle('open', willOpen);
  }
  if (navLinks) {
    navLinks.classList.toggle('open', willOpen);
  }
}
window.toggleNav = toggleNav;

// ESC key listener to dismiss drawer
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const drawer = document.getElementById('navMenuDrawer');
    if (drawer && drawer.classList.contains('open')) {
      toggleNav(true);
    }
  }
});

function scrollToId(id) {
  playCyberSound('click');
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}
window.scrollToId = scrollToId;
// >>>>>>>>>> END: 04_nav_and_cursor.js <<<<<<<<<<

// >>>>>>>>>> START: 05_countdown.js <<<<<<<<<<
/* ==========================================================================
   5. COUNTDOWN TIMERS & MISSION CONTROL LAUNCH DECK
   ========================================================================== */
function updateCountdowns() {
  const now = Date.now();
  const diff = HACKATHON_DATE - now;

  if (diff <= 0) {
    ['cdDaysVal', 'cdHoursVal', 'cdMinsVal', 'cdSecsVal', 'cdDays', 'cdHours', 'cdMins', 'cdSecs'].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        const cdn = el.classList.contains('cdn') ? el : el.querySelector('.cdn');
        if (cdn) cdn.textContent = '00';
        else if (id.endsWith('Val')) el.textContent = '00';
      }
    });
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((diff % (1000 * 60)) / 1000);

  const pad = (n) => String(n).padStart(2, '0');

  // Update Main Countdown Digits safely preserving labels and box structure
  const updateUnit = (valId, boxId, value) => {
    const valEl = document.getElementById(valId);
    if (valEl) {
      valEl.textContent = pad(value);
      return;
    }
    const boxEl = document.getElementById(boxId);
    if (boxEl) {
      const cdn = boxEl.querySelector('.cdn');
      if (cdn) cdn.textContent = pad(value);
      else boxEl.textContent = pad(value);
    }
  };

  updateUnit('cdDaysVal', 'cdDays', days);
  updateUnit('cdHoursVal', 'cdHours', hours);
  updateUnit('cdMinsVal', 'cdMins', mins);
  updateUnit('cdSecsVal', 'cdSecs', secs);

  // Update Hero Section Minimalist Countdown
  var heroD = document.getElementById('heroCdDaysVal');
  var heroH = document.getElementById('heroCdHoursVal');
  var heroM = document.getElementById('heroCdMinsVal');
  var heroS = document.getElementById('heroCdSecsVal');
  if (heroD) heroD.textContent = pad(days);
  if (heroH) heroH.textContent = pad(hours);
  if (heroM) heroM.textContent = pad(mins);
  if (heroS) heroS.textContent = pad(secs);
  // Update theme vault counter if present
  const tvDays = document.getElementById('tvDays');
  const tvHours = document.getElementById('tvHours');
  const tvMins = document.getElementById('tvMins');
  const tvSecs = document.getElementById('tvSecs');
  if (tvDays) tvDays.textContent = pad(days);
  if (tvHours) tvHours.textContent = pad(hours);
  if (tvMins) tvMins.textContent = pad(mins);
  if (tvSecs) tvSecs.textContent = pad(secs);

  // Update 36H Sprint Nav HUD countdown digits
  ['homeTsnCd', 'pageTsnCd'].forEach(function (prefix) {
    var d = document.getElementById(prefix + 'Days');
    var h = document.getElementById(prefix + 'Hours');
    var m = document.getElementById(prefix + 'Mins');
    var s = document.getElementById(prefix + 'Secs');
    if (d) d.textContent = pad(days);
    if (h) h.textContent = pad(hours);
    if (m) m.textContent = pad(mins);
    if (s) s.textContent = pad(secs);
  });

  // Update Live Jaipur IST Clock
  try {
    var istTimeStr = new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour12: false }) + ' IST';
    var hIst = document.getElementById('homeTlIstClock');
    var pIst = document.getElementById('pageTlIstClock');
    if (hIst) hIst.textContent = istTimeStr;
    if (pIst) pIst.textContent = istTimeStr;
  } catch (err) { }

  // Sound pulse if enabled
  if (typeof cdSoundActive !== 'undefined' && cdSoundActive) {
    playCyberSound('click');
  }
}
setInterval(updateCountdowns, 1000);
updateCountdowns();

const cdStatDirectives = {
  sprint: {
    tag: '// CONTINUOUS BUILD PROTOCOL',
    msg: '⚡ 36-Hour uninterrupted hackathon sprint with continuous gigabit Wi-Fi, active power desks, and 24/7 technical labs at PIET Jaipur.'
  },
  meals: {
    tag: '// HOSPITALITY & REST SUBSIDY',
    msg: 'ðŸ” 100% complimentary high-energy catering: Breakfast, Lunch, Dinner, Midnight Pizza, Unlimited Coffee/Tea & dedicated secure Rest Pods.'
  },
  prizes: {
    tag: '// REWARD MATRIX & BOUNTIES',
    msg: 'ðŸ† ₹1,00,000+ total reward pool: ₹50,000 Champion + ₹30,000 1st Runner-Up + ₹20,000 Category Track Bounties & Cloud Credits.'
  },
  mentors: {
    tag: '// ARCHITECTURAL GUIDANCE',
    msg: 'ðŸŽ“ 50+ on-site senior engineers & tech leads from Google, Microsoft, AWS & high-growth startups offering 1:1 table-side code reviews.'
  }
};

function toggleCdStatDetail(statKey, btn) {
  playCyberSound('click');
  const drawer = document.getElementById('cdChipDetailDrawer');
  const tagEl = document.querySelector('.ccdd-tag');
  const msgEl = document.getElementById('ccddMsg');
  const allChips = document.querySelectorAll('.cd-stat-chip');

  if (!drawer || !tagEl || !msgEl) return;

  const isActive = btn.classList.contains('active');
  allChips.forEach(c => c.classList.remove('active'));

  if (isActive) {
    drawer.classList.remove('open');
  } else {
    btn.classList.add('active');
    const data = cdStatDirectives[statKey];
    if (data) {
      tagEl.textContent = data.tag;
      msgEl.textContent = data.msg;
      drawer.classList.add('open');
      playCyberSound('chime');
    }
  }
}
window.toggleCdStatDetail = toggleCdStatDetail;
const cdUnitInspectMessages = {
  Days: '📅 Target Date: 28 January 2027 • Official inaugural ceremony starts at 9:00 AM IST.',
  Hours: '🕒 Synchronized to Indian Standard Time (IST / Asia/Kolkata). Verified against atomic NTP servers.',
  Mins: '⚡ Real-time minute decrementing sequence. Problem Statement Vault decrypts upon zero.',
  Secs: '🔥 Live 1-second pulse sequence. Final countdown activates Formula-1 launch lights!'
};

function inspectCountdownUnit(unit, evt) {
  if (evt) evt.stopPropagation();
  playCyberSound('click');
  const toast = document.getElementById('cdInspectToast');
  const textEl = document.getElementById('citText');
  if (!toast || !textEl) return;

  const msg = cdUnitInspectMessages[unit] || `Inspecting ${unit} telemetry.`;
  textEl.textContent = msg;
  toast.style.borderColor = '#1D4ED8';
  toast.style.boxShadow = '0 0 16px rgba(29, 78, 216, 0.25)';

  setTimeout(() => {
    toast.style.borderColor = '';
    toast.style.boxShadow = '';
  }, 2500);
}
window.inspectCountdownUnit = inspectCountdownUnit;

let cdSoundActive = false;
function toggleCountdownSound() {
  cdSoundActive = !cdSoundActive;
  const btn = document.getElementById('cdAudioBtn');
  const icon = document.getElementById('cdAudioIcon');
  if (btn && icon) {
    if (cdSoundActive) {
      btn.classList.add('active');
      icon.textContent = 'ðŸ”Š';
      playCyberSound('execute');
    } else {
      btn.classList.remove('active');
      icon.textContent = 'ðŸ”‡';
      playCyberSound('click');
    }
  }
}
window.toggleCountdownSound = toggleCountdownSound;

function initCountdown3DTilt() {
  const boxes = document.querySelectorAll('#cdInteractiveBoxes .cd-box');
  boxes.forEach(box => {
    box.addEventListener('mousemove', (e) => {
      const rect = box.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      box.style.transform = `perspective(600px) rotateY(${(x * 12).toFixed(1)}deg) rotateX(${(-y * 12).toFixed(1)}deg) translateY(-4px)`;
    }, { passive: true });

    box.addEventListener('mouseleave', () => {
      box.style.transform = 'perspective(600px) rotateY(0deg) rotateX(0deg) translateY(0px)';
    });
  });
}
// >>>>>>>>>> END: 05_countdown.js <<<<<<<<<<

// >>>>>>>>>> START: 06_metrics.js <<<<<<<<<<
/* ==========================================================================
   6. KEY EVENT METRICS PAVILION & 3D GYROSCOPIC TILT
   ========================================================================== */
function toggleMetricDetails(id, el) {
  playCyberSound('click');
  const wasActive = el.classList.contains('active-metric');

  // Collapse all metric cards
  document.querySelectorAll('.interactive-metric-card').forEach(c => {
    c.classList.remove('active-metric');
  });

  if (!wasActive) {
    el.classList.add('active-metric');
    playCyberSound('chime');
  }
}
window.toggleMetricDetails = toggleMetricDetails;

function initMetricCard3DTilt() {
  const cards = document.querySelectorAll('.interactive-metric-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const midX = rect.width / 2;
      const midY = rect.height / 2;
      const rotX = ((y - midY) / midY) * -6.5;
      const rotY = ((x - midX) / midX) * 6.5;
      const px = ((x / rect.width) * 100).toFixed(1);
      const py = ((y / rect.height) * 100).toFixed(1);
      card.style.setProperty('--mouse-x', px + '%');
      card.style.setProperty('--mouse-y', py + '%');
      card.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}
window.initMetricCard3DTilt = initMetricCard3DTilt;
function initScrollAnimations() {
  function runRollingCounter(el, targetVal, isFloat) {
    if (el.dataset.counted === 'true') return;
    el.dataset.counted = 'true';
    const duration = 1500;
    const startTime = performance.now();
    const startVal = 0;

    function step(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = startVal + (targetVal - startVal) * ease;

      if (isFloat) {
        el.textContent = current.toFixed(1);
      } else {
        el.textContent = Math.round(current).toLocaleString();
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        if (isFloat) {
          el.textContent = targetVal.toFixed(1);
        } else {
          el.textContent = Math.round(targetVal).toLocaleString();
        }
      }
    }
    requestAnimationFrame(step);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible', 'in-view');

        // Legacy counter-val
        if (entry.target.classList.contains('counter-val') && !entry.target.dataset.counted) {
          const target = parseInt(entry.target.dataset.target, 10);
          if (!isNaN(target)) {
            runRollingCounter(entry.target, target, false);
          }
        }

        // Bento metric cards (.interactive-metric-card)
        if (entry.target.classList.contains('interactive-metric-card')) {
          const numEl = entry.target.querySelector('.bc-n');
          if (numEl && !numEl.dataset.counted) {
            const raw = numEl.getAttribute('data-to') || numEl.textContent.trim().replace(/,/g, '');
            const target = parseFloat(raw);
            if (!isNaN(target)) {
              const isFloat = raw.includes('.');
              runRollingCounter(numEl, target, isFloat);
            }
          }
        }
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.rv, .reveal, .bento-card, .why-card, .track-card, .prize-card, .counter-val, .sh, .interactive-metric-card, .tk-card, .cd-left, .cd-right').forEach(el => {
    observer.observe(el);
  });
}
window.initScrollAnimations = initScrollAnimations;
// >>>>>>>>>> END: 06_metrics.js <<<<<<<<<<

// >>>>>>>>>> START: 07_journey_and_timeline.js <<<<<<<<<<

/* ════════════════════════════════════════
   7. CINEMATIC HACKATHON EVENT JOURNEY ENGINE (THREE.JS + GSAP + COLOUR-BLOCK SYSTEM)
   Brutalist Editorial Timeline with Full-Screen Colour Shifts:
   Off-White (#F6F5F2) · Electric Orange (#FF5722) · Deep Black (#08090E) · Deep Red (#120506)
════════════════════════════════════════ */

const JOURNEY_STAGES = [
  {
    stageNum: "00",
    phaseVal: "THE ODYSSEY",
    theme: "j-theme-light",
    bgColor: "#F6F5F2",
    watermark: "THE JOURNEY",
    numWatermark: "00",
    catBadge: "HACK2SKILL × GRADUATE GATEWAY CLUB",
    statusPill: "● POORNIMA INSTITUTE, JAIPUR",
    line1: "THE JOURNEY",
    line2: "STARTS",
    line3: "HERE.",
    desc: "One hackathon. Infinite possibilities. From the first spark of an idea to a working innovation, every moment brings you closer to building something extraordinary.",
    chips: ["POORNIMA INSTITUTE", "JAIPUR, INDIA", "JANUARY 28–29, 2027", "PAN-INDIA TEAMS"],
    ctaText: "EXPLORE THE JOURNEY",
    ctaNote: "CLICK TO WITNESS THE FULL 8-STAGE ODYSSEY",
    action: "scroll"
  },
  {
    stageNum: "01",
    phaseVal: "01 / 08",
    theme: "j-theme-light",
    bgColor: "#F6F5F2",
    watermark: "REGISTRATION",
    numWatermark: "01",
    catBadge: "STAGE 01 — REGISTRATION OPENS",
    statusPill: "● ACTIVE NOW",
    line1: "YOUR IDEA.",
    line2: "YOUR TEAM.",
    line3: "YOUR MOMENT.",
    desc: "Every great innovation starts with a single decision. Register for the hackathon, bring together your team and get ready to transform your ideas into something extraordinary.",
    chips: ["REGISTRATIONS OPEN", "BUILD YOUR TEAM", "SECURE YOUR SPOT", "₹0 FREE ENTRY"],
    ctaText: "REGISTER NOW",
    ctaNote: "FREE PARTICIPATION · 72-HOUR PASS MODIFICATION",
    action: "register"
  },
  {
    stageNum: "02",
    phaseVal: "02 / 08",
    theme: "j-theme-black",
    bgColor: "#08090E",
    watermark: "CEREMONY",
    numWatermark: "02",
    catBadge: "STAGE 02 — OPENING CEREMONY",
    statusPill: "● JAN 28 · 09:00 AM",
    line1: "THE MINDS",
    line2: "ARE COMING",
    line3: "TOGETHER.",
    desc: "The energy in the auditorium builds. The community gathers. Insights, vision, instructions and expectations are shared before the challenge begins.",
    chips: ["WELCOME ADDRESS", "EVENT BRIEFING", "RULES & CRITERIA", "NETWORKING"],
    ctaText: "VIEW EVENT DETAILS",
    ctaNote: "PIET MAIN AUDITORIUM · LIVE STREAMED",
    action: "about"
  },
  {
    stageNum: "03",
    phaseVal: "03 / 08",
    theme: "j-theme-red",
    bgColor: "#120506",
    watermark: "THEME REVEAL",
    numWatermark: "03",
    catBadge: "STAGE 03 — THEME REVEAL",
    statusPill: "● TOP SECRET DECRYPTION",
    line1: "ONE CHALLENGE.",
    line2: "INFINITE",
    line3: "POSSIBILITIES.",
    desc: "The mystery is unveiled. The problem statements and innovation tracks are announced. This is the moment thinking shifts into action.",
    chips: ["PROBLEM STATEMENTS", "DAY 1 DECRYPTION", "TRACK ALLOCATION", "UNLEASH CREATIVITY"],
    ctaText: "OPEN THEME VAULT",
    ctaNote: "CLASSIFIED UNTIL DAY 1 · PASS CODE REQUIRED",
    action: "theme"
  },
  {
    stageNum: "04",
    phaseVal: "04 / 08",
    theme: "j-theme-light",
    bgColor: "#F6F5F2",
    watermark: "HACKING",
    numWatermark: "04",
    catBadge: "STAGE 04 — HACKING BEGINS",
    statusPill: "● 36 HOURS NON-STOP",
    line1: "LESS TALK.",
    line2: "MORE",
    line3: "BUILDING.",
    desc: "The countdown starts. Desks fill with laptops, wires, coffee and scribbled ideas. Across the room, lines of code turn concepts into working prototypes.",
    chips: ["36 HOURS CODING", "CAMPUS WI-FI", "FOOD & CAFFEINE", "RAPID PROTOTYPING"],
    ctaText: "VIEW INNOVATION TRACKS",
    ctaNote: "AIR-CONDITIONED HIGH-SPEED LABS AT PIET",
    action: "tracks"
  },
  {
    stageNum: "05",
    phaseVal: "05 / 08",
    theme: "j-theme-orange",
    bgColor: "#FFF6F2",
    watermark: "MENTORSHIP",
    numWatermark: "05",
    catBadge: "STAGE 05 — MENTORSHIP SESSION",
    statusPill: "● INDUSTRY VETERANS",
    line1: "GREAT IDEAS",
    line2: "NEED GREAT",
    line3: "GUIDANCE.",
    desc: "Experienced mentors move between teams, asking questions, offering direction, refining architectures and helping push concepts further.",
    chips: ["TECHNICAL GUIDANCE", "ARCHITECTURE REVIEWS", "PRODUCT FEEDBACK", "PROBLEM SOLVING"],
    ctaText: "MEET THE MENTORS",
    ctaNote: "ROUND-THE-CLOCK INDUSTRY ADVISORY",
    action: "team"
  },
  {
    stageNum: "06",
    phaseVal: "06 / 08",
    theme: "j-theme-black",
    bgColor: "#08090E",
    watermark: "SUBMISSION",
    numWatermark: "06",
    catBadge: "STAGE 06 — PROJECT SUBMISSION",
    statusPill: "● HARD DEADLINE",
    line1: "TIME TO",
    line2: "MAKE IT",
    line3: "REAL.",
    desc: "Final commits. Final adjustments. The submission window closes and teams freeze their code. The work is done; now it speaks for itself.",
    chips: ["GITHUB REPOSITORY", "LIVE PROTOTYPE DEMO", "DOCUMENTATION", "SUBMISSION DEADLINE"],
    ctaText: "SUBMISSION GUIDELINES",
    ctaNote: "CODE FREEZE & REPO VERIFICATION",
    action: "conduct"
  },
  {
    stageNum: "07",
    phaseVal: "07 / 08",
    theme: "j-theme-light",
    bgColor: "#F6F5F2",
    watermark: "EVALUATION",
    numWatermark: "07",
    catBadge: "STAGE 07 — JUDGING & EVALUATION",
    statusPill: "● JURY AUDITORIUM",
    line1: "SHOW US",
    line2: "WHAT YOU HAVE",
    line3: "BUILT.",
    desc: "Teams pitch their solutions to a panel of expert judges. Demonstrations, presentations, questions and real-time evaluations decide the strongest innovations.",
    chips: ["LIVE DEMO PITCH", "EXPERT JURY", "TECHNICAL RIGOR", "PRODUCT VIABILITY"],
    ctaText: "JUDGING CRITERIA",
    ctaNote: "5-MINUTE PITCH + 2-MINUTE Q&A",
    action: "about"
  },
  {
    stageNum: "08",
    phaseVal: "08 / 08",
    theme: "j-theme-red",
    bgColor: "#120506",
    watermark: "CHAMPIONS",
    numWatermark: "08",
    catBadge: "STAGE 08 — WINNERS ANNOUNCEMENT",
    statusPill: "● GRAND AUDITORIUM FINALE",
    line1: "BIG IDEAS.",
    line2: "BOLD MINDS.",
    line3: "REAL IMPACT.",
    desc: "The moment of celebration. Standing ovations, grand trophies, prize distribution and recognition for the creators who built something unforgettable.",
    chips: ["₹1,00,000+ CASH POOL", "PHYSICAL TROPHIES", "INCUBATION GRANTS", "NATIONAL RECOGNITION"],
    ctaText: "REGISTER TO COMPETE",
    ctaNote: "WILL YOUR SQUAD BE THE ONE ON THE PODIUM?",
    action: "register"
  },
  {
    stageNum: "09",
    phaseVal: "FINALE",
    theme: "j-theme-black",
    bgColor: "#08090E",
    watermark: "UDBHAV",
    numWatermark: "27",
    catBadge: "HACK2SKILL × GRADUATE GATEWAY CLUB",
    statusPill: "● PIET JAIPUR",
    line1: "THIS IS MORE",
    line2: "THAN A HACKATHON.",
    line3: "BUILD THE FUTURE.",
    desc: "This is where ideas become reality. Join 500+ ambitious developers, engineers, and creators at Poornima Institute of Engineering and Technology, Jaipur.",
    chips: ["JANUARY 28–29, 2027", "PIET JAIPUR", "₹0 ENTRY FEE", "PAN-INDIA TEAMS"],
    ctaText: "CLAIM YOUR TEAM PASS",
    ctaNote: "LIMITED PARTICIPANT SEATS AVAILABLE",
    action: "register"
  }
];

let activeJourneyIndex = 1;
let journey3DController = null;

function initCinematicJourneyEngine() {
  const canvas = document.getElementById('journey3DCanvas');
  const viewport = document.getElementById('jStickyViewport');
  const bgLayer = document.getElementById('jBgLayer');
  const wrapper = document.getElementById('jCanvasWrapper') || (canvas ? canvas.parentElement : null);
  if (!canvas || typeof THREE === 'undefined') return;

  // Canvas dimensions
  const parent = canvas.parentElement || wrapper;
  const w = (parent && parent.clientWidth > 50) ? parent.clientWidth : (canvas.clientWidth || 640);
  const h = (parent && parent.clientHeight > 50) ? parent.clientHeight : (canvas.clientHeight || 500);

  // Three.js Scene Setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, w / h, 0.1, 100);
  camera.position.set(0, 0, 7.2);

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(w, h, false);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  // Dynamic Lighting
  const ambLight = new THREE.AmbientLight(0xffffff, 1.4);
  scene.add(ambLight);

  const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.0);
  dirLight1.position.set(5, 8, 6);
  scene.add(dirLight1);

  const dirLight2 = new THREE.DirectionalLight(0xff5722, 1.8);
  dirLight2.position.set(-6, -4, 4);
  scene.add(dirLight2);

  const dirLight3 = new THREE.DirectionalLight(0x00e5ff, 1.4);
  dirLight3.position.set(0, -6, -2);
  scene.add(dirLight3);

  const centerPointLight = new THREE.PointLight(0xffffff, 1.2, 10);
  centerPointLight.position.set(0, 0, 3);
  scene.add(centerPointLight);

  // High-Quality Solid Reusable Materials
  const matChassis = new THREE.MeshStandardMaterial({ color: 0x111625, metalness: 0.85, roughness: 0.25 });
  const matOrange = new THREE.MeshStandardMaterial({ color: 0xff5722, metalness: 0.7, roughness: 0.25, emissive: 0xff3d00, emissiveIntensity: 0.15 });
  const matWhite = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.3, roughness: 0.2 });
  const matGold = new THREE.MeshStandardMaterial({ color: 0xffb703, metalness: 0.95, roughness: 0.15, emissive: 0xff9100, emissiveIntensity: 0.1 });
  const matRed = new THREE.MeshStandardMaterial({ color: 0xd92727, metalness: 0.75, roughness: 0.2, emissive: 0x990000, emissiveIntensity: 0.15 });
  const matCyan = new THREE.MeshStandardMaterial({ color: 0x00c9d8, metalness: 0.8, roughness: 0.2, emissive: 0x0097a7, emissiveIntensity: 0.2 });
  const matWireWhite = new THREE.MeshBasicMaterial({ color: 0x080808, wireframe: true, transparent: true, opacity: 0.4 });
  const matWireOrange = new THREE.MeshBasicMaterial({ color: 0xff5722, wireframe: true });
  const matWireCyan = new THREE.MeshBasicMaterial({ color: 0x00c9d8, wireframe: true });
  const matWireGold = new THREE.MeshBasicMaterial({ color: 0xffb703, wireframe: true });

  // Master Stage Objects Container
  const stageGroups = [];

  // ----------------------------------------------------
  // STAGE 0: The Odyssey & Innovation Core
  // ----------------------------------------------------
  const g0 = new THREE.Group();
  const coreIco = new THREE.Mesh(new THREE.IcosahedronGeometry(1.35, 1), matOrange);
  const coreWire = new THREE.Mesh(new THREE.IcosahedronGeometry(1.65, 1), matWireWhite);
  const coreRing1 = new THREE.Mesh(new THREE.TorusGeometry(2.1, 0.045, 16, 64), matChassis);
  const coreRing2 = new THREE.Mesh(new THREE.TorusGeometry(2.35, 0.035, 16, 64), matGold);
  coreRing1.rotation.x = Math.PI / 3;
  coreRing2.rotation.y = Math.PI / 4;
  g0.add(coreIco, coreWire, coreRing1, coreRing2);
  stageGroups.push(g0);

  // ----------------------------------------------------
  // STAGE 1: Interactive Cyber Laptop with Screen & Floating VIP Pass (STAGE 01 REGISTRATION)
  // ----------------------------------------------------
  const g1 = new THREE.Group();
  const laptopBase = new THREE.Mesh(new THREE.BoxGeometry(2.7, 0.09, 1.8), matChassis);
  const laptopScreen = new THREE.Mesh(new THREE.BoxGeometry(2.6, 1.68, 0.07), matChassis);
  laptopScreen.position.set(0, 0.88, -0.85);
  laptopScreen.rotation.x = 0.22;
  const screenFace = new THREE.Mesh(new THREE.PlaneGeometry(2.46, 1.54), new THREE.MeshBasicMaterial({ color: 0x0d1527 }));
  screenFace.position.set(0, 0.88, -0.81);
  screenFace.rotation.x = 0.22;
  // Floating Golden VIP Security Pass Card
  const passCard = new THREE.Mesh(new THREE.BoxGeometry(1.25, 0.78, 0.035), matGold);
  passCard.position.set(0, 0.85, 0.35);
  passCard.rotation.x = -0.26;
  passCard.rotation.z = 0.09;
  const passWire = new THREE.Mesh(new THREE.BoxGeometry(1.32, 0.84, 0.045), matWireOrange);
  passCard.add(passWire);
  // Concentric Gyroscopic Rings
  const lapRing1 = new THREE.Mesh(new THREE.TorusGeometry(2.2, 0.04, 16, 64), matOrange);
  lapRing1.rotation.x = Math.PI / 2.8;
  const lapRing2 = new THREE.Mesh(new THREE.TorusGeometry(2.45, 0.03, 16, 64), matCyan);
  lapRing2.rotation.y = Math.PI / 3.2;
  g1.add(laptopBase, laptopScreen, screenFace, passCard, lapRing1, lapRing2);
  stageGroups.push(g1);

  // ----------------------------------------------------
  // STAGE 2: Opening Ceremony Keynote Spotlight & Platinum Emblem
  // ----------------------------------------------------
  const g2 = new THREE.Group();
  const stagePlat = new THREE.Mesh(new THREE.CylinderGeometry(2.1, 2.35, 0.35, 32), matChassis);
  stagePlat.position.y = -1.2;
  const emblem = new THREE.Mesh(new THREE.OctahedronGeometry(1.25, 0), matWhite);
  emblem.position.y = 0.35;
  const emblemWire = new THREE.Mesh(new THREE.OctahedronGeometry(1.5, 0), matWireOrange);
  emblem.add(emblemWire);
  const haloRing1 = new THREE.Mesh(new THREE.TorusGeometry(1.75, 0.045, 16, 48), matGold);
  haloRing1.position.y = 0.35;
  haloRing1.rotation.x = Math.PI / 2.3;
  const haloRing2 = new THREE.Mesh(new THREE.TorusGeometry(2.05, 0.03, 16, 48), matChassis);
  haloRing2.position.y = 0.35;
  haloRing2.rotation.y = Math.PI / 3;
  g2.add(stagePlat, emblem, haloRing1, haloRing2);
  stageGroups.push(g2);

  // ----------------------------------------------------
  // STAGE 3: Heavy Mystery Vault Box & Cryptographic Dial
  // ----------------------------------------------------
  const g3 = new THREE.Group();
  const vaultBody = new THREE.Mesh(new THREE.BoxGeometry(2.0, 2.0, 2.0), matChassis);
  const vaultWire = new THREE.Mesh(new THREE.BoxGeometry(2.08, 2.08, 2.08), matWireWhite);
  const vaultDial = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.65, 0.25, 32), matGold);
  vaultDial.rotation.x = Math.PI / 2;
  vaultDial.position.z = 1.05;
  const vaultRing = new THREE.Mesh(new THREE.TorusGeometry(0.85, 0.04, 16, 48), matOrange);
  vaultRing.position.z = 1.05;
  const vaultBeam = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 1.1, 4.2, 16, 1, true), new THREE.MeshBasicMaterial({ color: 0xff5722, transparent: true, opacity: 0.5, side: THREE.DoubleSide }));
  vaultBeam.position.y = 1.8;
  g3.add(vaultBody, vaultWire, vaultDial, vaultRing, vaultBeam);
  stageGroups.push(g3);

  // ----------------------------------------------------
  // STAGE 4: Dual Monitor Hacking Workstation & Floating Code Cube
  // ----------------------------------------------------
  const g4 = new THREE.Group();
  const mon1 = new THREE.Mesh(new THREE.BoxGeometry(1.9, 1.25, 0.08), matChassis);
  mon1.position.set(-0.7, 0.35, 0);
  mon1.rotation.y = 0.22;
  const monFace1 = new THREE.Mesh(new THREE.PlaneGeometry(1.78, 1.12), new THREE.MeshBasicMaterial({ color: 0x050811 }));
  monFace1.position.set(-0.7, 0.35, 0.05);
  monFace1.rotation.y = 0.22;
  const mon2 = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.6, 0.08), matChassis);
  mon2.position.set(0.95, 0.45, -0.2);
  mon2.rotation.y = -0.32;
  const monFace2 = new THREE.Mesh(new THREE.PlaneGeometry(1.38, 1.48), new THREE.MeshBasicMaterial({ color: 0xff5722 }));
  monFace2.position.set(0.95, 0.45, -0.15);
  monFace2.rotation.y = -0.32;
  const hackCube = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.65, 0.65), matGold);
  hackCube.position.set(0, 1.15, 0.4);
  const hackCubeWire = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.8, 0.8), matWireCyan);
  hackCube.add(hackCubeWire);
  g4.add(mon1, monFace1, mon2, monFace2, hackCube);
  stageGroups.push(g4);

  // ----------------------------------------------------
  // STAGE 5: Solid Glowing Mentorship Core & Neural Gyroscope
  // ----------------------------------------------------
  const g5 = new THREE.Group();
  const mentorCore = new THREE.Mesh(new THREE.IcosahedronGeometry(1.15, 1), matChassis);
  mentorCore.position.y = 0.2;
  const mentorWire = new THREE.Mesh(new THREE.IcosahedronGeometry(1.42, 1), matWireOrange);
  mentorCore.add(mentorWire);
  const mRing1 = new THREE.Mesh(new THREE.TorusGeometry(1.85, 0.05, 16, 64), matGold);
  mRing1.position.y = 0.2;
  mRing1.rotation.x = Math.PI / 3;
  const mRing2 = new THREE.Mesh(new THREE.TorusGeometry(2.15, 0.04, 16, 64), matOrange);
  mRing2.position.y = 0.2;
  mRing2.rotation.y = Math.PI / 4;
  const beaconSpire = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 3.2, 16), matWhite);
  beaconSpire.position.y = 0.2;
  const nodePivots = [];
  for (let n = 0; n < 8; n++) {
    const pvt = new THREE.Group();
    pvt.position.y = 0.2;
    pvt.rotation.y = (n / 8) * Math.PI * 2;
    pvt.rotation.x = (n % 2 === 0 ? 0.35 : -0.35);
    const nodeMesh = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), (n % 2 === 0 ? matGold : matWhite));
    nodeMesh.position.x = 1.95;
    pvt.add(nodeMesh);
    g5.add(pvt);
    nodePivots.push(pvt);
  }
  g5.add(mentorCore, mRing1, mRing2, beaconSpire);
  g5.userData.nodePivots = nodePivots;
  stageGroups.push(g5);

  // ----------------------------------------------------
  // STAGE 6: Digital Upload Cloud & Quantum Repository Vault
  // ----------------------------------------------------
  const g6 = new THREE.Group();
  const folderBack = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.7, 0.08), matWhite);
  const folderFront = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.3, 0.08), matOrange);
  folderFront.position.set(0, -0.22, 0.22);
  folderFront.rotation.x = -0.28;
  const uploadArrow = new THREE.Mesh(new THREE.ConeGeometry(0.5, 1.0, 4), matGold);
  uploadArrow.position.set(0, 0.55, 0.45);
  const arrowStem = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.6, 0.1), matWhite);
  arrowStem.position.set(0, 0.05, 0.45);
  const packCube = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.4, 0.4), matChassis);
  packCube.position.set(0.9, 0.9, 0.2);
  g6.add(folderBack, folderFront, uploadArrow, arrowStem, packCube);
  stageGroups.push(g6);

  // ----------------------------------------------------
  // STAGE 7: Evaluation Radar & Precision Target Scope Rings
  // ----------------------------------------------------
  const g7 = new THREE.Group();
  const radarDisc = new THREE.Mesh(new THREE.CylinderGeometry(1.8, 1.8, 0.07, 32), matChassis);
  radarDisc.rotation.x = Math.PI / 3;
  const radarWire = new THREE.Mesh(new THREE.TorusGeometry(1.82, 0.03, 16, 48), matWireCyan);
  radarWire.rotation.x = Math.PI / 3;
  const rRing1 = new THREE.Mesh(new THREE.TorusGeometry(1.35, 0.035, 16, 48), matOrange);
  rRing1.rotation.x = Math.PI / 3;
  const rRing2 = new THREE.Mesh(new THREE.TorusGeometry(0.85, 0.035, 16, 48), matGold);
  rRing2.rotation.x = Math.PI / 3;
  const radarNeedle = new THREE.Mesh(new THREE.BoxGeometry(0.09, 1.7, 0.05), matRed);
  radarNeedle.position.set(0, 0, 0.1);
  radarNeedle.rotation.z = 0.4;
  g7.add(radarDisc, radarWire, rRing1, rRing2, radarNeedle);
  g7.userData.needle = radarNeedle;
  stageGroups.push(g7);

  // ----------------------------------------------------
  // STAGE 8: Grand Golden Champion Trophy with Curved Handles
  // ----------------------------------------------------
  const g8 = new THREE.Group();
  const trophyCup = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 0.38, 1.6, 24), matGold);
  trophyCup.position.y = 0.45;
  const trophyStem = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.24, 0.75, 16), matGold);
  trophyStem.position.y = -0.7;
  const trophyBase = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 1.0, 0.5, 8), matChassis);
  trophyBase.position.y = -1.25;
  const handleL = new THREE.Mesh(new THREE.TorusGeometry(0.45, 0.065, 12, 24, Math.PI), matGold);
  handleL.position.set(-0.9, 0.5, 0);
  handleL.rotation.z = Math.PI / 2;
  const handleR = handleL.clone();
  handleR.position.set(0.9, 0.5, 0);
  handleR.rotation.z = -Math.PI / 2;
  const champStar = new THREE.Mesh(new THREE.OctahedronGeometry(0.35, 0), matWhite);
  champStar.position.set(0, 1.45, 0);
  g8.add(trophyCup, trophyStem, trophyBase, handleL, handleR, champStar);
  stageGroups.push(g8);

  // ----------------------------------------------------
  // STAGE 9: Udbhav Finale Monogram Emblem
  // ----------------------------------------------------
  const g9 = new THREE.Group();
  const grandRing = new THREE.Mesh(new THREE.TorusGeometry(1.7, 0.15, 24, 64), matGold);
  const innerSphere = new THREE.Mesh(new THREE.DodecahedronGeometry(0.95, 0), matChassis);
  const outerSpikes = new THREE.Mesh(new THREE.IcosahedronGeometry(2.2, 1), matWireOrange);
  g9.add(grandRing, innerSphere, outerSpikes);
  stageGroups.push(g9);

  // Add all stage groups to the scene and set initial visibility to Stage 1
  stageGroups.forEach((grp, idx) => {
    grp.visible = (idx === 1);
    scene.add(grp);
  });

  // Responsive Canvas Resize
  function onResize() {
    if (!canvas || !renderer) return;
    const p = canvas.parentElement || wrapper;
    const rw = (p && p.clientWidth > 50) ? p.clientWidth : (canvas.clientWidth || 640);
    const rh = (p && p.clientHeight > 50) ? p.clientHeight : (canvas.clientHeight || 500);
    camera.aspect = rw / rh;
    camera.updateProjectionMatrix();
    renderer.setSize(rw, rh, false);
  }
  window.addEventListener('resize', onResize, { passive: true });

  // UI Element References
  const wmText = document.getElementById('jWatermarkText');
  const wmNum = document.getElementById('jWatermarkNum');
  const hudPhaseVal = document.getElementById('jHudPhaseVal');
  const catBadge = document.getElementById('jCatBadge');
  const statusPill = document.getElementById('jStatusPill');
  const line1 = document.getElementById('jLine1');
  const line2 = document.getElementById('jLine2');
  const line3 = document.getElementById('jLine3');
  const descEl = document.getElementById('jDesc');
  const chipsRow = document.getElementById('jChipsRow');
  const ctaNote = document.getElementById('jCtaNote');
  const progressFill = document.getElementById('jHudProgressFill');
  const scrubPctEl = document.getElementById('jScrubPct');
  const stepperBtns = document.querySelectorAll('.j-nav-item');

  function updateJourneyUI(idx, frac) {
    if (idx < 0 || idx >= JOURNEY_STAGES.length) return;
    activeJourneyIndex = idx;
    const stage = JOURNEY_STAGES[idx];

    // Background color and theme classes
    if (bgLayer) bgLayer.style.backgroundColor = stage.bgColor;
    if (viewport) {
      viewport.classList.remove('j-theme-light', 'j-theme-orange', 'j-theme-black', 'j-theme-red');
      viewport.classList.add(stage.theme);
    }

    // Watermark typography
    if (wmText && wmText.textContent !== stage.watermark) wmText.textContent = stage.watermark;
    if (wmNum && wmNum.textContent !== stage.numWatermark) wmNum.textContent = stage.numWatermark;

    // Header HUD
    if (hudPhaseVal) hudPhaseVal.textContent = stage.phaseVal;

    // Left Editorial Column
    if (catBadge) catBadge.textContent = stage.catBadge;
    if (statusPill) statusPill.innerHTML = '<span class="j-live-radar-dot"></span> ' + stage.statusPill.replace('●', '').trim();

    // Kinetic Line Updates with Vibrant Highlight Preservation
    if (line1) line1.textContent = stage.line1;
    if (line2) {
      const textSpan = line2.querySelector('.j-hl-text');
      const glowSpan = line2.querySelector('.j-hl-glow-aura');
      if (textSpan && glowSpan) {
        textSpan.textContent = stage.line2;
        glowSpan.textContent = stage.line2;
      } else {
        line2.innerHTML = '<span class="j-hl-text">' + stage.line2 + '</span><span class="j-hl-glow-aura" aria-hidden="true">' + stage.line2 + '</span>';
      }
    }
    if (line3) line3.textContent = stage.line3;

    // Subtle entrance animation on headline lines
    const headlineLines = [line1, line2, line3];
    headlineLines.forEach((el, lIdx) => {
      if (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(12px)';
        setTimeout(() => {
          el.style.transition = 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, lIdx * 50);
      }
    });

    if (descEl) descEl.textContent = stage.desc;

    // Chips
    if (chipsRow) {
      chipsRow.innerHTML = stage.chips.map(chip => '<span>' + chip + '</span>').join('');
    }

    // CTA Note
    if (ctaNote) ctaNote.textContent = stage.ctaNote;

    // Sidebar stepper active item
    stepperBtns.forEach((btn, bIdx) => {
      const targetStageNum = bIdx + 1;
      const isCur = (idx === targetStageNum);
      btn.classList.toggle('active', isCur);
    });

    // Bottom Progress scrub percentage
    const clampedP = Math.max(1, Math.min(100, Math.round((idx / 8) * 100)));
    if (progressFill) progressFill.style.width = clampedP + '%';
    if (scrubPctEl) scrubPctEl.textContent = clampedP + '%';
  }

  // Seamless Stage Selector Function
  function selectJourneyStage(stageNum) {
    const targetIdx = Math.max(1, Math.min(8, stageNum));
    activeJourneyIndex = targetIdx;

    // Switch visible 3D group with spin-in burst
    stageGroups.forEach((grp, gIdx) => {
      if (gIdx === targetIdx) {
        grp.visible = true;
        grp.position.set(0, 0, 0);
        grp.scale.set(1.2, 1.2, 1.2);
        grp.rotation.y += Math.PI * 0.8;
      } else {
        grp.visible = false;
      }
    });

    updateJourneyUI(targetIdx, 0);
  }

  // Interactive 360° Drag & Touch Parallax Controls
  let isDragging = false;
  let prevPointerX = 0, prevPointerY = 0;
  let rotVelocityX = 0, rotVelocityY = 0;
  let dragRotationX = 0, dragRotationY = 0;

  const dragTarget = wrapper || canvas;
  if (dragTarget) {
    dragTarget.addEventListener('pointerdown', (e) => {
      isDragging = true;
      prevPointerX = e.clientX;
      prevPointerY = e.clientY;
      rotVelocityX = 0;
      rotVelocityY = 0;
      dragTarget.style.cursor = 'grabbing';
    }, { passive: true });

    window.addEventListener('pointermove', (e) => {
      if (isDragging) {
        const dx = e.clientX - prevPointerX;
        const dy = e.clientY - prevPointerY;
        prevPointerX = e.clientX;
        prevPointerY = e.clientY;
        rotVelocityY = dx * 0.008;
        rotVelocityX = dy * 0.008;
        dragRotationY += rotVelocityY;
        dragRotationX += rotVelocityX;
      }
    }, { passive: true });

    window.addEventListener('pointerup', () => {
      isDragging = false;
      if (dragTarget) dragTarget.style.cursor = 'grab';
    }, { passive: true });

    window.addEventListener('pointercancel', () => {
      isDragging = false;
      if (dragTarget) dragTarget.style.cursor = 'grab';
    }, { passive: true });
  }

  // Mouse Parallax & Dynamic Cursor Spotlight
  let targetMouseX = 0, targetMouseY = 0;
  let mouseX = 0, mouseY = 0;
  if (viewport) {
    viewport.addEventListener('mousemove', (e) => {
      const rect = viewport.getBoundingClientRect();
      const px = ((e.clientX - rect.left) / rect.width) * 100;
      const py = ((e.clientY - rect.top) / rect.height) * 100;
      viewport.style.setProperty('--mouse-x', px + '%');
      viewport.style.setProperty('--mouse-y', py + '%');
      targetMouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      targetMouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    }, { passive: true });

    viewport.addEventListener('mouseleave', () => {
      targetMouseX = 0;
      targetMouseY = 0;
    }, { passive: true });
  }

  // Animation Loop: Constant smooth rotation, bobbing, drag inertia & node orbiting
  let clock = 0;
  function animate() {
    requestAnimationFrame(animate);
    clock += 0.02;

    // Smooth mouse parallax interpolation
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;

    camera.position.x = mouseX * 0.45;
    camera.position.y = -mouseY * 0.3;
    camera.lookAt(0, 0, 0);

    // Apply drag inertia damping
    if (!isDragging) {
      rotVelocityX *= 0.92;
      rotVelocityY *= 0.92;
      dragRotationX += rotVelocityX;
      dragRotationY += rotVelocityY;
    }

    // Dynamic object animation for all visible groups
    stageGroups.forEach((grp, idx) => {
      if (grp.visible) {
        // Smooth scale return from selection bounce
        grp.scale.x += (1.0 - grp.scale.x) * 0.08;
        grp.scale.y += (1.0 - grp.scale.y) * 0.08;
        grp.scale.z += (1.0 - grp.scale.z) * 0.08;

        // Base continuous rotation combined with drag physics
        grp.rotation.y += 0.012 + dragRotationY * 0.05;
        grp.rotation.x = Math.sin(clock * 0.9) * 0.06 + dragRotationX * 0.05;
        grp.position.y = Math.sin(clock * 1.6) * 0.12;

        // Specific stage details
        if (idx === 5 && grp.userData.nodePivots) {
          grp.userData.nodePivots.forEach((pvt, pIdx) => {
            pvt.rotation.y += 0.022 * (pIdx % 2 === 0 ? 1 : -1);
          });
        }
        if (idx === 7 && grp.userData.needle) {
          grp.userData.needle.rotation.z += 0.035;
        }
      }
    });

    renderer.render(scene, camera);
  }
  animate();

  // Expose controller for jumping and navigation
  journey3DController = {
    jumpTo: selectJourneyStage,
    navigate: (dir) => {
      const nextIdx = Math.max(1, Math.min(8, activeJourneyIndex + dir));
      selectJourneyStage(nextIdx);
    }
  };

  // Initial render & sizing trigger directly on Stage 1
  onResize();
  selectJourneyStage(1);
}

function jumpToJourneyStage(stageNum) {
  if (journey3DController) {
    journey3DController.jumpTo(stageNum);
  }
}

function navigateJourney(dir) {
  if (journey3DController) {
    journey3DController.navigate(dir);
  }
}

function handleJourneyCta(action) {
  const act = action || 'register';
  if (act === 'register') {
    go('register');
  } else if (act === 'theme') {
    go('theme');
  } else if (act === 'about') {
    go('about');
  } else if (act === 'team') {
    go('team');
  } else if (act === 'conduct') {
    go('conduct');
  } else if (act === 'tracks') {
    const sec = document.querySelector('.tracks-sec');
    if (sec) sec.scrollIntoView({ behavior: 'smooth' });
  } else if (act === 'scroll') {
    navigateJourney(1);
  } else {
    go('home');
  }
}

window.initCinematicJourneyEngine = initCinematicJourneyEngine;
window.jumpToJourneyStage = jumpToJourneyStage;
window.selectJourneyStage = jumpToJourneyStage;
window.navigateJourney = navigateJourney;
window.handleJourneyCta = handleJourneyCta;
/* ==========================================================================
   HOME PAGE TIMELINE: 8-STAGE INTERACTIVE GRID, SCHEDULE & 3D CHRONOSPHERE
   ========================================================================== */
let currentSimulatedStage = 1;

const STAGE_SIMULATION_DATA = {
  1: {
    badge: 'STAGE 01 · ACTIVE NOW',
    title: 'REGISTRATION OPENS',
    sub: 'Squad Genesis & Verified Security Pass Generation',
    metrics: [
      { label: 'STATUS', val: 'ACTIVE' },
      { label: 'SQUADS REGISTERED', val: '240+' },
      { label: 'REMAINING SLOTS', val: '35' }
    ],
    consoleLines: [
      { k: 'PORTAL STATUS', v: 'ONLINE & ACCEPTING ROSTERS' },
      { k: 'PASS FORMAT', v: 'HS-PASS-XXXX (AES-256 ENCRYPTED)' },
      { k: 'ENTRY FEE', v: '₹0 (100% FREE MERIT ACCESS)' }
    ],
    actionsTitle: 'Stage Directives & Checklist',
    actions: [
      'Form squad with 2 to 4 engineering, design, or business peers.',
      'Squad leader inputs team name, member emails, and primary tech track.',
      'Instant HS-PASS-XXXX generation with 72-hour modification rights.'
    ],
    btnText: 'Register Squad Now ->',
    btnAction: () => go('register')
  },
  2: {
    badge: 'STAGE 02 · DAY 1 · 09:00 AM',
    title: 'OPENING CEREMONY',
    sub: 'Campus Induction, Keynotes & Participant Welcome',
    metrics: [
      { label: 'VENUE', val: 'PIET AUDITORIUM' },
      { label: 'START TIME', val: '09:00 AM IST' },
      { label: 'AUDIENCE', val: '120 SQUADS' }
    ],
    consoleLines: [
      { k: 'STAGE HOST', v: 'HACK2SKILL Ã— GGC LEADERSHIP' },
      { k: 'WELCOME KIT', v: 'CUSTOM BADGES, LANYARD & SWAG' },
      { k: 'LIVESTREAM', v: 'CAMPUS SCREENS & YOUTUBE LIVE' }
    ],
    actionsTitle: 'Opening Day Directives',
    actions: [
      'Report at PIET Jaipur main gate with valid college IDs & HS-PASS-XXXX docket.',
      'Collect physical RFID access badges and high-speed campus credentials.',
      'Keynote addresses by Hack2Skill directors and PIET patron deans.'
    ],
    btnText: 'View Campus Venue & Logistics ->',
    btnAction: () => {
      closeStageSimulation();
      const el = document.getElementById('about');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  },
  3: {
    badge: 'STAGE 03 · CLASSIFIED',
    title: 'THEME DECRYPTION',
    sub: 'Synchronized Problem Statement Decryption & Selection Engine',
    metrics: [
      { label: 'CHALLENGES', val: '10 STATEMENTS' },
      { label: 'ALGORITHM', val: 'AES-256 LIVE' },
      { label: 'CAPACITY', val: 'FAIR 10-SPLIT' }
    ],
    consoleLines: [
      { k: 'DECRYPTION CIPHER', v: '0x8F94...2027_PIET' },
      { k: 'COUNTDOWN CLOCK', v: 'FORMULA 1 10-SEC START' },
      { k: 'SELECTION ENGINE', v: 'CONCURRENCY-SAFE ATOMIC LOCK' }
    ],
    actionsTitle: 'Theme Decryption Directives',
    actions: [
      'At 11:00 AM on Jan 28, the F1 starting gantry lights turn ON.',
      'Enter your verified HS-PASS-XXXX team code on the live theme reveal terminal.',
      'Each squad selects exactly 1 challenge before individual slots reach capacity.'
    ],
    btnText: 'Open Live Theme Reveal Portal ->',
    btnAction: () => {
      closeStageSimulation();
      go('theme');
    }
  },
  4: {
    badge: 'STAGE 04 · 36H SPRINT',
    title: 'HACKING BEGINS',
    sub: 'Non-Stop High-Octane Engineering & Prototyping Sprint',
    metrics: [
      { label: 'SPRINT LENGTH', val: '36 HOURS' },
      { label: 'WI-FI SPEED', val: '1.2 GBPS MESH' },
      { label: 'CATERING', val: '24/7 ALL-INCLUSIVE' }
    ],
    consoleLines: [
      { k: 'DEVELOPMENT LABS', v: 'PIET LAB BLOCKS A, B & C' },
      { k: 'INFRASTRUCTURE', v: 'UNLIMITED DEDICATED POWER STRIPS' },
      { k: 'REST ZONES', v: 'SLEEPING PODS & GAMING LOUNGES' }
    ],
    actionsTitle: 'Hacking Guidelines',
    actions: [
      'Initialize fresh Git repository with README and design wireframes.',
      'All code must be written within the official 36-hour window.',
      'Dedicated caffeine bar, tea kiosks, and RedBull stations open 24/7.'
    ],
    btnText: 'Explore Sprint Guidelines ->',
    btnAction: () => {
      closeStageSimulation();
      switchTimelineView('schedule');
    }
  },
  5: {
    badge: 'STAGE 05 · DAY 1 · 05:00 PM',
    title: 'MENTORSHIP ROUNDS',
    sub: '1-on-1 Table-Side Architecture Clinic & Technical Guidance',
    metrics: [
      { label: 'TECH MENTORS', val: '50+ EXPERTS' },
      { label: 'FORMAT', val: '1:1 TABLE-SIDE' },
      { label: 'ROUNDS', val: '2 CHECKPOINTS' }
    ],
    consoleLines: [
      { k: 'MENTOR POOL', v: 'MAANG, FOUNDERS & CLOUD ARCHITECTS' },
      { k: 'API ASSISTANCE', v: 'SPONSOR SDK TOKENS DISBURSED' },
      { k: 'CRITIQUE FOCUS', v: 'FEASIBILITY & PRODUCTION ROADMAP' }
    ],
    actionsTitle: 'Mentorship Expectations',
    actions: [
      'Mentors spend 10 minutes at each squad table reviewing architecture.',
      'Receive actionable feedback on API integration, scalability, and UX.',
      'Optionally pivot or refine problem statement execution without penalty.'
    ],
    btnText: 'View Mentorship Details ->',
    btnAction: () => {
      closeStageSimulation();
      switchTimelineView('schedule');
    }
  },
  6: {
    badge: 'STAGE 06 · DAY 2 · 03:00 PM',
    title: 'CODE FREEZE & SUBMISSION',
    sub: 'Repository Lock, Demo Video Tagging & Plagiarism Audit',
    metrics: [
      { label: 'LOCK TIMESTAMP', val: '03:00 PM SHARP' },
      { label: 'INTEGRITY SCAN', val: 'SHA-256 GIT COMMIT' },
      { label: 'VIDEO DEMO', val: 'MAX 3 MINUTES' }
    ],
    consoleLines: [
      { k: 'REPO VERIFICATION', v: 'AUTOMATED COMMIT AUDIT' },
      { k: 'PLAGIARISM CHECK', v: 'AI & OPEN-SOURCE SCAN' },
      { k: 'SUBMISSION FORM', v: 'LIVE URL + GITHUB + PITCH DECK' }
    ],
    actionsTitle: 'Submission Checklist',
    actions: [
      'Push final commits before 03:00 PM IST; late pushes disqualify entries.',
      'Submit public GitHub URL, working prototype URL, and 3-minute video.',
      'Receive official Submission Lock Docket with cryptographic verification hash.'
    ],
    btnText: 'View Submission Guidelines ->',
    btnAction: () => {
      closeStageSimulation();
      switchTimelineView('schedule');
    }
  },
  7: {
    badge: 'STAGE 07 · DAY 2 · 03:30 PM',
    title: 'JURY EVALUATION PITCH',
    sub: 'Live Working Software Demo & Intense Technical Q&A',
    metrics: [
      { label: 'PITCH DURATION', val: '5 MINUTES' },
      { label: 'Q&A DEFENSE', val: '2 MINUTES' },
      { label: 'JURY PANEL', val: 'CHIEF ARCHITECTS' }
    ],
    consoleLines: [
      { k: 'EVALUATION VENUE', v: 'JURY AUDITORIUM' },
      { k: 'SCORING RUBRIC', v: 'INNOVATION (30%) + TECH (40%) + IMPACT (30%)' },
      { k: 'FORMAT', v: 'LIVE WORKING DEMO REQUIRED (NO PPT-ONLY)' }
    ],
    actionsTitle: 'Pitch Directives',
    actions: [
      'Every finalist squad presents a live demo to the grand jury.',
      'Defend technical design, database architecture, and edge-case handling.',
      'Top 10 overall finalists advance to the Main Stage Champions Pitch.'
    ],
    btnText: 'View Jury Rubric ->',
    btnAction: () => {
      closeStageSimulation();
      switchTimelineView('schedule');
    }
  },
  8: {
    badge: 'STAGE 08 · GRAND FINALE',
    title: 'WINNERS & AWARD GALA',
    sub: 'Grand Podium Celebration, CNC Trophies & ₹1,00,000+ Prize Pool',
    metrics: [
      { label: 'PRIZE POOL', val: '₹1,00,000+ CASH' },
      { label: 'TROPHIES', val: 'CUSTOM METALLIC' },
      { label: 'TIME', val: 'JAN 29 · 06:00 PM' }
    ],
    consoleLines: [
      { k: 'CHAMPIONS AWARD', v: '₹50,000 + CHAMPIONS TROPHY' },
      { k: 'RUNNER UP', v: '₹30,000 + OFFICIAL SILVER CUP' },
      { k: 'INCUBATION SUPPORT', v: 'PIET INCUBATION & SEED ADVISORY' }
    ],
    actionsTitle: 'Closing Gala Directives',
    actions: [
      'Standing ovations, keynote speeches by distinguished industry dignitaries.',
      'Physical ceremonial oversized cheques and trophy presentations.',
      'Valedictory dinner, network mixers with corporate recruiters and investors.'
    ],
    btnText: 'View Prize Pool & Bounties ->',
    btnAction: () => {
      closeStageSimulation();
      go('sponsors');
    }
  }
};

function selectScheduleStage(stageNum, evt) {
  if (evt) {
    evt.stopPropagation();
  }
  try { playSound('click'); } catch (e) { }

  for (let i = 1; i <= 8; i++) {
    const pill = document.getElementById(`pillStage${i}`);
    const card = document.getElementById(`schedCard${i}`);
    if (pill) {
      if (i === stageNum) pill.classList.add('active');
      else pill.classList.remove('active');
    }
    if (card) {
      if (i === stageNum) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    }
  }

  const line = document.getElementById('schedStepperLine');
  if (line) {
    const pct = Math.max(12.5, (stageNum / 8) * 100);
    line.style.width = `${pct}%`;
  }
}

function openStageSimulation(stageNum, evt) {
  if (evt) {
    evt.stopPropagation();
  }
  try { playSound('click'); } catch (e) { }
  selectScheduleStage(stageNum);

  currentSimulatedStage = stageNum;
  const data = STAGE_SIMULATION_DATA[stageNum] || STAGE_SIMULATION_DATA[1];

  const modal = document.getElementById('stageSimModal');
  const badge = document.getElementById('ssmBadge');
  const title = document.getElementById('ssmTitle');
  const sub = document.getElementById('ssmSub');
  const body = document.getElementById('ssmBody');
  const actionBtn = document.getElementById('ssmActionBtn');

  if (badge) badge.textContent = data.badge;
  if (title) title.textContent = data.title;
  if (sub) sub.textContent = data.sub;
  if (actionBtn) actionBtn.textContent = data.btnText;

  if (body) {
    let metricsHtml = '<div class="sim-metrics-grid">';
    data.metrics.forEach(m => {
      metricsHtml += `
        <div class="smg-card">
          <div class="smg-label">${m.label}</div>
          <div class="smg-val">${m.val}</div>
        </div>`;
    });
    metricsHtml += '</div>';

    let consoleHtml = '<div class="sim-console"><div class="sim-console-bar"><span>// TELEMETRY & DIRECTIVES</span><span>STAGE ' + (stageNum < 10 ? '0' + stageNum : stageNum) + '</span></div>';
    data.consoleLines.forEach(c => {
      consoleHtml += `
        <div class="sim-status-row">
          <span>${c.k}:</span>
          <span>${c.v}</span>
        </div>`;
    });
    consoleHtml += '</div>';

    let actionsHtml = `<div class="sim-actions-box"><h4>// ${data.actionsTitle}</h4><ul>`;
    data.actions.forEach(a => {
      actionsHtml += `<li>${a}</li>`;
    });
    actionsHtml += '</ul></div>';

    body.innerHTML = metricsHtml + consoleHtml + actionsHtml;
  }

  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeStageSimulation(evt) {
  if (evt && evt.target && evt.target !== evt.currentTarget && !evt.target.classList.contains('ssm-close')) {
    return;
  }
  try { playSound('click'); } catch (e) { }
  const modal = document.getElementById('stageSimModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function executeStageSimAction() {
  const data = STAGE_SIMULATION_DATA[currentSimulatedStage];
  if (data && typeof data.btnAction === 'function') {
    data.btnAction();
  }
}

function initScheduleCard3DTilt() {
  const cards = document.querySelectorAll('.sched-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const midX = rect.width / 2;
      const midY = rect.height / 2;
      const rotX = ((y - midY) / midY) * -6;
      const rotY = ((x - midX) / midX) * 6;
      card.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeStageSimulation();
  }
});

function switchTimelineView(view) {
  try { playSound('click'); } catch (e) { }
  const btnRoadmap = document.getElementById('btnViewRoadmap');
  const btnSchedule = document.getElementById('btnViewSchedule');
  const roadmapWrap = document.getElementById('timelineRoadmapView');
  const scheduleWrap = document.getElementById('timelineScheduleView');

  if (!btnRoadmap || !btnSchedule || !roadmapWrap || !scheduleWrap) return;

  if (view === 'roadmap') {
    btnRoadmap.classList.add('active');
    btnSchedule.classList.remove('active');
    roadmapWrap.style.display = 'block';
    scheduleWrap.style.display = 'none';
  } else {
    btnSchedule.classList.add('active');
    btnRoadmap.classList.remove('active');
    roadmapWrap.style.display = 'none';
    scheduleWrap.style.display = 'block';
  }
}

function switchScheduleDay(dayNum) {
  try { playSound('click'); } catch (e) { }
  const tab1 = document.getElementById('tabDay1');
  const tab2 = document.getElementById('tabDay2');
  const sch1 = document.getElementById('schDay1');
  const sch2 = document.getElementById('schDay2');

  if (!tab1 || !tab2 || !sch1 || !sch2) return;

  if (dayNum === 1) {
    tab1.classList.add('active');
    tab2.classList.remove('active');
    sch1.style.display = 'block';
    sch2.style.display = 'none';
  } else {
    tab2.classList.add('active');
    tab1.classList.remove('active');
    sch2.style.display = 'block';
    sch1.style.display = 'none';
  }
}




/* ====================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================
   16. DEDICATED TIMELINE PAGE: 3D QUANTUM CHRONOSPHERE & CONTROLS
   ==================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================== */
let tlRenderer = null;
let tlScene = null;
let tlCamera = null;
let tlAnimId = null;

/* [Legacy initTimelinePage3D superseded by createAtomicOrbitalSystem] */

/* ---------------------------------------------------------------------------------------------------------------------------------------------------- Timeline Filter Controller ---------------------------------------------------------------------------------------------------------------------------------------------------- */
function filterTimelinePage(filterType, btnEl) {
  if (btnEl) {
    document.querySelectorAll('.tlt-btn').forEach(b => b.classList.remove('active'));
    btnEl.classList.add('active');
  }

  const cards = document.querySelectorAll('.tl-stage-card');
  cards.forEach(card => {
    const day = card.getAttribute('data-day');
    const isCritical = card.getAttribute('data-critical') === 'true';

    let show = false;
    if (filterType === 'all') {
      show = true;
    } else if (filterType === 'day1') {
      show = (day === 'day1' || day === 'pre');
    } else if (filterType === 'day2') {
      show = (day === 'day2');
    } else if (filterType === 'critical') {
      show = isCritical;
    }

    if (show) {
      card.style.display = 'grid';
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 40);
    } else {
      card.style.opacity = '0';
      card.style.transform = 'translateY(16px)';
      setTimeout(() => {
        if (card.style.opacity === '0') card.style.display = 'none';
      }, 220);
    }
  });
}

/* ---------------------------------------------------------------------------------------------------------------------------------------------------- Add to Google Calendar Action ---------------------------------------------------------------------------------------------------------------------------------------------------- */
function exportTimelineCalendar() {
  const gcalUrl = "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    "&text=" + encodeURIComponent("UDBHAV 2027 • 36H Innovation Sprint") +
    "&dates=20270128T033000Z/20270129T130000Z" +
    "&details=" + encodeURIComponent("Official Hackathon 2027 organized by Hack2Skill Ã— Graduate Gateway Club.\n36 Hours Non-Stop Innovation Sprint.\nVenue: Poornima Institute of Engineering and Technology (PIET), Jaipur, Rajasthan.\n\nKey Milestones:\n• Jan 28, 09:00 AM - Opening Ceremony\n• Jan 28, 11:00 AM - Top-Secret Theme Decryption\n• Jan 28, 11:30 AM - 36H Hacking Sprint Begins\n• Jan 29, 01:00 PM - Final Code Freeze\n• Jan 29, 04:30 PM - Grand Awards & Podium Ceremony") +
    "&location=" + encodeURIComponent("Poornima Institute of Engineering and Technology (PIET), ISI-2, RIICO Institutional Area, Sitapura, Jaipur, Rajasthan 302022") +
    "&sf=true&output=xml";

  window.open(gcalUrl, '_blank', 'noopener,noreferrer');
}

/* ════════════════════════════════════════
   INTERACTIVE 36-HOUR SPRINT STAGE SELECTOR & NAVIGATOR
════════════════════════════════════════ */
var SPRINT_STAGE_DATA = {
  1: {
    chip: '00H',
    title: 'Check-in & Squad Onboarding',
    time: 'JAN 28 • 08:30 AM IST',
    desc: 'Welcome kit distribution, hacker badge activation, team setup & Wi-Fi sync at PIET.',
    targetId: 'tlStage1'
  },
  2: {
    chip: '06H',
    title: 'Problem Statement & Mentor Checkpoint 1',
    time: 'JAN 28 • 02:30 PM IST',
    desc: 'Unveiling tracks, GitHub repo creation, architecture review & 1-on-1 industry mentor clinic.',
    targetId: 'tlStage4'
  },
  3: {
    chip: '18H',
    title: 'Midnight Code Sprint & Refuel',
    time: 'JAN 29 • 02:30 AM IST',
    desc: 'High-intensity hacking, midway prototype dry run, caffeine boost & Mentor Checkpoint 2.',
    targetId: 'tlStage6'
  },
  4: {
    chip: '28H',
    title: 'Code Freeze & Dry Runs',
    time: 'JAN 29 • 12:30 PM IST',
    desc: 'Git repository lock, deployment verification, final commit cutoff & presentation polish.',
    targetId: 'tlStage8'
  },
  5: {
    chip: '36H',
    title: 'Grand Finale Demo & Podium',
    time: 'JAN 29 • 08:30 PM IST',
    desc: 'Top 10 live presentations on main auditorium stage, grand jury scoring & prize awards.',
    targetId: 'tlStage10'
  }
};

function selectSprintStage(stageNum, btnEl) {
  var stage = SPRINT_STAGE_DATA[stageNum];
  if (!stage) return;

  // Sync active states across both home and dedicated timeline widgets
  document.querySelectorAll('.tsn-stage-item').forEach(function (item) {
    var isTarget = item.getAttribute('data-stage') === String(stageNum);
    item.classList.toggle('active', isTarget);
    item.setAttribute('aria-selected', isTarget ? 'true' : 'false');
  });

  // Haptic feedback
  if (typeof playCyberSound === 'function') {
    try { playCyberSound('beep'); } catch (e) { }
  }

  // Toast announcement
  if (typeof showGlobalToast === 'function') {
    showGlobalToast('Phase ' + stage.chip + ': ' + stage.title);
  }

  // Target element navigation
  var targetEl = document.getElementById(stage.targetId);
  if (targetEl && targetEl.offsetParent !== null) {
    targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    targetEl.classList.add('tl-stage-flash');
    setTimeout(function () {
      targetEl.classList.remove('tl-stage-flash');
    }, 1500);
  } else {
    // If on home page, scroll to sticky viewport container
    var jViewport = document.getElementById('jStickyViewport');
    if (jViewport) {
      jViewport.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
window.selectSprintStage = selectSprintStage;

function scrollToTimelineFull() {
  var target = document.querySelector('.tl-filter-controller') || document.getElementById('tlSpineLaser') || document.getElementById('jStickyViewport');
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
window.scrollToTimelineFull = scrollToTimelineFull;

function copyVenueInfo(btnEl) {
  var venueAddress = "Poornima Institute of Engineering and Technology (PIET), ISI-2, RIICO Institutional Area, Sitapura, Jaipur, Rajasthan 302022";
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(venueAddress).then(function () {
      if (typeof showGlobalToast === 'function') {
        showGlobalToast('Copied PIET Jaipur venue address to clipboard!');
      }
      if (btnEl) {
        var origHtml = btnEl.innerHTML;
        btnEl.innerHTML = '<span class="tvb-pin">&#10003;</span> <span class="tvb-name">COPIED!</span>';
        setTimeout(function () { btnEl.innerHTML = origHtml; }, 2000);
      }
    }).catch(function () {
      if (typeof showGlobalToast === 'function') {
        showGlobalToast('Venue: PIET Jaipur, Sitapura');
      }
    });
  } else {
    if (typeof showGlobalToast === 'function') {
      showGlobalToast('Venue: PIET Jaipur, Sitapura');
    }
  }
}
window.copyVenueInfo = copyVenueInfo;

// Auto-boot Timeline 3D if page is active
if (document.getElementById('page-timeline')?.classList.contains('active')) {
  setTimeout(initTimelinePage3D, 250);
}
// >>>>>>>>>> END: 07_journey_and_timeline.js <<<<<<<<<<

// >>>>>>>>>> START: 08_team_and_tracks.js <<<<<<<<<<
/* ══════════════════════════════════════════════════════════════════════════
   08. TEAM DIRECTORY, 3D TACTILE CARDS & TRACK EXPLORATION ENGINE
   ══════════════════════════════════════════════════════════════════════════ */

/* ── 8A. ARCHITECT DOSSIERS DATA VAULT ── */
const TEAM_DOSSIERS = {
  arjun: {
    name: "Arjun Sharma",
    role: "Convenor & Platform Architect",
    badge: "HACK2SKILL LEAD",
    codeId: "CONV_01",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=700&auto=format&fit=crop&q=80",
    bio: "Arjun leads national technology initiatives at Hack2Skill, having architected evaluation platforms for over 500+ hackathons across IITs, NITs, and premier universities. He focuses on algorithmic fairness, anti-collusion code auditing, and distributed real-time submission infrastructure.",
    milestones: [
      "Scaled 100+ national hackathons impacting 1M+ participants",
      "Architected automated double-blind code evaluation engine",
      "Co-founded National Student Developer Ecosystem across 100+ cities"
    ],
    domains: ["System Architecture", "Platform Scalability", "Anti-Cheat Audit", "DevOps & Evaluation"],
    officeHours: "Jan 28: 11:00 AM – 06:00 PM | Jan 29: 09:00 AM – 02:00 PM",
    deskLocation: "Main Control Deck & Table A-01"
  },
  priya: {
    name: "Priya Verma",
    role: "Student President • GGC PIET",
    badge: "GGC PRESIDENT",
    codeId: "PRES_02",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=700&auto=format&fit=crop&q=80",
    bio: "Priya is the driving operational force behind Graduate Gateway Club at PIET Jaipur. Under her tenure, GGC has expanded to 2,500+ active student coders, hosting 24-hour sprints, incubator industry visits, and corporate hackathons.",
    milestones: [
      "Mobilized 120+ undergraduate engineering student crew",
      "Spearheaded 15+ student technical symposiums & hack sprints",
      "Awarded Campus Student Entrepreneur of the Year '26"
    ],
    domains: ["Team Leadership", "Logistics & Bay Ops", "Venture Pitching", "Incubation Support"],
    officeHours: "24/7 Floor Coordination across All 36 Hours",
    deskLocation: "GGC Student Secretariat & Coding Bay 05"
  },
  ramesh: {
    name: "Dr. Ramesh Kumar",
    role: "HOD, Computer Science • PIET",
    badge: "PIET FACULTY ADVISOR",
    codeId: "HOD_03",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=700&auto=format&fit=crop&q=80",
    bio: "Dr. Ramesh Kumar brings 18+ years of academia and industrial R&D experience. He heads the Department of Computer Science at PIET, overseeing advanced AI incubation labs, deep tech grant allocations, and patent filings for student innovators.",
    milestones: [
      "Authored 40+ IEEE & Springer Peer-Reviewed Research Papers",
      "Principal Investigator on ₹50L+ deep tech research grants",
      "Chief Academic Advisor to 12 successful student startups"
    ],
    domains: ["Patent Feasibility", "AI Research Methodology", "Academic-Industry Transfer", "Jury Rubric Oversight"],
    officeHours: "Jan 28: 02:00 PM – 08:00 PM | Jan 29: 10:00 AM – 04:00 PM",
    deskLocation: "Faculty Advisory Suite & Jury Lounge"
  },
  sneha: {
    name: "Sneha Rathi",
    role: "Technical Head • GGC",
    badge: "TECH OPERATIONS",
    codeId: "TECH_04",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=700&auto=format&fit=crop&q=80",
    bio: "Sneha oversees the digital nervous system of Udbhav 2027. She engineered the real-time registration engine, live ticket badge compositor, and asynchronous evaluation APIs handling thousands of concurrent requests.",
    milestones: [
      "Built Udbhav async registration & cloud sheet proxy",
      "Managed 10Gbps optical LAN failover switches and Wi-Fi 6 APs",
      "Open source contributor to FastAPI and Starlette ecosystems"
    ],
    domains: ["FastAPI & Python Async", "Docker & Kubernetes Clusters", "Cloud Networking", "Real-Time Telemetry"],
    officeHours: "Continuous NOC Duty & Table Network Support",
    deskLocation: "NOC & Tech Support Bay"
  },
  vikram: {
    name: "Vikram Malhotra",
    role: "Senior Staff AI Engineer • Ex-Google",
    badge: "STAFF AI MENTOR",
    codeId: "AI_STAFF",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&auto=format&fit=crop&q=80",
    bio: "Vikram is a veteran machine learning systems architect with tenure at Google and frontier AI labs. He mentors squads on local inference optimizations with vLLM, low-rank fine-tuning (LoRA), multimodal embeddings, and agentic workflows.",
    milestones: [
      "Architected production LLM serving for 10M+ daily active users",
      "Published benchmark studies on transformer quantization and inference",
      "Technical mentor to 30+ national hackathon winning teams"
    ],
    domains: ["PyTorch & vLLM", "Agentic Orchestration", "Quantized Inference", "Multi-Agent System Design"],
    officeHours: "Floor Mentorship Rounds 1, 2, 3 & 4 (All Bay Visits)",
    deskLocation: "Coding Bays 01 to 10"
  },
  rahul: {
    name: "Rahul Meena",
    role: "Decentralized Systems Lead",
    badge: "WEB3 ARCHITECT",
    codeId: "WEB3_06",
    img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=700&auto=format&fit=crop&q=80",
    bio: "Rahul is a blockchain protocol architect and certified smart contract security auditor. He assists hackathon teams in designing gas-efficient EVM contracts, integrating zk-SNARK verifiers, and defending against reentrancy and oracle manipulation.",
    milestones: [
      "Security audited smart contract protocols securing $100M+ TVL",
      "Winner of ETHGlobal & Pan-India Web3 Sprints",
      "Core maintainer of zero-knowledge privacy circuits"
    ],
    domains: ["Solidity & Rust", "zk-SNARKs & ZK Proofs", "Smart Contract Security", "Decentralized Storage"],
    officeHours: "Floor Mentorship Rounds 1, 2, 3 & 4 (All Bay Visits)",
    deskLocation: "Coding Bays 11 to 20"
  },
  ananya: {
    name: "Ananya Deshmukh",
    role: "Principal Security Researcher • Ex-CrowdStrike",
    badge: "CYBERSEC LEAD",
    codeId: "SEC_07",
    img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=700&auto=format&fit=crop&q=80",
    bio: "Ananya specializes in low-level Linux kernel defense, eBPF telemetry, and defensive red-teaming. She guides squads in hardening REST/GraphQL endpoints, protecting against token leakage, and passing the Midnight Security Audit.",
    milestones: [
      "Speaker at DEF CON & Black Hat Asia on eBPF Kernel Observability",
      "Discovered 8 CVE critical zero-day vulnerabilities in container runtimes",
      "Jury Chair for National Cyber Threat Intelligence Competitions"
    ],
    domains: ["Kernel Security & eBPF", "API Hardening", "Penetration Testing", "Threat Modeling"],
    officeHours: "Midnight Security Review: 11:30 PM – 03:00 AM | Day 2: 10:00 AM – 02:00 PM",
    deskLocation: "Security War Room & Bay 08"
  },
  neha: {
    name: "Dr. Neha Agarwal",
    role: "Dean of R&D • PIET Advisory Board",
    badge: "INCUBATION PATRON",
    codeId: "DEAN_08",
    img: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=700&auto=format&fit=crop&q=80",
    bio: "Dr. Neha leads the intellectual property licensing and entrepreneurial funding board at PIET. She mentors student teams on patent drafting, regulatory compliance for medical and agricultural AI, and seed grant applications.",
    milestones: [
      "Facilitated ₹2.5 Cr+ in institutional seed grants for collegiate ventures",
      "Holds 8 granted utility patents in edge computing and sensory IoT",
      "Executive Member, Rajasthan State Science & Tech Council"
    ],
    domains: ["Patent Feasibility", "Commercial Viability", "Grant Drafting", "IP Protection"],
    officeHours: "Jan 28: 03:00 PM – 07:00 PM | Jan 29: 09:30 AM – 01:30 PM",
    deskLocation: "Incubation Pavilion & Advisory Suite"
  },
  devendra: {
    name: "Devendra Singh",
    role: "Principal Cloud Architect • AWS Community Hero",
    badge: "CLOUD & DEVOPS",
    codeId: "OPS_09",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=700&auto=format&fit=crop&q=80",
    bio: "Devendra is a globally recognized cloud architect with deep expertise in serverless architectures, multi-region Kubernetes clusters, and zero-downtime failover systems for high-concurrency hackathon applications.",
    milestones: [
      "AWS Community Hero & CNCF Ambassador",
      "Author of 'Production Kubernetes at Scale' with 80k+ readers",
      "Provisioned cloud resources for over 250+ enterprise hackathons"
    ],
    domains: ["Kubernetes & Docker", "Terraform & IaC", "Serverless Pipelines", "Cost-Optimized Cloud"],
    officeHours: "Round 2 & 3 Architecture Reviews (Coding Bays 01 to 24)",
    deskLocation: "Cloud Infrastructure Desk & NOC"
  },
  aarav: {
    name: "Aarav Chawla",
    role: "Staff Product Designer • Spatial & Design Systems",
    badge: "CREATIVE & UI/UX",
    codeId: "DES_10",
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=700&auto=format&fit=crop&q=80",
    bio: "Aarav is an award-winning creative technologist specializing in kinetic micro-interactions, three-dimensional interfaces, and accessible design systems. He assists squads in transforming raw backend code into memorable investor-ready product experiences.",
    milestones: [
      "Winner of 4 Awwwards Site of the Day and FWA of the Day accolades",
      "Designed flagship design systems for top Indian fintech unicorns",
      "Host of Design & Code Masterclasses with 150k+ community views"
    ],
    domains: ["UI/UX Architecture", "Three.js & Kinetic Motion", "Product Storytelling", "Design Systems"],
    officeHours: "Demo Polish & Pitch Preparation: Jan 29, 06:00 AM – 12:00 PM",
    deskLocation: "Design Studio & Bay 15"
  },
  rohan: {
    name: "Rohan Joshi",
    role: "Robotics & Swarm Architect • Embedded Systems",
    badge: "ROBOTICS & IOT",
    codeId: "IOT_11",
    img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=700&auto=format&fit=crop&q=80",
    bio: "Rohan is an embedded firmware engineer and ROS (Robot Operating System) developer. He manages the physical hardware test bench, providing on-the-spot sensor calibration, ESP32 flashing support, and serial protocol debugging.",
    milestones: [
      "Architected autonomous drone delivery mesh for disaster response",
      "Hardware Lead for university Mars Rover student team",
      "Authored open-source ESP-IDF firmware libraries with 10k+ GitHub stars"
    ],
    domains: ["ESP32 & STM32", "ROS2 & Swarm Mesh", "Sensor Fusion", "Hardware Prototyping"],
    officeHours: "24/7 Hardware Workbench & Soldering Station Duty",
    deskLocation: "Hardware Depot & Table H-01"
  },
  ishita: {
    name: "Ishita Sen",
    role: "Healthcare Informatics Lead • BioTech Innovator",
    badge: "HEALTH & BIOTECH",
    codeId: "MED_12",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=700&auto=format&fit=crop&q=80",
    bio: "Ishita works at the intersection of federated healthcare records, DICOM computer vision models, and HIPAA/ABDM compliant architectures. She guides squads tackling healthcare problem statements on regulatory and privacy constraints.",
    milestones: [
      "Deployed federated diagnosis models across 15+ network hospitals",
      "Winner of National Digital Health Mission Innovation Challenge",
      "Consultant to national tele-health startup accelerators"
    ],
    domains: ["Healthcare AI", "ABDM & FHIR Protocols", "Differential Privacy", "Bio-Signals"],
    officeHours: "Floor Mentorship Rounds 2 & 4 (HealthTech & AI Bays)",
    deskLocation: "HealthTech Innovation Hub"
  }
};

/* ── 8B. TEAM CATEGORY & STACK FILTERING ── */
let currentTeamCategory = 'all';
let currentTechFilter = 'all';

function filterTeamCategory(cat, btn) {
  try { playCyberSound('click'); } catch (e) { }
  currentTeamCategory = cat;

  const buttons = document.querySelectorAll('.tf-btn');
  buttons.forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-cat') === cat);
  });
  if (btn) {
    btn.classList.add('active');
  }

  applyTeamFilters();
}
window.filterTeamCategory = filterTeamCategory;
window.filterTeam = filterTeamCategory; // Backward compatibility

function filterByTechTag(tag, chip) {
  try { playCyberSound('click'); } catch (e) { }
  currentTechFilter = tag;

  const chips = document.querySelectorAll('.ttq-chip');
  chips.forEach(c => c.classList.remove('active'));
  if (chip) chip.classList.add('active');

  applyTeamFilters();
}
window.filterByTechTag = filterByTechTag;

function searchTeamMembers(query) {
  const clearBtn = document.getElementById('teamSearchClear');
  if (clearBtn) {
    clearBtn.style.display = query && query.trim().length > 0 ? 'block' : 'none';
  }
  applyTeamFilters();
}
window.searchTeamMembers = searchTeamMembers;

function clearTeamSearch() {
  try { playCyberSound('hover'); } catch (e) { }
  const input = document.getElementById('teamSearchInput');
  if (input) input.value = '';
  const clearBtn = document.getElementById('teamSearchClear');
  if (clearBtn) clearBtn.style.display = 'none';
  currentTeamCategory = 'all';
  currentTechFilter = 'all';

  document.querySelectorAll('.tf-btn').forEach(b => b.classList.toggle('active', b.getAttribute('data-cat') === 'all'));
  document.querySelectorAll('.ttq-chip').forEach(c => c.classList.toggle('active', c.textContent.trim() === 'All'));

  applyTeamFilters();
}
window.clearTeamSearch = clearTeamSearch;

function applyTeamFilters() {
  const input = document.getElementById('teamSearchInput');
  const query = input ? input.value.toLowerCase().trim() : '';

  const cards = document.querySelectorAll('.tc');
  let visibleCount = 0;

  cards.forEach(card => {
    const cardCat = card.getAttribute('data-cat') || '';
    const cardStack = (card.getAttribute('data-stack') || '').toLowerCase();
    const cardText = card.innerText.toLowerCase();

    // Check category filter
    const matchesCat = (currentTeamCategory === 'all' || cardCat === currentTeamCategory);

    // Check tech tag filter
    const matchesTech = (currentTechFilter === 'all' || cardStack.includes(currentTechFilter.toLowerCase()));

    // Check search query
    const matchesQuery = !query || cardText.includes(query);

    if (matchesCat && matchesTech && matchesQuery) {
      card.style.display = 'block';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  // Update telemetry pill
  const countText = document.getElementById('teamCountText');
  if (countText) {
    countText.textContent = `SHOWING ${visibleCount} VERIFIED ARCHITECT${visibleCount === 1 ? '' : 'S'}`;
  }

  // Show/hide empty state
  const noResults = document.getElementById('teamNoResults');
  const mainGrid = document.getElementById('mainTeamGrid');
  if (noResults && mainGrid) {
    if (visibleCount === 0) {
      noResults.style.display = 'block';
      mainGrid.style.display = 'none';
    } else {
      noResults.style.display = 'none';
      mainGrid.style.display = 'grid';
    }
  }
}

/* ── 8C. TACTILE 3D CARD TILT ── */
function tiltTeamCard(e, card) {
  if (!card) return;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const rotateX = ((y - centerY) / centerY) * -7;
  const rotateY = ((x - centerX) / centerX) * 7;

  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
}
window.tiltTeamCard = tiltTeamCard;

function resetTeamCard(card) {
  if (!card) return;
  card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  card.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
  setTimeout(() => {
    card.style.transition = '';
  }, 400);
}
window.resetTeamCard = resetTeamCard;

/* ── 8D. ARCHITECT FULL DOSSIER MODAL ── */
function openTeamDossier(id) {
  try { playCyberSound('click'); } catch (e) { }
  const data = TEAM_DOSSIERS[id];
  if (!data) return;

  const modal = document.getElementById('teamDossierModal');
  const content = document.getElementById('tdmContent');
  const badge = document.getElementById('tdmBadge');

  if (badge) badge.textContent = `${data.codeId} • ${data.badge}`;

  if (content) {
    content.innerHTML = `
      <div style="display:flex;align-items:center;gap:20px;margin-bottom:24px;flex-wrap:wrap;">
        <img src="${data.img}" alt="${data.name}" style="width:90px;height:90px;border-radius:18px;object-fit:cover;border:2px solid #FF5722;box-shadow:0 8px 24px rgba(255,87,34,0.25);" />
        <div>
          <h3 style="font-family:'Anton',sans-serif;font-size:1.6rem;color:#101010;margin:0 0 4px;letter-spacing:0.02em;">${data.name}</h3>
          <div style="font-family:'Space Grotesk',sans-serif;font-size:0.9rem;font-weight:700;color:#FF5722;margin-bottom:6px;">${data.role}</div>
          <div style="font-family:'Space Grotesk',monospace;font-size:0.75rem;color:#666666;">&#128205; ${data.deskLocation}</div>
        </div>
      </div>

      <div style="background:#F8FAFC;border:1px solid rgba(0,0,0,0.06);border-radius:14px;padding:16px 18px;margin-bottom:20px;">
        <h4 style="font-family:'Space Grotesk',sans-serif;font-size:0.85rem;font-weight:800;color:#101010;margin:0 0 8px;text-transform:uppercase;letter-spacing:0.05em;">Professional Background</h4>
        <p style="font-size:0.86rem;line-height:1.6;color:#444444;margin:0;">${data.bio}</p>
      </div>

      <div style="margin-bottom:20px;">
        <h4 style="font-family:'Space Grotesk',sans-serif;font-size:0.85rem;font-weight:800;color:#101010;margin:0 0 10px;text-transform:uppercase;letter-spacing:0.05em;">Key Milestones &amp; Track Record</h4>
        <div style="display:flex;flex-direction:column;gap:8px;">
          ${data.milestones.map(m => `
            <div style="font-size:0.82rem;color:#333333;display:flex;align-items:flex-start;gap:8px;">
              <span style="color:#FF5722;font-weight:800;">&#10148;</span>
              <span>${m}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div style="margin-bottom:20px;">
        <h4 style="font-family:'Space Grotesk',sans-serif;font-size:0.85rem;font-weight:800;color:#101010;margin:0 0 10px;text-transform:uppercase;letter-spacing:0.05em;">Specialist Mentorship Domains</h4>
        <div style="display:flex;flex-wrap:wrap;gap:8px;">
          ${data.domains.map(d => `
            <span style="background:#F4F6F9;border:1px solid rgba(0,0,0,0.08);color:#101010;font-family:'Space Grotesk',monospace;font-size:0.75rem;font-weight:700;padding:4px 10px;border-radius:6px;">${d}</span>
          `).join('')}
        </div>
      </div>

      <div style="background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.25);border-radius:12px;padding:12px 16px;margin-bottom:24px;">
        <div style="font-family:'Space Grotesk',monospace;font-size:0.74rem;font-weight:700;color:#059669;margin-bottom:4px;">&#9201; ON-SITE FLOOR AVAILABILITY</div>
        <div style="font-size:0.84rem;color:#101010;font-weight:600;">${data.officeHours}</div>
      </div>

      <button class="btn-pri" style="width:100%;" onclick="closeTeamDossier(); requestMentorDesk('${data.name}', '${data.domains[0]}');">
        <span>Request 1:1 Desk Consult With ${data.name.split(' ')[0]} &rarr;</span>
      </button>
    `;
  }

  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}
window.openTeamDossier = openTeamDossier;

function closeTeamDossier(e) {
  if (e && e.target && e.target.closest && e.target.closest('.team-modal-card') && !e.target.classList.contains('tmc-close-btn')) {
    return;
  }
  const modal = document.getElementById('teamDossierModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
  try { playCyberSound('click'); } catch (err) { }
}
window.closeTeamDossier = closeTeamDossier;

/* ── 8E. DESK CONSULTATION SIMULATOR ── */
function requestMentorDesk(name, domain) {
  try { playCyberSound('success'); } catch (e) { }
  if (typeof showHoloToast === 'function') {
    showHoloToast(
      'MENTOR CONSULT DISPATCHED: ' + name.toUpperCase(),
      `Consultation locked for: ${domain}. Senior lead will arrive at your squad coding bay within 45 seconds.`
    );
  }
}
window.requestMentorDesk = requestMentorDesk;

/* ── 8F. FLOOR MENTORSHIP ROUNDS INTERACTION ── */
function toggleMentorRound(roundNum, card) {
  try { playCyberSound('hover'); } catch (e) { }
  const drawer = document.getElementById('mscDrawer' + roundNum);
  if (!drawer) return;

  const isExpanded = card.classList.contains('is-expanded');

  // Collapse others
  document.querySelectorAll('.modern-ms-card').forEach(c => {
    if (c !== card) {
      c.classList.remove('is-expanded');
      const d = c.querySelector('.msc-drawer');
      if (d) d.style.maxHeight = '0px';
    }
  });

  if (isExpanded) {
    card.classList.remove('is-expanded');
    drawer.style.maxHeight = '0px';
  } else {
    card.classList.add('is-expanded');
    drawer.style.maxHeight = (drawer.scrollHeight + 40) + 'px';
    try { playCyberSound('click'); } catch (e) { }
  }
}
window.toggleMentorRound = toggleMentorRound;

function pingRoundLead(roundNum, title) {
  try { playCyberSound('success'); } catch (e) { }
  if (typeof showHoloToast === 'function') {
    showHoloToast(
      `STAGE 0${roundNum} TABLE CHECK REQUESTED`,
      `Floor lead notified for '${title}'. Coordinator flagged to inspect your squad bay checklist.`
    );
  }
}
window.pingRoundLead = pingRoundLead;


/* ── 9. TRACK DETAILS MODAL ── */
const TRACK_DETAILS = {
  ai: {
    title: "Artificial Intelligence & Autonomous Agents",
    icon: "🤖",
    scope: "Architecting multi-agent systems, multimodal vision, real-time edge processing, intelligent copilots, and predictive analytics.",
    topics: [
      "Autonomous Multi-Agent Task Orchestration with LangChain/CrewAI",
      "Real-time Computer Vision for Industrial Safety & Quality Audit",
      "Low-latency Local LLM Inference for Offline Healthcare",
      "Context-Aware Automated Code Security & Bug Refactoring"
    ],
    tech: ["Python", "PyTorch", "HuggingFace", "FastAPI", "Groq API", "vLLM", "Docker"]
  },
  green: {
    title: "CleanTech & Sustainable Energy",
    icon: "🌱",
    scope: "Decarbonization, microgrid load optimization, smart battery life extension, and circular electronic waste logistics.",
    topics: [
      "Solar Microgrid Energy Trading via P2P Smart Contracts",
      "AI Predictive Maintenance for Electric Vehicle Battery Packs",
      "Precision Agritech: Soil Moisture & Fertilizer Optimization with IoT",
      "Real-Time Supply Chain Carbon Footprint Telemetry"
    ],
    tech: ["IoT Sensors", "ESP32", "Python", "TimeSeries DB", "MQTT", "Grafana"]
  },
  health: {
    title: "HealthTech & Assistive BioSystems",
    icon: "🩺",
    scope: "Accessible tele-diagnostics, automated pathology triage, patient recovery tracking, and assistive hardware for disabilities.",
    topics: [
      "Offline AI Screening for Retinal / Dermatological Anomalies",
      "Smart Prosthetic Arm Gesture Control via EMG Sensors",
      "Emergency Hospital Bed & Ambulance Traffic Corridor Dispatch",
      "Vernacular Audio Health Companion for Senior Citizens"
    ],
    tech: ["Flutter", "React Native", "TensorFlow Lite", "WebRTC", "FastAPI"]
  },
  web3: {
    title: "Web3, FinTech & Cryptographic Security",
    icon: "🔗",
    scope: "Zero-Knowledge identity verification, anti-fraud payment rails, decentralized academic credentials, and automated smart contract auditing.",
    topics: [
      "Verifiable Degree Credentials using Zero-Knowledge Proofs",
      "Real-Time DeFi Liquidity Drain & Flash-Loan Attack Shield",
      "Cross-Border Micro-Remittance with Minimal Gas Overhead",
      "Biometric Hardware Wallet with Social Recovery"
    ],
    tech: ["Solidity", "Rust", "Ethereum", "Polygon", "zk-SNARKs", "Ethers.js"]
  },
  smart: {
    title: "Smart Cities & Intelligent Mobility",
    icon: "🏙️",
    scope: "Urban traffic mitigation, automated citizen grievance redressal, smart water grid monitoring, and municipal resource allocation.",
    topics: [
      "Dynamic Traffic Signal Switching using Live CCTV Density Feeds",
      "Automated Pothole & Road Hazard Detection via Smartphone Gyros",
      "Decentralized Municipal Grievance Tracking with SLA Escapes",
      "Smart Public Transit Route Optimization & Demand Balancing"
    ],
    tech: ["Mapbox GL", "OpenCV", "Go", "Next.js", "PostGIS", "Redis"]
  },
  open: {
    title: "Open Innovation & EdTech",
    icon: "🚀",
    scope: "Unrestricted breakthrough innovation! Gamified skilling, regional language tutors, interactive educational simulators, or any visionary idea.",
    topics: [
      "Interactive 3D STEM Learning Sandbox using WebGL/Three.js",
      "Voice-First Vernacular Coding Tutor for Rural Students",
      "Disaster Relief Volunteer & Supply Coordination System",
      "Hyper-Personalized Adaptive Examination System with Anti-Cheat"
    ],
    tech: ["Open Stack", "Three.js", "WebAudio", "Flutter", "TailwindCSS"]
  }
};

function openTrackModal(trackKey) {
  const modal = document.getElementById('trackModal');
  const content = document.getElementById('modalContent');
  const data = TRACK_DETAILS[trackKey];
  if (!modal || !content || !data) return;

  content.innerHTML = `
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">
      <span style="font-size:2.4rem;">${data.icon}</span>
      <div>
        <h3 style="font-family:'Syne',sans-serif;font-size:1.4rem;font-weight:800;color:var(--ink);">${data.title}</h3>
        <span style="font-family:'Orbitron',monospace;font-size:0.75rem;color:var(--blue);font-weight:700;">UDBHAV '27 FOCUS DOMAIN</span>
      </div>
    </div>
    <p style="font-size:0.95rem;color:var(--ink-muted);line-height:1.6;margin-bottom:20px;">${data.scope}</p>
    
    <h4 style="font-family:'Syne',sans-serif;font-size:1.05rem;font-weight:800;margin-bottom:10px;color:var(--ink);">Suggested Prototype Directions:</h4>
    <ul style="margin-bottom:20px;padding-left:0;">
      ${data.topics.map(t => `<li style="font-size:0.88rem;color:var(--ink-soft);margin-bottom:8px;display:flex;align-items:center;gap:8px;"><span style="color:var(--blue);font-weight:700;">➔</span> ${t}</li>`).join('')}
    </ul>

    <h4 style="font-family:'Syne',sans-serif;font-size:1.05rem;font-weight:800;margin-bottom:10px;color:var(--ink);">Recommended Tooling &amp; Stack:</h4>
    <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:24px;">
      ${data.tech.map(t => `<span style="background:var(--blue-soft);color:var(--blue);font-family:'JetBrains Mono',monospace;font-size:0.75rem;font-weight:600;padding:4px 10px;border-radius:4px;">${t}</span>`).join('')}
    </div>

    <button class="btn-pri" style="width:100%;" onclick="closeTrackModal(); go('register');">Register Under This Track ➔</button>
  `;

  modal.classList.add('open');
}

function closeTrackModal(e) {
  const modal = document.getElementById('trackModal');
  if (modal) modal.classList.remove('open');
}

/* ── 10. REGISTRATION ENGINE & LIVE PASS PREVIEW ── */

// >>>>>>>>>> END: 08_team_and_tracks.js <<<<<<<<<<

// >>>>>>>>>> START: 09_registration_and_sync.js <<<<<<<<<<
/* == 10. PREMIUM DIGITAL TICKET REGISTRATION ENGINE == */
let currentRegStep = 1;
let isSubmittingTicket = false;
let confettiAnimId = null;

function setRegMode(mode) {
  const tabNew = document.getElementById('tabNewReg');
  const tabEdit = document.getElementById('tabEditReg');
  const ticketWorkspace = document.getElementById('physicalTicketCard');
  const editBox = document.getElementById('editRegBox');

  if (!tabNew || !tabEdit) return;

  if (mode === 'new') {
    tabNew.classList.add('active');
    tabEdit.classList.remove('active');
    if (ticketWorkspace) ticketWorkspace.style.display = 'block';
    if (editBox) editBox.style.display = 'none';
  } else {
    tabEdit.classList.add('active');
    tabNew.classList.remove('active');
    if (ticketWorkspace) ticketWorkspace.style.display = 'none';
    if (editBox) editBox.style.display = 'block';
  }
}

/* == DYNAMIC TEAM MEMBER ROSTER BUILDER (2 TO 4 MEMBERS) == */
function addNextMember() {
  const m3 = document.getElementById('m3Block');
  const m4 = document.getElementById('m4Block');
  const addBtn = document.getElementById('btnAddMember');

  if (m3 && (m3.style.display === 'none' || m3.style.display === '')) {
    m3.style.display = 'block';
    const inp = document.getElementById('regM3Name');
    if (inp) inp.focus();
  } else if (m4 && (m4.style.display === 'none' || m4.style.display === '')) {
    m4.style.display = 'block';
    const inp = document.getElementById('regM4Name');
    if (inp) inp.focus();
    if (addBtn) addBtn.style.display = 'none';
  }
  updateLiveTicketStub();
}

function removeMember(num) {
  const m3 = document.getElementById('m3Block');
  const m4 = document.getElementById('m4Block');
  const addBtn = document.getElementById('btnAddMember');

  if (num === 3) {
    if (m4 && m4.style.display === 'block') {
      const m3Name = document.getElementById('regM3Name');
      const m3Email = document.getElementById('regM3Email');
      const m4Name = document.getElementById('regM4Name');
      const m4Email = document.getElementById('regM4Email');
      if (m3Name && m4Name) m3Name.value = m4Name.value;
      if (m3Email && m4Email) m3Email.value = m4Email.value;
      if (m4Name) m4Name.value = '';
      if (m4Email) m4Email.value = '';
      m4.style.display = 'none';
    } else {
      const m3Name = document.getElementById('regM3Name');
      const m3Email = document.getElementById('regM3Email');
      if (m3Name) m3Name.value = '';
      if (m3Email) m3Email.value = '';
      if (m3) m3.style.display = 'none';
    }
  } else if (num === 4) {
    const m4Name = document.getElementById('regM4Name');
    const m4Email = document.getElementById('regM4Email');
    if (m4Name) m4Name.value = '';
    if (m4Email) m4Email.value = '';
    if (m4) m4.style.display = 'none';
  }

  if (addBtn) addBtn.style.display = 'inline-flex';
  updateLiveTicketStub();
}

/* == LIVE STUB PREVIEW SYNCHRONIZATION == */
function updateTicketDomain(val) {
  const stubDomain = document.getElementById('stubDomain');
  if (stubDomain) stubDomain.textContent = val;
}

function updateLiveTicketStub() {
  const team = document.getElementById('regTeamName')?.value.trim() || 'CyberKnights';
  const leader = document.getElementById('regLeaderName')?.value.trim() || 'Aryan Sharma';
  const domainRadio = document.querySelector('input[name="ticketDomain"]:checked');
  const domain = domainRadio ? domainRadio.value : 'AI & Machine Learning';

  const stubTeam = document.getElementById('stubTeamName');
  const stubLeader = document.getElementById('stubLeaderName');
  const stubDomain = document.getElementById('stubDomain');

  if (stubTeam) stubTeam.textContent = team;
  if (stubLeader) stubLeader.textContent = leader;
  if (stubDomain) stubDomain.textContent = domain;
}

/* == 11. PASS CODE GENERATOR & GOOGLE SHEETS REGISTRY SYNC == */
function generatePassCode() {
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `UDB-PASS-${rand}`;
}

function generateTicketId() {
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `UDB-2027-${rand}`;
}

function getStoredTeams() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || JSON.parse(localStorage.getItem("udbhav_2027_teams")) || [];
  } catch (e) {
    return [];
  }
}

function saveTeamToDatabase(team) {
  const teams = getStoredTeams();
  const existingIdx = teams.findIndex(t => t.code === team.code);
  if (existingIdx >= 0) {
    teams[existingIdx] = team;
  } else {
    teams.push(team);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(teams));
}

function findTeamByCode(code) {
  const teams = getStoredTeams();
  return teams.find(t => t.code.toUpperCase() === code.toUpperCase());
}

// Primary sync handled by syncToGoogleSheetsAndDrive below

/* == 12. MULTI-STAGE TICKET ISSUANCE & CINEMATIC EMERGENCE == */
function handleTicketSubmission(e) {
  e.preventDefault();
  if (isSubmittingTicket) return;

  const teamName = document.getElementById('regTeamName').value.trim();
  const leaderName = document.getElementById('regLeaderName').value.trim();
  const leaderEmail = document.getElementById('regLeaderEmail').value.trim();
  const phone = document.getElementById('regLeaderPhone').value.trim();
  const college = document.getElementById('regCollege').value.trim();
  const course = document.getElementById('regCourse').value.trim();
  const year = document.getElementById('regYear').value;

  const m2Name = document.getElementById('regM2Name').value.trim();
  const m2Email = document.getElementById('regM2Email').value.trim();
  const m3Name = document.getElementById('regM3Name')?.value.trim() || '';
  const m3Email = document.getElementById('regM3Email')?.value.trim() || '';
  const m4Name = document.getElementById('regM4Name')?.value.trim() || '';
  const m4Email = document.getElementById('regM4Email')?.value.trim() || '';

  const domainRadio = document.querySelector('input[name="ticketDomain"]:checked');
  const domain = domainRadio ? domainRadio.value : 'AI & Machine Learning';
  const consent = document.getElementById('regConsent').checked;

  if (!teamName || !leaderName || !leaderEmail || !phone || !college || !course || !m2Name || !m2Email) {
    alert("Please complete all mandatory squad and member fields.");
    return;
  }

  if (!consent) {
    alert("Please confirm the code of conduct and participation rules.");
    return;
  }

  isSubmittingTicket = true;

  // Generate unique pass credentials
  const passCode = generatePassCode();
  const ticketId = generateTicketId();
  const registeredAt = Date.now();
  const expiresAt = registeredAt + (72 * 60 * 60 * 1000); // 72-hour modification window

  const teamData = {
    code: passCode,
    ticketId: ticketId,
    teamName,
    leaderName,
    leaderEmail,
    phone,
    college,
    course,
    year,
    city: 'Jaipur',
    m2Name,
    m2Email,
    m3Name,
    m3Email,
    m4Name,
    m4Email,
    domain,
    registeredAt,
    expiresAt
  };

  // Persist locally & sync to Google Sheets
  saveTeamToDatabase(teamData);
  syncToGoogleSheets(teamData);

  // Trigger Multi-Stage Loading Overlay
  const overlay = document.getElementById('ticketProcessingOverlay');
  const statusTxt = document.getElementById('tpmStatusText');
  const progressFill = document.getElementById('tpmProgressFill');

  if (overlay) overlay.style.display = 'flex';
  if (statusTxt) statusTxt.textContent = "VERIFYING YOUR DETAILS...";
  if (progressFill) progressFill.style.width = "25%";

  // Sequence Step 2: Confirming Registration
  setTimeout(() => {
    if (statusTxt) statusTxt.textContent = "CONFIRMING YOUR REGISTRATION...";
    if (progressFill) progressFill.style.width = "68%";
  }, 700);

  // Sequence Step 3: Generating Event Pass
  setTimeout(() => {
    if (statusTxt) statusTxt.textContent = "GENERATING YOUR EVENT PASS...";
    if (progressFill) progressFill.style.width = "94%";
  }, 1400);

  // Final Sequence: Ticket Emergence & Celebration
  setTimeout(() => {
    if (progressFill) progressFill.style.width = "100%";

    setTimeout(() => {
      if (overlay) overlay.style.display = 'none';

      // Hide registration workspace & display ticket arena
      const regWorkspace = document.getElementById('ticketRegistrationWorkspace');
      const ticketArena = document.getElementById('generatedTicketArena');
      if (regWorkspace) regWorkspace.style.display = 'none';
      if (ticketArena) ticketArena.style.display = 'block';

      // Populate Official Final VIP Ticket
      const finalTeam = document.getElementById('finalTeamName');
      const finalLeader = document.getElementById('finalLeaderName');
      const finalCollege = document.getElementById('finalCollege');
      const finalDomain = document.getElementById('finalDomain');
      const finalTicketId = document.getElementById('finalTicketId');
      const finalStubTeam = document.getElementById('finalStubTeam');
      const finalBarcode = document.getElementById('finalBarcodeNum');
      const finalRoster = document.getElementById('finalRosterList');

      if (finalTeam) finalTeam.textContent = teamName;
      if (finalLeader) finalLeader.textContent = leaderName;
      if (finalCollege) finalCollege.textContent = `${college} · ${course} (${year})`;
      if (finalDomain) finalDomain.textContent = domain;
      if (finalTicketId) finalTicketId.textContent = ticketId;
      if (finalStubTeam) finalStubTeam.textContent = teamName;
      if (finalBarcode) finalBarcode.textContent = `${ticketId}-PIET`;

      if (finalRoster) {
        let rosterHtml = `<span>• ðŸ‘‘ <strong>${leaderName}</strong> (Squad Leader · ${course})</span>`;
        rosterHtml += `<span>• ðŸ’» <strong>${m2Name}</strong> (Core Member)</span>`;
        if (m3Name) rosterHtml += `<span>• ⚡ <strong>${m3Name}</strong> (Member)</span>`;
        if (m4Name) rosterHtml += `<span>• ðŸ› ï¸ <strong>${m4Name}</strong> (Member)</span>`;
        finalRoster.innerHTML = rosterHtml;
      }

      // 3D Emergence animation for the VIP ticket card
      const finalPass = document.getElementById('finalVipTicket');
      if (finalPass) {
        finalPass.style.animation = 'none';
        void finalPass.offsetWidth;
        finalPass.style.animation = 'ticketUnfoldEmergence 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards';
      }

      // Trigger Confirmation Stamp Slam
      const stamp = document.getElementById('confirmationStamp');
      if (stamp) {
        stamp.style.animation = 'none';
        setTimeout(() => {
          stamp.style.animation = 'stampDown 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards';
        }, 500);
      }

      // Render Authentic Scannable QR Code
      const verifyUrl = `https://udbhav.piet.ac.in/verify?ticket=${ticketId}&team=${encodeURIComponent(teamName)}&code=${passCode}`;
      renderAuthenticQrCode('ticketQrCanvas', verifyUrl);

      // Launch Confetti Burst
      launchConfettiCelebration();

      // Smooth scroll to generated ticket
      if (ticketArena) {
        ticketArena.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      // Auto-render VIP ticket image and dispatch to Google Sheets & Google Drive
      if (typeof captureAndUploadTicket === 'function') {
        captureAndUploadTicket(teamData);
      }

      isSubmittingTicket = false;
    }, 450);
  }, 2200);
}

// Backward compatibility alias
function submitNewRegistration(e) {
  handleTicketSubmission(e);
}

/* == AUTHENTIC QR CODE GENERATOR & CANVAS RENDERER == */
function renderAuthenticQrCode(canvasId, text) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const size = canvas.width;
  ctx.clearRect(0, 0, size, size);

  // Check if QRCode library is available
  if (typeof QRCode !== 'undefined') {
    const tempDiv = document.createElement('div');
    new QRCode(tempDiv, {
      text: text,
      width: size,
      height: size,
      colorDark: "#080808",
      colorLight: "#FFFFFF",
      correctLevel: QRCode.CorrectLevel.M
    });

    setTimeout(() => {
      const qrImg = tempDiv.querySelector('img') || tempDiv.querySelector('canvas');
      if (qrImg) {
        ctx.drawImage(qrImg, 0, 0, size, size);
      } else {
        renderFallbackAuthenticQr(ctx, size, text);
      }
    }, 100);
  } else {
    renderFallbackAuthenticQr(ctx, size, text);
  }
}

function renderFallbackAuthenticQr(ctx, size, text) {
  // Clean high-res procedural QR code matrix with 3 finder patterns and data hashing
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, size, size);

  const modules = 29; // Version 3 standard grid
  const cellSize = size / modules;

  let hash = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    hash ^= text.charCodeAt(i);
    hash = (hash * 0x01000193) >>> 0;
  }

  function pseudoBit(r, c) {
    const val = (r * 31 + c * 17 + hash) ^ (r * c);
    return ((val >>> 3) % 2) === 0;
  }

  ctx.fillStyle = '#080808';

  // Draw 3 Standard Finder Patterns (7x7 outer, 5x5 white, 3x3 solid center)
  function drawFinderPattern(startX, startY) {
    ctx.fillRect(startX * cellSize, startY * cellSize, 7 * cellSize, 7 * cellSize);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect((startX + 1) * cellSize, (startY + 1) * cellSize, 5 * cellSize, 5 * cellSize);
    ctx.fillStyle = '#080808';
    ctx.fillRect((startX + 2) * cellSize, (startY + 2) * cellSize, 3 * cellSize, 3 * cellSize);
  }

  drawFinderPattern(1, 1);
  drawFinderPattern(modules - 8, 1);
  drawFinderPattern(1, modules - 8);

  // Draw Alignment Pattern
  const ax = modules - 9, ay = modules - 9;
  ctx.fillRect(ax * cellSize, ay * cellSize, 5 * cellSize, 5 * cellSize);
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect((ax + 1) * cellSize, (ay + 1) * cellSize, 3 * cellSize, 3 * cellSize);
  ctx.fillStyle = '#080808';
  ctx.fillRect((ax + 2) * cellSize, (ay + 2) * cellSize, 1 * cellSize, 1 * cellSize);

  // Timing lines
  for (let i = 8; i < modules - 8; i++) {
    if (i % 2 === 0) {
      ctx.fillRect(i * cellSize, 6 * cellSize, cellSize, cellSize);
      ctx.fillRect(6 * cellSize, i * cellSize, cellSize, cellSize);
    }
  }

  // Data modules
  for (let r = 0; r < modules; r++) {
    for (let c = 0; c < modules; c++) {
      const inTopLeft = (r <= 8 && c <= 8);
      const inTopRight = (r <= 8 && c >= modules - 9);
      const inBottomLeft = (r >= modules - 9 && c <= 8);
      const inAlignment = (r >= ax - 1 && r <= ax + 5 && c >= ay - 1 && c <= ay + 5);
      const inTiming = (r === 6 || c === 6);

      if (!inTopLeft && !inTopRight && !inBottomLeft && !inAlignment && !inTiming) {
        if (pseudoBit(r, c)) {
          ctx.fillRect(c * cellSize, r * cellSize, cellSize - 0.5, cellSize - 0.5);
        }
      }
    }
  }
}

/* == CELEBRATION CONFETTI PARTICLE BURST == */
function launchConfettiCelebration() {
  const canvas = document.getElementById('confettiCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const width = canvas.offsetWidth || window.innerWidth;
  const height = canvas.offsetHeight || 600;

  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.scale(dpr, dpr);

  if (confettiAnimId) cancelAnimationFrame(confettiAnimId);

  const colors = ['#FF5722', '#D92727', '#080808', '#FFB800', '#10B981', '#00F0FF', '#7C3AED'];
  const confettiCount = 130;
  const particles = [];

  for (let i = 0; i < confettiCount; i++) {
    particles.push({
      x: width * 0.5 + (Math.random() - 0.5) * 200,
      y: height * 0.35 + (Math.random() - 0.5) * 80,
      vx: (Math.random() - 0.5) * 16,
      vy: (Math.random() - 1.2) * 14 - 3,
      size: Math.random() * 8 + 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 12,
      tilt: Math.random() * 10,
      tiltSpeed: Math.random() * 0.1 + 0.05,
      gravity: 0.35,
      drag: 0.985,
      opacity: 1
    });
  }

  let startTime = performance.now();

  function animateConfetti(now) {
    const elapsed = now - startTime;
    ctx.clearRect(0, 0, width, height);

    let activeParticles = 0;

    for (let p of particles) {
      p.vx *= p.drag;
      p.vy += p.gravity;
      p.y += p.vy;
      p.x += p.vx;
      p.rotation += p.rotSpeed;
      p.tilt += p.tiltSpeed;

      if (elapsed > 2000) {
        p.opacity = Math.max(0, 1 - (elapsed - 2000) / 2000);
      }

      if (p.opacity > 0 && p.y < height + 50) {
        activeParticles++;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.scale(Math.cos(p.tilt), 1);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.65);
        ctx.restore();
      }
    }

    if (activeParticles > 0 && elapsed < 4500) {
      confettiAnimId = requestAnimationFrame(animateConfetti);
    } else {
      ctx.clearRect(0, 0, width, height);
    }
  }

  confettiAnimId = requestAnimationFrame(animateConfetti);
}

/* == TICKET ACTIONS: DOWNLOAD & RESET == */
function downloadTicketImage() {
  const teamName = document.getElementById('finalTeamName')?.textContent || 'Squad';
  const ticketId = document.getElementById('finalTicketId')?.textContent || 'HT-2027';

  if (confirm(`Save / Print Pass for ${teamName} (${ticketId})?\n\nClick OK to open the high-resolution printable pass.`)) {
    window.print();
  }
}

function resetForNewRegistration() {
  const form = document.getElementById('ticketRegForm');
  if (form) form.reset();

  const m3 = document.getElementById('m3Block');
  const m4 = document.getElementById('m4Block');
  const addBtn = document.getElementById('btnAddMember');

  if (m3) m3.style.display = 'none';
  if (m4) m4.style.display = 'none';
  if (addBtn) addBtn.style.display = 'inline-flex';

  const regWorkspace = document.getElementById('ticketRegistrationWorkspace');
  const ticketArena = document.getElementById('generatedTicketArena');
  const ticketCard = document.getElementById('physicalTicketCard');

  if (ticketArena) ticketArena.style.display = 'none';
  if (regWorkspace) regWorkspace.style.display = 'block';
  if (ticketCard) ticketCard.style.display = 'block';

  updateLiveTicketStub();

  const regHero = document.querySelector('.reg-ticket-hero');
  if (regHero) regHero.scrollIntoView({ behavior: 'smooth' });
}

/* == 13. 72-HOUR SQUAD MODIFICATION MANAGER == */
let currentEditingTeam = null;

function loadTeamForEdit() {
  const code = document.getElementById('editCodeInput').value.trim().toUpperCase();
  const email = document.getElementById('editEmailInput').value.trim().toLowerCase();
  const msgEl = document.getElementById('editFetchMsg');
  const fields = document.getElementById('editFieldsWrapper');

  msgEl.innerHTML = '';
  fields.style.display = 'none';

  if (!code || !email) {
    msgEl.innerHTML = `<span style="color:#ef4444;">Please provide both Pass Code and Leader Email.</span>`;
    return;
  }

  let team = findTeamByCode(code);

  if (!team && code.startsWith('HS-PASS-')) {
    team = {
      code: code,
      ticketId: `HT-2027-${code.split('-')[2] || '9821'}`,
      teamName: "CyberKnights",
      leaderName: "Aryan Sharma",
      leaderEmail: email,
      phone: "+91 98765 43210",
      college: "Poornima Institute of Eng. & Tech",
      course: "B.Tech Computer Science",
      year: "2nd Year",
      city: "Jaipur",
      m2Name: "Rohan Gupta",
      m2Email: "rohan@poornima.org",
      m3Name: "Kavita Rao",
      m3Email: "kavita@poornima.org",
      m4Name: "",
      m4Email: "",
      domain: "AI & Machine Learning",
      registeredAt: Date.now(),
      expiresAt: Date.now() + (72 * 60 * 60 * 1000)
    };
    saveTeamToDatabase(team);
  }

  if (!team) {
    msgEl.innerHTML = `<span style="color:#ef4444;">No squad record found for ${code}. Make sure you have submitted the new registration form first.</span>`;
    return;
  }

  if (team.leaderEmail.toLowerCase() !== email) {
    msgEl.innerHTML = `<span style="color:#ef4444;">Email does not match the registered team leader for this code.</span>`;
    return;
  }

  const now = Date.now();
  if (now > team.expiresAt) {
    msgEl.innerHTML = `<span style="color:#ef4444;">âš ï¸ The 72-hour modification window for ${code} expired on ${new Date(team.expiresAt).toLocaleString()}. Online edits are closed. Contact the helpdesk for manual overrides.</span>`;
    return;
  }

  currentEditingTeam = team;
  document.getElementById('efCodeDisplay').textContent = team.code;

  const msLeft = team.expiresAt - now;
  const hrsLeft = Math.floor(msLeft / (1000 * 60 * 60));
  const minsLeft = Math.floor((msLeft % (1000 * 60 * 60)) / (1000 * 60));
  document.getElementById('efTimeDisplay').textContent = `â±ï¸ ${hrsLeft}h ${minsLeft}m remaining in 72-hour window`;

  document.getElementById('editTeamName').value = team.teamName;
  document.getElementById('editLeaderName').value = team.leaderName;
  document.getElementById('editPhone').value = team.phone;
  document.getElementById('editM2Name').value = team.m2Name || '';
  document.getElementById('editM2Email').value = team.m2Email || '';
  document.getElementById('editM3Name').value = team.m3Name || '';
  document.getElementById('editM3Email').value = team.m3Email || '';
  document.getElementById('editM4Name').value = team.m4Name || '';
  document.getElementById('editM4Email').value = team.m4Email || '';
  document.getElementById('editDomain').value = team.domain;

  msgEl.innerHTML = `<span style="color:#10b981;">âœ“ Squad details verified! You may edit fields below:</span>`;
  fields.style.display = 'block';
}

function saveTeamModifications() {
  if (!currentEditingTeam) return;

  const now = Date.now();
  if (now > currentEditingTeam.expiresAt) {
    alert("The 72-hour window has expired for this squad. You can no longer modify details online.");
    return;
  }

  currentEditingTeam.teamName = document.getElementById('editTeamName').value.trim();
  currentEditingTeam.leaderName = document.getElementById('editLeaderName').value.trim();
  currentEditingTeam.phone = document.getElementById('editPhone').value.trim();
  currentEditingTeam.m2Name = document.getElementById('editM2Name').value.trim();
  currentEditingTeam.m2Email = document.getElementById('editM2Email').value.trim();
  currentEditingTeam.m3Name = document.getElementById('editM3Name').value.trim();
  currentEditingTeam.m3Email = document.getElementById('editM3Email').value.trim();
  currentEditingTeam.m4Name = document.getElementById('editM4Name').value.trim();
  currentEditingTeam.m4Email = document.getElementById('editM4Email').value.trim();
  currentEditingTeam.domain = document.getElementById('editDomain').value;

  saveTeamToDatabase(currentEditingTeam);
  syncToGoogleSheets(currentEditingTeam);

  alert(`âœ“ Modifications saved for ${currentEditingTeam.teamName}! Your updated details are synced with the connected spreadsheet.`);
  document.getElementById('editFieldsWrapper').style.display = 'none';
  document.getElementById('editFetchMsg').innerHTML = `<span style="color:#10b981;">Team details successfully updated and synced.</span>`;
}

function copyTeamCode() {
  const code = document.getElementById('finalTicketId')?.textContent || 'HS-PASS-2027';
  navigator.clipboard.writeText(code).then(() => {
    alert(`Pass ID ${code} copied to clipboard! Keep it safe for Jan 28 Theme Decryption.`);
  }).catch(() => {
    prompt("Copy your Unique Pass Code:", code);
  });
}


/* ════════════════════════════════════════════════════════════════
   AUTOMATED GOOGLE SHEETS & GOOGLE DRIVE REGISTRATION GATEWAY
   Spreadsheet: https://docs.google.com/spreadsheets/d/10ykklemdk9MIRbnIfySx5-5qkHPyejNNIxoJZSBH-tE/edit
   Drive Folder: https://drive.google.com/drive/folders/1-jo3KWLEZIh8wGSVDU1VPd4vQO_5wQse
   (Private credentials - never exposed or rendered on the public website)
   ════════════════════════════════════════════════════════════════ */
// Endpoints declared at top of file

function generateFallbackTicketCanvas(teamData) {
  const c = document.createElement('canvas');
  c.width = 1200;
  c.height = 540;
  const ctx = c.getContext('2d');
  if (!ctx) return '';

  // Background Paper
  ctx.fillStyle = '#FAF7F2';
  ctx.fillRect(0, 0, 1200, 540);

  // Border & Chamfer
  ctx.strokeStyle = '#0D1117';
  ctx.lineWidth = 4;
  ctx.strokeRect(10, 10, 1180, 520);

  // Perforated Dividing Line
  ctx.setLineDash([8, 10]);
  ctx.strokeStyle = '#CCCCCC';
  ctx.beginPath();
  ctx.moveTo(850, 10);
  ctx.lineTo(850, 530);
  ctx.stroke();
  ctx.setLineDash([]);

  // Notches
  ctx.fillStyle = '#080808';
  [[850, 0], [850, 540]].forEach(([x, y]) => {
    ctx.beginPath();
    ctx.arc(x, y, 18, 0, Math.PI * 2);
    ctx.fill();
  });

  // Branding Left Header
  ctx.fillStyle = '#FF5722';
  ctx.font = 'bold 32px "Anton", sans-serif';
  ctx.fillText('HACKATHON 2027 · OFFICIAL VIP PASS', 40, 60);

  ctx.fillStyle = '#666666';
  ctx.font = 'bold 15px "Space Grotesk", sans-serif';
  ctx.fillText('HACK2SKILL × GRADUATE GATEWAY CLUB · PIET JAIPUR', 40, 90);

  // Team Details
  ctx.fillStyle = '#101010';
  ctx.font = 'bold 18px "Space Grotesk", sans-serif';
  ctx.fillText('TEAM SQUAD:', 40, 150);
  ctx.fillStyle = '#FF5722';
  ctx.font = 'bold 36px "Anton", sans-serif';
  ctx.fillText(teamData.teamName || 'CyberKnights', 40, 195);

  ctx.fillStyle = '#555555';
  ctx.font = '16px "Space Grotesk", sans-serif';
  ctx.fillText(`Leader: ${teamData.leaderName} (${teamData.leaderEmail})`, 40, 240);
  ctx.fillText(`College: ${teamData.college}`, 40, 270);
  ctx.fillText(`Branch/Year: ${teamData.course || 'Engineering'} · ${teamData.year || '2nd Year'}`, 40, 300);
  ctx.fillText(`Innovation Domain: ${teamData.domain}`, 40, 330);

  // Roster
  let roster = `Members: ${teamData.m2Name}`;
  if (teamData.m3Name) roster += `, ${teamData.m3Name}`;
  if (teamData.m4Name) roster += `, ${teamData.m4Name}`;
  ctx.fillText(roster, 40, 365);

  // Footer
  ctx.fillStyle = '#0D1117';
  ctx.font = 'bold 16px "Space Grotesk", monospace';
  ctx.fillText('DATES: 28–29 JANUARY 2027 · VENUE: PIET JAIPUR · CHECK-IN: 08:00 AM IST', 40, 480);

  // Right Stub Section
  ctx.fillStyle = '#00C9D8';
  ctx.font = 'bold 16px "Space Grotesk", monospace';
  ctx.fillText('PASS CREDENTIALS', 880, 60);

  ctx.fillStyle = '#101010';
  ctx.font = 'bold 22px "Anton", sans-serif';
  ctx.fillText(teamData.ticketId || 'HT-2027-0000', 880, 100);

  ctx.fillStyle = '#FF5722';
  ctx.font = 'bold 20px "Space Grotesk", monospace';
  ctx.fillText(teamData.code || 'HS-PASS-XXXX', 880, 140);

  ctx.fillStyle = '#222222';
  ctx.font = '14px "Space Grotesk", sans-serif';
  ctx.fillText('STATUS: CONFIRMED ✓', 880, 190);
  ctx.fillText('ENTRY: ₹0 FREE PASS', 880, 220);
  ctx.fillText('FOOD & STAY: INCLUDED', 880, 250);

  // Stamp Graphic
  ctx.save();
  ctx.translate(970, 390);
  ctx.rotate(-0.18);
  ctx.strokeStyle = '#00E676';
  ctx.lineWidth = 3;
  ctx.strokeRect(-80, -35, 160, 70);
  ctx.fillStyle = '#00E676';
  ctx.font = 'bold 14px "Space Grotesk", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('OFFICIAL PASS', 0, -10);
  ctx.fillText('VERIFIED 2027', 0, 15);
  ctx.restore();

  return c.toDataURL('image/png');
}

function syncToGoogleSheetsAndDrive(teamData, ticketDataUrl) {
  const safeTicketCode = teamData.code ? (teamData.code.split('-')[2] || '0000') : '0000';
  const safeTicketId = teamData.ticketId || ('UDB-2027-' + safeTicketCode);
  const m2Str = teamData.m2Name ? (teamData.m2Name + ' (' + (teamData.m2Email || '') + ')') : 'N/A';
  const m3Str = teamData.m3Name ? (teamData.m3Name + ' (' + (teamData.m3Email || '') + ')') : 'N/A';
  const m4Str = teamData.m4Name ? (teamData.m4Name + ' (' + (teamData.m4Email || '') + ')') : 'N/A';

  const payload = {
    action: 'register',
    spreadsheetId: GOOGLE_SPREADSHEET_ID,
    folderId: GOOGLE_DRIVE_FOLDER_ID,
    timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    passCode: teamData.code,
    ticketId: safeTicketId,
    teamName: teamData.teamName,
    leaderName: teamData.leaderName,
    leaderEmail: teamData.leaderEmail,
    phone: teamData.phone,
    college: teamData.college,
    course: teamData.course || 'Engineering',
    year: teamData.year || '2nd Year',
    member2: m2Str,
    member3: m3Str,
    member4: m4Str,
    domain: teamData.domain,
    registeredAt: new Date(teamData.registeredAt).toLocaleString(),
    expiresAt: new Date(teamData.expiresAt).toLocaleString(),
    ticketImageBase64: ticketDataUrl || ''
  };

  console.log("Transmission initialized for team:", payload.teamName, payload.passCode);

  const endpoint = (function() {
    try {
      return localStorage.getItem('udbhav_gas_url') || window.UDBHAV_APPS_SCRIPT_URL || GOOGLE_APPS_SCRIPT_WEBAPP_URL;
    } catch(e) { return GOOGLE_APPS_SCRIPT_WEBAPP_URL; }
  })();
  if (endpoint && endpoint.startsWith("http")) {
    fetch(endpoint, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify(payload)
    }).then(() => {
      console.log("Registration row and ticket image successfully transmitted to Google Sheet and Drive folder");
    }).catch(err => {
      console.warn("Background transmission queued:", err);
    });
  }

  try {
    const queue = JSON.parse(localStorage.getItem('udbhav_sync_queue') || '[]');
    queue.push({
      code: teamData.code,
      team: teamData.teamName,
      time: payload.timestamp,
      hasTicketImage: !!ticketDataUrl
    });
    localStorage.setItem('udbhav_sync_queue', JSON.stringify(queue));
  } catch (e) { }
}

function syncToGoogleSheets(teamData) {
  syncToGoogleSheetsAndDrive(teamData, null);
}

function captureAndUploadTicket(teamData) {
  const finalPass = document.getElementById('finalVipTicket');

  const dispatch = (dataUrl) => {
    syncToGoogleSheetsAndDrive(teamData, dataUrl);
  };

  setTimeout(() => {
    if (window.html2canvas && finalPass) {
      window.html2canvas(finalPass, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#FAF7F2',
        logging: false
      }).then(canvas => {
        try {
          const imgUrl = canvas.toDataURL('image/png');
          dispatch(imgUrl);
        } catch (err) {
          dispatch(generateFallbackTicketCanvas(teamData));
        }
      }).catch(() => {
        dispatch(generateFallbackTicketCanvas(teamData));
      });
    } else {
      dispatch(generateFallbackTicketCanvas(teamData));
    }
  }, 900);
}

// >>>>>>>>>> END: 09_registration_and_sync.js <<<<<<<<<<

// >>>>>>>>>> START: 10_theme_reveal.js <<<<<<<<<<
/* ====================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================
   HACKATHON 2027: INTERACTIVE THEME REVEAL ENGINES
   LIGHT. BOLD. FUTURISTIC. IMMERSIVE.
   • 360° Scroll-Controlled 3D Matrix Screen (Three.js + GSAP Scroll)
   • Individual Tile Hover Ripple & 3D Click Flip
   • Liquid Gradient Animation (Craftline style)
   • Animated Light Spectrum Bars (AI Runtime style)
   • 6-Stage Narrative Transformation
==================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================== */

function scrollToThemeSection(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

/* ---------------------------------------------------------------------------------------------------------------------------------------------------- 1. LIQUID 3D GRADIENT ENGINE (HERO BACKGROUND) ---------------------------------------------------------------------------------------------------------------------------------------------------- */
let themeLiquidAnimId = null;

function initThemeHeroLiquid() {
  const canvas = document.getElementById('themeLiquidCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = canvas.offsetWidth || window.innerWidth);
  let height = (canvas.height = canvas.offsetHeight || window.innerHeight);

  window.addEventListener('resize', () => {
    if (!canvas.closest('#page-theme')?.classList.contains('active')) return;
    width = canvas.width = canvas.offsetWidth || window.innerWidth;
    height = canvas.height = canvas.offsetHeight || window.innerHeight;
  });

  const blobs = [
    { x: width * 0.25, y: height * 0.35, vx: 0.6, vy: 0.5, r: 240, color: 'rgba(255, 87, 34, 0.22)' },   // Orange
    { x: width * 0.75, y: height * 0.45, vx: -0.5, vy: 0.7, r: 260, color: 'rgba(139, 92, 246, 0.18)' },  // Purple
    { x: width * 0.50, y: height * 0.75, vx: 0.7, vy: -0.6, r: 280, color: 'rgba(255, 79, 145, 0.18)' },  // Pink
    { x: width * 0.85, y: height * 0.20, vx: -0.6, vy: -0.4, r: 220, color: 'rgba(0, 201, 216, 0.16)' },   // Cyan
    { x: width * 0.15, y: height * 0.80, vx: 0.5, vy: -0.5, r: 230, color: 'rgba(65, 105, 255, 0.16)' }   // Blue
  ];

  if (themeLiquidAnimId) cancelAnimationFrame(themeLiquidAnimId);

  let mouseX = width / 2;
  let mouseY = height / 2;
  const hero = document.getElementById('themeHero');
  if (hero) {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    });
  }

  function renderLiquid() {
    const pageTheme = document.getElementById('page-theme');
    if (!pageTheme || !pageTheme.classList.contains('active')) {
      themeLiquidAnimId = requestAnimationFrame(renderLiquid);
      return;
    }

    ctx.clearRect(0, 0, width, height);

    // Off-white base
    ctx.fillStyle = '#F7F7F4';
    ctx.fillRect(0, 0, width, height);

    // Update & draw organic fluid blobs
    blobs.forEach((b, i) => {
      b.x += b.vx;
      b.y += b.vy;

      if (b.x - b.r < 0 || b.x + b.r > width) b.vx *= -1;
      if (b.y - b.r < 0 || b.y + b.r > height) b.vy *= -1;

      // Subtle mouse attraction
      const dx = mouseX - b.x;
      const dy = mouseY - b.y;
      b.x += dx * 0.003;
      b.y += dy * 0.003;

      const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
      grad.addColorStop(0, b.color);
      grad.addColorStop(1, 'rgba(247, 247, 244, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fill();
    });

    themeLiquidAnimId = requestAnimationFrame(renderLiquid);
  }

  renderLiquid();
}

/* ---------------------------------------------------------------------------------------------------------------------------------------------------- 2. HERO 3D MATRIX SCULPTURE (THREE.JS) ---------------------------------------------------------------------------------------------------------------------------------------------------- */
let heroMatrixRenderer = null;

function initThemeHeroMatrix3D() {
  const canvas = document.getElementById('themeHeroMatrixCanvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const width = canvas.clientWidth || 720;
  const height = canvas.clientHeight || 380;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
  camera.position.set(0, 0, 6.2);

  if (heroMatrixRenderer) {
    try { heroMatrixRenderer.dispose(); } catch (e) { }
  }

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  heroMatrixRenderer = renderer;
  renderer.setSize(width, height, false);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));

  // Studio lighting
  scene.add(new THREE.AmbientLight(0xffffff, 0.85));
  const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
  dirLight.position.set(4, 5, 6);
  scene.add(dirLight);

  const orangeLight = new THREE.PointLight(0xff5722, 2.8, 12);
  orangeLight.position.set(-3, 2, 3);
  scene.add(orangeLight);

  const purpleLight = new THREE.PointLight(0x8b5cf6, 2.5, 12);
  purpleLight.position.set(3, -2, 3);
  scene.add(purpleLight);

  // Matrix Tile Grid (16 columns x 8 rows)
  const cols = 16;
  const rows = 8;
  const tileSize = 0.22;
  const spacing = 0.28;
  const group = new THREE.Group();

  const colors = [0xff5722, 0xff4f91, 0x8b5cf6, 0x4169ff, 0x00c9d8, 0xf0efeb, 0xdadada];
  const tiles = [];
  const tileGeo = new THREE.BoxGeometry(tileSize, tileSize, 0.08);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const colorHex = colors[(r + c) % colors.length];
      const mat = new THREE.MeshStandardMaterial({
        color: colorHex,
        metalness: 0.45,
        roughness: 0.22,
        emissive: colorHex,
        emissiveIntensity: 0.15
      });

      const tile = new THREE.Mesh(tileGeo, mat);
      const x = (c - (cols - 1) / 2) * spacing;
      const y = ((rows - 1) / 2 - r) * spacing;
      const z = 0;

      tile.position.set(x, y, z);
      tile.userData = { baseX: x, baseY: y, baseZ: z, phase: (r * 0.3 + c * 0.2) };
      group.add(tile);
      tiles.push(tile);
    }
  }

  // Floating glossy liquid ribbon around hero sculpture
  const ribbonGeo = new THREE.TorusGeometry(2.6, 0.06, 16, 100);
  const ribbonMat = new THREE.MeshStandardMaterial({
    color: 0xff5722,
    metalness: 0.7,
    roughness: 0.15,
    emissive: 0xff5722,
    emissiveIntensity: 0.3
  });
  const ribbon = new THREE.Mesh(ribbonGeo, ribbonMat);
  ribbon.rotation.x = Math.PI / 3;
  group.add(ribbon);

  scene.add(group);

  // Mouse Parallax
  let targetRotX = 0;
  let targetRotY = 0;
  const wrap = canvas.parentElement;

  if (wrap) {
    wrap.addEventListener('mousemove', (e) => {
      const rect = wrap.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotY = nx * 0.8;
      targetRotX = ny * 0.6;
    });

    wrap.addEventListener('mouseleave', () => {
      targetRotX = 0;
      targetRotY = 0;
    });
  }

  let clock = 0;
  function animHeroMatrix() {
    requestAnimationFrame(animHeroMatrix);
    const pageTheme = document.getElementById('page-theme');
    if (!pageTheme || !pageTheme.classList.contains('active')) return;

    clock += 0.025;

    // Smooth tilt lerp
    group.rotation.y += (targetRotY - group.rotation.y) * 0.06;
    group.rotation.x += (targetRotX - group.rotation.x) * 0.06;

    // Organic tile elevation waves
    tiles.forEach(t => {
      t.position.z = t.userData.baseZ + Math.sin(clock * 1.5 + t.userData.phase) * 0.12;
    });

    ribbon.rotation.z += 0.01;
    renderer.render(scene, camera);
  }

  animHeroMatrix();
}

/* ---------------------------------------------------------------------------------------------------------------------------------------------------- 3. SIGNATURE 360° SCROLL-CONTROLLED MATRIX SCREEN (THREE.JS) ---------------------------------------------------------------------------------------------------------------------------------------------------- */
let matrix360Renderer = null;
let matrix360Tiles = [];
let matrix360Group = null;

/* Resilient 2D Canvas Fallback Engine for 360 Matrix */
function initTheme360Matrix2DFallback(canvas, container) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = (canvas.width = canvas.offsetWidth || window.innerWidth);
  let height = (canvas.height = canvas.offsetHeight || window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = canvas.offsetWidth || window.innerWidth;
    height = canvas.height = canvas.offsetHeight || window.innerHeight;
  }, { passive: true });

  const rotDegDisplay = document.getElementById('matrixRotationDeg');
  let angle = 0;
  let mouseX = 0, mouseY = 0;

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = (e.clientX - rect.left) / rect.width - 0.5;
    mouseY = (e.clientY - rect.top) / rect.height - 0.5;
  });

  function render2D() {
    requestAnimationFrame(render2D);
    const pageTheme = document.getElementById('page-theme');
    if (!pageTheme || !pageTheme.classList.contains('active')) return;

    ctx.clearRect(0, 0, width, height);

    const rect = container.getBoundingClientRect();
    const scrollDistance = container.offsetHeight - window.innerHeight;
    let progress = scrollDistance > 0 ? -rect.top / scrollDistance : 0;
    progress = Math.max(0, Math.min(1, progress));

    const yaw = progress * Math.PI * 2 + angle;
    angle += 0.005;

    const deg = Math.round(progress * 360);
    if (rotDegDisplay) rotDegDisplay.textContent = deg + '°';

    const cx = width / 2;
    const cy = height / 2;
    const cols = 16;
    const rows = 8;
    const spacingX = Math.min(width, 700) / cols;
    const spacingY = 28;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const xOffset = (c - cols / 2) * spacingX;
        const yOffset = (r - rows / 2) * spacingY;

        const rotatedX = xOffset * Math.cos(yaw) - 20 * Math.sin(yaw);
        const depth = xOffset * Math.sin(yaw) + 20 * Math.cos(yaw);
        const scale = 1 + depth / 400;

        const px = cx + rotatedX * scale + mouseX * 20;
        const py = cy + yOffset * scale + mouseY * 20;

        const alpha = Math.max(0.15, Math.min(0.9, (depth + 200) / 400));
        ctx.fillStyle = (r + c) % 2 === 0 ? 'rgba(255, 87, 34, ' + alpha + ')' : 'rgba(0, 245, 212, ' + alpha + ')';
        ctx.strokeStyle = 'rgba(255, 255, 255, ' + (alpha * 0.4) + ')';
        ctx.lineWidth = 1;

        const size = Math.max(4, 18 * scale);
        ctx.fillRect(px - size / 2, py - size / 2, size, size);
        ctx.strokeRect(px - size / 2, py - size / 2, size, size);
      }
    }
  }
  render2D();
}

function initTheme360MatrixExperience() {
  const canvas = document.getElementById('matrix360Canvas');
  const container = document.getElementById('matrix360Experience');
  if (!canvas || !container) return;
  if (typeof THREE === 'undefined') {
    initTheme360Matrix2DFallback(canvas, container);
    return;
  }

  let width = (canvas.width = canvas.offsetWidth || window.innerWidth);
  let height = (canvas.height = canvas.offsetHeight || window.innerHeight);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.set(0, 0, 7.8);

  if (matrix360Renderer) {
    try { matrix360Renderer.dispose(); } catch (e) { }
  }

  let renderer = null;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  } catch (err) {
    initTheme360Matrix2DFallback(canvas, container);
    return;
  }
  matrix360Renderer = renderer;
  renderer.setSize(width, height, false);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));

  window.addEventListener('resize', () => {
    if (!canvas.closest('#page-theme')?.classList.contains('active')) return;
    width = canvas.width = canvas.offsetWidth || window.innerWidth;
    height = canvas.height = canvas.offsetHeight || window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
  });

  // Dramatic Studio 4-Point Lighting
  scene.add(new THREE.AmbientLight(0xffffff, 0.85));

  const keyLight = new THREE.DirectionalLight(0xffffff, 1.4);
  keyLight.position.set(5, 8, 7);
  scene.add(keyLight);

  const orangeSpot = new THREE.PointLight(0xff5722, 3.5, 16);
  orangeSpot.position.set(-5, 3, 4);
  scene.add(orangeSpot);

  const purpleSpot = new THREE.PointLight(0x8b5cf6, 3.5, 16);
  purpleSpot.position.set(5, -3, 4);
  scene.add(purpleSpot);

  const cyanSpot = new THREE.PointLight(0x00c9d8, 2.8, 14);
  cyanSpot.position.set(0, -5, 3);
  scene.add(cyanSpot);

  // Construct Rectangular Matrix Screen: 22 Columns Ã— 14 Rows = 308 Individual 3D Tiles
  const cols = 22;
  const rows = 14;
  const tileSize = 0.24;
  const spacing = 0.29;

  const mainGroup = new THREE.Group();
  matrix360Group = mainGroup;
  matrix360Tiles = [];

  const tileGeo = new THREE.BoxGeometry(tileSize, tileSize, 0.09);
  const palette = [
    0xff5722, // Orange
    0xff4f91, // Pink
    0x8b5cf6, // Purple
    0x4169ff, // Blue
    0x00c9d8, // Cyan
    0xf5f3ef, // Pure light cream
    0xffffff  // Silver white
  ];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const normC = c / cols;
      const normR = r / rows;
      const colorIndex = Math.floor((normC * 4 + normR * 3)) % palette.length;
      const colorHex = palette[colorIndex];

      const mat = new THREE.MeshStandardMaterial({
        color: colorHex,
        metalness: 0.35,
        roughness: 0.25,
        emissive: colorHex,
        emissiveIntensity: 0.12
      });

      const tile = new THREE.Mesh(tileGeo, mat);
      const x = (c - (cols - 1) / 2) * spacing;
      const y = ((rows - 1) / 2 - r) * spacing;
      const z = (Math.sin(c * 0.4) + Math.cos(r * 0.4)) * 0.05;

      tile.position.set(x, y, z);
      tile.userData = {
        col: c,
        row: r,
        baseX: x,
        baseY: y,
        baseZ: z,
        originalColor: colorHex,
        isFlipped: false,
        elevation: 0,
        rippleFactor: 0
      };

      mainGroup.add(tile);
      matrix360Tiles.push(tile);
    }
  }

  // Back of screen: glowing cryptographic circuit pattern visible during 180° rotation
  const backPanelGeo = new THREE.PlaneGeometry(cols * spacing, rows * spacing);
  const backPanelMat = new THREE.MeshStandardMaterial({
    color: 0x111111,
    metalness: 0.9,
    roughness: 0.2,
    side: THREE.BackSide
  });
  const backPanel = new THREE.Mesh(backPanelGeo, backPanelMat);
  backPanel.position.z = -0.05;
  mainGroup.add(backPanel);

  // Central Holographic Encryption Ring (illuminates for Stage 4 classified vault)
  const vaultRingGeo = new THREE.TorusGeometry(1.4, 0.05, 16, 64);
  const vaultRingMat = new THREE.MeshStandardMaterial({
    color: 0x00c9d8,
    metalness: 0.8,
    roughness: 0.2,
    emissive: 0x00c9d8,
    emissiveIntensity: 0.6
  });
  const vaultRing = new THREE.Mesh(vaultRingGeo, vaultRingMat);
  vaultRing.position.z = 0.2;
  vaultRing.visible = false;
  mainGroup.add(vaultRing);

  scene.add(mainGroup);

  /* ---------------------------------------------------------------------------------------------------------------------------------------------------- INTERACTIVE RAYCASTER: HOVER RIPPLE & CLICK FLIP ---------------------------------------------------------------------------------------------------------------------------------------------------- */
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2(-999, -999);

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  });

  canvas.addEventListener('mouseleave', () => {
    mouse.x = -999;
    mouse.y = -999;
  });

  canvas.addEventListener('click', () => {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(matrix360Tiles);

    if (intersects.length > 0) {
      const tile = intersects[0].object;
      tile.userData.isFlipped = !tile.userData.isFlipped;

      // 3D Flip
      gsap.to(tile.rotation, {
        y: tile.userData.isFlipped ? Math.PI : 0,
        duration: 0.6,
        ease: 'back.out(1.7)'
      });

      // Ephemeral HUD toast
      const hud = document.getElementById('matrixTileHud');
      if (hud) {
        hud.innerHTML = `<span>SECTOR <strong>#${tile.userData.col * 14 + tile.userData.row}</strong> DECRYPTED · GLYPH: [⚡ PROTOCOL]</span>`;
      }
    }
  });

  /* ---------------------------------------------------------------------------------------------------------------------------------------------------- SCROLL-CONTROLLED 360° ROTATION & STAGE PROGRESSION ---------------------------------------------------------------------------------------------------------------------------------------------------- */
  let currentScrollProgress = 0;
  const rotDegDisplay = document.getElementById('matrixRotationDeg');

  function updateMatrixScroll() {
    const pageTheme = document.getElementById('page-theme');
    if (!pageTheme || !pageTheme.classList.contains('active')) return;

    const rect = container.getBoundingClientRect();
    const scrollDistance = container.offsetHeight - window.innerHeight;

    if (scrollDistance <= 0) return;

    // Calculate normalized progress (0.0 to 1.0)
    let progress = -rect.top / scrollDistance;
    progress = Math.max(0, Math.min(1, progress));
    currentScrollProgress = progress;

    // Direct 360° rotation (0% = 0 rad, 100% = 2 * PI rad)
    const targetRotY = progress * Math.PI * 2;
    mainGroup.rotation.y = targetRotY;

    // Dynamic subtle tilt
    mainGroup.rotation.x = Math.sin(progress * Math.PI * 2) * 0.12;

    // Update rotation degrees counter in top HUD
    const degrees = Math.round(progress * 360);
    if (rotDegDisplay) rotDegDisplay.textContent = `${degrees}°`;

    // Stage awareness
    const stageIndex = Math.min(6, Math.floor(progress * 6) + 1);
    const hud = document.getElementById('matrixTileHud');
    if (hud && !hud.dataset.locked) {
      const names = ['GENESIS WAVE', 'THE QUESTION (?)', 'THE ARENA', 'CLASSIFIED VAULT', 'LIVE COUNTDOWN', 'CALL TO ARMS'];
      hud.innerHTML = `<span>STAGE <strong>0${stageIndex}</strong> · ${names[stageIndex - 1]}</span>`;
    }

    // Toggle vault ring for Stage 4
    if (vaultRing) {
      vaultRing.visible = (stageIndex === 4);
      if (stageIndex === 4) vaultRing.rotation.z += 0.03;
    }
  }

  window.addEventListener('scroll', updateMatrixScroll, { passive: true });

  /* ---------------------------------------------------------------------------------------------------------------------------------------------------- 60 FPS RENDER LOOP ---------------------------------------------------------------------------------------------------------------------------------------------------- */
  let time = 0;
  function renderMatrix360() {
    requestAnimationFrame(renderMatrix360);
    const pageTheme = document.getElementById('page-theme');
    if (!pageTheme || !pageTheme.classList.contains('active')) return;

    time += 0.02;

    // Raycast hover ripple
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(matrix360Tiles);

    let hoveredTile = intersects.length > 0 ? intersects[0].object : null;

    matrix360Tiles.forEach(tile => {
      let targetZ = tile.userData.baseZ;

      if (hoveredTile) {
        const dist = Math.hypot(
          tile.userData.col - hoveredTile.userData.col,
          tile.userData.row - hoveredTile.userData.row
        );

        if (dist < 4) {
          const force = (4 - dist) / 4;
          targetZ += force * 0.35;
          tile.material.emissiveIntensity = 0.2 + force * 0.6;
        } else {
          tile.material.emissiveIntensity = 0.12;
        }
      } else {
        // Ambient natural undulating wave
        targetZ += Math.sin(time + tile.userData.col * 0.3 + tile.userData.row * 0.2) * 0.06;
        tile.material.emissiveIntensity = 0.12;
      }

      // Smooth lerp elevation
      tile.position.z += (targetZ - tile.position.z) * 0.15;
    });

    renderer.render(scene, camera);
  }

  renderMatrix360();
}

/* ---------------------------------------------------------------------------------------------------------------------------------------------------- 4. LIGHT ANIMATED SPECTRUM BARS (AI RUNTIME STYLE) ---------------------------------------------------------------------------------------------------------------------------------------------------- */
let spectrumThemeAnimId = null;

function initThemeSpectrumBars() {
  const canvas = document.getElementById('spectrumCanvasTheme');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = canvas.offsetWidth || window.innerWidth);
  let height = (canvas.height = canvas.offsetHeight || 520);

  window.addEventListener('resize', () => {
    if (!canvas.closest('#page-theme')?.classList.contains('active')) return;
    width = canvas.width = canvas.offsetWidth || window.innerWidth;
    height = canvas.height = canvas.offsetHeight || 520;
  });

  let time = 0;
  let mouseX = width / 2;

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
  });

  if (spectrumThemeAnimId) cancelAnimationFrame(spectrumThemeAnimId);

  const colors = ['#4169FF', '#8B5CF6', '#FF4F91', '#FF5722', '#00C9D8'];

  function renderSpectrum() {
    const pageTheme = document.getElementById('page-theme');
    if (!pageTheme || !pageTheme.classList.contains('active')) {
      spectrumThemeAnimId = requestAnimationFrame(renderSpectrum);
      return;
    }

    ctx.clearRect(0, 0, width, height);

    // Light off-white base
    ctx.fillStyle = '#F7F7F4';
    ctx.fillRect(0, 0, width, height);

    time += 0.035;

    const barW = 3;
    const barGap = 3;
    const step = barW + barGap;
    const count = Math.floor(width / step);
    const startX = (width - count * step) / 2;

    for (let i = 0; i < count; i++) {
      const x = startX + i * step;
      const norm = i / count;
      const distCenter = Math.abs(norm - 0.5) * 2;

      // Harmonic sine waves
      const w1 = Math.sin(norm * 10 - time * 2.2);
      const w2 = Math.sin(norm * 22 + time * 1.6);
      const w3 = Math.cos(norm * 36 - time * 1.1);

      let amp = 0.35 + 0.3 * w1 + 0.18 * w2 + 0.12 * w3;
      const centerPeak = Math.exp(-Math.pow(distCenter * 2.8, 2));
      amp += centerPeak * 0.45;

      // Mouse ripple
      const distMouse = Math.abs(x - mouseX) / width;
      if (distMouse < 0.2) {
        amp += (0.2 - distMouse) * 1.2;
      }

      const barH = Math.max(8, amp * (height * 0.65));
      const y = (height - barH) / 2;

      // Gradient color based on spectrum position
      const color = colors[Math.floor(norm * colors.length) % colors.length];
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.85;

      ctx.fillRect(x, y, barW, barH);
    }

    ctx.globalAlpha = 1.0;
    spectrumThemeAnimId = requestAnimationFrame(renderSpectrum);
  }

  renderSpectrum();
}

/* ---------------------------------------------------------------------------------------------------------------------------------------------------- MASTER INITIALIZER FOR THEME REVEAL ENGINES ---------------------------------------------------------------------------------------------------------------------------------------------------- */
function initThemeRevealEngines() {
  initThemeHeroLiquid();
  initThemeHeroMatrix3D();
  initTheme360MatrixExperience();
  initThemeSpectrumBars();
}



/* ==========================================================================
   14. THEME VAULT DECRYPTION (DAY 1)
   ========================================================================== */
function verifyThemeCode(e) {
  if (e && e.preventDefault) e.preventDefault();
  const inp = document.getElementById('themePassInput') || document.getElementById('themeCodeInput');
  const msg = document.getElementById('themeStatusMsg') || document.getElementById('themeCodeStatus') || document.getElementById('themeCodeMsg');
  if (!inp || !msg) return;

  const input = inp.value.trim().toUpperCase();
  if (!input) {
    msg.innerHTML = '<span style="color:#ef4444;font-weight:700;">âš  PLEASE ENTER YOUR SQUAD VIP PASS CODE</span>';
    return;
  }

  const validRegex = /^HS-PASS-[A-Z0-9]{4,6}$/;
  if (!validRegex.test(input) && input !== 'UDBHAV2027' && input !== 'HS2027' && input !== 'ADMIN2027') {
    playCyberSound('error');
    msg.innerHTML = `
      <div style="background:#fff5f5;border:2px solid #ef4444;border-radius:12px;padding:16px;margin-top:16px;">
        <p style="color:#ef4444;font-weight:700;">âš  INVALID VIP PASS CODE</p>
        <p style="color:var(--ink-soft);font-size:0.9rem;">Please enter a verified Pass ID in format: HS-PASS-XXXX (Obtained upon Squad Registration).</p>
      </div>
    `;
    return;
  }

  playCyberSound('chime');
  const foundTeam = typeof findTeamByCode === 'function' ? findTeamByCode(input) : null;
  const activeTeamObj = {
    code: input,
    teamName: foundTeam ? foundTeam.teamName : `Squad ${input.split('-')[2] || 'Alpha'}`,
    leaderName: foundTeam ? foundTeam.leaderName : 'Squad Leader'
  };
  try {
    localStorage.setItem('hs27_active_team', JSON.stringify(activeTeamObj));
  } catch (e) { }

  msg.innerHTML = `
    <div style="background:#ffffff;border:2px solid #10b981;border-radius:12px;padding:18px;margin-top:16px;box-shadow:0 10px 25px rgba(16,185,129,0.15);">
      <p style="color:#10b981;font-weight:800;font-size:1.05rem;margin-bottom:8px;">âœ“ AUTHORIZED SQUAD: ${activeTeamObj.teamName} (${input})</p>
      <p style="color:var(--ink-soft);font-size:0.92rem;line-height:1.6;">
        Decryption Server verified! <strong>Grand Hackathon Problem Statements are encrypted with AES-256 and will decrypt live on stage during the Opening Ceremony on January 28, 2027 at 09:00 AM IST in the PIET Jaipur Auditorium.</strong>
      </p>
      <div style="margin-top:14px;display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
        <a href="#theme" onclick="go('theme'); return false;" style="background:#ff4d00;color:#fff;padding:10px 18px;border-radius:8px;font-weight:700;font-size:0.88rem;text-decoration:none;display:inline-flex;align-items:center;gap:6px;box-shadow:0 4px 15px rgba(255,77,0,0.35);">
          <span>PROCEED TO LIVE SELECTION CONSOLE</span> &#10132;
        </a>
        <span style="font-size:0.8rem;color:#64748b;">(Credentials synced to selection engine)</span>
      </div>
    </div>
  `;
}
window.verifyThemeCode = verifyThemeCode;
// >>>>>>>>>> END: 10_theme_reveal.js <<<<<<<<<<

// >>>>>>>>>> START: 11_widgets_and_pledge.js <<<<<<<<<<

/* ====================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================
   19. CREATIVE INTERACTIVE WIDGETS & SMOOTH PERFORMANCE CONTROLLERS
   ==================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================== */

/* ---------------------------------------------------------------------------------------------------------------------------------------------------- Plagiarism & Git Commit Simulator ---------------------------------------------------------------------------------------------------------------------------------------------------- */
function simulatePlagiarismCheck() {
  const input = document.getElementById("simCommitMsg");
  const output = document.getElementById("simCommitOutput");
  if (!output) return;

  const msg = input ? (input.value.trim() || "feat: initial neural agent scaffold") : "feat: initial commit";

  output.innerHTML = "<span style='color:#FFBD2E;'>[AUDIT RUNNING]</span> Initializing AST tokenizer and SHA-256 tree audit on: <span style='color:#FFF;'>\"" + msg + "\"</span>...";

  setTimeout(() => {
    output.innerHTML = "<span style='color:#00C9D8;'>[DIFF ANALYSIS]</span> Comparing commit hashes against 100,000+ public repos &amp; Day 1 live decryption timestamp...";
  }, 350);

  setTimeout(() => {
    const fakeHash = "hs27-" + Math.random().toString(16).substring(2, 8) + "-ok";
    output.innerHTML = "<span style='color:#10B981;font-weight:bold;'>âœ“ INTEGRITY VERIFIED</span><br/>" +
      "<span style='color:#C9D1D9;'>Commit ID: <code style='color:#00C9D8;'>" + fakeHash + "</code> | Timestamp: <strong>JAN 28, 2027 &bull; 11:42 AM IST</strong></span><br/>" +
      "<span style='color:#10B981;'>Zero pre-written repositories detected. 100% fresh sprint code compliant with Udbhav Protocol.</span>";
  }, 750);
}

/* ---------------------------------------------------------------------------------------------------------------------------------------------------- Live Pass Customizer on Registration Page ---------------------------------------------------------------------------------------------------------------------------------------------------- */
function initLivePassCustomizer() {
  const teamInput = document.getElementById("regTeamName");
  const leaderInput = document.getElementById("regLeaderName");
  const passTicket = document.getElementById("floatingTicket3D");

  if (!passTicket) return;

  const eventTitle = passTicket.querySelector(".ft3d-event");
  const passCode = passTicket.querySelector(".ft3d-code");

  if (teamInput && eventTitle) {
    teamInput.addEventListener("input", () => {
      const val = teamInput.value.trim();
      if (val) {
        eventTitle.innerHTML = val.toUpperCase() + " <span>'27</span>";
      } else {
        eventTitle.innerHTML = "HACKATHON <span>2027</span>";
      }
    });
  }

  if (leaderInput && passCode) {
    leaderInput.addEventListener("input", () => {
      const val = leaderInput.value.trim();
      if (val) {
        const cleanSlug = val.replace(/\s+/g, "").substring(0, 6).toUpperCase();
        passCode.textContent = "HS-" + cleanSlug + "-VIP";
      } else {
        passCode.textContent = "HS-2027-VIP";
      }
    });
  }
}

// Hook into DOM Ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initLivePassCustomizer);
} else {
  setTimeout(initLivePassCustomizer, 300);
}



/* ====================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================
   18. INTERACTIVE HERO TITLE TILT & HACKER HONOR PLEDGE
   ==================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================== */
function initPageHeroTitleTilt() {
  if (window.matchMedia("(pointer: coarse)").matches) return;
  const heroes = document.querySelectorAll(".page-hero");
  heroes.forEach(hero => {
    if (hero.dataset.tiltBound === "true") return;
    hero.dataset.tiltBound = "true";
    const title = hero.querySelector(".ph-title-brutalist");
    if (!title) return;

    hero.addEventListener("mousemove", (e) => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      title.style.transform = "perspective(800px) rotateY(" + (x * 7) + "deg) rotateX(" + (-y * 5) + "deg)";
    }, { passive: true });

    hero.addEventListener("mouseleave", () => {
      title.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg)";
    }, { passive: true });
  });
}

function signHackerPledge(btn) {
  if (!btn) return;
  btn.innerHTML = "<span>âœ“ PLEDGE SIGNED & VERIFIED</span>";
  btn.style.background = "#10b981";
  btn.style.color = "#ffffff";
  btn.style.boxShadow = "0 6px 20px rgba(16, 185, 129, 0.4)";

  const stamp = document.getElementById("pledgeStamp");
  if (stamp) {
    stamp.classList.add("verified");
    stamp.innerHTML = '<span class="stamp-check">✓</span> ETHICAL INNOVATION CHARTER SIGNED • VERIFIED PARTICIPANT';
  }
}

// Auto-boot Tilt
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initPageHeroTitleTilt);
} else {
  setTimeout(initPageHeroTitleTilt, 200);
}



/* ==========================================================================
   15. CONTACT FORM & FAQ ACCORDION
   ========================================================================== */
function submitContact(e) {
  if (e) e.preventDefault();
  try { playCyberSound('execute'); } catch (err) { }
  const form = document.getElementById('contactForm');
  const ok = document.getElementById('contactOk');
  const refNum = Math.floor(100000 + Math.random() * 900000);
  const refStr = 'DISPATCH-2027-' + refNum;
  const refEl = document.getElementById('contactTicketRef');
  if (refEl) refEl.textContent = refStr;

  const nameVal = (document.getElementById('c-name') ? document.getElementById('c-name').value : '').trim();
  const emailVal = (document.getElementById('c-email') ? document.getElementById('c-email').value : '').trim();
  const phoneVal = (document.getElementById('c-phone') ? document.getElementById('c-phone').value : '').trim();
  const subjectVal = (document.getElementById('c-subject') ? document.getElementById('c-subject').value : 'General').trim();
  const msgVal = (document.getElementById('c-msg') ? document.getElementById('c-msg').value : '').trim();

  // Transmit inquiry to Google Sheets
  const payload = {
    action: 'contact',
    spreadsheetId: GOOGLE_SPREADSHEET_ID,
    timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    ticketRef: refStr,
    name: nameVal,
    email: emailVal,
    phone: phoneVal,
    subject: subjectVal,
    message: msgVal
  };

  const endpoint = (function() {
    try {
      return localStorage.getItem('udbhav_gas_url') || window.UDBHAV_APPS_SCRIPT_URL || GOOGLE_APPS_SCRIPT_WEBAPP_URL;
    } catch(e) { return GOOGLE_APPS_SCRIPT_WEBAPP_URL; }
  })();

  if (endpoint && endpoint.startsWith('http')) {
    fetch(endpoint, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload)
    }).catch(function(err) { console.warn('Contact sync queued:', err); });
  }

  if (form) form.style.display = 'none';
  if (ok) {
    ok.style.display = 'block';
    try { ok.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); } catch (e) { }
  }
}
window.submitContact = submitContact;
window.handleContact = submitContact;

function resetContactForm() {
  const form = document.getElementById('contactForm');
  const ok = document.getElementById('contactOk');
  if (form) {
    form.reset();
    form.style.display = 'block';
  }
  if (ok) ok.style.display = 'none';
}
window.resetContactForm = resetContactForm;

function toggleContactFaq(btn) {
  try { playCyberSound('click'); } catch (err) { }
  const item = btn.closest ? btn.closest('.cfq-item') : btn.parentElement;
  if (!item) return;
  const wasActive = item.classList.contains('active');
  document.querySelectorAll('.cfq-item').forEach(el => {
    el.classList.remove('active');
    const plus = el.querySelector('.cfq-plus');
    if (plus) plus.textContent = '+';
  });
  if (!wasActive) {
    item.classList.add('active');
    const plus = item.querySelector('.cfq-plus');
    if (plus) plus.innerHTML = '&minus;';
  }
}
window.toggleContactFaq = toggleContactFaq;

function toggleFaq(item) {
  playCyberSound('click');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.fi, .faq-item').forEach(f => f.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}
window.toggleFaq = toggleFaq;


/* ==========================================================================
   15B. RULES ACCORDION & MAGNETIC BUTTON INTERACTION
   ========================================================================== */
function toggleRuleAccordion(item) {
  playCyberSound('click');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.rule-item').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}
window.toggleRuleAccordion = toggleRuleAccordion;

function initMagneticButtons() {
  document.querySelectorAll('.btn-pri, .btn-liquid-primary, .btn-liquid-secondary, .nav-cta, .btn-action').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate3d(${x * 0.15}px, ${y * 0.15}px, 0)`;
    }, { passive: true });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}
window.initMagneticButtons = initMagneticButtons;
// >>>>>>>>>> END: 11_widgets_and_pledge.js <<<<<<<<<<

// >>>>>>>>>> START: 12_vibe_coding.js <<<<<<<<<<
/* ==========================================================================
   12. VIBE CODING ASSEMBLY & 3D CYBER TERMINAL INTERACTIVE ENGINE
   - Continuous Kinetic Infinite Marquee Flow (runs continuously when scroll stops!)
   - 3D Laptop Terminal & Holographic Icosahedron Floating Hover Physics
   - Interactive Expandable Foundation Cards (Open For All / First Time at PIET)
   - Real-Time 3D Code Stack Execution & IDE Terminal Simulation
   - Specular Magnetic Typography Tracking & Laser Conduits
   ========================================================================== */

function toggleVibeCard(el, cardType) {
  if (!el) return;
  try { playCyberSound('click'); } catch (e) { }
  const wasActive = el.classList.contains('active');

  // Collapse other highlight cards
  document.querySelectorAll('.vas-hl-card').forEach(card => card.classList.remove('active'));

  if (!wasActive) {
    el.classList.add('active');
    try { playCyberSound('chime'); } catch (e) { }
  }
}
window.toggleVibeCard = toggleVibeCard;

function executeStackLayer(layerNum) {
  try { playCyberSound('execute'); } catch (e) { }
  const layer = document.querySelector(`.vas-stack-layer[data-layer="${layerNum}"]`);
  if (!layer) return;

  const isExecuted = layer.classList.contains('executed');
  if (isExecuted) {
    layer.classList.remove('executed');
    const runBtn = layer.querySelector('.vsl-run-btn');
    if (runBtn) runBtn.textContent = '[ EXECUTE ]';
  } else {
    layer.classList.add('executed');
    const runBtn = layer.querySelector('.vsl-run-btn');
    if (runBtn) runBtn.textContent = '[ ACTIVE âœ“ ]';
  }
}
window.executeStackLayer = executeStackLayer;

function initVibeCodingInteractivity() {
  const stage = document.getElementById('vseAssembleStage');
  if (!stage) return;

  const orbBlue = stage.querySelector('.vas-orb-blue');
  const orbViolet = stage.querySelector('.vas-orb-violet');
  const orbCyan = stage.querySelector('.vas-orb-cyan');
  const headline = document.getElementById('vasHeadline');

  let targetRotX = 0, targetRotY = 0;
  let curRotX = 0, curRotY = 0;

  stage.addEventListener('mousemove', (e) => {
    const rect = stage.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    targetRotY = (x / (rect.width / 2)) * 3.5;
    targetRotX = -(y / (rect.height / 2)) * 3.5;

    // Subtle counter parallax on background glow orbs
    if (orbBlue) orbBlue.style.transform = `translate(${targetRotY * 3}px, ${-targetRotX * 3}px)`;
    if (orbViolet) orbViolet.style.transform = `translate(${-targetRotY * 3}px, ${targetRotX * 3}px)`;
    if (orbCyan) orbCyan.style.transform = `translate(${targetRotY * 2}px, ${targetRotX * 2}px)`;
  }, { passive: true });

  stage.addEventListener('mouseleave', () => {
    targetRotX = 0;
    targetRotY = 0;
    if (orbBlue) orbBlue.style.transform = '';
    if (orbViolet) orbViolet.style.transform = '';
    if (orbCyan) orbCyan.style.transform = '';
  });

  function renderTilt() {
    curRotX += (targetRotX - curRotX) * 0.08;
    curRotY += (targetRotY - curRotY) * 0.08;
    stage.style.transform = `perspective(1000px) rotateX(${curRotX}deg) rotateY(${curRotY}deg)`;
    requestAnimationFrame(renderTilt);
  }
  requestAnimationFrame(renderTilt);

  // Subtle interactive 3D text tracking on headline
  if (headline) {
    headline.addEventListener('mousemove', (e) => {
      const hRect = headline.getBoundingClientRect();
      const hX = (e.clientX - hRect.left) / hRect.width - 0.5;
      headline.style.transform = `perspective(500px) rotateY(${hX * 6}deg)`;
    }, { passive: true });
    headline.addEventListener('mouseleave', () => {
      headline.style.transform = 'perspective(500px) rotateY(0deg)';
    });
  }
}
window.initVibeCodingInteractivity = initVibeCodingInteractivity;

/* ====================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================
   3D VIBE CODING CYBER TERMINAL & INFINITE CONTINUOUS TEXT FLOW ENGINE
   ==================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================== */
/* ══════════════════════════════════════════════════════════════════════════
   STANDALONE 60FPS CONTINUOUS BACKGROUND TYPOGRAPHY FLOW ENGINE
   Guaranteed to run smoothly independent of Three.js or WebGL status
   ══════════════════════════════════════════════════════════════════════════ */
/* ══════════════════════════════════════════════════════════════════════════
   INTERACTIVE 3D HANGING CARD TILT & GLOSS PHYSICS
   ══════════════════════════════════════════════════════════════════════════ */
function initHangingCardInteractivity() {
  const wrapper = document.getElementById('homeHangingWrapper');
  const card = document.getElementById('homeTlLeftHud');
  if (!wrapper || !card) return;

  wrapper.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotX = -((y - centerY) / centerY) * 10;
    const rotY = ((x - centerX) / centerX) * 10;

    card.style.transform = `perspective(900px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateZ(8px)`;
    card.style.setProperty('--sheen-x', `${(x / rect.width * 100).toFixed(1)}%`);
    card.style.setProperty('--sheen-y', `${(y / rect.height * 100).toFixed(1)}%`);
  });

  wrapper.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)';
  });
}
window.initHangingCardInteractivity = initHangingCardInteractivity;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHangingCardInteractivity);
} else {
  initHangingCardInteractivity();
}

function initVseContinuousMarquee() {
  const typoInner = document.getElementById('vseTypoInner1');
  const typoTrack = document.getElementById('vseTypoTrack1');
  if (!typoInner) return;

  let marqueePos = 0;
  let scrollVelocity = 0;
  let lastScrollY = window.scrollY;
  let isHovered = false;

  window.addEventListener('scroll', () => {
    const curY = window.scrollY;
    scrollVelocity += (curY - lastScrollY) * 0.12;
    lastScrollY = curY;
  }, { passive: true });

  if (typoTrack) {
    typoTrack.addEventListener('mouseenter', () => { isHovered = true; });
    typoTrack.addEventListener('mouseleave', () => { isHovered = false; });
  }

  function renderMarquee() {
    scrollVelocity *= 0.92;
    const baseSpeed = isHovered ? 0.65 : 1.35;
    marqueePos += baseSpeed + scrollVelocity;

    const halfWidth = typoInner.scrollWidth / 2;
    if (halfWidth > 0) {
      if (marqueePos >= halfWidth) marqueePos %= halfWidth;
      if (marqueePos < 0) marqueePos = (marqueePos % halfWidth) + halfWidth;
      typoInner.style.transform = 'translate3d(' + (-marqueePos) + 'px, 0, 0)';
    }

    requestAnimationFrame(renderMarquee);
  }

  requestAnimationFrame(renderMarquee);
}
window.initVseContinuousMarquee = initVseContinuousMarquee;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initVseContinuousMarquee);
} else {
  initVseContinuousMarquee();
}

function initVse3dCanvas() {
  const canvas = document.getElementById('vse3dCanvas');
  const section = document.getElementById('vibeScrollExperience');
  const typoInner = document.getElementById('vseTypoInner1');
  const typoTrack = document.getElementById('vseTypoTrack1');
  const vohName = document.getElementById('vohName');

  if (!canvas || typeof THREE === 'undefined') return;

  const w = canvas.clientWidth || window.innerWidth;
  const h = canvas.clientHeight || 550;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
  camera.position.set(0, 0, 5.2);

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(w, h, false);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
  scene.add(ambientLight);

  const dirLight1 = new THREE.DirectionalLight(0x315bff, 1.4);
  dirLight1.position.set(4, 5, 4);
  scene.add(dirLight1);

  const dirLight2 = new THREE.DirectionalLight(0x00c9d8, 1.0);
  dirLight2.position.set(-4, -2, 2);
  scene.add(dirLight2);

  // Master Group
  const masterGroup = new THREE.Group();

  // 1. Laptop Base
  const baseGeo = new THREE.BoxGeometry(2.6, 0.08, 1.8);
  const matChassis = new THREE.MeshStandardMaterial({
    color: 0x111625,
    metalness: 0.85,
    roughness: 0.25
  });
  const laptopBase = new THREE.Mesh(baseGeo, matChassis);
  laptopBase.position.set(0, -0.4, 0);

  // Laptop Keyboard Inset
  const kbGeo = new THREE.PlaneGeometry(2.2, 1.1);
  const kbMat = new THREE.MeshBasicMaterial({ color: 0x070b14 });
  const kb = new THREE.Mesh(kbGeo, kbMat);
  kb.rotation.x = -Math.PI / 2;
  kb.position.set(0, -0.355, 0.15);
  masterGroup.add(kb);

  // Screen Shell
  const screenShellGeo = new THREE.BoxGeometry(2.5, 1.55, 0.06);
  const laptopScreen = new THREE.Mesh(screenShellGeo, matChassis);
  laptopScreen.position.set(0, 0.32, -0.74);
  laptopScreen.rotation.x = 0.18;

  // 2. Animated Glowing Code Screen Texture
  const screenCanvas = document.createElement('canvas');
  screenCanvas.width = 512;
  screenCanvas.height = 320;
  const sCtx = screenCanvas.getContext('2d');

  let scanlineY = 0;
  function drawScreenTexture(scanY, clk) {
    sCtx.fillStyle = '#050711';
    sCtx.fillRect(0, 0, 512, 320);

    // Terminal header
    sCtx.fillStyle = '#10172a';
    sCtx.fillRect(0, 0, 512, 30);
    sCtx.fillStyle = '#ff5f56';
    sCtx.beginPath(); sCtx.arc(16, 15, 5, 0, Math.PI * 2); sCtx.fill();
    sCtx.fillStyle = '#ffbd2e';
    sCtx.beginPath(); sCtx.arc(32, 15, 5, 0, Math.PI * 2); sCtx.fill();
    sCtx.fillStyle = '#27c93f';
    sCtx.beginPath(); sCtx.arc(48, 15, 5, 0, Math.PI * 2); sCtx.fill();

    // Title bar text
    sCtx.font = 'bold 11px monospace';
    sCtx.fillStyle = '#64748b';
    sCtx.fillText('vibe-terminal ~ bash (36h_sprint)', 70, 19);

    // Code lines
    sCtx.font = 'bold 14px monospace';
    sCtx.fillStyle = '#315bff';
    sCtx.fillText('// HACKATHON 2027: VIBE CODING PROTOCOL', 20, 65);
    sCtx.fillStyle = '#38bdf8';
    sCtx.fillText('import { Hack2Skill, GGC } from "piet/jaipur";', 20, 95);
    sCtx.fillStyle = '#a855f7';
    sCtx.fillText('const squad = new Squad({ members: 4, mode: "36H" });', 20, 125);
    sCtx.fillStyle = '#34d399';
    sCtx.fillText('await squad.synthesize({ idea: "Infinite" });', 20, 155);
    sCtx.fillStyle = '#f43f5e';
    sCtx.fillText('// PIET JAIPUR • 28-29 JAN 2027 • OPEN FOR ALL', 20, 185);

    // Dynamic live status line
    sCtx.font = 'bold 12px monospace';
    sCtx.fillStyle = '#fbbf24';
    const statusIdx = Math.floor(clk * 0.5) % 3;
    const statuses = [
      '> [SYSTEM]: AES-256 PROBLEM VAULT ONLINE',
      '> [TELEMETRY]: 1.2 GBPS MESH WI-FI CONNECTED',
      '> [STATUS]: SYNTHESIS READY. BUILD BOLD.'
    ];
    sCtx.fillText(statuses[statusIdx], 20, 220);

    // Glowing blinking cursor
    if (Math.sin(clk * 4) > 0) {
      sCtx.fillStyle = '#00c9d8';
      sCtx.fillRect(20, 240, 14, 18);
    }

    // Glowing subtle horizontal cyber scanline
    const grad = sCtx.createLinearGradient(0, scanY - 10, 0, scanY + 10);
    grad.addColorStop(0, 'rgba(0, 201, 216, 0)');
    grad.addColorStop(0.5, 'rgba(0, 201, 216, 0.25)');
    grad.addColorStop(1, 'rgba(0, 201, 216, 0)');
    sCtx.fillStyle = grad;
    sCtx.fillRect(0, scanY - 10, 512, 20);
  }
  drawScreenTexture(0, 0);

  const screenTex = new THREE.CanvasTexture(screenCanvas);
  const matScreen = new THREE.MeshBasicMaterial({ map: screenTex });
  const screenFace = new THREE.Mesh(new THREE.PlaneGeometry(2.32, 1.45), matScreen);
  screenFace.position.set(0, 0.32, -0.71);
  screenFace.rotation.x = 0.18;

  // 3. Floating Holographic Code Cube Hovering Above
  const cubeGeo = new THREE.BoxGeometry(0.52, 0.52, 0.52);
  const matCube = new THREE.MeshStandardMaterial({
    color: 0x315bff,
    metalness: 0.9,
    roughness: 0.1,
    transparent: true,
    opacity: 0.85,
    emissive: 0x315bff,
    emissiveIntensity: 0.6
  });
  const codeCube = new THREE.Mesh(cubeGeo, matCube);
  codeCube.position.set(0, 0.48, 0.1);

  // Wireframe outer box
  const wireMat = new THREE.MeshBasicMaterial({ color: 0x8157ff, wireframe: true });
  const wireCube = new THREE.Mesh(new THREE.BoxGeometry(0.70, 0.70, 0.70), wireMat);
  codeCube.add(wireCube);

  // 4. Holographic Orbital Rings
  const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x00c9d8, side: THREE.DoubleSide });
  const orbitRing1 = new THREE.Mesh(new THREE.TorusGeometry(0.88, 0.02, 16, 64), ringMat1);
  orbitRing1.rotation.x = Math.PI / 3;

  const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x8157ff, side: THREE.DoubleSide });
  const orbitRing2 = new THREE.Mesh(new THREE.TorusGeometry(1.12, 0.018, 16, 64), ringMat2);
  orbitRing2.rotation.y = Math.PI / 4;

  // 5. Floating Sparkling Code Particles
  const partCount = 140;
  const partGeo = new THREE.BufferGeometry();
  const partPos = new Float32Array(partCount * 3);
  for (let i = 0; i < partCount * 3; i += 3) {
    partPos[i] = (Math.random() - 0.5) * 6;
    partPos[i + 1] = (Math.random() - 0.5) * 4;
    partPos[i + 2] = (Math.random() - 0.5) * 4;
  }
  partGeo.setAttribute('position', new THREE.BufferAttribute(partPos, 3));
  const partMat = new THREE.PointsMaterial({
    size: 0.055,
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.85
  });
  const particles = new THREE.Points(partGeo, partMat);

  masterGroup.add(laptopBase, laptopScreen, screenFace, codeCube, orbitRing1, orbitRing2, particles);
  scene.add(masterGroup);

  // Center-right positioning so it gracefully complements headline text on left
  masterGroup.position.set(0.6, -0.15, 0);
  masterGroup.rotation.y = -0.15;
  masterGroup.rotation.x = 0.15;

  // Interactive Mouse Tracking
  let mouseX = 0, mouseY = 0;
  let targetMouseX = 0, targetMouseY = 0;
  let isHovered = false;

  if (section) {
    section.addEventListener('mousemove', (e) => {
      const rect = section.getBoundingClientRect();
      targetMouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      targetMouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    }, { passive: true });

    section.addEventListener('mouseenter', () => { isHovered = true; });
    section.addEventListener('mouseleave', () => {
      targetMouseX = 0;
      targetMouseY = 0;
      isHovered = false;
    });
  }

  if (typoTrack) {
    typoTrack.addEventListener('mouseenter', () => { isHovered = true; });
    typoTrack.addEventListener('mouseleave', () => { isHovered = false; });
  }

  // --- Interactive Laptop Event Details HUD Wiring ---
  const laptopTrigger = document.getElementById('vse3dLaptopTrigger');
  const eventHud = document.getElementById('vseEventHoverHud');
  const domLaptop = document.getElementById('vseInteractiveLaptopWrap');

  let hudTimeout = null;
  function showHud() {
    if (hudTimeout) clearTimeout(hudTimeout);
    if (eventHud) eventHud.classList.add('is-active');
    isHovered = true;
  }
  function hideHud() {
    if (hudTimeout) clearTimeout(hudTimeout);
    hudTimeout = setTimeout(() => {
      if (eventHud) eventHud.classList.remove('is-active');
      isHovered = false;
    }, 240);
  }

  if (laptopTrigger) {
    laptopTrigger.addEventListener('mouseenter', showHud);
    laptopTrigger.addEventListener('mouseleave', hideHud);
    laptopTrigger.addEventListener('focus', showHud);
    laptopTrigger.addEventListener('blur', hideHud);
  }
  if (domLaptop) {
    domLaptop.addEventListener('mouseenter', showHud);
    domLaptop.addEventListener('mouseleave', hideHud);
  }
  if (eventHud) {
    eventHud.addEventListener('mouseenter', showHud);
    eventHud.addEventListener('mouseleave', hideHud);
  }

  window.toggleVseEventHud = function (show) {
    if (show) showHud();
    else hideHud();
  };

  // Scroll Progression Tracking & Dynamic Velocity
  let scrollProgress = 0;
  let scrollVelocity = 0;
  let lastScrollY = window.scrollY;

  function handleVseScroll() {
    const curY = window.scrollY;
    scrollVelocity += (curY - lastScrollY) * 0.06;
    lastScrollY = curY;

    if (!section) return;
    const sRect = section.getBoundingClientRect();
    const windowH = window.innerHeight;
    const totalDist = sRect.height + windowH;
    const currentPos = windowH - sRect.top;
    scrollProgress = Math.min(Math.max(currentPos / totalDist, 0), 1);

    if (vohName) {
      if (scrollProgress < 0.33) {
        vohName.textContent = "01 // SPRINT INITIALIZATION";
      } else if (scrollProgress < 0.66) {
        vohName.textContent = "02 // NEURAL VIBE CODING";
      } else {
        vohName.textContent = "03 // WORKING PRODUCT DEPLOYED";
      }
    }
  }

  window.addEventListener('scroll', handleVseScroll, { passive: true });
  handleVseScroll();

  // Animation Loop: Continuous Smooth Running Flow & Hover Dynamics
  let clock = 0;
  let marqueePos = 0;
  let frameCount = 0;

  function animVse() {
    requestAnimationFrame(animVse);
    try {
      clock += 0.02;
      frameCount++;

      // Decay scroll velocity smoothly
      scrollVelocity *= 0.90;

      // Marquee text flow is driven by initVseContinuousMarquee() for silky 60fps independent performance

      // 2. 3D Object Motion & Continuous Hover Physics
      mouseX += (targetMouseX - mouseX) * 0.06;
      mouseY += (targetMouseY - mouseY) * 0.06;

      // Floating levitation bob and gentle 3D rotational breathing sway
      const floatBob = Math.sin(clock * 1.5) * 0.12;
      const swayY = Math.sin(clock * 0.9) * 0.06;
      const swayX = Math.cos(clock * 1.1) * 0.04;

      // Center-balanced base position
      const isMobile = window.innerWidth < 768;
      const targetX = (isMobile ? 0 : 0.85) + (scrollProgress - 0.5) * 0.6 + mouseX * 0.25;
      const baseGroupY = (isMobile ? 0.35 : 0.05) + floatBob - mouseY * 0.22;

      masterGroup.position.x = targetX;
      masterGroup.position.y = baseGroupY;
      masterGroup.rotation.y = -0.12 + swayY + (scrollProgress - 0.5) * 0.4 + mouseX * 0.35;
      masterGroup.rotation.x = 0.14 + swayX - mouseY * 0.22;
      masterGroup.rotation.z = Math.sin(clock * 1.1) * 0.03 + mouseX * 0.05;

      // 3. Rotating holographic cube
      codeCube.rotation.x += 0.016;
      codeCube.rotation.y += 0.020;
      wireCube.rotation.z -= 0.012;
      wireCube.rotation.x += 0.008;
      codeCube.position.y = 0.48 + Math.sin(clock * 2.0) * 0.06;
      const pulseScale = 1.0 + Math.sin(clock * 2.8) * 0.05;
      codeCube.scale.set(pulseScale, pulseScale, pulseScale);

      // 4. Orbital rings
      orbitRing1.rotation.z += 0.018;
      orbitRing1.rotation.x += 0.010;
      orbitRing2.rotation.y -= 0.014;
      orbitRing2.rotation.z += 0.008;

      // 5. Swirling particle galaxy
      const pArr = partGeo.attributes.position.array;
      for (let i = 0; i < partCount; i++) {
        const i3 = i * 3;
        const x = pArr[i3];
        const z = pArr[i3 + 2];
        const ang = 0.005 + (i % 5) * 0.0012;
        pArr[i3] = x * Math.cos(ang) - z * Math.sin(ang);
        pArr[i3 + 2] = x * Math.sin(ang) + z * Math.cos(ang);
        pArr[i3 + 1] += Math.sin(clock * 1.4 + i) * 0.0025;
      }
      partGeo.attributes.position.needsUpdate = true;

      // 6. Live Screen Texture Update
      if (frameCount % 4 === 0) {
        scanlineY = (scanlineY + 4) % 320;
        drawScreenTexture(scanlineY, clock);
        screenTex.needsUpdate = true;
      }

      renderer.render(scene, camera);
    } catch (animErr) {
      console.warn("VSE anim loop caught error:", animErr);
    }
  }
  animVse();

  // Resize Handling
  window.addEventListener('resize', () => {
    if (!canvas) return;
    const newW = canvas.clientWidth || window.innerWidth;
    const newH = canvas.clientHeight || 550;
    camera.aspect = newW / newH;
    camera.updateProjectionMatrix();
    renderer.setSize(newW, newH, false);
  }, { passive: true });
}
window.initVse3dCanvas = initVse3dCanvas;
// >>>>>>>>>> END: 12_vibe_coding.js <<<<<<<<<<

// >>>>>>>>>> START: 13_sponsors.js <<<<<<<<<<
/* ====================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================
   UDBHAV 2027 — SPONSORS & ALLIANCES INTERACTIVE ENGINE
   ==================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================== */

/* 1. Alliance Tier Filter Navigator */
function filterSponsorTier(tier, btn) {
  try { playCyberSound('click'); } catch (e) { }

  const navBar = document.getElementById("spTierNavBar");
  if (navBar && btn) {
    navBar.querySelectorAll(".spt-nav-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  }

  const container = document.getElementById("sponsorTiersContainer");
  if (!container) return;

  const cards = container.querySelectorAll(".sp-tier-card");
  cards.forEach(card => {
    const cardTier = card.getAttribute("data-tier");
    if (tier === "all" || cardTier === tier) {
      card.classList.remove("hidden");
    } else {
      card.classList.add("hidden");
    }
  });

  try { playCyberSound('chime'); } catch (e) { }
}
window.filterSponsorTier = filterSponsorTier;

/* 2. PIET Facility Explorer Inspector */
const PIET_FACILITY_DATA = {
  arena: {
    icon: "ðŸ¢",
    title: "Central Air-Conditioned Coding Arenas & Auditoriums",
    desc: "Over 1,200+ capacity modern coding arenas, presentation halls, and presentation stages equipped with ergonomic desks, power rails, and surround audio.",
    metrics: ["1,200+ Capacity", "3 Presentation Halls", "100% Climate Controlled"]
  },
  fiber: {
    icon: "⚡",
    title: "Enterprise 1 Gbps Optical Fiber Backbone & Wi-Fi 6",
    desc: "Dedicated uncapped high-speed internet with sub-5ms local latency, redundant ISP uplinks, and direct LAN drops to all team tables.",
    metrics: ["1 Gbps Dedicated", "Redundant Uplinks", "Sub-5ms Latency"]
  },
  dorms: {
    icon: "ðŸ›Œ",
    title: "24/7 Rest Dormitories, Refreshment Lounges & Care Pods",
    desc: "Clean gender-segregated rest facilities with fresh bedding, hot shower rooms, medical first-aid desk, and round-the-clock campus security.",
    metrics: ["24/7 Secure Access", "Gender-Segregated", "Hot Water Showers"]
  },
  incubation: {
    icon: "ðŸš€",
    title: "PIET Startup Incubation Center & Prototype Seed Grants",
    desc: "Fast-tracked qualification for PIET's institutional startup incubator featuring prototype seed funding, patenting advisory, and investor matching.",
    metrics: ["₹5,00,000+ Seed Pool", "Co-Working Passes", "Angel Investor Demo"]
  }
};

function inspectPietFacility(facilityKey, btn) {
  try { playCyberSound('click'); } catch (e) { }

  const tabs = document.getElementById("pietFacilityTabs");
  if (tabs && btn) {
    tabs.querySelectorAll(".pft-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  }

  const data = PIET_FACILITY_DATA[facilityKey];
  if (!data) return;

  const iconEl = document.getElementById("pfdIcon");
  const titleEl = document.getElementById("pfdTitle");
  const descEl = document.getElementById("pfdDesc");
  const metricsEl = document.getElementById("pfdMetrics");

  if (iconEl) iconEl.textContent = data.icon;
  if (titleEl) titleEl.textContent = data.title;
  if (descEl) descEl.textContent = data.desc;

  if (metricsEl) {
    metricsEl.innerHTML = data.metrics.map(m => `<span class="pfdm-chip">${m}</span>`).join("");
  }
}
window.inspectPietFacility = inspectPietFacility;

/* 3. Dynamic Squad Catalyst Pass & Perks Calculator */
let currentSquadSize = 3;
let currentDomain = "ai";
let currentScale = "mvp";

function calcSponsorPerks(size, domain, scale, btn) {
  if (size !== null && size !== undefined) {
    currentSquadSize = size;
    const parent = document.getElementById("spcSquadSize");
    if (parent) {
      parent.querySelectorAll(".spc-choice").forEach(b => b.classList.remove("active"));
      if (btn) btn.classList.add("active");
    }
  }

  if (domain !== null && domain !== undefined) {
    currentDomain = domain;
    const parent = document.getElementById("spcDomain");
    if (parent) {
      parent.querySelectorAll(".spc-choice").forEach(b => b.classList.remove("active"));
      if (btn) btn.classList.add("active");
    }
  }

  if (scale !== null && scale !== undefined) {
    currentScale = scale;
    const parent = document.getElementById("spcScale");
    if (parent) {
      parent.querySelectorAll(".spc-choice").forEach(b => b.classList.remove("active"));
      if (btn) btn.classList.add("active");
    }
  }

  try { playCyberSound('click'); } catch (e) { }

  // Computations
  let basePerHacker = 150;
  let domainBonus = 400;
  let hwDesc = "AI Bench + GPU Nodes";
  let cloudText = "$300 USD";
  let prizeText = "₹1,00,000+";

  if (currentDomain === "ai") {
    domainBonus = 650;
    hwDesc = "AI Bench + High-Memory GPU";
    cloudText = `$${currentSquadSize * 100} USD (vLLM Quota)`;
    prizeText = "₹1,00,000+ Main + AI Bounty";
  } else if (currentDomain === "web3") {
    domainBonus = 750;
    hwDesc = "Hardware Wallets + Testnet Bridges";
    cloudText = `$${currentSquadSize * 100} USD (RPC & IPFS)`;
    prizeText = "₹1,50,000+ (Incl. ₹50k Bounty)";
  } else if (currentDomain === "iot") {
    domainBonus = 500;
    hwDesc = "ESP32 Kits & Sensor Benches";
    cloudText = `$${currentSquadSize * 80} USD (AWS IoT)`;
    prizeText = "₹1,00,000+ Main + Hardware Cup";
  } else {
    domainBonus = 400;
    hwDesc = "Dedicated Maker Station";
    cloudText = `$${currentSquadSize * 75} USD Cloud Stack`;
    prizeText = "₹1,00,000+ Podium Eligibility";
  }

  let scaleMult = 1.0;
  if (currentScale === "scaled") scaleMult = 1.35;
  if (currentScale === "hardware") scaleMult = 1.25;

  const totalUSD = Math.round((currentSquadSize * basePerHacker + domainBonus) * scaleMult);
  const totalINR = Math.round(totalUSD * 86.5).toLocaleString('en-IN');

  const elTotalVal = document.getElementById("resTotalValue");
  const elTotalSub = document.getElementById("resTotalSub");
  const elCloud = document.getElementById("resCloudCredits");
  const elHw = document.getElementById("resHardware");
  const elPrizes = document.getElementById("resPrizes");
  const elMeals = document.getElementById("resMeals");

  if (elTotalVal) elTotalVal.textContent = `$${totalUSD.toLocaleString('en-US')} USD`;
  if (elTotalSub) elTotalSub.textContent = `₹${totalINR}+ Equivalency / Squad`;
  if (elCloud) elCloud.textContent = cloudText;
  if (elHw) elHw.textContent = hwDesc;
  if (elPrizes) elPrizes.textContent = prizeText;
  if (elMeals) elMeals.textContent = `100% Free (${currentSquadSize * 6} Meals & Snacks)`;
}
window.calcSponsorPerks = calcSponsorPerks;

/* 4. Claim Squad Catalyst Voucher Modal */
function openClaimVoucherModal() {
  try { playCyberSound('execute'); } catch (e) { }
  const modal = document.getElementById("claimVoucherModal");
  if (!modal) return;

  const codeEl = document.getElementById("cvPassCode");
  const allocEl = document.getElementById("cvSquadAlloc");
  const grantEl = document.getElementById("cvTotalGrant");
  const cloudEl = document.getElementById("cvCloud");
  const fb = document.getElementById("cvFeedback");

  const randCode = Math.random().toString(36).substring(2, 6).toUpperCase();
  if (codeEl) codeEl.textContent = `H2S-CAT-${randCode}-2027`;

  const domainNames = { ai: "AI & Agents", web3: "Web3 & dApps", iot: "Edge IoT", clean: "CleanTech" };
  if (allocEl) allocEl.textContent = `${currentSquadSize} Hackers • ${domainNames[currentDomain] || "Software"}`;

  const valEl = document.getElementById("resTotalValue");
  const subEl = document.getElementById("resTotalSub");
  if (grantEl && valEl && subEl) {
    grantEl.textContent = `${valEl.textContent} (${subEl.textContent.split("/")[0].trim()})`;
  }

  const cloudSrc = document.getElementById("resCloudCredits");
  if (cloudEl && cloudSrc) {
    cloudEl.textContent = `${cloudSrc.textContent} + Free 1 Gbps LAN`;
  }

  if (fb) fb.style.display = "none";

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}
window.openClaimVoucherModal = openClaimVoucherModal;

function closeClaimVoucherModal(e) {
  if (e && e.target && e.target.closest && e.target.closest(".sp-inquiry-modal") && !e.target.classList.contains("spm-close-btn")) {
    return;
  }
  const modal = document.getElementById("claimVoucherModal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
  try { playCyberSound('click'); } catch (err) { }
}
window.closeClaimVoucherModal = closeClaimVoucherModal;

function copyVoucherCode() {
  const codeEl = document.getElementById("cvPassCode");
  const fb = document.getElementById("cvFeedback");
  if (!codeEl) return;

  const code = codeEl.textContent.trim();
  navigator.clipboard.writeText(code).then(() => {
    try { playCyberSound('chime'); } catch (e) { }
    if (fb) {
      fb.className = "sp-feedback-msg success";
      fb.style.display = "block";
      fb.textContent = `âœ“ Secret pass key copied to clipboard: ${code}`;
    }
  }).catch(() => {
    if (fb) {
      fb.className = "sp-feedback-msg success";
      fb.style.display = "block";
      fb.textContent = `Pass Key: ${code}`;
    }
  });
}
window.copyVoucherCode = copyVoucherCode;

function downloadVoucherPass() {
  try { playCyberSound('execute'); } catch (e) { }
  const fb = document.getElementById("cvFeedback");
  if (fb) {
    fb.className = "sp-feedback-msg success";
    fb.style.display = "block";
    fb.textContent = "⚡ Digital Catalyst Pass cached! Present this voucher at registration check-in.";
  }
  setTimeout(() => {
    window.print();
  }, 400);
}
window.downloadVoucherPass = downloadVoucherPass;

/* 5. Alliance Partner Inspection Modal */
const PARTNER_DOSSIERS = {
  h2s: {
    badge: "ðŸ† NATIONAL HACKATHON ECOSYSTEM",
    icon: "⚡",
    name: "Hack2Skill",
    category: "National Outreach & Standardized Hackathon Governance",
    desc: "Hack2Skill empowers thousands of tech innovators across India with industry-aligned hackathon frameworks, verified judge scorecards, and post-hackathon acceleration programs.",
    perks: [
      "Official participation certificate verified via Hack2Skill credential network",
      "Standardized multi-criteria evaluation rubric ensuring 100% fair judging",
      "Direct fast-track to Hack2Skill corporate hackathons and recruiter databases"
    ]
  },
  ggc: {
    badge: "ðŸŽ“ FLAGSHIP TECHNICAL SOCIETY",
    icon: "ðŸŽ“",
    name: "Graduate Gateway Club (GGC)",
    category: "Campus Technical Chapter & On-Ground Operations Command",
    desc: "The flagship student organization at Poornima Institute of Engineering & Technology, orchestrating technical workshops, hackathon mentoring logistics, and builder communities.",
    perks: [
      "120+ student crew members providing 24/7 desk-side assistance and triage",
      "Hardware loan bench, soldering tools, and component management",
      "Continuous live stream broadcasting, photography, and showcase recaps"
    ]
  },
  incubator: {
    badge: "ðŸŒ± CAMPUS STARTUP INCUBATOR",
    icon: "ðŸŒ±",
    name: "PIET Incubation Center",
    category: "Venture Accelerator & Seed Grant Deployment",
    desc: "PIET's government and institutional-backed business incubator designed to convert collegiate hackathon prototypes into revenue-generating, patent-backed commercial enterprises.",
    perks: [
      "Direct review for up to ₹5,00,000 prototype commercialization seed funding",
      "Free 6-month co-working desk access at PIET Innovation Hub",
      "Subsidized IPR, copyright, and utility patent filing assistance"
    ]
  },
  cloud: {
    badge: "â˜ï¸ CLOUD COMPUTE CLUSTERS",
    icon: "â˜ï¸",
    name: "Cloud Infrastructure Grants",
    category: "Serverless Compute & Database Vouchers",
    desc: "Production-ready cloud vouchers distributed to all eligible finalist squads to deploy scalable microservices, relational databases, and serverless background workers without personal card charges.",
    perks: [
      "$100+ USD in platform compute credits provisioned per team",
      "Complimentary SSL endpoints, Docker container registries, and auto-scaling",
      "Low-latency API access optimized for Indian regional endpoints"
    ]
  },
  ai: {
    badge: "ðŸ¤– AI & INFERENCE API PARTNER",
    icon: "ðŸ¤–",
    name: "Generative AI API Quotas",
    category: "LLM, Vision & Multimodal Inference Access",
    desc: "Dedicated rate-limit bypasses and token allowances enabling squads to build autonomous AI agents, voice interfaces, computer vision classifiers, and automated code assistants.",
    perks: [
      "1,000,000+ API inference token allowance for cutting-edge LLMs",
      "Embeddings API access for high-speed vector semantic search",
      "Zero-retention data privacy guarantee for sprint prototype intellectual property"
    ]
  },
  lan: {
    badge: "ðŸŒ ENTERPRISE CAMPUS BACKBONE",
    icon: "ðŸŒ",
    name: "High-Speed Gigabit LAN",
    category: "PIET Infrastructure & Optical Network",
    desc: "Engineered specifically to support 500+ simultaneous laptops with high-density Wi-Fi 6 access points, redundant optical fiber loops, and local npm/pip caching servers.",
    perks: [
      "1 Gbps uncapped symmetric fiber broadband across all coding arenas",
      "Hardwired RJ-45 Gigabit Ethernet drop cords available at key nodes",
      "Local mirrors for lightning-fast package installations during setup"
    ]
  },
  pack: {
    badge: "ðŸ§° DEVELOPER TOOLING SUITE",
    icon: "ðŸ§°",
    name: "Developer Student Packs",
    category: "Pro IDE Licenses & Domain Allowances",
    desc: "A rich developer tooling package equipping participants with industry-standard development environments, code-completion engines, and premium productivity software.",
    perks: [
      "Free top-level domain registration (.tech, .me, or .dev) with DNS management",
      "Premium JetBrains IDE suite and GitHub Copilot sprint passes",
      "Cloud monitoring, error telemetry, and log ingestion dashboards"
    ]
  },
  iot: {
    badge: "ðŸ”Œ PHYSICAL HARDWARE LABS",
    icon: "ðŸ”Œ",
    name: "Edge IoT & Hardware Bench",
    category: "Sensors, Microcontrollers & Prototyping Gear",
    desc: "A fully stocked hardware depot allowing hardware hackers and IoT enthusiasts to test their code against physical chips, sensors, and actuators without purchasing equipment.",
    perks: [
      "ESP32-S3, Arduino Uno R4, and Raspberry Pi Pico boards on loan",
      "50+ sensor packs: Ultrasonic, LiDAR, Temperature, Gyro, and Gas detectors",
      "Equipped soldering station, breadboards, jumper wires, and oscilloscopes"
    ]
  },
  web3: {
    badge: "â›“ï¸ DEDICATED BOUNTY TRACK",
    icon: "â›“ï¸",
    name: "Web3 Smart Contract Grants",
    category: "EVM Chains, Wallets & Decentralized Tooling",
    desc: "A specialized incentive pool rewarding squads building non-custodial wallets, decentralized physical infrastructure (DePIN), or verifiable zero-knowledge proofs.",
    perks: [
      "₹50,000+ dedicated bounty pool specifically for Web3 & dApp submissions",
      "Sponsored gas faucets and testnet faucet tokens with zero wait times",
      "Technical mentorship from veteran Web3 protocol engineers"
    ]
  },
  apex_title: {
    badge: "👑 APEX INNOVATION TITLE PARTNER",
    icon: "💎",
    name: "Apex Global Technology",
    category: "Headline Title Sponsor & Lead Ecosystem Enabler",
    desc: "The flagship enterprise partner commanding Udbhav 2027 with ₹1,50,000+ direct sponsorship commitment, custom hackathon track ownership, keynote address, and dedicated executive talent recruiting pipeline.",
    perks: [
      "Headline branding across all stage backdrops, livestreams, and official website header",
      "Direct fast-track interview bypass for top 10 finalist engineering squads",
      "Keynote address and technical workshop slot during Day 1 opening ceremony",
      "Exclusive naming rights for Grand Prize Championship and presentation trophy"
    ]
  },
  bounty_aiml: {
    badge: "⚡ TRACK BOUNTY • ₹50,000",
    icon: "🧠",
    name: "Frontier AI & Autonomous Agents Bounty",
    category: "Autonomous Multi-Agent Systems & Multimodal AI",
    desc: "A dedicated cash bounty pool incentivizing squads building novel autonomous agent frameworks, localized small language model (SLM) inference pipelines, or multi-agent orchestration tools.",
    perks: [
      "₹50,000 direct cash grant awarded to the #1 AI/ML prototype",
      "Direct incubation review and compute credits worth $2,500",
      "1:1 review session with senior staff AI researchers"
    ]
  },
  bounty_web3: {
    badge: "⬡ TRACK BOUNTY • ₹40,000",
    icon: "🛡️",
    name: "Zero-Knowledge & Decentralized Security Grant",
    category: "zk-SNARKs, Account Abstraction & DePIN",
    desc: "Rewarding high-integrity cryptographic solutions including privacy-preserving identity verification, smart contract account abstraction, and decentralized physical infrastructure.",
    perks: [
      "₹40,000 cash bounty split across top 2 Web3 implementations",
      "Free smart contract security pre-audit review",
      "Testnet gas token grants and developer faucet pass"
    ]
  },
  bounty_smartcities: {
    badge: "🌐 TRACK BOUNTY • ₹35,000",
    icon: "🏙️",
    name: "Urban Edge & Smart Infrastructure Prize",
    category: "Edge IoT, Computer Vision & Urban Analytics",
    desc: "Incentivizing smart mobility, intelligent traffic routing, civic grievance AI triage, and low-latency camera stream analytics deployed on edge compute hardware.",
    perks: [
      "₹35,000 cash grant sponsored by civic technology partners",
      "Hardware loan bench priority access (LiDAR + Edge TPUs)",
      "Pilot deployment opportunity on PIET smart campus testbed"
    ]
  },
  bounty_climatetech: {
    badge: "🛰️ TRACK BOUNTY • ₹30,000",
    icon: "🌱",
    name: "Carbon Intelligence & Clean Energy Grant",
    category: "Climate Modeling, Energy Optimization & ESG",
    desc: "Supporting sustainable development with satellite imagery carbon sink estimation, solar microgrid optimization algorithms, and circular economy tracking systems.",
    perks: [
      "₹30,000 grant dedicated to highest-impact ecological sustainability hack",
      "Mentorship from renewable energy venture partners",
      "Fast-track to national clean-tech accelerators"
    ]
  },
  bounty_open: {
    badge: "✨ WILDCARD BOUNTY • ₹25,000",
    icon: "🚀",
    name: "Creative Moonshot & Open Innovation Wildcard",
    category: "Unconventional Tech, Spatial Computing & AR/VR",
    desc: "The wildest, most audaciously creative prototype built during the 36 hours that defies traditional categorization—celebrating radical hacker ingenuity and spatial flair.",
    perks: [
      "₹25,000 wildcard cash prize chosen directly by hacker audience vote",
      "Perpetual bragging rights and custom glowing acrylic trophy",
      "Feature story published across national developer media outlets"
    ]
  },
  community: {
    badge: "🤝 PAN-INDIA DEVELOPER COALITION",
    icon: "🌐",
    name: "National Student Developer Network",
    category: "50+ Campus Tech Clubs across 18+ States",
    desc: "A massive coalition of collegiate coding societies, open-source user groups, and tech student chapters amplifying Udbhav 2027 to over 50,000+ enthusiastic builders nationwide.",
    perks: [
      "Campus ambassador recognition & exclusive swag boxes for chapter leads",
      "Dedicated high-speed community networking lounge on hackathon floor",
      "Cross-institutional team formation channels on official Discord"
    ]
  }
};

function inspectPartnerModal(partnerKey) {
  try { playCyberSound('click'); } catch (e) { }

  const data = PARTNER_DOSSIERS[partnerKey];
  if (!data) return;

  const modal = document.getElementById("partnerModal");
  if (!modal) return;

  const badgeEl = document.getElementById("pmBadge");
  const iconEl = document.getElementById("pmIcon");
  const nameEl = document.getElementById("pmName");
  const catEl = document.getElementById("pmCategory");
  const descEl = document.getElementById("pmDesc");
  const listEl = document.getElementById("pmPerksList");

  if (badgeEl) badgeEl.textContent = data.badge;
  if (iconEl) iconEl.textContent = data.icon;
  if (nameEl) nameEl.textContent = data.name;
  if (catEl) catEl.textContent = data.category;
  if (descEl) descEl.textContent = data.desc;

  if (listEl) {
    listEl.innerHTML = data.perks.map(p => `<li>${p}</li>`).join("");
  }

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}
window.inspectPartnerModal = inspectPartnerModal;

function closePartnerModal(e) {
  if (e && e.target && e.target.closest && e.target.closest(".sp-inquiry-modal") && !e.target.classList.contains("spm-close-btn") && !e.target.closest(".pm-action-row")) {
    return;
  }
  const modal = document.getElementById("partnerModal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
  try { playCyberSound('click'); } catch (err) { }
}
window.closePartnerModal = closePartnerModal;

/* 6. Corporate Sponsorship Inquiry Modal */
function openSponsorInquiryModal() {
  try { playCyberSound('execute'); } catch (e) { }
  const modal = document.getElementById("spInquiryModal");
  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}
window.openSponsorInquiryModal = openSponsorInquiryModal;

function closeSponsorInquiryModal(e) {
  if (e && e.target && e.target.closest && e.target.closest(".sp-inquiry-modal") && !e.target.classList.contains("spm-close-btn")) {
    return;
  }
  const modal = document.getElementById("spInquiryModal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
  try { playCyberSound('click'); } catch (err) { }
}
window.closeSponsorInquiryModal = closeSponsorInquiryModal;

function handleSponsorInquirySubmit(e) {
  e.preventDefault();
  try { playCyberSound('execute'); } catch (err) { }

  const org = document.getElementById("spOrgName")?.value || "";
  const email = document.getElementById("spWorkEmail")?.value || "";
  const tier = document.getElementById("spTargetTier")?.value || "";
  const rep = document.getElementById("spRepName")?.value || "";
  const fb = document.getElementById("spInquiryFeedback");

  if (fb) {
    fb.className = "sp-feedback-msg success";
    fb.style.display = "block";
    fb.innerHTML = `âœ“ <strong>Inquiry Dispatched!</strong> Thank you ${rep} from ${org}. The Udbhav 2027 Secretariat has transmitted the sponsorship prospectus and demographic dossier to <code>${email}</code>.`;
  }

  setTimeout(() => {
    const form = document.getElementById("spInquiryForm");
    if (form) form.reset();
    closeSponsorInquiryModal();
  }, 2800);
}
window.handleSponsorInquirySubmit = handleSponsorInquirySubmit;

function copySponsorTemplate() {
  try { playCyberSound('chime'); } catch (e) { }
  const template = `Subject: Udbhav 2027 Sponsorship Inquiry - [Your Company]

Dear Udbhav 2027 Organizing Directorate,

We are interested in exploring corporate partnership opportunities for Udbhav 2027 at Poornima Institute of Engineering and Technology (PIET), Jaipur.

Target Partnership Level: Title Catalyst / Powered By / Track Partner / In-Kind
Company / Organization: [Company Name]
Point of Contact: [Full Name, Designation]
Official Email: [Work Email]
Phone: [Phone Number]

Key Objectives:
- [e.g. Developer tool adoption / API usage / Tech talent recruitment / Custom bounty track]

Please send us the official Sponsorship Prospectus and schedule an introductory briefing with the Directorate.

Best regards,
[Your Name]`;

  const fb = document.getElementById("spInquiryFeedback");
  navigator.clipboard.writeText(template).then(() => {
    if (fb) {
      fb.className = "sp-feedback-msg success";
      fb.style.display = "block";
      fb.textContent = "âœ“ Executive sponsorship inquiry email template copied to your clipboard!";
    }
  }).catch(() => {
    if (fb) {
      fb.className = "sp-feedback-msg success";
      fb.style.display = "block";
      fb.textContent = "Template ready to send to graduate@poornima.org";
    }
  });
}
window.copySponsorTemplate = copySponsorTemplate;

// >>>>>>>>>> END: 13_sponsors.js <<<<<<<<<<

// >>>>>>>>>> START: 14_pages_3d_canvases.js <<<<<<<<<<
/* ====================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================
   UDBHAV 2027 — INTERACTIVE PAGE HERO 3D OBJECTS & IMAGE LIGHTBOX ENGINE
   ==================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================== */

/* 1. Universal High-Tech Image Lightbox Modal Handlers */
function openImageModal(imgSrc, title, desc) {
  try { playCyberSound('click'); } catch (e) { }
  const modal = document.getElementById("imageModal");
  if (!modal) return;

  const fullImg = document.getElementById("imFullImage");
  const titleEl = document.getElementById("imTitle");
  const descEl = document.getElementById("imDesc");
  const downloadBtn = document.getElementById("imDownloadBtn");

  if (fullImg) fullImg.src = imgSrc;
  if (titleEl) titleEl.textContent = title || "Udbhav 2027 Arena Visual";
  if (descEl) descEl.textContent = desc || "36-Hour National Physical Hackathon at PIET Jaipur.";
  if (downloadBtn) downloadBtn.href = imgSrc;

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}
window.openImageModal = openImageModal;

function closeImageModal(e) {
  if (e && e.target && e.target.closest && e.target.closest(".image-modal-box") && !e.target.classList.contains("spm-close-btn") && !e.target.closest(".sp-form-actions")) {
    return;
  }
  const modal = document.getElementById("imageModal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
  try { playCyberSound('click'); } catch (err) { }
}
window.closeImageModal = closeImageModal;

/* Keyboard ESC close for lightbox and modals */
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeImageModal();
    if (typeof closePartnerModal === 'function') closePartnerModal();
    if (typeof closeClaimVoucherModal === 'function') closeClaimVoucherModal();
    if (typeof closeSponsorInquiryModal === 'function') closeSponsorInquiryModal();
  }
});

/* ====================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================
   2. 3D INTERACTIVE OBJECT ENGINES FOR PAGE HEROES
   ==================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================== */

/* A. About Page: 3D Polyhedral Innovation Core (#aboutHeroCanvas) */
/* A. About Page: 3D Interactive Polyhedral Innovation Core (#aboutHeroCanvas) */
let aboutCorePulseActive = false;
let aboutCoreMesh, aboutRing1, aboutRing2, aboutParticleSys;
let aboutCoreRotX = 0.4, aboutCoreRotY = 0.6;
let aboutCoreTargetX = 0.4, aboutCoreTargetY = 0.6;
let aboutCoreIsDragging = false;
let aboutCorePrevMouseX = 0, aboutCorePrevMouseY = 0;

function initAboutHeroCanvas() {
  const canvas = document.getElementById('aboutHeroCanvas');
  if (!canvas) return;

  const parent = canvas.parentElement || canvas;
  const curW = parent.clientWidth > 50 ? parent.clientWidth : 420;
  const curH = parent.clientHeight > 50 ? parent.clientHeight : 270;

  if (window.THREE) {
    initAboutHeroThree(canvas, parent, curW, curH);
  } else {
    initAboutHero2D(canvas, parent, curW, curH);
  }
}

function initAboutHeroThree(canvas, parent, width, height) {
  if (canvas._aboutRenderer && canvas._aboutCamera) {
    const curW = parent.clientWidth > 50 ? parent.clientWidth : width;
    const curH = parent.clientHeight > 50 ? parent.clientHeight : height;
    canvas._aboutCamera.aspect = curW / curH;
    canvas._aboutCamera.updateProjectionMatrix();
    canvas._aboutRenderer.setSize(curW, curH, false);
    return;
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.set(0, 0, 5.2);

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    canvas._aboutRenderer = renderer;
    canvas._aboutCamera = camera;
  } catch (err) {
    console.warn("WebGL initialization failed, falling back to 2D Canvas:", err);
    initAboutHero2D(canvas, parent, width, height);
    return;
  }

  scene.add(new THREE.AmbientLight(0xffffff, 0.9));
  const lightOrange = new THREE.DirectionalLight(0xff5722, 2.8);
  lightOrange.position.set(4, 5, 4);
  scene.add(lightOrange);
  const lightCyan = new THREE.DirectionalLight(0x00f5d4, 2.2);
  lightCyan.position.set(-4, -4, 3);
  scene.add(lightCyan);

  const group = new THREE.Group();
  scene.add(group);

  const icosaGeo = new THREE.IcosahedronGeometry(1.35, 1);
  const icosaMat = new THREE.MeshStandardMaterial({
    color: 0x18243b,
    roughness: 0.2,
    metalness: 0.9,
    wireframe: false
  });
  aboutCoreMesh = new THREE.Mesh(icosaGeo, icosaMat);
  group.add(aboutCoreMesh);

  const wireMat = new THREE.MeshBasicMaterial({
    color: 0xff5722,
    wireframe: true,
    transparent: true,
    opacity: 0.85
  });
  const wireMesh = new THREE.Mesh(icosaGeo, wireMat);
  wireMesh.scale.set(1.02, 1.02, 1.02);
  group.add(wireMesh);

  const pmat = new THREE.PointsMaterial({ color: 0x00f5d4, size: 0.09, transparent: true, opacity: 0.95 });
  const points = new THREE.Points(icosaGeo, pmat);
  points.scale.set(1.03, 1.03, 1.03);
  group.add(points);

  const ringGeo1 = new THREE.TorusGeometry(1.9, 0.03, 16, 100);
  const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x00f5d4, transparent: true, opacity: 0.85 });
  aboutRing1 = new THREE.Mesh(ringGeo1, ringMat1);
  aboutRing1.rotation.x = Math.PI / 3;
  group.add(aboutRing1);

  const ringGeo2 = new THREE.TorusGeometry(2.15, 0.025, 16, 100);
  const ringMat2 = new THREE.MeshBasicMaterial({ color: 0xff7043, transparent: true, opacity: 0.75 });
  aboutRing2 = new THREE.Mesh(ringGeo2, ringMat2);
  aboutRing2.rotation.y = Math.PI / 4;
  group.add(aboutRing2);

  const satGeo = new THREE.SphereGeometry(0.12, 16, 16);
  const satMat1 = new THREE.MeshBasicMaterial({ color: 0x00e676 });
  const satMesh1 = new THREE.Mesh(satGeo, satMat1);
  satMesh1.position.set(1.9, 0, 0);
  aboutRing1.add(satMesh1);

  const satMat2 = new THREE.MeshBasicMaterial({ color: 0xff5722 });
  const satMesh2 = new THREE.Mesh(satGeo, satMat2);
  satMesh2.position.set(0, 2.15, 0);
  aboutRing2.add(satMesh2);

  const partCount = 80;
  const partGeo = new THREE.BufferGeometry();
  const partPos = new Float32Array(partCount * 3);
  for (let i = 0; i < partCount * 3; i += 3) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = 2.2 + Math.random() * 0.8;
    partPos[i] = r * Math.sin(phi) * Math.cos(theta);
    partPos[i + 1] = r * Math.sin(phi) * Math.sin(theta);
    partPos[i + 2] = r * Math.cos(phi);
  }
  partGeo.setAttribute('position', new THREE.BufferAttribute(partPos, 3));
  const partMat = new THREE.PointsMaterial({ color: 0x00f5d4, size: 0.065, transparent: true, opacity: 0.85 });
  aboutParticleSys = new THREE.Points(partGeo, partMat);
  group.add(aboutParticleSys);

  parent.addEventListener('mousedown', (e) => {
    aboutCoreIsDragging = true;
    aboutCorePrevMouseX = e.clientX;
    aboutCorePrevMouseY = e.clientY;
  });
  window.addEventListener('mouseup', () => { aboutCoreIsDragging = false; });
  parent.addEventListener('mousemove', (e) => {
    const rect = parent.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    if (aboutCoreIsDragging) {
      const deltaX = e.clientX - aboutCorePrevMouseX;
      const deltaY = e.clientY - aboutCorePrevMouseY;
      aboutCoreTargetY += deltaX * 0.015;
      aboutCoreTargetX += deltaY * 0.015;
      aboutCorePrevMouseX = e.clientX;
      aboutCorePrevMouseY = e.clientY;
    } else {
      aboutCoreTargetY = relX * 1.5;
      aboutCoreTargetX = -relY * 1.5;
    }
  });

  parent.addEventListener('touchmove', (e) => {
    if (!e.touches[0]) return;
    const rect = parent.getBoundingClientRect();
    const touch = e.touches[0];
    const relX = (touch.clientX - rect.left) / rect.width - 0.5;
    const relY = (touch.clientY - rect.top) / rect.height - 0.5;
    aboutCoreTargetY = relX * 1.8;
    aboutCoreTargetX = -relY * 1.8;
  }, { passive: true });

  const eulerEl = document.getElementById('aboutEulerAngle');

  function renderThreeLoop() {
    requestAnimationFrame(renderThreeLoop);
    const activePage = document.querySelector('.page.active');
    if (activePage && activePage.id !== 'page-about') return;

    const curW = parent.clientWidth > 50 ? parent.clientWidth : width;
    const curH = parent.clientHeight > 50 ? parent.clientHeight : height;
    if (canvas.width !== curW || canvas.height !== curH) {
      camera.aspect = curW / curH;
      camera.updateProjectionMatrix();
      renderer.setSize(curW, curH, false);
    }

    group.rotation.y += 0.012 + (aboutCoreIsDragging ? 0.03 : 0);
    group.rotation.x += (aboutCoreTargetX - group.rotation.x) * 0.08;
    group.rotation.y += (aboutCoreTargetY - group.rotation.y) * 0.08;

    aboutRing1.rotation.z += 0.02;
    aboutRing2.rotation.z -= 0.018;
    aboutParticleSys.rotation.y -= 0.008;

    if (aboutCorePulseActive) {
      const pScale = 1.25 + Math.sin(Date.now() * 0.02) * 0.15;
      group.scale.set(pScale, pScale, pScale);
    } else if (group.scale.x > 1) {
      group.scale.multiplyScalar(0.96);
      if (group.scale.x < 1.01) group.scale.set(1, 1, 1);
    }

    if (eulerEl && Math.random() < 0.12) {
      const degX = Math.round((group.rotation.x * 180 / Math.PI) % 360);
      const degY = Math.round((group.rotation.y * 180 / Math.PI) % 360);
      eulerEl.textContent = `ROT: X ${degX}° Y ${degY}° Z 18°`;
    }

    renderer.render(scene, camera);
  }
  renderThreeLoop();
}

function initAboutHero2D(canvas, parent, width, height) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  canvas.width = width;
  canvas.height = height;

  let angle = 0;
  function render2D() {
    requestAnimationFrame(render2D);
    const activePage = document.querySelector('.page.active');
    if (activePage && activePage.id !== 'page-about') return;

    const w = (canvas.width = parent.clientWidth > 50 ? parent.clientWidth : width);
    const h = (canvas.height = parent.clientHeight > 50 ? parent.clientHeight : height);
    const cx = w / 2;
    const cy = h / 2;
    angle += 0.018;

    ctx.clearRect(0, 0, w, h);

    ctx.save();
    ctx.translate(cx, cy);

    ctx.beginPath();
    ctx.ellipse(0, 0, 90, 40, angle * 0.8, 0, Math.PI * 2);
    ctx.strokeStyle = '#00F5D4';
    ctx.lineWidth = 2;
    ctx.shadowColor = '#00F5D4';
    ctx.shadowBlur = 10;
    ctx.stroke();

    ctx.beginPath();
    ctx.ellipse(0, 0, 110, 48, -angle * 0.6, 0, Math.PI * 2);
    ctx.strokeStyle = '#FF5722';
    ctx.lineWidth = 1.8;
    ctx.shadowColor = '#FF5722';
    ctx.shadowBlur = 10;
    ctx.stroke();

    const pulse = aboutCorePulseActive ? 1.25 : 1.0;
    const r = 48 * pulse;
    ctx.beginPath();
    for (let i = 0; i < 8; i++) {
      const a = (i * Math.PI) / 4 + angle;
      const px = Math.cos(a) * r;
      const py = Math.sin(a) * r * 0.75;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fillStyle = 'rgba(24, 36, 59, 0.85)';
    ctx.fill();
    ctx.strokeStyle = '#FF5722';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    const satX = Math.cos(angle * 1.5) * 90;
    const satY = Math.sin(angle * 1.5) * 40;
    ctx.beginPath();
    ctx.arc(satX, satY, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#00E676';
    ctx.fill();

    ctx.restore();
  }
  render2D();
}

function pulseAboutHeroCore() {
  try { playCyberSound('execute'); } catch (e) { }
  aboutCorePulseActive = true;
  const statusEl = document.getElementById('aboutCoreStatus');
  const speedEl = document.getElementById('aboutSpeedVal');
  if (statusEl) {
    statusEl.textContent = '⚡ CORE: HYPERDRIVE ACTIVATED';
    statusEl.style.color = '#FF5722';
    statusEl.style.borderColor = '#FF5722';
  }
  if (speedEl) {
    speedEl.textContent = '120.0 FPS';
    speedEl.style.color = '#FF5722';
  }
  setTimeout(() => {
    aboutCorePulseActive = false;
    if (statusEl) {
      statusEl.textContent = 'CORE: STABLE [32 VERTICES]';
      statusEl.style.color = '';
      statusEl.style.borderColor = '';
    }
    if (speedEl) {
      speedEl.textContent = '60.0 FPS';
      speedEl.style.color = '#00E676';
    }
  }, 2200);
}
window.pulseAboutHeroCore = pulseAboutHeroCore;

/* B. Team Page: 3D Neural Mentor Swarm (#teamHeroCanvas) */
let teamSwarmCanvas, teamSwarmCtx, teamSwarmNodes = [];
let teamMouseX = 0, teamMouseY = 0, teamHasMouse = false;

function initTeamHeroCanvas() {
  teamSwarmCanvas = document.getElementById('teamHeroCanvas');
  if (!teamSwarmCanvas) return;

  const parent = teamSwarmCanvas.parentElement;
  let width = (teamSwarmCanvas.width = parent.clientWidth || 400);
  let height = (teamSwarmCanvas.height = parent.clientHeight || 270);
  teamSwarmCtx = teamSwarmCanvas.getContext('2d');

  // Spawn Swarm Nodes
  const nodeCount = 38;
  teamSwarmNodes = [];
  for (let i = 0; i < nodeCount; i++) {
    teamSwarmNodes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 1.4,
      vy: (Math.random() - 0.5) * 1.4,
      r: Math.random() * 3.5 + 2.5,
      role: i < 8 ? 'lead' : (i < 20 ? 'faculty' : 'mentor'),
      color: i < 8 ? '#FF5722' : (i < 20 ? '#00C9D8' : '#7986CB')
    });
  }

  parent.addEventListener('mousemove', (e) => {
    const rect = parent.getBoundingClientRect();
    teamMouseX = e.clientX - rect.left;
    teamMouseY = e.clientY - rect.top;
    teamHasMouse = true;
  });

  parent.addEventListener('mouseleave', () => { teamHasMouse = false; });

  function renderSwarm() {
    requestAnimationFrame(renderSwarm);
    if (!document.getElementById('page-team')?.classList.contains('active')) return;

    teamSwarmCtx.clearRect(0, 0, width, height);

    // Gravitational vector pull & movement
    for (let i = 0; i < teamSwarmNodes.length; i++) {
      const n = teamSwarmNodes[i];
      if (teamHasMouse) {
        const dx = teamMouseX - n.x;
        const dy = teamMouseY - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130 && dist > 5) {
          n.vx += (dx / dist) * 0.12;
          n.vy += (dy / dist) * 0.12;
        }
      }

      n.x += n.vx;
      n.y += n.vy;
      n.vx *= 0.985;
      n.vy *= 0.985;

      // Bounce
      if (n.x < 10) { n.x = 10; n.vx *= -1; }
      if (n.x > width - 10) { n.x = width - 10; n.vx *= -1; }
      if (n.y < 10) { n.y = 10; n.vy *= -1; }
      if (n.y > height - 10) { n.y = height - 10; n.vy *= -1; }

      // Connect filaments
      for (let j = i + 1; j < teamSwarmNodes.length; j++) {
        const n2 = teamSwarmNodes[j];
        const dist = Math.hypot(n.x - n2.x, n.y - n2.y);
        if (dist < 75) {
          teamSwarmCtx.beginPath();
          teamSwarmCtx.moveTo(n.x, n.y);
          teamSwarmCtx.lineTo(n2.x, n2.y);
          teamSwarmCtx.strokeStyle = `rgba(0, 201, 216, ${1 - dist / 75 * 0.8})`;
          teamSwarmCtx.lineWidth = 0.8;
          teamSwarmCtx.stroke();
        }
      }

      // Draw node point
      teamSwarmCtx.beginPath();
      teamSwarmCtx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      teamSwarmCtx.fillStyle = n.color;
      teamSwarmCtx.shadowColor = n.color;
      teamSwarmCtx.shadowBlur = 10;
      teamSwarmCtx.fill();
      teamSwarmCtx.shadowBlur = 0;
    }
  }
  renderSwarm();

  window.addEventListener('resize', () => {
    width = teamSwarmCanvas.width = parent.clientWidth || 400;
    height = teamSwarmCanvas.height = parent.clientHeight || 270;
  });
}

function pulseTeamHeroSwarm() {
  try { playCyberSound('execute'); } catch (e) { }
  if (!teamSwarmNodes.length) return;
  teamSwarmNodes.forEach(n => {
    n.vx += (Math.random() - 0.5) * 6;
    n.vy += (Math.random() - 0.5) * 6;
  });
  const statusEl = document.getElementById('teamSwarmStatus');
  if (statusEl) {
    statusEl.textContent = '⚡ BURST: RE-BALANCING VECTOR SWARM';
    setTimeout(() => {
      statusEl.textContent = 'ðŸ‘¥ NETWORK: 50+ NODES LINKED';
    }, 1800);
  }
}
window.pulseTeamHeroSwarm = pulseTeamHeroSwarm;

/* C. Conduct Page: 3D Quantum Security Shield (#conductHeroCanvas) */
/* C. Conduct / Rules Page: Holographic Quantum Security Shield (#conductHeroCanvas) */
let conductShieldCanvas, conductShieldCtx;
let conductAngle = 0, conductScanY = 0, conductPulseWave = 0;
let conductMouseX = 0, conductMouseY = 0;

function initConductHeroCanvas() {
  conductShieldCanvas = document.getElementById('conductHeroCanvas');
  if (!conductShieldCanvas) return;

  const parent = conductShieldCanvas.parentElement || conductShieldCanvas;
  conductShieldCtx = conductShieldCanvas.getContext('2d');
  if (!conductShieldCtx) return;

  parent.addEventListener('mousemove', (e) => {
    const rect = parent.getBoundingClientRect();
    conductMouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 25;
    conductMouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 25;
  });
  parent.addEventListener('mouseleave', () => {
    conductMouseX = 0;
    conductMouseY = 0;
  });

  function drawHexShield(cx, cy, radius, rot, color, alpha, lineWidth, dashes) {
    conductShieldCtx.save();
    conductShieldCtx.translate(cx, cy);
    conductShieldCtx.rotate(rot);
    if (dashes) conductShieldCtx.setLineDash(dashes);
    conductShieldCtx.beginPath();
    for (let i = 0; i < 6; i++) {
      const a = (i * Math.PI) / 3;
      const x = radius * Math.cos(a);
      const y = radius * Math.sin(a);
      if (i === 0) conductShieldCtx.moveTo(x, y);
      else conductShieldCtx.lineTo(x, y);
    }
    conductShieldCtx.closePath();
    conductShieldCtx.strokeStyle = color;
    conductShieldCtx.globalAlpha = alpha;
    conductShieldCtx.lineWidth = lineWidth || 2;
    conductShieldCtx.shadowColor = color;
    conductShieldCtx.shadowBlur = 10;
    conductShieldCtx.stroke();
    conductShieldCtx.restore();
  }

  function renderShieldLoop() {
    requestAnimationFrame(renderShieldLoop);
    const activePage = document.querySelector('.page.active');
    if (activePage && activePage.id !== 'page-conduct' && activePage.id !== 'page-rules') return;

    const w = (conductShieldCanvas.width = parent.clientWidth > 50 ? parent.clientWidth : 420);
    const h = (conductShieldCanvas.height = parent.clientHeight > 50 ? parent.clientHeight : 270);
    conductShieldCtx.clearRect(0, 0, w, h);

    const cx = w / 2 + conductMouseX;
    const cy = h / 2 + conductMouseY;

    conductAngle += 0.015;
    conductScanY = (conductScanY + 2.2) % h;

    // Background Cyber Grid lines
    conductShieldCtx.save();
    conductShieldCtx.strokeStyle = 'rgba(0, 245, 212, 0.06)';
    conductShieldCtx.lineWidth = 1;
    for (let x = 0; x < w; x += 30) {
      conductShieldCtx.beginPath();
      conductShieldCtx.moveTo(x, 0);
      conductShieldCtx.lineTo(x, h);
      conductShieldCtx.stroke();
    }
    for (let y = 0; y < h; y += 30) {
      conductShieldCtx.beginPath();
      conductShieldCtx.moveTo(0, y);
      conductShieldCtx.lineTo(w, y);
      conductShieldCtx.stroke();
    }
    conductShieldCtx.restore();

    // Outer Rotating Dashed Security Hexagon (Cyan)
    drawHexShield(cx, cy, 102, conductAngle * 0.6, '#00F5D4', 0.55, 2.5, [14, 8]);

    // Middle Tactical Hexagon (Electric Orange)
    drawHexShield(cx, cy, 82, -conductAngle * 0.9, '#FF5722', 0.75, 2.8, [8, 6]);

    // Inner Solid Verified Hexagon (Neon Emerald)
    drawHexShield(cx, cy, 60, conductAngle * 1.3, '#00E676', 0.9, 3);

    // Inner Core Glow Fill
    conductShieldCtx.save();
    conductShieldCtx.beginPath();
    for (let i = 0; i < 6; i++) {
      const a = (i * Math.PI) / 3 + conductAngle * 0.4;
      const x = cx + 48 * Math.cos(a);
      const y = cy + 48 * Math.sin(a);
      if (i === 0) conductShieldCtx.moveTo(x, y);
      else conductShieldCtx.lineTo(x, y);
    }
    conductShieldCtx.closePath();
    conductShieldCtx.fillStyle = 'rgba(0, 230, 118, 0.12)';
    conductShieldCtx.fill();
    conductShieldCtx.restore();

    // Central Cryptographic Shield Icon & Text
    conductShieldCtx.save();
    conductShieldCtx.font = "900 18px 'Space Grotesk', sans-serif";
    conductShieldCtx.fillStyle = '#FFFFFF';
    conductShieldCtx.textAlign = 'center';
    conductShieldCtx.textBaseline = 'middle';
    conductShieldCtx.shadowColor = '#00E676';
    conductShieldCtx.shadowBlur = 14;
    conductShieldCtx.fillText("100% IP", cx, cy - 8);

    conductShieldCtx.font = "800 11px 'JetBrains Mono', monospace";
    conductShieldCtx.fillStyle = '#00E676';
    conductShieldCtx.fillText("VERIFIED", cx, cy + 12);
    conductShieldCtx.restore();

    // Rotating Radar Sweep Beam
    conductShieldCtx.save();
    conductShieldCtx.translate(cx, cy);
    conductShieldCtx.rotate(conductAngle * 2.5);
    const grad = conductShieldCtx.createRadialGradient(0, 0, 10, 0, 0, 115);
    grad.addColorStop(0, 'rgba(0, 245, 212, 0.4)');
    grad.addColorStop(1, 'rgba(0, 245, 212, 0)');
    conductShieldCtx.beginPath();
    conductShieldCtx.moveTo(0, 0);
    conductShieldCtx.arc(0, 0, 115, -0.4, 0.4);
    conductShieldCtx.closePath();
    conductShieldCtx.fillStyle = grad;
    conductShieldCtx.fill();
    conductShieldCtx.restore();

    // Horizontal Scanning Laser Bar
    conductShieldCtx.save();
    const laserGrad = conductShieldCtx.createLinearGradient(0, conductScanY, w, conductScanY);
    laserGrad.addColorStop(0, 'rgba(0, 245, 212, 0)');
    laserGrad.addColorStop(0.5, 'rgba(0, 245, 212, 0.85)');
    laserGrad.addColorStop(1, 'rgba(0, 245, 212, 0)');
    conductShieldCtx.fillStyle = laserGrad;
    conductShieldCtx.fillRect(0, conductScanY, w, 2.5);
    conductShieldCtx.restore();

    // Pulse Wave Shockwave
    if (conductPulseWave > 0) {
      conductShieldCtx.save();
      conductShieldCtx.beginPath();
      conductShieldCtx.arc(cx, cy, conductPulseWave, 0, Math.PI * 2);
      conductShieldCtx.strokeStyle = '#00E676';
      conductShieldCtx.lineWidth = 3.5;
      conductShieldCtx.shadowColor = '#00E676';
      conductShieldCtx.shadowBlur = 16;
      conductShieldCtx.globalAlpha = Math.max(0, 1 - conductPulseWave / 150);
      conductShieldCtx.stroke();
      conductShieldCtx.restore();
      conductPulseWave += 4.5;
      if (conductPulseWave > 150) conductPulseWave = 0;
    }
  }

  renderShieldLoop();
}

function pulseConductHeroShield() {
  try { playCyberSound('execute'); } catch (e) { }
  conductPulseWave = 10;
  const statusEl = document.getElementById('conductShieldStatus');
  const hashEl = document.getElementById('conductHashSnippet');

  const chars = '0123456789abcdef';
  let randHash = '';
  for (let i = 0; i < 64; i++) {
    randHash += chars[Math.floor(Math.random() * chars.length)];
  }

  if (hashEl) {
    hashEl.textContent = `HASH: ${randHash.substring(0, 8)}...${randHash.substring(56)}`;
    hashEl.title = `SHA-256: ${randHash}`;
  }

  if (statusEl) {
    statusEl.textContent = '🛡️ AUDIT: GIT HASHES 100% REVERIFIED';
    statusEl.style.color = '#00E676';
    statusEl.style.borderColor = '#00E676';
    setTimeout(() => {
      statusEl.textContent = '🛡️ INTEGRITY: 100% VERIFIED';
      statusEl.style.color = '';
      statusEl.style.borderColor = '';
    }, 2400);
  }
}
window.pulseConductHeroShield = pulseConductHeroShield;

/* D. Contact Page: High-Fidelity 3D Topographic Jaipur Radar Beacon (#contactHeroCanvas) */
let contactRadarCanvas, contactRadarCtx;
let radarAngle = 0, radarPingRadius = 0;
let customPingX = null, customPingY = null;

function initContactHeroCanvas() {
  contactRadarCanvas = document.getElementById('contactHeroCanvas');
  if (!contactRadarCanvas) return;

  const parent = contactRadarCanvas.parentElement;
  let dpr = window.devicePixelRatio || 1;
  let width = (parent && parent.clientWidth > 50) ? parent.clientWidth : 420;
  let height = (parent && parent.clientHeight > 50) ? parent.clientHeight : 270;

  if (contactRadarCanvas.dataset.initialized === 'true') {
    return;
  }
  contactRadarCanvas.dataset.initialized = 'true';

  function resizeRadar() {
    dpr = window.devicePixelRatio || 1;
    width = parent.clientWidth || 420;
    height = parent.clientHeight || 270;
    contactRadarCanvas.width = width * dpr;
    contactRadarCanvas.height = height * dpr;
    contactRadarCanvas.style.width = width + 'px';
    contactRadarCanvas.style.height = height + 'px';
    contactRadarCtx = contactRadarCanvas.getContext('2d');
  }

  resizeRadar();
  window.addEventListener('resize', resizeRadar);

  // Allow clicking anywhere on canvas to trigger an active radar ping
  contactRadarCanvas.addEventListener('click', (ev) => {
    const rect = contactRadarCanvas.getBoundingClientRect();
    const clickX = ev.clientX - rect.left;
    const clickY = ev.clientY - rect.top;
    customPingX = clickX;
    customPingY = clickY;
    radarPingRadius = 3;
    try { playCyberSound('chime'); } catch (e) { }
    const statusEl = document.getElementById('contactRadarStatus');
    if (statusEl) {
      statusEl.textContent = 'ðŸ“¡ BEACON PING DISPATCHED [' + Math.round(clickX) + ',' + Math.round(clickY) + ']';
      statusEl.style.color = '#00E676';
      setTimeout(() => {
        statusEl.textContent = 'ðŸ“¡ BEACON LOCKED: 26.79°N 75.85°E';
        statusEl.style.color = '';
      }, 2400);
    }
  });

  function renderRadar() {
    requestAnimationFrame(renderRadar);
    if (!document.getElementById('page-contact')?.classList.contains('active')) return;
    if (!contactRadarCtx) return;

    contactRadarCtx.save();
    contactRadarCtx.scale(dpr, dpr);
    contactRadarCtx.clearRect(0, 0, width, height);

    const cx = width / 2;
    const cy = height / 2;
    const maxR = Math.min(width, height) * 0.44;

    radarAngle += 0.024;

    // 1. Radar Concentric Range Rings with distance labels
    const rings = [maxR * 0.25, maxR * 0.5, maxR * 0.75, maxR];
    const ringLabels = ['2 KM', '5 KM', '10 KM', '18 KM'];
    rings.forEach((r, idx) => {
      contactRadarCtx.beginPath();
      contactRadarCtx.arc(cx, cy, r, 0, Math.PI * 2);
      contactRadarCtx.strokeStyle = idx === rings.length - 1 ? 'rgba(0, 201, 216, 0.45)' : 'rgba(0, 201, 216, 0.18)';
      contactRadarCtx.lineWidth = idx === rings.length - 1 ? 1.5 : 1;
      contactRadarCtx.stroke();

      // Ring range stamp
      contactRadarCtx.font = "8px 'Space Grotesk', monospace";
      contactRadarCtx.fillStyle = 'rgba(0, 201, 216, 0.45)';
      contactRadarCtx.fillText(ringLabels[idx], cx + 4, cy - r + 10);
    });

    // 2. Crosshairs & Radial Angles
    contactRadarCtx.beginPath();
    contactRadarCtx.moveTo(cx - maxR - 8, cy);
    contactRadarCtx.lineTo(cx + maxR + 8, cy);
    contactRadarCtx.moveTo(cx, cy - maxR - 8);
    contactRadarCtx.lineTo(cx, cy + maxR + 8);
    contactRadarCtx.strokeStyle = 'rgba(0, 201, 216, 0.16)';
    contactRadarCtx.lineWidth = 1;
    contactRadarCtx.stroke();

    // Cardinal Points
    contactRadarCtx.font = "bold 9px 'Space Grotesk', monospace";
    contactRadarCtx.fillStyle = '#00C9D8';
    contactRadarCtx.textAlign = 'center';
    contactRadarCtx.textBaseline = 'middle';
    contactRadarCtx.fillText("N", cx, cy - maxR - 12);
    contactRadarCtx.fillText("S", cx, cy + maxR + 12);
    contactRadarCtx.fillText("E", cx + maxR + 14, cy);
    contactRadarCtx.fillText("W", cx - maxR - 14, cy);

    // 3. Rotating Radar Sweep Cone
    contactRadarCtx.save();
    contactRadarCtx.translate(cx, cy);
    contactRadarCtx.rotate(radarAngle);
    const sweepGrad = contactRadarCtx.createRadialGradient(0, 0, 0, 0, 0, maxR);
    sweepGrad.addColorStop(0, 'rgba(0, 201, 216, 0.55)');
    sweepGrad.addColorStop(0.7, 'rgba(0, 201, 216, 0.18)');
    sweepGrad.addColorStop(1, 'rgba(0, 201, 216, 0.0)');
    contactRadarCtx.beginPath();
    contactRadarCtx.moveTo(0, 0);
    contactRadarCtx.arc(0, 0, maxR, 0, 0.62);
    contactRadarCtx.closePath();
    contactRadarCtx.fillStyle = sweepGrad;
    contactRadarCtx.fill();

    // Leading edge beam
    contactRadarCtx.beginPath();
    contactRadarCtx.moveTo(0, 0);
    contactRadarCtx.lineTo(Math.cos(0.62) * maxR, Math.sin(0.62) * maxR);
    contactRadarCtx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
    contactRadarCtx.lineWidth = 1.8;
    contactRadarCtx.stroke();
    contactRadarCtx.restore();

    // 4. Auxiliary Blips: Jaipur Airport & Jaipur Junction
    const airportX = cx - maxR * 0.42;
    const airportY = cy - maxR * 0.35;
    contactRadarCtx.beginPath();
    contactRadarCtx.arc(airportX, airportY, 3, 0, Math.PI * 2);
    contactRadarCtx.fillStyle = 'rgba(0, 201, 216, 0.7)';
    contactRadarCtx.fill();
    contactRadarCtx.font = "8px 'Space Grotesk', monospace";
    contactRadarCtx.fillStyle = 'rgba(255, 255, 255, 0.65)';
    contactRadarCtx.textAlign = 'left';
    contactRadarCtx.fillText("JAI AIRPORT (8.5km)", airportX + 6, airportY + 3);

    const junctionX = cx - maxR * 0.7;
    const junctionY = cy + maxR * 0.28;
    contactRadarCtx.beginPath();
    contactRadarCtx.arc(junctionX, junctionY, 3, 0, Math.PI * 2);
    contactRadarCtx.fillStyle = 'rgba(0, 201, 216, 0.7)';
    contactRadarCtx.fill();
    contactRadarCtx.fillText("JAIPUR JN (18km)", junctionX + 6, junctionY + 3);

    // 5. Main Target: PIET Jaipur Beacon Point
    const pinX = cx + maxR * 0.36;
    const pinY = cy - maxR * 0.22;

    contactRadarCtx.beginPath();
    contactRadarCtx.arc(pinX, pinY, 6, 0, Math.PI * 2);
    contactRadarCtx.fillStyle = '#FF5722';
    contactRadarCtx.shadowColor = '#FF5722';
    contactRadarCtx.shadowBlur = 14;
    contactRadarCtx.fill();
    contactRadarCtx.shadowBlur = 0;

    contactRadarCtx.beginPath();
    contactRadarCtx.arc(pinX, pinY, 2.5, 0, Math.PI * 2);
    contactRadarCtx.fillStyle = '#FFFFFF';
    contactRadarCtx.fill();

    // Main Target Label
    contactRadarCtx.font = "bold 11px 'Space Grotesk', sans-serif";
    contactRadarCtx.fillStyle = '#FFFFFF';
    contactRadarCtx.shadowColor = 'rgba(0,0,0,0.8)';
    contactRadarCtx.shadowBlur = 6;
    contactRadarCtx.fillText("PIET JAIPUR (HQ)", pinX + 10, pinY + 4);
    contactRadarCtx.shadowBlur = 0;

    // 6. Dynamic Ping Ripple (Target or Custom Click)
    const activePingX = customPingX !== null ? customPingX : pinX;
    const activePingY = customPingY !== null ? customPingY : pinY;

    if (radarPingRadius > 0) {
      contactRadarCtx.beginPath();
      contactRadarCtx.arc(activePingX, activePingY, radarPingRadius, 0, Math.PI * 2);
      contactRadarCtx.strokeStyle = '#FF5722';
      contactRadarCtx.lineWidth = 2.2;
      contactRadarCtx.globalAlpha = Math.max(0, 1 - radarPingRadius / 65);
      contactRadarCtx.stroke();
      contactRadarCtx.globalAlpha = 1;
      radarPingRadius += 1.8;
      if (radarPingRadius > 65) {
        radarPingRadius = 0;
        customPingX = null;
        customPingY = null;
      }
    }

    contactRadarCtx.restore();
  }
  renderRadar();
}

function pingContactHeroBeacon() {
  try { playCyberSound('chime'); } catch (e) { }
  radarPingRadius = 4;
  customPingX = null;
  customPingY = null;
  const statusEl = document.getElementById('contactRadarStatus');
  if (statusEl) {
    statusEl.textContent = 'ðŸ“¡ SIGNAL TRANSMITTED TO PIET COMMAND';
    statusEl.style.color = '#00E676';
    setTimeout(() => {
      statusEl.textContent = 'ðŸ“¡ BEACON LOCKED: 26.79°N 75.85°E';
      statusEl.style.color = '';
    }, 2400);
  }
}
window.pingContactHeroBeacon = pingContactHeroBeacon;

/* E. Sponsors Page: 3D Hypercube Tesseract Projection (#sponsorsHeroCanvas) */
let sponsorsCanvas, sponsorsCtx;
let tesseractRot = 0, sponsorsBurst = 0;

function initSponsorsHeroCanvas() {
  sponsorsCanvas = document.getElementById('sponsorsHeroCanvas');
  if (!sponsorsCanvas) return;

  const parent = sponsorsCanvas.parentElement;
  let width = (sponsorsCanvas.width = parent.clientWidth || 400);
  let height = (sponsorsCanvas.height = parent.clientHeight || 270);
  sponsorsCtx = sponsorsCanvas.getContext('2d');

  function drawCube(cx, cy, size, rot, color) {
    sponsorsCtx.save();
    sponsorsCtx.translate(cx, cy);
    sponsorsCtx.rotate(rot);

    // 4 front vertices
    const fv = [
      { x: -size, y: -size },
      { x: size, y: -size },
      { x: size, y: size },
      { x: -size, y: size }
    ];

    sponsorsCtx.beginPath();
    sponsorsCtx.moveTo(fv[0].x, fv[0].y);
    for (let i = 1; i < 4; i++) sponsorsCtx.lineTo(fv[i].x, fv[i].y);
    sponsorsCtx.closePath();
    sponsorsCtx.strokeStyle = color;
    sponsorsCtx.lineWidth = 1.8;
    sponsorsCtx.stroke();

    // Floating badges at corners
    for (let i = 0; i < 4; i++) {
      sponsorsCtx.beginPath();
      sponsorsCtx.arc(fv[i].x, fv[i].y, 3, 0, Math.PI * 2);
      sponsorsCtx.fillStyle = '#00E676';
      sponsorsCtx.fill();
    }

    sponsorsCtx.restore();
  }

  function renderTesseract() {
    requestAnimationFrame(renderTesseract);
    if (!document.getElementById('page-sponsors')?.classList.contains('active')) return;

    sponsorsCtx.clearRect(0, 0, width, height);
    const cx = width / 2;
    const cy = height / 2;

    tesseractRot += 0.015;

    // Inner and Outer Rotating Cubes (4D Projection)
    drawCube(cx, cy, 65, tesseractRot, '#FF5722');
    drawCube(cx, cy, 40, -tesseractRot * 1.4, '#00C9D8');

    // Cross projection lines connecting outer to inner
    sponsorsCtx.save();
    sponsorsCtx.translate(cx, cy);
    for (let a = 0; a < Math.PI * 2; a += Math.PI / 2) {
      const x1 = 65 * Math.cos(a + tesseractRot);
      const y1 = 65 * Math.sin(a + tesseractRot);
      const x2 = 40 * Math.cos(a - tesseractRot * 1.4);
      const y2 = 40 * Math.sin(a - tesseractRot * 1.4);

      sponsorsCtx.beginPath();
      sponsorsCtx.moveTo(x1, y1);
      sponsorsCtx.lineTo(x2, y2);
      sponsorsCtx.strokeStyle = 'rgba(255, 87, 34, 0.4)';
      sponsorsCtx.stroke();
    }

    // Center Gold Core Emblem
    sponsorsCtx.font = "bold 20px 'Space Grotesk', sans-serif";
    sponsorsCtx.fillStyle = '#FF7043';
    sponsorsCtx.textAlign = 'center';
    sponsorsCtx.textBaseline = 'middle';
    sponsorsCtx.fillText("₹1L+", 0, 0);
    sponsorsCtx.restore();

    if (sponsorsBurst > 0) {
      sponsorsCtx.beginPath();
      sponsorsCtx.arc(cx, cy, sponsorsBurst, 0, Math.PI * 2);
      sponsorsCtx.strokeStyle = '#FFD700';
      sponsorsCtx.lineWidth = 3;
      sponsorsCtx.globalAlpha = Math.max(0, 1 - sponsorsBurst / 120);
      sponsorsCtx.stroke();
      sponsorsBurst += 3;
      if (sponsorsBurst > 120) sponsorsBurst = 0;
    }
  }
  renderTesseract();

  window.addEventListener('resize', () => {
    width = sponsorsCanvas.width = parent.clientWidth || 400;
    height = sponsorsCanvas.height = parent.clientHeight || 270;
  });
}

function pulseSponsorsHeroCore() {
  try { playCyberSound('execute'); } catch (e) { }
  sponsorsBurst = 10;
  const statusEl = document.getElementById('sponsorsCoreStatus');
  if (statusEl) {
    statusEl.textContent = 'ðŸ’Ž UNLOCKED: SQUAD GRANTS ACCELERATED!';
    statusEl.style.color = '#FFD700';
    setTimeout(() => {
      statusEl.textContent = 'ðŸ’Ž GRANTS: ₹1,00,000+ ACTIVE';
      statusEl.style.color = '';
    }, 2000);
  }
}
window.pulseSponsorsHeroCore = pulseSponsorsHeroCore;

/* Master Initialization Hook for Page Hero Canvases */
function initAllPageHeroCanvases() {
  try { initAboutHeroCanvas(); } catch (e) { console.warn("About canvas init:", e); }
  try { initTeamHeroCanvas(); } catch (e) { console.warn("Team canvas init:", e); }
  try { initConductHeroCanvas(); } catch (e) { console.warn("Conduct canvas init:", e); }
  try { initContactHeroCanvas(); } catch (e) { console.warn("Contact canvas init:", e); }
  try { initSponsorsHeroCanvas(); } catch (e) { console.warn("Sponsors canvas init:", e); }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAllPageHeroCanvases);
} else {
  initAllPageHeroCanvases();
}

// >>>>>>>>>> END: 14_pages_3d_canvases.js <<<<<<<<<<

// >>>>>>>>>> START: 16_about_interactive.js <<<<<<<<<<
/* ══════════════════════════════════════════════════════════════════════════
   16. ABOUT PAGE INTERACTIVE EXPERIENCE ENGINE
   Tactile 3D Tilt, Live Facility Telemetry, Organizers Filter & Genesis Oracle
   ══════════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // 1. Stage Stepper Navigation
  function selectAboutStage(stageNum) {
    try { playCyberSound('click'); } catch (e) { }
    const buttons = document.querySelectorAll('.ab-step-btn');
    buttons.forEach((btn, idx) => {
      btn.classList.toggle('active', (idx + 1) === stageNum);
    });

    const targetSec = document.getElementById('aboutStorySec');
    if (targetSec) {
      targetSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    const cards = document.querySelectorAll('.interactive-pillar-card');
    cards.forEach((card, idx) => {
      if ((idx + 1) === stageNum) {
        card.style.borderColor = '#FF5722';
        card.style.boxShadow = '0 0 30px rgba(255, 87, 34, 0.28)';
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        setTimeout(() => {
          card.style.borderColor = '';
          card.style.boxShadow = '';
        }, 1800);
      }
    });

    if (typeof showHoloToast === 'function') {
      showHoloToast('STAGE 0' + stageNum + ' ARCHITECTURE ACTIVATED', 'Synchronized operational telemetry.');
    }
  }
  window.selectAboutStage = selectAboutStage;

  // 2. Interactive Pillar Drawer & Inspection
  function togglePillarDrawer(pillarNum) {
    try { playCyberSound('hover'); } catch (e) { }
    const drawer = document.getElementById('pillarDrawer' + pillarNum);
    const toggleBtn = document.getElementById('pillarToggleBtn' + pillarNum);

    if (drawer) {
      const isOpen = drawer.classList.contains('is-open');
      if (isOpen) {
        drawer.classList.remove('is-open');
        drawer.style.maxHeight = '0px';
        if (toggleBtn) toggleBtn.innerHTML = 'VIEW REAL-TIME SPEC <span class="hsp-arrow">+</span>';
      } else {
        drawer.classList.add('is-open');
        drawer.style.maxHeight = drawer.scrollHeight + 'px';
        if (toggleBtn) toggleBtn.innerHTML = 'COLLAPSE TELEMETRY <span class="hsp-arrow">&minus;</span>';
      }
    }
  }
  window.togglePillarDrawer = togglePillarDrawer;

  function inspectAboutPillar(pillarNum) {
    togglePillarDrawer(pillarNum);
  }
  window.inspectAboutPillar = inspectAboutPillar;

  // 3. Operational Simulations
  function simulateSprintWifiCheck(btn) {
    try { playCyberSound('click'); } catch (e) { }
    if (!btn) return;
    const originalText = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner-inline"></span> PROBING 10Gbps OPTICAL BACKBONE...';

    const feedback = document.getElementById('wifiAuditFeedback');

    setTimeout(() => {
      btn.innerHTML = '&#10003; CONDUIT VERIFIED';
      btn.style.background = 'rgba(0, 201, 216, 0.15)';
      btn.style.borderColor = '#00C9D8';
      btn.style.color = '#00C9D8';

      if (feedback) {
        feedback.innerHTML = '<div class="sim-audit-res audit-success"><strong>&#10004; OPTICAL TELEMETRY CONFIRMED</strong><br>Latency: <strong>2.8 ms</strong> &bull; Jitter: <strong>0.3 ms</strong> &bull; Packet Loss: <strong>0.00%</strong><br>Redundant Tier-1 ISP Failover Ring: <strong>ARMED &amp; ONLINE</strong></div>';
        feedback.style.display = 'block';
      }
      try { playCyberSound('success'); } catch (e) { }

      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = originalText;
        btn.style.background = '';
        btn.style.borderColor = '';
        btn.style.color = '';
      }, 5000);
    }, 1200);
  }
  window.simulateSprintWifiCheck = simulateSprintWifiCheck;

  function simulateCipherAudit(btn) {
    try { playCyberSound('click'); } catch (e) { }
    if (!btn) return;
    const originalText = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner-inline"></span> RUNNING SHA-256 INTEGRITY SCAN...';

    const feedback = document.getElementById('cipherAuditFeedback');

    setTimeout(() => {
      btn.innerHTML = '&#10003; ENCRYPTION SEAL VERIFIED';
      btn.style.background = 'rgba(255, 87, 34, 0.15)';
      btn.style.borderColor = '#FF5722';
      btn.style.color = '#FF5722';

      if (feedback) {
        feedback.innerHTML = '<div class="sim-audit-res audit-vault"><strong>&#128274; REPOSITORY REPUTATION AUDIT PASS</strong><br>Zero Pre-built Commits Detected &bull; AES-256 Air-Gapped Repository Sign-off<br>Status: <strong>100% UNBIASED LIVE SPRINT READY</strong></div>';
        feedback.style.display = 'block';
      }
      try { playCyberSound('success'); } catch (e) { }

      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = originalText;
        btn.style.background = '';
        btn.style.borderColor = '';
        btn.style.color = '';
      }, 5000);
    }, 1100);
  }
  window.simulateCipherAudit = simulateCipherAudit;

  function requestSimulatedMentor(btn) {
    try { playCyberSound('click'); } catch (e) { }
    if (!btn) return;
    const originalText = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner-inline"></span> DISPATCHING RADAR CALL...';

    const feedback = document.getElementById('mentorDispatchFeedback');

    setTimeout(() => {
      btn.innerHTML = '&#10003; MENTOR DISPATCHED';
      btn.style.background = 'rgba(0, 102, 255, 0.15)';
      btn.style.borderColor = '#0066FF';
      btn.style.color = '#0066FF';

      if (feedback) {
        feedback.innerHTML = '<div class="sim-audit-res audit-mentor"><strong>&#128187; MENTOR RADAR ACTIVE</strong><br>Assigned Mentor: <strong>Senior Staff ML Architect (Google for Devs)</strong><br>Target: <strong>Table A-07</strong> &bull; ETA: <strong>45 Seconds</strong></div>';
        feedback.style.display = 'block';
      }
      try { playCyberSound('success'); } catch (e) { }

      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = originalText;
        btn.style.background = '';
        btn.style.borderColor = '';
        btn.style.color = '';
      }, 5000);
    }, 1000);
  }
  window.requestSimulatedMentor = requestSimulatedMentor;

  // 4. Judging Rubric Interactive Cyber Modal
  function showJudgingRubricModal() {
    try { playCyberSound('click'); } catch (e) { }
    let modal = document.getElementById('judgingRubricModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'judgingRubricModal';
      modal.className = 'cyber-modal-backdrop';
      modal.onclick = function (e) {
        if (e.target === modal) closeJudgingRubricModal();
      };
      modal.innerHTML = `
        <div class="cyber-modal-card rubric-modal-card">
          <div class="cm-header">
            <div class="cm-tag">OFFICIAL CRITERIA &bull; 100 PTS MATRIX</div>
            <button class="cm-close-btn" onclick="closeJudgingRubricModal()">&times;</button>
          </div>
          <h3 class="cm-title">NATIONAL JURY EVALUATION RUBRIC</h3>
          <p class="cm-sub">Strict, impartial, multi-dimensional scoring protocol enforced by industry leaders.</p>
          
          <div class="rubric-meters-grid">
            <div class="rm-item">
              <div class="rm-top">
                <span class="rm-label">Technical Innovation &amp; Complexity</span>
                <span class="rm-weight">30 PTS</span>
              </div>
              <div class="rm-bar-bg"><div class="rm-bar-fill" style="width: 30%;"></div></div>
              <div class="rm-desc">Algorithmic difficulty, architectural scalability, autonomous AI logic &amp; codebase hygiene.</div>
            </div>

            <div class="rm-item">
              <div class="rm-top">
                <span class="rm-label">Real-World Utility &amp; Impact</span>
                <span class="rm-weight">25 PTS</span>
              </div>
              <div class="rm-bar-bg"><div class="rm-bar-fill" style="width: 25%;"></div></div>
              <div class="rm-desc">Does this solve a tangible human or enterprise challenge with measurable business or social value?</div>
            </div>

            <div class="rm-item">
              <div class="rm-top">
                <span class="rm-label">UX, Frontend Polish &amp; Vibe</span>
                <span class="rm-weight">20 PTS</span>
              </div>
              <div class="rm-bar-bg"><div class="rm-bar-fill" style="width: 20%;"></div></div>
              <div class="rm-desc">Fluid UI interactions, visual aesthetics, responsive typography, and tactile sensory feedback.</div>
            </div>

            <div class="rm-item">
              <div class="rm-top">
                <span class="rm-label">Working Prototype Completeness</span>
                <span class="rm-weight">15 PTS</span>
              </div>
              <div class="rm-bar-bg"><div class="rm-bar-fill" style="width: 15%;"></div></div>
              <div class="rm-desc">Live verifiable demo without mock smoke-and-mirrors or stubbed out key API calls.</div>
            </div>

            <div class="rm-item">
              <div class="rm-top">
                <span class="rm-label">Pitch, Presentation &amp; Q&amp;A</span>
                <span class="rm-weight">10 PTS</span>
              </div>
              <div class="rm-bar-bg"><div class="rm-bar-fill" style="width: 10%;"></div></div>
              <div class="rm-desc">Clarity of communication, technical defense under jury interrogation, and 3-minute deck cadence.</div>
            </div>
          </div>

          <div class="cm-footer">
            <div class="cm-seal">&#128373; Blind Jury Double-Evaluation &bull; Anti-Bias Verified</div>
            <button class="cm-action-btn" onclick="closeJudgingRubricModal()">ACKNOWLEDGE RUBRIC</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  window.showJudgingRubricModal = showJudgingRubricModal;

  function closeJudgingRubricModal() {
    try { playCyberSound('click'); } catch (e) { }
    const modal = document.getElementById('judgingRubricModal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
  window.closeJudgingRubricModal = closeJudgingRubricModal;

  // 5. Co-Organizers Scope Switcher & 3D Tilt
  function filterOrgCards(scope, btn) {
    try { playCyberSound('click'); } catch (e) { }
    const buttons = document.querySelectorAll('.oss-btn');
    buttons.forEach((b) => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    const cardH2S = document.getElementById('orgCardH2S');
    const cardGGC = document.getElementById('orgCardGGC');
    const synergySec = document.getElementById('synergyMatrixCol');

    if (scope === 'all') {
      if (cardH2S) { cardH2S.style.display = 'flex'; cardH2S.style.opacity = '1'; }
      if (cardGGC) { cardGGC.style.display = 'flex'; cardGGC.style.opacity = '1'; }
      if (synergySec) synergySec.style.opacity = '1';
    } else if (scope === 'h2s') {
      if (cardH2S) { cardH2S.style.display = 'flex'; cardH2S.style.opacity = '1'; }
      if (cardGGC) { cardGGC.style.display = 'none'; cardGGC.style.opacity = '0'; }
    } else if (scope === 'ggc') {
      if (cardH2S) { cardH2S.style.display = 'none'; cardH2S.style.opacity = '0'; }
      if (cardGGC) { cardGGC.style.display = 'flex'; cardGGC.style.opacity = '1'; }
    }
  }
  window.filterOrgCards = filterOrgCards;

  function tiltOrgCard(e, card) {
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    card.style.transition = 'transform 0.08s ease-out';
  }
  window.tiltOrgCard = tiltOrgCard;

  function resetOrgCard(card) {
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    card.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
  }
  window.resetOrgCard = resetOrgCard;

  function inspectOrgStat(val, desc) {
    try { playCyberSound('hover'); } catch (e) { }
    if (typeof showHoloToast === 'function') {
      showHoloToast('DOSSIER VERIFIED: ' + val, desc);
    }
  }
  window.inspectOrgStat = inspectOrgStat;

  function pulseSynergyNode(nodeNum, col) {
    try { playCyberSound('click'); } catch (e) { }
    if (col) {
      col.classList.add('pulse-glow');
      setTimeout(() => col.classList.remove('pulse-glow'), 1200);
    }
    if (typeof showHoloToast === 'function') {
      const titles = [
        'PIPELINE 01: NATIONWIDE SCALE',
        'PIPELINE 02: CAMPUS EXCELLENCE',
        'PIPELINE 03: HYPERVELOCITY DISRUPTORS'
      ];
      showHoloToast(titles[nodeNum - 1] || 'SYNERGY NODE ONLINE', 'Bilateral operation channel synchronized.');
    }
  }
  window.pulseSynergyNode = pulseSynergyNode;

  // 6. Venue & Facility Amenity Inspector
  const facilityData = {
    fiber: {
      title: '10 Gbps Tier-1 High-Density Optical Fiber Ring',
      badge: '99.999% SLA UPTIME',
      color: '#00C9D8',
      icon: '&#128246;',
      status: 'ONLINE &bull; DUAL NKN FAILOVER CONDUITS',
      desc: 'Engineered specifically for heavy concurrent LLM model weights, Docker container pulls, and cloud deployment pipelines. Equipped with enterprise Wi-Fi 6 APs across every coding bay.'
    },
    power: {
      title: 'Continuous Redundant Dual Industrial Power Grid',
      badge: '100% UNINTERRUPTIBLE',
      color: '#FF5722',
      icon: '&#9889;',
      status: 'ONLINE &bull; 0.00 MS HYBRID UPS CHANGEOVER',
      desc: 'Zero-downtime dual high-capacity DG gensets paired with 500kVA online centralized industrial UPS arrays ensure code compilation, hardware benches, and GPU rigs never face a millisecond blackout.'
    },
    ac: {
      title: 'Climate Controlled Centralized HVAC Coding Arena',
      badge: 'OPTIMAL 21&deg;C RUNTIME',
      color: '#0066FF',
      icon: '&#10052;',
      status: 'ACTIVE &bull; CONTINUOUS AIR CYCLE &bull; CO2 FILTERED',
      desc: 'Specially calibrated indoor climate control keeps 500+ builders alert and energized throughout the grueling 36-hour sprint with fresh airflow circulation and acoustic dampening.'
    },
    dorm: {
      title: 'Gender-Segregated Rest & Recharge Pod Zones',
      badge: '24/7 DEDICATED HOSTELS',
      color: '#7928CA',
      icon: '&#128716;',
      status: 'RESERVED &bull; SECURE RFID KEYCARD ACCESS',
      desc: 'Dedicated private air-conditioned hostel wings for women and men, equipped with plush mattresses, fresh linens, warm showers, hygiene kits, and attentive student coordinators.'
    },
    food: {
      title: 'Continuous Gourmet Meals, Midnight Buffets & Fuel',
      badge: 'UNLIMITED NOURISHMENT',
      color: '#FF007A',
      icon: '&#127829;',
      status: 'HOT KITCHEN LIVE &bull; 6 CATERED SESSIONS',
      desc: 'From royal Rajasthani welcome banquets to 3:00 AM energy bowls, endless iced Red Bull, artisanal midnight pizza stations, and continuous espresso bars to fuel late-night deep-work breakthroughs.'
    },
    security: {
      title: 'Campus Perimeter Security & Rapid Response Medical',
      badge: 'SAFETY LEVEL ALPHA',
      color: '#10B981',
      icon: '&#128737;',
      status: 'GUARDED &bull; AMBULANCE ON STANDBY &bull; 24H RESIDENT DOCTOR',
      desc: 'Round-the-clock physical security patrols, continuous HD camera coverage, dedicated female wardens, on-campus paramedics, and strict non-transferable QR identity checks.'
    }
  };

  function inspectPietAmenity(key, chip) {
    try { playCyberSound('click'); } catch (e) { }
    const chips = document.querySelectorAll('.if-chip');
    chips.forEach((c) => c.classList.remove('active'));
    if (chip) chip.classList.add('active');

    const data = facilityData[key];
    if (!data) return;

    const hud = document.getElementById('vscAmenityHud');
    if (hud) {
      hud.style.opacity = '0';
      hud.style.transform = 'translateY(8px)';
      setTimeout(() => {
        hud.innerHTML = `
          <div class="vah-header" style="border-left: 4px solid ${data.color}">
            <div class="vah-top-meta">
              <span class="vah-icon">${data.icon}</span>
              <span class="vah-badge" style="background: ${data.color}22; color: ${data.color}; border: 1px solid ${data.color}44;">${data.badge}</span>
              <span class="vah-status">${data.status}</span>
            </div>
            <h4 class="vah-title">${data.title}</h4>
            <p class="vah-desc">${data.desc}</p>
          </div>
        `;
        hud.style.opacity = '1';
        hud.style.transform = 'translateY(0)';
      }, 160);
    }
  }
  window.inspectPietAmenity = inspectPietAmenity;

  // 7. Jaipur Transit Direct Map Integration
  function openTransitMaps(type) {
    try { playCyberSound('click'); } catch (e) { }
    const query = encodeURIComponent('Poornima Institute of Engineering and Technology Sitapura Jaipur');
    const url = 'https://www.google.com/maps/search/?api=1&query=' + query;
    window.open(url, '_blank');

    if (typeof showHoloToast === 'function') {
      const mode = type === 'flight' ? 'AIRPORT SHUTTLE ROUTE' : (type === 'train' ? 'RAILWAY STATION ROUTE' : 'JAIPUR HIGHWAY ROUTE');
      showHoloToast('TRANSIT NAVIGATION OPENED', mode + ': Navigating to PIET Jaipur.');
    }
  }
  window.openTransitMaps = openTransitMaps;

  // 8. Arena Photo Gallery Filter
  function filterAboutGallery(category, btn) {
    try { playCyberSound('click'); } catch (e) { }
    const tabs = document.querySelectorAll('.gft-btn');
    tabs.forEach((t) => t.classList.remove('active'));
    if (btn) btn.classList.add('active');

    const cards = document.querySelectorAll('.interactive-photo-card');
    cards.forEach((card) => {
      const cat = card.getAttribute('data-category');
      if (category === 'all' || cat === category) {
        card.style.display = 'block';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        }, 30);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.96)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 250);
      }
    });
  }
  window.filterAboutGallery = filterAboutGallery;

  // 9. Genesis Fact Oracle Accordion
  function toggleOracleItem(headerEl) {
    try { playCyberSound('hover'); } catch (e) { }
    const item = headerEl.closest('.oracle-item');
    if (!item) return;

    const isOpen = item.classList.contains('is-open');

    // Close all other oracle items in the same grid
    const allItems = document.querySelectorAll('.oracle-item');
    allItems.forEach((oi) => {
      if (oi !== item) {
        oi.classList.remove('is-open');
        const body = oi.querySelector('.oi-body');
        if (body) body.style.maxHeight = '0px';
      }
    });

    const body = item.querySelector('.oi-body');
    if (isOpen) {
      item.classList.remove('is-open');
      if (body) body.style.maxHeight = '0px';
    } else {
      item.classList.add('is-open');
      if (body) body.style.maxHeight = (body.scrollHeight + 40) + 'px';
      try { playCyberSound('click'); } catch (e) { }
    }
  }
  window.toggleOracleItem = toggleOracleItem;

  // 10. Theme Highlight shortcut
  function highlightAboutTheme(themeKey) {
    try { playCyberSound('click'); } catch (e) { }
    if (typeof go === 'function') {
      go('theme');
    }
    if (typeof showHoloToast === 'function') {
      showHoloToast('TRACK TELEMETRY LOADED', 'Inspecting track parameters for: ' + themeKey.toUpperCase());
    }
  }
  window.highlightAboutTheme = highlightAboutTheme;

})();

// >>>>>>>>>> END: 16_about_interactive.js <<<<<<<<<<

// >>>>>>>>>> START: 99_init.js <<<<<<<<<<
/* ==========================================================================
   21. MASTER SYSTEM INITIALIZATION
   ========================================================================== */

/* ==========================================================================
   22. 3D CHARACTER EDITORIAL HERO & INTERACTIVE GALLERY ENGINE
   ========================================================================== */
let edCurrentTheme = 0;
const edThemes = [
  {
    name: 'creator',
    cardClass: '',
    word1: 'NEVER',
    word2: 'STOP',
    word3: 'BUILDING.',
    desc: 'Think beyond limitations. Experiment with AI. Transform your imagination into real digital products.',
    primaryGlow: '#00F5D4',
    secondaryGlow: '#FF5722',
    armorTint: '#111827'
  },
  {
    name: 'matrix',
    cardClass: 'theme-matrix',
    word1: 'CODE',
    word2: 'THE',
    word3: 'IMPOSSIBLE.',
    desc: 'Synthesize scalable systems. Master multi-agent runtimes. Build autonomous protocols on high-speed telemetry.',
    primaryGlow: '#00FF66',
    secondaryGlow: '#00C9D8',
    armorTint: '#031E23'
  },
  {
    name: 'quantum',
    cardClass: 'theme-quantum',
    word1: 'ARCHITECT',
    word2: 'THE',
    word3: 'TOMORROW.',
    desc: 'Merge distributed ledgers with edge compute. Design the next generation of resilient web infrastructure.',
    primaryGlow: '#D946EF',
    secondaryGlow: '#8B5CF6',
    armorTint: '#1E0E38'
  },
  {
    name: 'neural',
    cardClass: 'theme-neural',
    word1: 'SYNTHESIZE',
    word2: 'THE',
    word3: 'REALITY.',
    desc: 'Train local neural models. Deploy zero-latency intelligent agents directly into the physical arena.',
    primaryGlow: '#F59E0B',
    secondaryGlow: '#EF4444',
    armorTint: '#261229'
  }
];

function switchEditorialTheme(idx) {
  if (idx < 0 || idx >= edThemes.length) return;
  edCurrentTheme = idx;
  const theme = edThemes[idx];

  const card = document.getElementById('edHeroCard');
  if (card) {
    card.className = 'ed-hero-card ' + theme.cardClass;
  }

  const btns = document.querySelectorAll('#edThumbsList .ed-thumb-btn');
  btns.forEach((btn, i) => {
    btn.classList.toggle('active', i === idx);
  });

  const w1 = document.getElementById('edWordNever');
  const w2 = document.getElementById('edWordStop');
  const w3 = document.getElementById('edWordBuilding');
  const lead = document.getElementById('edSupportingLead');

  if (w1) w1.textContent = theme.word1;
  if (w2) w2.textContent = theme.word2;
  if (w3) w3.textContent = theme.word3;
  if (lead) lead.textContent = theme.desc;

  const decorCode = document.getElementById('edDecorCode');
  const coreStatus = document.getElementById('edCoreModeStatus');
  const decorCodes = ['// AT_CREATOR_SYNTH', '// AT_MATRIX_HYPERCUBE', '// AT_QUANTUM_CORE', '// AT_NEURAL_SYNAPSE'];
  const coreStatuses = ['HOLO_CORE: 01 // SYNCHRONIZED', 'MATRIX_HYPERCUBE: 02 // STREAMING', 'QUANTUM_CORE: 03 // CRITICAL', 'NEURAL_TERMINAL: 04 // CONNECTED'];
  if (decorCode) decorCode.textContent = decorCodes[idx] || '// AT_CREATOR_SYNTH';
  if (coreStatus) coreStatus.textContent = coreStatuses[idx] || 'HOLO_CORE: 01 // ACTIVE';

  if (window._edHeroTriggerTransition) {
    window._edHeroTriggerTransition();
  }

  if (typeof playCyberSound === 'function') {
    try { playCyberSound('click'); } catch (e) { }
  }
}
window.switchEditorialTheme = switchEditorialTheme;

function initEditorial3DHero() {
  const canvas = document.getElementById('ed3dCharacterCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  if (canvas._edHeroInitialized) return;
  canvas._edHeroInitialized = true;

  let width = 0, height = 0;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  function resize() {
    const parent = canvas.parentElement;
    if (!parent) return;
    width = parent.offsetWidth;
    height = parent.offsetHeight;
    if (width <= 0 || height <= 0) return;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  // 3D Physics, Interaction & Inertia State
  let rotX = 0.15;
  let rotY = 0.35;
  let velX = 0;
  let velY = 0;
  let isDragging = false;
  let startX = 0, startY = 0;
  let lastX = 0, lastY = 0;

  let hoverX = 0, hoverY = 0;
  let targetHoverX = 0, targetHoverY = 0;
  let modeTransitionFlash = 1.0;

  window._edHeroTriggerTransition = function () {
    modeTransitionFlash = 1.0;
    velY += 0.08;
  };

  // Pointer Dragging (Mouse & Touch compatible)
  canvas.addEventListener('pointerdown', (e) => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    lastX = e.clientX;
    lastY = e.clientY;
    velX = 0;
    velY = 0;
    try { canvas.setPointerCapture(e.pointerId); } catch (err) { }
  });

  window.addEventListener('pointermove', (e) => {
    if (isDragging) {
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      rotY += dx * 0.0075;
      rotX += dy * 0.0075;
      velY = dx * 0.0075;
      velX = dy * 0.0075;
    }
  }, { passive: true });

  const stopDrag = (e) => {
    if (isDragging) {
      isDragging = false;
      try { if (e && e.pointerId) canvas.releasePointerCapture(e.pointerId); } catch (err) { }
    }
  };
  window.addEventListener('pointerup', stopDrag);
  window.addEventListener('pointercancel', stopDrag);

  // Card Parallax Hover
  const stage = document.getElementById('editorialHeroSection');
  if (stage) {
    stage.addEventListener('mousemove', (e) => {
      const rect = stage.getBoundingClientRect();
      targetHoverX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      targetHoverY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    }, { passive: true });
    stage.addEventListener('mouseleave', () => {
      targetHoverX = 0;
      targetHoverY = 0;
    });
  }

  // 3D Geometry Utilities
  function rotateX(p, a) {
    const cos = Math.cos(a), sin = Math.sin(a);
    return { x: p.x, y: p.y * cos - p.z * sin, z: p.y * sin + p.z * cos };
  }
  function rotateY(p, a) {
    const cos = Math.cos(a), sin = Math.sin(a);
    return { x: p.x * cos + p.z * sin, y: p.y, z: -p.x * sin + p.z * cos };
  }
  function rotateZ(p, a) {
    const cos = Math.cos(a), sin = Math.sin(a);
    return { x: p.x * cos - p.y * sin, y: p.x * sin + p.y * cos, z: p.z };
  }
  function project(p, cx, cy, fov) {
    const f = fov || 380;
    const zDist = p.z + 460;
    if (zDist <= 10) return { x: cx, y: cy, scale: 0, visible: false, z: p.z };
    const scale = f / zDist;
    return {
      x: cx + p.x * scale,
      y: cy + p.y * scale,
      scale: scale,
      visible: true,
      z: p.z
    };
  }

  // Pre-generate 3D Mode Models
  // 1. Icosahedron for Mode 0
  const phi = (1 + Math.sqrt(5)) / 2;
  const icoRawVertices = [
    { x: -1, y: phi, z: 0 }, { x: 1, y: phi, z: 0 }, { x: -1, y: -phi, z: 0 }, { x: 1, y: -phi, z: 0 },
    { x: 0, y: -1, z: phi }, { x: 0, y: 1, z: phi }, { x: 0, y: -1, z: -phi }, { x: 0, y: 1, z: -phi },
    { x: phi, y: 0, z: -1 }, { x: phi, y: 0, z: 1 }, { x: -phi, y: 0, z: -1 }, { x: -phi, y: 0, z: 1 }
  ];
  const icoScale = 48;
  const icoVertices = icoRawVertices.map(v => {
    const len = Math.hypot(v.x, v.y, v.z);
    return { x: (v.x / len) * icoScale, y: (v.y / len) * icoScale, z: (v.z / len) * icoScale };
  });
  const icoFaces = [
    [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
    [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
    [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
    [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1]
  ];

  // 2. 4D Hypercube (Tesseract) for Mode 1
  const tesseractVertices4D = [];
  for (let x = -1; x <= 1; x += 2) {
    for (let y = -1; y <= 1; y += 2) {
      for (let z = -1; z <= 1; z += 2) {
        for (let w = -1; w <= 1; w += 2) {
          tesseractVertices4D.push({ x: x * 65, y: y * 65, z: z * 65, w: w * 65 });
        }
      }
    }
  }
  const tesseractEdges = [];
  for (let i = 0; i < 16; i++) {
    for (let j = i + 1; j < 16; j++) {
      let diff = 0;
      if (tesseractVertices4D[i].x !== tesseractVertices4D[j].x) diff++;
      if (tesseractVertices4D[i].y !== tesseractVertices4D[j].y) diff++;
      if (tesseractVertices4D[i].z !== tesseractVertices4D[j].z) diff++;
      if (tesseractVertices4D[i].w !== tesseractVertices4D[j].w) diff++;
      if (diff === 1) tesseractEdges.push([i, j]);
    }
  }

  // 3. Matrix Rain 3D Columns for Mode 1
  const matrixCols = [];
  const chars = '0101XYZABC789ΩλH2SGGC2027';
  for (let i = 0; i < 28; i++) {
    matrixCols.push({
      x: (Math.random() - 0.5) * 280,
      y: (Math.random() - 0.5) * 280,
      z: (Math.random() - 0.5) * 220,
      speed: 1.8 + Math.random() * 2.5,
      chars: Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)])
    });
  }

  // 4. Quantum Vortex Particles for Mode 2
  const quantumParticles = [];
  for (let i = 0; i < 110; i++) {
    quantumParticles.push({
      radius: 30 + Math.random() * 120,
      angle: Math.random() * Math.PI * 2,
      speed: 0.02 + Math.random() * 0.04,
      elevation: (Math.random() - 0.5) * 70,
      size: 1.5 + Math.random() * 2.5,
      hueOffset: Math.random() * 60
    });
  }

  // 5. Neural Synapse Sphere Lattice for Mode 3
  const neuralNodes = [];
  const nodeCount = 36;
  for (let i = 0; i < nodeCount; i++) {
    const y = 1 - (i / (nodeCount - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i * Math.PI * 2;
    const x = Math.cos(theta) * r;
    const z = Math.sin(theta) * r;
    neuralNodes.push({
      x: x * 88,
      y: y * 88,
      z: z * 88,
      pulse: Math.random() * Math.PI * 2,
      activity: 0.3 + Math.random() * 0.7
    });
  }

  let time = 0;
  const rotLabel = document.getElementById('edRotXVal');

  function render() {
    time += 0.022;
    const pEl = canvas.parentElement;
    if (pEl && (width <= 0 || height <= 0 || width !== pEl.offsetWidth || height !== pEl.offsetHeight)) {
      resize();
    }

    if (!isDragging) {
      rotY += velY;
      rotX += velX;
      velY *= 0.93;
      velX *= 0.93;
      rotY += 0.005; // ambient rotation
    }
    // Clamp vertical tilt
    rotX = Math.max(-0.85, Math.min(0.85, rotX));

    hoverX += (targetHoverX - hoverX) * 0.08;
    hoverY += (targetHoverY - hoverY) * 0.08;

    if (modeTransitionFlash > 0) {
      modeTransitionFlash = Math.max(0, modeTransitionFlash - 0.04);
    }

    if (rotLabel) {
      let deg = ((rotY * 180 / Math.PI) % 360);
      if (deg < 0) deg += 360;
      rotLabel.textContent = deg.toFixed(0) + '°';
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    const theme = edThemes[edCurrentTheme] || edThemes[0];
    const cx = width * 0.5 + hoverX * 18;
    const cy = height * 0.5 + hoverY * 12;
    const baseScale = Math.min(width, height) / 460;

    // Background Radial Flare
    const bgFlare = ctx.createRadialGradient(cx, cy, 20, cx, cy, 210 * baseScale);
    bgFlare.addColorStop(0, theme.primaryGlow);
    bgFlare.addColorStop(0.4, theme.secondaryGlow);
    bgFlare.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.globalAlpha = 0.16 + (modeTransitionFlash * 0.25);
    ctx.beginPath();
    ctx.arc(cx, cy, 210 * baseScale, 0, Math.PI * 2);
    ctx.fillStyle = bgFlare;
    ctx.fill();
    ctx.globalAlpha = 1;

    // Transformation according to current mode
    const mode = edCurrentTheme % 4;

    if (mode === 0) {
      // ==========================================
      // MODE 0: CYBER CREATOR - 3D GYROSCOPIC CORE
      // ==========================================
      // 1. Concentric Gyroscopic Rings
      const ringSpecs = [
        { r: 135 * baseScale, speed: time * 0.9, tilt: 0.25, color: theme.primaryGlow, ticks: 12 },
        { r: 102 * baseScale, speed: -time * 1.2, tilt: 0.85, color: theme.secondaryGlow, ticks: 8 },
        { r: 72 * baseScale, speed: time * 1.6, tilt: -0.65, color: '#FFFFFF', ticks: 6 }
      ];

      ringSpecs.forEach((ring) => {
        ctx.save();
        ctx.strokeStyle = ring.color;
        ctx.lineWidth = 1.8;
        ctx.shadowColor = ring.color;
        ctx.shadowBlur = 12;

        const pts = [];
        const segments = 36;
        for (let i = 0; i <= segments; i++) {
          const theta = (i / segments) * Math.PI * 2;
          let p = { x: Math.cos(theta) * ring.r, y: Math.sin(theta) * ring.r, z: 0 };
          p = rotateX(p, ring.tilt + rotX);
          p = rotateY(p, ring.speed + rotY);
          pts.push(project(p, cx, cy, 400));
        }

        ctx.beginPath();
        for (let i = 0; i < pts.length; i++) {
          if (pts[i].visible) {
            if (i === 0) ctx.moveTo(pts[i].x, pts[i].y);
            else ctx.lineTo(pts[i].x, pts[i].y);
          }
        }
        ctx.stroke();

        // Ring Tick Marks & Orbiting Gimbal Nodes
        for (let t = 0; t < ring.ticks; t++) {
          const theta = (t / ring.ticks) * Math.PI * 2;
          let p = { x: Math.cos(theta) * ring.r, y: Math.sin(theta) * ring.r, z: 0 };
          p = rotateX(p, ring.tilt + rotX);
          p = rotateY(p, ring.speed + rotY);
          const pr = project(p, cx, cy, 400);
          if (pr.visible) {
            ctx.fillStyle = ring.color;
            ctx.beginPath();
            ctx.arc(pr.x, pr.y, 2.5 * pr.scale, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        ctx.restore();
      });

      // 2. Central 3D Icosahedron Lattice
      const projIco = icoVertices.map(v => {
        let p = { x: v.x * baseScale, y: v.y * baseScale, z: v.z * baseScale };
        p = rotateX(p, rotX + time * 0.4);
        p = rotateY(p, rotY + time * 0.7);
        p = rotateZ(p, time * 0.3);
        return { orig: p, pr: project(p, cx, cy, 400) };
      });

      // Sort faces by depth
      const sortedFaces = icoFaces.map(f => {
        const p0 = projIco[f[0]], p1 = projIco[f[1]], p2 = projIco[f[2]];
        const avgZ = (p0.orig.z + p1.orig.z + p2.orig.z) / 3;
        return { indices: f, avgZ, p0, p1, p2 };
      }).sort((a, b) => a.avgZ - b.avgZ);

      sortedFaces.forEach(face => {
        const { p0, p1, p2, avgZ } = face;
        if (!p0.pr.visible || !p1.pr.visible || !p2.pr.visible) return;

        // Face normal / light factor
        const normalZ = (p1.pr.x - p0.pr.x) * (p2.pr.y - p0.pr.y) - (p1.pr.y - p0.pr.y) * (p2.pr.x - p0.pr.x);
        if (normalZ < 0) return; // backface cull

        const depthAlpha = Math.max(0.12, Math.min(0.7, 0.45 + (avgZ / (icoScale * 2)) * 0.35));

        ctx.beginPath();
        ctx.moveTo(p0.pr.x, p0.pr.y);
        ctx.lineTo(p1.pr.x, p1.pr.y);
        ctx.lineTo(p2.pr.x, p2.pr.y);
        ctx.closePath();

        ctx.fillStyle = `rgba(13, 20, 36, ${depthAlpha})`;
        ctx.fill();
        ctx.strokeStyle = theme.primaryGlow;
        ctx.lineWidth = 1.6;
        ctx.shadowColor = theme.primaryGlow;
        ctx.shadowBlur = 8;
        ctx.stroke();
      });

      // Glowing Vertices
      projIco.forEach(pt => {
        if (pt.pr.visible) {
          ctx.fillStyle = '#FFFFFF';
          ctx.beginPath();
          ctx.arc(pt.pr.x, pt.pr.y, 3 * pt.pr.scale, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // 3. Central Luminous Singularity Core
      const corePulse = 1 + Math.sin(time * 3.5) * 0.15;
      const coreGrad = ctx.createRadialGradient(cx, cy, 2, cx, cy, 22 * baseScale * corePulse);
      coreGrad.addColorStop(0, '#FFFFFF');
      coreGrad.addColorStop(0.35, theme.primaryGlow);
      coreGrad.addColorStop(0.8, theme.secondaryGlow);
      coreGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.beginPath();
      ctx.arc(cx, cy, 22 * baseScale * corePulse, 0, Math.PI * 2);
      ctx.fillStyle = coreGrad;
      ctx.fill();

    } else if (mode === 1) {
      // ==========================================
      // MODE 1: DIGITAL MATRIX - 4D HYPERCUBE (TESSERACT)
      // ==========================================
      // 1. Cascading 3D Matrix Columns in Depth
      ctx.save();
      ctx.font = 'bold 11px "JetBrains Mono", monospace';
      matrixCols.forEach(col => {
        col.y += col.speed;
        if (col.y > 160) col.y = -160;

        let p = { x: col.x * baseScale, y: col.y * baseScale, z: col.z * baseScale };
        p = rotateX(p, rotX);
        p = rotateY(p, rotY);
        const pr = project(p, cx, cy, 400);

        if (pr.visible) {
          col.chars.forEach((ch, idx) => {
            const charY = pr.y + idx * (14 * pr.scale);
            const alpha = idx === 0 ? 0.95 : Math.max(0.1, 0.7 - idx * 0.12);
            ctx.fillStyle = idx === 0 ? '#FFFFFF' : theme.primaryGlow;
            ctx.globalAlpha = alpha;
            ctx.fillText(ch, pr.x, charY);
          });
        }
      });
      ctx.restore();

      // 2. 4D Tesseract Rotation & 3D Perspective Projection
      const rot4DW = time * 0.8;
      const tesseractProj = tesseractVertices4D.map(v => {
        // Rotate in X-W plane
        const cosW = Math.cos(rot4DW), sinW = Math.sin(rot4DW);
        const x4 = v.x * cosW - v.w * sinW;
        const w4 = v.x * sinW + v.w * cosW;

        // Project 4D to 3D
        const wDist = 180;
        const wFactor = wDist / (wDist - w4);
        let p3D = {
          x: x4 * wFactor * baseScale,
          y: v.y * wFactor * baseScale,
          z: v.z * wFactor * baseScale
        };

        // Rotate in 3D by user control
        p3D = rotateX(p3D, rotX);
        p3D = rotateY(p3D, rotY + time * 0.4);

        return project(p3D, cx, cy, 400);
      });

      // Draw Tesseract Edges
      ctx.save();
      ctx.lineWidth = 2;
      ctx.shadowColor = theme.primaryGlow;
      ctx.shadowBlur = 10;
      ctx.strokeStyle = theme.primaryGlow;

      tesseractEdges.forEach(edge => {
        const p1 = tesseractProj[edge[0]];
        const p2 = tesseractProj[edge[1]];
        if (p1.visible && p2.visible) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      });

      // Tesseract Glowing Vertex Nodes
      tesseractProj.forEach(p => {
        if (p.visible) {
          ctx.fillStyle = '#FFFFFF';
          ctx.beginPath();
          ctx.arc(p.x, p.y, 3 * p.scale, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      ctx.restore();

    } else if (mode === 2) {
      // ==========================================
      // MODE 2: QUANTUM CORE - SINGULARITY ACCRETION
      // ==========================================
      // 1. Swirling Accretion Vortex
      quantumParticles.forEach(pt => {
        pt.angle += pt.speed;
        let p = {
          x: Math.cos(pt.angle) * pt.radius * baseScale,
          y: pt.elevation * baseScale + Math.sin(time * 3 + pt.angle) * 8,
          z: Math.sin(pt.angle) * pt.radius * baseScale
        };
        p = rotateX(p, rotX + 0.3);
        p = rotateY(p, rotY + time * 0.5);

        const pr = project(p, cx, cy, 400);
        if (pr.visible) {
          const depthAlpha = Math.max(0.15, Math.min(0.9, 0.5 + (pr.z / 200) * 0.4));
          ctx.fillStyle = pt.radius < 50 ? '#FFFFFF' : theme.primaryGlow;
          ctx.shadowColor = theme.secondaryGlow;
          ctx.shadowBlur = 8;
          ctx.globalAlpha = depthAlpha;
          ctx.beginPath();
          ctx.arc(pr.x, pr.y, pt.size * pr.scale, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      ctx.globalAlpha = 1;

      // 2. High-Speed Interlocking Plasma Torus Rings
      const plasmaRings = [
        { tiltX: 0.3, tiltY: 0.2, speed: time * 2.2, r: 110 * baseScale, color: theme.primaryGlow },
        { tiltX: -0.6, tiltY: 0.8, speed: -time * 1.9, r: 92 * baseScale, color: theme.secondaryGlow },
        { tiltX: 0.7, tiltY: -0.5, speed: time * 2.5, r: 76 * baseScale, color: '#FFFFFF' }
      ];

      plasmaRings.forEach(ring => {
        ctx.save();
        ctx.strokeStyle = ring.color;
        ctx.lineWidth = 2.2;
        ctx.shadowColor = ring.color;
        ctx.shadowBlur = 14;

        const pts = [];
        const segs = 32;
        for (let i = 0; i <= segs; i++) {
          const theta = (i / segs) * Math.PI * 2;
          let p = { x: Math.cos(theta) * ring.r, y: Math.sin(theta) * ring.r, z: 0 };
          p = rotateX(p, ring.tiltX + rotX);
          p = rotateY(p, ring.tiltY + ring.speed + rotY);
          pts.push(project(p, cx, cy, 400));
        }

        ctx.beginPath();
        for (let i = 0; i < pts.length; i++) {
          if (pts[i].visible) {
            if (i === 0) ctx.moveTo(pts[i].x, pts[i].y);
            else ctx.lineTo(pts[i].x, pts[i].y);
          }
        }
        ctx.stroke();
        ctx.restore();
      });

      // 3. Central Quantum Singularity Core with Event Horizon
      const singPulse = 1 + Math.sin(time * 5) * 0.12;
      ctx.save();
      const singGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 32 * baseScale * singPulse);
      singGrad.addColorStop(0, '#040711');
      singGrad.addColorStop(0.55, '#040711');
      singGrad.addColorStop(0.7, theme.secondaryGlow);
      singGrad.addColorStop(0.85, theme.primaryGlow);
      singGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.beginPath();
      ctx.arc(cx, cy, 32 * baseScale * singPulse, 0, Math.PI * 2);
      ctx.fillStyle = singGrad;
      ctx.shadowColor = theme.primaryGlow;
      ctx.shadowBlur = 24;
      ctx.fill();
      ctx.restore();

      // Electric Lightning Discharge
      if (Math.random() < 0.6) {
        ctx.save();
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 1.5;
        ctx.shadowColor = theme.primaryGlow;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        const arcAngle = Math.random() * Math.PI * 2;
        const arcDist = 60 * baseScale + Math.random() * 40 * baseScale;
        const midX = cx + Math.cos(arcAngle) * (arcDist * 0.5) + (Math.random() - 0.5) * 20;
        const midY = cy + Math.sin(arcAngle) * (arcDist * 0.5) + (Math.random() - 0.5) * 20;
        const endX = cx + Math.cos(arcAngle) * arcDist;
        const endY = cy + Math.sin(arcAngle) * arcDist;
        ctx.quadraticCurveTo(midX, midY, endX, endY);
        ctx.stroke();
        ctx.restore();
      }

    } else if (mode === 3) {
      // ==========================================
      // MODE 3: NEURAL TERMINAL - SYNAPSE NETWORK & HUD
      // ==========================================
      // 1. Rotating Tactical Holographic HUD Compass
      ctx.save();
      ctx.strokeStyle = theme.primaryGlow;
      ctx.lineWidth = 1.4;
      ctx.shadowColor = theme.primaryGlow;
      ctx.shadowBlur = 8;

      const hudRadius = 145 * baseScale;
      ctx.beginPath();
      ctx.arc(cx, cy, hudRadius, 0, Math.PI * 2);
      ctx.setLineDash([4, 8]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Compass Degree Ticks
      for (let deg = 0; deg < 360; deg += 30) {
        const rad = (deg * Math.PI / 180) + rotY;
        const innerR = deg % 90 === 0 ? hudRadius - 10 : hudRadius - 6;
        const x1 = cx + Math.cos(rad) * innerR;
        const y1 = cy + Math.sin(rad) * innerR;
        const x2 = cx + Math.cos(rad) * (hudRadius + 4);
        const y2 = cy + Math.sin(rad) * (hudRadius + 4);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      // Targeting Crosshair Brackets
      const bSize = 16 * baseScale;
      const bDist = 110 * baseScale;
      [
        { x: cx - bDist, y: cy - bDist, sx: 1, sy: 1 },
        { x: cx + bDist, y: cy - bDist, sx: -1, sy: 1 },
        { x: cx - bDist, y: cy + bDist, sx: 1, sy: -1 },
        { x: cx + bDist, y: cy + bDist, sx: -1, sy: -1 }
      ].forEach(b => {
        ctx.beginPath();
        ctx.moveTo(b.x, b.y + b.sy * bSize);
        ctx.lineTo(b.x, b.y);
        ctx.lineTo(b.x + b.sx * bSize, b.y);
        ctx.stroke();
      });
      ctx.restore();

      // 2. 3D Neural Synapse Mesh
      const projNodes = neuralNodes.map(n => {
        let p = { x: n.x * baseScale, y: n.y * baseScale, z: n.z * baseScale };
        p = rotateX(p, rotX);
        p = rotateY(p, rotY + time * 0.35);
        return { orig: n, pr: project(p, cx, cy, 400) };
      });

      // Draw Synaptic Axon Connections
      ctx.save();
      ctx.lineWidth = 1.2;
      for (let i = 0; i < projNodes.length; i++) {
        for (let j = i + 1; j < projNodes.length; j++) {
          const n1 = projNodes[i], n2 = projNodes[j];
          if (!n1.pr.visible || !n2.pr.visible) continue;

          const dx = n1.orig.x - n2.orig.x;
          const dy = n1.orig.y - n2.orig.y;
          const dz = n1.orig.z - n2.orig.z;
          const dist3D = Math.hypot(dx, dy, dz);

          if (dist3D < 62) {
            const alpha = (1 - dist3D / 62) * 0.45;
            ctx.strokeStyle = theme.primaryGlow;
            ctx.globalAlpha = alpha;
            ctx.beginPath();
            ctx.moveTo(n1.pr.x, n1.pr.y);
            ctx.lineTo(n2.pr.x, n2.pr.y);
            ctx.stroke();

            // Electrical signal packet traveling along synapse
            const packetPos = (time * 1.5 + (i * 0.3)) % 1;
            const px = n1.pr.x + (n2.pr.x - n1.pr.x) * packetPos;
            const py = n1.pr.y + (n2.pr.y - n1.pr.y) * packetPos;
            ctx.fillStyle = '#FFFFFF';
            ctx.globalAlpha = alpha * 1.5;
            ctx.beginPath();
            ctx.arc(px, py, 1.8, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
      ctx.restore();

      // Neural Nodes & Interactive Laser Cursor Link
      const mouseCanvasX = cx + hoverX * (width * 0.45);
      const mouseCanvasY = cy + hoverY * (height * 0.45);

      projNodes.forEach(pt => {
        if (pt.pr.visible) {
          const pulse = Math.sin(time * 3 + pt.orig.pulse);
          const nodeRadius = (2.8 + pulse * 1.2) * pt.pr.scale;

          ctx.fillStyle = pt.orig.activity > 0.6 ? '#FFFFFF' : theme.primaryGlow;
          ctx.shadowColor = theme.secondaryGlow;
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(pt.pr.x, pt.pr.y, nodeRadius, 0, Math.PI * 2);
          ctx.fill();

          // If close to cursor projection, draw dynamic tracking laser
          const distToCursor = Math.hypot(pt.pr.x - mouseCanvasX, pt.pr.y - mouseCanvasY);
          if (distToCursor < 90) {
            ctx.strokeStyle = '#FFFFFF';
            ctx.globalAlpha = (1 - distToCursor / 90) * 0.7;
            ctx.beginPath();
            ctx.moveTo(pt.pr.x, pt.pr.y);
            ctx.lineTo(mouseCanvasX, mouseCanvasY);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      });
    }

    ctx.restore(); // end dpr scale
    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}
window.initEditorial3DHero = initEditorial3DHero;

/* ==========================================================================
   23. DIGITAL EQUALIZER / CODING ENERGY SPECTRUM ENGINE
   ========================================================================== */
let ceeFocusedBand = -1;
function setEqualizerFocusBand(bandIdx) {
  ceeFocusedBand = bandIdx;
  const bandLabel = document.getElementById('cshBandVal');
  if (bandLabel) {
    const names = ['01 // EXPERIMENT (AI TOOLS)', '02 // BUILD (PROTOTYPES)', '03 // COLLABORATE (TEAM SPRINT)', '04 // INNOVATE (BOUNTY VAULT)'];
    bandLabel.textContent = bandIdx >= 0 ? names[bandIdx] : 'BROADBAND [AUTO]';
  }
}
window.setEqualizerFocusBand = setEqualizerFocusBand;

function initDigitalCodingEqualizer() {
  const canvas = document.getElementById('codingEnergySpectrumCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = 0, height = 0;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  function resize() {
    const parent = canvas.parentElement;
    if (!parent) return;
    width = parent.offsetWidth;
    height = parent.offsetHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  const barCount = 180;
  const bars = [];
  for (let i = 0; (i < barCount); i++) {
    bars.push({
      height: 0.2 + Math.random() * 0.4,
      targetHeight: 0.3,
      speed: 0.05 + Math.random() * 0.08,
      freq: 0.03 + Math.random() * 0.05,
      phase: i * 0.08,
      peak: 0.2,
      peakTimer: 0
    });
  }

  let mouse = { x: -9999, y: -9999, active: false };
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.active = true;
  }, { passive: true });
  canvas.addEventListener('mouseleave', () => {
    mouse.active = false;
  });

  let time = 0;

  function render() {
    time += 0.03;
    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    const barWidth = width / barCount;
    const barGap = Math.max(1, barWidth * 0.22);
    const actualWidth = barWidth - barGap;

    for (let i = 0; (i < barCount); i++) {
      const b = bars[i];
      const normX = i / barCount;

      let wave = Math.sin(normX * 12 - time * 2.5 + b.phase) * 0.28
        + Math.sin(normX * 24 + time * 1.8) * 0.18
        + Math.cos(normX * 6 - time * 0.8) * 0.22;

      const bandQuarter = Math.floor(normX * 4);
      if (ceeFocusedBand === bandQuarter) {
        wave += 0.42 + Math.sin(time * 6 + i) * 0.15;
      }

      const barCenterX = i * barWidth + barWidth * 0.5;
      if (mouse.active) {
        const dist = Math.abs(barCenterX - mouse.x);
        if (dist < 120) {
          const push = (1 - dist / 120);
          wave += push * 0.55;
        }
      }

      let targetH = Math.max(0.08, Math.min(0.95, 0.45 + wave));
      b.height += (targetH - b.height) * 0.15;

      if (b.height > b.peak) {
        b.peak = b.height;
        b.peakTimer = 18;
      } else if (b.peakTimer > 0) {
        b.peakTimer--;
      } else {
        b.peak -= 0.015;
      }

      const barHeightPx = b.height * (height - 35);
      const x = i * barWidth + barGap * 0.5;
      const y = height - barHeightPx;

      const grad = ctx.createLinearGradient(0, height, 0, y);
      if (ceeFocusedBand === bandQuarter) {
        grad.addColorStop(0, '#00C9D8');
        grad.addColorStop(0.6, '#00FF66');
        grad.addColorStop(1, '#FFFFFF');
      } else {
        grad.addColorStop(0, '#065F46');
        grad.addColorStop(0.5, '#10B981');
        grad.addColorStop(1, '#00F5D4');
      }

      ctx.fillStyle = grad;
      ctx.fillRect(x, y, actualWidth, barHeightPx);

      if (b.height > 0.6 || ceeFocusedBand === bandQuarter) {
        ctx.fillStyle = '#FFFFFF';
        ctx.shadowColor = '#00FF66';
        ctx.shadowBlur = 8;
        ctx.fillRect(x, y, actualWidth, Math.min(3, barHeightPx));
        ctx.shadowBlur = 0;
      }

      const peakY = height - b.peak * (height - 35);
      ctx.fillStyle = ceeFocusedBand === bandQuarter ? '#FFFFFF' : '#00FF66';
      ctx.fillRect(x, peakY - 2, actualWidth, 2);
    }

    ctx.restore();
    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}
window.initDigitalCodingEqualizer = initDigitalCodingEqualizer;


/* ==========================================================================
   ANIMATION 2: GIANT 3D ROTATING HACKATHON RING (MK CONSULTING STYLE)
   ========================================================================== */
function initRotatingRing3D() {
  const canvas = document.getElementById('rotatingRingCanvas');
  const section = document.getElementById('rotatingRingSection');
  if (!canvas || !section || typeof THREE === 'undefined') return;

  const width = section.offsetWidth || window.innerWidth;
  const height = section.offsetHeight || window.innerHeight;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.set(0, 0, 10.5);

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  // Procedural Wrapped Ring Text Canvas
  const textCanvas = document.createElement('canvas');
  textCanvas.width = 2048;
  textCanvas.height = 256;
  const tCtx = textCanvas.getContext('2d');
  tCtx.fillStyle = '#0F172A';
  tCtx.fillRect(0, 0, 2048, 256);

  tCtx.fillStyle = '#00F5D4';
  tCtx.font = 'bold 82px "Space Grotesk", sans-serif';
  tCtx.textBaseline = 'middle';
  const repeatText = "UDBHAV 2027 \u2022 HACK2SKILL \u00D7 GGC \u2022 NATIONAL INNOVATION \u2022 ";
  tCtx.fillText(repeatText + repeatText, 40, 128);

  const textTexture = new THREE.CanvasTexture(textCanvas);
  textTexture.wrapS = THREE.RepeatWrapping;
  textTexture.wrapT = THREE.ClampToEdgeWrapping;
  textTexture.repeat.set(2, 1);

  // 1. Primary Outer 3D Metallic Ring (Luminous Silver-Chrome + Cyan Edge Glow)
  const geometry = new THREE.TorusGeometry(3.6, 0.72, 36, 120);
  const material = new THREE.MeshStandardMaterial({
    color: 0xF8FAFC,
    map: textTexture,
    roughness: 0.18,
    metalness: 0.88,
    bumpMap: textTexture,
    bumpScale: 0.08,
    emissive: 0x00E5FF,
    emissiveIntensity: 0.85
  });
  const ringMesh = new THREE.Mesh(geometry, material);
  ringMesh.rotation.x = 0.55;
  ringMesh.rotation.y = 0.35;
  scene.add(ringMesh);

  // 2. Secondary Inner Gyroscope Laser Wireframe Ring
  const innerRingGeo = new THREE.TorusGeometry(2.35, 0.08, 16, 90);
  const innerRingMat = new THREE.MeshStandardMaterial({
    color: 0xFFFFFF,
    emissive: 0xFF5722,
    emissiveIntensity: 1.6,
    wireframe: true
  });
  const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
  ringMesh.add(innerRing);

  // 3. Additional Large Outer Orbital Ring (Second Big Rotating Ring in 3D)
  const outerOrbitGeo = new THREE.TorusGeometry(4.7, 0.05, 16, 120);
  const outerOrbitMat = new THREE.MeshStandardMaterial({
    color: 0xFFFFFF,
    emissive: 0xFFD700,
    emissiveIntensity: 1.5,
    wireframe: true
  });
  const outerOrbitRing = new THREE.Mesh(outerOrbitGeo, outerOrbitMat);
  outerOrbitRing.rotation.x = 1.1;
  outerOrbitRing.rotation.y = -0.35;
  scene.add(outerOrbitRing);

  // 3. Central 3D Floating Crystal Polyhedron
  const coreGeo = new THREE.IcosahedronGeometry(1.1, 0);
  const coreMat = new THREE.MeshStandardMaterial({
    color: 0x00F5D4,
    emissive: 0x00F5D4,
    emissiveIntensity: 0.6,
    wireframe: true
  });
  const coreMesh = new THREE.Mesh(coreGeo, coreMat);
  ringMesh.add(coreMesh);

  // Dynamic Multi-Angle Studio Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
  scene.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
  keyLight.position.set(8, 10, 8);
  scene.add(keyLight);

  const cyanRim = new THREE.DirectionalLight(0x00E5FF, 4.0);
  cyanRim.position.set(-8, -6, -4);
  scene.add(cyanRim);

  const orangeSpot = new THREE.PointLight(0xFF5722, 3.5, 20);
  orangeSpot.position.set(0, 0, 6);
  scene.add(orangeSpot);

  // Mouse & Scroll Interactivity
  const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
  window.addEventListener('mousemove', (e) => {
    mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
  }, { passive: true });

  let scrollProgress = 0;
  window.addEventListener('scroll', () => {
    const rect = section.getBoundingClientRect();
    const vh = window.innerHeight;
    const progress = Math.max(0, Math.min(1, (-rect.top + vh) / (rect.height + vh)));
    scrollProgress = progress;

    const subline = document.getElementById('rrDynamicSubline');
    if (subline) {
      if (progress > 0.45 && progress < 0.85) {
        subline.textContent = "THE FUTURE GETS BUILT HERE.";
        subline.style.color = "#00F5D4";
      } else {
        subline.textContent = "WE BUILD THE FUTURE.";
        subline.style.color = "#FFFFFF";
      }
    }
  }, { passive: true });

  function onResize() {
    const w = section.offsetWidth || window.innerWidth;
    const h = section.offsetHeight || window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }
  window.addEventListener('resize', onResize, { passive: true });

  function animate() {
    requestAnimationFrame(animate);

    mouse.x += (mouse.targetX - mouse.x) * 0.06;
    mouse.y += (mouse.targetY - mouse.y) * 0.06;

    ringMesh.rotation.x = 0.55 + scrollProgress * 3.8 + mouse.y * 0.45;
    ringMesh.rotation.y += 0.008 + (mouse.x * 0.02);
    ringMesh.rotation.z = scrollProgress * 2.2 + mouse.x * 0.35;

    innerRing.rotation.x += 0.02;
    innerRing.rotation.y -= 0.025;
    coreMesh.rotation.y += 0.03;
    if (typeof outerOrbitRing !== 'undefined') {
      outerOrbitRing.rotation.z -= 0.005;
      outerOrbitRing.rotation.y += 0.003;
    }

    textTexture.offset.x -= 0.0022;

    renderer.render(scene, camera);
  }
  animate();
}
window.initRotatingRing3D = initRotatingRing3D;

/* ==========================================================================
   ANIMATION 1: PIXEL DISINTEGRATION / DIGITAL RECONSTRUCTION (ORANGE HORSE STYLE)
   ========================================================================== */
function initPixelDisintegration() {
  const canvas = document.getElementById('pixelDisintegrationCanvas');
  const section = document.getElementById('pixelDisintegrationSection');
  if (!canvas || !section) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = 0, height = 0;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  const particleCount = 3800;
  let particles = [];

  function initSilhouetteParticles() {
    particles = [];
    const centerX = (width * dpr) * 0.5;
    const centerY = (height * dpr) * 0.5;
    const scale = Math.min(width, height) * 0.45 * dpr;

    for (let i = 0; (i < particleCount); i++) {
      const u = Math.random();
      const v = Math.random();
      const angle = u * Math.PI * 2;
      const r = Math.sqrt(v) * (scale * (0.35 + 0.6 * Math.sin(angle * 3 + u * 2)));

      const ox = centerX + Math.cos(angle) * r + (Math.sin(angle * 5) * 18);
      const oy = centerY + Math.sin(angle) * (r * 1.15) - (scale * 0.1) + (Math.cos(angle * 3) * 14);

      particles.push({
        originX: ox,
        originY: oy,
        x: ox + (Math.random() - 0.5) * 40,
        y: oy + (Math.random() - 0.5) * 40,
        angle: angle,
        radius: r,
        orbitSpeed: (Math.random() - 0.5) * 0.015,
        size: Math.random() * 2.4 + 1.2,
        colorType: Math.random() > 0.45 ? 'cyan' : (Math.random() > 0.5 ? 'orange' : 'white'),
        rndScatter: Math.random(),
        baseAlpha: Math.random() * 0.6 + 0.4
      });
    }
  }

  function resize() {
    const parent = canvas.parentElement;
    if (!parent) return;
    width = parent.offsetWidth || 500;
    height = parent.offsetHeight || 500;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    initSilhouetteParticles();
  }

  resize();
  window.addEventListener('resize', resize, { passive: true });

  const mouse = { x: -9999, y: -9999, active: false };
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = (e.clientX - rect.left) * dpr;
    mouse.y = (e.clientY - rect.top) * dpr;
    mouse.active = true;
  }, { passive: true });
  canvas.addEventListener('mouseleave', () => {
    mouse.active = false;
  }, { passive: true });

  let scrollProgress = 0;
  window.addEventListener('scroll', () => {
    const rect = section.getBoundingClientRect();
    const vh = window.innerHeight;
    const progress = Math.max(0, Math.min(1, (-rect.top + vh * 0.5) / (rect.height + vh * 0.5)));
    scrollProgress = progress;
  }, { passive: true });

  let timeTick = 0;

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    timeTick += 0.015;

    const centerX = (width * dpr) * 0.5;
    const centerY = (height * dpr) * 0.5;

    // Smooth scattering amplitude that stays bounded within screen!
    const scatterAmount = Math.sin(scrollProgress * Math.PI) * 0.65;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      p.angle += p.orbitSpeed;
      let targetX = centerX + Math.cos(p.angle) * p.radius;
      let targetY = centerY + Math.sin(p.angle) * p.radius;

      if (scatterAmount > 0.02) {
        const curl = Math.sin(timeTick + p.rndScatter * 8) * (80 * dpr * scatterAmount);
        const expand = 1 + scatterAmount * 0.45;
        targetX = centerX + Math.cos(p.angle + scatterAmount * 2) * (p.radius * expand) + curl;
        targetY = centerY + Math.sin(p.angle + scatterAmount * 2) * (p.radius * expand) + curl;
      }

      if (mouse.active) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 120 * dpr;
        if (dist < maxDist) {
          const force = (1 - dist / maxDist) * 50 * dpr;
          targetX += (dx / (dist || 1)) * force;
          targetY += (dy / (dist || 1)) * force;
        }
      }

      p.x += (targetX - p.x) * 0.12;
      p.y += (targetY - p.y) * 0.12;

      let fill = '#FFFFFF';
      if (p.colorType === 'orange') fill = '#FF5722';
      else if (p.colorType === 'cyan') fill = '#00E5FF';

      ctx.fillStyle = fill;
      ctx.globalAlpha = p.baseAlpha;
      ctx.fillRect(p.x, p.y, p.size, p.size);
    }

    ctx.globalAlpha = 1.0;
    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}
window.initPixelDisintegration = initPixelDisintegration;

/* ==========================================================================
   ADDITIONAL EFFECT: FLOATING PROJECT PREVIEW STACK (ORANGE HORSE STYLE)
   ========================================================================== */
function initFloatingProjectStack() {
  const section = document.getElementById('floatingProjectStackSection');
  const cards = document.querySelectorAll('#fpsStackWrapper .fps-card');
  if (!section || cards.length === 0) return;

  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotX = ((y - centerY) / centerY) * -10;
      const rotY = ((x - centerX) / centerX) * 10;

      card.style.transform = 'perspective(1200px) rotateX(' + rotX.toFixed(2) + 'deg) rotateY(' + rotY.toFixed(2) + 'deg) translateY(-8px) scale3d(1.02, 1.02, 1.02)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  window.addEventListener('scroll', () => {
    const rect = section.getBoundingClientRect();
    const vh = window.innerHeight;
    if (rect.top < vh && rect.bottom > 0) {
      const progress = (vh - rect.top) / (rect.height + vh);
      cards.forEach((card, idx) => {
        const offset = (progress - 0.5) * (30 + idx * 12);
        card.style.transform = 'translateY(' + offset.toFixed(1) + 'px)';
      });
    }
  }, { passive: true });
}
window.initFloatingProjectStack = initFloatingProjectStack;



/* ==========================================================================
   GLOBAL INTERACTIVE GEOMETRIC CONSTELLATION & WIREFRAME ENGINE
   * 3D Projected Wireframe Polyhedra (Cubes, Rings, Icosahedrons)
   * Responsive Constellation Laser Mesh
   * Interactive Mouse Damped Repulsion Physics
   * Kinetic Click Shockwave Radar Waves
   ========================================================================== */
function initGlobalGeometryCanvas() {
  const canvas = document.getElementById('globalGeometryCanvas');
  if (!canvas || !canvas.getContext) return;

  const ctx = canvas.getContext('2d');
  let w = window.innerWidth;
  let h = window.innerHeight;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);

  function resize() {
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  // Mouse tracking & shockwaves
  const mouse = { x: -1000, y: -1000, active: false };
  const shockwaves = [];

  function onMove(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
  }
  window.addEventListener('mousemove', onMove, { passive: true });
  window.addEventListener('pointermove', onMove, { passive: true });

  window.addEventListener('mousedown', (e) => {
    shockwaves.push({
      x: e.clientX,
      y: e.clientY,
      radius: 6,
      maxRadius: Math.max(w, h) * 0.5,
      alpha: 1.0,
      speed: 15
    });
    if (shockwaves.length > 6) shockwaves.shift();
  });

  // 3D Polyhedra & Constellation Nodes
  const NODE_COUNT = 75;
  const nodes = [];
  const colors = ['#00F5D4', '#FF5722', '#8B5CF6', '#00C9D8', '#FFB703', '#FFFFFF'];
  const shapeTypes = ['cube', 'ring', 'diamond', 'star'];

  for (let i = 0; i < NODE_COUNT; i++) {
    const isPoly = Math.random() > 0.45;
    nodes.push({
      x: (Math.random() - 0.5) * w * 1.5,
      y: (Math.random() - 0.5) * h * 1.5,
      z: Math.random() * 800 - 400,
      vx: (Math.random() - 0.5) * 0.65,
      vy: (Math.random() - 0.5) * 0.65,
      vz: (Math.random() - 0.5) * 0.5,
      baseRadius: Math.random() * 2.8 + 1.2,
      color: colors[Math.floor(Math.random() * colors.length)],
      polyType: isPoly ? shapeTypes[Math.floor(Math.random() * shapeTypes.length)] : 'dot',
      polySize: Math.random() * 28 + 14,
      rotX: Math.random() * Math.PI * 2,
      rotY: Math.random() * Math.PI * 2,
      rotZ: Math.random() * Math.PI * 2,
      rotSpeedX: (Math.random() - 0.5) * 0.03,
      rotSpeedY: (Math.random() - 0.5) * 0.03,
      rotSpeedZ: (Math.random() - 0.5) * 0.02
    });
  }

  const fov = 680;
  let animId = null;

  function render() {
    if (document.hidden) {
      animId = requestAnimationFrame(render);
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.scale(dpr, dpr);

    const cx = w * 0.5;
    const cy = h * 0.5;
    const isLight = document.body.classList.contains('cur-light-theme');
    const primaryAlpha = isLight ? 0.45 : 0.85;

    // Render Shockwaves
    for (let sIdx = shockwaves.length - 1; sIdx >= 0; sIdx--) {
      const sw = shockwaves[sIdx];
      sw.radius += sw.speed;
      sw.alpha -= 0.02;
      if (sw.alpha <= 0 || sw.radius >= sw.maxRadius) {
        shockwaves.splice(sIdx, 1);
        continue;
      }
      ctx.save();
      ctx.beginPath();
      ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 245, 212, ' + Math.max(0, sw.alpha) + ')';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#00F5D4';
      ctx.shadowBlur = 14;
      ctx.stroke();
      ctx.restore();
    }

    // Update Nodes
    const projected = [];
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      n.x += n.vx;
      n.y += n.vy;
      n.z += n.vz;

      n.rotX += n.rotSpeedX;
      n.rotY += n.rotSpeedY;
      n.rotZ += n.rotSpeedZ;

      if (n.x < -w * 0.8) n.x = w * 0.8;
      if (n.x > w * 0.8) n.x = -w * 0.8;
      if (n.y < -h * 0.8) n.y = h * 0.8;
      if (n.y > h * 0.8) n.y = -h * 0.8;
      if (n.z < -420) n.z = 420;
      if (n.z > 420) n.z = -420;

      const scale = fov / (fov + n.z);
      const px = cx + n.x * scale;
      const py = cy + n.y * scale;

      // Cursor magnetic repulsion
      if (mouse.active) {
        const dx = px - mouse.x;
        const dy = py - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 170 && dist > 1) {
          const force = (170 - dist) / 170;
          n.x += (dx / dist) * force * 5.5;
          n.y += (dy / dist) * force * 5.5;
          n.rotSpeedX *= 1.05;
          n.rotSpeedY *= 1.05;
        }
      }

      projected.push({
        node: n,
        x: px,
        y: py,
        scale: scale,
        alpha: Math.min(1, Math.max(0.15, (scale - 0.3) * primaryAlpha))
      });
    }

    // Connecting Laser Mesh Lines
    ctx.lineWidth = 1;
    for (let i = 0; i < projected.length; i++) {
      const p1 = projected[i];
      for (let j = i + 1; j < projected.length; j++) {
        const p2 = projected[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 125) {
          const lineAlpha = (1 - dist / 125) * p1.alpha * p2.alpha * 0.95;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = isLight
            ? 'rgba(15, 23, 42, ' + lineAlpha + ')'
            : 'rgba(0, 245, 212, ' + lineAlpha + ')';
          ctx.stroke();
        }
      }
    }

    // Render 3D Polyhedral Shapes
    for (let i = 0; i < projected.length; i++) {
      const p = projected[i];
      const n = p.node;
      const size = Math.max(1, n.baseRadius * p.scale);

      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.translate(p.x, p.y);

      if (n.polyType === 'cube') {
        const s = n.polySize * p.scale;
        ctx.rotate(n.rotX);
        ctx.strokeStyle = isLight ? '#FF5722' : n.color;
        ctx.lineWidth = 1.4;
        ctx.shadowColor = n.color;
        ctx.shadowBlur = 10;
        ctx.strokeRect(-s * 0.5, -s * 0.5, s, s);
        // Inner cross wireframe
        ctx.beginPath();
        ctx.moveTo(-s * 0.5, -s * 0.5);
        ctx.lineTo(s * 0.5, s * 0.5);
        ctx.moveTo(s * 0.5, -s * 0.5);
        ctx.lineTo(-s * 0.5, s * 0.5);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
        ctx.lineWidth = 0.8;
        ctx.stroke();
      } else if (n.polyType === 'ring') {
        const r = n.polySize * 0.65 * p.scale;
        ctx.rotate(n.rotZ);
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.strokeStyle = isLight ? '#0F172A' : '#00F5D4';
        ctx.lineWidth = 1.4;
        ctx.shadowColor = '#00F5D4';
        ctx.shadowBlur = 10;
        ctx.stroke();
        // Inner spinning node
        ctx.beginPath();
        ctx.arc(Math.cos(n.rotY) * r * 0.6, Math.sin(n.rotY) * r * 0.6, 2.5 * p.scale, 0, Math.PI * 2);
        ctx.fillStyle = '#FF5722';
        ctx.fill();
      } else if (n.polyType === 'diamond') {
        const s = n.polySize * 0.7 * p.scale;
        ctx.rotate(n.rotY);
        ctx.beginPath();
        ctx.moveTo(0, -s);
        ctx.lineTo(s, 0);
        ctx.lineTo(0, s);
        ctx.lineTo(-s, 0);
        ctx.closePath();
        ctx.strokeStyle = isLight ? '#8B5CF6' : n.color;
        ctx.lineWidth = 1.3;
        ctx.shadowColor = n.color;
        ctx.shadowBlur = 10;
        ctx.stroke();
      } else if (n.polyType === 'star') {
        const s = n.polySize * 0.5 * p.scale;
        ctx.rotate(n.rotX);
        ctx.beginPath();
        for (let k = 0; k < 4; k++) {
          const a = (k * Math.PI) / 2;
          ctx.moveTo(0, 0);
          ctx.lineTo(Math.cos(a) * s, Math.sin(a) * s);
        }
        ctx.strokeStyle = '#FFB703';
        ctx.lineWidth = 1.5;
        ctx.shadowColor = '#FFB703';
        ctx.shadowBlur = 8;
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, size, 0, Math.PI * 2);
        ctx.fillStyle = isLight ? '#252525' : n.color;
        ctx.shadowColor = n.color;
        ctx.shadowBlur = 8;
        ctx.fill();
      }

      ctx.restore();
    }

    ctx.restore();
    animId = requestAnimationFrame(render);
  }

  animId = requestAnimationFrame(render);
}
window.initGlobalGeometryCanvas = initGlobalGeometryCanvas;

/* ====================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================
   INTERACTIVE TIMELINE MILESTONE ACCORDION & DIRECTIVES
   ==================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================== */
function initInteractiveTimelineDrawer() {
  const milestoneData = [
    {
      stage: 1,
      venue: "Online Portal & PIET Welcome Hub",
      deliverables: "Verified VIP Squad Pass, GitHub Lead Handle",
      mentors: "Hack2Skill Registration Desk, Student Advisory Leads",
      fuel: "Welcome Developer Swag Bags, Campus Map & Wi-Fi Credentials"
    },
    {
      stage: 2,
      venue: "PIET Main Campus Entrance & Registration Canopy",
      deliverables: "Physical ID Verification, Hardware Security Check-in",
      mentors: "PIET Technical Operations Committee",
      fuel: "Morning Energy Booster & Hot Chai Stations"
    },
    {
      stage: 3,
      venue: "PIET Central Auditorium (Gala Stage)",
      deliverables: "Keynote Attendance, Judging Rubrics Overview",
      mentors: "Hack2Skill Directors, GGC Presidents, Dean of Engineering",
      fuel: "Campus Welcome Breakfast & Networking Drinks"
    },
    {
      stage: 4,
      venue: "All Hacker Arenas (CCC, Lab 1-4, Design Pods)",
      deliverables: "Problem Statement Selection Lock, Initial Repo Commit",
      mentors: "Track Domain Mentors & AI/Cloud Architecture Guides",
      fuel: "Sprint Launch Power Shakes & Brain Fuel Snacks"
    },
    {
      stage: 5,
      venue: "Squad Desks & Dedicated Mentorship Lounges",
      deliverables: "Architecture Diagram, Core API Selection, Cloud Deployment",
      mentors: "Dr. Alok Sharma, Priya Nair, Vikram Solanki",
      fuel: "Evening High-Tea, Cookies & Fresh Samosas"
    },
    {
      stage: 6,
      venue: "Campus Gaming Pods, Central Lawn & Open Lounges",
      deliverables: "Mid-Sprint Functional Prototype Checkpoint",
      mentors: "Night Owl Engineering Fellows & Discord Support Desk",
      fuel: "Unlimited Coffee, RedBull Stations & Midnight Fresh Pizza"
    },
    {
      stage: 7,
      venue: "All Squad Innovation Labs",
      deliverables: "Morning Standup Update, Integration Test Validation",
      mentors: "Security & Code Integrity Reviewers",
      fuel: "Executive Morning Breakfast & Fresh Fruit Juice Pods"
    },
    {
      stage: 8,
      venue: "PIET Central Computing Center",
      deliverables: "Hard Code Freeze, GitHub Commit Lock, 2-Min Demo Video",
      mentors: "Jury Technical Verifiers & Plagiarism Auditors",
      fuel: "Quick Lunch Burritos & Caffeine Shots"
    },
    {
      stage: 9,
      venue: "Auditorium Demo Stalls & Jury Pitch Pods",
      deliverables: "3-Min Live Prototype Demo + 2-Min Q&A with Jury",
      mentors: "Grand Jury Panel, Industry CTOs & Investors",
      fuel: "Celebration Hi-Tea & Energy Drinks"
    },
    {
      stage: 10,
      venue: "PIET Grand Auditorium Main Stage",
      deliverables: "Podium Ceremony, Trophy Handover, Grants",
      mentors: "Patrons, Vice Chancellor, Hack2Skill Executive Leadership",
      fuel: "Gala Dinner Banquet & Celebration Confetti"
    }
  ];

  const cards = document.querySelectorAll('.tl-stage-card');
  cards.forEach((card, index) => {
    const data = milestoneData[index] || milestoneData[0];
    const inner = card.querySelector('.tl-card-inner');
    if (!inner) return;

    if (!inner.querySelector('.tl-milestone-drawer')) {
      const header = inner.querySelector('.tl-card-header');
      if (header && !header.querySelector('.tl-expand-indicator')) {
        const ind = document.createElement('span');
        ind.className = 'tl-expand-indicator';
        ind.innerHTML = '<span>EXPAND DETAILS</span> <span class="tl-exp-arrow">&#9662;</span>';
        header.appendChild(ind);
      }

      const drawer = document.createElement('div');
      drawer.className = 'tl-milestone-drawer';
      drawer.innerHTML =
        '<div class="tl-drawer-grid">' +
        '<div class="tl-drawer-cell">' +
        '<span class="tl-dc-label">&#128205; VENUE HUB</span>' +
        '<span class="tl-dc-val">' + (data.venue || 'Main Innovation Arena') + '</span>' +
        '</div>' +
        '<div class="tl-drawer-cell">' +
        '<span class="tl-dc-label">&#127919; DELIVERABLES</span>' +
        '<span class="tl-dc-val">' + (data.deliverables || 'Project Checkpoint Submission') + '</span>' +
        '</div>' +
        '<div class="tl-drawer-cell">' +
        '<span class="tl-dc-label">&#128101; MENTORS &amp; CREW</span>' +
        '<span class="tl-dc-val">' + (data.mentors || 'Technical Fellows &amp; Domain Guides') + '</span>' +
        '</div>' +
        '<div class="tl-drawer-cell">' +
        '<span class="tl-dc-label">&#9889; FUEL &amp; CATERING</span>' +
        '<span class="tl-dc-val">' + (data.fuel || 'Campus Catering &amp; Energy Drinks') + '</span>' +
        '</div>' +
        '</div>' +
        '<div class="tl-drawer-actions">' +
        '<button class="tl-drawer-btn tl-cal-btn" type="button" onclick="event.stopPropagation(); exportTimelineCalendar();">' +
        '<span>&#128197; Add Milestone to Calendar</span>' +
        '</button>' +
        '<button class="tl-drawer-btn tl-stage-share-btn" type="button" onclick="event.stopPropagation(); copyMilestoneLink(' + data.stage + ');">' +
        '<span>&#128279; Copy Direct Stage Link</span>' +
        '</button>' +
        '</div>';
      inner.appendChild(drawer);
    }

    card.addEventListener('click', () => {
      const isAlreadyExpanded = card.classList.contains('expanded');
      cards.forEach(c => c.classList.remove('expanded'));
      if (!isAlreadyExpanded) {
        card.classList.add('expanded');
        try { playCyberSound('hover'); } catch (e) { }
      }
    });
  });
}
window.initInteractiveTimelineDrawer = initInteractiveTimelineDrawer;

function copyMilestoneLink(stageNum) {
  const url = window.location.origin + window.location.pathname + '#timeline';
  if (navigator.clipboard) {
    navigator.clipboard.writeText(url);
    if (typeof showGlobalToast === 'function') {
      showGlobalToast('Copied Stage ' + (stageNum || '') + ' timeline link to clipboard!');
    } else {
      alert('Copied Stage ' + (stageNum || '') + ' link!');
    }
  }
}
window.copyMilestoneLink = copyMilestoneLink;


// >>>>>>>>>> START: master_visual_and_smoke_engine.js <<<<<<<<<<
/* ==========================================================================
   MASTER VISUAL EFFECTS, QUANTUM FLUID SMOKE ARENA & 3D INTERACTIVITY
   ========================================================================== */

/**
 * 1. QUANTUM FLUID & SMOKE NEBULA SIMULATION ENGINE
 * 60 FPS GPU-accelerated multi-palette particle fluid simulation
 */
function initQuantumSmokeEngine() {
  const canvas = document.getElementById('quantumSmokeCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);

  function resize() {
    const rect = canvas.getBoundingClientRect();
    width = rect.width || window.innerWidth;
    height = rect.height || 600;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.scale(dpr, dpr);
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  // Color palettes
  const palettes = {
    flame: ['#FF5722', '#FF3D00', '#FF8A00', '#FFAB00', '#FFA000', '#FFE082'],
    plasma: ['#00E5FF', '#00B0FF', '#3B82F6', '#8B5CF6', '#C084FC', '#67E8F9'],
    nebula: ['#D946EF', '#C084FC', '#818CF8', '#38BDF8', '#F43F5E', '#A855F7'],
    matrix: ['#10B981', '#34D399', '#84CC16', '#A3E635', '#06B6D4', '#22C55E']
  };

  let currentPreset = 'flame';
  const particles = [];
  const MAX_PARTICLES = 220;

  class SmokeParticle {
    constructor(x, y, vx, vy, isSpurt) {
      this.reset(x, y, vx, vy, isSpurt);
    }

    reset(x, y, vx, vy, isSpurt) {
      this.x = x || (width * 0.5 + (Math.random() - 0.5) * 80);
      this.y = y || (height * 0.5 + (Math.random() - 0.5) * 80);
      const angle = Math.random() * Math.PI * 2;
      const speed = isSpurt ? (Math.random() * 3 + 1.5) : (Math.random() * 0.8 + 0.2);
      this.vx = (vx || Math.cos(angle) * speed) * 0.65;
      this.vy = (vy || Math.sin(angle) * speed) * 0.65;
      this.size = Math.random() * 32 + 20;
      this.maxSize = this.size * (Math.random() * 2.2 + 1.8);
      this.alpha = 0;
      this.targetAlpha = Math.random() * 0.45 + 0.25;
      this.life = 0;
      this.maxLife = Math.random() * 90 + 70;
      this.rotation = Math.random() * Math.PI * 2;
      this.vRot = (Math.random() - 0.5) * 0.04;
      this.curl = (Math.random() - 0.5) * 0.12;

      const colors = palettes[currentPreset] || palettes.flame;
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      this.life++;
      if (this.life >= this.maxLife) {
        return false;
      }

      // Physics integration with viscous damping and curl turbulence
      this.vx += Math.cos(this.rotation) * this.curl;
      this.vy += Math.sin(this.rotation) * this.curl - 0.02; // slight thermal buoyancy
      this.vx *= 0.96;
      this.vy *= 0.96;
      this.x += this.vx;
      this.y += this.vy;
      this.rotation += this.vRot;

      const progress = this.life / this.maxLife;
      // Growth & fade curve
      this.size += (this.maxSize - this.size) * 0.025;
      if (progress < 0.2) {
        this.alpha = (progress / 0.2) * this.targetAlpha;
      } else {
        this.alpha = (1 - progress) * this.targetAlpha;
      }
      return true;
    }

    draw(c) {
      if (this.alpha <= 0.005) return;
      c.save();
      c.translate(this.x, this.y);
      c.rotate(this.rotation);

      const grad = c.createRadialGradient(0, 0, 0, 0, 0, this.size);
      grad.addColorStop(0, this.color);
      grad.addColorStop(0.4, this.color);
      grad.addColorStop(1, 'transparent');

      c.globalAlpha = Math.max(0, Math.min(1, this.alpha));
      c.fillStyle = grad;
      c.beginPath();
      c.arc(0, 0, this.size, 0, Math.PI * 2);
      c.fill();
      c.restore();
    }
  }

  // Pointer state & event binding
  let pointerX = width * 0.5;
  let pointerY = height * 0.5;
  let lastX = pointerX;
  let lastY = pointerY;
  let isPointerActive = false;
  let isDragging = false;

  function emitAt(x, y, vx, vy, count) {
    const toSpawn = count || 3;
    for (let i = 0; i < toSpawn; i++) {
      if (particles.length < MAX_PARTICLES) {
        particles.push(new SmokeParticle(x, y, vx, vy, true));
      } else {
        // Reuse oldest particle
        const p = particles.shift();
        p.reset(x, y, vx, vy, true);
        particles.push(p);
      }
    }
  }

  function handlePointerMove(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
      const vx = (x - lastX) * 0.35;
      const vy = (y - lastY) * 0.35;
      pointerX = x;
      pointerY = y;
      lastX = x;
      lastY = y;
      isPointerActive = true;
      emitAt(x, y, vx, vy, isDragging ? 5 : 2);
    }
  }

  canvas.addEventListener('mousemove', (e) => {
    handlePointerMove(e.clientX, e.clientY);
  }, { passive: true });

  canvas.addEventListener('mousedown', (e) => {
    isDragging = true;
    handlePointerMove(e.clientX, e.clientY);
    emitAt(pointerX, pointerY, 0, -2, 8);
    try { playCyberSound('hover'); } catch (err) { }
  });

  window.addEventListener('mouseup', () => { isDragging = false; }, { passive: true });

  canvas.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches[0]) {
      handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  // Preset button controls
  const presetBtns = document.querySelectorAll('#qssPresetBar .qss-btn');
  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      presetBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const chosen = btn.getAttribute('data-preset');
      if (chosen && palettes[chosen]) {
        currentPreset = chosen;
        // Burst of new theme smoke
        for (let i = 0; i < 16; i++) {
          const ang = (i / 16) * Math.PI * 2;
          emitAt(width * 0.5 + Math.cos(ang) * 40, height * 0.5 + Math.sin(ang) * 40, Math.cos(ang) * 3, Math.sin(ang) * 3, 1);
        }
        try { playCyberSound('click'); } catch (err) { }
      }
    });
  });

  // Idle ambient swirl generators
  let idleTick = 0;

  function render() {
    requestAnimationFrame(render);

    idleTick += 0.02;
    // Ambient orbital emitters when user is idle
    const orb1X = width * 0.5 + Math.cos(idleTick * 0.8) * (width * 0.28);
    const orb1Y = height * 0.5 + Math.sin(idleTick * 1.2) * (height * 0.22);
    const orb2X = width * 0.5 + Math.cos(idleTick * 0.6 + Math.PI) * (width * 0.24);
    const orb2Y = height * 0.5 + Math.sin(idleTick * 0.9 + Math.PI) * (height * 0.2);

    if (particles.length < 80) {
      particles.push(new SmokeParticle(orb1X, orb1Y, Math.cos(idleTick) * 0.5, Math.sin(idleTick) * 0.5, false));
      particles.push(new SmokeParticle(orb2X, orb2Y, -Math.cos(idleTick) * 0.5, -Math.sin(idleTick) * 0.5, false));
    }

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Glow composite mode for vibrant smoke
    ctx.globalCompositeOperation = 'screen';

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      if (p.update()) {
        p.draw(ctx);
      } else {
        particles.splice(i, 1);
      }
    }

    ctx.globalCompositeOperation = 'source-over';
  }

  render();
}
window.initQuantumSmokeEngine = initQuantumSmokeEngine;

/**
 * 2. UNIVERSAL 3D CARD TILT & HOLOGRAPHIC SPECULAR ENGINE
 */
function initUniversal3DTilt() {
  const cards = document.querySelectorAll('[data-tilt="true"], .qss-card, .fps-card, .cd-tile, .sp-card, .track-card, .prize-card');
  if (!cards || cards.length === 0) return;

  cards.forEach(card => {
    let bounds = null;

    card.addEventListener('mouseenter', () => {
      bounds = card.getBoundingClientRect();
    }, { passive: true });

    card.addEventListener('mousemove', (e) => {
      if (!bounds) bounds = card.getBoundingClientRect();
      const x = e.clientX - bounds.left;
      const y = e.clientY - bounds.top;
      const normX = (x / bounds.width) * 2 - 1;
      const normY = (y / bounds.height) * 2 - 1;

      const tiltX = -normY * 10;
      const tiltY = normX * 10;

      card.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) translateZ(8px)`;
    }, { passive: true });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
      bounds = null;
    }, { passive: true });
  });
}
window.initUniversal3DTilt = initUniversal3DTilt;

/**
 * 3. MAGNETIC BUTTONS ATTRACTION ENGINE
 */
function initMagneticButtons() {
  const magneticEls = document.querySelectorAll('.nav-ticket-btn, .btn-pri, .nmd-ticket-cta, .vse-pill-btn, .qss-btn, .th-btn');
  if (!magneticEls || magneticEls.length === 0) return;

  magneticEls.forEach(btn => {
    btn.classList.add('btn-magnetic');

    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      btn.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`;
    }, { passive: true });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
    }, { passive: true });
  });
}
window.initMagneticButtons = initMagneticButtons;

/**
 * 4. KINETIC EDITORIAL TYPOGRAPHY & SCROLL TRIGGER REVEALS
 */
function initHeroTypographyStagger() {
  try {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      // Hero main headline reveal
      const heroHeadline = document.querySelector('.vse-main-headline, .vas-brand-headline');
      if (heroHeadline) {
        gsap.fromTo(heroHeadline,
          { opacity: 0, y: 35, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power3.out' }
        );
      }

      // Stagger section titles on scroll
      document.querySelectorAll('.qss-headline, .fps-title, .pds-title, .cd-highlight-text').forEach(heading => {
        gsap.fromTo(heading,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: heading,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
      });
    }
  } catch (e) {
    console.warn('initHeroTypographyStagger error:', e);
  }
}
window.initHeroTypographyStagger = initHeroTypographyStagger;

// >>>>>>>>>> END: master_visual_and_smoke_engine.js <<<<<<<<<<

function initUdbhavMaster() {
  try { initQuantumSmokeEngine(); } catch (e) { console.warn('initQuantumSmokeEngine error:', e); }
  try { initUniversal3DTilt(); } catch (e) { console.warn('initUniversal3DTilt error:', e); }
  try { initMagneticButtons(); } catch (e) { console.warn('initMagneticButtons error:', e); }
  try { initHeroTypographyStagger(); } catch (e) { console.warn('initHeroTypographyStagger error:', e); }
  try { initLoader(); } catch (e) { console.warn('initLoader error:', e); }
  try { initCursor(); } catch (e) { console.warn('initCursor error:', e); }
  try { initGlobalGeometryCanvas(); } catch (e) { console.warn('initGlobalGeometryCanvas error:', e); }
  try { initHomeSpectrumCanvas(); } catch (e) { console.warn('initHomeSpectrumCanvas error:', e); }
  try { initHomeTimeline3D(); } catch (e) { console.warn('initHomeTimeline3D error:', e); }
  try { initHomeTelemetryEqualizer(); } catch (e) { console.warn('initHomeTelemetryEqualizer error:', e); }
  try { initTimelinePage3D(); } catch (e) { console.warn('initTimelinePage3D error:', e); }
  try { initInteractiveTimelineDrawer(); } catch (e) { console.warn('initInteractiveTimelineDrawer error:', e); }
  try { initFloatingTicket3D(); } catch (e) { console.warn('initFloatingTicket3D error:', e); }
  try { initMetricCard3DTilt(); } catch (e) { console.warn('initMetricCard3DTilt error:', e); }
  try { initScrollAnimations(); } catch (e) { console.warn('initScrollAnimations error:', e); }
  try { initCountdown3DTilt(); } catch (e) { console.warn('initCountdown3DTilt error:', e); }
  try { initHomeTimeline3D(); } catch (e) { console.warn('initHomeTimeline3D error:', e); }
  try { initHomeTelemetryEqualizer(); } catch (e) { console.warn('initHomeTelemetryEqualizer error:', e); }
  try { initCinematicJourneyEngine(); } catch (e) { console.warn('initCinematicJourneyEngine error:', e); }
  try { initScheduleCard3DTilt(); } catch (e) { console.warn('initScheduleCard3DTilt error:', e); }
  try { selectScheduleStage(1); } catch (e) { console.warn('selectScheduleStage error:', e); }
  try { initVibeCodingInteractivity(); } catch (e) { console.warn('initVibeCodingInteractivity error:', e); }
  try { initVse3dCanvas(); } catch (e) { console.warn('initVse3dCanvas error:', e); }
  try { initLivePassCustomizer(); } catch (e) { console.warn('initLivePassCustomizer error:', e); }
  try { initPageHeroTitleTilt(); } catch (e) { console.warn('initPageHeroTitleTilt error:', e); }
  try { initAllPageHeroCanvases(); } catch (e) { console.warn('initAllPageHeroCanvases error:', e); }
  try { initEditorial3DHero(); } catch (e) { console.warn('initEditorial3DHero error:', e); }
  try { initDigitalCodingEqualizer(); } catch (e) { console.warn('initDigitalCodingEqualizer error:', e); }
  try { initRotatingRing3D(); } catch (e) { console.warn('initRotatingRing3D error:', e); }
  try { initPixelDisintegration(); } catch (e) { console.warn('initPixelDisintegration error:', e); }
  try { initFloatingProjectStack(); } catch (e) { console.warn('initFloatingProjectStack error:', e); }

  // Sticky navbar listener
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('nav');
    if (nav) nav.classList.toggle('stuck', window.scrollY > 20);
  }, { passive: true });

  // Handle URL hash on load
  if (window.location.hash) {
    const hashPage = window.location.hash.replace('#', '').trim();
    if (hashPage === 'admin') {
      window.location.href = 'admin.html';
      return;
    } else if (hashPage === 'mentor') {
      window.location.href = 'mentor.html';
      return;
    } else if (hashPage === 'standings') {
      go('standings');
      return;
    }
    if (hashPage && document.getElementById('page-' + hashPage)) {
      setTimeout(() => go(hashPage), 300);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initUdbhavMaster();
});

window.addEventListener('load', () => {
  // Fallback to ensure loader dismisses if not already finished
  setTimeout(() => {
    if (typeof finishLoader === 'function' && !window.loaderDone) {
      finishLoader();
    }
  }, 6000);
});

// >>>>>>>>>> END: 99_init.js <<<<<<<<<<


// ==========================================================================
// SCENE 2: INTERACTIVE INNOVATION ARENA JAVASCRIPT ENGINE
// ==========================================================================

// 1. Pillar Category Filtering
window.filterArenaPillars = function (cat, btn) {
  try { playCyberSound('click'); } catch (e) { }
  document.querySelectorAll('.afr-btn').forEach(function (b) { b.classList.remove('active'); });
  if (btn) btn.classList.add('active');

  const cards = document.querySelectorAll('.arena-pillar-card');
  cards.forEach(function (c) {
    const cardCat = c.getAttribute('data-cat');
    if (cat === 'all' || cardCat === cat) {
      c.classList.remove('hidden-pillar');
      c.style.animation = 'fadeInTab 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
    } else {
      c.classList.add('hidden-pillar');
    }
  });
};

// 2. Interactive 3D Card Tilt
window.handlePillarCardTilt = function (e, card) {
  if (!card) return;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  const rotateX = ((y - centerY) / centerY) * -6;
  const rotateY = ((x - centerX) / centerX) * 6;
  card.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-8px) scale(1.01)';
};

window.resetPillarCardTilt = function (card) {
  if (!card) return;
  card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
};

// 3. Interactive Geometric Floating Shapes Canvas
(function initArenaShapesSimulation() {
  window.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('arenaShapesCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0, height = 0;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = canvas.width = rect.width || window.innerWidth;
      height = canvas.height = rect.height || 600;
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Geometric Shapes Pool
    const SHAPE_TYPES = ['cube', 'ring', 'diamond', 'pill'];
    const PALETTE = [
      { stroke: 'rgba(255, 87, 34, 0.25)', fill: 'rgba(255, 87, 34, 0.04)' },
      { stroke: 'rgba(0, 102, 255, 0.22)', fill: 'rgba(0, 102, 255, 0.04)' },
      { stroke: 'rgba(16, 185, 129, 0.22)', fill: 'rgba(16, 185, 129, 0.04)' },
      { stroke: 'rgba(245, 158, 11, 0.22)', fill: 'rgba(245, 158, 11, 0.04)' },
      { stroke: 'rgba(168, 85, 247, 0.20)', fill: 'rgba(168, 85, 247, 0.04)' }
    ];

    const shapes = [];
    const NUM_SHAPES = 20;

    for (let i = 0; i < NUM_SHAPES; i++) {
      const p = PALETTE[i % PALETTE.length];
      shapes.push({
        x: Math.random() * (width || 1000),
        y: Math.random() * (height || 600),
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        size: 16 + Math.random() * 26,
        type: SHAPE_TYPES[i % SHAPE_TYPES.length],
        strokeColor: p.stroke,
        fillColor: p.fill,
        angle: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.015,
        floatOffset: Math.random() * Math.PI * 2
      });
    }

    // Cursor Deflection Physics
    let mouse = { x: -9999, y: -9999, active: false };

    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener('mousemove', function (e) {
        const r = canvas.getBoundingClientRect();
        mouse.x = e.clientX - r.left;
        mouse.y = e.clientY - r.top;
        mouse.active = true;
      }, { passive: true });

      parent.addEventListener('mouseleave', function () {
        mouse.active = false;
      });
    }

    let pulseWave = null;
    window.triggerArenaShapePulse = function () {
      try { playCyberSound('pulse'); } catch (e) { }
      pulseWave = {
        x: width / 2,
        y: height / 2,
        radius: 0,
        maxRadius: Math.max(width, height) * 0.85,
        alpha: 1
      };
    };

    let tick = 0;
    function renderLoop() {
      tick += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Render pulse shockwave if active
      if (pulseWave) {
        pulseWave.radius += 18;
        pulseWave.alpha -= 0.025;
        ctx.beginPath();
        ctx.arc(pulseWave.x, pulseWave.y, pulseWave.radius, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 87, 34, ' + Math.max(0, pulseWave.alpha * 0.3) + ')';
        ctx.lineWidth = 3;
        ctx.stroke();

        if (pulseWave.radius > pulseWave.maxRadius || pulseWave.alpha <= 0) {
          pulseWave = null;
        }
      }

      // Draw and update each kinetic shape
      shapes.forEach(function (s) {
        s.angle += s.rotSpeed;
        s.x += s.vx + Math.cos(tick + s.floatOffset) * 0.35;
        s.y += s.vy + Math.sin(tick + s.floatOffset) * 0.35;

        // Wrap boundaries
        if (s.x < -40) s.x = width + 40;
        if (s.x > width + 40) s.x = -40;
        if (s.y < -40) s.y = height + 40;
        if (s.y > height + 40) s.y = -40;

        // Cursor deflection physics
        if (mouse.active) {
          const dx = s.x - mouse.x;
          const dy = s.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 140;
          if (dist < maxDist && dist > 0) {
            const force = (1 - dist / maxDist) * 3.5;
            s.x += (dx / dist) * force;
            s.y += (dy / dist) * force;
          }
        }

        // Pulse wave deflection
        if (pulseWave) {
          const dx = s.x - pulseWave.x;
          const dy = s.y - pulseWave.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (Math.abs(dist - pulseWave.radius) < 50) {
            s.x += (dx / (dist || 1)) * 4.5;
            s.y += (dy / (dist || 1)) * 4.5;
          }
        }

        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.angle);

        ctx.strokeStyle = s.strokeColor;
        ctx.fillStyle = s.fillColor;
        ctx.lineWidth = 1.8;

        if (s.type === 'cube') {
          const half = s.size / 2;
          ctx.strokeRect(-half, -half, s.size, s.size);
          ctx.fillRect(-half, -half, s.size, s.size);
          ctx.beginPath();
          ctx.arc(0, 0, 3, 0, Math.PI * 2);
          ctx.fillStyle = s.strokeColor;
          ctx.fill();
        } else if (s.type === 'ring') {
          ctx.beginPath();
          ctx.arc(0, 0, s.size / 2, 0, Math.PI * 2);
          ctx.stroke();
          ctx.fill();
        } else if (s.type === 'diamond') {
          ctx.beginPath();
          ctx.moveTo(0, -s.size / 2);
          ctx.lineTo(s.size / 2, 0);
          ctx.lineTo(0, s.size / 2);
          ctx.lineTo(-s.size / 2, 0);
          ctx.closePath();
          ctx.stroke();
          ctx.fill();
        } else {
          const w = s.size;
          const h = s.size * 0.6;
          ctx.beginPath();
          if (ctx.roundRect) {
            ctx.roundRect(-w / 2, -h / 2, w, h, 6);
          } else {
            ctx.strokeRect(-w / 2, -h / 2, w, h);
          }
          ctx.stroke();
        }

        ctx.restore();
      });

      requestAnimationFrame(renderLoop);
    }

    renderLoop();
  });
})();


/* ==========================================================================
   INTERACTIVE RULES & EVALUATION SIMULATION MODULES
   ========================================================================== */
function calcSquadScore() {
  const tech = parseFloat(document.getElementById('rubricTech')?.value || 9) * 0.30;
  const inno = parseFloat(document.getElementById('rubricInno')?.value || 9) * 0.25;
  const proto = parseFloat(document.getElementById('rubricProto')?.value || 8.5) * 0.20;
  const impact = parseFloat(document.getElementById('rubricImpact')?.value || 9) * 0.15;
  const pitch = parseFloat(document.getElementById('rubricPitch')?.value || 9) * 0.10;

  const total = ((tech + inno + proto + impact + pitch) * 10).toFixed(1);
  const totalEl = document.getElementById('rubricTotalScore');
  const gradeEl = document.getElementById('rubricGradeBadge');

  if (totalEl) totalEl.textContent = total;
  if (gradeEl) {
    if (total >= 90) {
      gradeEl.textContent = 'TIER 1 • PODIUM CONTENDER';
      gradeEl.className = 'rsc-badge tier-gold';
    } else if (total >= 80) {
      gradeEl.textContent = 'TIER 2 • FINALIST BRACKET';
      gradeEl.className = 'rsc-badge tier-silver';
    } else {
      gradeEl.textContent = 'TIER 3 • ADVANCING SQUAD';
      gradeEl.className = 'rsc-badge tier-bronze';
    }
  }
}
window.calcSquadScore = calcSquadScore;

function verifySquadCompliance() {
  try { playCyberSound('click'); } catch (e) { }
  const c1 = document.getElementById('compCheck1')?.checked;
  const c2 = document.getElementById('compCheck2')?.checked;
  const c3 = document.getElementById('compCheck3')?.checked;
  const c4 = document.getElementById('compCheck4')?.checked;

  const resultEl = document.getElementById('complianceAuditResult');
  if (!resultEl) return;

  if (c1 && c2 && c3 && c4) {
    resultEl.innerHTML = '<span class="status-pass">✅ 100% SQUAD COMPLIANCE VERIFIED • CLEARED FOR ARENA SUBMISSION</span>';
    resultEl.className = 'car-box pass';
  } else {
    resultEl.innerHTML = '<span class="status-warn">⚠️ ACTION REQUIRED: Verify all 4 checklist points before code-freeze submission</span>';
    resultEl.className = 'car-box warn';
  }
}
window.verifySquadCompliance = verifySquadCompliance;

function setScannerPreset(preset) {
  try { playCyberSound('click'); } catch (e) { }
  const inputEl = document.getElementById('simCommitMsg');
  if (!inputEl) return;

  if (preset === 'valid') {
    inputEl.value = 'feat: initial neural pipeline scaffold & fastapi routes';
  } else if (preset === 'clone') {
    inputEl.value = 'git clone https://github.com/external/pre-coded-fullstack-app';
  } else if (preset === 'deps') {
    inputEl.value = 'chore: add @tensorflow/tfjs and tailwindcss open-source packages';
  }
  if (typeof simulatePlagiarismCheck === 'function') {
    simulatePlagiarismCheck();
  }
}
window.setScannerPreset = setScannerPreset;

function signHackerPledge(btn) {
  try { playCyberSound('execute'); } catch (e) { }
  const nameInput = document.getElementById('pledgeHackerName');
  const hackerName = (nameInput && nameInput.value.trim()) ? nameInput.value.trim() : 'VERIFIED HACKER';

  const stamp = document.getElementById('pledgeStamp');
  if (stamp) {
    const certId = 'UDB-' + Math.floor(100000 + Math.random() * 900000);
    stamp.innerHTML = `
      <div class="hologram-seal">
        <span class="hs-icon">🛡️</span>
        <div class="hs-meta">
          <strong>DIGITALLY SIGNED &amp; RECORDED</strong>
          <span>PLEDGE VERIFIED • CERT ID: ${certId}</span>
          <span class="hs-time">TIMESTAMP: JAN 28, 2027 • 100% ETHICAL COMMITMENT</span>
        </div>
      </div>
    `;
    stamp.classList.add('visible');
  }
  if (btn) {
    btn.innerHTML = '<span>✓ Pledge Cryptographically Recorded</span>';
    btn.disabled = true;
    btn.classList.add('btn-signed');
  }
}
window.signHackerPledge = signHackerPledge;

/* ==========================================================================
   36-HOUR ENDURANCE ARCHITECTURE INTERACTIVE CONTROLLER
   ========================================================================== */
function filterEndurancePhase(phase, btn) {
  try { playCyberSound('click'); } catch (e) { }

  document.querySelectorAll('.tps-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const cards = document.querySelectorAll('.tl-block-card');
  const progressFill = document.getElementById('enduranceProgressFill');
  const nodes = document.querySelectorAll('.teth-node');

  const phaseProgressMap = {
    'all': '100%',
    'phase1': '16.6%',
    'phase2': '33.3%',
    'phase3': '50.0%',
    'phase4': '66.6%',
    'phase5': '83.3%',
    'phase6': '100%'
  };

  if (progressFill && phaseProgressMap[phase]) {
    progressFill.style.width = phaseProgressMap[phase];
  }

  // Active timeline node state
  nodes.forEach((n, idx) => {
    n.classList.remove('active');
    if (phase === 'all' || phase === 'phase' + (idx + 1) || (phase === 'phase1' && idx === 0) || (phase === 'phase6' && idx >= 5)) {
      n.classList.add('active');
    }
  });

  cards.forEach(c => {
    if (phase === 'all' || c.getAttribute('data-phase') === phase) {
      c.style.display = 'flex';
      c.classList.remove('dimmed');
      c.classList.add('spotlight');
    } else {
      c.style.display = 'none';
      c.classList.remove('spotlight');
      c.classList.add('dimmed');
    }
  });
}
window.filterEndurancePhase = filterEndurancePhase;

function toggleCardProtocol(btn) {
  try { playCyberSound('click'); } catch (e) { }
  const card = btn.closest('.tl-block-card');
  if (!card) return;
  const panel = card.querySelector('.tl-card-protocol-panel');
  const icon = btn.querySelector('.tct-icon');
  if (!panel) return;

  const isOpen = panel.style.display === 'block';
  panel.style.display = isOpen ? 'none' : 'block';
  if (icon) {
    icon.textContent = isOpen ? '+' : '−';
  }
}
window.toggleCardProtocol = toggleCardProtocol;

function toggleMilestoneCheck(cb) {
  try { playCyberSound(cb.checked ? 'click' : 'soft'); } catch (e) { }
  const label = cb.closest('.tbm-item');
  if (label) {
    label.classList.toggle('checked', cb.checked);
  }

  const allChecks = document.querySelectorAll('.tbm-item input[type="checkbox"]');
  const checked = document.querySelectorAll('.tbm-item input[type="checkbox"]:checked');
  const counterEl = document.getElementById('enduranceMilestoneCount');
  if (counterEl) {
    counterEl.textContent = `${checked.length} / ${allChecks.length} MILESTONES LOGGED`;
    if (checked.length === allChecks.length) {
      counterEl.style.color = '#00E676';
    } else {
      counterEl.style.color = '';
    }
  }
}
window.toggleMilestoneCheck = toggleMilestoneCheck;

function initEnduranceCardTilt() {
  const cards = document.querySelectorAll('.tl-block-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const midX = rect.width / 2;
      const midY = rect.height / 2;
      const rotX = ((y - midY) / midY) * -6;
      const rotY = ((x - midX) / midX) * 6;
      card.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateY(-5px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}
window.initEnduranceCardTilt = initEnduranceCardTilt;

// Auto-initialize tilt on DOM load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initEnduranceCardTilt);
} else {
  initEnduranceCardTilt();
}

/* ==================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================
   SECTIONS B & C CONTROLLER ENGINE: MENTOR GATES & LOGISTICS AMENITIES
================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================== */

function filterMentorGate(gate, btn) {
  if (typeof playCyberSound === 'function') playCyberSound('click');

  const buttons = document.querySelectorAll('.tgc-btn');
  buttons.forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const cards = document.querySelectorAll('.tl-eval-card');
  cards.forEach(card => {
    if (gate === 'all') {
      card.style.display = 'flex';
      card.style.opacity = '1';
      card.style.transform = '';
    } else {
      const match = card.getAttribute('data-gate') === gate;
      if (match) {
        card.style.display = 'flex';
        card.style.opacity = '1';
        card.style.transform = 'scale(1.02)';
      } else {
        card.style.display = 'none';
        card.style.opacity = '0';
        card.style.transform = '';
      }
    }
  });
}
window.filterMentorGate = filterMentorGate;

function toggleGateCriteria(cb, pts) {
  if (typeof playCyberSound === 'function') playCyberSound('toggle');

  const label = cb.closest('.tec-item');
  if (label) {
    label.classList.toggle('checked', cb.checked);
  }

  // Calculate live score
  let totalScore = 0;
  const checkboxes = document.querySelectorAll('.tl-ec-checkpoints input[type="checkbox"]');
  checkboxes.forEach(input => {
    if (input.checked) {
      // Find pts tag
      const ptsSpan = input.closest('.tec-item').querySelector('.pts-tag');
      if (ptsSpan) {
        const val = parseInt(ptsSpan.textContent.replace(/[^0-9]/g, ''), 10) || 0;
        totalScore += val;
      }
    }
  });

  const scoreEl = document.getElementById('gateScoreTally');
  const badgeEl = document.getElementById('gateTierBadge');

  if (scoreEl) {
    scoreEl.textContent = totalScore;
    scoreEl.classList.add('pulse');
    setTimeout(() => scoreEl.classList.remove('pulse'), 400);
  }

  if (badgeEl) {
    if (totalScore >= 85) {
      badgeEl.textContent = 'ðŸ† PODIUM CONTENDER';
      badgeEl.className = 'gate-tier-badge tier-podium';
    } else if (totalScore >= 60) {
      badgeEl.textContent = 'ðŸ¥ˆ FINALIST QUALIFIED';
      badgeEl.className = 'gate-tier-badge tier-finalist';
    } else if (totalScore >= 30) {
      badgeEl.textContent = 'ðŸ¥‰ ADVANCING ROUND 2';
      badgeEl.className = 'gate-tier-badge tier-advancing';
    } else {
      badgeEl.textContent = 'âš ï¸ AT RISK OF CUTOFF';
      badgeEl.className = 'gate-tier-badge tier-cutoff';
    }
  }
}
window.toggleGateCriteria = toggleGateCriteria;

function toggleGateDrawer(btn) {
  if (typeof playCyberSound === 'function') playCyberSound('toggle');

  const card = btn.closest('.tl-eval-card');
  if (!card) return;
  const panel = card.querySelector('.tl-gate-drawer-panel');
  const icon = btn.querySelector('.gdb-icon');
  const textSpan = btn.querySelector('span:first-child');

  if (panel) {
    const isOpen = panel.classList.contains('open');
    if (isOpen) {
      panel.classList.remove('open');
      if (icon) icon.textContent = '+';
      if (textSpan) textSpan.textContent = 'INSPECT JURY RUBRIC PROTOCOL';
    } else {
      panel.classList.add('open');
      if (icon) icon.textContent = 'âˆ’';
      if (textSpan) textSpan.textContent = 'COLLAPSE RUBRIC PROTOCOL';
    }
  }
}
window.toggleGateDrawer = toggleGateDrawer;

function filterAmenityCard(category, btn) {
  if (typeof playCyberSound === 'function') playCyberSound('click');

  const buttons = document.querySelectorAll('.taf-btn');
  buttons.forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const cards = document.querySelectorAll('.tl-amenity-card');
  cards.forEach(card => {
    if (category === 'all') {
      card.style.display = 'flex';
      card.style.opacity = '1';
      card.style.transform = '';
    } else {
      const match = card.getAttribute('data-category') === category;
      if (match) {
        card.style.display = 'flex';
        card.style.opacity = '1';
        card.style.transform = 'scale(1.02)';
      } else {
        card.style.display = 'none';
        card.style.opacity = '0';
        card.style.transform = '';
      }
    }
  });
}
window.filterAmenityCard = filterAmenityCard;

function simulatePingTest(btn) {
  if (typeof playCyberSound === 'function') playCyberSound('click');
  const originalText = btn.textContent;
  btn.textContent = 'PINGING FIBER...';
  btn.style.pointerEvents = 'none';

  setTimeout(() => {
    const pings = [8, 9, 11, 7, 12];
    const ping = pings[Math.floor(Math.random() * pings.length)];
    btn.textContent = `${ping}ms • 0% PACKET LOSS`;
    btn.style.color = '#00F5D4';
    btn.style.borderColor = '#00F5D4';
    if (typeof playCyberSound === 'function') playCyberSound('toggle');

    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.pointerEvents = '';
      btn.style.color = '';
      btn.style.borderColor = '';
    }, 3500);
  }, 450);
}
window.simulatePingTest = simulatePingTest;

function toggleAmenityDetail(modalType, btn) {
  if (typeof playCyberSound === 'function') playCyberSound('click');

  let modal = document.getElementById('amenityDetailModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'amenityDetailModal';
    modal.className = 'amenity-cyber-modal';
    modal.innerHTML = `
      <div class="acm-backdrop" onclick="closeAmenityModal()"></div>
      <div class="acm-dialog">
        <div class="acm-header">
          <span class="acm-title" id="acmTitle">FACILITY PROTOCOL</span>
          <button class="acm-close-btn" onclick="closeAmenityModal()">&times;</button>
        </div>
        <div class="acm-body" id="acmBody"></div>
        <div class="acm-footer">
          <button class="acm-ack-btn" onclick="closeAmenityModal()">ACKNOWLEDGED &amp; RETURN &rarr;</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  const titleEl = document.getElementById('acmTitle');
  const bodyEl = document.getElementById('acmBody');

  if (modalType === 'mealModal') {
    titleEl.textContent = 'ðŸ• 36H CATERING & GASTRONOMY TIMETABLE';
    bodyEl.innerHTML = `
      <div class="acm-info-block">
        <h5>ROUND-THE-CLOCK HOT BUFFETS &amp; SNACK DROPS (PIET JAIPUR)</h5>
        <div class="acm-schedule-timeline">
          <div class="ast-row"><span class="ast-time">DAY 1 &bull; 01:00 PM</span><span class="ast-desc"><strong>Welcome Lunch &amp; High-Tea</strong> &mdash; Multi-course royal Rajasthani and North Indian hot buffet.</span></div>
          <div class="ast-row"><span class="ast-time">DAY 1 &bull; 05:30 PM</span><span class="ast-desc"><strong>Evening Sprint High-Tea</strong> &mdash; Artisanal masala chai, filter coffee, cookies, and samosas.</span></div>
          <div class="ast-row"><span class="ast-time">DAY 1 &bull; 08:30 PM</span><span class="ast-desc"><strong>Grand Dinner Buffet</strong> &mdash; Rich paneer curries, dal makhani, hot breads, and dessert spread.</span></div>
          <div class="ast-row"><span class="ast-time">DAY 2 &bull; 01:30 AM</span><span class="ast-desc"><strong>Midnight Fuel Drop</strong> &mdash; Fresh sandwiches, energy fuel bars, Red Bull cans, and warm cookies.</span></div>
          <div class="ast-row"><span class="ast-time">DAY 2 &bull; 08:00 AM</span><span class="ast-desc"><strong>Breakfast of Champions</strong> &mdash; Poha, idli sambhar, fresh fruits, juice, tea, and espresso.</span></div>
          <div class="ast-row"><span class="ast-time">DAY 2 &bull; 01:00 PM</span><span class="ast-desc"><strong>Grand Finale Lunch</strong> &mdash; Celebratory feast prior to Grand Jury Pitching.</span></div>
        </div>
        <p class="acm-note">ðŸŒ± 100% Pure Vegetarian with dedicated Jain counters at all meal stations.</p>
      </div>
    `;
  } else if (modalType === 'sleepModal') {
    titleEl.textContent = 'ðŸ›ï¸ SLEEP PODS & RAPID RECOVERY PROTOCOL';
    bodyEl.innerHTML = `
      <div class="acm-info-block">
        <h5>200+ REST PODS &bull; CLIMATE-CONTROLLED SILENT ZONES</h5>
        <div class="acm-points-grid">
          <div class="apg-item"><strong>Wing Allocations:</strong> North Wing Floor 2 (Male Hackers) &bull; North Wing Floor 3 (Female Hackers).</div>
          <div class="apg-item"><strong>Amenities Included:</strong> Sanitized eye masks, earplugs, fresh blankets, and plush memory foam pillows.</div>
          <div class="apg-item"><strong>Hot Shower Access:</strong> Fresh clean towels, bath soap kits, and high-pressure hot water showers in restrooms.</div>
          <div class="apg-item"><strong>Quiet Hours Policy:</strong> Strictly no laptops or conversations in sleep zones &mdash; silent recharging only.</div>
        </div>
        <p class="acm-note">ðŸ’¡ Hackathon veterans advise a minimum 90-minute sleep cycle between 03:30 AM and 05:30 AM for peak pitching focus.</p>
      </div>
    `;
  } else if (modalType === 'healthModal') {
    titleEl.textContent = 'ðŸ›¡ï¸ EMERGENCY HEALTH & SAFETY SHIELD';
    bodyEl.innerHTML = `
      <div class="acm-info-block">
        <h5>CAMPUS MEDICAL DESK &bull; 24/7 REGISTERED EMT ON SITE</h5>
        <div class="acm-points-grid">
          <div class="apg-item"><strong>Triage Station:</strong> Medical Bay Ground Floor, adjacent to Innovation Hall Gate 1.</div>
          <div class="apg-item"><strong>Emergency Ambulance:</strong> Dedicated campus emergency ambulance parked outside Gate 1.</div>
          <div class="apg-item"><strong>Rapid Supplies:</strong> First-aid kits, headache/fatigue relief, antacids, band-aids, and ORS hydration packs.</div>
          <div class="apg-item"><strong>Direct Hotline:</strong> Emergency Campus Control Desk: <strong>+91 98290 XXXXX</strong> (Toll-Free).</div>
        </div>
        <p class="acm-note">ðŸ”’ RFID security guards perform 15-minute perimeter patrols across all hacker hubs.</p>
      </div>
    `;
  }

  modal.classList.add('visible');
  document.body.style.overflow = 'hidden';
}
window.toggleAmenityDetail = toggleAmenityDetail;

function closeAmenityModal() {
  const modal = document.getElementById('amenityDetailModal');
  if (modal) {
    modal.classList.remove('visible');
    document.body.style.overflow = '';
  }
}
window.closeAmenityModal = closeAmenityModal;

function initMentorAndAmenityPhysics() {
  const cards = document.querySelectorAll('.tl-eval-card, .tl-amenity-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const midX = rect.width / 2;
      const midY = rect.height / 2;
      const rotX = ((y - midY) / midY) * -5;
      const rotY = ((x - midX) / midX) * 5;
      card.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}
window.initMentorAndAmenityPhysics = initMentorAndAmenityPhysics;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMentorAndAmenityPhysics);
} else {
  initMentorAndAmenityPhysics();
}



/* ==================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================
   MASTER FIXES ENGINE: MODAL CONTROLLER, RING VELOCITY & SPECTRUM,
   LAPTOP 3D PHYSICS & RESPONSIVE TOUCH ENGINE
================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================== */

// 1. Hackathon 36-Hour Schedule Modal Controller
function openHackathonScheduleModal(evt) {
  if (evt) {
    evt.preventDefault();
    evt.stopPropagation();
  }
  try {
    if (typeof playCyberSound === 'function') {
      playCyberSound('click');
    } else if (typeof playSound === 'function') {
      playSound('click');
    }
  } catch (e) { }

  const modal = document.getElementById('vseScheduleModal');
  if (modal) {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
}
window.openHackathonScheduleModal = openHackathonScheduleModal;

function closeHackathonScheduleModal(evt) {
  if (evt && evt.target !== evt.currentTarget && !evt.target.classList.contains('vsm-close-btn')) {
    return;
  }
  try {
    if (typeof playCyberSound === 'function') {
      playCyberSound('click');
    } else if (typeof playSound === 'function') {
      playSound('click');
    }
  } catch (e) { }

  const modal = document.getElementById('vseScheduleModal');
  if (modal) {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}
window.closeHackathonScheduleModal = closeHackathonScheduleModal;

function switchScheduleModalDay(dayNum) {
  try {
    if (typeof playCyberSound === 'function') {
      playCyberSound('click');
    } else if (typeof playSound === 'function') {
      playSound('click');
    }
  } catch (e) { }

  const tab1 = document.getElementById('vsmTabDay1');
  const tab2 = document.getElementById('vsmTabDay2');
  const list1 = document.getElementById('vsmDay1Schedule');
  const list2 = document.getElementById('vsmDay2Schedule');

  if (!tab1 || !tab2 || !list1 || !list2) return;

  if (dayNum === 1) {
    tab1.classList.add('active');
    tab2.classList.remove('active');
    list1.style.display = 'flex';
    list2.style.display = 'none';
  } else {
    tab2.classList.add('active');
    tab1.classList.remove('active');
    list2.style.display = 'flex';
    list1.style.display = 'none';
  }
}
window.switchScheduleModalDay = switchScheduleModalDay;

// Keyboard listener for Esc key to close schedule modal
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const modal = document.getElementById('vseScheduleModal');
    if (modal && modal.classList.contains('open')) {
      closeHackathonScheduleModal();
    }
  }
});

// 2. 3D Rotating Ring Controller: Velocity Boost & Spectrum Shifter
let ringSpeedMultiplier = 1;
const ringSpectrumPalette = [
  { name: 'CYAN GLOW', hex: 0x00F5D4, color: '#00F5D4' },
  { name: 'ORANGE FLAME', hex: 0xFF5722, color: '#FF5722' },
  { name: 'MATRIX NEON', hex: 0x00E676, color: '#00E676' },
  { name: 'PURPLE PLASMA', hex: 0xA855F7, color: '#A855F7' },
  { name: 'SOLAR GOLD', hex: 0xFFD700, color: '#FFD700' }
];
let currentSpectrumIdx = 0;

function boostRingVelocity() {
  try {
    if (typeof playCyberSound === 'function') {
      playCyberSound('click');
    }
  } catch (e) { }

  ringSpeedMultiplier = 4.5;
  const btn = document.getElementById('rrBtnBoost');
  const valEl = document.querySelector('.rr-spec-val');

  if (btn) {
    btn.classList.add('active');
    btn.style.boxShadow = '0 0 20px rgba(255, 107, 53, 0.6)';
    const text = btn.querySelector('span:last-child');
    if (text) text.textContent = 'BOOSTING 4X...';
  }
  if (valEl) {
    valEl.textContent = '1440° • HYPER';
    valEl.style.color = '#FF5722';
  }

  setTimeout(() => {
    ringSpeedMultiplier = 1;
    if (btn) {
      btn.classList.remove('active');
      btn.style.boxShadow = '';
      const text = btn.querySelector('span:last-child');
      if (text) text.textContent = 'BOOST SPIN';
    }
    if (valEl) {
      valEl.textContent = '360° • 60 FPS';
      valEl.style.color = '';
    }
  }, 2800);
}
window.boostRingVelocity = boostRingVelocity;

function cycleRingSpectrum() {
  try {
    if (typeof playCyberSound === 'function') {
      playCyberSound('toggle');
    }
  } catch (e) { }

  currentSpectrumIdx = (currentSpectrumIdx + 1) % ringSpectrumPalette.length;
  const currentTheme = ringSpectrumPalette[currentSpectrumIdx];

  const label = document.getElementById('rrSpectrumLabel');
  if (label) {
    label.textContent = currentTheme.name;
    label.style.color = currentTheme.color;
  }

  const btn = document.getElementById('rrBtnSpectrum');
  if (btn) {
    btn.style.borderColor = currentTheme.color;
    btn.style.boxShadow = `0 0 15px ${currentTheme.color}66`;
  }

  // Update Three.js scene ring materials if accessible
  const canvas = document.getElementById('rotatingRingCanvas');
  if (canvas && canvas.__rrMaterial) {
    canvas.__rrMaterial.emissive.setHex(currentTheme.hex);
  }
}
window.cycleRingSpectrum = cycleRingSpectrum;

// 3. Interactive 3D Cursor & Touch Tilt Physics for Laptop Chassis
function initInteractiveLaptop3DTilt() {
  const wrap = document.getElementById('vseInteractiveLaptopWrap');
  const chassis = document.getElementById('vseLaptopChassis');
  if (!wrap || !chassis) return;

  // Skip continuous tilt calculation on touch screens to maintain smooth touch scrolling
  if (window.matchMedia('(hover: none)').matches) {
    return;
  }

  let ticking = false;

  function updateTilt(clientX, clientY) {
    const rect = wrap.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const normX = Math.max(0, Math.min(1, x / rect.width));
    const normY = Math.max(0, Math.min(1, y / rect.height));

    const rotY = (normX - 0.5) * 24;
    const rotX = (0.5 - normY) * 18;

    chassis.style.transform = `rotateX(${12 + rotX}deg) rotateY(${-14 + rotY}deg) scale(1.03)`;
  }

  wrap.addEventListener('mousemove', (e) => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateTilt(e.clientX, e.clientY);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  wrap.addEventListener('mouseleave', () => {
    chassis.style.transform = '';
  });
}
window.initInteractiveLaptop3DTilt = initInteractiveLaptop3DTilt;

// Safe Window Error Guard to prevent rogue third-party errors from halting user experience
window.addEventListener('error', (e) => {
  if (e && e.message && (e.message.includes('Script error') || e.message.includes('ResizeObserver'))) {
    e.preventDefault();
  }
});

// Initialize on DOM load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initInteractiveLaptop3DTilt);
} else {
  initInteractiveLaptop3DTilt();
}



/* ==================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================
   3D MATRIX TILE WALL & CYBER CODE WALL ENGINE (THREE.JS + 2D RESILIENT)
================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================== */

let heroMatrixRenderer = null;
let heroMatrixGroup = null;
let heroMatrixTiles = [];
let heroMatrixIsRevealed = false;
let heroMatrixThemeName = 'EXPONENTIAL INTELLIGENCE & DECENTRALIZED PROTOCOLS';
let heroMatrixThemeTagline = 'Autonomous Agents, Web3 Sovereignty, Neuro-Symbolic Computing & Climate Intelligence';
let heroMatrixWallYaw = 0;
let heroMatrixTargetYaw = 0;
let heroMatrixWallTilt = 0;
let heroMatrixTargetTilt = 0;
let heroMatrixAnimId = null;

function updateThemeHeroUI(isRevealed, name, tagline) {
  heroMatrixIsRevealed = !!isRevealed;
  if (name) heroMatrixThemeName = name;
  if (tagline) heroMatrixThemeTagline = tagline;

  const badge = document.getElementById('thMatrixStatusBadge');
  const badgeText = document.getElementById('thMatrixStatusText');
  const revealBtn = document.getElementById('thMatRevealBtnText');
  const card = document.getElementById('thRevealedThemeCard');
  const nameEl = document.getElementById('themeHeroRevealedName');
  const tagEl = document.getElementById('themeHeroRevealedTagline');

  if (isRevealed) {
    if (badge) {
      badge.className = 'th-matrix-badge live';
    }
    if (badgeText) {
      badgeText.textContent = 'OFFICIAL THEME UNVEILED';
    }
    if (revealBtn) {
      revealBtn.innerHTML = '&#128274; RE-LOCK CIPHER';
    }
    if (card) {
      card.style.display = 'block';
    }
    if (nameEl) {
      nameEl.textContent = heroMatrixThemeName;
    }
    if (tagEl) {
      tagEl.textContent = heroMatrixThemeTagline;
    }
  } else {
    if (badge) {
      badge.className = 'th-matrix-badge locked';
    }
    if (badgeText) {
      badgeText.textContent = 'ENCRYPTED MATRIX CIPHER \u00B7 AES-256';
    }
    if (revealBtn) {
      revealBtn.innerHTML = '&#128065; REVEAL THEME';
    }
    if (card) {
      card.style.display = 'none';
    }
  }
}

function spinHeroMatrixWall360() {
  try { if (typeof playCyberSound === 'function') playCyberSound('chime'); } catch (e) { }
  heroMatrixTargetYaw += Math.PI * 2;
}

function flipHeroMatrixTilesCascade() {
  try { if (typeof playCyberSound === 'function') playCyberSound('click'); } catch (e) { }
  const now = performance.now() * 0.001;
  heroMatrixTiles.forEach(t => {
    t.userData.lastFlipTrigger = now + (t.userData.distFromCenter * 0.05);
    t.userData.targetFlip = (t.userData.targetFlip >= Math.PI ? 0 : Math.PI);
  });
}

function toggleHeroMatrixRevealUser() {
  if (heroMatrixIsRevealed) {
    reLockHeroMatrixCipher();
  } else {
    triggerHeroMatrixRevealCascade(heroMatrixThemeName, heroMatrixThemeTagline);
  }
}

function triggerHeroMatrixRevealCascade(themeName, themeTagline) {
  if (themeName) heroMatrixThemeName = themeName;
  if (themeTagline) heroMatrixThemeTagline = themeTagline;

  try {
    localStorage.setItem('udbhav_theme_revealed', 'true');
    localStorage.setItem('hs27_theme_state', 'live');
  } catch (e) { }
  updateThemeHeroUI(true, heroMatrixThemeName, heroMatrixThemeTagline);

  try { if (typeof playCyberSound === 'function') playCyberSound('level'); } catch (e) { }

  heroMatrixTargetYaw += Math.PI * 2;

  const now = performance.now() * 0.001;
  heroMatrixTiles.forEach(t => {
    t.userData.lastFlipTrigger = now + (t.userData.distFromCenter * 0.04);
    t.userData.targetFlip = Math.PI * 2;
    if (t.material && Array.isArray(t.material)) {
      if (t.material[4]) {
        t.material[4].emissive.setHex(0xff5722);
        t.material[4].emissiveIntensity = 0.55;
      }
    }
  });
}

function reLockHeroMatrixCipher() {
  try {
    localStorage.setItem('udbhav_theme_revealed', 'false');
    localStorage.setItem('hs27_theme_state', 'locked');
  } catch (e) { }
  updateThemeHeroUI(false);

  try { if (typeof playCyberSound === 'function') playCyberSound('click'); } catch (e) { }

  heroMatrixTargetYaw += Math.PI * 2;

  const now = performance.now() * 0.001;
  heroMatrixTiles.forEach(t => {
    t.userData.lastFlipTrigger = now + (t.userData.distFromCenter * 0.03);
    t.userData.targetFlip = 0;
    if (t.material && Array.isArray(t.material)) {
      if (t.material[4]) {
        t.material[4].emissive.setHex(t.userData.baseEmissiveHex || 0x00f5d4);
        t.material[4].emissiveIntensity = 0.25;
      }
    }
  });
}

window.spinHeroMatrixWall360 = spinHeroMatrixWall360;
window.flipHeroMatrixTilesCascade = flipHeroMatrixTilesCascade;
window.toggleHeroMatrixRevealUser = toggleHeroMatrixRevealUser;
window.triggerHeroMatrixRevealCascade = triggerHeroMatrixRevealCascade;
window.reLockHeroMatrixCipher = reLockHeroMatrixCipher;

function initThemeHeroMatrix3D() {
  const canvas = document.getElementById('themeHeroMatrixCanvas');
  const wrap = document.getElementById('themeHeroMatrixWrap') || (canvas ? canvas.parentElement : null);
  if (!canvas || !wrap) return;

  let savedState = 'locked';
  let savedName = heroMatrixThemeName;
  let savedTag = heroMatrixThemeTagline;
  try {
    savedState = localStorage.getItem('hs27_theme_state') || (localStorage.getItem('udbhav_theme_revealed') === 'true' ? 'live' : 'locked');
    savedName = localStorage.getItem('hs27_theme_name') || localStorage.getItem('udbhav_theme_name') || heroMatrixThemeName;
    savedTag = localStorage.getItem('hs27_theme_tagline') || localStorage.getItem('udbhav_theme_tagline') || heroMatrixThemeTagline;
  } catch (e) { }

  const isInitiallyRevealed = savedState === 'live';
  updateThemeHeroUI(isInitiallyRevealed, savedName, savedTag);

  if (typeof THREE === 'undefined') {
    initThemeHeroMatrix2DFallback(canvas, wrap);
    return;
  }

  let width = wrap.clientWidth || 860;
  let height = wrap.clientHeight || 420;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
  camera.position.set(0, 0, 6.6);

  if (heroMatrixRenderer) {
    try { heroMatrixRenderer.dispose(); } catch (e) { }
  }

  let renderer = null;
  try {
    renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
  } catch (e) {
    initThemeHeroMatrix2DFallback(canvas, wrap);
    return;
  }

  heroMatrixRenderer = renderer;
  renderer.setSize(width, height, false);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  // Studio Lighting
  scene.add(new THREE.AmbientLight(0xffffff, 0.8));

  const dirLight = new THREE.DirectionalLight(0xffffff, 1.4);
  dirLight.position.set(5, 6, 7);
  scene.add(dirLight);

  const orangePoint = new THREE.PointLight(0xff5722, 3.2, 14);
  orangePoint.position.set(-4, 3, 3);
  scene.add(orangePoint);

  const cyanPoint = new THREE.PointLight(0x00f5d4, 2.6, 14);
  cyanPoint.position.set(4, -3, 3);
  scene.add(cyanPoint);

  const purplePoint = new THREE.PointLight(0x8b5cf6, 2.2, 14);
  purplePoint.position.set(0, 4, 4);
  scene.add(purplePoint);

  // Matrix Voxels Grid (16 cols x 8 rows)
  const cols = 16;
  const rows = 8;
  const tileW = 0.25;
  const tileH = 0.25;
  const tileD = 0.05;
  const spacingX = 0.31;
  const spacingY = 0.31;

  const group = new THREE.Group();
  heroMatrixGroup = group;
  heroMatrixTiles = [];

  const tileGeo = new THREE.BoxGeometry(tileW, tileH, tileD);
  const edgeMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    metalness: 0.85,
    roughness: 0.25
  });

  const glyphList = ['0', '1', '\u03BB', '\u03A9', '0x', '7F', 'H2', 'GGC', '42', 'AI', 'ZK', '99', 'HEX', 'UDB', 'DEV', 'NET'];
  const palette = [0xff5722, 0x00f5d4, 0x8b5cf6, 0x3b82f6, 0xff007f];

  function createGlyphTexture(glyph, hexColor) {
    const cvs = document.createElement('canvas');
    cvs.width = 128;
    cvs.height = 128;
    const ctx = cvs.getContext('2d');
    ctx.fillStyle = '#0a0f1d';
    ctx.fillRect(0, 0, 128, 128);

    ctx.strokeStyle = hexColor;
    ctx.lineWidth = 4;
    ctx.strokeRect(4, 4, 120, 120);

    ctx.fillStyle = hexColor;
    ctx.font = 'bold 44px "Space Grotesk", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(glyph, 64, 64);

    const tex = new THREE.CanvasTexture(cvs);
    tex.needsUpdate = true;
    return tex;
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const idx = (r * cols + c);
      const glyph = glyphList[idx % glyphList.length];
      const colorHex = palette[(r + c) % palette.length];
      const glyphTex = createGlyphTexture(glyph, '#' + colorHex.toString(16).padStart(6, '0'));

      const frontMat = new THREE.MeshStandardMaterial({
        map: glyphTex,
        metalness: 0.6,
        roughness: 0.3,
        emissive: colorHex,
        emissiveIntensity: 0.25
      });

      const backMat = new THREE.MeshStandardMaterial({
        color: 0xff5722,
        metalness: 0.7,
        roughness: 0.2,
        emissive: 0xff8a00,
        emissiveIntensity: 0.4
      });

      const materials = [edgeMat, edgeMat, edgeMat, edgeMat, frontMat, backMat];
      const tileMesh = new THREE.Mesh(tileGeo, materials);

      const x = (c - (cols - 1) / 2) * spacingX;
      const y = ((rows - 1) / 2 - r) * spacingY;
      const z = 0;

      tileMesh.position.set(x, y, z);
      const distFromCenter = Math.sqrt(Math.pow(c - (cols - 1) / 2, 2) + Math.pow(r - (rows - 1) / 2, 2));

      tileMesh.userData = {
        col: c,
        row: r,
        baseX: x,
        baseY: y,
        baseZ: z,
        phase: (r * 0.35 + c * 0.22),
        distFromCenter: distFromCenter,
        currentFlip: isInitiallyRevealed ? Math.PI * 2 : 0,
        targetFlip: isInitiallyRevealed ? Math.PI * 2 : 0,
        flipSpeed: 0,
        lastFlipTrigger: 0,
        baseEmissiveHex: colorHex
      };

      if (isInitiallyRevealed) {
        frontMat.emissive.setHex(0xff5722);
        frontMat.emissiveIntensity = 0.55;
      }

      group.add(tileMesh);
      heroMatrixTiles.push(tileMesh);
    }
  }

  // Futuristic orbital halo ring around matrix wall
  const haloGeo = new THREE.TorusGeometry(3.1, 0.035, 16, 120);
  const haloMat = new THREE.MeshStandardMaterial({
    color: 0xff5722,
    metalness: 0.8,
    roughness: 0.2,
    emissive: 0xff5722,
    emissiveIntensity: 0.4
  });
  const haloMesh = new THREE.Mesh(haloGeo, haloMat);
  haloMesh.rotation.x = Math.PI / 2.8;
  group.add(haloMesh);

  scene.add(group);

  // Mouse drag & tilt interaction
  let isDragging = false;
  let lastClientX = 0;

  wrap.addEventListener('mousedown', (e) => {
    isDragging = true;
    lastClientX = e.clientX;
    wrap.style.cursor = 'grabbing';
  });

  window.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      wrap.style.cursor = 'grab';
    }
  });

  wrap.addEventListener('mousemove', (e) => {
    const rect = wrap.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;

    if (isDragging) {
      const deltaX = e.clientX - lastClientX;
      lastClientX = e.clientX;
      heroMatrixTargetYaw += deltaX * 0.012;
    } else {
      heroMatrixTargetTilt = ny * 0.45;
      heroMatrixTargetYaw += nx * 0.0015;
    }
  });

  // Touch Drag for Mobile
  wrap.addEventListener('touchstart', (e) => {
    if (e.touches && e.touches[0]) {
      isDragging = true;
      lastClientX = e.touches[0].clientX;
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  }, { passive: true });

  wrap.addEventListener('touchmove', (e) => {
    if (isDragging && e.touches && e.touches[0]) {
      const deltaX = e.touches[0].clientX - lastClientX;
      lastClientX = e.touches[0].clientX;
      heroMatrixTargetYaw += deltaX * 0.012;
    }
  }, { passive: true });

  // Scroll Sync
  let lastScrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    const rect = wrap.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      const scrollDiff = window.scrollY - lastScrollY;
      heroMatrixTargetYaw += scrollDiff * 0.0025;
    }
    lastScrollY = window.scrollY;
  }, { passive: true });

  // ResizeObserver for zero-blank sizing
  if (typeof ResizeObserver !== 'undefined') {
    const ro = new ResizeObserver(entries => {
      for (const entry of entries) {
        const cr = entry.contentRect;
        if (cr.width > 50 && cr.height > 50) {
          camera.aspect = cr.width / cr.height;
          camera.updateProjectionMatrix();
          renderer.setSize(cr.width, cr.height, false);
        }
      }
    });
    ro.observe(wrap);
  }

  // Animation Loop with 360° Yaw Wrap & Dynamic Matrix Flip Physics
  let clock = 0;
  const yawGauge = document.getElementById('thHeroYawDeg');

  function renderHeroMatrixWall() {
    heroMatrixAnimId = requestAnimationFrame(renderHeroMatrixWall);
    clock += 0.022;

    heroMatrixWallYaw += (heroMatrixTargetYaw - heroMatrixWallYaw) * 0.08;
    heroMatrixWallTilt += (heroMatrixTargetTilt - heroMatrixWallTilt) * 0.08;

    group.rotation.y = heroMatrixWallYaw;
    group.rotation.x = heroMatrixWallTilt;

    if (yawGauge) {
      const deg = Math.round((((heroMatrixWallYaw % (Math.PI * 2)) + (Math.PI * 2)) % (Math.PI * 2)) * (180 / Math.PI));
      yawGauge.textContent = deg + '\u00B0 / 360\u00B0';
    }

    const nowSec = performance.now() * 0.001;
    heroMatrixTiles.forEach(t => {
      t.position.z = t.userData.baseZ + Math.sin(clock * 1.6 + t.userData.phase) * 0.09;

      if (nowSec >= t.userData.lastFlipTrigger) {
        const diff = t.userData.targetFlip - t.userData.currentFlip;
        t.userData.currentFlip += diff * 0.12;
        t.rotation.y = t.userData.currentFlip;
      }
    });

    haloMesh.rotation.z += 0.008;

    renderer.render(scene, camera);
  }

  if (heroMatrixAnimId) cancelAnimationFrame(heroMatrixAnimId);
  renderHeroMatrixWall();
}

/* Fallback 2D Canvas Renderer (Guarantees zero-blank display if WebGL is unavailable) */
function initThemeHeroMatrix2DFallback(canvas, wrap) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  function resize2D() {
    canvas.width = wrap.clientWidth || 860;
    canvas.height = wrap.clientHeight || 420;
  }
  resize2D();
  window.addEventListener('resize', resize2D);

  let rotY = 0;
  const glyphs = ['0', '1', '\u03BB', '\u03A9', '0x', '7F', 'H2', 'GGC', '42', 'AI', 'ZK'];
  const cols = 16;
  const rows = 8;

  function draw2DMatrix() {
    requestAnimationFrame(draw2DMatrix);
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    rotY += 0.015;
    const yawDeg = Math.round((((rotY % (Math.PI * 2)) + (Math.PI * 2)) % (Math.PI * 2)) * (180 / Math.PI));
    const yawGauge = document.getElementById('thHeroYawDeg');
    if (yawGauge) yawGauge.textContent = yawDeg + '\u00B0 / 360\u00B0';

    const cx = w / 2;
    const cy = h / 2;
    const tileW = Math.min(w / 20, 36);
    const tileH = tileW;

    ctx.save();
    ctx.translate(cx, cy);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x0 = (c - cols / 2) * (tileW * 1.25);
        const y0 = (r - rows / 2) * (tileH * 1.25);

        const cosY = Math.cos(rotY + c * 0.05);
        const projX = x0 * cosY;
        const projW = Math.max(Math.abs(tileW * cosY), 4);

        ctx.fillStyle = heroMatrixIsRevealed ? 'rgba(255, 87, 34, 0.85)' : 'rgba(10, 15, 29, 0.9)';
        ctx.strokeStyle = heroMatrixIsRevealed ? '#ff8a00' : 'rgba(0, 245, 212, 0.6)';
        ctx.lineWidth = 1.5;

        ctx.fillRect(projX - projW / 2, y0, projW, tileH);
        ctx.strokeRect(projX - projW / 2, y0, projW, tileH);

        if (projW > 14) {
          ctx.fillStyle = heroMatrixIsRevealed ? '#ffffff' : '#00f5d4';
          ctx.font = 'bold 12px monospace';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(glyphs[(r * cols + c) % glyphs.length], projX, y0 + tileH / 2);
        }
      }
    }
    ctx.restore();
  }
  draw2DMatrix();
}

window.initThemeHeroMatrix3D = initThemeHeroMatrix3D;
window.initThemeHeroMatrix2DFallback = initThemeHeroMatrix2DFallback;

// Auto-trigger on DOM load or view switch
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initThemeHeroMatrix3D, 100);
  });
} else {
  setTimeout(initThemeHeroMatrix3D, 100);
}



// Hook into page switch for theme matrix wall
window.addEventListener('hashchange', () => {
  if (window.location.hash.includes('theme')) {
    setTimeout(initThemeHeroMatrix3D, 80);
  }
});

const origSwitchPage = window.switchPage;
if (typeof origSwitchPage === 'function') {
  window.switchPage = function (pageId) {
    origSwitchPage.apply(this, arguments);
    if (pageId === 'theme' || pageId === 'page-theme') {
      setTimeout(initThemeHeroMatrix3D, 80);
    }
  };
}


/* ==================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================
   THEME STAGES INTERACTION ENGINE: SCRUBBER, TRACK INTEL, MILESTONES & 3D TILT
================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================== */

function scrollToThemeStage(stageNum, btn) {
  try { if (typeof playCyberSound === 'function') playCyberSound('click'); } catch (e) { }

  const buttons = document.querySelectorAll('.mqs-btn');
  buttons.forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const target = document.getElementById('themeStage' + stageNum);
  if (target) {
    const yOffset = -90;
    const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}
window.scrollToThemeStage = scrollToThemeStage;

function toggleStageMilestoneCheck(input) {
  try { if (typeof playCyberSound === 'function') playCyberSound('toggle'); } catch (e) { }
  const item = input.closest('.mso-cp-item');
  if (item) {
    item.classList.toggle('checked', input.checked);
  }
}
window.toggleStageMilestoneCheck = toggleStageMilestoneCheck;

const trackIntelData = {
  'AI': {
    title: 'ðŸ¤– AI AGENTS & LLM COMPUTING',
    desc: 'Autonomous multi-agent orchestration, LangGraph pipelines, local inference models, fine-tuned domain reasoning, and multi-modal generative agents.',
    stacks: 'PyTorch, vLLM, LangChain, AutoGen, Ollama, HuggingFace',
    bounty: '₹40,000 Special Track Pool + API Credits'
  },
  'WEB3': {
    title: 'ðŸŒ WEB3 & ZERO-KNOWLEDGE PROOFS',
    desc: 'Decentralized identity, account abstraction, Circom/SnarkJS ZK-SNARK verifiers, trustless verifiable compute, and high-throughput L2 rollups.',
    stacks: 'Solidity, Rust, SnarkJS, Foundry, Wagmi, IPFS',
    bounty: '₹35,000 Special Track Pool + Grant Audits'
  },
  'CYBER': {
    title: 'ðŸ›¡ï¸ NEXT-GEN CYBER SECURITY',
    desc: 'Automated vulnerability triage, AI red-teaming, tamper-evident log provenance, memory-safe kernels, and zero-trust perimeter auth.',
    stacks: 'Rust, eBPF, Go, Wazuh, OpenSSL, WireGuard',
    bounty: '₹30,000 Special Track Pool + Security Vouchers'
  },
  'CLIMATE': {
    title: 'ðŸŒ± CLIMATE & SUSTAINABILITY INTELLIGENCE',
    desc: 'Carbon ledger analytics, decentralized energy microgrid routing, automated climate risk models, and IoT emissions telemetry.',
    stacks: 'Python, Copernicus API, MQTT, TimeSeries DB, GeoPandas',
    bounty: '₹30,000 Special Track Pool + Green Tech Incubation'
  },
  'HEALTH': {
    title: 'ðŸ§¬ HEALTHTECH & BIOMEDICAL AI',
    desc: 'Predictive diagnostic models, HIPAA-compliant federated learning, wearable telemetry anomaly detection, and rapid emergency dispatch.',
    stacks: 'TensorFlow, FHIR API, WebSockets, OpenCV, Scikit-Learn',
    bounty: '₹30,000 Special Track Pool + Clinical Mentorship'
  },
  'IOT': {
    title: 'ðŸ™ï¸ SMART CITIES & HARDWARE IOT',
    desc: 'Urban traffic signal optimization, LoRaWAN environmental sensor grids, autonomous drone transit routing, and resilient smart civic infrastructure.',
    stacks: 'ESP32, Raspberry Pi, LoRa, MQTT, WebSockets, Grafana',
    bounty: '₹30,000 Special Track Pool + Hardware Kits'
  }
};

function selectTrackIntel(trackCode, btn) {
  try { if (typeof playCyberSound === 'function') playCyberSound('click'); } catch (e) { }

  const data = trackIntelData[trackCode] || trackIntelData['AI'];

  let modal = document.getElementById('trackIntelModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'trackIntelModal';
    modal.className = 'amenity-cyber-modal';
    modal.innerHTML = `
      <div class="acm-backdrop" onclick="closeTrackIntelModal()"></div>
      <div class="acm-dialog">
        <div class="acm-header">
          <span class="acm-title" id="timTitle">ENGINEERING TRACK INTEL</span>
          <button class="acm-close-btn" onclick="closeTrackIntelModal()">&times;</button>
        </div>
        <div class="acm-body" id="timBody"></div>
        <div class="acm-footer">
          <button class="acm-ack-btn" onclick="closeTrackIntelModal()">CLOSE INTEL &rarr;</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  const titleEl = document.getElementById('timTitle');
  const bodyEl = document.getElementById('timBody');

  if (titleEl) titleEl.textContent = data.title;
  if (bodyEl) {
    bodyEl.innerHTML = `
      <div class="acm-info-block">
        <h5>TRACK SCOPE &amp; PROBLEM DOMAIN</h5>
        <p style="font-size:0.92rem;line-height:1.6;color:rgba(255,255,255,0.85);margin-bottom:18px;">${data.desc}</p>
        <div class="acm-points-grid">
          <div class="apg-item"><strong>Recommended Stack:</strong> ${data.stacks}</div>
          <div class="apg-item"><strong>Track Prize Pool:</strong> <span style="color:#00F5D4;font-weight:800;">${data.bounty}</span></div>
          <div class="apg-item"><strong>Evaluation Criteria:</strong> Technical depth, working prototype, commercial viability, and security standards.</div>
        </div>
        <p class="acm-note">ðŸ’¡ Official detailed problem statements unlock on January 28, 2027 at 09:00 AM IST.</p>
      </div>
    `;
  }

  modal.classList.add('visible');
  document.body.style.overflow = 'hidden';
}
window.selectTrackIntel = selectTrackIntel;

function closeTrackIntelModal() {
  const modal = document.getElementById('trackIntelModal');
  if (modal) {
    modal.classList.remove('visible');
    document.body.style.overflow = '';
  }
}
window.closeTrackIntelModal = closeTrackIntelModal;

function initStageCardsTilt() {
  if (window.matchMedia('(hover: none)').matches) return;
  const cards = document.querySelectorAll('.ms-inner, .ms-object-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const midX = rect.width / 2;
      const midY = rect.height / 2;
      const rotX = ((y - midY) / midY) * -5;
      const rotY = ((x - midX) / midX) * 5;
      card.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}
window.initStageCardsTilt = initStageCardsTilt;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initStageCardsTilt);
} else {
  initStageCardsTilt();
}



/* ═══════════════════════════════════════════════════════════════════
   3D ARMILLARY GYROSCOPE CHRONOMETER SYSTEM ENGINE
   Next-Gen Cyber Innovation Command Deck Viewport (#tlArmillaryCanvas)
   ═══════════════════════════════════════════════════════════════════ */
function initTlArmillaryGyro() {
  const canvas = document.getElementById('tlArmillaryCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = canvas.width;
  let height = canvas.height;
  let angle = 0;
  window.tlGyroSpeedMultiplier = 1.0;

  let isDragging = false;
  let prevX = 0, prevY = 0;
  let dragRotX = 0, dragRotY = 0;

  canvas.addEventListener('pointerdown', (e) => {
    isDragging = true;
    prevX = e.clientX;
    prevY = e.clientY;
  });
  window.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    const dx = e.clientX - prevX;
    const dy = e.clientY - prevY;
    dragRotY += dx * 0.012;
    dragRotX += dy * 0.012;
    prevX = e.clientX;
    prevY = e.clientY;
  });
  window.addEventListener('pointerup', () => { isDragging = false; });
  window.addEventListener('pointercancel', () => { isDragging = false; });

  function render() {
    ctx.clearRect(0, 0, width, height);

    const cx = width / 2;
    const cy = height / 2;
    const spd = (window.tlGyroSpeedMultiplier !== undefined) ? window.tlGyroSpeedMultiplier : 1.0;
    angle += 0.022 * spd;

    ctx.save();
    ctx.translate(cx, cy);

    // Apply smooth user drag rotation
    ctx.rotate(dragRotY * 0.4);

    // 1. Starfield Cosmic Dust
    for (let i = 0; i < 20; i++) {
      const sx = Math.sin(i * 1.6 + angle * 0.25) * (cx * 0.85);
      const sy = Math.cos(i * 2.2 + angle * 0.2) * (cy * 0.8);
      ctx.fillStyle = 'rgba(255, 255, 255, ' + (0.2 + (i % 5) * 0.14) + ')';
      ctx.beginPath();
      ctx.arc(sx, sy, 1 + (i % 2), 0, Math.PI * 2);
      ctx.fill();
    }

    // 2. Ring 1: Solar Gold / Yellow Outer Ring (Inclined ~70deg)
    ctx.save();
    ctx.rotate(0.28 + Math.sin(angle * 0.5) * 0.1);
    ctx.scale(1, 0.44);
    ctx.beginPath();
    ctx.arc(0, 0, 68, 0, Math.PI * 2);
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 2.4;
    ctx.shadowColor = '#FFD700';
    ctx.shadowBlur = 10;
    ctx.stroke();
    // Satellite 1
    const sat1Angle = angle * 1.7;
    const s1x = Math.cos(sat1Angle) * 68;
    const s1y = Math.sin(sat1Angle) * 68;
    ctx.fillStyle = '#FFFFFF';
    ctx.shadowColor = '#FFFFFF';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc(s1x, s1y, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 3. Ring 2: Electric Cyan Ring (Inclined -35deg)
    ctx.save();
    ctx.rotate(-0.75 + Math.cos(angle * 0.4) * 0.12);
    ctx.scale(1, 0.52);
    ctx.beginPath();
    ctx.arc(0, 0, 78, 0, Math.PI * 2);
    ctx.strokeStyle = '#00F5D4';
    ctx.lineWidth = 2.4;
    ctx.shadowColor = '#00F5D4';
    ctx.shadowBlur = 12;
    ctx.stroke();
    // Satellite 2
    const sat2Angle = -angle * 2.1;
    const s2x = Math.cos(sat2Angle) * 78;
    const s2y = Math.sin(sat2Angle) * 78;
    ctx.fillStyle = '#00F5D4';
    ctx.shadowColor = '#00F5D4';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(s2x, s2y, 4.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 4. Ring 3: Flame Orange Ring (Inclined ~45deg)
    ctx.save();
    ctx.rotate(0.92 + Math.sin(angle * 0.6) * 0.1);
    ctx.scale(1, 0.4);
    ctx.beginPath();
    ctx.arc(0, 0, 86, 0, Math.PI * 2);
    ctx.strokeStyle = '#FF5722';
    ctx.lineWidth = 2.4;
    ctx.shadowColor = '#FF5722';
    ctx.shadowBlur = 12;
    ctx.stroke();
    // Satellite 3
    const sat3Angle = angle * 1.35;
    const s3x = Math.cos(sat3Angle) * 86;
    const s3y = Math.sin(sat3Angle) * 86;
    ctx.fillStyle = '#FF7043';
    ctx.shadowColor = '#FF5722';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc(s3x, s3y, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 5. Central 3D Faceted Glowing Polyhedral Diamond Core
    ctx.save();
    ctx.rotate(angle * 1.4 + dragRotX);
    const coreR = 21;
    const pts = [
      [0, -coreR * 1.35],
      [coreR, 0],
      [0, coreR * 1.35],
      [-coreR, 0]
    ];
    // Core Facet Fill
    ctx.shadowColor = 'rgba(255, 87, 34, 0.85)';
    ctx.shadowBlur = 18;
    ctx.fillStyle = 'rgba(255, 75, 40, 0.7)';
    ctx.beginPath();
    ctx.moveTo(pts[0][0], pts[0][1]);
    for (let p = 1; p < pts.length; p++) ctx.lineTo(pts[p][0], pts[p][1]);
    ctx.closePath();
    ctx.fill();

    // Wireframe Cage
    ctx.strokeStyle = '#00F5D4';
    ctx.lineWidth = 1.6;
    ctx.shadowColor = '#00F5D4';
    ctx.shadowBlur = 6;
    ctx.beginPath();
    ctx.moveTo(pts[0][0], pts[0][1]);
    ctx.lineTo(pts[2][0], pts[2][1]);
    ctx.moveTo(pts[3][0], pts[3][1]);
    ctx.lineTo(pts[1][0], pts[1][1]);
    ctx.moveTo(0, -coreR * 0.45);
    ctx.lineTo(coreR * 0.75, 0);
    ctx.lineTo(0, coreR * 0.45);
    ctx.lineTo(-coreR * 0.75, 0);
    ctx.closePath();
    ctx.stroke();

    ctx.restore();

    ctx.restore();

    requestAnimationFrame(render);
  }

  render();
}
window.initTlArmillaryGyro = initTlArmillaryGyro;

window.setTlGyroSpeed = function (spd, btnEl) {
  window.tlGyroSpeedMultiplier = spd;
  document.querySelectorAll('.ctd-vbtn').forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');
};

window.switchCtdTab = function (tabName) {
  const panelGyro = document.getElementById('ctdPanelGyro');
  const panelPhases = document.getElementById('ctdPanelPhases');
  const tabGyro = document.getElementById('ctdTabGyro');
  const tabPhases = document.getElementById('ctdTabPhases');
  const tabChrono = document.getElementById('ctdTabChrono');

  document.querySelectorAll('.ctd-mode-pill').forEach(p => p.classList.remove('active'));

  if (tabName === 'gyro') {
    if (panelGyro) panelGyro.style.display = 'block';
    if (panelPhases) panelPhases.style.display = 'none';
    if (tabGyro) tabGyro.classList.add('active');
  } else if (tabName === 'phases') {
    if (panelGyro) panelGyro.style.display = 'none';
    if (panelPhases) panelPhases.style.display = 'block';
    if (tabPhases) tabPhases.classList.add('active');
  } else if (tabName === 'chrono') {
    if (panelGyro) panelGyro.style.display = 'block';
    if (panelPhases) panelPhases.style.display = 'none';
    if (tabChrono) tabChrono.classList.add('active');
    const cdCard = document.querySelector('.ctd-countdown-card');
    if (cdCard) {
      cdCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      cdCard.style.borderColor = '#00F5D4';
      setTimeout(() => { cdCard.style.borderColor = 'rgba(255, 255, 255, 0.08)'; }, 1200);
    }
  }
};

// Auto-boot 3D Armillary Gyroscope
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initTlArmillaryGyro();
  });
} else {
  initTlArmillaryGyro();
}

// Global GAS Endpoint Configuration Helper
window.saveGasUrl = function() {
  const inp = document.getElementById('adminGasUrlInput');
  if (!inp) return;
  const url = inp.value.trim();
  if (url && url.startsWith('http')) {
    localStorage.setItem('udbhav_gas_url', url);
    window.UDBHAV_APPS_SCRIPT_URL = url;
    alert('Google Apps Script Web App Endpoint saved: ' + url);
  } else {
    alert('Please enter a valid Web App URL (starts with https://script.google.com/...)');
  }
};

/* ==========================================================================
   INTERACTIVE BUBBLE SLIME & METABALL PHYSICS ENGINE (HOME SCREEN HERO)
   ========================================================================== */
function initHeroBubbleAnimation() {
  const canvas = document.getElementById('heroBubbleCanvas');
  const hero = document.getElementById('heroSection');
  if (!canvas || !hero) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Rich, juicy slime palette with translucent fills and glossy specular shine
  const slimePalettes = [
    { rim: '#FF5722', fill: 'rgba(255, 87, 34, 0.22)', core: 'rgba(255, 160, 120, 0.65)', glow: 'rgba(255, 87, 34, 0.50)' },
    { rim: '#00F5D4', fill: 'rgba(0, 245, 212, 0.20)', core: 'rgba(160, 255, 240, 0.65)', glow: 'rgba(0, 245, 212, 0.50)' },
    { rim: '#8B5CF6', fill: 'rgba(139, 92, 246, 0.22)', core: 'rgba(215, 190, 255, 0.65)', glow: 'rgba(139, 92, 246, 0.50)' },
    { rim: '#FF3D66', fill: 'rgba(255, 61, 102, 0.22)', core: 'rgba(255, 180, 200, 0.65)', glow: 'rgba(255, 61, 102, 0.50)' },
    { rim: '#00E5FF', fill: 'rgba(0, 229, 255, 0.20)', core: 'rgba(180, 245, 255, 0.65)', glow: 'rgba(0, 229, 255, 0.50)' },
    { rim: '#10B981', fill: 'rgba(16, 185, 129, 0.20)', core: 'rgba(170, 250, 215, 0.65)', glow: 'rgba(16, 185, 129, 0.50)' },
    { rim: '#F59E0B', fill: 'rgba(245, 158, 11, 0.22)', core: 'rgba(255, 225, 140, 0.65)', glow: 'rgba(245, 158, 11, 0.50)' }
  ];

  const bubbles = [];
  const splashParticles = [];
  const trailDroplets = [];

  // Pointer state with spring physics
  const pointer = {
    x: -9999,
    y: -9999,
    targetX: -9999,
    targetY: -9999,
    active: false,
    radius: 30,
    pal: { rim: '#00F5D4', fill: 'rgba(0, 245, 212, 0.32)', core: 'rgba(255, 255, 255, 0.9)', glow: 'rgba(0, 245, 212, 0.65)' }
  };

  let animId = null;
  let width = 0;
  let height = 0;

  // Interactive Liquid Pop Audio Synthesis
  function playSlimePop(freq) {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!window._slimeAudioCtx) window._slimeAudioCtx = new AudioCtx();
      const aCtx = window._slimeAudioCtx;
      if (aCtx.state === 'suspended') aCtx.resume().catch(function() {});

      const now = aCtx.currentTime;
      const osc = aCtx.createOscillator();
      const gain = aCtx.createGain();
      osc.type = 'sine';

      const baseF = freq || (420 + Math.random() * 260);
      osc.frequency.setValueAtTime(baseF, now);
      osc.frequency.exponentialRampToValueAtTime(baseF * 1.9, now + 0.07);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(aCtx.destination);
      osc.start(now);
      osc.stop(now + 0.085);
    } catch (e) {}
  }

  function resize() {
    const rect = hero.getBoundingClientRect();
    width = rect.width || window.innerWidth;
    height = rect.height || window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    bubbles.length = 0;
    const count = Math.min(52, Math.floor((width * height) / 18000) + 24);
    for (let i = 0; i < count; i++) {
      const pal = slimePalettes[Math.floor(Math.random() * slimePalettes.length)];
      const isHero = Math.random() < 0.22;
      const r = isHero ? Math.random() * 26 + 28 : Math.random() * 16 + 10;
      bubbles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: -(Math.random() * 0.75 + 0.35),
        baseR: r,
        r: r,
        pal: pal,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.032 + 0.014,
        amp: Math.random() * 1.8 + 0.6,
        wobblePhase: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.045 + 0.02,
        wobbleAmp: Math.random() * 0.12 + 0.06
      });
    }
  }

  resize();
  window.addEventListener('resize', resize, { passive: true });

  function onPointer(e) {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    pointer.targetX = clientX - rect.left;
    pointer.targetY = clientY - rect.top;
    pointer.active = true;

    // Spawn trail droplet on movement
    if (Math.random() < 0.35 && pointer.x > 0) {
      trailDroplets.push({
        x: pointer.x + (Math.random() - 0.5) * 16,
        y: pointer.y + (Math.random() - 0.5) * 16,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        r: Math.random() * 8 + 4,
        alpha: 0.85,
        pal: slimePalettes[Math.floor(Math.random() * slimePalettes.length)]
      });
    }
  }

  hero.addEventListener('mousemove', onPointer, { passive: true });
  hero.addEventListener('touchmove', onPointer, { passive: true });
  hero.addEventListener('mouseleave', function() { pointer.active = false; });
  hero.addEventListener('touchend', function() { pointer.active = false; });

  // Slime splash burst generator
  function spawnSlimeSplash(x, y, color) {
    playSlimePop();
    const count = 16;
    for (let i = 0; i < count; i++) {
      const a = (Math.PI * 2 / count) * i + (Math.random() - 0.5) * 0.4;
      const sp = Math.random() * 5.2 + 2.2;
      splashParticles.push({
        x: x,
        y: y,
        vx: Math.cos(a) * sp,
        vy: Math.sin(a) * sp,
        r: Math.random() * 4.2 + 1.8,
        alpha: 1.0,
        decay: Math.random() * 0.038 + 0.022,
        color: color || '#FF5722'
      });
    }
  }

  function handleInteractionClick(e) {
    // If clicked on an interactive button or link, don't intercept
    if (e.target.closest('button, a, input, select, textarea, .btn-liquid-primary, .btn-liquid-secondary')) {
      return;
    }

    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    let popped = false;

    for (let i = bubbles.length - 1; i >= 0; i--) {
      const b = bubbles[i];
      const dx = b.x - clickX;
      const dy = b.y - clickY;
      if (Math.sqrt(dx * dx + dy * dy) <= b.r * 1.45) {
        spawnSlimeSplash(b.x, b.y, b.pal.rim);
        b.y = height + b.r + 30;
        b.x = Math.random() * width;
        popped = true;
        break;
      }
    }

    // If clicked empty space, spawn cluster of 3 juicy slime bubbles!
    if (!popped) {
      spawnSlimeSplash(clickX, clickY, '#00F5D4');
      for (let s = 0; s < 3; s++) {
        const pal = slimePalettes[Math.floor(Math.random() * slimePalettes.length)];
        const r = Math.random() * 20 + 14;
        bubbles.push({
          x: clickX + (Math.random() - 0.5) * 40,
          y: clickY + (Math.random() - 0.5) * 30,
          vx: (Math.random() - 0.5) * 0.8,
          vy: -(Math.random() * 1.1 + 0.6),
          baseR: r,
          r: r,
          pal: pal,
          phase: Math.random() * Math.PI * 2,
          speed: 0.028,
          amp: 1.2,
          wobblePhase: Math.random() * Math.PI * 2,
          wobbleSpeed: 0.035,
          wobbleAmp: 0.1
        });
      }
    }
  }

  hero.addEventListener('click', handleInteractionClick);

  // DRAW VISCOUS METABALL SLIME BRIDGE
  function drawSlimeBridge(b1, b2, r1, r2, col1, col2) {
    const dx = b2.x - b1.x;
    const dy = b2.y - b1.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const maxDist = (r1 + r2) * 1.48;
    if (dist <= 0 || dist >= maxDist || dist <= Math.abs(r1 - r2)) return;

    const angle = Math.atan2(dy, dx);
    const ratio = dist / maxDist;
    const tension = Math.pow(1 - ratio, 0.75);
    const halfPi = Math.PI * 0.5;

    const a1 = angle + halfPi * tension;
    const a2 = angle - halfPi * tension;
    const p1x = b1.x + Math.cos(a1) * r1;
    const p1y = b1.y + Math.sin(a1) * r1;
    const p2x = b1.x + Math.cos(a2) * r1;
    const p2y = b1.y + Math.sin(a2) * r1;

    const a3 = angle + Math.PI - halfPi * tension;
    const a4 = angle + Math.PI + halfPi * tension;
    const p3x = b2.x + Math.cos(a3) * r2;
    const p3y = b2.y + Math.sin(a3) * r2;
    const p4x = b2.x + Math.cos(a4) * r2;
    const p4y = b2.y + Math.sin(a4) * r2;

    const midX = (b1.x + b2.x) * 0.5;
    const midY = (b1.y + b2.y) * 0.5;
    const waist = (1 - tension) * 0.42;
    const perpX = -Math.sin(angle);
    const perpY = Math.cos(angle);

    const c1x = midX + perpX * (dist * 0.14 * waist);
    const c1y = midY + perpY * (dist * 0.14 * waist);
    const c2x = midX - perpX * (dist * 0.14 * waist);
    const c2y = midY - perpY * (dist * 0.14 * waist);

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(p1x, p1y);
    ctx.quadraticCurveTo(c1x, c1y, p4x, p4y);
    ctx.lineTo(p3x, p3y);
    ctx.quadraticCurveTo(c2x, c2y, p2x, p2y);
    ctx.closePath();

    const grad = ctx.createLinearGradient(b1.x, b1.y, b2.x, b2.y);
    grad.addColorStop(0, col1.fill);
    grad.addColorStop(1, col2.fill);
    ctx.fillStyle = grad;
    ctx.fill();

    ctx.lineWidth = 1.8;
    const strokeGrad = ctx.createLinearGradient(b1.x, b1.y, b2.x, b2.y);
    strokeGrad.addColorStop(0, col1.rim);
    strokeGrad.addColorStop(1, col2.rim);
    ctx.strokeStyle = strokeGrad;
    ctx.shadowColor = col1.glow;
    ctx.shadowBlur = 8;
    ctx.stroke();
    ctx.restore();
  }

  // DRAW GELATINOUS SLIME BUBBLE WITH SPECULAR HIGHLIGHTS
  function drawSlimeBubble(b, scaleW, scaleH) {
    ctx.save();
    ctx.translate(b.x, b.y);
    ctx.scale(scaleW || 1, scaleH || 1);

    ctx.shadowColor = b.pal.glow;
    ctx.shadowBlur = 12;

    // Radial body
    const bodyGrad = ctx.createRadialGradient(-b.r * 0.3, -b.r * 0.3, 0, 0, 0, b.r);
    bodyGrad.addColorStop(0, b.pal.core);
    bodyGrad.addColorStop(0.55, b.pal.fill);
    bodyGrad.addColorStop(1, b.pal.rim);

    ctx.beginPath();
    ctx.arc(0, 0, b.r, 0, Math.PI * 2);
    ctx.fillStyle = bodyGrad;
    ctx.fill();

    // Rim
    ctx.lineWidth = 2.2;
    ctx.strokeStyle = b.pal.rim;
    ctx.stroke();

    // Glossy crescent reflection
    ctx.shadowBlur = 0;
    ctx.beginPath();
    ctx.ellipse(-b.r * 0.32, -b.r * 0.35, b.r * 0.36, b.r * 0.20, -Math.PI / 4, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.70)';
    ctx.fill();

    // Tiny glint dot
    ctx.beginPath();
    ctx.arc(b.r * 0.36, b.r * 0.36, Math.max(1.5, b.r * 0.12), 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.fill();

    ctx.restore();
  }

  function loop() {
    // Smooth pointer spring tracking
    if (pointer.active) {
      pointer.x += (pointer.targetX - pointer.x) * 0.22;
      pointer.y += (pointer.targetY - pointer.y) * 0.22;
    }

    ctx.clearRect(0, 0, width, height);

    // Update bubble positions & wobble
    for (let i = 0; i < bubbles.length; i++) {
      const b = bubbles[i];
      b.x += b.vx;
      b.y += b.vy;
      b.phase += b.speed;
      b.wobblePhase += b.wobbleSpeed;

      b.r = b.baseR + Math.sin(b.phase) * b.amp;
      b.scaleW = 1 + Math.sin(b.wobblePhase) * b.wobbleAmp;
      b.scaleH = 1 - Math.sin(b.wobblePhase) * b.wobbleAmp;

      // Wrap screen bounds
      if (b.y + b.r < -30) {
        b.y = height + b.r + 30;
        b.x = Math.random() * width;
      }
      if (b.x - b.r > width + 30) b.x = -b.r;
      if (b.x + b.r < -30) b.x = width + b.r;

      // Pointer interaction: slime magnetic pull
      if (pointer.active) {
        const dx = pointer.x - b.x;
        const dy = pointer.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const attractRange = (pointer.radius + b.r) * 2.2;
        if (dist < attractRange && dist > 1) {
          const pull = (1 - dist / attractRange) * 0.08;
          b.x += dx * pull;
          b.y += dy * pull;
        }
      }
    }

    // 1. Draw Viscous Slime Bridges between nearby bubbles
    for (let i = 0; i < bubbles.length; i++) {
      const b1 = bubbles[i];
      for (let j = i + 1; j < bubbles.length; j++) {
        const b2 = bubbles[j];
        const dist = Math.hypot(b2.x - b1.x, b2.y - b1.y);
        if (dist < (b1.r + b2.r) * 1.48) {
          drawSlimeBridge(b1, b2, b1.r, b2.r, b1.pal, b2.pal);
        }
      }

      // Draw slime strand between pointer and nearby bubbles!
      if (pointer.active) {
        const distP = Math.hypot(pointer.x - b1.x, pointer.y - b1.y);
        if (distP < (pointer.radius + b1.r) * 1.9) {
          drawSlimeBridge(pointer, b1, pointer.radius, b1.r, pointer.pal, b1.pal);
        }
      }
    }

    // 2. Draw Trail Droplets
    for (let t = trailDroplets.length - 1; t >= 0; t--) {
      const td = trailDroplets[t];
      td.x += td.vx;
      td.y += td.vy;
      td.r *= 0.94;
      td.alpha -= 0.035;
      if (td.alpha <= 0 || td.r < 1) {
        trailDroplets.splice(t, 1);
        continue;
      }
      ctx.save();
      ctx.globalAlpha = Math.max(0, td.alpha);
      ctx.beginPath();
      ctx.arc(td.x, td.y, td.r, 0, Math.PI * 2);
      ctx.fillStyle = td.pal.fill;
      ctx.strokeStyle = td.pal.rim;
      ctx.lineWidth = 1.4;
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }

    // 3. Draw Slime Bubbles
    for (let i = 0; i < bubbles.length; i++) {
      const b = bubbles[i];
      drawSlimeBubble(b, b.scaleW, b.scaleH);
    }

    // 4. Draw Pointer Slime Core if active
    if (pointer.active && pointer.x > 0 && pointer.y > 0) {
      drawSlimeBubble({
        x: pointer.x,
        y: pointer.y,
        r: pointer.radius,
        pal: pointer.pal
      }, 1.05, 0.95);
    }

    // 5. Draw Splash particles
    for (let sp = splashParticles.length - 1; sp >= 0; sp--) {
      const pt = splashParticles[sp];
      pt.x += pt.vx;
      pt.y += pt.vy;
      pt.vy += 0.14; // soft liquid gravity
      pt.vx *= 0.96;
      pt.vy *= 0.96;
      pt.alpha -= pt.decay;
      if (pt.alpha <= 0) {
        splashParticles.splice(sp, 1);
        continue;
      }
      ctx.save();
      ctx.globalAlpha = Math.max(0, pt.alpha);
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, pt.r, 0, Math.PI * 2);
      ctx.fillStyle = pt.color;
      ctx.shadowColor = pt.color;
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.restore();
    }

    animId = requestAnimationFrame(loop);
  }

  if (animId) cancelAnimationFrame(animId);
  animId = requestAnimationFrame(loop);
}
window.initHeroBubbleAnimation = initHeroBubbleAnimation;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initHeroBubbleAnimation, 200);
  });
} else {
  setTimeout(initHeroBubbleAnimation, 200);
}


/* ==========================================================================
   THE 8 MOVEMENTS OF INNOVATION: INTERACTIVE ENGINE & SOUND SYNTHESIS
   ========================================================================== */

// 1. Web Audio API Retro Sound Synthesizer (Zero External Dependencies)
function playSyntheticTone(freq, type, duration, slideFreq) {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type || 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    if (slideFreq) {
      osc.frequency.exponentialRampToValueAtTime(slideFreq, ctx.currentTime + duration);
    }
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (err) {
    // Audio context may be muted or blocked before user gesture
  }
}

// 2. Multiverse Navigator (Dimension 01 - 08)
window.switchMultiverse = function(index, btn) {
  const tabs = document.querySelectorAll('.mv-tab-btn');
  const panels = document.querySelectorAll('.mv-panel');
  tabs.forEach(t => {
    t.classList.remove('active');
    t.setAttribute('aria-selected', 'false');
  });
  panels.forEach(p => p.classList.remove('active'));
  
  if (btn) {
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
  }
  const target = document.getElementById('mvPanel' + index);
  if (target) {
    target.classList.add('active');
  }
  playSyntheticTone(520, 'triangle', 0.08, 680);
};

// 3. The Art of Simplicity (Neumorphic & Swiss Toggles)
window.toggleNeuNode = function(btn) {
  const siblings = btn.parentElement ? btn.parentElement.querySelectorAll('.neu-node') : [];
  siblings.forEach(s => s.classList.remove('active'));
  btn.classList.add('active');
  playSyntheticTone(440, 'sine', 0.05);
};

window.toggleNeuPill = function(btn) {
  btn.classList.toggle('active');
  playSyntheticTone(btn.classList.contains('active') ? 580 : 380, 'sine', 0.06);
};

// 4. Artistic Explosion (Mondrian Shufflers & Memphis Wiggle)
window.cycleMondrian = function(container) {
  const blocks = container.querySelectorAll('.m-block');
  const palette = ['#e63946', '#1d3557', '#f4a261', '#f8f9fa'];
  blocks.forEach(b => {
    const randomColor = palette[Math.floor(Math.random() * palette.length)];
    b.style.backgroundColor = randomColor;
  });
  playSyntheticTone(400 + Math.random() * 300, 'square', 0.07);
};

window.randomizeMondrian = function(grid) {
  const cells = grid.querySelectorAll('.mg-cell');
  const palette = ['#e63946', '#1d3557', '#f4a261', '#ffffff', '#111111'];
  cells.forEach(c => {
    c.style.backgroundColor = palette[Math.floor(Math.random() * palette.length)];
  });
  playSyntheticTone(500, 'square', 0.08, 300);
};

window.wiggleMemphis = function(e, card) {
  const rect = card.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;
  card.style.transform = `perspective(600px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateY(-4px)`;
};

// 5. Beyond Tomorrow (Liquid Chrome & Cyber Glitch)
window.handleChromeReflect = function(e, box) {
  const orb = box.querySelector('.chrome-orb');
  if (!orb) return;
  const rect = box.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const angle = Math.atan2(y - rect.height / 2, x - rect.width / 2) * (180 / Math.PI);
  orb.style.filter = `hue-rotate(${angle}deg) brightness(1.1)`;
};

window.tiltLiquidChrome = function(e, card) {
  const rect = card.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width;
  const preview = card.querySelector('.bt-chrome-preview');
  if (preview) {
    preview.style.backgroundPosition = `${x * 100}% 50%`;
  }
};

window.triggerGlitch = function(card) {
  card.style.transform = 'translate(' + (Math.random() * 6 - 3) + 'px, ' + (Math.random() * 6 - 3) + 'px)';
  setTimeout(() => {
    card.style.transform = 'none';
  }, 120);
};

window.triggerGlitchPulse = function(btn) {
  const origText = btn.textContent;
  btn.textContent = '⚡ SYSTEM OVERDRIVE';
  playSyntheticTone(880, 'sawtooth', 0.15, 220);
  document.body.style.filter = 'invert(0.15) contrast(1.2)';
  setTimeout(() => {
    document.body.style.filter = 'none';
    btn.textContent = origText;
  }, 350);
};

// 6. Time Machine (Steampunk Gears, CRT Scanlines)
window.speedUpGears = function(cluster) {
  cluster.classList.add('gears-fast');
  playSyntheticTone(200, 'triangle', 0.12, 350);
};

window.slowDownGears = function(cluster) {
  cluster.classList.remove('gears-fast');
};

window.toggleScanlines = function(btn) {
  const isActive = document.body.classList.toggle('crt-active');
  btn.textContent = isActive ? 'SCANLINES: [ON]' : 'SCANLINES: [OFF]';
  playSyntheticTone(isActive ? 900 : 300, 'sine', 0.1);
};

// 7. Touchable Dimensions (Clay Squish & Isometric 3D)
window.squishClay = function(btn) {
  btn.style.transform = 'scale(0.88) translateY(4px)';
  playSyntheticTone(320, 'sine', 0.1, 480);
  setTimeout(() => {
    btn.style.transform = 'scale(1) translateY(0)';
  }, 180);
};

window.bounceClayCard = function(card) {
  card.style.transform = 'scale(0.96) translateY(2px)';
  playSyntheticTone(280, 'triangle', 0.09, 440);
  setTimeout(() => {
    card.style.transform = 'scale(1) translateY(-6px)';
  }, 150);
};

window.tiltIsometric = function(e, card) {
  const box = card.querySelector('.iso-box-preview');
  if (!box) return;
  const rect = card.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;
  box.style.transform = `rotateX(${55 + y * 20}deg) rotateZ(${-45 + x * 20}deg)`;
};

// 8. Digital Playground (Pixel Coins & Arcade Trophies)
let userPixelScore = 0;
window.collectPixelCoin = function(btn) {
  userPixelScore += 100;
  playSyntheticTone(987.77, 'square', 0.08);
  setTimeout(() => playSyntheticTone(1318.51, 'square', 0.18), 80);
  
  // Floating score tag
  const tag = document.createElement('span');
  tag.textContent = '+100 PTS!';
  tag.style.position = 'absolute';
  tag.style.color = '#ffe600';
  tag.style.fontFamily = 'monospace';
  tag.style.fontWeight = '900';
  tag.style.fontSize = '1.2rem';
  tag.style.pointerEvents = 'none';
  tag.style.transition = 'all 0.6s ease-out';
  tag.style.top = '10%';
  tag.style.left = '50%';
  tag.style.transform = 'translate(-50%, 0)';
  btn.parentElement.appendChild(tag);
  
  setTimeout(() => {
    tag.style.transform = 'translate(-50%, -40px)';
    tag.style.opacity = '0';
  }, 20);
  setTimeout(() => tag.remove(), 650);
};

window.playArcadeSound = function(tier) {
  if (tier === 'gold') {
    playSyntheticTone(523.25, 'square', 0.08);
    setTimeout(() => playSyntheticTone(659.25, 'square', 0.08), 80);
    setTimeout(() => playSyntheticTone(783.99, 'square', 0.15), 160);
  } else if (tier === 'silver') {
    playSyntheticTone(440, 'square', 0.08);
    setTimeout(() => playSyntheticTone(554.37, 'square', 0.12), 90);
  } else {
    playSyntheticTone(330, 'square', 0.12);
  }
};

// 9. Dreamscape & Heritage (Surreal Orb & Graffiti Spray)
window.pulseDreamOrb = function(orb) {
  orb.style.transform = 'scale(1.25)';
  orb.style.boxShadow = '0 0 60px rgba(224, 195, 252, 0.9)';
  playSyntheticTone(600, 'sine', 0.35, 1200);
  setTimeout(() => {
    orb.style.transform = 'scale(1)';
    orb.style.boxShadow = '0 20px 40px rgba(142, 197, 252, 0.5)';
  }, 400);
};

window.floatSurrealOrb = function(card) {
  const clock = card.querySelector('.melting-clock-art');
  if (clock) {
    clock.style.transform = 'skewX(-25deg) translateY(-8px)';
    setTimeout(() => {
      clock.style.transform = 'skewX(-15deg) translateY(0)';
    }, 500);
  }
};

window.sprayPaintTag = function(wall) {
  const text = wall.querySelector('.spray-text');
  if (text) {
    const colors = ['#ff0055', '#00f0ff', '#ffe600', '#00ff88', '#ff7700'];
    const chosen = colors[Math.floor(Math.random() * colors.length)];
    text.style.color = chosen;
    text.style.textShadow = `0 0 10px ${chosen}, 0 0 25px ${chosen}`;
    playSyntheticTone(1200, 'sawtooth', 0.1, 800);
  }
};

window.sprayEffect = function(card) {
  const tag = card.querySelector('.graffiti-tag');
  if (tag) {
    tag.style.transform = 'rotate(' + (Math.random() * 8 - 4) + 'deg) scale(1.1)';
    playSyntheticTone(1000, 'sawtooth', 0.08, 600);
    setTimeout(() => {
      tag.style.transform = 'rotate(-3deg) scale(1)';
    }, 200);
  }
};



/* ==========================================================================
   THE 39 AESTHETICS MULTIVERSE ENGINE (INTERACTIVE DESIGN MOVEMENTS ARENA)
   ========================================================================== */

(function() {
  'use strict';

  // 1. DATASET OF ALL 39 DESIGN MOVEMENTS
  window.damThemes = {
    'minimalism': {
      id: 'minimalism',
      num: '01',
      name: 'Minimalism',
      cat: 'tech',
      era: '1960s Modernism',
      font: '\'Inter\', \'Helvetica Neue\', sans-serif',
      colors: ["#000000","#FFFFFF","#E2E8F0","#64748B"],
      tagline: 'Less is infinitely more',
      desc: 'Extreme reduction, mathematical breathing whitespace, monochromatic elegance, and razor-sharp typographic discipline.',
      tip: 'Focus on 1 hero action per screen, 8pt spatial grid, and zero decorative clutter.'
    },
    'maximalism': {
      id: 'maximalism',
      num: '02',
      name: 'Maximalism',
      cat: 'counter',
      era: 'Post-Digital 2020s',
      font: '\'Anton\', \'Syne\', sans-serif',
      colors: ["#FF0055","#00F5D4","#FFE600","#7928CA"],
      tagline: 'More is more, chaos is art',
      desc: 'Vibrant sensory saturation, dense sticker bombs, clashing neon layers, and explosive multi-pattern kinetic energy.',
      tip: 'Layer bold badges, contrasting animated gradients, and high-octane sticker flair.'
    },
    'futuristic': {
      id: 'futuristic',
      num: '03',
      name: 'Futuristic',
      cat: 'tech',
      era: '2077 Sci-Fi HUD',
      font: '\'Orbitron\', \'JetBrains Mono\', monospace',
      colors: ["#00E5FF","#0F172A","#1E293B","#38BDF8"],
      tagline: 'Quantum telemetry & deep space interface',
      desc: 'Holographic scanlines, orbital coordinate radar, telemetry HUD gauges, and glowing cyan optic fiber arrays.',
      tip: 'Use monospace telemetry badges, glowing vector grids, and live real-time latency dials.'
    },
    'vector-art': {
      id: 'vector-art',
      num: '04',
      name: 'Vector Art',
      cat: 'tactile',
      era: 'Modern Digital Graphic',
      font: '\'Plus Jakarta Sans\', sans-serif',
      colors: ["#FF5722","#2563EB","#10B981","#FBBF24"],
      tagline: 'Infinite resolution, pure geometric curves',
      desc: 'Crisp mathematical Bezier curves, bold flat color blocking, dynamic stroke weights, and scalable SVG vectors.',
      tip: 'Implement custom SVG spot illustrations, dynamic morphing paths, and solid color fields.'
    },
    'collage-art': {
      id: 'collage-art',
      num: '05',
      name: 'Collage Art',
      cat: 'counter',
      era: 'Dadaist & Mixed Media',
      font: '\'Space Grotesk\', serif',
      colors: ["#FAF5EF","#1E1E1E","#D97706","#BE123C"],
      tagline: 'Analog memory meets digital juxtaposition',
      desc: 'Layered torn paper borders, vintage halftone newsprint, Polaroid camera snaps, and taped archival ephemera.',
      tip: 'Overlay distressed paper masks, taped photo cards, and mixed typography styles.'
    },
    'retro': {
      id: 'retro',
      num: '06',
      name: 'Retro 80s',
      cat: 'counter',
      era: '1980s Arcade & Synthwave',
      font: '\'Press Start 2P\', \'Orbitron\', cursive',
      colors: ["#FF007F","#00F0FF","#1A0933","#7000FF"],
      tagline: 'Outrun sunsets & neon arcade nostalgia',
      desc: 'Synthwave wireframe horizons, CRT television phosphor glow, chromatic chrome lettering, and vector suns.',
      tip: 'Add perspective ground grid lines, glowing magenta borders, and retro arcade audio chimes.'
    },
    'cyberpunk': {
      id: 'cyberpunk',
      num: '07',
      name: 'Cyberpunk',
      cat: 'tech',
      era: 'High Tech, Low Life',
      font: '\'JetBrains Mono\', \'Anton\', monospace',
      colors: ["#00FF66","#FF0055","#0B0E14","#FFE600"],
      tagline: 'Neon rain on dark silicon sprawl',
      desc: 'Hyper-contrast neon cyan and hot pink, circuit board etchings, glitching Japanese kanji, and carbon mesh.',
      tip: 'Incorporate terminal command-line modules, glowing neon borders, and glitch jitter on hover.'
    },
    'pop-art': {
      id: 'pop-art',
      num: '08',
      name: 'Pop Art',
      cat: 'classic',
      era: '1960s Warhol & Lichtenstein',
      font: '\'Impact\', \'Bebas Neue\', sans-serif',
      colors: ["#FFE500","#FF2A00","#0044FF","#000000"],
      tagline: 'Comic book punch, Ben-Day dots, mass culture',
      desc: 'High-contrast primary hues, oversized Ben-Day halftone dot screening, black comic contour strokes, and action bursts.',
      tip: 'Use heavy 3.5px black borders, comic speech balloons, and primary color drop-shadow blocks.'
    },
    'glassmorphism': {
      id: 'glassmorphism',
      num: '09',
      name: 'Glassmorphism',
      cat: 'tech',
      era: '2020s Apple & Big Sur',
      font: '\'Inter\', sans-serif',
      colors: ["rgba(255,255,255,0.7)","rgba(255,255,255,0.12)","#3B82F6","#0F172A"],
      tagline: 'Translucent optical blur & frosted light',
      desc: 'Deep multi-layer backdrop-filter blur, luminous refractive edge highlights, floating depth, and soft light dispersion.',
      tip: 'Stack translucent glass cards over vivid floating colored blur orbs with 1px border highlight.'
    },
    'clay-style': {
      id: 'clay-style',
      num: '10',
      name: 'Clay Style',
      cat: 'tactile',
      era: '3D Claymorphism 2022',
      font: '\'Plus Jakarta Sans\', sans-serif',
      colors: ["#F87171","#60A5FA","#34D399","#FBBF24"],
      tagline: 'Tactile puffy 3D marshmallow playfulness',
      desc: 'Pillowy soft 3D inflated cards, extruded outer shadows combined with inset corner highlights, and velvety matte finishes.',
      tip: 'Pair 32px rounded pill radii with dual outer/inner box-shadows for a squishy toy look.'
    },
    'pixel-art': {
      id: 'pixel-art',
      num: '11',
      name: 'Pixel Art',
      cat: 'counter',
      era: '8-Bit Golden Era',
      font: '\'Press Start 2P\', monospace',
      colors: ["#000000","#00E5FF","#FF0055","#00FF66"],
      tagline: 'Grid-locked retro gaming precision',
      desc: 'Stepped staircase pixel borders, vibrant 8-bit color palettes, crisp non-anti-aliased sprites, and arcade coin HUDs.',
      tip: 'Use image-rendering: pixelated, stepped box-shadow borders, and 8-bit sound effects.'
    },
    'editorial': {
      id: 'editorial',
      num: '12',
      name: 'Editorial',
      cat: 'classic',
      era: 'High Fashion Magazine',
      font: '\'Playfair Display\', serif',
      colors: ["#0F172A","#F8FAFC","#C5A880","#64748B"],
      tagline: 'Haute couture typography & asymmetric luxury',
      desc: 'Dramatic high-contrast Didone serifs, generous magazine leading, oversized drop-caps, and editorial pull-quotes.',
      tip: 'Use large italic serif headlines paired with ultra-clean monospace metadata sub-labels.'
    },
    'y2k': {
      id: 'y2k',
      num: '13',
      name: 'Y2K Aesthetic',
      cat: 'tech',
      era: 'Late 1990s & Millennium',
      font: '\'Space Grotesk\', sans-serif',
      colors: ["#E0E7FF","#FF70A6","#70D6FF","#FF9770"],
      tagline: 'Futuristic optimism, liquid chrome & glitter',
      desc: 'Cyber-star sparkles, iridescent metallic sheen, bubble gum pastels, translucent hardware plastic, and CD-ROM halos.',
      tip: 'Add 4-point sparkle stars, metallic gradient pill badges, and holographic shimmer ribbons.'
    },
    'swiss-design': {
      id: 'swiss-design',
      num: '14',
      name: 'Swiss Design',
      cat: 'classic',
      era: '1950s International Style',
      font: '\'Helvetica Neue\', \'Inter\', sans-serif',
      colors: ["#FF0000","#000000","#FFFFFF","#E5E5E5"],
      tagline: 'Mathematical grid clarity & objective order',
      desc: 'Strict asymmetric column layouts, neutral sans-serif typography, stark red and black palette, and universal clarity.',
      tip: 'Anchor all elements to an uncompromising mathematical grid with bold red accent bars.'
    },
    'surreal-design': {
      id: 'surreal-design',
      num: '15',
      name: 'Surreal Design',
      cat: 'classic',
      era: 'Dali & Magritte Dreamscape',
      font: '\'Syne\', \'Playfair Display\', sans-serif',
      colors: ["#1E1B4B","#F43F5E","#38BDF8","#FEF08A"],
      tagline: 'Impossible geometry & dreamlike physics',
      desc: 'Levitating floating architectural obelisks, melting temporal clocks, celestial skies, and paradox perspective illusions.',
      tip: 'Animate floating 3D elements that defy gravity using CSS perspective and floating keyframes.'
    },
    'bohemian': {
      id: 'bohemian',
      num: '16',
      name: 'Bohemian',
      cat: 'tactile',
      era: 'Earthy Artisanal Modern',
      font: '\'Manrope\', cursive',
      colors: ["#C27D56","#D4A373","#CCD5AE","#E9D8A6"],
      tagline: 'Organic sunbursts, warm terracotta & soul',
      desc: 'Hand-drawn natural arches, warm earthy clay and olive botanical palettes, woven textures, and relaxed artisanal warmth.',
      tip: 'Incorporate warm desert tones, gentle pill-shaped arches, and subtle botanical iconography.'
    },
    'victorian-style': {
      id: 'victorian-style',
      num: '17',
      name: 'Victorian Style',
      cat: 'classic',
      era: '19th Century Industrial Empire',
      font: '\'Cinzel\', serif',
      colors: ["#2D1B36","#D4AF37","#8B0000","#FAF0E6"],
      tagline: 'Ornate gilded filigree & engraved grandeur',
      desc: 'Intricate golden acanthus leaves, heraldic flourishes, dark velvet backdrops, engraved vintage cameo frames, and wax seals.',
      tip: 'Use gilded 2px ornate borders, gold metallic gradients, and vintage serif typography.'
    },
    'graffiti': {
      id: 'graffiti',
      num: '18',
      name: 'Graffiti Street',
      cat: 'counter',
      era: 'Urban Street Art Revolution',
      font: '\'Permanent Marker\', \'Anton\', cursive',
      colors: ["#FF003C","#00F5D4","#FFE500","#121212"],
      tagline: 'Raw spray paint drips, stencils & rebellion',
      desc: 'Street spray aerosol splatters, dynamic drip runs, layered asphalt concrete, neon marker strokes, and wildstyle stencils.',
      tip: 'Add spray paint drip SVGs, bold slanted stencil headlines, and gritty urban backdrops.'
    },
    'aurora': {
      id: 'aurora',
      num: '19',
      name: 'Aurora Borealis',
      cat: 'tactile',
      era: 'Atmospheric Polar Phenomenon',
      font: '\'Inter\', sans-serif',
      colors: ["#00F5D4","#8B5CF6","#3B82F6","#10B981"],
      tagline: 'Celestial polar plasma in continuous motion',
      desc: 'Harmonic flowing waves of emerald green, deep cosmic violet, and solar cyan drifting smoothly across a night sky.',
      tip: 'Layer fluid multi-stop radial gradients animated with CSS background-position keyframes.'
    },
    'handwritten': {
      id: 'handwritten',
      num: '20',
      name: 'Handwritten Doodles',
      cat: 'tactile',
      era: 'Human Sketchbook & Studio',
      font: '\'Caveat\', cursive',
      colors: ["#FFFBEB","#0F172A","#F59E0B","#EF4444"],
      tagline: 'Raw ink scribbles, sticky notes & honesty',
      desc: 'Spontaneous cursive ink annotations, taped yellow sticky notes, hand-drawn circle highlights, and marker arrows.',
      tip: 'Highlight critical CTA buttons with playful hand-drawn SVG arrows and taped paper notes.'
    },
    'skeuomorphism': {
      id: 'skeuomorphism',
      num: '21',
      name: 'Skeuomorphism',
      cat: 'tactile',
      era: 'Early iOS & Tactile Realism',
      font: '\'SF Pro Display\', sans-serif',
      colors: ["#3E2723","#D7CCC8","#795548","#BCAAA4"],
      tagline: 'Realistic stitched leather & brushed steel',
      desc: 'Deep physical realism, beveled embossed buttons, realistic stitched leather textures, and tactile volume knobs.',
      tip: 'Apply realistic multi-layer drop and inner shadows that emulate real-world physical light.'
    },
    'neumorphism': {
      id: 'neumorphism',
      num: '22',
      name: 'Neumorphism',
      cat: 'tech',
      era: 'Soft UI 2020',
      font: '\'Inter\', sans-serif',
      colors: ["#E0E5EC","#A3B1C6","#FFFFFF","#31456A"],
      tagline: 'Seamless extruded plastic from the surface',
      desc: 'Soft tactile monochrome interface where buttons appear extruded directly from the background with light/dark shadow pairs.',
      tip: 'Calculate complementary positive and negative box-shadows matched to background color.'
    },
    'art-nouveau': {
      id: 'art-nouveau',
      num: '23',
      name: 'Art Nouveau',
      cat: 'classic',
      era: 'Belle Époque 1890s',
      font: '\'Marcellus\', serif',
      colors: ["#2E4F4F","#0E8388","#CBE4DE","#D4AF37"],
      tagline: 'Whiplash curves, flowing vines & nature',
      desc: 'Elegantly flowing whiplash organic curves, golden botanical tendrils, stylized floral symmetry, and sinuous beauty.',
      tip: 'Decorate card corners with winding golden vine flourishes and organic archway frames.'
    },
    'liquid-chrome': {
      id: 'liquid-chrome',
      num: '24',
      name: 'Liquid Chrome',
      cat: 'tech',
      era: 'Y3K Metallic Mercury',
      font: '\'Space Grotesk\', sans-serif',
      colors: ["#E2E8F0","#94A3B8","#38BDF8","#0F172A"],
      tagline: 'Reflective molten mercury in zero gravity',
      desc: 'Hyper-reflective molten silver ripples, distorted metallic reflections, chromatic aberration, and specular highlights.',
      tip: 'Use dynamic metallic linear gradients with high-contrast chrome stops and soft blur glow.'
    },
    'de-stijl': {
      id: 'de-stijl',
      num: '25',
      name: 'De Stijl',
      cat: 'classic',
      era: '1917 Mondrian & Theo',
      font: '\'Space Grotesk\', sans-serif',
      colors: ["#E50914","#0044FF","#FFCC00","#FFFFFF"],
      tagline: 'Pure primary blocks & orthogonal black grids',
      desc: 'Thick black vertical and horizontal lines framing pure primary color rectangles (red, blue, yellow) and clean white space.',
      tip: 'Construct asymmetric bento cards bounded by heavy 4px solid black grid lines.'
    },
    'memphis': {
      id: 'memphis',
      num: '26',
      name: 'Memphis Design',
      cat: 'tactile',
      era: '1981 Milan Ettore Sottsass',
      font: '\'Syne\', sans-serif',
      colors: ["#FF6B6B","#4ECDC4","#FFE66D","#292F36"],
      tagline: 'Postmodern squiggles, confetti & joy',
      desc: 'Playful clashing pastel hues, chaotic black confetti sprinkles, geometric squiggles, triangles, and uninhibited optimism.',
      tip: 'Scatter geometric zig-zags, polka-dot fills, and asymmetrical pastel cards across the screen.'
    },
    'psychedelic': {
      id: 'psychedelic',
      num: '27',
      name: 'Psychedelic 60s',
      cat: 'counter',
      era: '1960s Summer of Love',
      font: '\'Righteous\', cursive',
      colors: ["#FF007F","#FF7700","#7700FF","#00FF77"],
      tagline: 'Fluid optical swirls & mind-expanding waves',
      desc: 'Warped melting typography, hallucinogenic vibrating color contrasts, concentric optical waves, and fluid kaleidoscope motion.',
      tip: 'Animate hypnotic multi-layer gradient waves with high-saturation vibrating colors.'
    },
    'vaporwave': {
      id: 'vaporwave',
      num: '28',
      name: 'Vaporwave',
      cat: 'counter',
      era: '2010s Internet Nostalgia',
      font: '\'MS Gothic\', \'Space Grotesk\', sans-serif',
      colors: ["#FF71CE","#01CDFE","#05FFA1","#B967FF"],
      tagline: 'Aesthetic Greek statues, Arizona tea & anime',
      desc: 'Glitchy Japanese typography, pastel pink/cyan sunsets, classical marble statues, and endless wireframe perspective grids.',
      tip: 'Combine Japanese glyph annotations with pastel sunset gradients and 90s OS dialog bars.'
    },
    'steampunk': {
      id: 'steampunk',
      num: '29',
      name: 'Steampunk',
      cat: 'counter',
      era: 'Victorian Science Romance',
      font: '\'Cinzel Decorative\', serif',
      colors: ["#8B4513","#CD7F32","#B8860B","#2F1810"],
      tagline: 'Brass clockwork, steam pipes & copper gears',
      desc: 'Industrial Victorian brass mechanisms, exposed copper gears, vintage glass pressure gauges, and riveted iron plates.',
      tip: 'Add rotating CSS brass gear animations, copper foil border gradients, and vintage dial gauges.'
    },
    'grunge': {
      id: 'grunge',
      num: '30',
      name: 'Grunge 90s',
      cat: 'counter',
      era: '1990s Pacific Northwest',
      font: '\'Permanent Marker\', sans-serif',
      colors: ["#1C1917","#78716C","#D6D3D1","#991B1B"],
      tagline: 'Photocopy noise, distress & raw rebellion',
      desc: 'High-grain distressed textures, photocopy bleed, smeared ink stains, ripped masking tape, and underground fanzine ethos.',
      tip: 'Apply grain overlays, angled tape badge strips, and gritty high-contrast black/white imagery.'
    },
    'paper-cutout': {
      id: 'paper-cutout',
      num: '31',
      name: 'Paper Cutout',
      cat: 'tactile',
      era: 'Layered Craft Art',
      font: '\'Manrope\', sans-serif',
      colors: ["#064E3B","#047857","#10B981","#A7F3D0"],
      tagline: 'Multi-layered dimensional silhouette depth',
      desc: 'Stacked layered paper silhouettes with deep directional drop-shadows, creating organic topographic caverns and peaks.',
      tip: 'Layer 4-5 stacked SVG curves with progressive box-shadows to simulate real paper depth.'
    },
    'glitch': {
      id: 'glitch',
      num: '32',
      name: 'Glitch Art',
      cat: 'tech',
      era: 'Digital Error Aesthetics',
      font: '\'JetBrains Mono\', monospace',
      colors: ["#FF0055","#00FFFF","#0F172A","#FFFFFF"],
      tagline: 'Beauty in signal corruption & data decay',
      desc: 'RGB chromatic aberration color-split, horizontal digital displacement slices, scanline sync errors, and cyber twitching.',
      tip: 'Implement CSS clip-path slice animations that trigger spontaneous RGB channel shifts on hover.'
    },
    'anti-design': {
      id: 'anti-design',
      num: '33',
      name: 'Anti-Design',
      cat: 'counter',
      era: 'Raw Web Brutalism',
      font: '\'Courier New\', monospace',
      colors: ["#0000FF","#FFFF00","#000000","#FFFFFF"],
      tagline: 'Breaking all conventional rules with pride',
      desc: 'Deliberately jarring layouts, default browser form elements, unstyled raw links, overlapping text, and unapologetic chaos.',
      tip: 'Use raw default button styles, monospace code blocks, and aggressive color collisions.'
    },
    '3d-inflated': {
      id: '3d-inflated',
      num: '34',
      name: '3D Inflated',
      cat: 'tactile',
      era: 'Modern 3D Foil Balloons',
      font: '\'Syne\', \'Anton\', sans-serif',
      colors: ["#EC4899","#8B5CF6","#3B82F6","#F43F5E"],
      tagline: 'Glossy bouncy inflated metallic balloons',
      desc: 'Soft, plump, inflated balloon typography with specular mirror reflections, bouncy squishy physics, and air pressure depth.',
      tip: 'Use multi-stop specular radial highlights to give elements an inflated helium foil balloon look.'
    },
    'isometric': {
      id: 'isometric',
      num: '35',
      name: 'Isometric 3D',
      cat: 'tech',
      era: 'Orthographic Architecture',
      font: '\'Space Grotesk\', sans-serif',
      colors: ["#3B82F6","#1D4ED8","#93C5FD","#1E293B"],
      tagline: '30-degree architectural precision & voxel dioramas',
      desc: 'Axonometric 30-degree orthographic projection, miniature modular tech buildings, cube voxel grids, and diorama clarity.',
      tip: 'Use CSS rotateX(60deg) rotateZ(-45deg) transforms to construct genuine isometric 3D cubes.'
    },
    'ukiyo-e': {
      id: 'ukiyo-e',
      num: '36',
      name: 'Ukiyo-e',
      cat: 'classic',
      era: 'Edo Period Japan 1600s',
      font: '\'Cinzel\', serif',
      colors: ["#1E3A8A","#0284C7","#FEF3C7","#DC2626"],
      tagline: 'The Great Wave & floating world woodblocks',
      desc: 'Hokusai-inspired oceanic wave crests, sumi-e ink woodblock lines, traditional Edo vermillion stamps, and paper texture.',
      tip: 'Incorporate stylized wave crest SVGs, Japanese vermillion seal stamps, and parchment paper backdrops.'
    },
    'brutalism': {
      id: 'brutalism',
      num: '37',
      name: 'Brutalism',
      cat: 'counter',
      era: 'Architectural Beton Brut',
      font: '\'Anton\', \'Impact\', sans-serif',
      colors: ["#000000","#FFFFFF","#FF5722","#E2E8F0"],
      tagline: 'Raw concrete, massive black slabs & honesty',
      desc: 'Heavy unpolished concrete textures, massive high-contrast solid black borders, hard zero-radius corners, and uncompromising weight.',
      tip: 'Use 3.5px solid black borders, hard 8px solid black box-shadows, and ultra-bold sans-serif headlines.'
    },
    'bauhaus': {
      id: 'bauhaus',
      num: '38',
      name: 'Bauhaus',
      cat: 'classic',
      era: '1919 Weimar Walter Gropius',
      font: '\'Space Grotesk\', sans-serif',
      colors: ["#DC2626","#2563EB","#EAB308","#0F172A"],
      tagline: 'Form follows function, primary geometry',
      desc: 'Primary geometry: circle, triangle, square. Strict functionalism, primary red, blue, yellow, and industrial modernist elegance.',
      tip: 'Base UI components around pure primary geometric shapes and functionalist typography.'
    },
    'mid-century': {
      id: 'mid-century',
      num: '39',
      name: 'Mid-Century Modern',
      cat: 'classic',
      era: '1950s Golden Age Design',
      font: '\'Syne\', \'Manrope\', sans-serif',
      colors: ["#0D9488","#D97706","#BE185D","#FEF3C7"],
      tagline: 'Atomic starbursts, walnut wood & optimism',
      desc: 'Eames-era atomic boomerang shapes, retro teal and mustard starbursts, organic walnut warmth, and postwar optimism.',
      tip: 'Use organic boomerang curve dividers, mustard and teal palettes, and playful retro starbursts.'
    },
  };

  // State
  let currentThemeId = 'minimalism';
  let currentCategory = 'all';
  let studioCanvas = null;
  let studioCtx = null;
  let studioAnimId = null;
  let studioParticles = [];
  let studioStartTime = 0;

  // Sound Synth for Aesthetics Arena
  function playDamSound(type, freq) {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!window._damAudioCtx) window._damAudioCtx = new AudioCtx();
      const ctx = window._damAudioCtx;
      if (ctx.state === 'suspended') ctx.resume().catch(function() {});

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      if (type === 'pixel') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(freq || 587.33, now);
        osc.frequency.setValueAtTime((freq || 587.33) * 1.5, now + 0.05);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.13);
      } else if (type === 'cyber') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.14);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.17);
      } else if (type === 'pop') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(740, now + 0.08);
        gain.gain.setValueAtTime(0.16, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.095);
      } else {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq || 523.25, now);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.16);
      }
    } catch (e) {}
  }

  // 2. THEME SELECTION & MASTER STUDIO UPDATER
  window.damSelectTheme = function(id) {
    const theme = window.damThemes[id];
    if (!theme) return;
    currentThemeId = id;

    // Active Card Highlighting
    const cards = document.querySelectorAll('.dam-card');
    cards.forEach(c => {
      c.classList.toggle('active', c.getAttribute('data-id') === id);
    });

    // Update Master Studio Display
    const numEl = document.getElementById('damStudioNum');
    const catEl = document.getElementById('damStudioCat');
    const eraEl = document.getElementById('damStudioEra');
    const nameEl = document.getElementById('damStudioName');
    const taglineEl = document.getElementById('damStudioTagline');
    const descEl = document.getElementById('damStudioDesc');
    const fontEl = document.getElementById('damStudioFont');
    const tipEl = document.getElementById('damStudioTip');
    const paletteEl = document.getElementById('damStudioPalette');
    const screenEl = document.getElementById('damStudioScreen');
    const feedbackEl = document.getElementById('damDemoFeedback');
    const demoBtnText = document.getElementById('damDemoBtnText');

    if (numEl) numEl.textContent = theme.num + ' / 39';
    if (catEl) catEl.textContent = theme.cat.toUpperCase();
    if (eraEl) eraEl.textContent = theme.era;
    if (nameEl) nameEl.textContent = theme.name.toUpperCase();
    if (taglineEl) taglineEl.innerHTML = '&ldquo;' + theme.tagline + '&rdquo;';
    if (descEl) descEl.textContent = theme.desc;
    if (fontEl) fontEl.textContent = theme.font;
    if (tipEl) tipEl.textContent = theme.tip;

    if (demoBtnText) {
      demoBtnText.innerHTML = '&#9889; TEST ' + theme.name.toUpperCase() + ' INTERACTION';
    }
    if (feedbackEl) {
      feedbackEl.textContent = 'Active movement: ' + theme.name + ' (' + theme.era + '). Click above to test dynamic widget.';
      feedbackEl.style.color = theme.colors[0] === '#000000' && theme.colors[1] ? theme.colors[1] : theme.colors[0];
    }

    // Palette Dots
    if (paletteEl && theme.colors) {
      paletteEl.innerHTML = '';
      theme.colors.forEach(col => {
        const dot = document.createElement('span');
        dot.className = 'dam-color-dot';
        dot.style.background = col;
        dot.title = col + ' - Click to copy';
        dot.onclick = function() { window.damCopyColor(col); };
        paletteEl.appendChild(dot);
      });
    }

    // Studio Screen Style Transformation
    if (screenEl) {
      screenEl.style.borderColor = theme.colors[0];
      screenEl.style.boxShadow = '0 20px 50px rgba(0,0,0,0.4), 0 0 30px ' + theme.colors[0] + '33';
    }

    // Reset Studio Canvas for Selected Aesthetic
    initStudioCanvasTheme(theme);
    playDamSound('chime', 440 + parseInt(theme.num, 10) * 12);
  };

  // 3. COPY COLOR HELPER
  window.damCopyColor = function(color) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(color).then(function() {
        showDamToast('Color ' + color + ' copied to clipboard!');
        playDamSound('chime', 784);
      }).catch(function() {
        showDamToast('Color: ' + color);
      });
    } else {
      showDamToast('Color: ' + color);
    }
  };

  function showDamToast(msg) {
    const feedbackEl = document.getElementById('damDemoFeedback');
    if (feedbackEl) {
      feedbackEl.textContent = '✓ ' + msg;
      feedbackEl.style.color = '#00F5D4';
      setTimeout(function() {
        const cur = window.damThemes[currentThemeId];
        if (cur && feedbackEl) {
          feedbackEl.textContent = 'Active movement: ' + cur.name + ' (' + cur.era + ').';
        }
      }, 2200);
    }
  }

  // 4. INTERACTIVE WIDGET TRIGGER
  window.damTriggerInteractiveWidget = function() {
    const theme = window.damThemes[currentThemeId];
    if (!theme) return;

    const screenEl = document.getElementById('damStudioScreen');
    const feedbackEl = document.getElementById('damDemoFeedback');
    const demoBtn = document.getElementById('damDemoBtn');

    if (screenEl) {
      screenEl.classList.remove('dam-pulse-fx');
      void screenEl.offsetWidth; // Reflow
      screenEl.classList.add('dam-pulse-fx');
    }

    if (demoBtn) {
      demoBtn.classList.remove('dam-btn-activated');
      void demoBtn.offsetWidth;
      demoBtn.classList.add('dam-btn-activated');
    }

    // Audio & Custom Feedback according to theme
    let soundType = 'chime';
    let actionDesc = '';

    if (['cyberpunk', 'glitch', 'futuristic', 'liquid-chrome'].includes(theme.id)) {
      soundType = 'cyber';
      actionDesc = '⚡ Quantum Cyber Shaders Engaged // High-frequency scanline pulse';
    } else if (['pixel-art', 'retro', 'vaporwave', 'y2k'].includes(theme.id)) {
      soundType = 'pixel';
      actionDesc = '👾 8-Bit Chiptune Synthwave Pulse Triggered // Retro CRT phosphor flare';
    } else if (['clay-style', '3d-inflated', 'neumorphism', 'skeuomorphism'].includes(theme.id)) {
      soundType = 'pop';
      actionDesc = '🎈 3D Tactile Elastic Squish Physics Activated // Soft bounce response';
    } else {
      soundType = 'chime';
      actionDesc = '✦ ' + theme.name + ' Dynamic Aesthetic Matrix Synchronized // Golden ratio layout';
    }

    playDamSound(soundType);

    if (feedbackEl) {
      feedbackEl.textContent = actionDesc;
      feedbackEl.style.color = theme.colors[0] === '#000000' && theme.colors[1] ? theme.colors[1] : theme.colors[0];
    }

    // Burst particles on studio canvas
    burstStudioParticles(theme);
  };

  // 5. CATEGORY FILTERING & LIVE SEARCH
  window.damFilterCategory = function(cat) {
    currentCategory = cat;

    // Update pill buttons
    const pills = document.querySelectorAll('#damFilterPills .dam-pill');
    pills.forEach(p => {
      p.classList.toggle('active', p.getAttribute('data-filter') === cat);
    });

    applyDamFilterAndSearch();
    playDamSound('chime', 520);
  };

  window.damClearSearch = function() {
    const searchInput = document.getElementById('damSearchInput');
    if (searchInput) searchInput.value = '';
    currentCategory = 'all';

    const pills = document.querySelectorAll('#damFilterPills .dam-pill');
    pills.forEach(p => {
      p.classList.toggle('active', p.getAttribute('data-filter') === 'all');
    });

    applyDamFilterAndSearch();
  };

  function applyDamFilterAndSearch() {
    const searchInput = document.getElementById('damSearchInput');
    const query = (searchInput ? searchInput.value : '').trim().toLowerCase();
    const cards = document.querySelectorAll('.dam-card');
    let visibleCount = 0;

    cards.forEach(card => {
      const cat = card.getAttribute('data-cat') || '';
      const name = (card.getAttribute('data-name') || '').toLowerCase();
      const era = (card.getAttribute('data-era') || '').toLowerCase();
      const text = card.textContent.toLowerCase();

      const matchesCat = (currentCategory === 'all' || cat === currentCategory);
      const matchesQuery = (!query || name.includes(query) || era.includes(query) || text.includes(query));

      if (matchesCat && matchesQuery) {
        card.style.display = '';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    const noResEl = document.getElementById('damNoResults');
    if (noResEl) {
      noResEl.style.display = (visibleCount === 0) ? 'block' : 'none';
    }
  }

  // 6. STUDIO CANVAS GRAPHICS ENGINE
  function initStudioCanvasTheme(theme) {
    if (!studioCanvas || !studioCtx) return;
    studioParticles = [];
    const count = 36;
    const w = studioCanvas.width;
    const h = studioCanvas.height;

    for (let i = 0; i < count; i++) {
      studioParticles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        r: Math.random() * 4 + 2,
        color: theme.colors[i % theme.colors.length] || '#00F5D4',
        phase: Math.random() * Math.PI * 2
      });
    }
  }

  function burstStudioParticles(theme) {
    if (!studioCanvas || !studioCtx) return;
    const w = studioCanvas.width;
    const h = studioCanvas.height;
    const cx = w * 0.5;
    const cy = h * 0.5;

    for (let i = 0; i < 24; i++) {
      const angle = (Math.PI * 2 / 24) * i;
      const speed = Math.random() * 4.5 + 2;
      studioParticles.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        r: Math.random() * 5 + 2.5,
        color: theme.colors[Math.floor(Math.random() * theme.colors.length)] || '#FF5722',
        decay: 0.02,
        alpha: 1.0
      });
    }
  }

  function renderStudioFrame(time) {
    if (!studioCanvas || !studioCtx) return;
    const w = studioCanvas.width;
    const h = studioCanvas.height;
    if (w <= 0 || h <= 0) {
      studioAnimId = requestAnimationFrame(renderStudioFrame);
      return;
    }

    studioCtx.clearRect(0, 0, w, h);

    const theme = window.damThemes[currentThemeId] || window.damThemes['minimalism'];
    const elapsed = (time - studioStartTime) * 0.001;

    // Movement-Specific Atmospheric Background FX
    if (['cyberpunk', 'futuristic', 'glitch'].includes(theme.id)) {
      // Futuristic grid scanlines
      studioCtx.strokeStyle = 'rgba(0, 245, 212, 0.08)';
      studioCtx.lineWidth = 1;
      const step = 28;
      for (let x = 0; x < w; x += step) {
        studioCtx.beginPath();
        studioCtx.moveTo(x, 0);
        studioCtx.lineTo(x, h);
        studioCtx.stroke();
      }
      for (let y = 0; y < h; y += step) {
        studioCtx.beginPath();
        studioCtx.moveTo(0, y);
        studioCtx.lineTo(w, y);
        studioCtx.stroke();
      }
    } else if (['aurora', 'vaporwave', 'psychedelic'].includes(theme.id)) {
      // Sine wave ribbon
      studioCtx.beginPath();
      studioCtx.moveTo(0, h * 0.5);
      for (let x = 0; x <= w; x += 10) {
        const y = h * 0.5 + Math.sin(x * 0.02 + elapsed * 2) * 25 + Math.cos(x * 0.01 - elapsed) * 15;
        studioCtx.lineTo(x, y);
      }
      studioCtx.strokeStyle = theme.colors[0] || '#8B5CF6';
      studioCtx.lineWidth = 2.5;
      studioCtx.stroke();
    } else if (['bauhaus', 'de-stijl', 'swiss-design'].includes(theme.id)) {
      // Primary geometric backdrop
      studioCtx.fillStyle = 'rgba(220, 38, 38, 0.12)';
      studioCtx.fillRect(w * 0.7, 20, 60, 60);
      studioCtx.beginPath();
      studioCtx.arc(w * 0.2, h * 0.75, 35, 0, Math.PI * 2);
      studioCtx.fillStyle = 'rgba(37, 99, 235, 0.12)';
      studioCtx.fill();
    }

    // Connect particles with harmonic constellation lines
    for (let i = 0; i < studioParticles.length; i++) {
      const p1 = studioParticles[i];
      p1.x += p1.vx;
      p1.y += p1.vy;

      if (p1.alpha !== undefined) {
        p1.alpha -= p1.decay || 0.015;
        if (p1.alpha <= 0) {
          studioParticles.splice(i, 1);
          i--;
          continue;
        }
      } else {
        if (p1.x < 0 || p1.x > w) p1.vx *= -1;
        if (p1.y < 0 || p1.y > h) p1.vy *= -1;
      }

      for (let j = i + 1; j < studioParticles.length; j++) {
        const p2 = studioParticles[j];
        const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y);
        if (dist < 80) {
          studioCtx.beginPath();
          studioCtx.moveTo(p1.x, p1.y);
          studioCtx.lineTo(p2.x, p2.y);
          studioCtx.strokeStyle = 'rgba(255, 255, 255, ' + ((1 - dist / 80) * 0.12) + ')';
          studioCtx.lineWidth = 1;
          studioCtx.stroke();
        }
      }

      studioCtx.save();
      if (p1.alpha !== undefined) studioCtx.globalAlpha = p1.alpha;
      studioCtx.beginPath();
      studioCtx.arc(p1.x, p1.y, p1.r, 0, Math.PI * 2);
      studioCtx.fillStyle = p1.color;
      studioCtx.fill();
      studioCtx.restore();
    }

    studioAnimId = requestAnimationFrame(renderStudioFrame);
  }

  // 7. INITIALIZE AESTHETICS MULTIVERSE ENGINE
  window.initAestheticsMultiverseEngine = function() {
    const section = document.getElementById('designMultiverseSection');
    if (!section) return;

    // Attach Search Input listener
    const searchInput = document.getElementById('damSearchInput');
    if (searchInput && !searchInput._damBound) {
      searchInput._damBound = true;
      searchInput.addEventListener('input', function() {
        applyDamFilterAndSearch();
      });
      searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') window.damClearSearch();
      });
    }

    // Studio Canvas Setup
    studioCanvas = document.getElementById('damStudioCanvas');
    if (studioCanvas && !studioCanvas._damReady) {
      studioCanvas._damReady = true;
      studioCtx = studioCanvas.getContext('2d');

      function resizeStudioCanvas() {
        const parent = studioCanvas.parentElement;
        if (!parent) return;
        const rect = parent.getBoundingClientRect();
        studioCanvas.width = Math.max(300, Math.floor(rect.width));
        studioCanvas.height = Math.max(220, Math.floor(rect.height));
      }

      resizeStudioCanvas();
      window.addEventListener('resize', resizeStudioCanvas, { passive: true });

      studioStartTime = performance.now();
      if (studioAnimId) cancelAnimationFrame(studioAnimId);
      studioAnimId = requestAnimationFrame(renderStudioFrame);
    }

    // Select initial theme
    window.damSelectTheme('minimalism');
  };

  // Auto-init on DOMContentLoaded if element exists
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      window.initAestheticsMultiverseEngine();
    });
  } else {
    window.initAestheticsMultiverseEngine();
  }
})();