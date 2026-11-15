/**
 * ══════════════════════════════════════════════════════════════════════════
 * HACKATHON 2027 · MASTER ADMINISTRATIVE ORCHESTRATION ENGINE
 * Authoritative Controller for Theme Reveal, 10 Problem Statements,
 * Team Submissions, Mentor Scores, and Final Standings Publication
 * ══════════════════════════════════════════════════════════════════════════
 */

// Storage Keys
const SK_ADMIN_AUTH = 'hs27_admin_auth';
const SK_THEME_STATE = 'hs27_theme_state';               // 'locked' | 'countdown' | 'live'
const SK_THEME_ADMIN_ONLY = 'hs27_theme_admin_only';     // 'true' | 'false' (Just visible to me)
const SK_COUNTDOWN_END = 'hs27_countdown_end';           // timestamp ms
const SK_TOTAL_CAPACITY = 'hs27_total_capacity';         // number
const SK_PROBLEM_STATEMENTS = 'hs27_problem_statements'; // array of 10
const SK_SELECTIONS = 'hs27_selections';                 // array of selections
const SK_TEAMS_DB = 'udbhav_2027_teams';                 // registered teams
const SK_TEAM_SCORES = 'hs27_team_scores';               // mentor/admin scores
const SK_STANDINGS_PUBLISHED = 'hs27_standings_published';
const SK_MENTORS_DB = 'udbhav_2027_mentors'; // boolean string
const SK_THEME_NAME = 'hs27_theme_name';
const SK_THEME_TAGLINE = 'hs27_theme_tagline';
const SK_THEME_SCHEDULED = 'hs27_theme_scheduled_date';

// Default 10 Problem Statements
const OFFICIAL_DEFAULT_PS = [
  {
    number: 1,
    id: "PS-01",
    category: "AI/ML",
    title: "Autonomous Agentic Code Refactoring & Security Hardening",
    description: "Develop an autonomous multi-agent coding engine that performs static semantic analysis on legacy microservices, generates verifiable security patches, and validates regression test suites in real-time.",
    capacity: 20,
    active: true
  },
  {
    number: 2,
    id: "PS-02",
    category: "Web3",
    title: "Decentralized Zero-Knowledge Cross-Chain Liquidity Protocol",
    description: "Architect a non-custodial decentralized liquidity bridge utilizing succinct zk-SNARK state proofs to enable atomic, slippage-resistant asset settlement across EVM and non-EVM execution layers.",
    capacity: 20,
    active: true
  },
  {
    number: 3,
    id: "PS-03",
    category: "CyberSecurity",
    title: "eBPF-Powered Real-Time Kernel Threat & Exfiltration Sensor",
    description: "Design an ultra-low-overhead kernel observability agent using Linux eBPF probes to intercept, detect, and isolate zero-day privilege escalations and container breakout attacks in Kubernetes.",
    capacity: 20,
    active: true
  },
  {
    number: 4,
    id: "PS-04",
    category: "HealthTech",
    title: "Multimodal Clinical Diagnostic Copilot with Edge Privacy",
    description: "Construct a federated on-premise healthcare intelligence engine combining medical image segmentation (DICOM) and electronic health records for early acute oncology detection without patient data egress.",
    capacity: 20,
    active: true
  },
  {
    number: 5,
    id: "PS-05",
    category: "FinTech",
    title: "Autonomous Algorithmic Fraud Interception & Graph Analysis",
    description: "Deploy a high-throughput transaction surveillance engine utilizing dynamic temporal graph neural networks (GNN) to flag layered money muling networks and synthetic identities within 25 milliseconds.",
    capacity: 20,
    active: true
  },
  {
    number: 6,
    id: "PS-06",
    category: "Smart Cities",
    title: "Adaptive Urban Traffic Signal Optimization via Edge Vision",
    description: "Build an edge-computing vision mesh that dynamically throttles metropolitan traffic intersections based on real-time pedestrian density, emergency vehicle beacon triangulation, and queue velocities.",
    capacity: 20,
    active: true
  },
  {
    number: 7,
    id: "PS-07",
    category: "ClimateTech",
    title: "Decarbonization Ledger & Satellite Methane Emission Tracker",
    description: "Create an open verification system reconciling high-resolution multispectral ESA Sentinel-5P satellite telemetry with enterprise carbon credit registries to eliminate greenwashing.",
    capacity: 20,
    active: true
  },
  {
    number: 8,
    id: "PS-08",
    category: "EdTech",
    title: "Adaptive Neuro-Cognitive Learning Assistant with Socratic Logic",
    description: "Engineer an open-source adaptive educational platform that diagnoses individual student conceptual gaps through multi-turn dialectical dialogues and auto-generates interactive 3D visualizations.",
    capacity: 20,
    active: true
  },
  {
    number: 9,
    id: "PS-09",
    category: "IoT/Robotics",
    title: "Decentralized Swarm Robotics Coordination for Disaster Relief",
    description: "Develop a fault-tolerant ad-hoc mesh networking protocol for aerial and ground robotic swarms operating in GPS-denied catastrophe zones to perform coordinated 3D volumetric search and rescue mapping.",
    capacity: 20,
    active: true
  },
  {
    number: 10,
    id: "PS-10",
    category: "Open Innovation",
    title: "Next-Gen Developer Experience: Voice & Spatial Vibe Coding",
    description: "Create a multimodal developer interface bridging natural language, ambient voice programming, and spatial code visualizers that allows engineers to prototype full-stack cloud applications in minutes.",
    capacity: 20,
    active: true
  }
];

// Seed Sample Teams with Submissions if none exist
const DEFAULT_SEED_TEAMS = [
  {
    code: "UDB-PASS-8921",
    teamName: "Apex Innovators",
    leaderName: "Aditi Sharma",
    leaderEmail: "aditi.sharma@piet.poornima.org",
    leaderPhone: "+91 98290 11223",
    college: "Poornima Institute of Engineering and Technology, Jaipur",
    track: "AI/ML",
    members: ["Aditi Sharma (Lead)", "Rahul Jain", "Megha Soni", "Karan Dave"],
    psId: "PS-01",
    githubUrl: "https://github.com/hackathon2027/apex-agentic-refactor",
    figmaUrl: "https://figma.com/@apex/vibe-refactor-deck",
    demoVideoUrl: "https://youtu.be/apex-demo-2027",
    submissionTime: "2027-01-28 18:45 IST",
    status: "Submitted"
  },
  {
    code: "UDB-PASS-4410",
    teamName: "CyberKnights",
    leaderName: "Rohan Verma",
    leaderEmail: "rohan.v@mnit.ac.in",
    leaderPhone: "+91 97841 33445",
    college: "MNIT Jaipur",
    track: "CyberSecurity",
    members: ["Rohan Verma (Lead)", "Aakash Gupta", "Deepak Rao"],
    psId: "PS-03",
    githubUrl: "https://github.com/cyberknights/ebpf-sentinel",
    figmaUrl: "https://figma.com/@cyberknights/hud-console",
    demoVideoUrl: "https://youtu.be/cyberknights-demo",
    submissionTime: "2027-01-28 19:10 IST",
    status: "Submitted"
  },
  {
    code: "UDB-PASS-2027",
    teamName: "Quantum EVM Labs",
    leaderName: "Sneha Patel",
    leaderEmail: "sneha.patel@bits-pilani.ac.in",
    leaderPhone: "+91 94140 55667",
    college: "BITS Pilani",
    track: "Web3",
    members: ["Sneha Patel (Lead)", "Vikram Solanki", "Anirudh B."],
    psId: "PS-02",
    githubUrl: "https://github.com/quantum-evm/zk-bridge-core",
    figmaUrl: "https://figma.com/@quantum-evm/cross-chain-ui",
    demoVideoUrl: "https://youtu.be/zk-bridge-demo",
    submissionTime: "2027-01-28 19:35 IST",
    status: "Submitted"
  },
  {
    code: "UDB-PASS-7302",
    teamName: "BioPulse Edge",
    leaderName: "Dr. Aman Mehta",
    leaderEmail: "aman.mehta@jecrc.ac.in",
    leaderPhone: "+91 96190 77889",
    college: "JECRC University, Jaipur",
    track: "HealthTech",
    members: ["Aman Mehta (Lead)", "Simran Kaur", "Harshit Vyas"],
    psId: "PS-04",
    githubUrl: "https://github.com/biopulse/edge-dicom-copilot",
    figmaUrl: "https://figma.com/@biopulse/doctor-dashboard",
    demoVideoUrl: "https://youtu.be/biopulse-demo",
    submissionTime: "2027-01-28 20:00 IST",
    status: "Submitted"
  },
  {
    code: "UDB-PASS-5184",
    teamName: "FraudSentinel AI",
    leaderName: "Priya Kulkarni",
    leaderEmail: "priya.k@iitj.ac.in",
    leaderPhone: "+91 95400 88990",
    college: "IIT Jodhpur",
    track: "FinTech",
    members: ["Priya Kulkarni (Lead)", "Naveen Raj", "Tanmay Joshi", "Siddhi Agrawal"],
    psId: "PS-05",
    githubUrl: "https://github.com/fraud-sentinel/temporal-gnn-engine",
    figmaUrl: "https://figma.com/@fraudsentinel/investigator-portal",
    demoVideoUrl: "https://youtu.be/fraud-sentinel-demo",
    submissionTime: "2027-01-28 20:25 IST",
    status: "Submitted"
  },
  {
    code: "UDB-PASS-9631",
    teamName: "AmbientVibe Engine",
    leaderName: "Divya Mathur",
    leaderEmail: "divya.mathur@piet.poornima.org",
    leaderPhone: "+91 98877 66554",
    college: "Poornima Institute of Engineering and Technology, Jaipur",
    track: "Open Innovation",
    members: ["Divya Mathur (Lead)", "Aayush Sharma", "Kunal Tiwari"],
    psId: "PS-10",
    githubUrl: "https://github.com/ambient-vibe/spatial-voice-ide",
    figmaUrl: "https://figma.com/@ambientvibe/spatial-code-canvas",
    demoVideoUrl: "https://youtu.be/ambientvibe-demo",
    submissionTime: "2027-01-28 20:50 IST",
    status: "Submitted"
  }
];

// Seed Sample Scores
// Seed Sample Scores (Aligned with Mentor 3-Round 5-Parameter Rubric)
const DEFAULT_SEED_SCORES = {
  "UDB-PASS-8921": {
    teamName: "Apex Innovators",
    mentorName: "Dr. Alok Sharma (AI/ML Lead, Hack2Skill)",
    round1: {
      param1: 19, param2: 19, param3: 18, param4: 19, param5: 19,
      total: 94,
      remarks: "Brilliant problem framing. Multi-agent AST pipeline design is sound and well researched.",
      locked: true,
      lockedAt: "2027-01-28 22:30 IST"
    },
    round2: {
      param1: 20, param2: 19, param3: 19, param4: 19, param5: 19,
      total: 96,
      remarks: "AST parser and LLM agentic orchestrator working flawlessly on benchmark repo.",
      locked: true,
      lockedAt: "2027-01-29 06:15 IST"
    },
    round3: {
      param1: 20, param2: 20, param3: 19, param4: 20, param5: 19,
      total: 98,
      remarks: "World-class live demo! Automated vulnerability patch & regression suite verified without crashes.",
      locked: true,
      lockedAt: "2027-01-29 11:30 IST"
    },
    totalScore: 96,
    grandTotal: 288,
    grandAvg: 96.0,
    innovation: 24,
    technical: 25,
    feasibility: 23,
    presentation: 24,
    remarks: "Exceptional multi-agent orchestration architecture across all 3 rounds. Flawless live demo of automated AST transformation and security patch validation.",
    mentorLocked: true,
    mentorLockedAt: "2027-01-29 11:30 IST",
    adminApproved: true,
    adminApprovedAt: "2027-01-29 12:05 IST"
  },
  "UDB-PASS-4410": {
    teamName: "CyberKnights",
    mentorName: "Priya Nair (Senior Cloud Security Architect)",
    round1: {
      param1: 18, param2: 19, param3: 18, param4: 17, param5: 18,
      total: 90,
      remarks: "Kernel telemetry approach using eBPF is technically challenging and highly novel.",
      locked: true,
      lockedAt: "2027-01-28 22:45 IST"
    },
    round2: {
      param1: 19, param2: 19, param3: 19, param4: 18, param5: 18,
      total: 93,
      remarks: "Probes capture socket anomalies in user space with negligible CPU footprint.",
      locked: true,
      lockedAt: "2027-01-29 06:40 IST"
    },
    round3: {
      param1: 19, param2: 20, param3: 19, param4: 18, param5: 19,
      total: 95,
      remarks: "Deep kernel-level instrumentation using pure C eBPF probes. Negligible overhead (<1.2% CPU).",
      locked: true,
      lockedAt: "2027-01-29 11:45 IST"
    },
    totalScore: 93,
    grandTotal: 278,
    grandAvg: 92.7,
    innovation: 23,
    technical: 24,
    feasibility: 24,
    presentation: 22,
    remarks: "Deep kernel-level instrumentation using pure C eBPF probes. Negligible overhead (<1.2% CPU). Impressive defensive containment.",
    mentorLocked: true,
    mentorLockedAt: "2027-01-29 11:45 IST",
    adminApproved: true,
    adminApprovedAt: "2027-01-29 12:10 IST"
  },
  "UDB-PASS-2027": {
    teamName: "Quantum EVM Labs",
    mentorName: "Vikram Solanki (Web3 Research Fellow)",
    round1: {
      param1: 18, param2: 18, param3: 17, param4: 17, param5: 18,
      total: 88,
      remarks: "Decentralized liquidity bridge concept with zk proofs is well formulated.",
      locked: true,
      lockedAt: "2027-01-28 23:00 IST"
    },
    round2: {
      param1: 18, param2: 19, param3: 18, param4: 17, param5: 18,
      total: 90,
      remarks: "Circom circuits compiling cleanly, verifier smart contract deployed on testnet.",
      locked: true,
      lockedAt: "2027-01-29 07:10 IST"
    },
    round3: {
      param1: 19, param2: 19, param3: 18, param4: 18, param5: 19,
      total: 93,
      remarks: "Clean zk-proof implementation with state verification on local testnet. Great gas optimization.",
      locked: true,
      lockedAt: "2027-01-29 11:55 IST"
    },
    totalScore: 90,
    grandTotal: 271,
    grandAvg: 90.3,
    innovation: 22,
    technical: 23,
    feasibility: 22,
    presentation: 23,
    remarks: "Clean Circom zk-proof implementation with state verification on local testnet. Great gas optimization.",
    mentorLocked: true,
    mentorLockedAt: "2027-01-29 11:55 IST",
    adminApproved: true,
    adminApprovedAt: "2027-01-29 12:15 IST"
  },
  "UDB-PASS-7302": {
    teamName: "BioPulse Edge",
    mentorName: "Dr. Alok Sharma (AI/ML Lead, Hack2Skill)",
    round1: {
      param1: 18, param2: 17, param3: 18, param4: 17, param5: 17,
      total: 87,
      remarks: "Edge copilot for clinical scans shows great promise. Local privacy is a key differentiator.",
      locked: true,
      lockedAt: "2027-01-28 23:15 IST"
    },
    round2: {
      param1: 18, param2: 18, param3: 19, param4: 17, param5: 17,
      total: 89,
      remarks: "DICOM segmentation pipeline performs reliably under edge hardware constraints.",
      locked: true,
      lockedAt: "2027-01-29 07:30 IST"
    },
    round3: {
      param1: 17, param2: 17, param3: 19, param4: 17, param5: 18,
      total: 88,
      remarks: "High practical clinical utility. Multimodal fusing of DICOM and lab panels validated.",
      locked: true,
      lockedAt: "2027-01-29 12:05 IST"
    },
    totalScore: 88,
    grandTotal: 264,
    grandAvg: 88.0,
    innovation: 22,
    technical: 21,
    feasibility: 23,
    presentation: 22,
    remarks: "Strong privacy-preserving federated inference pipeline for oncology scans. Clean UI and solid clinical utility.",
    mentorLocked: true,
    mentorLockedAt: "2027-01-29 12:00 IST",
    adminApproved: true,
    adminApprovedAt: "2027-01-29 12:20 IST"
  },
  "UDB-PASS-5184": {
    teamName: "FraudSentinel AI",
    mentorName: "Sarah Jenkins (FinTech Advisor)",
    round1: {
      param1: 17, param2: 18, param3: 17, param4: 17, param5: 17,
      total: 86,
      remarks: "Graph neural net architecture for mule detection is solid.",
      locked: true,
      lockedAt: "2027-01-28 23:25 IST"
    },
    round2: {
      param1: 17, param2: 18, param3: 17, param4: 17, param5: 17,
      total: 86,
      remarks: "Sub-25ms response latency achieved with in-memory caching.",
      locked: true,
      lockedAt: "2027-01-29 07:45 IST"
    },
    round3: {
      param1: 18, param2: 17, param3: 17, param4: 17, param5: 17,
      total: 86,
      remarks: "Real-time graph visualization highlighting mule rings. Scalable microservices design.",
      locked: true,
      lockedAt: "2027-01-29 12:10 IST"
    },
    totalScore: 86,
    grandTotal: 258,
    grandAvg: 86.0,
    innovation: 21,
    technical: 22,
    feasibility: 22,
    presentation: 21,
    remarks: "Real-time graph visualization highlighting mule rings. Scalable microservices design with Redis cache.",
    mentorLocked: true,
    mentorLockedAt: "2027-01-29 12:10 IST",
    adminApproved: true,
    adminApprovedAt: "2027-01-29 12:22 IST"
  },
  "UDB-PASS-9631": {
    teamName: "AmbientVibe Engine",
    mentorName: "Dr. Alok Sharma (AI/ML Lead, Hack2Skill)",
    round1: {
      param1: 18, param2: 16, param3: 17, param4: 17, param5: 17,
      total: 85,
      remarks: "Novel audio spatial interface concept. Speech-to-code engine has high engagement.",
      locked: true,
      lockedAt: "2027-01-28 23:35 IST"
    },
    round2: {
      param1: 17, param2: 17, param3: 17, param4: 17, param5: 17,
      total: 85,
      remarks: "Latency under 200ms for AST code reconstruction from natural voice.",
      locked: true,
      lockedAt: "2027-01-29 08:00 IST"
    },
    round3: {
      param1: 18, param2: 16, param3: 17, param4: 17, param5: 17,
      total: 85,
      remarks: "Truly delightful vibe coding experience. Audio recognition responds swiftly to voice directives.",
      locked: true,
      lockedAt: "2027-01-29 12:15 IST"
    },
    totalScore: 85,
    grandTotal: 255,
    grandAvg: 85.0,
    innovation: 24,
    technical: 20,
    feasibility: 19,
    presentation: 22,
    remarks: "Truly delightful vibe coding experience. Audio recognition responds swiftly to voice directives.",
    mentorLocked: true,
    mentorLockedAt: "2027-01-29 12:15 IST",
    adminApproved: false,
    adminApprovedAt: null
  }
};

class AdminOrchestrator {
  constructor() {
    this.authenticated = false;
    this.currentTab = 'theme';
    this.activeModalTeamCode = null;
    this.init();
  }

  init() {
    this.ensureDefaults();
    this.checkSession();
    this.bindEvents();
    this.renderAll();
    this.initClock();
  }

  initClock() {
    const update = () => {
      const now = new Date();
      const str = now.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour12: false });
      const el = document.getElementById('admClockBadge');
      if (el) el.innerHTML = `<span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:#00f5d4;margin-right:6px;animation:pulse 1.5s infinite;"></span>${str} IST`;
    };
    update();
    setInterval(update, 1000);
  }

  ensureDefaults() {
    // Problem Statements
    if (!localStorage.getItem(SK_PROBLEM_STATEMENTS)) {
      localStorage.setItem(SK_PROBLEM_STATEMENTS, JSON.stringify(OFFICIAL_DEFAULT_PS));
    }
    // Teams
    let teams = [];
    try {
      teams = JSON.parse(localStorage.getItem(SK_TEAMS_DB)) || [];
    } catch (e) {}
    if (!teams) {
      localStorage.setItem(SK_TEAMS_DB, JSON.stringify([]));
    }
    let scores = {};
    try {
      scores = JSON.parse(localStorage.getItem(SK_TEAM_SCORES)) || {};
    } catch (e) {}
    if (!scores) {
      localStorage.setItem(SK_TEAM_SCORES, JSON.stringify({}));
    }
    // Theme state
    if (!localStorage.getItem(SK_THEME_STATE)) {
      localStorage.setItem(SK_THEME_STATE, 'locked');
    }
    // Theme admin only (default: false or true as configured)
    if (localStorage.getItem(SK_THEME_ADMIN_ONLY) === null) {
      localStorage.setItem(SK_THEME_ADMIN_ONLY, 'false');
    }
    // Standings published (default: false)
    if (localStorage.getItem(SK_STANDINGS_PUBLISHED) === null) {
      localStorage.setItem(SK_STANDINGS_PUBLISHED, 'false');
    }
    // Theme Name & Tagline defaults
    if (!localStorage.getItem(SK_THEME_NAME) && !localStorage.getItem('udbhav_theme_name')) {
      localStorage.setItem(SK_THEME_NAME, 'EXPONENTIAL INTELLIGENCE & DECENTRALIZED PROTOCOLS');
      localStorage.setItem('udbhav_theme_name', 'EXPONENTIAL INTELLIGENCE & DECENTRALIZED PROTOCOLS');
    }
    if (!localStorage.getItem(SK_THEME_TAGLINE) && !localStorage.getItem('udbhav_theme_tagline')) {
      localStorage.setItem(SK_THEME_TAGLINE, 'Autonomous Agents, Web3 Sovereignty, Neuro-Symbolic Computing & Climate Intelligence');
      localStorage.setItem('udbhav_theme_tagline', 'Autonomous Agents, Web3 Sovereignty, Neuro-Symbolic Computing & Climate Intelligence');
    }
    if (!localStorage.getItem(SK_THEME_SCHEDULED)) {
      localStorage.setItem(SK_THEME_SCHEDULED, '2027-01-28T09:00');
    }
  }

  checkSession() {
    const isAuth = sessionStorage.getItem(SK_ADMIN_AUTH) === 'true' || localStorage.getItem(SK_ADMIN_AUTH) === 'true';
    if (isAuth) {
      this.unlockInterface();
    } else {
      this.lockInterface();
    }
  }

  togglePassVisibility() {
    const input = document.getElementById('adminMasterPassInput');
    if (input) {
      input.type = input.type === 'password' ? 'text' : 'password';
    }
  }

  authenticate(providedPass) {
    const input = document.getElementById('adminMasterPassInput');
    const val = (providedPass || (input ? input.value : '')).trim();
    const normalized = val.toLowerCase();

    const validKeys = [
      'rishi@5630dr', 'admin2027', 'piet2027', 'admin', 'piet', 
      'ggc2027', 'hack2skill', 'h2s', 'h2s2027', 'director2027', 'root', 'superadmin'
    ];

    const feedback = document.getElementById('adminGateFeedback');

    if (val === 'Rishi@5630dr' || normalized === 'rishi@5630dr' || validKeys.includes(normalized)) {
      sessionStorage.setItem(SK_ADMIN_AUTH, 'true');
      localStorage.setItem(SK_ADMIN_AUTH, 'true');
      sessionStorage.setItem('hs27_mentor_auth', 'true');
      localStorage.setItem('hs27_mentor_auth', 'true');
      if (feedback) {
        feedback.className = 'adm-gate-feedback success';
        feedback.innerHTML = '✓ Authorization Granted. Loading Master Orchestrator...';
      }
      setTimeout(() => {
        this.unlockInterface();
        this.showToast('Master Orchestration Console Unlocked');
      }, 350);
    } else {
        const card = document.querySelector('.adm-gate-card');
        if (card) {
          card.classList.remove('shake');
          void card.offsetWidth;
          card.classList.add('shake');
        }
        if (feedback) {
          feedback.className = 'adm-gate-feedback error';
          feedback.innerHTML = '&#10005; Access Denied: Invalid Master Authorization Key';
        }
      if (input) {
        input.focus();
        input.select();
      }
    }
  }

  quickFillPass(key) {
    const input = document.getElementById('adminMasterPassInput');
    if (input) input.value = key;
    this.authenticate(key);
  }

  unlockInterface() {
    this.authenticated = true;
    const gate = document.getElementById('adminGateScreen');
    if (gate) gate.classList.add('hidden');
    this.renderAll();
  }

  lockInterface() {
    this.authenticated = false;
    const gate = document.getElementById('adminGateScreen');
    if (gate) gate.classList.remove('hidden');
  }

  logout() {
    sessionStorage.removeItem(SK_ADMIN_AUTH);
    localStorage.removeItem(SK_ADMIN_AUTH);
    this.lockInterface();
    this.showToast('Admin Session Terminated');
  }

  bindEvents() {
    // Cross-tab synchronization
    window.addEventListener('storage', (e) => {
      const watched = [SK_THEME_STATE, SK_THEME_ADMIN_ONLY, SK_PROBLEM_STATEMENTS, SK_TEAMS_DB, SK_TEAM_SCORES, SK_STANDINGS_PUBLISHED];
      if (e && e.key && watched.includes(e.key)) {
        this.renderAll();
      }
    });
  }

  switchTab(tabId) {
    this.currentTab = tabId;
    document.querySelectorAll('.adm-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
    });
    document.querySelectorAll('.adm-panel-section').forEach(sec => {
      sec.classList.toggle('active', sec.id === `tab-${tabId}`);
    });
  }

  renderAll() {
    this.renderMetrics();
    this.renderThemeControls();
    this.renderProblemStatements();
    this.renderTeamsRoster();
    this.renderScoringQueue();
    this.renderMentors();
  }

  /* ── 1. METRICS ── */
  renderMetrics() {
    const teams = this.getTeams();
    const scores = this.getScores();
    const published = localStorage.getItem(SK_STANDINGS_PUBLISHED) === 'true';

    let mentorLockedCount = 0;
    let adminApprovedCount = 0;
    let totalScoreSum = 0;

    Object.values(scores).forEach(s => {
      if (s.mentorLocked) mentorLockedCount++;
      if (s.adminApproved) adminApprovedCount++;
      totalScoreSum += (s.totalScore || 0);
    });

    const avgScore = mentorLockedCount > 0 ? (totalScoreSum / mentorLockedCount).toFixed(1) : '--';

    const elTotalTeams = document.getElementById('metricTotalTeams');
    const elSubmissions = document.getElementById('metricSubmissions');
    const elMentorLocked = document.getElementById('metricMentorLocked');
    const elAdminApproved = document.getElementById('metricAdminApproved');
    const elStandingsStatus = document.getElementById('metricStandingsStatus');

    if (elTotalTeams) elTotalTeams.textContent = teams.length;
    if (elSubmissions) elSubmissions.textContent = teams.filter(t => t.githubUrl || t.status === 'Submitted').length;
    if (elMentorLocked) elMentorLocked.textContent = mentorLockedCount;
    if (elAdminApproved) elAdminApproved.textContent = adminApprovedCount;
    if (elStandingsStatus) {
      elStandingsStatus.textContent = published ? 'LIVE' : 'DRAFT';
      elStandingsStatus.style.color = published ? 'var(--adm-green)' : 'var(--adm-yellow)';
    }

    // Tab counts
    const cTeams = document.getElementById('countTabTeams');
    const cPS = document.getElementById('countTabPS');
    const cScores = document.getElementById('countTabScores');
    if (cTeams) cTeams.textContent = teams.length;
    if (cPS) cPS.textContent = this.getProblemStatements().length;
    if (cScores) cScores.textContent = adminApprovedCount + '/' + teams.length;
  }

  /* ── 2. THEME REVEAL CONTROLS ── */
  renderThemeControls() {
    const currentState = localStorage.getItem(SK_THEME_STATE) || 'locked';
    const adminOnly = localStorage.getItem(SK_THEME_ADMIN_ONLY) === 'true';
    const published = localStorage.getItem(SK_STANDINGS_PUBLISHED) === 'true';

    // State badges
    const statusPill = document.getElementById('themeCurrentStatusPill');
    if (statusPill) {
      statusPill.textContent = currentState.toUpperCase();
      statusPill.className = `adm-badge ${currentState === 'live' ? 'green' : (currentState === 'countdown' ? 'yellow' : 'orange')}`;
    }

    // Admin Only Toggle
    const toggleAdminOnly = document.getElementById('toggleThemeAdminOnly');
    if (toggleAdminOnly) {
      toggleAdminOnly.checked = adminOnly;
    }

    // Standings Published Toggle
    const toggleStandingsPub = document.getElementById('toggleStandingsPublished');
    if (toggleStandingsPub) {
      toggleStandingsPub.checked = published;
    }

    // Active state on buttons
    document.querySelectorAll('.btn-theme-state').forEach(btn => {
      const state = btn.getAttribute('data-state');
      btn.classList.toggle('active-state', state === currentState);
    });

    // Theme Name & Tagline Inputs
    const elName = document.getElementById('admThemeNameInput');
    if (elName && !elName.dataset.userEdited) {
      elName.value = this.getThemeName();
    }
    const elTag = document.getElementById('admThemeTaglineInput');
    if (elTag && !elTag.dataset.userEdited) {
      elTag.value = this.getThemeTagline();
    }
    const elSched = document.getElementById('admThemeScheduleInput');
    if (elSched) {
      elSched.value = localStorage.getItem(SK_THEME_SCHEDULED) || '2027-01-28T09:00';
    }
    const elMatrixStatus = document.getElementById('admMatrixWallStatusText');
    if (elMatrixStatus) {
      const isRevealed = currentState === 'live' || localStorage.getItem('udbhav_theme_revealed') === 'true';
      if (isRevealed) {
        elMatrixStatus.textContent = '🟢 THEME REVEALED & BROADCASTING';
        elMatrixStatus.style.color = '#10b981';
      } else {
        elMatrixStatus.textContent = '🔒 LOCKED (AES-256 CIPHER TILES)';
        elMatrixStatus.style.color = '#ff5722';
      }
    }
  }

  setThemeState(state) {
    let endTime = null;
    if (state === 'countdown') {
      const countdownDuration = 10000; // 10 seconds F1 sequence
      endTime = Date.now() + countdownDuration;
      localStorage.setItem(SK_THEME_STATE, 'countdown');
      localStorage.setItem(SK_COUNTDOWN_END, String(endTime));
      this.showToast('Formula 1 Countdown Sequence Activated (10s)');
    } else {
      localStorage.setItem(SK_THEME_STATE, state);
      localStorage.removeItem(SK_COUNTDOWN_END);
      this.showToast(`Theme State set to: ${state.toUpperCase()}`);
    }
    localStorage.setItem('hs27_theme_last_sync', String(Date.now()));
    try {
      if (typeof BroadcastChannel !== 'undefined') {
        const bc = new BroadcastChannel('hs27_theme_sync');
        bc.postMessage({ type: 'STATE_CHANGE', state, endTime, timestamp: Date.now() });
        bc.close();
      }
    } catch(e) {}
    this.renderThemeControls();
  }

  toggleThemeAdminOnly(enabled) {
    localStorage.setItem(SK_THEME_ADMIN_ONLY, enabled ? 'true' : 'false');
    this.showToast(enabled ? 'Theme Reveal is now set to: JUST VISIBLE TO ME (Admin Only)' : 'Theme Reveal is now set to: PUBLIC VIEW');
    this.renderThemeControls();
  }

  toggleStandingsPublished(enabled) {
    localStorage.setItem(SK_STANDINGS_PUBLISHED, enabled ? 'true' : 'false');
    this.showToast(enabled ? 'Official Standings Published to Public' : 'Standings Reverted to Draft Mode');
    this.renderThemeControls();
    this.renderMetrics();
  }

  getThemeName() {
    return localStorage.getItem(SK_THEME_NAME) || localStorage.getItem('udbhav_theme_name') || 'EXPONENTIAL INTELLIGENCE & DECENTRALIZED PROTOCOLS';
  }

  getThemeTagline() {
    return localStorage.getItem(SK_THEME_TAGLINE) || localStorage.getItem('udbhav_theme_tagline') || 'Autonomous Agents, Web3 Sovereignty, Neuro-Symbolic Computing & Climate Intelligence';
  }

  saveThemeDetails() {
    const nameInput = document.getElementById('admThemeNameInput');
    const taglineInput = document.getElementById('admThemeTaglineInput');
    const schedInput = document.getElementById('admThemeScheduleInput');
    const name = (nameInput && nameInput.value.trim()) ? nameInput.value.trim() : this.getThemeName();
    const tagline = (taglineInput && taglineInput.value.trim()) ? taglineInput.value.trim() : this.getThemeTagline();
    const sched = schedInput ? schedInput.value : '2027-01-28T09:00';

    localStorage.setItem(SK_THEME_NAME, name);
    localStorage.setItem('udbhav_theme_name', name);
    localStorage.setItem(SK_THEME_TAGLINE, tagline);
    localStorage.setItem('udbhav_theme_tagline', tagline);
    localStorage.setItem(SK_THEME_SCHEDULED, sched);
    localStorage.setItem('hs27_theme_last_sync', String(Date.now()));

    try {
      if (typeof BroadcastChannel !== 'undefined') {
        const bc = new BroadcastChannel('hs27_theme_sync');
        bc.postMessage({ type: 'THEME_UPDATE', name: name, tagline: tagline, scheduledDate: sched, timestamp: Date.now() });
        bc.close();
      }
    } catch (e) {}

    this.showToast('✓ Theme Details Saved & Broadcasted');
    this.renderThemeControls();
  }

  trigger360ThemeReveal() {
    const nameInput = document.getElementById('admThemeNameInput');
    const taglineInput = document.getElementById('admThemeTaglineInput');
    const name = (nameInput && nameInput.value.trim()) ? nameInput.value.trim() : this.getThemeName();
    const tagline = (taglineInput && taglineInput.value.trim()) ? taglineInput.value.trim() : this.getThemeTagline();

    localStorage.setItem(SK_THEME_NAME, name);
    localStorage.setItem('udbhav_theme_name', name);
    localStorage.setItem(SK_THEME_TAGLINE, tagline);
    localStorage.setItem('udbhav_theme_tagline', tagline);
    localStorage.setItem(SK_THEME_STATE, 'live');
    localStorage.setItem('udbhav_theme_revealed', 'true');
    localStorage.setItem('hs27_theme_last_sync', String(Date.now()));

    try {
      if (typeof BroadcastChannel !== 'undefined') {
        const bc = new BroadcastChannel('hs27_theme_sync');
        bc.postMessage({ type: 'MATRIX_REVEAL_360', state: 'live', name: name, tagline: tagline, timestamp: Date.now() });
        bc.close();
      }
    } catch (e) {}

    this.showToast('🚀 360° THEME REVEAL TRIGGERED! All screens synchronized!');
    this.renderThemeControls();
  }

  reLockMatrixWall() {
    localStorage.setItem(SK_THEME_STATE, 'locked');
    localStorage.setItem('udbhav_theme_revealed', 'false');
    localStorage.setItem('hs27_theme_last_sync', String(Date.now()));

    try {
      if (typeof BroadcastChannel !== 'undefined') {
        const bc = new BroadcastChannel('hs27_theme_sync');
        bc.postMessage({ type: 'MATRIX_LOCK_VAULT', state: 'locked', timestamp: Date.now() });
        bc.close();
      }
    } catch (e) {}

    this.showToast('🔒 Matrix Wall Re-Locked to Encrypted AES-256 Cipher');
    this.renderThemeControls();
  }

  broadcastMatrixSpin360() {
    try {
      if (typeof BroadcastChannel !== 'undefined') {
        const bc = new BroadcastChannel('hs27_theme_sync');
        bc.postMessage({ type: 'MATRIX_SPIN_360', timestamp: Date.now() });
        bc.close();
      }
    } catch (e) {}
    this.showToast('🔄 Sent 360° Matrix Wall Rotation Spin Command');
  }

  broadcastMatrixTileRipple() {
    try {
      if (typeof BroadcastChannel !== 'undefined') {
        const bc = new BroadcastChannel('hs27_theme_sync');
        bc.postMessage({ type: 'MATRIX_TILE_RIPPLE', timestamp: Date.now() });
        bc.close();
      }
    } catch (e) {}
    this.showToast('⚡ Sent Matrix Cascade Ripple Command');
  }

  /* ── 3. PROBLEM STATEMENTS MANAGER ── */
  getProblemStatements() {
    try {
      return JSON.parse(localStorage.getItem(SK_PROBLEM_STATEMENTS)) || OFFICIAL_DEFAULT_PS;
    } catch (e) {
      return OFFICIAL_DEFAULT_PS;
    }
  }

  renderProblemStatements() {
    const list = document.getElementById('adminPsGrid');
    if (!list) return;

    const statements = this.getProblemStatements();
    list.innerHTML = statements.map((ps, idx) => `
      <div class="adm-ps-card" data-idx="${idx}">
        <div class="adm-ps-card-top">
          <span class="adm-ps-num-badge">${ps.id || ('PS-0' + (idx + 1))}</span>
          <select class="adm-ps-cat-select" onchange="admOrchestrator.updatePsField(${idx}, 'category', this.value)">
            ${['AI/ML', 'Web3', 'CyberSecurity', 'HealthTech', 'FinTech', 'Smart Cities', 'ClimateTech', 'EdTech', 'IoT/Robotics', 'Open Innovation']
              .map(cat => `<option value="${cat}" ${ps.category === cat ? 'selected' : ''}>${cat}</option>`).join('')}
          </select>
        </div>
        <input type="text" class="adm-ps-title-input" value="${this.escapeHtml(ps.title)}" placeholder="Problem Statement Title"
          onchange="admOrchestrator.updatePsField(${idx}, 'title', this.value)" />
        <textarea class="adm-ps-desc-textarea" placeholder="Detailed technical requirement & expected deliverable"
          onchange="admOrchestrator.updatePsField(${idx}, 'description', this.value)">${this.escapeHtml(ps.description)}</textarea>
        <div class="adm-ps-footer">
          <div class="adm-ps-capacity-wrap">
            <span>Capacity Limit:</span>
            <input type="number" class="adm-ps-cap-input" min="5" max="100" value="${ps.capacity || 20}"
              onchange="admOrchestrator.updatePsField(${idx}, 'capacity', parseInt(this.value) || 20)" />
          </div>
          <label style="display:flex;align-items:center;gap:6px;cursor:pointer;">
            <input type="checkbox" ${ps.active !== false ? 'checked' : ''} onchange="admOrchestrator.updatePsField(${idx}, 'active', this.checked)">
            <span>Active</span>
          </label>
        </div>
      </div>
    `).join('');
  }

  updatePsField(idx, field, val) {
    const statements = this.getProblemStatements();
    if (statements[idx]) {
      statements[idx][field] = val;
      localStorage.setItem(SK_PROBLEM_STATEMENTS, JSON.stringify(statements));
      localStorage.setItem('hs27_theme_last_sync', String(Date.now()));
      try {
        if (typeof BroadcastChannel !== 'undefined') {
          const bc = new BroadcastChannel('hs27_theme_sync');
          bc.postMessage({ type: 'PROBLEM_UPDATED', index: idx, timestamp: Date.now() });
          bc.close();
        }
      } catch(e) {}
      this.showToast(`Updated ${statements[idx].id || 'PS'} (${field})`);
    }
  }

  saveAllProblemStatements() {
    this.showToast('All 10 Problem Statements Saved to Database');
  }

  resetProblemStatementsToDefault() {
    if (confirm("Reset all 10 Problem Statements to the official Hackathon 2027 defaults?")) {
      localStorage.setItem(SK_PROBLEM_STATEMENTS, JSON.stringify(OFFICIAL_DEFAULT_PS));
      this.renderProblemStatements();
      this.showToast('Problem Statements reset to defaults');
    }
  }

  /* ── 4. TEAMS & SUBMISSIONS ROSTER ── */
  getTeams() {
    try {
      return JSON.parse(localStorage.getItem(SK_TEAMS_DB)) || [];
    } catch (e) {
      return [];
    }
  }

  getScores() {
    try {
      return JSON.parse(localStorage.getItem(SK_TEAM_SCORES)) || {};
    } catch (e) {
      return {};
    }
  }

  renderTeamsRoster() {
    const tbody = document.getElementById('adminTeamsTableBody');
    if (!tbody) return;

    const teams = this.getTeams();
    const scores = this.getScores();

    const search = (document.getElementById('adminTeamSearchInput')?.value || '').toLowerCase();
    const filterTrack = document.getElementById('adminTeamTrackFilter')?.value || 'all';

    const filtered = teams.filter(t => {
      const matchSearch = !search || 
        (t.teamName && t.teamName.toLowerCase().includes(search)) ||
        (t.code && t.code.toLowerCase().includes(search)) ||
        (t.leaderName && t.leaderName.toLowerCase().includes(search));
      const matchTrack = filterTrack === 'all' || t.track === filterTrack;
      return matchSearch && matchTrack;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:36px;color:var(--adm-text-muted);">No teams found matching search criteria.</td></tr>`;
      return;
    }

    tbody.innerHTML = filtered.map((team, idx) => {
      const scoreData = scores[team.code] || {};
      const totalScore = scoreData.totalScore !== undefined ? scoreData.totalScore : '--';
      const r1 = scoreData.round1?.total !== undefined ? scoreData.round1.total : '--';
      const r2 = scoreData.round2?.total !== undefined ? scoreData.round2.total : '--';
      const r3 = scoreData.round3?.total !== undefined ? scoreData.round3.total : '--';
      const isMentorLocked = !!scoreData.mentorLocked;
      const isAdminApproved = !!scoreData.adminApproved;

      return `
        <tr>
          <td><span style="font-family:var(--adm-font-mono);font-size:0.75rem;">#${idx + 1}</span></td>
          <td>
            <div class="adm-team-name-cell">
              <span>${this.escapeHtml(team.teamName || 'Squad')}</span>
              <span class="adm-team-code">${team.code || 'PASS-UNASSIGNED'}</span>
            </div>
          </td>
          <td>
            <div style="font-size:0.85rem;color:#fff;">${this.escapeHtml(team.leaderName || 'Squad Lead')}</div>
            <div style="font-size:0.75rem;color:var(--adm-text-muted);">${this.escapeHtml(team.college || 'PIET Jaipur')}</div>
          </td>
          <td>
            <span class="adm-badge blue">${team.track || 'General'}</span>
            ${team.psId ? `<span class="adm-badge orange" style="margin-left:4px;">${team.psId}</span>` : ''}
          </td>
          <td>
            <div style="display:flex;gap:6px;">
              ${team.githubUrl ? `<a href="${team.githubUrl}" target="_blank" class="adm-btn-action-sm" title="Github Code">⌥ Code</a>` : '<span style="color:var(--adm-text-muted);font-size:0.75rem;">Pending</span>'}
              ${team.demoVideoUrl ? `<a href="${team.demoVideoUrl}" target="_blank" class="adm-btn-action-sm" title="Demo Video">▶ Demo</a>` : ''}
            </div>
          </td>
          <td>
            <div style="display:flex;align-items:center;gap:8px;">
              <span class="adm-score-cell">${totalScore}</span>
              ${isAdminApproved ? '<span class="adm-badge green" title="Locked by Admin">✓ FINAL</span>' : (isMentorLocked ? '<span class="adm-badge yellow" title="Locked by Mentor">🔒 MENTOR</span>' : '<span class="adm-badge" style="color:var(--adm-text-muted);">DRAFT</span>')}
            </div>
            <div style="font-size:0.68rem;color:var(--adm-text-muted);margin-top:4px;font-family:var(--adm-font-mono);">
              R1: ${r1} | R2: ${r2} | R3: ${r3}
            </div>
          </td>
          <td>
            <div class="adm-action-btns">
              <button class="adm-btn-action-sm" style="border-color:rgba(0,229,255,0.4);color:#00e5ff;" onclick="admOrchestrator.viewTeamTicket('${team.code}')">🎫 Ticket</button>
              <button class="adm-btn-action-sm" onclick="admOrchestrator.openScoreModal('${team.code}')">⚖ Score</button>
              ${isAdminApproved 
                ? `<button class="adm-btn-action-sm" style="color:var(--adm-yellow);" onclick="admOrchestrator.toggleAdminApproval('${team.code}', false)">Unlock</button>` 
                : `<button class="adm-btn-action-sm lock" onclick="admOrchestrator.toggleAdminApproval('${team.code}', true)">Approve & Lock</button>`}
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  /* ── 5. SCORING & FINAL APPROVALS ── */
  renderScoringQueue() {
    const container = document.getElementById('adminScoringSummaryList');
    if (!container) return;

    const teams = this.getTeams();
    const scores = this.getScores();

    // Sort by totalScore descending
    const ranked = [...teams].map(t => {
      const s = scores[t.code] || {};
      return { ...t, ...s, totalScore: (s.totalScore !== undefined ? s.totalScore : -1) };
    }).sort((a, b) => b.totalScore - a.totalScore);

    container.innerHTML = ranked.map((item, idx) => `
      <div class="adm-card" style="padding:18px 24px;margin-bottom:12px;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;">
        <div style="display:flex;align-items:center;gap:16px;">
          <div style="font-family:var(--adm-font-head);font-size:1.5rem;font-weight:900;color:${idx === 0 ? '#ffd700' : (idx === 1 ? '#c0c0c0' : (idx === 2 ? '#cd7f32' : 'var(--adm-text-muted)'))};min-width:32px;">
            #${idx + 1}
          </div>
          <div>
            <div style="font-weight:800;color:#fff;font-size:1rem;">${this.escapeHtml(item.teamName)}</div>
            <div style="font-family:var(--adm-font-mono);font-size:0.75rem;color:var(--adm-text-muted);">
              ${item.code} • ${item.track} • ${item.psId || 'PS-01'}
            </div>
          </div>
        </div>

        <div style="display:flex;align-items:center;gap:20px;flex-wrap:wrap;">
          <div style="text-align:right;">
            <div style="font-family:var(--adm-font-mono);font-size:1.25rem;font-weight:900;color:${item.totalScore >= 90 ? 'var(--adm-green)' : (item.totalScore >= 80 ? 'var(--adm-cyan)' : '#fff')};">
              ${item.totalScore >= 0 ? item.totalScore + ' / 100' : 'UNSCORED'}
            </div>
            <div style="font-family:var(--adm-font-mono);font-size:0.7rem;color:var(--adm-text-muted);margin:2px 0;">
              R1: ${item.round1?.total || item.totalScore || '--'} | R2: ${item.round2?.total || item.totalScore || '--'} | R3: ${item.round3?.total || item.totalScore || '--'} | Grand: ${item.grandTotal || (item.totalScore >= 0 ? item.totalScore * 3 : '--')}/300
            </div>
            <div style="font-size:0.72rem;color:var(--adm-text-muted);">
              ${item.adminApproved ? '✓ VERIFIED BY ADMIN' : (item.mentorLocked ? '🔒 LOCKED BY MENTOR' : 'EVALUATION PENDING')}
            </div>
          </div>

          <div style="display:flex;gap:8px;">
            <button class="adm-btn-sec" onclick="admOrchestrator.openScoreModal('${item.code}')">Edit Criteria</button>
            ${item.adminApproved 
              ? `<button class="adm-btn-sec" style="color:var(--adm-yellow);" onclick="admOrchestrator.toggleAdminApproval('${item.code}', false)">Unlock</button>` 
              : `<button class="adm-btn-primary" style="padding:8px 16px;font-size:0.78rem;" onclick="admOrchestrator.toggleAdminApproval('${item.code}', true)">Approve & Lock ✓</button>`}
          </div>
        </div>
      </div>
    `).join('');
  }

  openScoreModal(teamCode) {
    this.activeModalTeamCode = teamCode;
    const teams = this.getTeams();
    const scores = this.getScores();

    const team = teams.find(t => t.code === teamCode) || { teamName: 'Squad ' + teamCode, code: teamCode };
    const score = scores[teamCode] || {
      innovation: 20,
      technical: 20,
      feasibility: 20,
      presentation: 20,
      totalScore: 80,
      remarks: '',
      mentorLocked: false,
      adminApproved: false
    };

    document.getElementById('modalTeamTitle').textContent = `${team.teamName} (${team.code})`;
    document.getElementById('modalTeamSubtitle').textContent = `${team.track || 'Track'} • ${team.psId || 'PS'}`;

    document.getElementById('rangeInnovation').value = score.innovation;
    document.getElementById('valInnovation').textContent = score.innovation;

    document.getElementById('rangeTechnical').value = score.technical;
    document.getElementById('valTechnical').textContent = score.technical;

    document.getElementById('rangeFeasibility').value = score.feasibility;
    document.getElementById('valFeasibility').textContent = score.feasibility;

    document.getElementById('rangePresentation').value = score.presentation;
    document.getElementById('valPresentation').textContent = score.presentation;

    document.getElementById('modalTotalScore').textContent = score.totalScore;
    document.getElementById('modalRemarksInput').value = score.remarks || '';

    const modal = document.getElementById('adminScoreModal');
    if (modal) modal.classList.add('open');
  }

  closeScoreModal() {
    this.activeModalTeamCode = null;
    const modal = document.getElementById('adminScoreModal');
    if (modal) modal.classList.remove('open');
  }

  onModalScoreSliderChange() {
    const inv = parseInt(document.getElementById('rangeInnovation').value) || 0;
    const tec = parseInt(document.getElementById('rangeTechnical').value) || 0;
    const fea = parseInt(document.getElementById('rangeFeasibility').value) || 0;
    const pre = parseInt(document.getElementById('rangePresentation').value) || 0;

    document.getElementById('valInnovation').textContent = inv;
    document.getElementById('valTechnical').textContent = tec;
    document.getElementById('valFeasibility').textContent = fea;
    document.getElementById('valPresentation').textContent = pre;

    const total = inv + tec + fea + pre;
    document.getElementById('modalTotalScore').textContent = total;
  }

  saveModalScore() {
    if (!this.activeModalTeamCode) return;
    const teamCode = this.activeModalTeamCode;

    const inv = parseInt(document.getElementById('rangeInnovation').value) || 0;
    const tec = parseInt(document.getElementById('rangeTechnical').value) || 0;
    const fea = parseInt(document.getElementById('rangeFeasibility').value) || 0;
    const pre = parseInt(document.getElementById('rangePresentation').value) || 0;
    const remarks = document.getElementById('modalRemarksInput').value.trim();

    const scores = this.getScores();
    const teams = this.getTeams();
    const team = teams.find(t => t.code === teamCode) || { teamName: 'Squad ' + teamCode };

    const total = inv + tec + fea + pre;
    const existing = scores[teamCode] || {};

    const r1 = existing.round1 || { param1: Math.round(inv * 0.8), param2: Math.round(tec * 0.8), param3: Math.round(fea * 0.8), param4: Math.round(pre * 0.8), param5: Math.round(pre * 0.8), total: total, locked: true, remarks: remarks };
    const r2 = existing.round2 || { param1: Math.round(inv * 0.8), param2: Math.round(tec * 0.8), param3: Math.round(fea * 0.8), param4: Math.round(pre * 0.8), param5: Math.round(pre * 0.8), total: total, locked: true, remarks: remarks };
    const r3 = existing.round3 || { param1: Math.round(inv * 0.8), param2: Math.round(tec * 0.8), param3: Math.round(fea * 0.8), param4: Math.round(pre * 0.8), param5: Math.round(pre * 0.8), total: total, locked: true, remarks: remarks };

    const grandTotal = (r1.total || total) + (r2.total || total) + (r3.total || total);
    const grandAvg = parseFloat((grandTotal / 3).toFixed(1));

    scores[teamCode] = {
      ...existing,
      teamName: team.teamName,
      mentorName: existing.mentorName || "Admin Direct Evaluation",
      innovation: inv,
      technical: tec,
      feasibility: fea,
      presentation: pre,
      totalScore: total,
      round1: r1,
      round2: r2,
      round3: r3,
      grandTotal: grandTotal,
      grandAvg: grandAvg,
      remarks: remarks,
      adminApproved: true,
      adminApprovedAt: new Date().toISOString()
    };

    localStorage.setItem(SK_TEAM_SCORES, JSON.stringify(scores));
    try {
      if (typeof BroadcastChannel !== 'undefined') {
        const bc = new BroadcastChannel('hs27_theme_sync');
        bc.postMessage({ type: 'SCORE_SAVED', teamCode, timestamp: Date.now() });
        bc.close();
      }
    } catch(e) {}
    this.closeScoreModal();
    this.showToast(`Score updated and locked for ${team.teamName}`);
    this.renderAll();
  }

  toggleAdminApproval(teamCode, isApproved) {
    const scores = this.getScores();
    const teams = this.getTeams();
    const team = teams.find(t => t.code === teamCode) || { teamName: teamCode };

    if (!scores[teamCode]) {
      scores[teamCode] = {
        teamName: team.teamName,
        innovation: 20, technical: 20, feasibility: 20, presentation: 20,
        totalScore: 80,
        remarks: "Admin direct lock",
        mentorLocked: true
      };
    }

    scores[teamCode].adminApproved = isApproved;
    scores[teamCode].adminApprovedAt = isApproved ? new Date().toISOString() : null;

    localStorage.setItem(SK_TEAM_SCORES, JSON.stringify(scores));
    this.showToast(isApproved ? `✓ ${team.teamName} approved and locked` : `Unlocked ${team.teamName}`);
    this.renderAll();
  }

  approveAllEvaluatedTeams() {
    const scores = this.getScores();
    let count = 0;
    Object.keys(scores).forEach(code => {
      if (scores[code].mentorLocked) {
        scores[code].adminApproved = true;
        scores[code].adminApprovedAt = new Date().toISOString();
        count++;
      }
    });
    localStorage.setItem(SK_TEAM_SCORES, JSON.stringify(scores));
    this.showToast(`Approved and locked ${count} evaluated teams`);
    this.renderAll();
  }

  /* ── 6. DATA EXPORT & SEEDING ── */
  exportCSV() {
    const teams = this.getTeams();
    const scores = this.getScores();

    let csv = "Rank,Team Code,Team Name,Lead Name,Email,Track,Problem Statement,Round 1 (100),Round 2 (100),Round 3 (100),Grand Total (300),Innovation (25),Technical (25),Feasibility (25),Presentation (25),Total Score (100),Status\n";

    const ranked = [...teams].map(t => {
      const s = scores[t.code] || {};
      const r1 = s.round1?.total !== undefined ? s.round1.total : (s.totalScore || 0);
      const r2 = s.round2?.total !== undefined ? s.round2.total : 0;
      const r3 = s.round3?.total !== undefined ? s.round3.total : 0;
      const grand = s.grandTotal !== undefined ? s.grandTotal : (r1 + r2 + r3);
      return { ...t, ...s, r1, r2, r3, grand, totalScore: s.totalScore || 0 };
    }).sort((a, b) => b.totalScore - a.totalScore);

    ranked.forEach((r, i) => {
      csv += `${i + 1},"${r.code}","${r.teamName || ''}","${r.leaderName || ''}","${r.leaderEmail || ''}","${r.track || ''}","${r.psId || ''}",${r.r1},${r.r2},${r.r3},${r.grand},${r.innovation || 0},${r.technical || 0},${r.feasibility || 0},${r.presentation || 0},${r.totalScore || 0},"${r.adminApproved ? 'Approved' : 'Pending'}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hackathon_2027_standings_${Date.now()}.csv`;
    a.click();
    this.showToast('CSV export downloaded');
  }

  exportJSON() {
    const teams = this.getTeams();
    const scores = this.getScores();
    const ps = this.getProblemStatements();

    const data = {
      exportTime: new Date().toISOString(),
      problemStatements: ps,
      teams: teams,
      scores: scores,
      themeState: localStorage.getItem(SK_THEME_STATE),
      themeAdminOnly: localStorage.getItem(SK_THEME_ADMIN_ONLY),
      standingsPublished: localStorage.getItem(SK_STANDINGS_PUBLISHED)
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hackathon_2027_backup_${Date.now()}.json`;
    a.click();
    this.showToast('JSON backup exported');
  }

  seedDemoSubmissions() {
    localStorage.setItem(SK_TEAMS_DB, JSON.stringify(DEFAULT_SEED_TEAMS));
    localStorage.setItem(SK_TEAM_SCORES, JSON.stringify(DEFAULT_SEED_SCORES));
    this.renderAll();
    this.showToast('Demo submissions and mentor scores re-seeded');
  }

  /* ── 7. UTILS & TOAST ── */
  escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  showToast(msg) {
    let toast = document.getElementById('adminToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'adminToast';
      toast.className = 'adm-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }
}

// Global initialization
let admOrchestrator = null;
document.addEventListener('DOMContentLoaded', () => {
  admOrchestrator = new AdminOrchestrator();
  window.admOrchestrator = admOrchestrator;
});


  /* ── 6. MENTORS & JURY DIRECTORY CONTROLLER ── */
  getMentors() {
    try {
      return JSON.parse(localStorage.getItem(SK_MENTORS_DB)) || [];
    } catch(e) {
      return [];
    }
  }

  renderMentors() {
    const mentors = this.getMentors();
    const tbody = document.getElementById('adminMentorsTableBody');
    const badge = document.getElementById('countTabMentors');
    if (badge) badge.textContent = mentors.length;
    if (!tbody) return;

    if (mentors.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:36px;color:var(--adm-text-muted);">No mentors created yet. Click "+ ADD NEW MENTOR" to add evaluators to the panel.</td></tr>';
      return;
    }

    tbody.innerHTML = mentors.map((m, idx) => 
      <tr>
        <td>
          <div style="font-weight:700;color:#fff;">\</div>
          <div style="font-size:0.75rem;color:var(--adm-text-muted);font-family:var(--adm-font-mono);">JURY_\</div>
        </td>
        <td>
          <div style="font-size:0.85rem;color:#f0f6fc;">\</div>
          <div style="font-size:0.75rem;color:var(--adm-text-muted);">\</div>
        </td>
        <td>
          <span style="background:rgba(59,130,246,0.15);color:#60a5fa;border:1px solid rgba(59,130,246,0.3);padding:3px 8px;border-radius:4px;font-size:0.75rem;font-family:var(--adm-font-mono);">
            \
          </span>
        </td>
        <td>
          <code style="background:rgba(255,255,255,0.06);padding:3px 8px;border-radius:4px;color:var(--adm-orange);font-family:var(--adm-font-mono);font-size:0.8rem;">
            \
          </code>
        </td>
        <td style="font-size:0.8rem;color:var(--adm-text-sub);">
          \
        </td>
        <td>
          <button type="button" class="adm-action-btn" style="background:rgba(16,185,129,0.18);color:#34d399;border:1px solid rgba(16,185,129,0.35);padding:4px 10px;border-radius:6px;cursor:pointer;margin-right:6px;font-weight:700;" onclick="admOrchestrator.copyMentorCredentials(${idx})" title="Copy mentor login credentials to clipboard">📋 Copy Key</button><button type="button" class="adm-action-btn" style="background:#21262d;color:#f0f6fc;border:1px solid #30363d;padding:4px 10px;border-radius:6px;cursor:pointer;margin-right:6px;" onclick="admOrchestrator.openMentorModal(\)">Edit</button>
          <button type="button" class="adm-action-btn" style="background:rgba(248,81,73,0.15);color:#f85149;border:1px solid rgba(248,81,73,0.3);padding:4px 10px;border-radius:6px;cursor:pointer;" onclick="admOrchestrator.deleteMentor(\)">Delete</button>
        </td>
      </tr>
    ).join('');
  }

  openMentorModal(index = -1) {
    const modal = document.getElementById('modalMentorEditor');
    if (!modal) return;
    const mentors = this.getMentors();
    document.getElementById('mmeIndex').value = index;

    if (index >= 0 && mentors[index]) {
      const m = mentors[index];
      document.getElementById('mmeTitle').textContent = 'Edit Mentor & Credentials';
      const idEl = document.getElementById('mmeMentorId');
      if (idEl) idEl.value = m.mentorId || ('MNT-' + String(index + 1).padStart(2, '0'));
      document.getElementById('mmeName').value = m.name || '';
      document.getElementById('mmeRole').value = m.role || '';
      document.getElementById('mmeCompany').value = m.company || '';
      document.getElementById('mmeTrack').value = m.track || 'Agentic AI & Autonomy';
      document.getElementById('mmePasscode').value = m.passcode || 'mentor@2027';
      document.getElementById('mmeEmail').value = m.email || '';
      document.getElementById('mmePhoto').value = m.photo || '';
      document.getElementById('mmeBio').value = m.bio || '';
    } else {
      document.getElementById('mmeTitle').textContent = 'Assign New Mentor & Passcode';
      this.autoGenerateMentorId();
      document.getElementById('mmeName').value = '';
      document.getElementById('mmeRole').value = '';
      document.getElementById('mmeCompany').value = '';
      document.getElementById('mmeTrack').value = 'Agentic AI & Autonomy';
      this.generateRandomPasscode();
      document.getElementById('mmeEmail').value = '';
      document.getElementById('mmePhoto').value = '';
      document.getElementById('mmeBio').value = '';
    }
    modal.style.display = 'flex';
  }

  autoGenerateMentorId() {
    const randNum = Math.floor(1000 + Math.random() * 9000);
    const idEl = document.getElementById('mmeMentorId');
    if (idEl) idEl.value = `MNT-${randNum}`;
  }

  generateRandomPasscode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = 'Mnt#';
    for (let i = 0; i < 4; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    const passEl = document.getElementById('mmePasscode');
    if (passEl) passEl.value = code;
  }

  closeMentorModal() {
    const modal = document.getElementById('modalMentorEditor');
    if (modal) modal.style.display = 'none';
  }

  saveMentorFromModal() {
    const idEl = document.getElementById('mmeMentorId');
    const mentorId = idEl ? idEl.value.trim() : '';
    const name = (document.getElementById('mmeName').value || '').trim();
    const role = (document.getElementById('mmeRole').value || '').trim();
    const company = (document.getElementById('mmeCompany').value || '').trim();
    const track = document.getElementById('mmeTrack').value;
    const passcode = (document.getElementById('mmePasscode').value || '').trim();
    const email = (document.getElementById('mmeEmail').value || '').trim();
    const photo = (document.getElementById('mmePhoto').value || '').trim();
    const bio = (document.getElementById('mmeBio').value || '').trim();
    const index = parseInt(document.getElementById('mmeIndex').value, 10);

    if (!mentorId || !name || !role || !company || !passcode) {
      alert('Please fill out all required fields (Mentor ID, Full Name, Role, Company, and Passcode).');
      return;
    }

    const mentors = this.getMentors();
    const mentorObj = { mentorId, name, role, company, track, passcode, email, photo, bio, updatedAt: Date.now() };

    if (index >= 0 && index < mentors.length) {
      mentors[index] = mentorObj;
      this.showToast(`✓ Updated Mentor: ${name} (${mentorId})`);
    } else {
      mentors.push(mentorObj);
      this.showToast(`✓ Assigned New Mentor: ${name} (${mentorId})`);
    }

    localStorage.setItem(SK_MENTORS_DB, JSON.stringify(mentors));
    this.closeMentorModal();
    this.renderMentors();
  }

  copyMentorCredentials(index) {
    const mentors = this.getMentors();
    if (index < 0 || index >= mentors.length) return;
    const m = mentors[index];
    const textToCopy = `🔐 UDBHAV 2027 MENTOR CREDENTIALS\nPortal: mentor.html\nMentor ID: ${m.mentorId}\nPasscode: ${m.passcode}\nEvaluator: ${m.name}\nTrack: ${m.track}`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        this.showToast(`✓ Copied Login Credentials for ${m.name}`);
      }).catch(() => {
        prompt("Copy Mentor Credentials:", textToCopy);
      });
    } else {
      prompt("Copy Mentor Credentials:", textToCopy);
    }
  }

  deleteMentor(index) {
    const mentors = this.getMentors();
    if (index < 0 || index >= mentors.length) return;
    if (!confirm(Are you sure you want to remove  from the mentor panel?)) return;

    mentors.splice(index, 1);
    localStorage.setItem(SK_MENTORS_DB, JSON.stringify(mentors));
    this.showToast('Mentor removed');
    this.renderMentors();
  
  /* ── TICKET & CLOUD REGISTRY ACTIONS ── */
  exportTeamsCSV() {
    this.exportCSV();
  }

  viewTeamTicket(teamCode) {
    const teams = this.getTeams();
    const team = teams.find(t => (t.code || '').toUpperCase() === (teamCode || '').toUpperCase()) || teams[0];
    if (!team) return;

    this.activeModalTeamCode = team.code;
    const modal = document.getElementById('adminTicketModal');
    if (!modal) return;

    const elTitle = document.getElementById('atmTeamTitle');
    const elId = document.getElementById('atmTicketId');
    const elCode = document.getElementById('atmPassCode');
    const elLeader = document.getElementById('atmLeaderName');
    const elEmail = document.getElementById('atmLeaderEmail');
    const elPhone = document.getElementById('atmLeaderPhone');
    const elCollege = document.getElementById('atmCollege');
    const elCourseYear = document.getElementById('atmCourseYear');
    const elDomain = document.getElementById('atmDomain');
    const elMembers = document.getElementById('atmMembersList');
    const elRegAt = document.getElementById('atmRegisteredAt');

    if (elTitle) elTitle.textContent = team.teamName || 'Squad';
    if (elId) elId.textContent = team.ticketId || `UDB-2027-${(team.code || '0000').split('-')[2] || 'VIP'}`;
    if (elCode) elCode.textContent = team.code || 'HS-PASS-XXXX';
    if (elLeader) elLeader.textContent = team.leaderName || 'Squad Leader';
    if (elEmail) elEmail.textContent = team.leaderEmail || 'team@udbhav.in';
    if (elPhone) elPhone.textContent = team.phone ? `📞 ${team.phone}` : '📞 +91 98765 43210';
    if (elCollege) elCollege.textContent = team.college || 'PIET Jaipur';
    if (elCourseYear) elCourseYear.textContent = `${team.course || 'B.Tech CS'} • ${team.year || '2027 Batch'}`;
    if (elDomain) elDomain.textContent = `🎯 ${team.domain || team.track || 'AI & Machine Learning'}`;

    if (elMembers) {
      const members = [];
      if (team.m2Name) members.push(`2. ${team.m2Name} ${team.m2Email ? `(${team.m2Email})` : ''}`);
      if (team.m3Name) members.push(`3. ${team.m3Name} ${team.m3Email ? `(${team.m3Email})` : ''}`);
      if (team.m4Name) members.push(`4. ${team.m4Name} ${team.m4Email ? `(${team.m4Email})` : ''}`);
      if (members.length === 0) members.push('2. Aryan Verma (aryan@piet.ac.in)', '3. Tanya Singh (tanya@piet.ac.in)', '4. Rahul Sharma (rahul@piet.ac.in)');
      elMembers.innerHTML = members.map(m => `<div>• ${this.escapeHtml(m)}</div>`).join('');
    }

    if (elRegAt) {
      elRegAt.textContent = team.registeredAt ? new Date(team.registeredAt).toLocaleString() : '28 Jan 2027, 09:00 AM IST';
    }

    modal.style.display = 'flex';
  }

  closeTicketModal() {
    const modal = document.getElementById('adminTicketModal');
    if (modal) modal.style.display = 'none';
  }

  copyPassCodeFromModal() {
    if (!this.activeModalTeamCode) return;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(this.activeModalTeamCode).then(() => {
        this.showToast(`Passcode copied: ${this.activeModalTeamCode}`);
      });
    } else {
      prompt('Copy Team Passcode:', this.activeModalTeamCode);
    }
  }

  printTicket() {
    window.print();
  }
}

