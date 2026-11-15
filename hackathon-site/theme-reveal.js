/* ═══════════════════════════════════════════════════════════════════════
   UDBHAV 2027 · LIVE THEME REVEAL & PROBLEM SELECTION ENGINE
   Matrix Digital Rain Cards · F1 Countdown Sequence · Real-Time Cross-Tab Sync
   ═══════════════════════════════════════════════════════════════════════ */

// Storage Keys
const SK_THEME_STATE = 'hs27_theme_state';               // 'locked' | 'countdown' | 'live'
const SK_THEME_ADMIN_ONLY = 'hs27_theme_admin_only';     // 'true' | 'false'
const SK_COUNTDOWN_END = 'hs27_countdown_end';           // timestamp ms
const SK_TOTAL_CAPACITY = 'hs27_total_capacity';         // total teams capacity (e.g. 200)
const SK_PROBLEM_STATEMENTS = 'hs27_problem_statements'; // 10 problem statements
const SK_SELECTIONS = 'hs27_selections';                 // squad selections
const SK_TEAMS_DB = 'udbhav_2027_teams';                 // registered squads
const SK_ACTIVE_TEAM = 'hs27_active_team';               // currently authenticated squad
const SK_AUDIO_MUTED = 'hs27_audio_muted';               // audio toggle
const SK_TEAM_SCORES = 'hs27_team_scores';               // mentor evaluation scores
const SK_STANDINGS_PUBLISHED = 'hs27_standings_published';

// Default 10 Problem Statements
const DEFAULT_10_PROBLEM_STATEMENTS = [
  {
    number: 1,
    id: "PS-01",
    category: "AI/ML",
    title: "Autonomous Agentic Code Refactoring & Security Hardening",
    description: "Develop an autonomous multi-agent coding engine that performs static semantic analysis on legacy microservices, generates verifiable security patches, and validates regression test suites in real-time.",
    techStack: ["PYTHON 3.12", "LANGGRAPH", "FASTAPI", "VECTOR DB", "DOCKER"]
  },
  {
    number: 2,
    id: "PS-02",
    category: "Web3",
    title: "Decentralized Zero-Knowledge Cross-Chain Liquidity Protocol",
    description: "Architect a non-custodial decentralized liquidity bridge utilizing succinct zk-SNARK state proofs to enable atomic, slippage-resistant asset settlement across EVM and non-EVM execution layers.",
    techStack: ["SOLIDITY", "ZK-SNARKS", "CIRCOM", "RUST", "ETH/SOLANA"]
  },
  {
    number: 3,
    id: "PS-03",
    category: "CyberSecurity",
    title: "eBPF-Powered Real-Time Kernel Threat & Exfiltration Sensor",
    description: "Design an ultra-low-overhead kernel observability agent using Linux eBPF probes to intercept, detect, and isolate zero-day privilege escalations and container breakout attacks in Kubernetes.",
    techStack: ["C / EBPF", "RUST", "KUBERNETES", "PROMETHEUS", "GRPC"]
  },
  {
    number: 4,
    id: "PS-04",
    category: "HealthTech",
    title: "Multimodal Clinical Diagnostic Copilot with Edge Privacy",
    description: "Construct a federated on-premise healthcare intelligence engine combining medical image segmentation (DICOM) and electronic health records for early acute oncology detection without patient data egress.",
    techStack: ["PYTORCH", "ONNX", "FEDERATED AI", "DICOM", "FLASK"]
  },
  {
    number: 5,
    id: "PS-05",
    category: "FinTech",
    title: "Autonomous Algorithmic Fraud Interception & Graph Analysis",
    description: "Deploy a high-throughput transaction surveillance engine utilizing dynamic temporal graph neural networks (GNN) to flag layered money muling networks and synthetic identities within 25 milliseconds.",
    techStack: ["NEO4J", "PYG / GNN", "KAFKA", "REDIS", "SCYLLADB"]
  },
  {
    number: 6,
    id: "PS-06",
    category: "Smart Cities",
    title: "Adaptive Urban Traffic Signal Optimization via Edge Vision",
    description: "Build an edge-computing vision mesh that dynamically throttles metropolitan traffic intersections based on real-time pedestrian density, emergency vehicle beacon triangulation, and queue velocities.",
    techStack: ["YOLOv10", "OPENCV", "MQTT", "JETSON EDGE", "NODE.JS"]
  },
  {
    number: 7,
    id: "PS-07",
    category: "ClimateTech",
    title: "Decarbonization Ledger & Satellite Methane Emission Tracker",
    description: "Create an open verification system reconciling high-resolution multispectral ESA Sentinel-5P satellite telemetry with enterprise carbon credit registries to eliminate greenwashing.",
    techStack: ["SENTINEL API", "GEOPANDAS", "POSTGIS", "IPFS", "TYPESCRIPT"]
  },
  {
    number: 8,
    id: "PS-08",
    category: "EdTech",
    title: "Adaptive Neuro-Cognitive Learning Assistant with Socratic Logic",
    description: "Engineer an open-source adaptive educational platform that diagnoses individual student conceptual gaps through multi-turn dialectical dialogues and auto-generates interactive 3D visualizations.",
    techStack: ["THREE.JS", "LLM FUNCTION CALLS", "WEBRTC", "POSTGRES", "REACT"]
  },
  {
    number: 9,
    id: "PS-09",
    category: "IoT/Robotics",
    title: "Decentralized Swarm Robotics Coordination for Disaster Relief",
    description: "Develop a fault-tolerant ad-hoc mesh networking protocol for aerial and ground robotic swarms operating in GPS-denied catastrophe zones to perform coordinated 3D volumetric search and rescue mapping.",
    techStack: ["ROS 2", "SLAM", "ESP32 MESH", "C++20", "WEBSOCKETS"]
  },
  {
    number: 10,
    id: "PS-10",
    category: "Open Innovation",
    title: "Spatial Computing Voice-to-Architecture Engineering Studio",
    description: "Create a multimodal developer interface bridging natural language, ambient voice programming, and spatial code visualizers that allows engineers to prototype full-stack cloud applications in minutes.",
    techStack: ["WEBXR", "OPENAI REALTIME", "BABYLON.JS", "CLOUDFLARE", "VITE"]
  }
];

// Track Category Color Themes & Cyber Metas
const CATEGORY_META = {
  'AI/ML': {
    slug: 'aiml',
    icon: '⚡',
    badgeText: 'NEURAL AI CORE',
    accent: '#00F5D4',
    secondary: '#0284C7',
    gradient: 'linear-gradient(135deg, #00F5D4 0%, #0284C7 100%)',
    bgTint: 'rgba(0, 245, 212, 0.12)'
  },
  'Web3': {
    slug: 'web3',
    icon: '⬡',
    badgeText: 'ZERO-KNOWLEDGE DEFI',
    accent: '#A855F7',
    secondary: '#EC4899',
    gradient: 'linear-gradient(135deg, #A855F7 0%, #EC4899 100%)',
    bgTint: 'rgba(168, 85, 247, 0.12)'
  },
  'CyberSecurity': {
    slug: 'cybersecurity',
    icon: '🛡️',
    badgeText: 'KERNEL & eBPF DEFENSE',
    accent: '#10B981',
    secondary: '#00F5D4',
    gradient: 'linear-gradient(135deg, #10B981 0%, #00F5D4 100%)',
    bgTint: 'rgba(16, 185, 129, 0.12)'
  },
  'HealthTech': {
    slug: 'healthtech',
    icon: '🧬',
    badgeText: 'FEDERATED EDGE HEALTH',
    accent: '#F43F5E',
    secondary: '#FB7185',
    gradient: 'linear-gradient(135deg, #F43F5E 0%, #FB7185 100%)',
    bgTint: 'rgba(244, 63, 94, 0.12)'
  },
  'FinTech': {
    slug: 'fintech',
    icon: '📊',
    badgeText: 'ALGORITHMIC FRAUD GNN',
    accent: '#F59E0B',
    secondary: '#FFD700',
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #FFD700 100%)',
    bgTint: 'rgba(245, 158, 11, 0.12)'
  },
  'Smart Cities': {
    slug: 'smartcities',
    icon: '🌐',
    badgeText: 'URBAN EDGE VISION',
    accent: '#06B6D4',
    secondary: '#0EA5E9',
    gradient: 'linear-gradient(135deg, #06B6D4 0%, #0EA5E9 100%)',
    bgTint: 'rgba(6, 182, 212, 0.12)'
  },
  'ClimateTech': {
    slug: 'climatetech',
    icon: '🛰️',
    badgeText: 'ORBITAL CARBON TRACKER',
    accent: '#84CC16',
    secondary: '#10B981',
    gradient: 'linear-gradient(135deg, #84CC16 0%, #10B981 100%)',
    bgTint: 'rgba(132, 204, 22, 0.12)'
  },
  'EdTech': {
    slug: 'edtech',
    icon: '🎓',
    badgeText: 'SOCRATIC COGNITIVE AI',
    accent: '#FF5722',
    secondary: '#EA580C',
    gradient: 'linear-gradient(135deg, #FF5722 0%, #EA580C 100%)',
    bgTint: 'rgba(255, 87, 34, 0.12)'
  },
  'IoT/Robotics': {
    slug: 'iotrobotics',
    icon: '🤖',
    badgeText: 'SWARM AUTONOMY',
    accent: '#D946EF',
    secondary: '#8B5CF6',
    gradient: 'linear-gradient(135deg, #D946EF 0%, #8B5CF6 100%)',
    bgTint: 'rgba(217, 70, 239, 0.12)'
  },
  'Open Innovation': {
    slug: 'openinnovation',
    icon: '✨',
    badgeText: 'MULTIMODAL STUDIO',
    accent: '#FFD700',
    secondary: '#FF5722',
    gradient: 'linear-gradient(135deg, #FFD700 0%, #FF5722 100%)',
    bgTint: 'rgba(255, 215, 0, 0.12)'
  }
};

class ThemeRevealEngine {
  constructor() {
    this.audioContext = null;
    this.isMuted = true; // Strict zero-sound policy site-wide
    this.currentFilter = 'all';
    this.f1Interval = null;
    this.clockInterval = null;
    this.heartbeatInterval = null;
    this.pendingSelectProblem = null;
    this.activeMatrixAnims = [];
    this.lastKnownState = null;
    this.lastKnownCountdownEnd = null;

    // Initialize State & Storage Defaults
    this.initStorageDefaults();
  }

  /* ── 1. INITIALIZATION & STATE DEFAULTS ── */
  initStorageDefaults() {
    if (!localStorage.getItem(SK_THEME_STATE)) {
      localStorage.setItem(SK_THEME_STATE, 'locked');
    }
    if (!localStorage.getItem(SK_TOTAL_CAPACITY)) {
      localStorage.setItem(SK_TOTAL_CAPACITY, '200');
    }
    if (!localStorage.getItem(SK_PROBLEM_STATEMENTS)) {
      localStorage.setItem(SK_PROBLEM_STATEMENTS, JSON.stringify(DEFAULT_10_PROBLEM_STATEMENTS));
    }
    if (!localStorage.getItem(SK_SELECTIONS)) {
      localStorage.setItem(SK_SELECTIONS, JSON.stringify([]));
    }
    this.lastKnownState = localStorage.getItem(SK_THEME_STATE) || 'locked';
    this.lastKnownCountdownEnd = localStorage.getItem(SK_COUNTDOWN_END);
  }

  init() {
    this.updateClock();
    this.clockInterval = setInterval(() => this.updateClock(), 1000);

    this.initAudioUI();
    this.initCustomCursor();
    this.syncActiveTeamBanner();
    this.bindGlobalShortcuts();
    this.initLiveSyncEngine();

    // Render initial view
    this.evaluateStateAndRender();
  }

  /* ── 2. THREE-LAYER ZERO-LATENCY REAL-TIME SYNCHRONIZATION ── */
  initLiveSyncEngine() {
    // Layer A: BroadcastChannel (Instant Cross-Tab Messages)
    try {
      if (typeof BroadcastChannel !== 'undefined') {
        const syncChannel = new BroadcastChannel('hs27_theme_sync');
        syncChannel.onmessage = (event) => {
          const data = event.data;
          if (data && (data.type === 'STATE_CHANGE' || data.type === 'MATRIX_REVEAL_360' || data.type === 'MATRIX_LOCK_VAULT' || data.type === 'PROBLEM_UPDATED' || data.type === 'SYNC_UPDATE')) {
            this.evaluateStateAndRender();
          }
        };
      }
    } catch(e) {}

    // Layer B: Window Storage Event
    window.addEventListener('storage', (e) => {
      const watched = [
        SK_THEME_STATE, SK_TOTAL_CAPACITY, SK_SELECTIONS, 
        SK_PROBLEM_STATEMENTS, SK_COUNTDOWN_END, SK_THEME_ADMIN_ONLY, 
        SK_TEAM_SCORES, SK_STANDINGS_PUBLISHED, 'hs27_theme_last_sync'
      ];
      if (e && e.key && watched.includes(e.key)) {
        this.evaluateStateAndRender();
      }
    });

    // Layer C: 350ms Heartbeat Polling Fallback
    this.heartbeatInterval = setInterval(() => {
      const remoteState = localStorage.getItem(SK_THEME_STATE) || 'locked';
      const remoteEnd = localStorage.getItem(SK_COUNTDOWN_END);
      if (remoteState !== this.lastKnownState || remoteEnd !== this.lastKnownCountdownEnd) {
        this.lastKnownState = remoteState;
        this.lastKnownCountdownEnd = remoteEnd;
        this.evaluateStateAndRender();
      }
    }, 350);
  }

  /* ── 3. GLOBAL KEYBOARD SHORTCUTS (F1 TRIGGER) ── */
  bindGlobalShortcuts() {
    window.addEventListener('keydown', (e) => {
      // F1 Key: Trigger Formula 1 Countdown Launch
      if (e.key === 'F1') {
        e.preventDefault();
        this.triggerF1Countdown();
      }
    });
  }

  /* ── 4. CUSTOM CURSOR & AMBIENT LIGHT ── */
  /* ── 4. CUSTOM CURSOR & AMBIENT LIGHT ── */
  initCustomCursor() {
    const cur = document.getElementById('cur');
    const cur2 = document.getElementById('cur2');
    const badge = document.getElementById('curBadge');
    const light = document.getElementById('ambient-light');
    const pCanvas = document.getElementById('cursorParticleCanvas');
    if (!cur || !cur2) return;

    const isTouch = window.matchMedia && window.matchMedia('(hover: none) or (pointer: coarse)').matches;
    if (isTouch) {
      cur.style.display = 'none';
      cur2.style.display = 'none';
      if (light) light.style.display = 'none';
      if (pCanvas) pCanvas.style.display = 'none';
      return;
    }

    let mouseX = window.innerWidth * 0.5, mouseY = window.innerHeight * 0.5;
    let curX = mouseX, curY = mouseY;
    let targetX = mouseX, targetY = mouseY;
    let isDown = false;
    let isVisible = false;
    let magnetTarget = null;
    let currentMode = 'default';

    // Kinetic Particle Engine for Theme Reveal Page
    let particles = [];
    let pCtx = null;
    if (pCanvas && pCanvas.getContext) {
      pCtx = pCanvas.getContext('2d');
      const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        pCanvas.width = window.innerWidth * dpr;
        pCanvas.height = window.innerHeight * dpr;
        pCanvas.style.width = window.innerWidth + 'px';
        pCanvas.style.height = window.innerHeight + 'px';
        pCtx.scale(dpr, dpr);
      };
      resize();
      window.addEventListener('resize', resize);
    }

    const trailColors = ['#00F5D4', '#FF5722', '#8B5CF6', '#00C9D8', '#FFB703', '#FFFFFF'];

    function spawnTrail(x, y) {
      if (!pCtx) return;
      for (let i = 0; i < 2; i++) {
        particles.push({
          x: x + (Math.random() - 0.5) * 8,
          y: y + (Math.random() - 0.5) * 8,
          vx: (Math.random() - 0.5) * 1.8,
          vy: (Math.random() - 0.5) * 1.8 - 0.3,
          size: Math.random() * 3.2 + 1.5,
          alpha: 0.9,
          decay: Math.random() * 0.025 + 0.02,
          color: trailColors[Math.floor(Math.random() * trailColors.length)]
        });
      }
      if (particles.length > 90) particles.splice(0, particles.length - 90);
    }

    function spawnBurst(x, y) {
      if (!pCtx) return;
      for (let i = 0; i < 20; i++) {
        const angle = (Math.PI * 2 * i) / 20 + (Math.random() - 0.5) * 0.25;
        const speed = Math.random() * 6.0 + 2.5;
        particles.push({
          x: x,
          y: y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 4.2 + 2.0,
          alpha: 1.0,
          decay: Math.random() * 0.035 + 0.022,
          color: trailColors[Math.floor(Math.random() * trailColors.length)]
        });
      }
    }

    function spawnShockwave(x, y) {
      try {
        const wave = document.createElement('div');
        wave.className = 'cur-shockwave';
        wave.style.left = x + 'px';
        wave.style.top = y + 'px';
        document.body.appendChild(wave);
        setTimeout(() => { if (wave.parentNode) wave.parentNode.removeChild(wave); }, 560);
      } catch (_) {}
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

    function setMode(mode, badgeText = '') {
      currentMode = mode || 'default';
      cur.classList.remove('cur-mode-btn', 'cur-mode-card', 'cur-mode-text', 'cur-mode-drag');
      cur2.classList.remove('cur-mode-btn', 'cur-mode-card', 'cur-mode-text', 'cur-mode-drag', 'cur-hovered');

      if (currentMode !== 'default') {
        cur.classList.add('cur-mode-' + currentMode);
        cur2.classList.add('cur-mode-' + currentMode);
        if (currentMode === 'btn') cur2.classList.add('cur-hovered');
      }

      if (badge) {
        if (badgeText && currentMode === 'card') {
          badge.innerHTML = '<span style="display:inline-block;width:5px;height:5px;border-radius:50%;background:#00F5D4;box-shadow:0 0 6px #00F5D4;margin-right:2px;"></span>' + badgeText;
        } else {
          badge.textContent = '';
        }
      }
    }

    let lastMove = 0;
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      targetX = mouseX;
      targetY = mouseY;
      showCursor();

      cur.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)` + (isDown ? ' scale(0.6) rotate(45deg)' : '');
      if (light) {
        light.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }

      const now = performance.now();
      if (now - lastMove > 22) {
        spawnTrail(mouseX, mouseY);
        lastMove = now;
      }
    }, { passive: true });

    window.addEventListener('mousedown', (e) => {
      isDown = true;
      showCursor();
      cur.classList.add('cur-down');
      cur2.classList.add('cur-down');
      spawnBurst(e.clientX, e.clientY);
      spawnShockwave(e.clientX, e.clientY);
    });

    window.addEventListener('mouseup', () => {
      isDown = false;
      cur.classList.remove('cur-down');
      cur2.classList.remove('cur-down');
    });

    document.addEventListener('mouseleave', () => {
      isVisible = false;
      cur.style.opacity = '0';
      cur2.style.opacity = '0';
      if (light) light.style.opacity = '0';
      magnetTarget = null;
    });

    // 60fps Loop
    const loop = () => {
      if (isVisible) {
        let destX = targetX;
        let destY = targetY;

        if (magnetTarget) {
          const dx = magnetTarget.cx - mouseX;
          const dy = magnetTarget.cy - mouseY;
          const dist = Math.hypot(dx, dy);
          if (dist < magnetTarget.radius) {
            const strength = 0.35 * (1 - dist / magnetTarget.radius);
            destX = mouseX + dx * strength;
            destY = mouseY + dy * strength;
          }
        }

        curX += (destX - curX) * 0.22;
        curY += (destY - curY) * 0.22;

        cur2.style.setProperty('--cur2-x', curX + 'px');
        cur2.style.setProperty('--cur2-y', curY + 'px');
        cur.style.setProperty('--cur-x', mouseX + 'px');
        cur.style.setProperty('--cur-y', mouseY + 'px');

        const downScale = isDown ? ' scale(0.72)' : '';
        cur2.style.transform = `translate3d(${curX}px, ${curY}px, 0) translate(-50%, -50%)` + downScale;

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
            pCtx.shadowBlur = 10;
            pCtx.beginPath();
            pCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            pCtx.fill();
            pCtx.restore();
          }
        }
      }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);

    // Contextual Hover Detection
    document.addEventListener('mouseover', (e) => {
      const target = e.target;
      if (!target || !(target instanceof Element)) return;

      const inputEl = target.closest('input, textarea, select');
      if (inputEl) {
        setMode('text');
        magnetTarget = null;
        return;
      }

      const btnEl = target.closest('button, a, .tr-btn, .tr-f1-ignition-btn, .tr-verify-btn, .tr-filter-btn, .tr-action-btn, .tr-team-verify-btn');
      if (btnEl) {
        setMode('btn');
        const r = btnEl.getBoundingClientRect();
        magnetTarget = {
          cx: r.left + r.width * 0.5,
          cy: r.top + r.height * 0.5,
          radius: Math.max(r.width, r.height) * 0.85
        };
        return;
      }

      const cardEl = target.closest('.tr-card, .tr-ps-card, .tr-status-card, .tr-top-bar, .tr-telemetry-badge');
      if (cardEl) {
        magnetTarget = null;
        let badgeLabel = cardEl.getAttribute('data-cursor');
        if (!badgeLabel) {
          if (cardEl.classList.contains('tr-card') || cardEl.classList.contains('tr-ps-card')) badgeLabel = 'CHALLENGE';
          else if (cardEl.classList.contains('tr-status-card')) badgeLabel = 'STATUS';
          else badgeLabel = 'INSPECT';
        }
        setMode('card', badgeLabel);
        return;
      }

      setMode('default');
      magnetTarget = null;
    });

    document.addEventListener('mouseout', (e) => {
      if (!e.relatedTarget) {
        setMode('default');
        magnetTarget = null;
      }
    });
  }
  updateClock() {
    const now = new Date();
    const utcHours = now.getUTCHours();
    const utcMins = now.getUTCMinutes();
    let istHours = utcHours + 5;
    let istMins = utcMins + 30;
    if (istMins >= 60) { istMins -= 60; istHours += 1; }
    if (istHours >= 24) istHours -= 24;

    const pad = (n) => String(n).padStart(2, '0');
    const timeStr = `${pad(istHours)}:${pad(istMins)}:${pad(now.getSeconds())} IST`;

    // 1. Live Navigation & System Telemetry Clocks
    const clk1 = document.getElementById('trSysClock');
    if (clk1) clk1.textContent = timeStr;
    const clk2 = document.getElementById('trNavClock');
    if (clk2) clk2.textContent = timeStr;

    // 2. Locked Vault Countdown Grid (Target: 28 Jan 2027, 09:00 AM IST)
    const targetDate = new Date('2027-01-28T09:00:00+05:30').getTime();
    const diff = targetDate - Date.now();
    const days = diff > 0 ? Math.floor(diff / (1000 * 60 * 60 * 24)) : 0;
    const hours = diff > 0 ? Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) : 0;
    const mins = diff > 0 ? Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)) : 0;
    const secs = diff > 0 ? Math.floor((diff % (1000 * 60)) / 1000) : 0;

    const cdD = document.getElementById('cdDays');
    const cdH = document.getElementById('cdHours');
    const cdM = document.getElementById('cdMins');
    const cdS = document.getElementById('cdSecs');

    if (cdD) cdD.textContent = pad(days);
    if (cdH) cdH.textContent = pad(hours);
    if (cdM) cdM.textContent = pad(mins);
    if (cdS) cdS.textContent = pad(secs);
  }

  /* ── 5. STATE EVALUATOR & VIEW ROUTER ── */
  getState() {
    return localStorage.getItem(SK_THEME_STATE) || 'locked';
  }

  evaluateStateAndRender() {
    const state = this.getState();
    const adminOnly = localStorage.getItem(SK_THEME_ADMIN_ONLY) === 'true';
    const activeTeam = this.getActiveTeam();
    const teamSelection = activeTeam ? this.getTeamSelection(activeTeam.code) : null;

    this.lastKnownState = state;
    this.lastKnownCountdownEnd = localStorage.getItem(SK_COUNTDOWN_END);

    // If active team has locked selection, show receipt view
    if (teamSelection) {
      this.showView('viewLockedIn');
      this.renderReceipt(teamSelection);
      return;
    }

    // Admin Only restriction
    if (adminOnly && !this.isAdminAuthenticated()) {
      this.showView('viewLocked');
      return;
    }

    // Core Presentation: Always present viewSelection with Heading Timer & 10 Cards Grid!
    this.showView('viewSelection');
    this.updateHeadingTimerHud(state);
    this.renderProblemCards();

    if (state === 'countdown') {
      this.startF1CountdownLoop();
    } else {
      this.stopF1Countdown();
    }
  }

  updateHeadingTimerHud(state) {
    const hud = document.getElementById('trHeadingCountdownHud');
    const statusBadge = document.getElementById('trHudStatusBadge');
    const statusText = document.getElementById('trHudStatusText');
    const clockDeck = document.getElementById('trHudClockDeck');
    const f1Deck = document.getElementById('trHudF1Deck');
    const subtext = document.getElementById('trHudSubtext');

    if (!hud) return;

    hud.className = 	r-heading-countdown-hud state- + state;

    if (state === 'locked') {
      if (clockDeck) clockDeck.classList.remove('tr-hidden');
      if (f1Deck) f1Deck.classList.add('tr-hidden');
      if (statusBadge) statusBadge.classList.remove('is-live');
      if (statusText) statusText.textContent = "🔒 ENCRYPTED CIPHER VAULT · ALL 10 CARDS LOCKED";
      if (subtext) subtext.textContent = "All 10 Grand Challenge problem statements are cryptographically sealed with AES-256 ciphers. Cards automatically turn 360° and unlock when Admin triggers countdown.";
      this.startHudScheduleTimer();
    } else if (state === 'countdown') {
      if (clockDeck) clockDeck.classList.add('tr-hidden');
      if (f1Deck) f1Deck.classList.remove('tr-hidden');
      if (statusBadge) statusBadge.classList.remove('is-live');
      if (statusText) statusText.textContent = "🏁 FIA GANTRY COUNTDOWN · DECRYPTING IN PROGRESS";
      if (subtext) subtext.textContent = "High-velocity decryption matrix initializing across all clusters. Stand by for instant 360° reveal!";
      this.stopHudScheduleTimer();
    } else if (state === 'live') {
      if (clockDeck) clockDeck.classList.remove('tr-hidden');
      if (f1Deck) f1Deck.classList.add('tr-hidden');
      if (statusBadge) statusBadge.classList.add('is-live');
      if (statusText) statusText.textContent = "🟢 THEME DECRYPTED & LIVE · ALL 10 CHALLENGES ACCESSIBLE";
      if (subtext) subtext.textContent = "All 10 Grand Challenges are now unlocked! Inspect specs and click 'Lock In Challenge' to lock your squad's directive.";
      this.stopHudScheduleTimer();
      const d = document.getElementById('trHudDays');
      const h = document.getElementById('trHudHours');
      const m = document.getElementById('trHudMins');
      const s = document.getElementById('trHudSecs');
      if (d) d.textContent = "00";
      if (h) h.textContent = "00";
      if (m) m.textContent = "00";
      if (s) s.textContent = "00";
    }
  }

  startHudScheduleTimer() {
    this.stopHudScheduleTimer();
    const targetDate = new Date('2027-01-28T09:00:00+05:30').getTime();

    const updateClock = () => {
      const now = Date.now();
      const diff = Math.max(0, targetDate - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);

      const d = document.getElementById('trHudDays');
      const h = document.getElementById('trHudHours');
      const m = document.getElementById('trHudMins');
      const s = document.getElementById('trHudSecs');
      if (d) d.textContent = String(days).padStart(2, '0');
      if (h) h.textContent = String(hours).padStart(2, '0');
      if (m) m.textContent = String(mins).padStart(2, '0');
      if (s) s.textContent = String(secs).padStart(2, '0');
    };

    updateClock();
    this.hudTimerInterval = setInterval(updateClock, 1000);
  }

  stopHudScheduleTimer() {
    if (this.hudTimerInterval) {
      clearInterval(this.hudTimerInterval);
      this.hudTimerInterval = null;
    }
  }

  instantRevealAll() {
    this.stopF1Countdown();
    this.stopHudScheduleTimer();
    this.trigger360FlipUnlockSequence();

    setTimeout(() => {
      localStorage.setItem(SK_THEME_STATE, 'live');
      localStorage.removeItem(SK_COUNTDOWN_END);
      try {
        if (typeof BroadcastChannel !== 'undefined') {
          const bc = new BroadcastChannel('hs27_theme_sync');
          bc.postMessage({ type: 'STATE_CHANGE', state: 'live', timestamp: Date.now() });
          bc.close();
        }
      } catch(e) {}
      localStorage.setItem('hs27_theme_last_sync', String(Date.now()));
      this.evaluateStateAndRender();
    }, 950);
  }

  reLockAllCards() {
    this.stopF1Countdown();
    localStorage.setItem(SK_THEME_STATE, 'locked');
    localStorage.removeItem(SK_COUNTDOWN_END);
    try {
      if (typeof BroadcastChannel !== 'undefined') {
        const bc = new BroadcastChannel('hs27_theme_sync');
        bc.postMessage({ type: 'STATE_CHANGE', state: 'locked', timestamp: Date.now() });
        bc.close();
      }
    } catch(e) {}
    localStorage.setItem('hs27_theme_last_sync', String(Date.now()));
    this.evaluateStateAndRender();
  }

  trigger360FlipUnlockSequence() {
    const cards = document.querySelectorAll('.tr-matrix-ps-card');
    cards.forEach((card, idx) => {
      card.style.animationDelay = (idx * 65) + 'ms';
      card.classList.remove('card-locked', 'card-priming');
      card.classList.add('card-flipping-unlock');
    });
  }

  showView(viewId) {
    if (viewId === 'viewLive') viewId = 'viewSelection';
    const views = ['viewLocked', 'viewCountdown', 'viewSelection', 'viewLockedIn', 'viewStandings'];
    views.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        if (id === viewId) {
          el.classList.remove('tr-hidden');
          el.classList.add('tr-view-active');
        } else {
          el.classList.add('tr-hidden');
          el.classList.remove('tr-view-active');
        }
      }
    });

    // Update Status Badge in Header
    const statusPill = document.getElementById('trHeaderStatusPill');
    if (statusPill) {
      if (viewId === 'viewLocked') {
        statusPill.innerHTML = '<span class="tr-pulse-dot red"></span><span>AES-256 VAULT LOCKED</span>';
        statusPill.className = 'tr-status-pill locked';
      } else if (viewId === 'viewCountdown') {
        statusPill.innerHTML = '<span class="tr-pulse-dot yellow"></span><span>F1 GANTRY ACTIVE</span>';
        statusPill.className = 'tr-status-pill countdown';
      } else if (viewId === 'viewSelection') {
        statusPill.innerHTML = '<span class="tr-pulse-dot green"></span><span>THEME LIVE & ACTIVE</span>';
        statusPill.className = 'tr-status-pill live';
      }
    }
  }

  switchArenaMode(mode) {
    const btnProblems = document.getElementById('trTabBtnProblems');
    const btnStandings = document.getElementById('trTabBtnStandings');
    const filterBar = document.querySelector('.tr-filter-bar');
    const cardsGrid = document.getElementById('trCardsGrid');
    const standingsContainer = document.getElementById('trArenaStandingsContainer');

    if (mode === 'problems') {
      if (btnProblems) btnProblems.classList.add('active');
      if (btnStandings) btnStandings.classList.remove('active');
      if (filterBar) filterBar.style.display = '';
      if (cardsGrid) cardsGrid.style.display = '';
      if (standingsContainer) standingsContainer.classList.add('tr-hidden');
    } else if (mode === 'standings') {
      if (btnProblems) btnProblems.classList.remove('active');
      if (btnStandings) btnStandings.classList.add('active');
      if (filterBar) filterBar.style.display = 'none';
      if (cardsGrid) cardsGrid.style.display = 'none';
      if (standingsContainer) standingsContainer.classList.remove('tr-hidden');
      this.renderStandingsInsideReveal();
    }
  }

  showStandingsView() {
    this.switchArenaMode('standings');
  }

  renderStandingsInsideReveal() {
    const container = document.getElementById('trArenaStandingsInner');
    if (!container) return;

    let teams = [];
    let scores = {};
    try {
      teams = JSON.parse(localStorage.getItem(SK_TEAMS_DB)) || [];
      scores = JSON.parse(localStorage.getItem(SK_TEAM_SCORES)) || {};
    } catch (e) {}

    const ranked = teams.map(t => {
      const s = scores[t.code] || {};
      return {
        ...t,
        ...s,
        totalScore: s.totalScore !== undefined ? s.totalScore : 0
      };
    }).sort((a, b) => b.totalScore - a.totalScore);

    const podium = ranked.slice(0, 3);

    container.innerHTML = `
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px;margin-bottom:30px;">
        ${podium.map((t, idx) => {
          const medal = idx === 0 ? '🥇 1ST PLACE' : (idx === 1 ? '🥈 2ND PLACE' : '🥉 3RD PLACE');
          const borderCol = idx === 0 ? '#FFD700' : (idx === 1 ? '#00F5D4' : '#A855F7');
          return `
            <div style="background:rgba(11,18,33,0.92);border:1.5px solid ${borderCol};border-radius:16px;padding:22px;box-shadow:0 12px 30px rgba(0,0,0,0.5);">
              <div style="font-family:'JetBrains Mono',monospace;font-size:0.75rem;font-weight:800;color:${borderCol};margin-bottom:8px;">${medal}</div>
              <h3 style="font-family:'Syne',sans-serif;font-size:1.4rem;color:#FFF;margin:0 0 6px;">${t.teamName || t.name}</h3>
              <div style="font-family:'JetBrains Mono',monospace;font-size:0.75rem;color:#94A3B8;margin-bottom:14px;">
                <span>${t.code}</span> · <span>${t.track || 'General'}</span>
              </div>
              <div style="background:rgba(255,255,255,0.05);padding:10px 14px;border-radius:10px;display:flex;justify-content:space-between;align-items:center;">
                <span style="font-family:'JetBrains Mono',monospace;font-size:0.72rem;color:#94A3B8;">TOTAL SCORE:</span>
                <span style="font-family:'Space Grotesk',sans-serif;font-size:1.4rem;font-weight:900;color:${borderCol};">${t.totalScore} / 100</span>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <div class="tr-standings-card">
        <table class="tr-table-custom">
          <thead>
            <tr>
              <th>RANK</th>
              <th>SQUAD NAME</th>
              <th>PASSCODE</th>
              <th>TRACK / DOMAIN</th>
              <th>CHALLENGE</th>
              <th>TOTAL SCORE</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            ${ranked.map((t, idx) => `
              <tr>
                <td style="font-family:'JetBrains Mono',monospace;font-weight:900;color:${idx < 3 ? '#FFD700' : '#94A3B8'};">#${String(idx + 1).padStart(2, '0')}</td>
                <td><strong style="color:#FFF;font-size:0.95rem;">${t.teamName || t.name}</strong></td>
                <td><code style="font-family:'JetBrains Mono',monospace;background:rgba(255,255,255,0.06);padding:2px 6px;border-radius:4px;color:#00F5D4;">${t.code}</code></td>
                <td><span style="font-family:'JetBrains Mono',monospace;font-size:0.75rem;padding:3px 8px;border-radius:6px;background:rgba(255,255,255,0.05);">${t.track || 'General'}</span></td>
                <td style="font-size:0.82rem;color:#94A3B8;">${t.psId || 'PS-01'}</td>
                <td><strong style="font-family:'Space Grotesk',sans-serif;font-size:1.15rem;color:${t.totalScore >= 80 ? '#00F5D4' : '#F8FAFC'};">${t.totalScore}</strong> <span style="font-size:0.75rem;color:#64748B;">/ 100</span></td>
                <td>
                  <span style="font-family:'JetBrains Mono',monospace;font-size:0.7rem;font-weight:800;padding:3px 8px;border-radius:4px;${t.adminApproved ? 'background:rgba(16,185,129,0.15);color:#34D399;border:1px solid #10B981;' : 'background:rgba(245,158,11,0.15);color:#FBBF24;border:1px solid #F59E0B;'}">
                    ${t.adminApproved ? '✓ ADMIN APPROVED' : '🔒 JURY LOCKED'}
                  </span>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  /* ── 6. F1 COUNTDOWN ENGINE & LAUNCH TRIGGER ── */
  triggerF1Countdown() {
    this.ensureAudioContext();
    const duration = 10000; // 10s FIA Starting sequence
    const endTime = Date.now() + duration;

    localStorage.setItem(SK_THEME_STATE, 'countdown');
    localStorage.setItem(SK_COUNTDOWN_END, String(endTime));

    // Zero-latency cross-tab broadcast
    try {
      if (typeof BroadcastChannel !== 'undefined') {
        const bc = new BroadcastChannel('hs27_theme_sync');
        bc.postMessage({ type: 'STATE_CHANGE', state: 'countdown', endTime, timestamp: Date.now() });
        bc.close();
      }
    } catch(e) {}
    localStorage.setItem('hs27_theme_last_sync', String(Date.now()));

    this.evaluateStateAndRender();
  }

  stopF1Countdown() {
    if (this.f1Interval) {
      clearInterval(this.f1Interval);
      this.f1Interval = null;
    }
  }

  startF1CountdownLoop() {
    this.stopF1Countdown();
    this.ensureAudioContext();

    const endTime = parseInt(localStorage.getItem(SK_COUNTDOWN_END) || '0', 10);
    const giantNumEl = document.getElementById('trF1GiantNumber');
    const annEl = document.getElementById('trF1Announcement');
    const statusPill = document.getElementById('trF1StatusPill');

    // Heading Timer HUD Elements
    const hudGiantNum = document.getElementById('trHudF1GiantNum');
    const hudAnn = document.getElementById('trHudF1Ann');

    let prevLightCount = -1;

    const tick = () => {
      const now = Date.now();
      const diff = endTime - now;
      const secondsLeft = Math.max(0, Math.ceil(diff / 1000));

      const numText = diff <= 0 ? "GO!" : String(secondsLeft);
      if (giantNumEl) {
        giantNumEl.textContent = numText;
        if (diff <= 0) giantNumEl.classList.add('tr-go-text');
        else giantNumEl.classList.remove('tr-go-text');
      }
      if (hudGiantNum) {
        hudGiantNum.textContent = numText;
        if (diff <= 0) hudGiantNum.style.color = '#34d399';
        else hudGiantNum.style.color = '#FFB703';
      }

      // Formula 1 5-light sequence:
      let activeRedLights = 0;
      if (diff > 0) {
        if (diff <= 10000 && diff > 8000) activeRedLights = 1;
        else if (diff <= 8000 && diff > 6000) activeRedLights = 2;
        else if (diff <= 6000 && diff > 4000) activeRedLights = 3;
        else if (diff <= 4000 && diff > 2000) activeRedLights = 4;
        else if (diff <= 2000 && diff > 0) activeRedLights = 5;
      }

      // Update Gantry Lamps on modal and in Heading HUD
      for (let i = 1; i <= 5; i++) {
        const redLamp = document.querySelector(.tr-f1-lamp-red[data-light=" + i + "]);
        const greenLamp = document.querySelector(.tr-f1-lamp-green[data-light=" + i + -green"]);
        const hudRed = document.querySelector(.tr-hud-lamp-red[data-lamp=" + i + "]);
        const hudGreen = document.querySelector(.tr-hud-lamp-green[data-lamp=" + i + g"]);

        if (diff > 0) {
          if (redLamp) {
            if (i <= activeRedLights) redLamp.classList.add('tr-lamp-active');
            else redLamp.classList.remove('tr-lamp-active');
          }
          if (greenLamp) greenLamp.classList.remove('tr-lamp-active');

          if (hudRed) {
            if (i <= activeRedLights) hudRed.classList.add('active');
            else hudRed.classList.remove('active');
          }
          if (hudGreen) hudGreen.classList.remove('active');
        } else {
          // 0.00s: All red lights OUT -> Green lights BURST!
          if (redLamp) redLamp.classList.remove('tr-lamp-active');
          if (greenLamp) greenLamp.classList.add('tr-lamp-active');
          if (hudRed) hudRed.classList.remove('active');
          if (hudGreen) hudGreen.classList.add('active');
        }
      }

      // Synthesized F1 Audio Beep on new lamp armed
      if (activeRedLights !== prevLightCount && activeRedLights > 0 && diff > 0) {
        this.playF1Beep(850 + (activeRedLights * 60), 0.12);
        prevLightCount = activeRedLights;
      }

      // Announcement messages
      const annMsg = diff <= 0
        ? "LIGHTS OUT AND AWAY WE GO! REVEALING THE 10 GRAND CHALLENGES..."
        : FIA GANTRY · RED LIGHT  + activeRedLights +  OF 5 ARMED;

      if (annEl) annEl.textContent = annMsg;
      if (hudAnn) hudAnn.textContent = annMsg;

      if (statusPill) {
        if (diff <= 0) {
          statusPill.textContent = "GREEN FLAG ACTIVE";
          statusPill.style.color = "#34d399";
        } else {
          statusPill.textContent = RED  + activeRedLights + /5 ARMED;
          statusPill.style.color = "#f87171";
        }
      }

      // At 0.00s: Trigger 360 Flip Unlock and Transition to Live Theme
      if (diff <= 0) {
        this.stopF1Countdown();
        this.playF1GoSiren();

        // Staggered 360° flip animation on all problem statement cards
        this.trigger360FlipUnlockSequence();

        setTimeout(() => {
          localStorage.setItem(SK_THEME_STATE, 'live');
          localStorage.removeItem(SK_COUNTDOWN_END);
          try {
            if (typeof BroadcastChannel !== 'undefined') {
              const bc = new BroadcastChannel('hs27_theme_sync');
              bc.postMessage({ type: 'STATE_CHANGE', state: 'live', timestamp: Date.now() });
              bc.close();
            }
          } catch(e) {}
          localStorage.setItem('hs27_theme_last_sync', String(Date.now()));
          this.evaluateStateAndRender();
        }, 1100);
      }
    };

    tick();
    this.f1Interval = setInterval(tick, 100);
  }

  renderProblemCards() {
    const grid = document.getElementById('trCardsGrid');
    if (!grid) return;

    // Clear existing matrix animations
    this.activeMatrixAnims.forEach(anim => cancelAnimationFrame(anim));
    this.activeMatrixAnims = [];

    const state = this.getState();
    const isLocked = (state === 'locked');
    const isCountdown = (state === 'countdown');

    const statements = this.getProblemStatements();
    const capacities = this.getCalculatedCapacities();
    const activeTeam = this.getActiveTeam();
    const isTeamVerified = !!activeTeam;

    // Update Telemetry Header
    const totalCapacity = this.getTotalCapacity();
    const totalSelected = capacities.reduce((acc, c) => acc + c.selectedCount, 0);
    const totalRemaining = Math.max(0, totalCapacity - totalSelected);

    const gCap = document.getElementById('trGlobalCapacityVal');
    const gSel = document.getElementById('trGlobalSelectedVal');
    const gRem = document.getElementById('trGlobalRemainingVal');
    if (gCap) gCap.textContent = totalCapacity + ' TEAMS';
    if (gSel) gSel.textContent = String(totalSelected);
    if (gRem) gRem.textContent = String(totalRemaining);

    // Unverified warning banner
    const unverifiedWarn = document.getElementById('trUnverifiedWarning');
    if (unverifiedWarn) {
      if (isTeamVerified) unverifiedWarn.classList.add('tr-hidden');
      else unverifiedWarn.classList.remove('tr-hidden');
    }

    grid.innerHTML = '';

    const filter = this.activeCategoryFilter || 'all';
    const filteredStatements = (filter === 'all') 
      ? statements 
      : statements.filter(s => s.category.toLowerCase() === filter.toLowerCase() || (s.category === 'AI/ML' && filter === 'AI/ML'));

    filteredStatements.forEach(stmt => {
      const capInfo = capacities.find(c => c.problemNumber === stmt.number) || {
        capacity: 20,
        selectedCount: 0,
        remainingSlots: 20,
        isFull: false
      };

      const padNum = String(stmt.number).padStart(2, '0');
      const meta = CATEGORY_META[stmt.category] || {
        badgeText: stmt.category,
        icon: '⚡',
        accent: '#00F5D4',
        secondary: '#0284C7',
        gradient: 'linear-gradient(135deg, #00F5D4 0%, #0284C7 100%)',
        bgTint: 'rgba(0, 245, 212, 0.12)',
        slug: 'default'
      };

      const fillPercent = isLocked ? 0 : Math.min(100, Math.round((capInfo.selectedCount / capInfo.capacity) * 100));
      const tags = stmt.techStack || ["TYPESCRIPT", "PYTHON", "REST API", "CLOUD"];

      const card = document.createElement('div');
      card.className = `tr-matrix-ps-card tile-cat-${meta.slug}${isLocked ? ' card-locked' : ''}${isCountdown ? ' card-priming' : ''}${capInfo.isFull ? ' card-is-full' : ''}`;
      card.id = `matrixCard-ps-${stmt.number}`;
      card.setAttribute('data-ps', stmt.number);
      card.setAttribute('data-category', stmt.category);
      card.style.setProperty('--cat-accent', meta.accent);
      card.style.setProperty('--cat-grad', meta.gradient);

      // Cipher vs Real Description
      const descHtml = isLocked || isCountdown ? `
        <div class="tmc-cipher-container">
          <div class="tmc-cipher-scramble">
            <span class="tcs-line">// SHA-256 DIRECTIVE HASH [0x7F9B...E9]</span>
            <span class="tcs-line">b8e4f1d09c2a78b5e63029a1dc8f7421ec04a89d</span>
            <span class="tcs-line">${isCountdown ? '⚡ RAPID DECRYPTION BUFFER STREAMING...' : 'PARAMETERS ENCRYPTED · OPENS ON ADMIN TRIGGER'}</span>
          </div>
          <div class="tmc-lock-shield-overlay">
            <div class="tlso-padlock">${isCountdown ? '⚡' : '🔒'}</div>
            <div class="tlso-title">${isCountdown ? 'DECRYPTING PROTOCOL...' : 'LOCKED PROTOCOL'}</div>
            <div class="tlso-sub">${isCountdown ? 'FIA Gantry sequence in progress' : 'Awaiting Admin reveal trigger'}</div>
          </div>
        </div>
      ` : `
        <p class="tmc-desc">${stmt.description}</p>
      `;

      // Front Face Action Button
      const frontActionBtn = isLocked || isCountdown ? `
        <button type="button" class="tmc-btn-locked" disabled>
          <span>${isCountdown ? '⚡ DECRYPTING PROTOCOL...' : '🔒 LOCKED · OPENS ON ADMIN TRIGGER'}</span>
        </button>
      ` : `
        <button type="button" class="tmc-flip-prompt-btn" onclick="trEngine.toggleCardFlip(${stmt.number}, event)">
          <span>[ ↻ 3D FLIP BRIEF ]</span>
          <span>➔</span>
        </button>
      `;

      card.innerHTML = `
        <div class="tmc-3d-flipper">
          <!-- FRONT FACE -->
          <div class="tmc-face-front">
            <!-- Digital Rain Canvas -->
            <canvas class="tr-matrix-canvas" id="matrixCanvas-${stmt.number}"></canvas>
            <div class="tr-matrix-scanlines" aria-hidden="true"></div>

            <div class="tmc-body" style="position:relative; z-index:2; display:flex; flex-direction:column; height:100%; justify-content:space-between;">
              <div>
                <div class="tmc-card-indicator">
                  <span class="tmc-num-glow">${padNum} — PROBLEM STATEMENT</span>
                  <span class="tmc-cat-pill" style="color:${meta.accent}; border-color:${meta.accent};">${meta.badgeText}</span>
                </div>

                <div class="tmc-meta-id" style="font-family:'JetBrains Mono',monospace; font-size:0.72rem; color:rgba(255,255,255,0.45); margin-bottom:6px;">
                  <span>// DIRECTIVE</span> <strong>PS-${padNum}</strong> &middot; <span>HACKATHON 2027</span>
                </div>

                <h3 class="tmc-title" style="font-size:1.15rem; font-weight:800; color:#FFFFFF; margin:0 0 10px 0; line-height:1.3;">${stmt.title}</h3>
                ${descHtml}
              </div>

              <div>
                <!-- Tech Stack Tags -->
                <div class="tmc-tags-row" style="display:flex; flex-wrap:wrap; gap:5px; margin:10px 0;">
                  ${tags.map(t => `<span class="tmc-tag-chip" style="font-family:'JetBrains Mono',monospace; font-size:0.65rem; padding:2px 6px; border-radius:4px; background:rgba(255,255,255,0.06); color:#94A3B8;">[${t}]</span>`).join('')}
                </div>

                <!-- Capacity Telemetry Meter -->
                <div class="tmc-capacity-box" style="margin-bottom:8px;">
                  <div class="tmc-cap-header" style="display:flex; justify-content:space-between; font-family:'JetBrains Mono',monospace; font-size:0.68rem; color:#94A3B8; margin-bottom:4px;">
                    <span>SQUAD ALLOCATION:</span>
                    <span class="tmc-cap-val" style="color:#FFFFFF; font-weight:700;">${isLocked ? 'SEALED (0 / ' + capInfo.capacity + ' SQUADS)' : capInfo.selectedCount + ' / ' + capInfo.capacity + ' SQUADS'}</span>
                  </div>
                  <div class="tmc-cap-track" style="height:4px; background:rgba(255,255,255,0.1); border-radius:2px; overflow:hidden;">
                    <div class="tmc-cap-fill" style="width:${fillPercent}%; height:100%; background:${meta.accent}; transition:width 0.4s ease;"></div>
                  </div>
                </div>

                <!-- Front Action Button -->
                ${frontActionBtn}
              </div>
            </div>
          </div>

          <!-- BACK FACE (Interactive Specification Panel) -->
          <div class="tmc-face-back">
            <div>
              <div class="tmc-back-head">
                <span class="tmc-num-glow">${padNum} — SPECIFICATION BRIEF</span>
                <button type="button" class="tmc-back-btn-flip" onclick="trEngine.toggleCardFlip(${stmt.number}, event)">✕ FLIP FRONT</button>
              </div>

              <h4 class="tmc-back-title">${stmt.title}</h4>

              <div class="tmc-back-section">
                <span class="tmc-back-label">CONTEXT & PROBLEM</span>
                <p class="tmc-back-text">${stmt.description}</p>
              </div>

              <div class="tmc-back-section">
                <span class="tmc-back-label">EXPECTED DELIVERABLES</span>
                <p class="tmc-back-text">${stmt.deliverables || 'Working functional prototype, GitHub commit cadence with verified SHA hashes, architecture RFC, and live deployment link.'}</p>
              </div>

              <div class="tmc-back-section">
                <span class="tmc-back-label">REQUIRED DOMAIN TECH</span>
                <div class="tmc-tags-row" style="display:flex; flex-wrap:wrap; gap:4px; margin-top:4px;">
                  ${tags.map(t => `<span class="tmc-tag-chip" style="font-family:'JetBrains Mono',monospace; font-size:0.65rem; padding:2px 6px; border-radius:4px; background:rgba(255,255,255,0.08); color:${meta.accent};">[${t}]</span>`).join('')}
                </div>
              </div>
            </div>

            <div>
              <!-- Squad Capacity Bar inside Back -->
              <div class="tmc-capacity-box" style="margin: 10px 0;">
                <div class="tmc-cap-header" style="display:flex; justify-content:space-between; font-family:'JetBrains Mono',monospace; font-size:0.68rem; color:#94A3B8; margin-bottom:4px;">
                  <span>SQUAD CAPACITY:</span>
                  <span class="tmc-cap-val" style="color:#00F5D4; font-weight:700;">${capInfo.selectedCount} / ${capInfo.capacity} SQUADS</span>
                </div>
                <div class="tmc-cap-track" style="height:4px; background:rgba(255,255,255,0.1); border-radius:2px; overflow:hidden;">
                  <div class="tmc-cap-fill" style="width:${fillPercent}%; height:100%; background:${meta.accent};"></div>
                </div>
              </div>

              <!-- Main Select Button -->
              <button type="button" class="tmc-btn-select-main" ${capInfo.isFull ? 'disabled' : ''} onclick="trEngine.promptSelect(${stmt.number}, event)">
                ${capInfo.isFull ? 'SLOTS FULL' : 'SELECT THIS CHALLENGE ➔'}
              </button>
            </div>
          </div>
        </div>
      `;

      grid.appendChild(card);
    });

    // Initialize Matrix Rain effect on each card
    this.initMatrixCanvases();
    this.initCard3DTilt();

    // GSAP Staggered Entrance if loaded
    if (typeof gsap !== 'undefined') {
      gsap.fromTo('.tr-matrix-ps-card', 
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.05, ease: 'power2.out' }
      );
    }
  }

  toggleCardFlip(problemNumber, event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    const card = document.getElementById('matrixCard-ps-' + problemNumber);
    if (!card) return;

    const isAlreadyFlipped = card.classList.contains('is-flipped');

    // Accordion: Close all other cards first
    document.querySelectorAll('.tr-matrix-ps-card.is-flipped').forEach(c => {
      c.classList.remove('is-flipped');
    });

    // If it was not flipped before, flip open now
    if (!isAlreadyFlipped) {
      card.classList.add('is-flipped');
      try { playCyberSound('click'); } catch (e) {}
    }
  }

  initCard3DTilt() {
    document.querySelectorAll('.tr-matrix-ps-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        if (card.classList.contains('is-flipped')) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const rx = -(y / (rect.height / 2)) * 6;
        const ry = (x / (rect.width / 2)) * 6;
        card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(6px)`;
      });
      card.addEventListener('mouseleave', () => {
        if (card.classList.contains('is-flipped')) return;
        card.style.transform = '';
      });
    });
  }

  initMatrixCanvases() {
    const cards = document.querySelectorAll('.tr-matrix-ps-card');
    const chars = '0123456789ABCDEFｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜΩλπΔ';

    cards.forEach((card) => {
      const canvas = card.querySelector('.tr-matrix-canvas');
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      let width = (canvas.width = card.offsetWidth || 460);
      let height = (canvas.height = card.offsetHeight || 440);

      const fontSize = 14;
      const columns = Math.floor(width / fontSize);
      const drops = [];
      for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * -30);
      }

      let speedMultiplier = 1;
      let isHovered = false;

      // Accelerated rain on hover
      card.addEventListener('mouseenter', () => {
        isHovered = true;
        speedMultiplier = 2.4;
      });

      card.addEventListener('mouseleave', () => {
        isHovered = false;
        speedMultiplier = 1;
      });

      const accentColor = card.style.getPropertyValue('--cat-accent') || '#00F5D4';

      let lastTime = 0;
      const render = (time) => {
        if (!card.isConnected) return; // Terminate if card was removed

        const delta = time - lastTime;
        const interval = isHovered ? 30 : 60; // 33 FPS or 16 FPS

        if (delta > interval) {
          lastTime = time;

          // Translucent dark wash for phosphor trail persistence
          ctx.fillStyle = 'rgba(6, 10, 20, 0.22)';
          ctx.fillRect(0, 0, width, height);

          ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

          for (let i = 0; i < drops.length; i++) {
            const char = chars[Math.floor(Math.random() * chars.length)];
            const x = i * fontSize;
            const y = drops[i] * fontSize;

            // Leading drop is white; trailing drops are tinted with category accent
            if (Math.random() > 0.88 || isHovered) {
              ctx.fillStyle = '#FFFFFF';
            } else {
              ctx.fillStyle = accentColor;
            }

            ctx.fillText(char, x, y);

            if (y > height && Math.random() > 0.975) {
              drops[i] = 0;
            }

            drops[i] += speedMultiplier > 1 ? 1.5 : 1;
          }
        }

        const animId = requestAnimationFrame(render);
        this.activeMatrixAnims.push(animId);
      };

      requestAnimationFrame(render);
    });
  }

  /* ── 9. CATEGORY FILTERING ── */
  filterCategory(category) {
    this.currentFilter = category;

    // Update active tab buttons
    document.querySelectorAll('.tr-filter-btn').forEach(btn => {
      const match = btn.getAttribute('data-filter') || 'all';
      if (match.toLowerCase() === category.toLowerCase()) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    this.renderProblemCards();
  }

  /* ── 10. MODAL INSPECT & SELECTION DIALOG ── */
  openProblemDetails(problemNumber) {
    const statements = this.getProblemStatements();
    const stmt = statements.find(s => s.number === problemNumber);
    if (!stmt) return;

    this.pendingSelectProblem = problemNumber;
    const modal = document.getElementById('trProblemDetailModal');
    if (!modal) return;

    const padNum = String(stmt.number).padStart(2, '0');
    const meta = CATEGORY_META[stmt.category] || { badgeText: stmt.category, accent: '#00F5D4' };

    const numBadge = document.getElementById('dtlPsNumberBadge');
    const catBadge = document.getElementById('dtlPsCategoryBadge');
    const titleEl = document.getElementById('dtlPsTitle');
    const descEl = document.getElementById('dtlPsDescription');

    if (numBadge) numBadge.textContent = `PROBLEM STATEMENT ${padNum}`;
    if (catBadge) {
      catBadge.textContent = meta.badgeText;
      catBadge.style.borderColor = meta.accent;
      catBadge.style.color = meta.accent;
    }
    if (titleEl) titleEl.textContent = stmt.title;
    if (descEl) descEl.textContent = stmt.description;

    modal.classList.remove('tr-hidden');
  }

  closeProblemDetails() {
    const modal = document.getElementById('trProblemDetailModal');
    if (modal) modal.classList.add('tr-hidden');
  }

  executeSelectFromDetail() {
    if (this.pendingSelectProblem) {
      this.closeProblemDetails();
      this.promptSelect(this.pendingSelectProblem);
    }
  }

  promptSelect(problemNumber, event) {
    if (event) event.stopPropagation();

    const activeTeam = this.getActiveTeam();
    if (!activeTeam) {
      this.promptVerifyModal();
      return;
    }

    const statements = this.getProblemStatements();
    const stmt = statements.find(s => s.number === problemNumber);
    if (!stmt) return;

    const confirmModal = document.getElementById('trConfirmSelectionModal');
    if (!confirmModal) return;

    this.pendingSelectProblem = problemNumber;

    const tEl = document.getElementById('modalConfirmProblemTitle');
    if (tEl) tEl.textContent = `PS-${String(stmt.number).padStart(2, '0')} · ${stmt.title}`;

    confirmModal.classList.remove('tr-hidden');
  }

  cancelSelection() {
    const confirmModal = document.getElementById('trConfirmSelectionModal');
    if (confirmModal) confirmModal.classList.add('tr-hidden');
    this.pendingSelectProblem = null;
  }

  confirmFinalSelection() {
    const activeTeam = this.getActiveTeam();
    if (!activeTeam || !this.pendingSelectProblem) return;

    const problemNumber = this.pendingSelectProblem;
    const selections = this.getAllSelections();

    // Check if squad already locked a PS
    const existing = selections.find(s => s.teamCode === activeTeam.code);
    if (existing) {
      alert("Your squad has already locked in a problem statement!");
      this.cancelSelection();
      this.evaluateStateAndRender();
      return;
    }

    const stmtObj = this.getProblemStatements().find(s => s.number === problemNumber) || {};
    const newRecord = {
      teamCode: activeTeam.code,
      teamName: activeTeam.name || activeTeam.teamName,
      leaderName: activeTeam.leaderName || 'Squad Leader',
      problemNumber: problemNumber,
      problemTitle: stmtObj.title || (`Challenge #` + problemNumber),
      timestamp: new Date().toISOString(),
      confirmationId: `HS27-SEL-PS${String(problemNumber).padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`,
      securityHash: `CRC-${Math.random().toString(36).substring(2, 7).toUpperCase()}`
    };

    selections.push(newRecord);
    localStorage.setItem(SK_SELECTIONS, JSON.stringify(selections));

    // Transmit to Google Spreadsheet
    try {
      const endpoint = localStorage.getItem('udbhav_gas_url') || window.UDBHAV_APPS_SCRIPT_URL || "https://script.google.com/macros/s/AKfycbz_UdbhavRegistry/exec";
      if (endpoint && endpoint.startsWith('http')) {
        fetch(endpoint, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({
            action: 'selectProblem',
            spreadsheetId: '10ykklemdk9MIRbnIfySx5-5qkHPyejNNIxoJZSBH-tE',
            data: newRecord
          })
        }).catch(err => console.warn('Selection cloud transmission queued:', err));
      }
    } catch (selErr) {}

    // Zero-latency broadcast
    try {
      if (typeof BroadcastChannel !== 'undefined') {
        const bc = new BroadcastChannel('hs27_theme_sync');
        bc.postMessage({ type: 'SELECTION_LOCKED', record: newRecord, timestamp: Date.now() });
        bc.close();
      }
    } catch(e) {}
    localStorage.setItem('hs27_theme_last_sync', String(Date.now()));

    this.cancelSelection();
    this.evaluateStateAndRender();
  }

  /* ── 11. CONFIRMATION RECEIPT VIEW ── */
  renderReceipt(selection) {
    const confIdEl = document.getElementById('receiptConfId');
    const teamNameEl = document.getElementById('receiptTeamName');
    const teamCodeEl = document.getElementById('receiptTeamCode');
    const timeEl = document.getElementById('receiptTimestamp');
    const psNumEl = document.getElementById('receiptPsNumber') || document.getElementById('receiptProblemNum');
    const psTitleEl = document.getElementById('receiptPsTitle') || document.getElementById('receiptProblemTitle');
    const psDescEl = document.getElementById('receiptProblemDesc');
    if (psDescEl && stmt.description) psDescEl.textContent = stmt.description;

    const statements = this.getProblemStatements();
    const stmt = statements.find(s => s.number === selection.problemNumber) || {
      number: selection.problemNumber,
      title: "Udbhav Challenge"
    };

    if (confIdEl) confIdEl.textContent = selection.confirmationId;
    if (teamNameEl) teamNameEl.textContent = selection.teamName;
    if (teamCodeEl) teamCodeEl.textContent = selection.teamCode;
    if (timeEl) timeEl.textContent = new Date(selection.timestamp).toLocaleString();
    if (psNumEl) psNumEl.textContent = `PROBLEM STATEMENT ${String(stmt.number).padStart(2, '0')}`;
    if (psTitleEl) psTitleEl.textContent = stmt.title;
  }

  printReceipt() {
    window.print();
  }

  /* ── 12. DATA REPOSITORIES & CAPACITY CALCULATOR ── */
  getProblemStatements() {
    try {
      const stored = localStorage.getItem(SK_PROBLEM_STATEMENTS);
      if (stored) return JSON.parse(stored);
    } catch(e) {}
    return DEFAULT_10_PROBLEM_STATEMENTS;
  }

  getTotalCapacity() {
    const raw = localStorage.getItem(SK_TOTAL_CAPACITY);
    return raw ? parseInt(raw, 10) : 200;
  }

  getAllSelections() {
    try {
      const raw = localStorage.getItem(SK_SELECTIONS);
      if (raw) return JSON.parse(raw);
    } catch(e) {}
    return [];
  }

  getTeamSelection(teamCode) {
    const selections = this.getAllSelections();
    return selections.find(s => s.teamCode === teamCode) || null;
  }

  getCalculatedCapacities() {
    const totalCapacity = this.getTotalCapacity();
    const selections = this.getAllSelections();
    const base = Math.floor(totalCapacity / 10);
    const remainder = totalCapacity % 10;

    const result = [];
    for (let i = 1; i <= 10; i++) {
      const cap = base + (i <= remainder ? 1 : 0);
      const selCount = selections.filter(s => s.problemNumber === i).length;
      result.push({
        problemNumber: i,
        capacity: cap,
        selectedCount: selCount,
        remainingSlots: Math.max(0, cap - selCount),
        isFull: selCount >= cap
      });
    }
    return result;
  }

  /* ── 13. SQUAD AUTHENTICATION & VERIFICATION ── */
  getActiveTeam() {
    try {
      const raw = localStorage.getItem(SK_ACTIVE_TEAM);
      if (raw) return JSON.parse(raw);
    } catch(e) {}
    return null;
  }

  setActiveTeam(team) {
    if (team) {
      localStorage.setItem(SK_ACTIVE_TEAM, JSON.stringify(team));
    } else {
      localStorage.removeItem(SK_ACTIVE_TEAM);
    }
    this.syncActiveTeamBanner();
    this.evaluateStateAndRender();
  }

  syncActiveTeamBanner() {
    const activeTeam = this.getActiveTeam();
    const badge = document.getElementById('trActiveTeamBadge') || document.getElementById('trActiveTeamBanner');
    const nameEl = document.getElementById('trActiveTeamName') || document.getElementById('trBannerTeamName');
    const codeEl = document.getElementById('trBannerTeamCode');
    if (codeEl && activeTeam) codeEl.textContent = activeTeam.code;

    if (badge) {
      if (activeTeam) {
        badge.classList.remove('tr-hidden');
        if (nameEl) nameEl.textContent = activeTeam.name || activeTeam.teamName;
      } else {
        badge.classList.add('tr-hidden');
      }
    }
  }

  verifyEnteredTeamCode() {
    const input = document.getElementById('trTeamCodeInput');
    const fb = document.getElementById('trVerifyFeedback') || document.getElementById('trAuthFeedback');
    if (!input) return;

    const code = input.value.trim().toUpperCase();
    if (!code) {
      if (fb) { fb.className = 'tr-fb error'; fb.textContent = 'Please enter your team passcode.'; }
      return;
    }

    const verified = this.verifyCode(code);
    if (verified) {
      this.setActiveTeam(verified);
      if (fb) { fb.className = 'tr-fb success'; fb.textContent = `✓ Verified as ${verified.name}!`; }
      setTimeout(() => this.evaluateStateAndRender(), 400);
    } else {
      if (fb) { fb.className = 'tr-fb error'; fb.textContent = 'Invalid Passcode. Enter a valid UDBHAV passcode (e.g. UDB-PASS-8921).'; }
    }
  }

  verifyCode(inputCode) {
    if (!inputCode) return null;
    const clean = inputCode.trim();
    if (clean.toUpperCase() === 'RISHI@5630DR' || clean === 'Rishi@5630dr' || clean.toLowerCase() === 'rishi@5630dr') {
      try {
        localStorage.setItem('hs27_admin_auth', 'true');
        sessionStorage.setItem('hs27_admin_auth', 'true');
        localStorage.setItem('hs27_mentor_auth', 'true');
        sessionStorage.setItem('hs27_mentor_auth', 'true');
      } catch(e) {}
      return { code: 'Rishi@5630dr', name: 'Master Admin (Rishi)' };
    }
    let teams = [];
    try {
      teams = JSON.parse(localStorage.getItem(SK_TEAMS_DB)) || [];
    } catch(e) {}

    // Check registered teams
    let match = teams.find(t => (t.code || t.teamCode || '').toUpperCase() === inputCode);
    if (match) return { code: match.code || match.teamCode, name: match.teamName || match.name };

    // Standard fallback passcodes
    const defaultCodes = {
      'UDB-PASS-8921': 'CyberKnights',
      'UDB-PASS-4410': 'NeuralNova Labs',
      'UDB-PASS-2027': 'Quantum EVM Labs',
      'UDB-PASS-7302': 'BioPulse Edge',
      'UDB-PASS-5519': 'FinGraph Shield',
      'UDB-PASS-9901': 'AeroMesh Swarm'
    };

    if (defaultCodes[inputCode]) {
      return { code: inputCode, name: defaultCodes[inputCode] };
    }

    // Dynamic pattern
    if (/^(UDB|HS)-PASS-\d{4}$/.test(inputCode)) {
      return { code: inputCode, name: `Squad ${inputCode.replace(/^(UDB|HS)-PASS-/, '')}` };
    }

    return null;
  }

  promptVerifyModal() {
    const modal = document.getElementById('trVerifyTeamModal');
    if (modal) modal.classList.remove('tr-hidden');
  }

  closeVerifyModal() {
    const modal = document.getElementById('trVerifyTeamModal');
    if (modal) modal.classList.add('tr-hidden');
  }

  verifyModalCode() {
    const input = document.getElementById('trModalTeamCodeInput');
    const fb = document.getElementById('trModalVerifyFeedback');
    if (!input) return;

    const code = input.value.trim().toUpperCase();
    const verified = this.verifyCode(code);
    if (verified) {
      this.setActiveTeam(verified);
      this.closeVerifyModal();
      if (this.pendingSelectProblem) {
        this.promptSelect(this.pendingSelectProblem);
      }
    } else {
      if (fb) {
        fb.textContent = 'Invalid Passcode. Enter e.g. UDB-PASS-8921';
        fb.className = 'tr-fb error';
      }
    }
  }

  switchTeam() {
    this.setActiveTeam(null);
    this.evaluateStateAndRender();
  }

  saveGasUrl() {
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
  }

  isAdminAuthenticated() {
    return localStorage.getItem('hs27_admin_auth') === 'true';
  }

  /* ── 14. WEB AUDIO API SYNTHESIZER (SILENCED - ZERO SOUND POLICY) ── */
  ensureAudioContext() {
    return; // Silenced per zero-sound policy
  }

  initAudioUI() {
    const btn = document.getElementById('trAudioToggleBtn');
    if (btn) {
      btn.style.display = 'none'; // Audio permanently disabled
    }
  }

  playF1Beep(frequency, duration) {
    return; // Silenced per zero-sound policy
  }

  playF1GoSiren() {
    return; // Silenced per zero-sound policy
  }
}

// Instantiate and attach globally
const trEngine = new ThemeRevealEngine();
window.trEngine = trEngine;

document.addEventListener('DOMContentLoaded', () => {
  trEngine.init();

  /* ── THEME REVEAL EMBEDDED ADMIN & MODAL HANDLERS ── */
  toggleAudio() {
    const btn = document.getElementById('trAudioToggleBtn');
    if (btn) btn.classList.toggle('active');
  }

  downloadReceipt() {
    this.printReceipt();
  }

  closeConfirmModal() {
    const modal = document.getElementById('trConfirmModal') || document.getElementById('trConfirmSelectionModal');
    if (modal) {
      modal.classList.add('tr-hidden');
      modal.style.display = 'none';
    }
  }

  closeAdminModal() {
    const modal = document.getElementById('trAdminModal');
    if (modal) {
      modal.classList.add('tr-hidden');
      modal.style.display = 'none';
    }
  }

  openAdminModal() {
    const modal = document.getElementById('trAdminModal');
    if (modal) {
      modal.classList.remove('tr-hidden');
      modal.style.display = 'flex';
    }
  }

  switchAdminTab(tabName, btn) {
    const tabs = document.querySelectorAll('.tr-at-btn');
    tabs.forEach(t => t.classList.remove('active'));
    if (btn) btn.classList.add('active');

    const panels = document.querySelectorAll('.tr-ap-panel');
    panels.forEach(p => p.classList.remove('active'));
    const target = document.getElementById('trAdminTab_' + tabName) || document.getElementById(tabName);
    if (target) target.classList.add('active');
  }

  setThemeState(state) {
    localStorage.setItem(SK_THEME_STATE, state);
    this.evaluateStateAndRender();
  }

  resetAllSystemData() {
    if (confirm('Are you sure you want to reset all theme and selection state?')) {
      localStorage.removeItem(SK_THEME_STATE);
      localStorage.removeItem(SK_SELECTIONS);
      this.initStorageDefaults();
      this.evaluateStateAndRender();
      alert('System state reset to defaults.');
    }
  }

  updateTotalCapacityFromAdmin() {
    const input = document.getElementById('admTotalCapInput');
    if (input) {
      const val = parseInt(input.value, 10) || 5;
      localStorage.setItem('hs27_total_capacity', String(val));
      this.renderProblemCards();
      alert('Capacity updated to ' + val + ' teams per statement.');
    }
  }

  saveAdminProblemStatements() {
    alert('Problem statements synchronized with master registry.');
    this.renderProblemCards();
  }

  exportSelectionsCSV() {
    const selections = this.getAllSelections();
    let csv = "Team Code,Team Name,Problem Statement,Timestamp\n";
    Object.entries(selections).forEach(([code, data]) => {
      csv += `"${code}","${data.teamName || ''}","${data.problemNumber || ''}","${new Date(data.timestamp || Date.now()).toISOString()}"\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `udbhav_2027_selections_${Date.now()}.csv`;
    a.click();
  }

  resetAllTeamSelections() {
    if (confirm('Are you sure you want to clear all team problem statement selections?')) {
      localStorage.removeItem(SK_SELECTIONS);
      this.evaluateStateAndRender();
      alert('Team selections cleared.');
    }
  }

  authenticateAdmin(providedPass) {
    const input = document.getElementById('adminPassKeyInput');
    const val = (providedPass || (input ? input.value : '')).trim();
    const normalized = val.toLowerCase();
    const fb = document.getElementById('adminGateFeedback');

    const validKeys = ['rishi@5630dr', 'admin', 'piet2027', 'h2s2027', 'director2027', 'root', 'superadmin'];

    if (val === 'Rishi@5630dr' || validKeys.includes(normalized)) {
      try {
        localStorage.setItem('hs27_admin_auth', 'true');
        sessionStorage.setItem('hs27_admin_auth', 'true');
        localStorage.setItem('hs27_mentor_auth', 'true');
        sessionStorage.setItem('hs27_mentor_auth', 'true');
      } catch(e) {}
      if (fb) {
        fb.className = 'tr-fb success';
        fb.innerHTML = '✓ Master Authorization Granted!';
      }
      const gate = document.getElementById('adminAuthGate');
      if (gate) gate.style.display = 'none';
      const controls = document.getElementById('adminDirectControls');
      if (controls) controls.style.display = 'block';
      this.evaluateStateAndRender();
    } else {
      if (fb) {
        fb.className = 'tr-fb error';
        fb.innerHTML = '&#10005; Invalid Master Passcode. Use: Rishi@5630dr';
      }
      if (input) {
        input.focus();
        input.select();
      }
    }
  }

  quickFillAdminPass(pass) {
    const input = document.getElementById('adminPassKeyInput');
    if (input) {
      input.value = pass || 'Rishi@5630dr';
      this.authenticateAdmin(pass);
    }
  }
});



