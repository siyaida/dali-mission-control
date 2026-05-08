# PORTABILITY.md — JIC × GW Engineering Management

**Proof every component survives Kimi disappearing tomorrow.**

---

## Philosophy

Every artifact in this mission is designed with **exit in mind**. Not because we're planning to leave — but because portable systems are robust systems. If Kimi, OpenClaw, GitHub, or any single vendor vanishes, JIC keeps running.

---

## Repository Structure

```
dali-mission-control/
├── missions/jic-gw-engineering-management/
│   ├── landing/              # Astro source + built static files
│   ├── demo/                 # Demo tour (static HTML)
│   ├── crm-schema/           # EspoCRM + Twenty schemas (JSON/CSV)
│   ├── n8n-workflows/        # Workflow JSONs (importable anywhere)
│   ├── ad-creative/          # Creative briefs + assets (Markdown + images)
│   ├── docs/                 # Documentation (Markdown)
│   ├── battle-card.md        # Value prop (Markdown)
│   ├── anchor-employers.*    # Data (CSV + Markdown)
│   ├── objection-playbook.md # Sales enablement (Markdown)
│   ├── message-templates.md  # Templates (Markdown)
│   ├── info-session-script.md# Script + storyboards (Markdown)
│   ├── mou-template.md       # MOU template (Markdown)
│   ├── lead-magnet-outline.md# Content outline (Markdown)
│   ├── DEPLOY.md             # Deployment guide
│   ├── PORTABILITY.md        # This file
│   └── STATE.md              # Live mission status
```

---

## By Component

### 1. Landing Page

| Aspect | Portability Proof |
|--------|-------------------|
| Source | Astro + Tailwind — open source, builds on any Node.js machine |
| Output | Static HTML/CSS/JS — serves from any web server (Nginx, Apache, S3, GitHub Pages, Netlify, Vercel) |
| Dependencies | Zero runtime dependencies — no database, no API, no server required |
| Data | All copy is in source files — no CMS lock-in |
| Migration | `git clone` → `npm install` → `npm run build` → deploy `dist/` anywhere |

### 2. CRM Schema

| Aspect | Portability Proof |
|--------|-------------------|
| EspoCRM | Self-hosted PHP + MySQL — runs on any LAMP stack, data exportable as SQL/CSV/XML |
| Twenty | Dockerized Node.js + Postgres — runs anywhere Docker runs, API-first |
| Schema | Defined in JSON/CSV — importable into any CRM with mapping |
| Data | Lead data stored in your database — you own it, not a SaaS |
| Alternative | Can migrate to SuiteCRM, Odoo, or custom solution using same schema files |

### 3. n8n Workflows

| Aspect | Portability Proof |
|--------|-------------------|
| Format | Pure JSON — import into any n8n instance (self-hosted or managed) |
| Logic | Node-based, no custom code — visual migration possible |
| Credentials | Stored locally in `~/.n8n` — not in a vendor cloud |
| Alternative | Can rebuild in Node-RED, Huginn, or custom scripts using the JSON as reference |

### 4. Message Templates

| Aspect | Portability Proof |
|--------|-------------------|
| Format | Markdown — readable in any text editor, parseable by any script |
| Variables | Standard `{{mustache}}` syntax — works with any templating engine |
| Channels | Email, WhatsApp, LinkedIn — all use text-based formats |
| Migration | Copy-paste into Mailchimp, HubSpot, or any other platform |

### 5. Analytics

| Aspect | Portability Proof |
|--------|-------------------|
| Plausible | Self-hosted Go + ClickHouse — lightweight, data stays local |
| PostHog | Self-hosted or managed — event data exportable as JSON/CSV |
| Metabase | Self-hosted Java — connects to any SQL database |
| Alternative | All data exportable to Google Data Studio, Tableau, or Excel |

### 6. Document Templates (MOU, Battle Card, etc.)

| Aspect | Portability Proof |
|--------|-------------------|
| Format | Markdown + JSON — human-readable, future-proof |
| MOU | Can be rendered to PDF via Pandoc, WeasyPrint, or Documenso |
| Signatures | Documenso is open source — self-hostable, API-driven |
| Alternative | Any Markdown editor, any PDF generator |

---

## Vendor Independence Matrix

| Vendor | What We Use | If They Disappear |
|--------|-------------|-------------------|
| **Kimi / OpenClaw** | Agent execution | All code/docs live in GitHub — zero dependency on continued access |
| **GitHub** | Repo + Pages | `git clone` to GitLab, Gitea, or bare repo — all history preserved |
| **Astro** | Landing page builder | Static output needs no Astro — just HTML/CSS/JS files |
| **Tailwind** | Styling | Compiled CSS is vendor-free — no runtime Tailwind needed |
| **EspoCRM** | CRM | Self-hosted PHP — runs forever on your server |
| **Twenty** | CRM alternative | Docker-based — migrate data via API or SQL export |
| **n8n** | Automation | JSON workflows importable into new n8n instance in minutes |
| **Plausible** | Analytics | Self-hosted — data is yours, no vendor lock-in |
| **Cal.com** | Scheduling | Self-hostable or replace with any CalDAV-based scheduler |
| **Documenso** | E-signatures | Self-hostable or export to any PDF signing tool |
| **Formbricks** | Forms | Self-hostable, data exportable as CSV/JSON |

---

## The 5-Minute Migration Test

To prove portability, perform this test quarterly:

1. **Clone repo to new machine**
   ```bash
   git clone https://github.com/siyaida/dali-mission-control.git
   ```

2. **Build landing page**
   ```bash
   cd missions/jic-gw-engineering-management/landing
   npm install && npm run build
   # Verify dist/ folder exists with HTML/CSS/JS
   ```

3. **Import CRM schema**
   ```bash
   # In EspoCRM: Settings → Import → espo-schema.json
   # Verify fields, layouts, and sample data appear correctly
   ```

4. **Import n8n workflow**
   ```bash
   # In n8n: Settings → Import → workflow-enrichment-crm.json
   # Verify nodes and connections appear
   ```

5. **Read any Markdown file**
   ```bash
   cat battle-card.md
   # Should be fully readable and actionable without any software
   ```

**If all 5 steps pass, the system is portable.**

---

## Long-Term Preservation

- **Git history** preserves every version of every file
- **Markdown** is human-readable in 50 years (unlike proprietary formats)
- **Static HTML** will render in any browser, forever
- **JSON/CSV** are universal data formats — importable into any future tool
- **Docker** containers encapsulate entire environments — freeze and rerun

---

## Emergency Contacts (Post-Kimi)

If Kimi/OpenClaw becomes unavailable:

1. All files are in the GitHub repo — accessible via web UI or git CLI
2. Dali (siyaida) has full admin access to the repo
3. Any developer can clone and continue work
4. All documentation is in Markdown — no specialized knowledge required

---

*This system is designed to outlast every vendor. Including us.*
