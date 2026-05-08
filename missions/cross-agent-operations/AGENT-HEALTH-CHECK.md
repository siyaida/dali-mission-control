# AGENT-HEALTH-CHECK.md — Self-Diagnostic Checklist

> Run this when something feels off, before escalating, or during routine maintenance. 5 minutes to know if you're healthy.

---

## Diagnostic Pass (5 min)

### 1. Token Status (30 sec)
```bash
# GitHub
curl -s -H "Authorization: token $GITHUB_TOKEN" \
  https://api.github.com/user | grep -q '"login"' \
  && echo "GITHUB_TOKEN ✅" || echo "GITHUB_TOKEN 🔴 EXPIRED"

# If any Feishu/WeCom tokens are in env, test them similarly
```

| Token | Check | Healthy If |
|-------|-------|------------|
| `GITHUB_TOKEN` | API user endpoint | Returns 200 with login field |
| Feishu OAuth | `feishu_get_user` tool | Returns user info without 401 |
| WeCom tokens | MCP preflight | Returns healthy status |

**If expired:** Blocker. Human must refresh.

---

### 2. Repo Sync Health (1 min)
```bash
cd /root/.openclaw/workspace/mission-repo
git fetch origin
LOCAL=$(git rev-parse HEAD)
REMOTE=$(git rev-parse origin/main 2>/dev/null || git rev-parse origin/master)
[ "$LOCAL" = "$REMOTE" ] && echo "SYNC ✅" || echo "SYNC 🔴 BEHIND — run git pull"
```

| State | Action |
|-------|--------|
| Sync ✅ | Continue |
| Behind 🔴 | `git pull`, re-read STATE.md, check for deltas |
| Ahead 🔴 (unpushed) | Push immediately. Do not let commits pile up. |
| Diverged 🔴 | Resolve manually. Prefer remote if unsure. Ask if conflict is complex. |

---

### 3. Deploy Health (1 min)
```bash
# Check all known deploy targets
URLS=(
  "https://dali-mission-control.netlify.app"
  "https://program-launchpad.netlify.app"
  "https://siyaida.github.io/dali-mission-control"
)
for url in "${URLS[@]}"; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "$url")
  [ "$code" = "200" ] && echo "$url ✅" || echo "$url 🔴 ($code)"
done
```

| Status | Action |
|--------|--------|
| 200 ✅ | Deploy healthy |
| 404/403 🔴 | Check if path changed. Update links if needed. |
| 500/502 🔴 | Netlify/GitHub infra issue. Wait 5 min, retry. Flag if persistent. |
| 000 🔴 | DNS or network issue. Check domain status. |

---

### 4. Sprint Velocity Tracking (1 min)

Check the active mission's STATE.md:

```bash
# Count completed vs total sprints
grep -c "🟢 COMPLETE" missions/*/STATE.md
# Compare against total sprints listed
```

| Metric | Calculation | Target |
|--------|-------------|--------|
| Sprint Completion Rate | COMPLETE / Total | >80% |
| Average Ship Time | (Shipped - Started) per sprint | <4h for research sprints, <2h for doc sprints |
| Blocker Rate | Blockers created / Sprints shipped | <20% |
| Human Interventions | Messages asking Dali for help / Total messages | <10% |

**If velocity drops:**
1. Check for hidden blockers (sprints stuck IN PROGRESS >24h)
2. Check for tool failures (recurring errors)
3. Check if sprint scope crept (success criteria got fuzzy)

---

### 5. File System Health (30 sec)
```bash
cd /root/.openclaw/workspace/mission-repo
# Check for uncommitted changes
git status --short
# Check for large files
git ls-files | xargs -I{} sh -c 'size=$(stat -f%z "{}" 2>/dev/null || stat -c%s "{}"); [ "$size" -gt 10485760 ] && echo "LARGE: {} ($size bytes)"'
# Check disk space
df -h . | tail -1
```

| Check | Healthy If |
|-------|------------|
| Uncommitted changes | 0 or only current sprint's files |
| Large files (>10MB) | 0 — if found, add to `.gitignore` or use Git LFS |
| Disk space | >20% free |

---

### 6. Memory File Health (30 sec)
```bash
# Check memory files exist and are recent
for f in SOUL.md USER.md STATE.md; do
  [ -f "$f" ] && echo "$f ✅" || echo "$f 🔴 MISSING"
done
# Check if STATE.md is stale (not updated in 24h)
find STATE.md -mtime +1 && echo "STATE.md 🔴 STALE (>24h)"
```

| File | Healthy If |
|------|------------|
| `SOUL.md` | Exists, readable, <30 days since last edit |
| `USER.md` | Exists, readable, has Dali's preferences |
| `STATE.md` | Exists, updated within 24h |
| `memory/` | Directory exists, has recent daily files |

---

## Health Report Format

When running a full diagnostic, report like this:

```
HEALTH CHECK — {{timestamp}}
Tokens: {{status}} | Repo: {{status}} | Deploy: {{status}}
Velocity: {{N}} sprints shipped, {{M}} active, {{P}}% completion
Blockers: {{count}} open — {{names}}
State: {{overall_status}}
```

Example:
```
HEALTH CHECK — 2026-05-09 06:00 UTC
Tokens: ✅ | Repo: ✅ | Deploy: ✅
Velocity: 12 shipped, 1 active, 92% completion
Blockers: 1 open — Mission 02 OAuth
State: HEALTHY 🟢
```

Or if issues found:
```
HEALTH CHECK — 2026-05-09 06:00 UTC
Tokens: ✅ | Repo: 🔴 behind 3 commits | Deploy: ✅
Velocity: 12 shipped, 1 active, 92% completion
Blockers: 1 open — Mission 02 OAuth
State: DEGRADED 🟡 — pulled latest, resuming
```

---

## Recovery Actions

| Symptom | Likely Cause | Fix |
|---------|--------------|-----|
| Repo behind | Human or other agent pushed | `git pull`, re-read STATE |
| Deploy 404 | Path changed or build failed | Check build logs, fix path, redeploy |
| Token 401 | Expired or revoked | Flag blocker, ask human for refresh |
| Disk full | Large files or logs | Clean `tmp/`, check for uncommitted large files |
| STATE.md stale | Agent didn't update after ship | Update now, commit, push |
| Sprint stuck >24h | Hidden blocker or scope creep | Re-read sprint goal, check blockers, ask if needed |

---

*Last updated: 2026-05-09 05:07 UTC — Mission 03 Sprint #1*
