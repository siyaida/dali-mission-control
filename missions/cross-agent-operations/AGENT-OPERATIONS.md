# AGENT-OPERATIONS.md — Daily Operations Playbook

> How an agent runs the Dali system day-to-day. Heartbeat, sprint flow, deploy verification, state updates.

---

## Daily Rhythm

An agent on active duty checks these in a single batched pass (no more than 4x per day):

| Check | Frequency | Action if Hot |
|-------|-----------|---------------|
| **Repo Sync** | Every session start | `git pull` — if behind, re-read STATE.md |
| **Blocker Status** | Every session start | If new blocker, report immediately |
| **Sprint Velocity** | Every 2-3 sessions | Update STATE.md progress, push commit |
| **Deploy Health** | Post-deploy only | Verify Netlify/GitHub Pages live, report URL |
| **Calendar** | 2x/day (morning + afternoon) | Upcoming events <2h → flag to human |

---

## Session Start Protocol (30 sec)

Every time you wake up (new session, new message, heartbeat trigger):

```
1. git pull
2. read STATE.md
3. read the active mission's STATE.md
4. check if any sprints changed status since last session
5. report only deltas
```

If nothing changed:
```
HEARTBEAT_OK — no deltas. Continuing {{current_sprint}}.
```

If something changed:
```
DELTA — {{sprint_name}} now {{new_status}}. {{one_line_impact}}.
```

---

## Sprint Execution Flow

### Phase 1: Lock (1 min)
- Read the sprint's goal from mission STATE.md
- Copy `AGENT-SPRINT-TEMPLATE.md` into a working scratchpad
- Fill: Goal, Input Artifacts, Success Criteria, Output Files
- Report: `Sprint #{{N}} locked — {{goal_summary}}`

### Phase 2: Execute (variable)
- Do the work. Use subagents for parallel tracks if needed.
- Write artifacts to the correct mission folder.
- Update the mission's STATE.md with `Status: 🟡 IN PROGRESS`
- Push commits as you go — do not hoard changes.

### Phase 3: Verify (2 min)
- Run the Verification Checklist from the sprint template
- If any check fails, fix it. Do not mark complete with known defects.
- Run deploy verification if the sprint has a web output.

### Phase 4: Ship (1 min)
- Update mission STATE.md: sprint status → 🟢 COMPLETE
- Update root STATE.md if mission phase changed
- Write commit message per `AGENT-SPRINT-TEMPLATE.md` format
- Push to GitHub
- Report: `SHIPPED ✅ — Sprint #{{N}}: {{deliverable_name}}`

### Phase 5: Pick Next (30 sec)
- Look at the sprint board. What's next?
- If next sprint is unblocked, lock it immediately. No idle time.
- Report: `Next: Sprint #{{N+1}} — {{goal_summary}}`

---

## Deploy Verification

Any sprint producing web output (landing page, dashboard, docs) must be verified:

```bash
# After push, verify Netlify/GitHub Pages
# Netlify:
curl -s -o /dev/null -w "%{http_code}" https://{{site}}.netlify.app/
# Should return 200

# GitHub Pages:
curl -s -o /dev/null -w "%{http_code}" https://siyaida.github.io/{{repo}}/
# Should return 200
```

If deploy fails:
1. Check `netlify.toml` or GitHub Pages settings
2. Check build logs (Netlify admin or GitHub Actions)
3. If it's a config issue → fix and re-push
4. If it's an infra issue (DNS, domain, quota) → flag as blocker

Deploy verification report:
```
DEPLOY ✅ — {{url}} — 200 OK — {{timestamp}}
```

---

## State Update Rules

### When to update STATE.md

| Event | Which STATE.md | What to Change |
|-------|--------------|----------------|
| Sprint starts | Mission STATE.md | Status → 🟡 IN PROGRESS |
| Sprint ships | Mission STATE.md | Status → 🟢 COMPLETE, add commit ref |
| Mission phase changes | Root STATE.md | Update status, progress %, active sprint count |
| Blocker discovered | Both | Add to Blockers section, create GitHub issue |
| Blocker resolved | Both | Mark resolved, close GitHub issue |
| New mission created | Root STATE.md | Add to missions table, set status BOOTSTRAP |

### STATE.md Hygiene

- **Never** leave a sprint IN PROGRESS for >24h without a note
- **Always** include a commit ref or file path for completed sprints
- **Always** timestamp the "Last Updated" line
- **Never** manually edit progress bars in docs/index.html — those update via commit-triggered automation or human edit

---

## Heartbeat Behavior

If you receive a heartbeat poll:

1. **Batch checks** — combine repo sync + calendar + any periodic checks into one pass
2. **Report deltas only** — no "everything looks fine" noise unless asked
3. **Respect quiet time** — 23:00-08:00 GMT+8, stay silent unless urgent
4. **Proactive work allowed** — memory maintenance, doc updates, git housekeeping
5. **Never** use heartbeats to start new missions or sprints without human signal

Heartbeat response format:
```
HEARTBEAT_OK — {{check_results}} — continuing {{current_task}}
```

Or if something needs attention:
```
HEARTBEAT → {{what_needs_attention}} — {{one_line_action}}
```

---

## Git Hygiene

- **Commit after every sprint ship** — not after every file save
- **Commit message format:** `🤖 Mission {{NN}} — Sprint #{{N}}: {{deliverable}}`
- **Push immediately** — do not let commits pile up locally
- **No WIP commits** — if it's not shippable, don't commit it
- **Atomic commits** — one sprint = one commit (or one logical change set)

---

## Tool Usage Notes

| Tool | When to Use | When NOT to Use |
|------|-------------|-----------------|
| `read` | First thing every session | Never assume you know a file's contents |
| `write` | Creating new artifacts, new STATE.md | Don't overwrite without confirming stale |
| `edit` | Surgical updates to existing files | Don't edit what you haven't read |
| `exec` | Git ops, deploy checks, file system | No destructive commands without ask |
| `web_fetch` | Research, verification, docs | Don't use for what you already know |
| `message` | Only when human asks to send | Never initiate external messages |
| Subagents | Parallel tracks, heavy research | Overhead not worth it for <30 min tasks |

---

## Emergency Protocols

### If the repo is behind
```bash
git stash && git pull && git stash pop
# If conflict, resolve manually. If unresolvable, ask human.
```

### If GitHub token is expired
```
BLOCKER — GitHub token expired. Cannot push. Need human refresh.
```

### If OpenClaw tools are down
```
BLOCKER — Tool {{name}} unavailable. Runtime failure. Need human check.
```

### If Dali sends an interrupt mid-sprint
1. Pause current sprint (note progress in STATE.md)
2. Handle the interrupt
3. Return to sprint immediately after
4. Report: `Resumed Sprint #{{N}} — was at {{checkpoint}}, continuing now`

---

*Last updated: 2026-05-09 05:07 UTC — Mission 03 Sprint #1*
