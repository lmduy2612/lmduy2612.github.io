/**
 * Duy Luong (lmduy2612) Personal Portfolio - Interactive Scripts
 * Features:
 * - Dynamic Typed Roles
 * - Interactive Neural Mesh Canvas Background
 * - Live Terminal Simulator Engine
 * - Clipboard Utilities
 */

// 1. DYNAMIC TYPED ROLES
const roles = [
  "Autonomous Multi-Agent Systems",
  "Deterministic Tool Calling & ReAct Loops",
  "High-Throughput gRPC & NestJS Services",
  "Test-Driven Development (TDD) Loops",
  "Distributed Backend Architecture",
  "Interactive 3D WebGL (Three.js)"
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

  let typingSpeed = isDeleting ? 40 : 80;

  if (!isDeleting && charIndex === currentRole.length) {
    typingSpeed = 2200; // Pause at full text
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typingSpeed = 400; // Pause before typing next
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

      // Mouse collision
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

const COMMANDS = {
  help: () => `
<div class="term-white font-bold">AVAILABLE COMMANDS:</div>
  <span class="term-cyan">status</span>       - Check live health & state of autonomous agent clusters
  <span class="term-cyan">scout</span>        - Run spam-proof radar filter for clean GitHub bounties
  <span class="term-cyan">solve-demo</span>   - Simulate 1M context code ingestion & local TDD verification
  <span class="term-cyan">stack</span>        - Display complete engineering & architecture stack
  <span class="term-cyan">repos</span>        - List featured open-source repositories by lmduy2612
  <span class="term-cyan">contact</span>      - Output communication coordinates & social links
  <span class="term-cyan">clear</span>        - Clear the terminal console
`,

  status: () => `
<div class="term-white font-bold">👑 [MAIN CONTROL ORCHESTRATOR] Cluster Status:</div>
  🟢 <span class="term-indigo">[00-Docs-Governance]</span> => Online (Architecture sync & rules audit)
  🟢 <span class="term-indigo">[01-Ideation-Research]</span> => Online (Autonomous LLM Tool Orchestration)
  🟢 <span class="term-indigo">[02-Bounty-Executor]</span>   => Online (Local TDD runner & pytest engine)
  🟢 <span class="term-indigo">[03-PnL-Finance]</span>       => Online (PR payout & milestone reconciliation)
  🟢 <span class="term-indigo">[04-Profile-Branding]</span>   => Online (Portfolio & GitHub profile architect)
  🟢 <span class="term-indigo">[05-PR-Publisher]</span>      => Online (Autonomous git push, PR & comments)
<div class="term-green font-bold">✓ 6/6 Workspace subagent nodes operational. Zero-Execution principle intact.</div>
`,

  scout: () => `
<div class="term-cyan font-bold">📡 Kích hoạt Radar Scout (Spam-Proof Filter)...</div>
  • Filtering criteria: comments &lt; 3, PRs == 0, exclude good-first-issue & bot spam.
  • Ingesting active repositories on GitHub/Polar/DevPool...
  [+] Found: 4 clean bounty issues matching high-confidence score (&gt;90).
  [✓] Opportunity cards generated and dispatched to 01-Ideation-Research.
`,

  "solve-demo": () => `
<div class="term-indigo font-bold">⚙️ [TDD SOLVER] Simulating Autonomous Feedback Loop...</div>
  1. Cloned target brownfield repository into isolated sandbox.
  2. Synthesized failure reproduction test (reproduce_issue.py)... <span class="term-red">FAIL (Expected)</span>
  3. Ingested AST symbol graph & resolved dependency call hierarchy.
  4. AST parsing & root-cause patch generated: Fix concurrency race in event_dispatcher.ts.
  5. Running local test suite (pytest -v)...
     test_dispatcher_order ............ <span class="term-green">PASSED</span>
     test_high_concurrency_race ....... <span class="term-green">PASSED</span>
     test_regression_suite ............ <span class="term-green">PASSED (142/142 GREEN)</span>
<div class="term-green font-bold">🎉 Solution verified 100% green! Ready for automated PR submission.</div>
`,

  stack: () => `
<div class="term-white font-bold">🛠️ TECHNOLOGY MATRIX (lmduy2612):</div>
  • <span class="term-cyan">AI & Agents:</span> Autonomous Multi-Agent, Tool Calling & ReAct Loops, Vector RAG, AST Parsing
  • <span class="term-indigo">Backend:</span>    TypeScript, NestJS, gRPC & Protocol Buffers, Python 3.12, FastAPI
  • <span class="term-yellow">Databases:</span>  PostgreSQL, Redis (Distributed Lock/Cache), Prisma ORM
  • <span class="term-green">Web & UI:</span>   React 19, Next.js 15 (App Router), Tailwind CSS v4
  • <span class="term-gray">Testing & CI:</span> Pytest, Vitest, Playwright E2E, GitHub Actions CI/CD
`,

  repos: () => `
<div class="term-white font-bold">📦 FEATURED PLATFORMS & REPOSITORIES (GitHub @lmduy2612):</div>
  1. <span class="term-cyan">job-harvester-agent</span> : Autonomous AI opportunity intelligence platform (118+ PRs)
  2. <span class="term-indigo">git-mechanic-agent</span>  : Autonomous brownfield bug resolver & self-healing TDD engine
  3. <span class="term-green">core-orchestrator</span>   : Unified multi-agent runtime & task state machine
  4. <span class="term-yellow">lmduy2612.github.io</span> : Personal portfolio & interactive systems playground
`,

  contact: () => `
<div class="term-white font-bold">📫 CONTACT & COORDINATES:</div>
  • GitHub:   <a href="https://github.com/lmduy2612" target="_blank" class="term-cyan underline">github.com/lmduy2612</a>
  • Email:    <span class="term-indigo">lmduy2612@gmail.com</span>
  • Location: Vietnam 🇻🇳 (Available for Global Remote Systems Engineering)
`,

  clear: () => {
    if (terminalScreen) terminalScreen.innerHTML = "";
    return "";
  }
};

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

  // Print command line
  printToTerminal(`
    <div class="flex items-center gap-2 mt-2">
      <span class="term-cyan font-bold">➜</span>
      <span class="term-indigo font-bold">~/orchestrator</span>
      <span class="term-gray">$</span>
      <span class="term-white font-semibold">${cleanCmd}</span>
    </div>
  `);

  if (COMMANDS[cleanCmd]) {
    const result = COMMANDS[cleanCmd]();
    if (result) printToTerminal(result);
  } else {
    printToTerminal(`
      <div class="term-red">Command not recognized: '${cleanCmd}'. Type <span class="term-cyan">help</span> for available commands.</div>
    `);
  }
}

// Handle Terminal Input Enter Key
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

// Start Typed Effect on DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  typeEffect();
});
