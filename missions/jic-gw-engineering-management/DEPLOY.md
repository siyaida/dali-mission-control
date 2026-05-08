# DEPLOY.md — JIC × GW Engineering Management

**Deploy any component in < 30 minutes.**

---

## Prerequisites

- Linux VPS (Ubuntu 22.04+ recommended) with 4GB RAM, 2 vCPU
- Docker + Docker Compose installed
- Domain name + DNS A record pointing to VPS
- GitHub account (for repo access)

---

## Quick Start — Full Stack

### 1. Clone the Repo

```bash
git clone https://github.com/siyaida/dali-mission-control.git
cd dali-mission-control/missions/jic-gw-engineering-management
```

### 2. Landing Page (Static)

The landing page is pre-built static HTML in `landing/dist/`.

**Option A: GitHub Pages (free, fastest)**
- Already configured at `https://siyaida.github.io/dali-mission-control/missions/jic-gw-engineering-management/landing/`
- Push updates to `main` branch, Pages rebuilds automatically

**Option B: Self-hosted (Nginx)**
```bash
# Copy dist to web root
sudo cp -r landing/dist/* /var/www/html/

# Or use Docker Nginx
docker run -d -p 80:80 -v $(pwd)/landing/dist:/usr/share/nginx/html:ro nginx:alpine
```

**Option C: Cloudflare Pages / Netlify / Vercel**
- Connect repo, set build command: `cd landing && npm install && npm run build`
- Set output directory: `landing/dist`

### 3. CRM — EspoCRM

```bash
cd crm-schema/espo-docker
docker-compose up -d
```

- Access: `https://crm.yourdomain.com`
- Default login: admin / admin (change immediately)
- Import schema: Settings → Administration → Import → select `espo-schema.json`

### 4. CRM — Twenty (modern alternative)

```bash
cd crm-schema/twenty-docker
docker-compose up -d
```

- Access: `https://twenty.yourdomain.com`
- Modern UI, API-first, good for teams that want a sleek interface

### 5. n8n — Workflow Automation

```bash
cd n8n-workflows
docker run -d \
  --name n8n \
  -p 5678:5678 \
  -v $(pwd)/data:/home/node/.n8n \
  n8nio/n8n
```

- Access: `http://your-vps:5678`
- Import workflows: Settings → Import → select `workflow-*.json` files
- Configure credentials (WhatsApp, email, CRM API) before activating

### 6. Analytics — Plausible (self-hosted)

```bash
docker run -d \
  --name plausible \
  -p 8000:8000 \
  plausible/analytics
```

- Add tracking script to landing page `<head>`
- Or use managed Plausible (paid, zero maintenance)

### 7. Scheduling — Cal.com (self-hosted)

```bash
git clone https://github.com/calcom/cal.com.git
cd cal.com
docker-compose up -d
```

- Requires more resources (8GB RAM recommended)
- Alternative: Cal.com Pro account ($15/mo, no self-hosting)

---

## Component Reference

| Component | File/Folder | Deploy Time | Self-Host? | Alternative |
|-----------|-------------|-------------|------------|-------------|
| Landing Page | `landing/dist/` | 2 min | Optional | GitHub Pages, Netlify |
| CRM | `crm-schema/` | 10 min | Yes | Salesforce [CLOSED], HubSpot [CLOSED] |
| Workflows | `n8n-workflows/` | 10 min | Yes | Zapier [CLOSED], Make [CLOSED] |
| Analytics | Plausible | 5 min | Yes | Google Analytics [CLOSED] |
| Scheduling | Cal.com | 15 min | Yes | Calendly [CLOSED] |
| Email | Mailcoach/Postal | 15 min | Yes | Mailchimp [CLOSED] |
| WhatsApp | WAHA + Chatwoot | 15 min | Yes | Twilio [CLOSED] |
| Forms | Formbricks | 10 min | Yes | Typeform [CLOSED] |
| Ads | — | — | N/A | Google Ads, Meta, Snap, TikTok |

---

## Environment Variables

Create `.env` in each component folder:

```env
# Database
DB_HOST=localhost
DB_NAME=espo_crm
DB_USER=espo
DB_PASS=change_me

# n8n
N8N_BASIC_AUTH_ACTIVE=true
N8N_BASIC_AUTH_USER=admin
N8N_BASIC_AUTH_PASSWORD=change_me

# WhatsApp (WAHA)
WAHA_API_URL=http://localhost:3000

# Email (Postal)
POSTAL_API_KEY=change_me
POSTAL_BASE_URL=https://postal.yourdomain.com

# Cal.com
CAL_API_KEY=change_me
```

---

## Health Check

After deploy, verify:

```bash
# Landing page
curl -s -o /dev/null -w "%{http_code}" https://yourdomain.com
# Should return 200

# CRM
curl -s -o /dev/null -w "%{http_code}" https://crm.yourdomain.com/api/v1/Account
# Should return 401 (auth required = alive)

# n8n
curl -s -o /dev/null -w "%{http_code}" http://your-vps:5678/healthz
# Should return 200
```

---

## Backup

```bash
# Daily cron job
crontab -e
# Add: 0 2 * * * /path/to/backup.sh

# backup.sh contents:
docker exec espo-db pg_dump espo_crm > /backup/espo-$(date +%F).sql
tar czf /backup/n8n-$(date +%F).tar.gz ~/.n8n
git push origin main  # if configs changed
```

---

## Support

- Repo: https://github.com/siyaida/dali-mission-control
- Issues: https://github.com/siyaida/dali-mission-control/issues
- Blockers: https://github.com/siyaida/dali-mission-control/issues/1
