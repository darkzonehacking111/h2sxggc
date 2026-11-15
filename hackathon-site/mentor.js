/**
 * ══════════════════════════════════════════════════════════════════════════
 * HACKATHON 2027 · MENTOR EVALUATION & JURY WORKSPACE ENGINE
 * Multi-Round (3 Rounds) & Multi-Parameter (5 Parameters) Assessment Engine
 * With Real-time Storage Sync, Master Admin Consensus & Live Standings
 * ══════════════════════════════════════════════════════════════════════════
 */

const SK_MENTOR_AUTH = 'hs27_mentor_auth';
const SK_ADMIN_AUTH = 'hs27_admin_auth';
const SK_ACTIVE_MENTOR = 'hs27_active_mentor';
const SK_TEAMS_DB = 'udbhav_2027_teams';
const SK_TEAM_SCORES = 'hs27_team_scores';

// 10 Official Problem Statements Map
const OFFICIAL_PS_MAP = {
  "PS-01": {
    id: "PS-01",
    category: "AI/ML",
    title: "Autonomous Agentic Code Refactoring & Security Hardening",
    desc: "Autonomous LLM agents that execute static AST analysis, refactor monolithic functions, generate regression tests, and remediate CVE vulnerabilities."
  },
  "PS-02": {
    id: "PS-02",
    category: "Web3",
    title: "Decentralized Zero-Knowledge Cross-Chain Liquidity Protocol",
    desc: "Trustless bridge leveraging zk-SNARKs for atomic asset swaps between EVM and non-EVM chains with verifiable state proofs."
  },
  "PS-03": {
    id: "PS-03",
    category: "CyberSecurity",
    title: "eBPF-Powered Real-Time Kernel Threat & Exfiltration Sensor",
    desc: "Linux kernel telemetry sensor observing socket and syscall anomalies with zero performance penalty, identifying zero-days."
  },
  "PS-04": {
    id: "PS-04",
    category: "HealthTech",
    title: "Multimodal Clinical Diagnostic Copilot with Edge Privacy",
    desc: "Edge-computed multimodal diagnostics fusing DICOM scans, EHR records, and lab blood panels with local on-device inference."
  },
  "PS-05": {
    id: "PS-05",
    category: "FinTech",
    title: "Autonomous Algorithmic Fraud Interception & Graph Analysis",
    desc: "Sub-15ms fraud detection pipeline analyzing temporal transaction subgraphs across cross-border accounts and UPI nodes."
  },
  "PS-06": {
    id: "PS-06",
    category: "Smart Cities",
    title: "Adaptive Urban Traffic Signal Optimization via Edge Vision",
    desc: "Distributed edge cameras coordinating phase cycles dynamically to clear emergency vehicle routes and reduce carbon idling."
  },
  "PS-07": {
    id: "PS-07",
    category: "Sustainability",
    title: "Verifiable Supply Chain Carbon Provenance on Polygon",
    desc: "Immutable cryptographic ledger tracking Tier-1 to Tier-3 industrial emissions with verifiable cryptographic zero-knowledge claims."
  },
  "PS-08": {
    id: "PS-08",
    category: "Clean Energy",
    title: "Decentralized Peer-to-Peer Microgrid Energy Marketplace",
    desc: "Local renewable microgrid auction matching rooftop solar producers with commercial consumers via automated micro-contracts."
  },
  "PS-09": {
    id: "PS-09",
    category: "Open Innovation",
    title: "High-Throughput Offline-First Disaster Emergency Mesh Network",
    desc: "LoRa and Wi-Fi Direct peer-to-peer ad-hoc emergency communications mesh with packet-relayed survivor triage telemetry."
  },
  "PS-10": {
    id: "PS-10",
    category: "Open Innovation",
    title: "Spatial IDE & Multimodal Voice Coding for Accessibility",
    desc: "Voice-driven AST-aware spatial code synthesizer enabling hands-free programming and collaborative live canvas pair-programming."
  }
};

// Seed squads if localStorage is clean
const MENTOR_SEED_TEAMS = [
  {
    code: "UDB-PASS-8921",
    teamName: "Apex Innovators",
    leaderName: "Aditi Sharma",
    leaderEmail: "aditi.sharma@piet.poornima.org",
    leaderPhone: "+91 98290 11223",
    college: "Poornima Institute of Eng. & Tech., Jaipur",
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
    college: "Poornima Institute of Eng. & Tech., Jaipur",
    track: "Open Innovation",
    members: ["Divya Mathur (Lead)", "Aayush Sharma", "Kunal Tiwari"],
    psId: "PS-10",
    githubUrl: "https://github.com/ambient-vibe/spatial-voice-ide",
    figmaUrl: "https://figma.com/@ambientvibe/spatial-code-canvas",
    demoVideoUrl: "https://youtu.be/ambientvibe-demo",
    submissionTime: "2027-01-28 20:50 IST",
    status: "Submitted"
  },
  {
    code: "UDB-PASS-6012",
    teamName: "EcoLedger DAO",
    leaderName: "Kavita Rao",
    leaderEmail: "kavita.rao@dtu.ac.in",
    leaderPhone: "+91 98112 33441",
    college: "DTU Delhi",
    track: "Sustainability",
    members: ["Kavita Rao (Lead)", "Tarun Bhatia", "Neha Sengupta"],
    psId: "PS-07",
    githubUrl: "https://github.com/ecoledger/carbon-zk-proofs",
    figmaUrl: "https://figma.com/@ecoledger/carbon-ledger",
    demoVideoUrl: "https://youtu.be/ecoledger-demo",
    submissionTime: "2027-01-28 21:15 IST",
    status: "Submitted"
  },
  {
    code: "UDB-PASS-3195",
    teamName: "GridPulse Microgrid",
    leaderName: "Siddharth Jain",
    leaderEmail: "siddharth.jain@thapar.edu",
    leaderPhone: "+91 97120 44556",
    college: "Thapar Institute, Patiala",
    track: "Open Innovation",
    members: ["Siddharth Jain (Lead)", "Ananya Dixit", "Pranav S."],
    psId: "PS-08",
    githubUrl: "https://github.com/gridpulse/p2p-microgrid-core",
    figmaUrl: "https://figma.com/@gridpulse/solar-auction-ui",
    demoVideoUrl: "https://youtu.be/gridpulse-demo",
    submissionTime: "2027-01-28 21:40 IST",
    status: "Submitted"
  }
];

// Seed 3-round 5-parameter scores
const MENTOR_SEED_SCORES = {
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
    innovation: 20, technical: 20, feasibility: 19, presentation: 20,
    remarks: "Exceptional multi-agent orchestration architecture across all 3 rounds. Flawless live demo.",
    mentorLocked: true,
    mentorLockedAt: "2027-01-29 11:30 IST",
    adminApproved: true,
    adminApprovedAt: "2027-01-29 12:00 IST"
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
    innovation: 19, technical: 20, feasibility: 19, presentation: 18,
    remarks: "Solid live threat interception and zero-day isolation.",
    mentorLocked: true,
    mentorLockedAt: "2027-01-29 11:45 IST",
    adminApproved: true,
    adminApprovedAt: "2027-01-29 12:05 IST"
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
    innovation: 19, technical: 19, feasibility: 18, presentation: 18,
    remarks: "Verified trustless asset transfer between EVM chains.",
    mentorLocked: true,
    mentorLockedAt: "2027-01-29 11:55 IST",
    adminApproved: true,
    adminApprovedAt: "2027-01-29 12:10 IST"
  },
  "UDB-PASS-7302": {
    teamName: "BioPulse Edge",
    mentorName: "Dr. Aman Verma (HealthTech & AI Specialist)",
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
    innovation: 17, technical: 17, feasibility: 19, presentation: 17,
    remarks: "Strong clinical utility and patient privacy focus.",
    mentorLocked: true,
    mentorLockedAt: "2027-01-29 12:05 IST",
    adminApproved: false
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
    innovation: 21, technical: 22, feasibility: 22, presentation: 21,
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
    innovation: 24, technical: 20, feasibility: 19, presentation: 22,
    remarks: "Truly delightful vibe coding experience. Audio recognition responds swiftly to voice directives.",
    mentorLocked: true,
    mentorLockedAt: "2027-01-29 12:15 IST",
    adminApproved: false,
    adminApprovedAt: null
  }
};

class MentorPortalEngine {
  constructor() {
    this.authenticated = false;
    this.isAdmin = false;
    this.mentorProfile = null;
    this.currentFilter = 'all';
    this.currentTrack = 'all';
    this.currentSort = 'score-desc';
    this.activeTeamCode = null;
    this.activeModalRound = 1;
    this.tempRoundScores = { 1: 0, 2: 0, 3: 0 };
    this.init();
  }

  init() {
    this.seedDefaultsIfEmpty();
    this.checkSession();
    this.bindEvents();
    this.render();
    this.initClock();
  }

  initClock() {
    const update = () => {
      const now = new Date();
      const str = now.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour12: false });
      const el = document.getElementById('menClockBadge');
      if (el) el.innerHTML = `<span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:#38bdf8;margin-right:6px;box-shadow:0 0 8px #38bdf8;"></span>${str} IST`;
    };
    update();
    setInterval(update, 1000);
  }

  seedDefaultsIfEmpty() {
    // Real registered squads only - no mock data seeding
  }

  checkSession() {
    const mentorAuth = sessionStorage.getItem(SK_MENTOR_AUTH) || localStorage.getItem(SK_MENTOR_AUTH);
    const adminAuth = sessionStorage.getItem(SK_ADMIN_AUTH) || localStorage.getItem(SK_ADMIN_AUTH);
    const savedProfile = sessionStorage.getItem(SK_ACTIVE_MENTOR) || localStorage.getItem(SK_ACTIVE_MENTOR);

    if (mentorAuth === 'true' || adminAuth === 'true') {
      this.authenticated = true;
      this.isAdmin = (adminAuth === 'true');
      this.mentorProfile = savedProfile || (this.isAdmin ? "Rishi (Master Admin)" : "Dr. Alok Sharma (AI/ML Lead, Hack2Skill)");
      this.showApp();
    } else {
      this.showGate();
    }
  }

  bindEvents() {
    window.addEventListener('storage', (e) => {
      if (e.key === SK_TEAM_SCORES || e.key === SK_TEAMS_DB || e.key === SK_ADMIN_AUTH) {
        this.render();
      }
    });

    try {
      if (typeof BroadcastChannel !== 'undefined') {
        const bc = new BroadcastChannel('hs27_theme_sync');
        bc.onmessage = (msg) => {
          if (msg && msg.data && (msg.data.type === 'SCORE_SAVED' || msg.data.type === 'TEAM_UPDATED')) {
            this.render();
          }
        };
      }
    } catch (e) {}

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeEvaluationModal();
      }
    });
  }

  authenticate() {
    const idInput = document.getElementById('mentorIdInput');
    const profileSelect = document.getElementById('mentorProfileSelect');
    const passInput = document.getElementById('mentorPassInput');
    const feedback = document.getElementById('mentorGateFeedback');
    if (!passInput) return;

    const selectedProfile = profileSelect ? profileSelect.value.trim() : '';
    const enteredId = (idInput ? idInput.value.trim() : '') || selectedProfile;
    const enteredPass = passInput.value.trim();

    // 1. Check Master Admin Clearance (Rishi@5630dr)
    const isMaster = enteredPass === 'Rishi@5630dr' || 
                     enteredPass.toLowerCase() === 'rishi@5630dr' || 
                     enteredId === 'Rishi@5630dr' || 
                     enteredId.toLowerCase() === 'rishi@5630dr' ||
                     (enteredId.toUpperCase() === 'ADMIN' && enteredPass === 'Rishi@5630dr');

    if (isMaster) {
      this.authenticated = true;
      this.isAdmin = true;
      this.mentorProfile = "Rishi (Master Admin & Jury Lead)";
      this.activeMentorId = "ADMIN-MASTER";
      sessionStorage.setItem(SK_MENTOR_AUTH, 'true');
      sessionStorage.setItem(SK_ADMIN_AUTH, 'true');
      sessionStorage.setItem(SK_ACTIVE_MENTOR, this.mentorProfile);
      localStorage.setItem(SK_MENTOR_AUTH, 'true');
      localStorage.setItem(SK_ADMIN_AUTH, 'true');
      this.showApp();
      this.showToast("👑 Master Admin Full Jury Clearance Granted");
      return;
    }

    // 2. Fetch assigned mentors from localStorage (synced with Admin Console)
    let mentors = [];
    try {
      const stored = localStorage.getItem('udbhav_2027_mentors');
      if (stored) mentors = JSON.parse(stored);
    } catch (e) { }

    if (!Array.isArray(mentors) || mentors.length === 0) {
      mentors = [
        { mentorId: "MNT-AI-01", name: "Dr. Alok Sharma", role: "AI/ML Lead", track: "Agentic AI & Autonomy", passcode: "mentor@2027" },
        { mentorId: "MNT-SEC-02", name: "Priya Nair", role: "Cloud Security Architect", track: "CyberSecurity & Defense", passcode: "priya@2027" },
        { mentorId: "MNT-W3-03", name: "Vikram Solanki", role: "Web3 Research Fellow", track: "Web3 & Decentralization", passcode: "vikram@2027" }
      ];
    }

    // 3. Match entered Mentor ID and Passcode
    const matched = mentors.find(m => {
      const idMatch = m.mentorId && m.mentorId.toLowerCase() === enteredId.toLowerCase();
      const nameMatch = m.name && m.name.toLowerCase() === enteredId.toLowerCase();
      const emailMatch = m.email && m.email.toLowerCase() === enteredId.toLowerCase();
      const passMatch = m.passcode === enteredPass;

      if (enteredId) {
        return (idMatch || nameMatch || emailMatch) && passMatch;
      }
      return passMatch;
    });

    if (matched) {
      this.authenticated = true;
      this.isAdmin = false;
      this.mentorProfile = `${matched.name} (${matched.role || 'Juror'})`;
      this.activeMentorId = matched.mentorId;
      this.activeTrack = matched.track;
      sessionStorage.setItem(SK_MENTOR_AUTH, 'true');
      sessionStorage.setItem(SK_ACTIVE_MENTOR, this.mentorProfile);
      sessionStorage.setItem('udbhav_active_mentor_id', matched.mentorId);
      localStorage.setItem(SK_MENTOR_AUTH, 'true');
      this.showApp();
      this.showToast(`✓ Evaluator Verified: ${matched.name} [${matched.mentorId}]`);
    } else {
      if (feedback) {
        feedback.textContent = 'Access Denied: Invalid Mentor ID or Passcode. Contact Admin for assigned credentials.';
        feedback.className = 'men-gate-feedback error';
      }
      if (idInput) idInput.classList.add('shake');
      passInput.classList.add('shake');
      setTimeout(() => {
        if (idInput) idInput.classList.remove('shake');
        passInput.classList.remove('shake');
      }, 400);
    }
  }

  quickFill(key) {
    const input = document.getElementById('mentorPassInput');
    if (input) {
      input.value = key;
      input.focus();
    }
    this.authenticate(key);
  }

  togglePassVisibility() {
    const input = document.getElementById('mentorPassInput');
    if (input) {
      input.type = input.type === 'password' ? 'text' : 'password';
    }
  }

  showGate() {
    const gate = document.getElementById('mentorGateScreen');
    if (gate) gate.style.display = 'flex';
  }

  showApp() {
    const gate = document.getElementById('mentorGateScreen');
    if (gate) gate.style.display = 'none';

    const tagWrap = document.getElementById('menMentorTagWrap');
    const nameBadge = document.getElementById('mentorActiveNameBadge');
    if (tagWrap) tagWrap.style.display = 'flex';
    if (nameBadge) nameBadge.textContent = this.mentorProfile || 'Verified Juror';

    this.render();
  }

  logout() {
    sessionStorage.removeItem(SK_MENTOR_AUTH);
    sessionStorage.removeItem(SK_ADMIN_AUTH);
    sessionStorage.removeItem(SK_ACTIVE_MENTOR);
    localStorage.removeItem(SK_MENTOR_AUTH);
    this.authenticated = false;
    this.isAdmin = false;
    this.mentorProfile = null;
    this.showGate();
    this.showToast("Logged out of Mentor Workspace");
  }

  toggleRules() {
    const content = document.getElementById('menRulesDetails');
    const text = document.getElementById('rulesToggleText');
    const arr = document.getElementById('rulesToggleArr');
    if (!content) return;

    const isHidden = content.style.display === 'none';
    content.style.display = isHidden ? 'block' : 'none';
    if (text) text.textContent = isHidden ? 'COLLAPSE RULES' : 'VIEW JURY RULES';
    if (arr) arr.textContent = isHidden ? '▲' : '▼';
  }

  toggleRubric() {
    const content = document.getElementById('menRubricDetails');
    const text = document.getElementById('rubricToggleText');
    const arr = document.getElementById('rubricToggleArr');
    if (!content) return;

    const isHidden = content.style.display === 'none';
    content.style.display = isHidden ? 'block' : 'none';
    if (text) text.textContent = isHidden ? 'COLLAPSE RUBRIC' : 'VIEW RUBRIC CRITERIA';
    if (arr) arr.textContent = isHidden ? '▲' : '▼';
  }

  getTeams() {
    try {
      const data = localStorage.getItem(SK_TEAMS_DB);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  getScores() {
    try {
      const data = localStorage.getItem(SK_TEAM_SCORES);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      return {};
    }
  }

  render() {
    this.renderMetrics();
    this.renderTeams();
  }

  renderMetrics() {
    const teams = this.getTeams();
    const scores = this.getScores();

    const total = teams.length;
    let lockedCount = 0;
    let pendingCount = 0;
    let totalScoreSum = 0;
    let podiumCount = 0;

    teams.forEach(t => {
      const s = scores[t.code];
      if (s && s.mentorLocked) {
        lockedCount++;
        totalScoreSum += (s.totalScore || 0);
        if (s.totalScore >= 90) podiumCount++;
      } else {
        pendingCount++;
      }
    });

    const avg = lockedCount > 0 ? (totalScoreSum / lockedCount).toFixed(1) : '--';
    const auditPct = total > 0 ? Math.round((lockedCount / total) * 100) : 0;

    const elTotal = document.getElementById('menMetricTotal');
    const elLocked = document.getElementById('menMetricLocked');
    const elPending = document.getElementById('menMetricPending');
    const elAvg = document.getElementById('menMetricAvg');
    const elPodium = document.getElementById('menMetricPodium');

    if (elTotal) elTotal.textContent = total;
    if (elLocked) elLocked.textContent = lockedCount;
    if (elPending) elPending.textContent = pendingCount;
    if (elAvg) elAvg.textContent = avg;
    if (elPodium) elPodium.textContent = podiumCount;

    const progressFill = document.getElementById('menAuditProgressFill');
    const progressText = document.getElementById('menAuditProgressText');
    if (progressFill) progressFill.style.width = `${auditPct}%`;
    if (progressText) progressText.textContent = `${auditPct}% Jury Audit Complete (${lockedCount}/${total})`;

    // Filter counts
    const countAll = document.getElementById('countFilterAll');
    const countPending = document.getElementById('countFilterPending');
    const countLocked = document.getElementById('countFilterLocked');
    const countSTier = document.getElementById('countFilterSTier');

    if (countAll) countAll.textContent = total;
    if (countPending) countPending.textContent = pendingCount;
    if (countLocked) countLocked.textContent = lockedCount;
    if (countSTier) countSTier.textContent = podiumCount;
  }

  setFilter(filter, btn) {
    this.currentFilter = filter;
    document.querySelectorAll('#menStatusFilterGroup .men-filter-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    this.renderTeams();
  }

  setTrack(track, btn) {
    this.currentTrack = track;
    document.querySelectorAll('#menTrackFilterGroup .men-track-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    this.renderTeams();
  }

  setSort(sortVal) {
    this.currentSort = sortVal;
    this.renderTeams();
  }

  clearSearch() {
    const input = document.getElementById('mentorSearchInput');
    if (input) {
      input.value = '';
      this.renderTeams();
    }
  }

  renderTeams() {
    const grid = document.getElementById('mentorTeamsGrid');
    if (!grid) return;

    const teams = this.getTeams();
    const scores = this.getScores();
    const query = (document.getElementById('mentorSearchInput')?.value || '').trim().toLowerCase();

    let filtered = teams.filter(t => {
      // 1. Search Query
      if (query) {
        const matchName = (t.teamName || '').toLowerCase().includes(query);
        const matchCode = (t.code || '').toLowerCase().includes(query);
        const matchLead = (t.leaderName || '').toLowerCase().includes(query);
        const matchTrack = (t.track || '').toLowerCase().includes(query);
        const matchPs = (t.psId || '').toLowerCase().includes(query);
        const matchCol = (t.college || '').toLowerCase().includes(query);
        if (!matchName && !matchCode && !matchLead && !matchTrack && !matchPs && !matchCol) return false;
      }

      // 2. Track Filter
      if (this.currentTrack !== 'all' && t.track !== this.currentTrack) return false;

      // 3. Status Filter
      const s = scores[t.code] || {};
      if (this.currentFilter === 'pending' && s.mentorLocked) return false;
      if (this.currentFilter === 'locked' && !s.mentorLocked) return false;
      if (this.currentFilter === 's-tier' && (!s.totalScore || s.totalScore < 90)) return false;

      return true;
    });

    // Sort filtered squads
    filtered.sort((a, b) => {
      const sa = scores[a.code] || {};
      const sb = scores[b.code] || {};
      const scoreA = sa.totalScore !== undefined ? sa.totalScore : -1;
      const scoreB = sb.totalScore !== undefined ? sb.totalScore : -1;

      if (this.currentSort === 'score-desc') return scoreB - scoreA;
      if (this.currentSort === 'score-asc') return scoreA - scoreB;
      if (this.currentSort === 'pending-first') {
        const lockA = sa.mentorLocked ? 1 : 0;
        const lockB = sb.mentorLocked ? 1 : 0;
        return lockA - lockB;
      }
      if (this.currentSort === 'name-asc') return (a.teamName || '').localeCompare(b.teamName || '');
      if (this.currentSort === 'code-asc') return (a.code || '').localeCompare(b.code || '');
      return 0;
    });

    const showingCount = document.getElementById('menShowingSquadsCount');
    if (showingCount) showingCount.textContent = `Showing ${filtered.length} of ${teams.length} squads`;

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column:1/-1;text-align:center;padding:60px 20px;background:rgba(15,23,42,0.6);border:1px dashed rgba(255,255,255,0.15);border-radius:16px;">
          <div style="font-size:2.8rem;margin-bottom:12px;">🔍</div>
          <h3 style="color:#fff;margin:0 0 6px 0;">No matching squads found</h3>
          <p style="color:var(--men-text-muted);margin:0 0 16px 0;">Try broadening your search keyword or clearing the status/domain filter.</p>
          <button type="button" class="men-btn-primary" style="width:auto;padding:8px 20px;" onclick="mentorPortal.clearSearch(); mentorPortal.setFilter('all'); mentorPortal.setTrack('all');">
            <span>Reset All Filters</span>
          </button>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(team => {
      const s = scores[team.code] || {};
      const hasScore = s.totalScore !== undefined;
      const isLocked = !!s.mentorLocked;
      const isAdminApproved = !!s.adminApproved;
      const ps = OFFICIAL_PS_MAP[team.psId] || { id: team.psId || 'PS-01', title: 'Problem Statement' };

      const scoreNum = hasScore ? s.totalScore : '--';
      let tierClass = 'tier-c';
      let tierLabel = 'BASELINE';
      if (s.totalScore >= 90) { tierClass = 'tier-s'; tierLabel = '🏆 S-TIER'; }
      else if (s.totalScore >= 80) { tierClass = 'tier-a'; tierLabel = '⭐ A-TIER'; }
      else if (s.totalScore >= 70) { tierClass = 'tier-b'; tierLabel = '👍 B-TIER'; }

      const memberCount = Array.isArray(team.members) ? team.members.length : 4;

      // Extract round breakdown
      const r1Score = s.round1?.total !== undefined ? s.round1.total : (s.totalScore !== undefined ? s.totalScore : '--');
      const r2Score = s.round2?.total !== undefined ? s.round2.total : '--';
      const r3Score = s.round3?.total !== undefined ? s.round3.total : '--';
      const grandTotal = s.grandTotal !== undefined ? s.grandTotal : (hasScore ? s.totalScore : '--');
      const grandAvg = s.grandAvg !== undefined ? `${s.grandAvg}%` : (hasScore ? `${s.totalScore}%` : '--');

      return `
        <div class="men-team-card ${isLocked ? 'locked-by-mentor' : ''}">
          <!-- Card Head -->
          <div class="men-team-card-head">
            <div>
              <h3 class="men-team-title">${this.escapeHtml(team.teamName)}</h3>
              <div class="men-team-sub">${team.code} &bull; Lead: ${this.escapeHtml(team.leaderName || 'Squad Lead')} (${memberCount} builders)</div>
              <div style="font-size:0.7rem;color:var(--men-text-muted);margin-top:2px;">${this.escapeHtml(team.college || 'PIET Jaipur')}</div>
            </div>
            <div class="men-team-score-badge">
              <div class="men-score-num" style="color:${hasScore ? (s.totalScore >= 90 ? '#ffd700' : (s.totalScore >= 80 ? 'var(--men-cyan)' : 'var(--men-green)')) : 'var(--men-text-muted)'};">
                ${scoreNum}
              </div>
              <span class="men-score-tier ${tierClass}">${hasScore ? tierLabel : 'UNSCORED'}</span>
            </div>
          </div>

          <!-- Problem Statement Box -->
          <div class="men-team-ps-box">
            <div class="mtps-left">
              <span class="mtps-badge">${ps.id} &bull; ${team.track || 'Track'}</span>
              <span class="mtps-title" title="${this.escapeHtml(ps.title)}">${this.escapeHtml(ps.title)}</span>
            </div>
            <a href="index.html#theme" target="_blank" class="mtps-inspect-link" title="Open Problem Statement on Theme Reveal">
              <span>Inspect PS ↗</span>
            </a>
          </div>

          <!-- Status Meta Row -->
          <div class="men-team-meta-row">
            <span class="men-badge cyan">${team.track || 'Track'}</span>
            ${isAdminApproved ? '<span class="men-badge green">✓ APPROVED BY ADMIN</span>' : (isLocked ? '<span class="men-badge green">🔒 LOCKED BY JURY</span>' : '<span class="men-badge orange">⏳ EVALUATION PENDING</span>')}
            ${this.isAdmin && !isAdminApproved && hasScore ? `
              <button type="button" class="men-badge purple" style="border:1px solid #a855f7;background:rgba(168,85,247,0.15);color:#d8b4fe;cursor:pointer;" onclick="mentorPortal.adminApproveScore('${team.code}')" title="Accept & Approve this score as Master Admin">
                👑 Accept Score ➔
              </button>
            ` : ''}
          </div>

          <!-- 3-Round Score Breakdown Pill Row -->
          <div class="men-round-score-pill-row">
            <span class="mrp-badge ${s.round1?.locked ? 'locked' : ''}">R1: <strong>${r1Score}</strong>/100</span>
            <span class="mrp-badge ${s.round2?.locked ? 'locked' : ''}">R2: <strong>${r2Score}</strong>/100</span>
            <span class="mrp-badge ${s.round3?.locked ? 'locked' : ''}">R3: <strong>${r3Score}</strong>/100</span>
            <span class="mrp-grand">TOTAL: <strong>${grandTotal}</strong>/300 (${grandAvg})</span>
          </div>

          <!-- Deliverables Strip -->
          <div class="men-deliverables-strip">
            ${team.githubUrl ? `<a href="${team.githubUrl}" target="_blank" class="men-link-btn" title="View Source Repository"><span>⌥ GitHub</span></a>` : ''}
            ${team.figmaUrl ? `<a href="${team.figmaUrl}" target="_blank" class="men-link-btn" title="Inspect UI/UX Prototypes"><span>🎨 Figma</span></a>` : ''}
            ${team.demoVideoUrl ? `<a href="${team.demoVideoUrl}" target="_blank" class="men-link-btn" title="Watch Prototype Demo"><span>▶ Video</span></a>` : ''}
            ${!team.githubUrl && !team.figmaUrl && !team.demoVideoUrl ? '<span style="font-size:0.75rem;color:var(--men-text-muted);">Repository submission syncing</span>' : ''}
          </div>

          <!-- Feedback Snippet -->
          ${s.remarks ? `
            <p class="men-feedback-snippet" title="${this.escapeHtml(s.remarks)}">
              &ldquo;${this.escapeHtml(s.remarks)}&rdquo;
            </p>
          ` : ''}

          <!-- Card Foot -->
          <div class="men-card-foot">
            <span style="font-family:var(--men-font-mono);font-size:0.7rem;color:var(--men-text-muted);">
              ${s.mentorName ? 'Juror: ' + this.escapeHtml(s.mentorName.split(' ')[0] + ' ' + (s.mentorName.split(' ')[1] || '')) : 'Awaiting Jury'}
            </span>
            <div style="display:flex;gap:8px;">
              ${this.isAdmin && !isAdminApproved && hasScore ? `
                <button type="button" class="men-score-btn" style="border-color:#a855f7;color:#d8b4fe;" onclick="mentorPortal.adminApproveScore('${team.code}')" title="Accept & Approve changes">
                  <span>✓ Accept</span>
                </button>
              ` : ''}
              <button type="button" class="men-score-btn ${isLocked ? '' : 'accent'}" onclick="mentorPortal.openEvaluationModal('${team.code}')">
                <span>${isLocked ? '✏️ Review 3 Rounds' : '⚖️ Score 3 Rounds'}</span>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  adminApproveScore(teamCode) {
    const scores = this.getScores();
    const teams = this.getTeams();
    const team = teams.find(t => t.code === teamCode) || { teamName: 'Squad ' + teamCode };

    if (!scores[teamCode]) {
      scores[teamCode] = {
        teamName: team.teamName,
        mentorName: "Dr. Alok Sharma",
        round1: { param1: 16, param2: 16, param3: 16, param4: 16, param5: 16, total: 80, locked: true },
        round2: { param1: 16, param2: 16, param3: 16, param4: 16, param5: 16, total: 80, locked: true },
        round3: { param1: 16, param2: 16, param3: 16, param4: 16, param5: 16, total: 80, locked: true },
        totalScore: 80,
        grandTotal: 240,
        grandAvg: 80.0,
        remarks: "Approved by Master Admin.",
        mentorLocked: true,
        adminApproved: true,
        adminApprovedAt: new Date().toISOString()
      };
    } else {
      scores[teamCode].adminApproved = true;
      scores[teamCode].adminApprovedAt = new Date().toISOString();
      scores[teamCode].mentorLocked = true;
    }

    localStorage.setItem(SK_TEAM_SCORES, JSON.stringify(scores));
    try {
      if (typeof BroadcastChannel !== 'undefined') {
        const bc = new BroadcastChannel('hs27_theme_sync');
        bc.postMessage({ type: 'SCORE_SAVED', teamCode, lockNow: true, timestamp: Date.now() });
      }
    } catch (e) {}

    this.showToast(`👑 Master Admin approved score for ${team.teamName}`);
    this.render();
  }

  openEvaluationModal(teamCode) {
    this.activeTeamCode = teamCode;
    const teams = this.getTeams();
    const scores = this.getScores();

    const team = teams.find(t => t.code === teamCode) || { teamName: 'Squad ' + teamCode, code: teamCode };
    const s = scores[teamCode] || {};

    const ps = OFFICIAL_PS_MAP[team.psId] || {
      id: team.psId || 'PS-01',
      category: team.track || 'Track',
      title: 'Problem Statement Challenge',
      desc: 'Prototype solution addressing the official hackathon requirements.'
    };

    // Populate Modal Header
    const titleEl = document.getElementById('menModalTeamTitle');
    const metaEl = document.getElementById('menModalTeamMeta');
    if (titleEl) titleEl.textContent = `${team.teamName} (${team.code})`;
    if (metaEl) metaEl.textContent = `${team.track || 'Track'} • ${team.college || 'PIET Jaipur'} • Lead: ${team.leaderName || 'Squad Lead'}`;

    // Populate PS Box
    const psIdBadge = document.getElementById('menModalPsIdBadge');
    const psCatBadge = document.getElementById('menModalPsCategoryBadge');
    const psTitle = document.getElementById('menModalPsTitle');
    const psDesc = document.getElementById('menModalPsDesc');
    const psLink = document.getElementById('menModalPsLink');

    if (psIdBadge) psIdBadge.textContent = ps.id;
    if (psCatBadge) psCatBadge.textContent = ps.category;
    if (psTitle) psTitle.textContent = ps.title;
    if (psDesc) psDesc.textContent = ps.desc;
    if (psLink) psLink.href = 'index.html#theme';

    // Populate Deliverables
    const deliverablesWrap = document.getElementById('menModalDeliverables');
    if (deliverablesWrap) {
      const links = [];
      if (team.githubUrl) links.push(`<a href="${team.githubUrl}" target="_blank" class="men-link-btn"><span>⌥ GitHub Repository ↗</span></a>`);
      if (team.figmaUrl) links.push(`<a href="${team.figmaUrl}" target="_blank" class="men-link-btn"><span>🎨 Figma Prototype ↗</span></a>`);
      if (team.demoVideoUrl) links.push(`<a href="${team.demoVideoUrl}" target="_blank" class="men-link-btn"><span>▶ Video Demo ↗</span></a>`);
      deliverablesWrap.innerHTML = links.length > 0 ? links.join('') : '<span style="color:var(--men-text-muted);">Repository verification pending</span>';
    }

    // Default to round 1 (or round 2/3 if later)
    this.activeModalRound = 1;
    this.loadRoundIntoModal(1);

    const modal = document.getElementById('mentorEvalModal');
    if (modal) modal.classList.add('open');
  }

  switchModalRound(roundNum) {
    if (!this.activeTeamCode) return;
    this.saveActiveSlidersToMemory();
    this.activeModalRound = roundNum;
    this.loadRoundIntoModal(roundNum);
  }

  saveActiveSlidersToMemory() {
    if (!this.activeTeamCode) return;
    const p1 = parseInt(document.getElementById('menRangeParam1')?.value) || 0;
    const p2 = parseInt(document.getElementById('menRangeParam2')?.value) || 0;
    const p3 = parseInt(document.getElementById('menRangeParam3')?.value) || 0;
    const p4 = parseInt(document.getElementById('menRangeParam4')?.value) || 0;
    const p5 = parseInt(document.getElementById('menRangeParam5')?.value) || 0;
    const remarks = document.getElementById('menModalRemarks')?.value || '';

    if (!this._inMemoryRounds) this._inMemoryRounds = {};
    if (!this._inMemoryRounds[this.activeTeamCode]) this._inMemoryRounds[this.activeTeamCode] = {};

    this._inMemoryRounds[this.activeTeamCode][`round${this.activeModalRound}`] = {
      param1: p1, param2: p2, param3: p3, param4: p4, param5: p5,
      total: p1 + p2 + p3 + p4 + p5,
      remarks: remarks
    };
  }

  loadRoundIntoModal(roundNum) {
    const teamCode = this.activeTeamCode;
    const scores = this.getScores();
    const teamScore = scores[teamCode] || {};
    const memData = (this._inMemoryRounds && this._inMemoryRounds[teamCode]) || {};

    const roundKey = `round${roundNum}`;
    const roundData = memData[roundKey] || teamScore[roundKey] || {
      param1: 16, param2: 16, param3: 16, param4: 16, param5: 16,
      total: 80,
      remarks: '',
      locked: false
    };

    // Update Round Tabs UI
    [1, 2, 3].forEach(r => {
      const tab = document.getElementById(`menRTab${r}`);
      const badge = document.getElementById(`menRTabBadge${r}`);
      const rKey = `round${r}`;
      const rDat = memData[rKey] || teamScore[rKey];

      if (tab) {
        tab.classList.toggle('active', r === roundNum);
        tab.classList.toggle('scored', !!(rDat && rDat.total));
      }
      if (badge) {
        badge.textContent = (rDat && rDat.total !== undefined) ? `${rDat.total} / 100` : '-- / 100';
      }
    });

    // Update Hints & Labels
    const roundNames = {
      1: "Round 1 of 3 (Ideation & Feasibility)",
      2: "Round 2 of 3 (Architecture & Prototype)",
      3: "Round 3 of 3 (Finale Production & Demo)"
    };
    const hintEl = document.getElementById('menModalRoundHint');
    const activeRoundNum = document.getElementById('menModalActiveRoundNum');
    const draftBtnNum = document.getElementById('menBtnDraftRoundNum');
    const lockBtnNum = document.getElementById('menBtnLockRoundNum');
    const remarksRoundNum = document.getElementById('menRemarksRoundNum');

    if (hintEl) hintEl.textContent = `Scoring ${roundNames[roundNum]}`;
    if (activeRoundNum) activeRoundNum.textContent = roundNum;
    if (draftBtnNum) draftBtnNum.textContent = roundNum;
    if (lockBtnNum) lockBtnNum.textContent = roundNum;
    if (remarksRoundNum) remarksRoundNum.textContent = roundNum;

    // Load 5 Parameters Sliders
    for (let p = 1; p <= 5; p++) {
      const val = roundData[`param${p}`] !== undefined ? roundData[`param${p}`] : 16;
      const range = document.getElementById(`menRangeParam${p}`);
      const disp = document.getElementById(`menValParam${p}`);
      if (range) range.value = val;
      if (disp) disp.textContent = val;
    }

    // Load Remarks
    const remarksEl = document.getElementById('menModalRemarks');
    if (remarksEl) remarksEl.value = roundData.remarks || '';

    // Status Stamp
    const statusStamp = document.getElementById('menModalRoundStatusStamp');
    if (statusStamp) {
      statusStamp.textContent = roundData.locked ? `Round ${roundNum}: 🔒 Locked` : `Round ${roundNum}: ✏️ Draft`;
      statusStamp.style.color = roundData.locked ? 'var(--men-green)' : 'var(--men-orange)';
    }

    const evalStamp = document.getElementById('menModalEvaluatorStamp');
    if (evalStamp) {
      evalStamp.textContent = `Evaluator: ${teamScore.mentorName || this.mentorProfile || 'Verified Evaluator'} ${teamScore.adminApproved ? '· ✓ Approved by Admin' : ''}`;
    }

    this.onSliderInput();
  }

  closeEvaluationModal() {
    this.activeTeamCode = null;
    const modal = document.getElementById('mentorEvalModal');
    if (modal) modal.classList.remove('open');
  }

    applyOverallPreset(totalScore) {
    const valPerParam = Math.round(totalScore / 5);
    for (let i = 1; i <= 5; i++) {
      this.setCriterionVal(i, valPerParam);
    }
    const valObj = { 'Innovation': Math.round(totalScore / 4), 'Technical': Math.round(totalScore / 4), 'Feasibility': Math.round(totalScore / 4), 'Presentation': Math.round(totalScore / 4) };
    Object.keys(valObj).forEach(k => {
      const r = document.getElementById(`menRange${k}`);
      if (r) r.value = valObj[k];
    });
    this.onSliderInput();
    if (typeof this.showToast === 'function') this.showToast(`Applied preset: ${totalScore} pts`);
  }

  setCriterionVal(paramIndex, value) {
    const range = document.getElementById(`menRangeParam${paramIndex}`);
    const display = document.getElementById(`menValParam${paramIndex}`);
    if (range) range.value = value;
    if (display) display.textContent = value;
    this.onSliderInput();
  }

  onSliderInput() {
    const p1 = parseInt(document.getElementById('menRangeParam1')?.value) || 0;
    const p2 = parseInt(document.getElementById('menRangeParam2')?.value) || 0;
    const p3 = parseInt(document.getElementById('menRangeParam3')?.value) || 0;
    const p4 = parseInt(document.getElementById('menRangeParam4')?.value) || 0;
    const p5 = parseInt(document.getElementById('menRangeParam5')?.value) || 0;

    const disp1 = document.getElementById('menValParam1');
    const disp2 = document.getElementById('menValParam2');
    const disp3 = document.getElementById('menValParam3');
    const disp4 = document.getElementById('menValParam4');
    const disp5 = document.getElementById('menValParam5');

    if (disp1) disp1.textContent = p1;
    if (disp2) disp2.textContent = p2;
    if (disp3) disp3.textContent = p3;
    if (disp4) disp4.textContent = p4;
    if (disp5) disp5.textContent = p5;

    const roundTotal = p1 + p2 + p3 + p4 + p5;
    const totalNum = document.getElementById('menModalTotalNum');
    if (totalNum) totalNum.textContent = roundTotal;

    // Update active tab badge live
    const activeBadge = document.getElementById(`menRTabBadge${this.activeModalRound}`);
    if (activeBadge) activeBadge.textContent = `${roundTotal} / 100`;

    // Compute Grand Cumulative Total across 3 rounds
    const teamCode = this.activeTeamCode;
    const scores = this.getScores();
    const teamScore = scores[teamCode] || {};
    const memData = (this._inMemoryRounds && this._inMemoryRounds[teamCode]) || {};

    const r1 = this.activeModalRound === 1 ? roundTotal : (memData.round1?.total || teamScore.round1?.total || 0);
    const r2 = this.activeModalRound === 2 ? roundTotal : (memData.round2?.total || teamScore.round2?.total || 0);
    const r3 = this.activeModalRound === 3 ? roundTotal : (memData.round3?.total || teamScore.round3?.total || 0);

    const grandTotal = r1 + r2 + r3;
    const grandAvg = (grandTotal / 3).toFixed(1);

    const grandValEl = document.getElementById('menModalGrandTotal');
    const grandAvgEl = document.getElementById('menModalGrandAvg');
    const pill1 = document.getElementById('menBreakdownR1');
    const pill2 = document.getElementById('menBreakdownR2');
    const pill3 = document.getElementById('menBreakdownR3');

    if (grandValEl) grandValEl.textContent = grandTotal;
    if (grandAvgEl) grandAvgEl.textContent = `(${grandAvg}%)`;
    if (pill1) pill1.textContent = r1 > 0 ? `R1: ${r1}` : 'R1: --';
    if (pill2) pill2.textContent = r2 > 0 ? `R2: ${r2}` : 'R2: --';
    if (pill3) pill3.textContent = r3 > 0 ? `R3: ${r3}` : 'R3: --';

    this.updateTierBadge(roundTotal);
  }

  updateTierBadge(total) {
    const badge = document.getElementById('menModalTierBadge');
    const totalNum = document.getElementById('menModalTotalNum');
    if (!badge) return;

    if (total >= 90) {
      badge.textContent = '🏆 S-TIER · PODIUM CONTENDER';
      badge.className = 'men-score-tier tier-s';
      if (totalNum) totalNum.style.color = '#ffd700';
    } else if (total >= 80) {
      badge.textContent = '⭐ A-TIER · HIGH MERIT';
      badge.className = 'men-score-tier tier-a';
      if (totalNum) totalNum.style.color = 'var(--men-cyan)';
    } else if (total >= 70) {
      badge.textContent = '👍 B-TIER · SOLID PROTOTYPE';
      badge.className = 'men-score-tier tier-b';
      if (totalNum) totalNum.style.color = '#60a5fa';
    } else {
      badge.textContent = 'C-TIER · BASELINE IMPLEMENTATION';
      badge.className = 'men-score-tier tier-c';
      if (totalNum) totalNum.style.color = 'var(--men-text-sub)';
    }
  }

  insertRemark(tagText) {
    const textarea = document.getElementById('menModalRemarks');
    if (!textarea) return;
    const current = textarea.value.trim();
    if (current.includes(tagText)) return;
    textarea.value = current ? `${current} ${tagText}` : tagText;
    textarea.focus();
  }

  saveScore(lockNow) {
    if (!this.activeTeamCode) return;
    const teamCode = this.activeTeamCode;
    const roundNum = this.activeModalRound;

    const p1 = parseInt(document.getElementById('menRangeParam1')?.value) || 0;
    const p2 = parseInt(document.getElementById('menRangeParam2')?.value) || 0;
    const p3 = parseInt(document.getElementById('menRangeParam3')?.value) || 0;
    const p4 = parseInt(document.getElementById('menRangeParam4')?.value) || 0;
    const p5 = parseInt(document.getElementById('menRangeParam5')?.value) || 0;
    const roundTotal = p1 + p2 + p3 + p4 + p5;
    const remarks = document.getElementById('menModalRemarks')?.value.trim() || '';

    const scores = this.getScores();
    const teams = this.getTeams();
    const team = teams.find(t => t.code === teamCode) || { teamName: 'Squad ' + teamCode };

    const currentTeamScore = scores[teamCode] || {};
    const memData = (this._inMemoryRounds && this._inMemoryRounds[teamCode]) || {};

    const roundKey = `round${roundNum}`;
    currentTeamScore[roundKey] = {
      param1: p1,
      param2: p2,
      param3: p3,
      param4: p4,
      param5: p5,
      total: roundTotal,
      remarks: remarks,
      locked: lockNow,
      lockedAt: lockNow ? new Date().toISOString() : (currentTeamScore[roundKey]?.lockedAt || null)
    };

    // Calculate Grand Total across all 3 rounds
    const r1 = roundNum === 1 ? roundTotal : (memData.round1?.total || currentTeamScore.round1?.total || 0);
    const r2 = roundNum === 2 ? roundTotal : (memData.round2?.total || currentTeamScore.round2?.total || 0);
    const r3 = roundNum === 3 ? roundTotal : (memData.round3?.total || currentTeamScore.round3?.total || 0);

    const grandTotal = r1 + r2 + r3;
    const grandAvg = parseFloat((grandTotal / 3).toFixed(1));

    // Update Overall / Backward Compatible Properties
    currentTeamScore.teamName = team.teamName;
    currentTeamScore.mentorName = this.mentorProfile || "Verified Mentor";
    currentTeamScore.grandTotal = grandTotal;
    currentTeamScore.grandAvg = grandAvg;
    // Set totalScore to round 3 if complete, or latest evaluated round, or cumulative average
    currentTeamScore.totalScore = r3 > 0 ? r3 : (r2 > 0 ? r2 : (r1 > 0 ? r1 : grandAvg));
    currentTeamScore.innovation = p1;
    currentTeamScore.technical = p2;
    currentTeamScore.feasibility = p3;
    currentTeamScore.presentation = p4;
    currentTeamScore.remarks = remarks || currentTeamScore.remarks || '';
    currentTeamScore.mentorLocked = lockNow || currentTeamScore.mentorLocked || false;
    if (lockNow) currentTeamScore.mentorLockedAt = new Date().toISOString();
    currentTeamScore.adminApproved = this.isAdmin ? true : (currentTeamScore.adminApproved || false);
    if (this.isAdmin) currentTeamScore.adminApprovedAt = new Date().toISOString();

    scores[teamCode] = currentTeamScore;
    localStorage.setItem(SK_TEAM_SCORES, JSON.stringify(scores));

    try {
      if (typeof BroadcastChannel !== 'undefined') {
        const bc = new BroadcastChannel('hs27_theme_sync');
        bc.postMessage({ type: 'SCORE_SAVED', teamCode, roundNum, lockNow, timestamp: Date.now() });
      }
    } catch (e) {}

    this.closeEvaluationModal();
    this.showToast(lockNow ? `✓ Round ${roundNum} score locked & submitted for ${team.teamName}` : `✓ Round ${roundNum} draft score saved for ${team.teamName}`);
    this.render();
  }

  lockAllRounds() {
    if (!this.activeTeamCode) return;
    const teamCode = this.activeTeamCode;
    const scores = this.getScores();
    const teams = this.getTeams();
    const team = teams.find(t => t.code === teamCode) || { teamName: 'Squad ' + teamCode };

    this.saveActiveSlidersToMemory();
    const memData = (this._inMemoryRounds && this._inMemoryRounds[teamCode]) || {};
    const currentTeamScore = scores[teamCode] || {};

    [1, 2, 3].forEach(r => {
      const rKey = `round${r}`;
      const rDat = memData[rKey] || currentTeamScore[rKey] || {
        param1: 16, param2: 16, param3: 16, param4: 16, param5: 16, total: 80, remarks: ''
      };
      rDat.locked = true;
      rDat.lockedAt = new Date().toISOString();
      currentTeamScore[rKey] = rDat;
    });

    const r1 = currentTeamScore.round1.total;
    const r2 = currentTeamScore.round2.total;
    const r3 = currentTeamScore.round3.total;
    const grandTotal = r1 + r2 + r3;
    const grandAvg = parseFloat((grandTotal / 3).toFixed(1));

    currentTeamScore.teamName = team.teamName;
    currentTeamScore.mentorName = this.mentorProfile || "Verified Mentor";
    currentTeamScore.grandTotal = grandTotal;
    currentTeamScore.grandAvg = grandAvg;
    currentTeamScore.totalScore = r3 > 0 ? r3 : grandAvg;
    currentTeamScore.mentorLocked = true;
    currentTeamScore.mentorLockedAt = new Date().toISOString();
    currentTeamScore.adminApproved = this.isAdmin ? true : (currentTeamScore.adminApproved || false);

    scores[teamCode] = currentTeamScore;
    localStorage.setItem(SK_TEAM_SCORES, JSON.stringify(scores));

    try {
      if (typeof BroadcastChannel !== 'undefined') {
        const bc = new BroadcastChannel('hs27_theme_sync');
        bc.postMessage({ type: 'SCORE_SAVED', teamCode, lockNow: true, timestamp: Date.now() });
      }
    } catch (e) {}

    this.closeEvaluationModal();
    this.showToast(`👑 All 3 rounds locked & submitted for ${team.teamName}`);
    this.render();
  }

  escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  showToast(msg) {
    let toast = document.getElementById('menToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'menToast';
      toast.className = 'men-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }
}

let mentorPortal = null;
document.addEventListener('DOMContentLoaded', () => {
  mentorPortal = new MentorPortalEngine();
  window.mentorPortal = mentorPortal;
});

