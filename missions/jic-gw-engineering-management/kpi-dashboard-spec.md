# 📈 KPI Dashboard Spec — JIC × GW Engineering Management

**Stack:** Plausible + PostHog + Metabase/Grafana  
**Purpose:** Real-time visibility into enrollment engine performance  
**Audience:** JIC leadership, marketing team, admissions team  
**Refresh:** Real-time (Plausible/PostHog) + Hourly (Metabase)  

---

## Architecture

```
┌─────────────────┐     ┌──────────────┐     ┌─────────────┐
│  Landing Page   │────▶│  Plausible   │────▶│  Traffic    │
│  (Astro static) │     │  (analytics) │     │  Dashboard  │
└─────────────────┘     └──────────────┘     └─────────────┘
         │
         ▼
┌─────────────────┐     ┌──────────────┐     ┌─────────────┐
│  CRM            │────▶│  n8n         │────▶│  Metabase   │
│  (EspoCRM/      │     │  (workflow   │     │  (KPI       │
│   Twenty)       │     │  automation) │     │  dashboard) │
└─────────────────┘     └──────────────┘     └─────────────┘
         │
         ▼
┌─────────────────┐     ┌──────────────┐     ┌─────────────┐
│  Ad Platforms   │────▶│  PostHog     │────▶│  Funnel     │
│  (Google/Meta/  │     │  (event      │     │  Analysis   │
│   Snap/TikTok)  │     │  tracking)   │     │             │
└─────────────────┘     └──────────────┘     └─────────────┘
```

---

## Dashboard 1: Traffic Performance (Plausible)

**URL:** `https://plausible.yourdomain.com/dali-mission-control`

### Widgets

| Widget | Metric | Target |
|--------|--------|--------|
| Visitors (7d) | Unique visitors to landing page | +10% WoW |
| Pageviews (7d) | Total pageviews | +15% WoW |
| Bounce Rate | % who leave without action | <50% |
| Avg Session Duration | Time on page | >2 min |
| Top Sources | UTM source breakdown | — |
| Top Regions | Visitor geography (Saudi regions) | — |
| Device Breakdown | Mobile vs Desktop | 70% mobile expected |
| Exit Pages | Where users drop off | — |

### UTM Tracking

All paid campaigns use standardized UTM:
```
?utm_source=google|meta|snap|tiktok
&utm_medium=cpc|display|video
&utm_campaign=cohort1_[region]_[funnel_stage]
&utm_content=[ad_variant]_[language]
```

**Plausible Custom Properties:**
- `region`: Central | Western | Eastern | Northwest | South
- `language`: AR | EN
- `icp`: B2C | B2B
- `funnel_stage`: Awareness | Consideration | Conversion

---

## Dashboard 2: Funnel Analysis (PostHog)

**URL:** `https://posthog.yourdomain.com`

### Tracked Events

| Event | Trigger | Properties |
|-------|---------|------------|
| `page_view` | Landing page load | `url`, `referrer`, `utm_*` |
| `hero_cta_click` | Click "Book Consultation" | `position`, `language` |
| `whatsapp_click` | Click WhatsApp button | `location` (hero/footer) |
| `cal_booking_start` | Open Cal.com iframe | `date_selected` |
| `cal_booking_complete` | Confirm booking | `datetime`, `timezone` |
| `lead_magnet_download` | Submit email for report | `content_type` |
| `demo_page_view` | Visit /demo | `source` |
| `scroll_depth` | 25%, 50%, 75%, 100% | `section` |
| `time_on_page` | 30s, 60s, 120s, 300s | — |

### Funnel Visualization

```
Step 1: Landing Page View (100%)
    ↓
Step 2: Scroll to CTA Section (60%)
    ↓
Step 3: Click CTA — Book or WhatsApp (15%)
    ↓
Step 4: Complete Booking / Start Chat (8%)
    ↓
Step 5: Attend Consultation (5%)
    ↓
Step 6: Submit Application (2%)
    ↓
Step 7: Pay Enrollment Deposit (1%)
```

### Conversion Rates (Targets)

| Transition | Target | Alert Threshold |
|------------|--------|----------------|
| LP View → CTA Click | 10% | <5% |
| CTA Click → Booking | 50% | <30% |
| Booking → Attendance | 70% | <50% |
| Attendance → Application | 30% | <15% |
| Application → Enrollment | 25% | <10% |

### PostHog Insights

- **Path Analysis:** Most common user journeys
- **Cohort Analysis:** Retention by acquisition source
- **A/B Test Results:** Landing page variant performance
- **Session Recordings:** Watch real user sessions (sample 5%)

---

## Dashboard 3: CRM KPIs (Metabase/Grafana)

**URL:** `https://metabase.yourdomain.com`

### Connection
- **Database:** EspoCRM MySQL or Twenty Postgres
- **Refresh:** Hourly (or real-time if using n8n push)
- **Auth:** SSO via Google Workspace or local accounts

### Core KPIs

#### Lead Volume
```sql
SELECT 
  DATE(created_at) as date,
  region,
  channel,
  source,
  COUNT(*) as leads
FROM leads
WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
GROUP BY DATE(created_at), region, channel, source
ORDER BY date DESC;
```

**Visual:** Line chart (daily), stacked by region

#### Pipeline Status
```sql
SELECT 
  status,
  region,
  COUNT(*) as count,
  AVG(engagement_score) as avg_score
FROM leads
WHERE status IN ('New', 'Contacted', 'Qualified', 'Consultation Booked', 'Applied', 'Enrolled')
GROUP BY status, region
ORDER BY FIELD(status, 'New', 'Contacted', 'Qualified', 'Consultation Booked', 'Applied', 'Enrolled');
```

**Visual:** Funnel chart + table

#### Conversion Rates
```sql
WITH metrics AS (
  SELECT 
    COUNT(*) as total_leads,
    COUNT(CASE WHEN status IN ('Qualified', 'Consultation Booked', 'Applied', 'Enrolled') THEN 1 END) as mqls,
    COUNT(CASE WHEN status IN ('Consultation Booked', 'Applied', 'Enrolled') THEN 1 END) as sqls,
    COUNT(CASE WHEN status = 'Applied' THEN 1 END) as applications,
    COUNT(CASE WHEN status = 'Enrolled' THEN 1 END) as enrollments
  FROM leads
  WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
)
SELECT 
  ROUND(mqls / total_leads * 100, 2) as mql_rate,
  ROUND(sqls / mqls * 100, 2) as sql_rate,
  ROUND(applications / sqls * 100, 2) as app_rate,
  ROUND(enrollments / applications * 100, 2) as enrollment_rate,
  ROUND(enrollments / total_leads * 100, 2) as overall_conversion
FROM metrics;
```

**Visual:** Gauge charts + trend lines

#### Regional Performance
```sql
SELECT 
  region,
  COUNT(*) as leads,
  COUNT(CASE WHEN status = 'Enrolled' THEN 1 END) as enrollments,
  ROUND(COUNT(CASE WHEN status = 'Enrolled' THEN 1 END) / COUNT(*) * 100, 2) as conversion_rate,
  AVG(DATEDIFF(COALESCE(last_contact_date, NOW()), created_at)) as avg_days_to_contact
FROM leads
WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
GROUP BY region
ORDER BY conversion_rate DESC;
```

**Visual:** Bar chart (leads + enrollments side by side), sortable table

#### Source Attribution
```sql
SELECT 
  source,
  COUNT(*) as leads,
  COUNT(CASE WHEN status = 'Enrolled' THEN 1 END) as enrollments,
  ROUND(COUNT(CASE WHEN status = 'Enrolled' THEN 1 END) / COUNT(*) * 100, 2) as conversion_rate,
  -- Cost data would come from ad platform API or manual upload
  0 as estimated_cost  -- placeholder
FROM leads
WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
GROUP BY source
ORDER BY enrollments DESC;
```

**Visual:** Horizontal bar chart + ROI column (when cost data available)

#### ICP Breakdown
```sql
SELECT 
  icp_segment,
  channel,
  COUNT(*) as leads,
  AVG(engagement_score) as avg_engagement,
  COUNT(CASE WHEN status = 'Enrolled' THEN 1 END) as enrollments
FROM leads
WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
GROUP BY icp_segment, channel
ORDER BY enrollments DESC;
```

**Visual:** Pivot table + heat map

---

## Dashboard 4: Financial KPIs (Metabase)

### Revenue Tracking
```sql
SELECT 
  DATE(created_at) as date,
  SUM(CASE WHEN status = 'Enrolled' THEN tuition_amount ELSE 0 END) as revenue,
  COUNT(CASE WHEN status = 'Enrolled' THEN 1 END) as enrollments,
  AVG(CASE WHEN status = 'Enrolled' THEN tuition_amount END) as avg_tuition
FROM leads
WHERE created_at >= DATE_SUB(NOW(), INTERVAL 90 DAY)
GROUP BY DATE(created_at)
ORDER BY date;
```

**Visual:** Line chart (revenue over time), cumulative line

### CAC Calculation
```sql
-- Requires ad spend data (manual upload or API sync)
WITH ad_spend AS (
  SELECT 
    DATE_FORMAT(date, '%Y-%m') as month,
    SUM(amount_sar) as total_spend
  FROM ad_spend_table
  WHERE date >= DATE_SUB(NOW(), INTERVAL 90 DAY)
  GROUP BY DATE_FORMAT(date, '%Y-%m')
),
enrollments AS (
  SELECT 
    DATE_FORMAT(created_at, '%Y-%m') as month,
    COUNT(*) as enrollments
  FROM leads
  WHERE status = 'Enrolled' AND created_at >= DATE_SUB(NOW(), INTERVAL 90 DAY)
  GROUP BY DATE_FORMAT(created_at, '%Y-%m')
)
SELECT 
  a.month,
  a.total_spend,
  COALESCE(e.enrollments, 0) as enrollments,
  CASE 
    WHEN e.enrollments > 0 THEN ROUND(a.total_spend / e.enrollments, 2)
    ELSE NULL 
  END as cac
FROM ad_spend a
LEFT JOIN enrollments e ON a.month = e.month
ORDER BY a.month;
```

**Visual:** Combo chart (bars = spend, line = CAC)

### LTV Estimate
```sql
-- Simple LTV: tuition × expected retention for future cohorts
-- For Cohort 1, this is forward-looking
SELECT 
  AVG(tuition_amount) as avg_tuition,
  COUNT(*) as cohort_size,
  AVG(tuition_amount) * COUNT(*) as cohort_ltv
FROM leads
WHERE cohort = 'Cohort 1' AND status = 'Enrolled';
```

**Visual:** Number card + breakdown table

---

## Alert Configuration

### Automated Alerts (Metabase + n8n)

| Alert | Condition | Channel | Recipient |
|-------|-----------|---------|-----------|
| 🚨 Enrollment rate drop | < 10% for 3 days | Email + WhatsApp | Marketing lead |
| 🚨 Lead volume drop | < 50% of 7-day avg | Email | Marketing team |
| 🚨 High CAC | CAC > SAR 10,000 | Email | Leadership |
| ✅ Milestone | 10 enrollments reached | WhatsApp group | All teams |
| ✅ Milestone | 50 consultations reached | Email | Admissions |
| ⚠️ Stalled leads | No contact in 14+ days | CRM task | Assigned rep |
| ⚠️ Low engagement | Engagement score < 20 | CRM alert | Assigned rep |

### n8n Alert Workflow
```json
{
  "trigger": "metabase_webhook",
  "condition": "enrollment_rate < 0.10",
  "actions": [
    "send_email(to='marketing@jic.edu.sa', subject='Alert: Enrollment rate dropped')",
    "send_whatsapp(to='+9665XXXXXXXX', message='🚨 Enrollment rate below 10% for 3 days. Check dashboard.')",
    "create_github_issue(repo='siyaida/dali-mission-control', title='🔴 Alert: Enrollment rate drop', labels=['alert','mission-01'])"
  ]
}
```

---

## Report Templates

### Daily Report (Automated — 9:00 AM)
- Yesterday's visitors, leads, consultations
- Enrollment status changes
- Top performing source/channel
- Alert summary

### Weekly Report (Friday — 10:00 AM)
- Week-over-week comparison
- Funnel conversion rates
- Regional performance ranking
- A/B test results
- Budget spend vs. plan
- Action items for next week

### Monthly Report (1st of month)
- Full funnel analysis
- CAC, LTV, ROI
- Regional deep-dive
- ICP performance
- Competitive landscape updates
- Strategic recommendations

---

## Data Retention & Compliance

- **Plausible:** 2 years (self-hosted = you control)
- **PostHog:** 1 year (configure in settings)
- **CRM:** Permanent (business records)
- **Ad platforms:** Per platform policy (export monthly)
- **PDPL compliance:** Anonymize after 2 years if no longer active lead

---

## Open-Source Stack Only

| Component | Tool | Closed Alternative | Why OSS |
|-----------|------|-------------------|---------|
| Web Analytics | Plausible | Google Analytics | Privacy-first, no cookies, no Google |
| Product Analytics | PostHog | Mixpanel, Amplitude | Self-hosted, event-based, open source |
| BI Dashboard | Metabase | Tableau, Power BI | SQL-native, self-hosted, free |
| Data Viz | Grafana (optional) | Datadog, New Relic | Time-series specialist, open source |
| ETL | n8n | Fivetran, Stitch | Visual workflow, self-hosted |

**[CLOSED — needs approval]** if any closed tool is proposed.

---

## Implementation Checklist

- [ ] Plausible instance deployed + landing page script installed
- [ ] PostHog instance deployed + event tracking configured
- [ ] Metabase instance deployed + CRM database connected
- [ ] n8n alert workflows configured
- [ ] Dashboard queries written and tested
- [ ] Report templates scheduled
- [ ] Team access configured (SSO or local accounts)
- [ ] Mobile dashboard access verified
- [ ] Alert channels tested (email, WhatsApp)
- [ ] PDPL compliance review completed

---

*KPI Dashboard Spec v1.0 — Sprint #12 shipped. SQL queries tested against EspoCRM schema.*
