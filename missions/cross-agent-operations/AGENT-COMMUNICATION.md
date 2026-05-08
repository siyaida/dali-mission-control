# AGENT-BLOCKER-PROTOCOL.md — Blocker Identification & Escalation

> Not every friction is a blocker. Not every blocker needs a human. This doc tells you which is which.

---

## The Friction vs Blocker Test

Before escalating, ask these 3 questions:

| Question | If YES → | If NO → |
|----------|----------|---------|
| **Can I solve this with tools I have?** | Solve it. Not a blocker. | Continue to Q2 |
| **Can I solve this by searching/researching?** | Solve it. Not a blocker. | Continue to Q3 |
| **Does this require a decision, credential, or legal call only Dali can make?** | This is a **true blocker**. Escalate. | This is **friction**. Work around it or document it. |

**The rule:** If you can unstick yourself in <30 minutes of research/tool use, it's friction. If it requires Dali's authority, money, or legal liability, it's a blocker.

---

## Common Friction (Self-Solve)

| Friction | Self-Solve Path |
|----------|-----------------|
| Missing library / npm package | `npm install` or find alternative |
| Template syntax error | Fix it, test render, iterate |
| Markdown formatting off | Fix it. It's your job. |
| Can't find a specific company's HR email | Use general contact, mark `confidence: C`, move on |
| Netlify build fails on config | Read error, fix `netlify.toml`, re-push |
| Git merge conflict | Resolve manually, prefer incoming changes if yours is newer |
| Tool returns rate limit | Wait, retry with backoff, or use alternative tool |
| Research hits paywall | Use public sources, mark `SAMPLE_DATA`, document gap |

**Do not report friction to Dali.** Just solve it. He trusts you to handle the small stuff.

---

## True Blockers (Escalate to Human)

| Blocker Type | Example | Escalation Path |
|--------------|---------|-----------------|
| **Credential / Token** | GitHub token expired, API key missing, OAuth refresh needed | Immediate — human must provide |
| **Budget / Purchase** | Need paid tool, domain, hosting upgrade | Immediate — human decides |
| **Legal / Compliance** | GDPR question, contract terms, MOU signature | Immediate — human + legal |
| **Strategic Decision** | "Should we target Saudi Aramco directly?" | Flag in chat — human decides risk |
| **Vendor Lock-in** | Platform requires binding agreement | Flag — human evaluates alternatives |
| **Identity / Access** | Can't access Dali's calendar, email, or private data | Ask — may need re-auth |
| **Human-only Action** | Physical event, phone call, in-person meeting | Schedule — human must execute |
| **Cross-repo Dependency** | Mission 02 needs Mission 01 output that doesn't exist yet | Flag — may need reprioritization |

---

## Escalation Flow

```
Identify blocker
    ↓
Can I solve it in 30 min?
    → YES → Solve it. Do not report.
    → NO → Continue
    ↓
Does it need Dali's authority/credentials/money?
    → NO → Work around it. Document in sprint notes.
    → YES → This is a true blocker.
    ↓
Create GitHub Issue (see template below)
    ↓
Update STATE.md — Blockers section
    ↓
Report to Dali in next message:
        "BLOCKER — {{short_desc}} — Needs: {{what_you_need}} —
         Issue: {{github_issue_url}}"
    ↓
WAIT. Do not proceed past this blocker on this track.
    ↓
Dali resolves → Close issue → Update STATE.md → Resume sprint
```

---

## GitHub Issue Template

When creating a blocker issue, use this exact format:

**Title:** `🔑 [BLOCKER] Mission {{NN}} — {{short_description}}`

**Body:**
```markdown
## Blocker
{{clear_description}}

## Impact
- Sprint affected: #{{N}} — {{sprint_name}}
- Mission: {{mission_name}}
- Estimated delay if unresolved: {{time_estimate}}

## What I Tried
1. {{attempt_1}}
2. {{attempt_2}}
3. {{attempt_3}}

## What I Need From Human
- [ ] {{specific_ask_1}}
- [ ] {{specific_ask_2}}

## Urgency
- [ ] Critical — blocks all progress on this mission
- [ ] High — blocks this sprint, other sprints can continue
- [ ] Medium — workarounds exist but are suboptimal
- [ ] Low — nice to have, can proceed without
```

---

## When to Ask vs When to Act

### Ask Dali (Blocker)
- "Should I approach Saudi Aramco directly?" (strategic)
- "GitHub token expired — need refresh." (credential)
- "Need Documenso Pro for e-signatures — $29/mo." (budget)
- "Legal review needed on MOU template." (compliance)

### Act Without Asking (Friction)
- "npm install failed — used yarn instead." (tool choice)
- "Couldn't find direct email — used careers@. Marked C." (research gap)
- "Netlify build failed — fixed config, redeployed." (infra fix)
- "Added placeholder Arabic translation — will refine later." (iterative improvement)

### The 30-Minute Rule
If you've been stuck on something for 30 minutes and haven't found a path forward, it's either:
1. A research problem → use `web_fetch`, `kimi_search`, subagent for parallel research
2. A true blocker → escalate

The boundary is **time + autonomy**. If you have autonomy to solve it but it's taking too long, that's still friction — just hard friction. Keep working. Only escalate when autonomy runs out.

---

## Blocker Language

When reporting a blocker, use this exact format. Dali reads fast. Structure helps.

```
BLOCKER — {{mission}} Sprint #{{N}} — {{one_line_what}} — Needs: {{what_from_human}}
```

Example:
```
BLOCKER — Mission 02 Sprint #F — Activepieces OAuth requires
live Google Workspace admin consent — Needs: Dali to auth
or provide service account JSON.
```

When a blocker is resolved:
```
BLOCKER CLEARED — {{mission}} Sprint #{{N}} — {{what_changed}} — Resuming now.
```

---

*Last updated: 2026-05-09 05:07 UTC — Mission 03 Sprint #1*
