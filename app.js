/**
 * Duy Luong (lmduy2612) Personal Portfolio - Interactive Scripts
 * Role: Agentic Workflow Architect & Multi-Agent Coding Commander
 */

// 1. DYNAMIC TYPED ROLES
const roles = [
  "Multi-Agent Squad Orchestration",
  "Zero-Execution CTO Workflows",
  "5-Layer Automated Quality Gates",
  "Parallel Autonomous Coding Fleets",
  "Context & Skill Engineering (AGENTS.md)",
  "Autonomous End-to-End Software Delivery"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedElement = document.getElementById("typed-roles");

function typeEffect() {
  if (!typedElement) return;
  const currentRole = roles[roleIndex];

  if (isDeleting) {
    typedElement.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedElement.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }

  let typingSpeed = isDeleting ? 35 : 75;

  if (!isDeleting && charIndex === currentRole.length) {
    typingSpeed = 2200;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typingSpeed = 400;
  }

  setTimeout(typeEffect, typingSpeed);
}

// 2. INTERACTIVE NEURAL MESH CANVAS
const canvas = document.getElementById("neural-canvas");
if (canvas) {
  const ctx = canvas.getContext("2d");
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initParticles();
  });

  const mouse = { x: null, y: null, radius: 150 };

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  });

  window.addEventListener("mouseout", () => {
    mouse.x = null;
    mouse.y = null;
  });

  let particles = [];
  const PARTICLE_COUNT = Math.min(Math.floor((width * height) / 16000), 75);

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.6;
      this.vy = (Math.random() - 0.5) * 0.6;
      this.radius = Math.random() * 1.8 + 1;
      this.color = Math.random() > 0.5 ? "#6366f1" : "#06b6d4";
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 1.5;
          this.y -= (dy / dist) * force * 1.5;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle());
    }
  }

  function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          const opacity = (1 - dist / 130) * 0.25;
          ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animateCanvas() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach((p) => {
      p.update();
      p.draw();
    });
    connectParticles();
    requestAnimationFrame(animateCanvas);
  }

  initParticles();
  animateCanvas();
}

// 3. LIVE TERMINAL SIMULATOR ENGINE
const terminalScreen = document.getElementById("terminal-screen");
const terminalInput = document.getElementById("terminal-input");

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const COMMANDS = {
  help: () => `
<div class="term-white font-bold">AVAILABLE AGENTIC COMMANDS:</div>
  <span class="term-cyan">squads</span>       - View the 14-Subagent hierarchy under Main Control CTO
  <span class="term-cyan">gate-demo</span>    - Simulate the 5-Layer Quality &amp; Pre-PR Playwright E2E Gate
  <span class="term-cyan">platforms</span>    - List live production platforms built via Agent Flows
  <span class="term-cyan">bounty</span>       - Inspect Git Mechanic autonomous open-source bounty solver
  <span class="term-cyan">stack</span>        - Display Agentic Control Plane &amp; Production Stack
  <span class="term-cyan">contact</span>      - Output communication coordinates &amp; live domains
  <span class="term-cyan">clear</span>        - Clear the terminal console
`,

  squads: () => `
<div class="term-white font-bold">👑 [MAIN CONTROL CTO] Zero-Execution 14-Subagent Squad Hierarchy:</div>
  ├─ <span class="term-indigo">01-Architecture &amp; Design</span> : Product Specs (PRD/OpenAPI) • Design Token System
  ├─ <span class="term-indigo">02-Data &amp; AI Pipeline</span>    : Multi-Board Harvester (23+ Boards) • AI Refinery &amp; Veto
  ├─ <span class="term-indigo">03-Core Product Squads</span>   : Backend API (NestJS/Prisma) • Next.js Landing • Admin CMS
  ├─ <span class="term-indigo">04-Verification Gates</span>    : 5-Layer Quality Gate • AI Code Reviewer • Playwright E2E
  └─ <span class="term-indigo">05-Growth &amp; Release</span>      : Technical SEO &amp; Content • Changelog • Documentation
<div class="term-green font-bold">✓ Strict Zero-Execution enforced: CTO plans &amp; delegates; subagents execute in isolated branches.</div>
`,

  "gate-demo": () => `
<div class="term-indigo font-bold">🛡️  [PRE-PR QUALITY GATE] Auditing Agent Pull Request...</div>
  [Layer 1] Static &amp; Type Check (ESLint + TypeScript) ........... <span class="term-green">PASSED (0 errors)</span>
  [Layer 2] Zero-Mock &amp; Design Token Contract Linter ............ <span class="term-green">PASSED (100% Real API)</span>
  [Layer 3] Independent AI Security &amp; Code Review ............... <span class="term-green">APPROVED (0 high/med)</span>
  [Layer 4] Playwright E2E Matrix (390px / 768px / 1440px) ...... <span class="term-green">PASSED (Isolated Staging)</span>
  [Layer 5] Blue-Green Rollout &amp; Smoke Verification ............. <span class="term-green">LIVE ON PRODUCTION</span>
<div class="term-green font-bold">🎉 PR merged and deployed with zero manual boilerplate coding!</div>
`,

  platforms: () => `
<div class="term-white font-bold">🌐 [AGENT-BUILT ECOSYSTEMS] Live Production Platforms:</div>
  1. <a href="https://jobnexus.io.vn" target="_blank" class="term-cyan underline">jobnexus.io.vn</a>    ➜ Flagship AI recruitment platform (278+ PRs • 15,600+ active jobs across 23+ boards)
  2. <a href="https://hiredemand.io.vn" target="_blank" class="term-indigo underline">hiredemand.io.vn</a>  ➜ Recruitment market &amp; compensation demand intelligence dashboard
  3. <a href="https://san-deal.io.vn" target="_blank" class="term-green underline">san-deal.io.vn</a>    ➜ Automated deal harvester &amp; affiliate commerce intelligence engine
  4. <span class="term-yellow">git-mechanic</span>      ➜ Autonomous open-source bounty solver (51+ merged external PRs)
`,

  bounty: () => `
<div class="term-cyan font-bold">🦀 [GIT-MECHANIC AGENT] Autonomous Open-Source Bounty Resolver:</div>
  • Radar Filter: Scans GitHub / Drips Wave / Stellar Soroban issues with 0 competing PRs.
  • AST Ingestion: Maps symbol graphs &amp; synthesizes failing reproduction tests first.
  • Self-Healing Loop: Runs cargo test / pytest / playwright locally until 100% green.
  • Track Record: <span class="term-green">51+ Verified Pull Requests Merged</span> across Web3 &amp; Open Source ecosystems.
`,

  stack: () => `
<div class="term-white font-bold">🛠️  AGENTIC CONTROL PLANE &amp; PRODUCTION STACK:</div>
  • <span class="term-cyan">Orchestration:</span> Multi-Agent CLI Fleets, Zero-Execution CTO, AGENTS.md &amp; SKILL.md Playbooks
  • <span class="term-indigo">AI &amp; LLM Infra:</span> Multi-LLM Failover Gateway, Anti-Ban Rate Pacing, 768-dim Bi-Encoder RAG
  • <span class="term-green">Quality Gates:</span> 5-Layer Adaptive Gate, Zero-Mock Linter, Playwright E2E, Blue-Green CI/CD
  • <span class="term-yellow">App &amp; Data:</span>    Next.js 15, React 19, NestJS 11, FastAPI, PostgreSQL 16, Qdrant, Redis 7
`,

  contact: () => `
<div class="term-white font-bold">📫 DIRECT COORDINATES &amp; LIVE PLATFORMS:</div>
  • Flagship : <a href="https://jobnexus.io.vn" target="_blank" class="term-cyan underline">https://jobnexus.io.vn</a>
  • Analytics: <a href="https://hiredemand.io.vn" target="_blank" class="term-cyan underline">https://hiredemand.io.vn</a>
  • Commerce : <a href="https://san-deal.io.vn" target="_blank" class="term-cyan underline">https://san-deal.io.vn</a>
  • GitHub   : <a href="https://github.com/lmduy2612" target="_blank" class="term-indigo underline">github.com/lmduy2612</a>
  • Email    : <span class="term-green">lmduy2612@gmail.com</span>
`,

  clear: () => {
    if (terminalScreen) terminalScreen.innerHTML = "";
    return "";
  }
};

// Backwards-compatible command aliases
COMMANDS.status = COMMANDS.squads;
COMMANDS.sessions = COMMANDS.squads;
COMMANDS.clusters = COMMANDS.platforms;
COMMANDS.repos = COMMANDS.platforms;
COMMANDS.scout = COMMANDS.bounty;
COMMANDS["solve-demo"] = COMMANDS["gate-demo"];

function printToTerminal(htmlContent) {
  if (!terminalScreen) return;
  const line = document.createElement("div");
  line.innerHTML = htmlContent;
  terminalScreen.appendChild(line);
  terminalScreen.scrollTop = terminalScreen.scrollHeight;
}

function runCommand(cmdText) {
  const cleanCmd = (cmdText || "").trim().toLowerCase();
  if (!cleanCmd) return;

  const safeCmd = escapeHtml(cleanCmd);

  printToTerminal(`
    <div class="flex items-center gap-2 mt-2">
      <span class="term-cyan font-bold">➜</span>
      <span class="term-indigo font-bold">~/main-control</span>
      <span class="term-gray">$</span>
      <span class="term-white font-semibold">${safeCmd}</span>
    </div>
  `);

  if (COMMANDS[cleanCmd]) {
    const result = COMMANDS[cleanCmd]();
    if (result) printToTerminal(result);
  } else {
    printToTerminal(`
      <div class="term-red">Command not recognized: '${safeCmd}'. Type <span class="term-cyan">help</span> for available commands.</div>
    `);
  }
}

if (terminalInput) {
  terminalInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const val = terminalInput.value;
      terminalInput.value = "";
      runCommand(val);
    }
  });
}

// 4. CLIPBOARD UTILITIES
function copyToClipboard(text, btnElement) {
  navigator.clipboard.writeText(text).then(() => {
    const originalText = btnElement.textContent;
    btnElement.textContent = "Copied! ✓";
    btnElement.classList.add("bg-emerald-800", "text-white");
    setTimeout(() => {
      btnElement.textContent = originalText;
      btnElement.classList.remove("bg-emerald-800", "text-white");
    }, 2000);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  typeEffect();
});
