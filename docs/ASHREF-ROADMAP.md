# 🗺️ ASHREF OPERATOR ROADMAP — Full System Trace

**Date:** 2026-05-10  
**System:** Dali × JIC Washington — Acquisition & Transformation Machine  
**VPS IP:** `62.171.171.112`  
**Primary Domain:** `siyada-cybersecurity.com`  
**Owner:** Dali (siyaida)  
**Operator:** You (Ashref)  

---

## 📡 QUICK REFERENCE — All Live Sites

| # | Domain | What It Is | Status | Action Needed |
|---|--------|-----------|--------|---------------|
| 1 | `siyada-cybersecurity.com` | **Mission Control Dashboard** — Central hub showing all missions, sprint boards, STATE.md | ✅ Live | None |
| 2 | `jic.siyada-cybersecurity.com` | **JIC Marketing Website** — GW × JIC partnership landing, programs, employers | ⚠️ Overwritten (needs CLI restore) | **RESTORE** |
| 3 | `leads.siyada-cybersecurity.com` | **JIC GW Leads** — Multipage (index, program, employers, why-gw, consultation, EN) | ✅ Preserved | None — Safe on `enhancement-pass` branch |
| 4 | `ecosystem.siyada-cybersecurity.com` | **JIC GW Ecosystem** — Multipage (index, sprints, stack, content, dashboard) | ✅ Preserved | None — Safe on `enhancement-pass` branch |
| 5 | `launchpad.siyada-cybersecurity.com` | **Program Launchpad** — Tenant architecture, intake portal, onboarding kit | ⚠️ Overwritten (single page) | **RESTORE** |
| 6 | `build.siyada-cybersecurity.com` | **Build Story** — Documented journey of how this system was built | ✅ Safe | None |
| 7 | `process.siyada-cybersecurity.com` | **Process Website** — North Star methodology, the machine's operating manual | ✅ Content restored | Add `404.html` + `ENHANCEMENT-LOG.md` |
| 8 | `siyadatech.siyada-cybersecurity.com` | **SiyadaTech Pitch Deck** — Agent-powered academic growth pitch | ✅ Safe | None |
| 9 | `flows.siyada-cybersecurity.com` | **ActivePieces** — Workflow automation engine (n8n alternative) | ⚠️ Unhealthy container | **INVESTIGATE** — Check logs, restart if needed |
| 10 | `contacts.siyada-cybersecurity.com` | **EspoCRM** — Contact/lead management CRM | ❌ Not confirmed live | **VERIFY** — Check if container responding |
| 11 | `chat.siyada-cybersecurity.com` | **Chatwoot** — Live chat + customer support | ❌ Not confirmed live | **VERIFY** — Check if container responding |
| 12 | `analytics.siyada-cybersecurity.com` | **Plausible Analytics** — Privacy-focused web analytics | ❌ Not confirmed live | **VERIFY** — Check if container responding |
| 13 | `storage.siyada-cybersecurity.com` | **MinIO S3** — Object storage (file uploads, backups) | ✅ Container running | **CONFIGURE** — Create buckets, set policies |
| 14 | `console.storage.siyada-cybersecurity.com` | **MinIO Console** — Web UI for MinIO management | ✅ Container running | **CONFIGURE** — Set admin password, create access keys |
| 15 | `status.siyada-cybersecurity.com` | **Uptime Kuma** — Site monitoring + alerts | ✅ Container running | **CONFIGURE** — Add all 15 domains as monitors, set alert channels |
| 16 | *(IP direct)* | `http://62.171.171.112` — Fallback access if DNS fails | ✅ Live | None |

---

## 🏗️ THE THREE MISSIONS

### Mission 01: JIC × GW Engineering Management
**Role:** Revenue Proof — "Shows the machine closes real deals in real markets"  
**Status:** Sprint #14-16 shipped, competitive research pending  
**Goal:** Saudi giga-project enrollment engine. Generate employer contacts, send outbound messages, close enrollments.

**Deliverables shipped:**
- ✅ 120 outbound message templates (3 channels × 5 regions × 2 ICPs × 2 languages)
- ✅ Objection playbook
- ✅ Battle card
- ✅ MOU template
- ✅ Lead magnet
- ✅ Info-session script
- ✅ n8n workflows (ActivePieces migration pending)
- ✅ Ad creative brief
- ✅ KPI dashboard spec
- ✅ SiyadaTech pitch deck
- ✅ Demo tour (self-contained)
- ❌ **Deep competitive research** — "Special sauce" UVP for 4 audiences (students, HR, universities, gov) — **NEEDS ACTION**

**Where the files live:**
- Dashboard: `dali-mission-control/docs/index.html`
- Landing: `dali-mission-control/docs/missions/jic-gw-engineering-management/landing/`
- SiyadaTech: `dali-mission-control/docs/siyadatech/`
- Process: `dali-mission-control/docs/process/`

### Mission 02: Program Launchpad
**Role:** Infrastructure Factory — "Repeatable scaffolding for any future program"  
**Status:** Skeleton deployed, needs multipage restoration  
**Goal:** Tenant architecture + intake portal. When Dali says "I want to launch X program," the machine spawns a new tenant in 48 hours.

**Deliverables:**
- ✅ Landing page (currently single file, needs multipage restore)
- ✅ Tenant schema (JSON config per tenant)
- ✅ i18n scaffolding (EN+AR)
- ✅ deploy.sh (one-command VPS deployment)
- ✅ Caddyfile with all routing
- ❌ **Full tenant architecture** — intake form, onboarding kit, operator console
- ❌ **Mission template** for future spawns
- ❌ **Arabic content** — scaffolding exists, not populated

**Where the files live:**
- Repo: `siyaida/program-launchpad`
- VPS path: `/home/jicwashington/projects/program-launchpad/`

### Mission 03: Cross-Agent Operations
**Role:** Scale Multiplier — "One human becomes a fleet commander"  
**Status:** Infrastructure defined, needs implementation  
**Goal:** Multi-agent boot protocol. Spawn parallel agents (research, content, outreach, ops) that coordinate via STATE.md.

**Deliverables:**
- ✅ Agent boot protocol document
- ✅ Cross-agent ops coordination doc
- ✅ Agent state template
- ⚠️ **Subagent orchestration** — Working but needs refinement (12+ tasks dispatched across missions, some lost work)
- ❌ **Automated agent spawning** — Currently manual via subagent calls
- ❌ **Agent health monitoring** — No way to know if an agent died mid-task

---

## 🐳 DOCKER CONTAINERS (on VPS)

All containers run via Docker Compose in `/home/jicwashington/projects/program-launchpad/infra/vps/`.

| Container | Image | Status | Purpose | Action Needed |
|-----------|-------|--------|---------|---------------|
| `vps-caddy-1` | `caddy:2-alpine` | ✅ Healthy | Reverse proxy + static file server | None |
| `vps-twenty-1` | `twentycrm/twenty:latest` | ✅ Healthy | CRM (Twenty CRM) | **ONBOARD** — Create first workspace, invite users |
| `vps-chatwoot-1` | `chatwoot/chatwoot:latest` | Running | Live chat support | **ONBOARD** — Configure inbox, connect channels |
| `vps-activepieces-1` | `activepieces/activepieces:latest` | ⚠️ Unhealthy | Workflow automation (n8n replacement) | **INVESTIGATE** — `docker logs vps-activepieces-1`, restart if stuck |
| `vps-postgres-1` | `pgvector/pgvector:pg15` | ✅ Healthy | Database (PostgreSQL + pgvector for AI) | None |
| `vps-redis-1` | `redis:7-alpine` | ✅ Healthy | Cache / queue | None |
| `vps-minio-1` | `minio/minio:latest` | Running | S3-compatible object storage | **CONFIGURE** — Create buckets, set access policies |
| `vps-uptime-kuma-1` | `louislam/uptime-kuma:latest` | ✅ Healthy | Site monitoring + alerts | **CONFIGURE** — Add all 15 domains, set Telegram/Slack alerts |
| `vps-posthog-proxy-1` | `python:3.11-slim` | ⚠️ Unhealthy | PostHog proxy (analytics) | **INVESTIGATE** — Check config, restart |
| `vps-docker-info-1` | `python:3.11-slim` | Running | Helper service | None |
| `vps-watchtower-1` | `containrrr/watchtower:latest` | ❌ Restart loop | Auto-updates containers | **INVESTIGATE** — Check why restarting, may need auth fix |

**Plausible Analytics** is in the Caddyfile but not visible in `docker ps`. May not be deployed yet. **VERIFY.**

---

## 🔧 CONFIGURATION CHECKLIST

### Immediate (Do First)

| # | Task | Why | How | Priority |
|---|------|-----|-----|----------|
| 1 | **Add PostHog API Key** | Track user behavior on all sites, understand which pages convert | Sign up at posthog.com → create project → copy API key → add to `program-launchpad/infra/vps/.env` → restart posthog-proxy container | 🔴 HIGH |
| 2 | **Configure Uptime Kuma** | Know immediately if any site goes down | Visit `status.siyada-cybersecurity.com` → add all 15 domains → set alert method (Telegram bot, email, or webhook) | 🔴 HIGH |
| 3 | **Fix ActivePieces** | Workflow automation is core to the machine — n8n migration target | `docker logs vps-activepieces-1` → identify error → fix (likely missing env var or DB connection) → restart | 🔴 HIGH |
| 4 | **Configure MinIO** | File storage for uploads, backups, static assets | Visit `console.storage.siyada-cybersecurity.com` → set admin password → create bucket `siyada-uploads` → create read-only access key → add key to `.env` | 🔴 HIGH |
| 5 | **Fix Watchtower** | Auto-updates keep containers secure | `docker logs vps-watchtower-1` → likely auth issue with Docker Hub → fix or disable if problematic | 🟡 MEDIUM |
| 6 | **Onboard Twenty CRM** | Dali needs a CRM to track leads and contacts | Visit `contacts.siyada-cybersecurity.com` → create workspace → invite Dali → configure pipelines for "JIC Leads" | 🟡 MEDIUM |
| 7 | **Onboard Chatwoot** | Live chat for site visitors | Visit `chat.siyada-cybersecurity.com` → create inbox → add website channel (point to jic.siyada-cybersecurity.com) → configure business hours | 🟡 MEDIUM |
| 8 | **Verify Plausible** | Analytics without tracking consent banners | Check if plausible container exists: `docker ps | grep plausible`. If missing, add to docker-compose.yml | 🟡 MEDIUM |

### Short Term (This Week)

| # | Task | Why | How |
|---|------|-----|-----|
| 9 | **Restore JIC Marketing multipage** | Single Astro build replaced proper site | See CLI prompt Phase 1 — use jic-gw-leads as design reference |
| 10 | **Restore Program Launchpad multipage** | Single index.html replaced full site | See CLI prompt Phase 2 — restore intake-portal, onboarding-kit, operator-console |
| 11 | **Add 404.html + ENHANCEMENT-LOG.md to process** | Missing infrastructure markers | Create matching 404 page, write log of current state |
| 12 | **Arabic content** | Saudi market requires bilingual | Populate AR placeholders in all sites |
| 13 | **Competitive research (Mission 01)** | "Special sauce" UVP for 4 audiences | Research Saudi engineering training competitors → write `COMPETITIVE-RESEARCH.md` |
| 14 | **Set up automated backups** | Prevent future destruction | Configure restic or duplicity to backup `/srv/` and `/home/jicwashington/projects/` to MinIO daily |
| 15 | **Cron job for health checks** | Proactive monitoring vs reactive | Add cron to run deploy.sh verification weekly, email/alert on failures |

### Medium Term (This Month)

| # | Task | Why | How |
|---|------|-----|-----|
| 16 | **Agent health monitoring** | Know when a subagent dies mid-task | Build a lightweight heartbeat system — agents write to a status file every 5 min |
| 17 | **Automated agent spawning** | Dali says "launch X" → machine spawns 4 agents automatically | Script that reads mission template → calls OpenClaw subagent API → tracks STATE.md |
| 18 | **Email integration** | Send outbound messages from the machine | Configure SMTP or Postmark/SendGrid in ActivePieces → connect to templates |
| 19 | **SSL monitoring** | Caddy auto-renews but good to track | Add cert expiry check to Uptime Kuma or custom script |
| 20 | **Cost monitoring** | VPS cost tracking, alert if unexpected | Set up billing alerts with provider, track in dashboard |

---

## 📁 REPOSITORY MAP

| Repo | GitHub URL | What It Contains | Last Commit |
|------|-----------|------------------|-------------|
| `dali-mission-control` | `github.com/siyaida/dali-mission-control` | Mission 01 dashboard, JIC landing, SiyadaTech, process docs | `NORTH_STAR.md v1.2` |
| `program-launchpad` | `github.com/siyaida/program-launchpad` | Mission 02 infrastructure, deploy.sh, Caddyfile, tenant engine | `deploy.sh v2` |

**GitHub Token:** Available in environment as `GITHUB_TOKEN` (used by agents for push).

---

## 🔐 SSH ACCESS

| Key | Path | User | Host |
|-----|------|------|------|
| VPS Key | `/root/.openclaw/workspace/.ssh/vps_key` | `jicwashington` | `62.171.171.112` |

**Connection:**
```bash
ssh -i /root/.openclaw/workspace/.ssh/vps_key jicwashington@62.171.171.112
```

**On the VPS, important directories:**
```
/home/jicwashington/projects/          # Canonical source for all sites
/home/jicwashington/projects/dali-mission-control/
/home/jicwashington/projects/program-launchpad/
/home/jicwashington/projects/jic-marketing-website/   # DESTROYED — needs restore
/home/jicwashington/projects/jic-gw-leads-website/    # SAFE — enhancement-pass
/home/jicwashington/projects/jic-gw-ecosystem-website/ # SAFE — enhancement-pass
/home/jicwashington/projects/process/                 # Content OK, needs 404+log
/home/jicwashington/projects/siyadatech/              # SAFE
/home/jicwashington/projects/build-story/             # SAFE
/srv/                                                  # LIVE web root (Caddy serves from here)
```

---

## 🚨 CRITICAL INCIDENT LOG

### 2026-05-10 — The Destruction
**What happened:** An agent (JIC Washington) deployed sites using `deploy.sh` without running the preservation checklist. This overwrote enhanced multipage sites with single-file placeholders.

**Sites affected:**
- `jic-marketing-website` — Multipage → Single Astro build
- `program-launchpad` — Multipage with intake-portal, onboarding-kit, operator-console → Single index.html
- `process` — Missing `404.html` and `ENHANCEMENT-LOG.md`

**Sites preserved (safe):**
- `jic-gw-leads-website` — Full multipage with ENHANCEMENT-LOG.md + DESIGN-SYSTEM.md
- `jic-gw-ecosystem-website` — Full multipage with ENHANCEMENT-LOG.md + DESIGN-SYSTEM.md
- `siyadatech` — Single page but complete with log
- `build-story` — Single page but complete with log

**Resolution path:** CLI restoration prompt provided to Dali. Two safe sites serve as design system references.

**Prevention:**
1. Always run preservation checklist before deploying
2. Always backup before overwriting
3. Always verify after deploy (check for 404.html, ENHANCEMENT-LOG.md)
4. Never deploy to `/srv/` without checking `/projects/` first

---

## 🎯 HOW THE MACHINE WORKS

**The Flywheel:**
```
Human drops mission idea
    ↓
Mission 03 spawns 4 parallel agents (research, content, outreach, ops)
    ↓
Mission 02 scaffolds tenant + intake + i18n
    ↓
Mission 01 pattern generates employers + templates + battle card
    ↓
All write to STATE.md
    ↓
48-hour rule: counter-ready from idea to live
    ↓
Deploy via deploy.sh → all sites updated
    ↓
Insights feed back into next sprint
```

**48-Hour Rule:** Every new mission must be counter-ready within 48 hours:
- ✅ Live landing page
- ✅ Working intake form
- ✅ First 10 employer contacts identified
- ✅ 3 message templates ready
- ✅ STATE.md updated with sprint plan

**North Star:**
> Every insight becomes a deployed asset. Every deployed asset becomes a conversation. Every conversation becomes a closed outcome.

---

## 🛠️ DEPLOYMENT

**One-command deploy:**
```bash
cd /root/.openclaw/workspace/program-launchpad/infra/vps
./deploy.sh all
```

**Deploy specific site:**
```bash
./deploy.sh dashboard    # dali-mission-control
./deploy.sh jic          # jic-marketing-website
./deploy.sh leads        # jic-gw-leads-website
./deploy.sh ecosystem    # jic-gw-ecosystem-website
./deploy.sh launchpad    # program-launchpad
./deploy.sh process      # process website
./deploy.sh siyadatech   # siyadatech
./deploy.sh buildstory   # build-story
```

**What deploy.sh does:**
1. Syncs files from local repo to VPS temp via rsync
2. sudo moves from temp to `/home/jicwashington/projects/[site]`
3. Reloads Caddy container

**Caddyfile location:**
- Local: `/root/.openclaw/workspace/program-launchpad/infra/vps/Caddyfile`
- VPS: `/home/jicwashington/projects/program-launchpad/infra/vps/Caddyfile` (bind-mounted to container)

---

## 📊 OPERATING PRINCIPLES

1. **VPS-Only Hosting** — No Netlify, no external static hosts. One VPS serves everything via Caddy.
2. **OSS-First** — Everything is MIT licensed, portable, forkable.
3. **Bilingual by Default** — Every public artifact has EN+AR scaffolding.
4. **Saudi-Context Native** — Not translated. Born in the context.
5. **Human-in-the-Loop** — Agents execute, Dali decides.
6. **Deploy Beats Perfect** — Live and flawed beats theoretical and polished.
7. **STATE.md Is the Dashboard** — If it's not in STATE.md, it didn't happen.
8. **One VPS, Infinite Subdomains** — Scale horizontally without multiplying infrastructure cost.

---

## 📞 WHO TO ASK

| Person | Role | What They Know |
|--------|------|----------------|
| **Dali** | Owner/Operator | Business goals, Saudi market, final decisions |
| **JIC Washington** | AI Agent (me) | System architecture, deployment, content generation |
| **Ashref** (you) | Human Operator | Infrastructure, configuration, monitoring, restoration |

**Communication style with Dali:** Kinetic, imperative, sparse. Uses "yallah," "ship like that's true," single-word confirmations ("READY ✅"). Expects immediate execution, no ceremony.

---

## ✅ YOUR FIRST 48 HOURS

### Day 1 (First 6 hours)
1. ✅ Read this entire document
2. ✅ SSH into VPS, run `docker ps`, verify all containers
3. ✅ Visit all 15 domains, confirm which ones respond
4. ✅ Check `status.siyada-cybersecurity.com` (Uptime Kuma) — configure monitors
5. 🔴 Fix ActivePieces (`docker logs vps-activepieces-1`)
6. 🔴 Add PostHog API key

### Day 1-2 (Next 18 hours)
7. ✅ Run CLI restoration for jic-marketing-website and program-launchpad
8. ✅ Add 404.html + ENHANCEMENT-LOG.md to process
9. ✅ Configure MinIO (buckets, access keys)
10. ✅ Onboard Twenty CRM (create workspace)
11. ✅ Onboard Chatwoot (create inbox, connect to JIC site)

### Day 2 (Remaining 24 hours)
12. ✅ Verify all restoration sites have enhancement markers
13. ✅ Run HTTP verification on all domains
14. ✅ Set up backup script (restic to MinIO)
15. ✅ Write your own notes in this file — what's working, what's broken, what's next

---

## 📝 NOTES FOR FUTURE ASHREF

_(Add your observations here as you work. This becomes living documentation.)_

- 
- 
- 

---

*Built by JIC Washington for Dali (siyaida) · 2026-05-10 · MIT Licensed*
