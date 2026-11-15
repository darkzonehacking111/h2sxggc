/**
 * ══════════════════════════════════════════════════════════════════════════
 * HACKATHON 2027 · OFFICIAL STANDINGS & LEADERBOARD CONTROLLER
 * Multi-Round (Round 1, 2, 3 & Cumulative) Live Rankings Engine
 * ══════════════════════════════════════════════════════════════════════════
 */

const SK_TEAMS_DB = 'udbhav_2027_teams';
const SK_TEAM_SCORES = 'hs27_team_scores';
const SK_STANDINGS_PUBLISHED = 'hs27_standings_published';
const SK_ADMIN_AUTH = 'hs27_admin_auth';

class StandingsEngine {
  constructor() {
    this.currentTrack = 'all';
    this.init();
  }

  init() {
    this.bindEvents();
    this.render();
    this.initClock();
  }

  initClock() {
    const update = () => {
      const now = new Date();
      const str = now.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour12: false });
      const el = document.getElementById('stdClockBadge');
      if (el) el.innerHTML = `<span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:#ffd700;margin-right:6px;box-shadow:0 0 8px #ffd700;"></span>${str} IST`;
    };
    update();
    setInterval(update, 1000);
  }

  bindEvents() {
    window.addEventListener('storage', (e) => {
      const watched = [SK_TEAMS_DB, SK_TEAM_SCORES, SK_STANDINGS_PUBLISHED, SK_ADMIN_AUTH];
      if (e && e.key && watched.includes(e.key)) {
        this.render();
      }
    });

    try {
      if (typeof BroadcastChannel !== 'undefined') {
        const bc = new BroadcastChannel('hs27_theme_sync');
        bc.onmessage = (msg) => {
          if (msg && msg.data && (msg.data.type === 'SCORE_SAVED' || msg.data.type === 'STANDINGS_TOGGLED')) {
            this.render();
          }
        };
      }
    } catch (e) {}
  }

  isPublished() {
    return localStorage.getItem(SK_STANDINGS_PUBLISHED) === 'true';
  }

  isAdmin() {
    return sessionStorage.getItem(SK_ADMIN_AUTH) === 'true' || localStorage.getItem(SK_ADMIN_AUTH) === 'true';
  }

  getRankedTeams() {
    let teams = [];
    let scores = {};

    try {
      teams = JSON.parse(localStorage.getItem(SK_TEAMS_DB)) || [];
      scores = JSON.parse(localStorage.getItem(SK_TEAM_SCORES)) || {};
    } catch (e) {}

    const roundFilter = document.getElementById('standingsRoundFilter')?.value || 'cumulative';

    const list = teams.map(t => {
      const s = scores[t.code] || {};
      const r1 = s.round1?.total !== undefined ? s.round1.total : (s.totalScore !== undefined ? s.totalScore : 0);
      const r2 = s.round2?.total !== undefined ? s.round2.total : 0;
      const r3 = s.round3?.total !== undefined ? s.round3.total : 0;
      const grandTotal = s.grandTotal !== undefined ? s.grandTotal : (r1 + r2 + r3);
      const grandAvg = s.grandAvg !== undefined ? s.grandAvg : parseFloat(((r1 + r2 + r3) / 3).toFixed(1));

      let effectiveScore = s.totalScore || 0;
      let denom = 100;
      if (roundFilter === 'r1') {
        effectiveScore = r1;
        denom = 100;
      } else if (roundFilter === 'r2') {
        effectiveScore = r2;
        denom = 100;
      } else if (roundFilter === 'r3') {
        effectiveScore = r3;
        denom = 100;
      } else {
        effectiveScore = grandTotal > 0 ? grandTotal : (s.totalScore ? s.totalScore * 3 : 0);
        denom = 300;
      }

      return {
        ...t,
        ...s,
        r1, r2, r3, grandTotal, grandAvg,
        displayScore: effectiveScore,
        scoreDenom: denom,
        totalScore: s.totalScore !== undefined ? s.totalScore : 0
      };
    });

    // Sort descending by displayScore
    return list.sort((a, b) => b.displayScore - a.displayScore);
  }

  render() {
    const isPub = this.isPublished();
    const isAdmin = this.isAdmin();

    const holdingWrap = document.getElementById('standingsHoldingScreen');
    const contentWrap = document.getElementById('standingsContentWrap');
    const adminBanner = document.getElementById('standingsAdminPreviewBanner');

    if (adminBanner) {
      adminBanner.style.display = (isAdmin && !isPub) ? 'flex' : 'none';
    }

    if (!isPub && !isAdmin) {
      if (holdingWrap) holdingWrap.style.display = 'block';
      if (contentWrap) contentWrap.style.display = 'none';
      return;
    }

    if (holdingWrap) holdingWrap.style.display = 'none';
    if (contentWrap) contentWrap.style.display = 'block';

    const ranked = this.getRankedTeams();
    this.renderPodium(ranked);
    this.renderTable(ranked);
  }

  renderPodium(ranked) {
    const roundFilter = document.getElementById('standingsRoundFilter')?.value || 'cumulative';
    const roundLabels = {
      cumulative: "GRAND CHAMPION",
      r1: "ROUND 1 CHAMPION",
      r2: "ROUND 2 CHAMPION",
      r3: "ROUND 3 CHAMPION"
    };

    const p1 = ranked[0] || { teamName: 'TBD', leaderName: 'Contender', displayScore: 0, scoreDenom: 100, code: '---' };
    const p2 = ranked[1] || { teamName: 'TBD', leaderName: 'Contender', displayScore: 0, scoreDenom: 100, code: '---' };
    const p3 = ranked[2] || { teamName: 'TBD', leaderName: 'Contender', displayScore: 0, scoreDenom: 100, code: '---' };

    // 1st Place (Gold)
    const t1 = document.getElementById('podiumTeam1');
    const l1 = document.getElementById('podiumLead1');
    const s1 = document.getElementById('podiumScore1');
    if (t1) t1.textContent = p1.teamName;
    if (l1) l1.textContent = `${p1.leaderName || 'Lead'} (${p1.track || 'Track'})`;
    if (s1) s1.textContent = `${p1.displayScore} / ${p1.scoreDenom} PTS`;

    // 2nd Place (Silver)
    const t2 = document.getElementById('podiumTeam2');
    const l2 = document.getElementById('podiumLead2');
    const s2 = document.getElementById('podiumScore2');
    if (t2) t2.textContent = p2.teamName;
    if (l2) l2.textContent = `${p2.leaderName || 'Lead'} (${p2.track || 'Track'})`;
    if (s2) s2.textContent = `${p2.displayScore} / ${p2.scoreDenom} PTS`;

    // 3rd Place (Bronze)
    const t3 = document.getElementById('podiumTeam3');
    const l3 = document.getElementById('podiumLead3');
    const s3 = document.getElementById('podiumScore3');
    if (t3) t3.textContent = p3.teamName;
    if (l3) l3.textContent = `${p3.leaderName || 'Lead'} (${p3.track || 'Track'})`;
    if (s3) s3.textContent = `${p3.displayScore} / ${p3.scoreDenom} PTS`;
  }

  renderTable(ranked) {
    const tbody = document.getElementById('standingsTableBody');
    if (!tbody) return;

    const search = (document.getElementById('standingsSearchInput')?.value || '').toLowerCase();
    const filterTrack = document.getElementById('standingsTrackFilter')?.value || 'all';
    const roundFilter = document.getElementById('standingsRoundFilter')?.value || 'cumulative';

    const filtered = ranked.filter(t => {
      const matchSearch = !search ||
        (t.teamName && t.teamName.toLowerCase().includes(search)) ||
        (t.code && t.code.toLowerCase().includes(search)) ||
        (t.leaderName && t.leaderName.toLowerCase().includes(search));
      const matchTrack = filterTrack === 'all' || t.track === filterTrack;
      return matchSearch && matchTrack;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:40px;color:var(--std-text-muted);">No teams match the current filter.</td></tr>`;
      return;
    }

    tbody.innerHTML = filtered.map((team, idx) => {
      let rankBadge = `#${idx + 1}`;
      if (idx === 0) rankBadge = '🥇 #1';
      else if (idx === 1) rankBadge = '🥈 #2';
      else if (idx === 2) rankBadge = '🥉 #3';

      return `
        <tr>
          <td>
            <span class="std-rank-num">${rankBadge}</span>
          </td>
          <td>
            <div style="font-weight:800;color:#fff;font-size:1.05rem;">${this.escapeHtml(team.teamName)}</div>
            <div style="font-family:var(--std-font-mono);font-size:0.75rem;color:var(--std-orange);">${team.code}</div>
          </td>
          <td>
            <div style="font-size:0.88rem;color:#fff;">${this.escapeHtml(team.leaderName)}</div>
            <div style="font-size:0.75rem;color:var(--std-text-muted);">${this.escapeHtml(team.college || 'PIET Jaipur')}</div>
          </td>
          <td>
            <span style="background:rgba(59,130,246,0.15);color:#60a5fa;border:1px solid rgba(59,130,246,0.3);padding:3px 9px;border-radius:6px;font-family:var(--std-font-mono);font-size:0.72rem;font-weight:700;">
              ${team.track || 'Track'}
            </span>
            ${team.psId ? `<span style="background:rgba(255,77,0,0.15);color:#ff8a65;border:1px solid rgba(255,77,0,0.3);padding:3px 8px;border-radius:6px;font-family:var(--std-font-mono);font-size:0.72rem;font-weight:700;margin-left:4px;">${team.psId}</span>` : ''}
          </td>
          <td>
            <div style="font-family:var(--std-font-mono);font-size:0.75rem;display:flex;gap:6px;flex-wrap:wrap;">
              <span style="background:rgba(16,185,129,0.12);color:#10b981;border:1px solid rgba(16,185,129,0.3);padding:2px 7px;border-radius:4px;" title="Round 1 Ideation & Feasibility">R1: ${team.r1 > 0 ? team.r1 : '--'}</span>
              <span style="background:rgba(56,189,248,0.12);color:#38bdf8;border:1px solid rgba(56,189,248,0.3);padding:2px 7px;border-radius:4px;" title="Round 2 Architecture & Prototype">R2: ${team.r2 > 0 ? team.r2 : '--'}</span>
              <span style="background:rgba(167,139,250,0.12);color:#a78bfa;border:1px solid rgba(167,139,250,0.3);padding:2px 7px;border-radius:4px;" title="Round 3 Finale Production & Demo">R3: ${team.r3 > 0 ? team.r3 : '--'}</span>
            </div>
          </td>
          <td>
            <span class="std-score-cell">${team.displayScore}</span>
            <span style="font-size:0.75rem;color:var(--std-text-muted);">/${team.scoreDenom}</span>
          </td>
          <td>
            ${team.adminApproved ? '<span style="background:rgba(16,185,129,0.15);color:var(--std-green);border:1px solid var(--std-green);padding:4px 10px;border-radius:9999px;font-family:var(--std-font-mono);font-size:0.72rem;font-weight:800;">✓ FINAL</span>' : '<span style="color:var(--std-text-muted);font-family:var(--std-font-mono);font-size:0.72rem;">MENTOR SCORED</span>'}
          </td>
        </tr>
      `;
    }).join('');
  }

  escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
}

let standingsEngine = null;
document.addEventListener('DOMContentLoaded', () => {
  standingsEngine = new StandingsEngine();
  window.standingsEngine = standingsEngine;
});