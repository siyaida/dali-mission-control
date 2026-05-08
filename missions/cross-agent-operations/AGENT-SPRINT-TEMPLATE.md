# AGENT-SPRINT-TEMPLATE.md — Standardized Sprint Template

> Copy this template at the start of every sprint. Fill it in. Execute against it. Ship against it.

---

## Sprint Metadata

```yaml
Mission: "Mission NN — {{mission_name}}"
Sprint: "#{{N}}"
Title: "{{short_deliverable_name}}"
Status: BOOTSTRAP → IN_PROGRESS → COMPLETE
Owner: "Main" or "Sub-agent"
Estimated: "{{hours}}h"
Started: "YYYY-MM-DD HH:MM UTC"
Shipped: "YYYY-MM-DD HH:MM UTC"
```

---

## 1. Goal

> One sentence. What does shipped look like?

**Example:** *Create a bilingual (EN+AR) Battle Card with value props, personas, and competitive positioning for GW MS Engineering Management via JIC.*

**This sprint's goal:**
```
{{your_goal_here}}
```

---

## 2. Input Artifacts

> What do you need to start? Files, URLs, data, templates, prior sprints.

| Artifact | Location | Status |
|----------|----------|--------|
| {{name}} | {{path_or_url}} | ✅ Ready / 🔴 Missing |
| {{name}} | {{path_or_url}} | ✅ Ready / 🔴 Missing |

**This sprint's inputs:**
```
- [ ] {{input_1}}
- [ ] {{input_2}}
- [ ] {{input_3}}
```

**Rule:** If any required input is 🔴 Missing, this sprint is BLOCKED. Do not proceed.

---

## 3. Success Criteria

> How do you know it's done? Be specific. Avoid "good enough."

**This sprint's criteria:**
```
- [ ] {{criterion_1 — measurable}}
- [ ] {{criterion_2 — measurable}}
- [ ] {{criterion_3 — measurable}}
- [ ] {{criterion_4 — measurable}}
```

**Good criteria examples:**
- "File exists at `missions/xx/artifact.md` and is >500 words"
- "Bilingual EN+AR with RTL markup verified"
- "Landing page scores >90 on Lighthouse Performance"
- "All {{N}} templates use {{placeholder}} syntax consistently"
- "Deploys to Netlify with 200 OK response"

**Bad criteria examples:**
- "Looks good"
- "Comprehensive"
- "High quality"

---

## 4. Output Files

> Where does the work land? Exact paths.

| Output | Path | Format |
|--------|------|--------|
| {{output_name}} | `missions/{{mission}}/{{path}}` | Markdown / HTML / JSON / CSV |
| {{output_name}} | `missions/{{mission}}/{{path}}` | Markdown / HTML / JSON / CSV |

**Rule:** Every output must be committed and pushed. No local-only artifacts.

---

## 5. Verification Checklist

> Run this before marking COMPLETE. Every box must be ticked.

**Pre-ship checks:**
```
- [ ] All success criteria met
- [ ] Files written to correct paths
- [ ] Files committed to git
- [ ] Root STATE.md updated (if mission phase changed)
- [ ] Mission STATE.md updated (sprint status, commit ref)
- [ ] Commit message follows format (see below)
- [ ] Pushed to GitHub successfully
- [ ] Deploy verified (if web output) — 200 OK
- [ ] No TODOs or FIXMEs left in shipped files
- [ ] No SAMPLE_DATA watermarks where real data should be
```

---

## 6. Commit Message Format

```
🤖 Mission {{NN}} — Sprint #{{N}}: {{deliverable_short_name}}

- {{what_changed_line_1}}
- {{what_changed_line_2}}
- {{what_changed_line_3}}

Files: {{paths}}
```

**Examples:**
```
🤖 Mission 01 — Sprint #2: Top-50 Anchor Employers

- Added 50 employer profiles across 5 Saudi regions
- Tagged by confidence (A/B/C) and sector
- Includes HR contact research notes (public sources)

Files: missions/jic-gw-engineering-management/anchor-employers.md
```

```
🤖 Mission 03 — Sprint #1: Cross-Agent Operations Infrastructure

- 7 operational docs for agent boot, ops, sprints, blockers, comms, health
- Added Mission 03 card to docs/index.html
- Updated root STATE.md with all 3 missions tracked

Files: missions/cross-agent-operations/*, docs/index.html, STATE.md
```

---

## Sprint Notes (Working Scratchpad)

> Use this section for running notes during execution. Delete or archive after ship.

```
{{freeform_notes_during_sprint}}
```

---

## Post-Ship Retrospective (fill after ship)

> One line. What worked, what didn't, what to repeat.

```
{{retrospective}}
```

---

*Template version: 1.0 — Mission 03 Sprint #1*
