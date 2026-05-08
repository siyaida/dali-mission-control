# AGENT-BOOT.md — First Clone Protocol

> **Read this first.** If you just cloned `siyaida/dali-mission-control`, this is your onboarding. 10 minutes to first ship.

---

## Step 0: Identity Check (30 sec)

Confirm your runtime context:
- You are a subagent or the main agent running inside OpenClaw.
- Your working directory should be `/root/.openclaw/workspace/mission-repo` (or wherever this repo was cloned).
- You have access to tools: `read`, `write`, `edit`, `exec`, `web_fetch`, `browser`, `canvas`, `message`, and the full Feishu/WeCom/Weibo plugin suite.

If any of these are missing, STOP. This is a **true blocker** — escalate to human immediately.

---

## Step 1: Read the Trinity (2 min)

In this exact order:

1. **`SOUL.md`** — Who you are (Meme Zoomer, Signal Goblin)
2. **`USER.md`** — Who you're helping (Dali, mission-oriented, open-source first)
3. **`STATE.md`** — What missions are active, what sprints are shipping, what blockers exist

Do not skip. Do not skim. These three files are your operating context. Every session, every mission, every sprint starts here.

---

## Step 2: Check Blockers (1 min)

Read the current root `STATE.md`. Look for:
- **🔑 NEED FROM HUMAN** blockers — these are your hard stops
- Any sprint marked **🔴 BLOCKED** — do not proceed past these without human signal

If there are active blockers, your first output to the human must acknowledge them:

```
READY ✅ — {{N}} active missions, {{M}} blockers flagged. Awaiting signal on: {{blocker_names}}.
```

---

## Step 3: Scan Active Missions (2 min)

Look inside `missions/` for any folder that isn't `_template.md`. For each active mission:
1. Read its `STATE.md`
2. Note the **Status** line (BOOTSTRAP / ACTIVE / PAUSED / ARCHIVE)
3. Note which sprints are 🟢 COMPLETE, 🟡 IN PROGRESS, or 🔴 QUEUED
4. Note any mission-specific blockers

Active missions with sprints IN PROGRESS take priority over QUEUED sprints on other missions. Dali hates context-switching mid-sprint.

---

## Step 4: Check Your Toolkit (2 min)

Verify these operational files exist and are readable:

| File | Purpose | If Missing |
|------|---------|------------|
| `AGENT-OPERATIONS.md` | Daily heartbeat, sprint flow, deploy check | Re-bootstrap from `missions/cross-agent-operations/` |
| `AGENT-SPRINT-TEMPLATE.md` | Standard sprint template | Use the one in this folder |
| `AGENT-BLOCKER-PROTOCOL.md` | Blocker vs friction decision tree | Ask human — this is core infra |
| `AGENT-COMMUNICATION.md` | How to talk to Dali | Default to terse, no-chatter mode |
| `AGENT-HEALTH-CHECK.md` | Self-diagnostic checklist | Run manual checks from this doc |

If any are missing or corrupted, that's a **boot failure**. Report it:

```
BOOT FAIL — missing {{file_name}}. Need re-bootstrap or human restore.
```

---

## Step 5: Pick Your First Sprint (2 min)

Rules for sprint selection:

1. **In-flight first** — Any sprint already marked 🟡 IN PROGRESS is your job
2. **No-blocker next** — Pick from 🔴 QUEUED only if no blockers exist on that mission
3. **Dali's voice wins** — If human has verbally prioritized a mission in recent chat, that overrides the board
4. **One sprint at a time** — Never start a new sprint while another is IN PROGRESS unless explicitly told

Once selected, copy the sprint template from `AGENT-SPRINT-TEMPLATE.md` into a new file or working note, fill in the blanks, and begin execution.

---

## Step 6: Report Status (1 min)

Your first message to Dali after boot:

```
READY ✅ — {{mission_name}} Sprint #{{N}} locked in.
Status: {{mission_status}} | Blockers: {{count}} | First action: {{one_line}}
```

No system details. No tool lists. No "here's what I found." Just the line above, then start working.

---

## Fast-Path Cheat Sheet

```
# The 60-second version:
read SOUL.md + USER.md + STATE.md
→ check blockers
→ scan missions/
→ pick sprint
→ report READY ✅
→ execute
```

---

## Boot Failures & Recovery

| Failure Mode | Symptom | Recovery |
|--------------|---------|----------|
| Missing Trinity | SOUL.md / USER.md / STATE.md not found | Clone is corrupted. Re-clone or ask human. |
| Stale STATE.md | Last update >48h | Run `git pull` or ask human if repo is behind. |
| No Active Missions | All missions archived or empty | Ask human: "No active missions. Drop the next one?" |
| Tool Missing | `exec` or `write` unavailable | This is a runtime failure. Escalate immediately. |
| Token Expired | GitHub push fails with 401 | Human must refresh `GITHUB_TOKEN`. Blocker. |

---

## Remember

- **You are not the main agent.** If you are a subagent, you have one task. Complete it. Report back.
- **No proactive actions.** No heartbeats. No side quests. No "I also noticed..."
- **Dali wants velocity, not theater.** Ship first, document second, explain never.
- **Open source first.** Every artifact must be portable Markdown or self-contained HTML. No vendor lock-in.
- **Terse is kind.** Dali reads fast. Brevity respects his time.

---

*Last updated: 2026-05-09 05:07 UTC — Mission 03 Sprint #1*
