# 🎯 NORTH STAR STRATEGY — The Acquisition & Transformation Machine

**Version:** 1.1  
**Date:** 2026-05-10  
**Owner:** Dali (siyaida)  
**Architect:** JIC Washington  

---

## The North Star

> **"Every insight becomes a deployed asset. Every deployed asset becomes a conversation. Every conversation becomes a closed outcome."**

This is not a tech stack. This is a **commercial engine** disguised as infrastructure. The entire system exists to compress the gap between "we should do this" and "it's live and producing results."

---

## The Three Missions — What They Actually Are

| Mission | Public Name | What It Really Does | North Star Role |
|---------|------------|---------------------|-----------------|
| **01** | JIC × GW Engineering Management | Saudi giga-project enrollment engine | **Revenue Proof** — shows the machine can close real deals in a real market |
| **02** | Program Launchpad | Tenant architecture + intake portal | **Infrastructure Factory** — repeatable scaffolding for any future program |
| **03** | Cross-Agent Operations | Multi-agent boot protocol + coordination | **Scale Multiplier** — one human becomes a fleet commander |

**The truth:** Mission 01 is the customer. Mission 02 is the product. Mission 03 is the production line.

---

## Layer 0: The Flywheel (How They Connect)

```
┌─────────────────────────────────────────────────────────────┐
│  NORTH STAR: Deploy → Engage → Close → Learn → Redeploy     │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
   ┌─────────┐          ┌──────────┐          ┌──────────┐
   │Mission 01│◄────────►│Mission 02│◄────────►│Mission 03│
   │  (Deal)  │  learns  │ (Scaffold)│  builds │ (Agents) │
   └─────────┘          └──────────┘          └──────────┘
        │                     │                     │
        └─────────────────────┴─────────────────────┘
                              │
                              ▼
              ┌───────────────────────────┐
              │   STATE.md → Dashboard    │
              │   (Single Source of Truth)│
              └───────────────────────────┘
```

**The loop:**
1. Mission 01 closes a deal → **documents the pattern** in STATE.md
2. Mission 02 **codifies** that pattern into reusable infrastructure
3. Mission 03 **replicates** the execution across parallel agents
4. Insights feed back into Mission 01's next sprint

---

## Layer 1: Infrastructure Map (Everything We Built)

### DNS & Hosting Layer
| Asset | Purpose | Serves Which Mission |
|-------|---------|---------------------|
| `siyada-cybersecurity.com` | Brand anchor + process portal | 01, 02, 03 |
| `jic.siyada-cybersecurity.com` | JIC public landing + enrollment | 01 |
| `process.siyada-cybersecurity.com` | Program Launchpad intake | 02 |
| **VPS (62.171.171.112)** | **Caddy reverse proxy + static file server — sole hosting layer** | **01, 02, 03** |

**Principle:** One VPS. One Caddyfile. All sites served directly from `/var/www/` on the VPS. No external hosting dependency.

### Repo Architecture
```
dali-mission-control/           ← Mission 01 + 03 orchestration
├── missions/
│   └── jic-gw-engineering-management/   ← The Proof
├── operations/
│   ├── agent-boot-protocol.md            ← Mission 03 core
│   ├── cross-agent-ops.md                 ← Fleet coordination
│   └── agent-state-template.md            ← Every agent's brain
├── docs/
│   ├── index.html                         ← Main dashboard
│   └── missions/jic-gw/                   ← Public JIC site
└── STATE.md                               ← Single source of truth

program-launchpad/              ← Mission 02 infrastructure factory
├── docs/
│   ├── index.html                         ← Launchpad landing
│   ├── intake/                            ← Enrollment portal
│   └── css/                               ← Shared design system
├── infra/
│   ├── vps/Caddyfile                      ← Routing logic
│   └── deploy.sh                          ← VPS deployment script
├── src/
│   ├── tenant-schema.md                   ← Reusable architecture
│   └── i18n/                              ← EN+AR scaffolding
└── README.md
```

### Tooling Inventory
| Tool | What It Does For The North Star |
|------|--------------------------------|
| **GitHub** | Source of truth, versioned everything, deploy trigger |
| **VPS + Caddy** | **Static file server + reverse proxy + SSL — sole hosting layer** |
| **OpenClaw Agents** | Parallel execution, subagent orchestration, 24/7 operation |
| **Feishu/QQ/Discord** | Human-in-the-loop when judgment is needed |
| **STATE.md** | Living document — every sprint writes here, every morning reads from here |

---

## Layer 2: Automation Architecture (The Machine)

### Pattern: "Create a Claw, Give It Tools, Point It to Files"

This is Dali's exact request. Here's how it works:

```
┌─────────────────────────────────────────────────────────────┐
│                    HUMAN (Dali)                             │
│              "Launch Mission 04: Saudi HealthTech"          │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│              MISSION 03: AGENT BOOT PROTOCOL                 │
│  1. Clone program-launchpad scaffold                         │
│  2. Generate mission folder in dali-mission-control          │
│  3. Spawn 4 parallel subagents:                              │
│     - Research agent (competitive intel)                     │
│     - Content agent (landing page + copy)                   │
│     - Outreach agent (employer list + templates)            │
│     - Ops agent (STATE.md tracking + health checks)         │
│  4. Each agent gets: repo path, mission brief, tool access   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│              MISSION 02: INFRASTRUCTURE FACTORY              │
│  - Scaffolds tenant subdomain: healthtech.siyada-cyber...   │
│  - Generates intake portal with i18n (EN+AR)                │
│  - Creates Caddyfile routing rules                          │
│  - Produces SAMPLE_DATA watermarks for demo                 │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│              MISSION 01: REVENUE PROOF (Template)            │
│  - Anchor employer research (top 50)                      │
│  - Outbound message templates (120)                         │
│  - Objection playbook                                       │
│  - Battle card + value props                                │
│  → All artifacts deployed to live site within 48h          │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    STATE.md (Living Dashboard)                 │
│  - All 4 agents write progress here                         │
│  - Dali checks one file for entire operation status         │
│  - Health checks auto-update deployment status             │
└─────────────────────────────────────────────────────────────┘
```

### The 48-Hour Rule
Every new mission must be **counter-ready** within 48 hours of launch. This means:
- Live landing page ✅
- Working intake form ✅
- First 10 employer contacts identified ✅
- 3 message templates ready ✅
- STATE.md updated with sprint plan ✅

---

## Layer 3: North Star Metrics (How We Know It's Working)

### Lagging Indicators (The Business)
| Metric | Target | Current |
|--------|--------|---------|
| Enrollment conversations initiated | 50/month | TBD |
| Employer partnerships signed | 5/quarter | TBD |
| Program revenue | $XX,XXX | TBD |
| Mission launch velocity | 48h from idea to live | TBD |

### Leading Indicators (The Machine)
| Metric | Target | Current |
|--------|--------|---------|
| Subagent tasks dispatched | 4 per mission | 3 missions × 4 = 12 |
| Sites deployed | All green | 3/3 |
| STATE.md update frequency | Every sprint | Active |
| Repo commit velocity | Daily | Active |
| Infrastructure reuse | 80% from Launchpad template | TBD |

---

## The Operating Principles (Non-Negotiable)

1. **VPS-Only Hosting** — No Netlify, no external static hosts. One VPS serves everything via Caddy.
2. **OSS-First** — Everything is MIT licensed, portable, forkable. No vendor lock-in.
3. **Bilingual by Default** — Every public artifact has EN+AR scaffolding.
4. **Saudi-Context Native** — Not translated. Born in the context.
5. **Human-in-the-Loop for Judgment** — Agents execute, Dali decides.
6. **Deploy Beats Perfect** — Live and flawed beats theoretical and polished.
7. **STATE.md Is the Dashboard** — If it's not in STATE.md, it didn't happen.
8. **One VPS, One Caddyfile, Infinite Subdomains** — Scale horizontally without multiplying infrastructure cost.

---

## What This Enables (The Vision)

Dali's end state:

> **"Create a claw, give it these tools, point it to these files — then as human in the loop, expect these results for closing, or these results closed to follow up."**

This strategy makes that real by:
- **Decoupling** mission logic from infrastructure (Mission 02 is reusable)
- **Parallelizing** execution (Mission 03 runs 4 agents simultaneously)
- **Proving** the model works (Mission 01 is the case study)
- **Documenting** everything in real-time (STATE.md as living memory)

The North Star is not "build cool tech." The North Star is **"turn every idea into revenue faster than anyone else in the market."**

---

## Next Actions

| # | Action | Owner | When |
|---|--------|-------|------|
| 1 | ✅ Commit this strategy to `dali-mission-control/NORTH_STAR.md` | JIC | Done |
| 2 | Update Caddyfile to serve all sites directly from VPS | JIC | Now |
| 3 | Create `deploy.sh` script for one-command VPS deployment | JIC | Now |
| 4 | Update all three STATE.md files to reference this strategy | JIC | Next |
| 5 | Create `MISSION_TEMPLATE.md` in program-launchpad for future spawns | JIC | Next |
| 6 | Design the "Process Website" — public methodology documentation | JIC | Sprint |
| 7 | Build health check automation (cron) for all 3 sites | JIC | Sprint |

---

*This document is a contract between Dali and the machine. Every line of code, every agent spawn, every deployment must answer to the North Star.*
