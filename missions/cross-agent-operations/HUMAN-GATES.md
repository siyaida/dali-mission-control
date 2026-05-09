# HUMAN-GATES.md — When Human Input Is Required

> The agent operates autonomously. These are the ONLY gates where human decision is mandatory.

---

## 🚪 GATE 1: Consultation Booking (NURTURE → CONSULT)

**Trigger:** Lead score ≥ 70, engaged with 3+ touchpoints, Arabic or English form completed

**Agent Action:**
- Prepares lead dossier (company, role, pain points, budget signal)
- Suggests 3 Cal.com slots based on lead timezone
- Drafts pre-consult email in lead's language

**Human Decision:**
```
APPROVE → Book consultation, send confirmation
MODIFY → Change time slots, add notes, cc: someone
REJECT → Disqualify lead, document reason, send polite decline
PASS → Not ready yet, extend nurture sequence by 7 days
```

**Expected Output:**
- APPROVE: Cal.com booking link sent, calendar invite created
- REJECT: Lead archived with reason code
- PASS: Lead re-entered nurture with new sequence

---

## 🚪 GATE 2: Pricing / Discount Authority (CONSULT → CLOSE)

**Trigger:** Consultation completed, lead expresses interest, asks about pricing

**Agent Action:**
- Prepares standard pricing + any active promotions
- Calculates ROI case based on lead's profile
- Drafts proposal (bilingual)

**Human Decision:**
```
STANDARD → Send standard pricing, no discount
CUSTOM → Specify discount %, payment terms, bundle
B2B CORPORATE → Cohort pricing, company sponsorship terms
REJECT → Price objection too strong, send objection playbook
```

**Expected Output:**
- Pricing proposal sent
- If B2B: Corporate MOU template customized

---

## 🚪 GATE 3: Final Close (CLOSE)

**Trigger:** Lead accepts proposal, ready to sign

**Agent Action:**
- Prepares enrollment agreement / MOU
- Generates payment link
- Sets up student portal credentials

**Human Decision:**
```
APPROVE → Send final docs, process payment, enroll
CONDITIONAL → Payment plan, deferral, partial scholarship
REJECT → Lost deal, document why, schedule 30-day follow-up
```

**Expected Output:**
- APPROVE: Student enrolled, welcome sequence triggered, cohort assigned
- CONDITIONAL: Custom payment plan activated, deferred start date
- REJECT: Lost reason logged, competitor noted if mentioned

---

## 🚪 GATE 4: Blocker Resolution (Any Phase)

**Trigger:** Agent encounters true blocker (needs credentials, legal review, budget approval, etc.)

**Agent Action:**
- Creates GitHub issue with:
  - Blocker category (credential / legal / budget / technical)
  - Exact what's needed
  - Impact on sprint/mission timeline
  - Suggested resolution path

**Human Decision:**
```
PROVIDE → Give agent what it needs, resume sprint
DELEGATE → Assign to another human, agent pauses
OVERRIDE → Skip blocker with documented risk acceptance
DECLINE → Mission scope reduced, agent adjusts
```

**Expected Output:**
- GitHub issue updated with resolution
- Sprint resumes or is replanned

---

## 🚫 NOT GATES (Agent Handles Autonomously)

The agent does NOT ask human for:
- Content writing / copy editing
- Landing page design changes
- CRM data entry / cleanup
- Email template variants
- Workflow automation tweaks
- Analytics dashboard updates
- Routine deployment / config changes
- Competitor research
- A/B test setup
- SEO optimization

If the agent asks about any of these, tell it: **"That's your job. Ship it."**

---

## 📊 DECISION MATRIX

| Situation | Who Decides | Time Budget | Escalation Path |
|-----------|-------------|-------------|-----------------|
| Lead wants consult | Human | 24h | If no response, auto-book best slot |
| Lead asks for discount | Human | 48h | If no response, send standard pricing |
| Lead ready to enroll | Human | 24h | If no response, extend with urgency email |
| New blocker emerges | Human | 72h | If no response, agent proposes workaround |
| Lost deal (no response) | Agent | Auto | Archive with reason "No human decision" |

---

*Last updated: 2026-05-09 — Mission 03 Sprint #8*
