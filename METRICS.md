# METRICS.md

## North Star Metric

The North Star metric for StackAudit is:

**Qualified audits generated per week**

A “qualified audit” means:

* a completed audit,
* with realistic spend/team inputs,
* and an email capture attached.

I chose this instead of DAU or raw signups because StackAudit is not a social product or daily-use dashboard. Most startups only rethink AI infrastructure spending occasionally, especially when costs spike or teams scale. The real value of the product is whether it successfully identifies meaningful optimization opportunities and converts interested users into high-intent leads.

This metric directly aligns both user value and business value. If users are getting useful audits, and enough of them are willing to leave contact information afterward, the product is working.

---

## Input Metrics

### 1. Audit Completion Rate

Percentage of visitors who successfully complete the audit flow.

This measures:

* landing page clarity,
* trust,
* onboarding friction,
* and form UX quality.

If users abandon early, the core funnel is broken regardless of traffic volume.

---

### 2. Lead Capture Rate After Results

Percentage of completed audits that convert into email captures.

This is one of the strongest indicators of perceived value. Since the email gate only appears after delivering value, a high conversion rate means users genuinely found the report useful enough to keep engaging.

---

### 3. Average Estimated Savings Per Audit

This measures whether the audit engine is surfacing meaningful opportunities instead of generic outputs.

If savings numbers are consistently tiny or unrealistic, the product loses credibility and shareability. Good savings estimates create screenshots, conversations, and referrals.

---

## What I’d Instrument First

The first analytics events I would instrument are:

* landing page CTA clicks,
* audit started,
* audit completed,
* lead submitted,
* share link copied,
* and result page revisits.

I would also track drop-off points inside the audit flow to identify friction in the form experience.

The most important early funnel is:

Visitor → Audit Started → Audit Completed → Lead Captured → Shared

Understanding where users leave this funnel would guide nearly every product decision.

---

## What Number Triggers a Pivot Decision

If fewer than 15% of completed audits convert into leads after a meaningful traffic sample, I would strongly reconsider the product positioning or perceived value.

That would likely mean one of three things:

* the audit insights are not compelling enough,
* the savings estimates are not trusted,
* or the audience being targeted is wrong.

At that point I would either narrow the ICP toward engineering managers and startup founders specifically, or reposition the product from “AI savings calculator” into a broader AI infrastructure benchmarking tool with stronger reporting and analytics features.
