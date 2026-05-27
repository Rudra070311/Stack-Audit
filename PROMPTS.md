# AI Prompts Documentation

## Summary Generation Prompt

Used by `/api/ai-summary` endpoint to generate personalized audit summaries using Claude API.

### Prompt Template

hey, can u look on my project and ensure it does this. everything works and all. it should do allt his. ensure that pls
What you’re building
A free web app — call it whatever you want, naming is part of the test — that does this
end-toend:
1. A cold visitor lands on the page from a tweet, a blog post, or Hacker News
2. They input what AI tools they pay for, what plan, monthly spend, team size, and
primary use case
3. They get an instant on-screen audit: where they’re overspending, what to switch
to or downgrade, and total potential monthly + annual savings
4. They get an option to capture the report (email gate) and — for high-savings
cases — book a Credex consultation
5. The result is shareable via a unique public URL with proper Open Graph
previews
No login required to use the tool. Email is captured after value is shown, never before.
MVP features (all six required)
1. Spend input form
Support at minimum these tools as of submission week:
Cursor (Hobby / Pro / Business / Enterprise)
 GitHub Copilot (Individual / Business / Enterprise)
 Claude (Free / Pro / Max / Team / Enterprise / API direct)
 ChatGPT (Plus / Team / Enterprise / API direct)
 Anthropic API direct
 OpenAI API direct
 Gemini (Pro / Ultra / API)
 Windsurf or v0 — your pick of one more
For each tool: which plan, current monthly spend, number of seats. Plus team size and
primary use case (coding / writing / data / research / mixed). Form state must persist
across page reloads.
 CONFIDENTIAL
2. Audit engine
For each tool the user is on, the engine evaluates:
 Are they on the right plan for their usage? (e.g., Team for 2 users is overkill)
 Is there a cheaper plan from the same vendor that fits?
 Is there a substantially cheaper alternative tool with similar capability for their use
case?
 Are they paying retail when they could get the same thing through credits?
The logic must be defensible . A finance person should read your reasoning and agree.
Not “Cursor bad, Claude Code good” — actual usage-fit reasoning with numbers.
Pricing data must be current as of your submission week . Sources cited in
PRICING_DATA.md — every number must trace back to an official pricing page URL.
3. Audit results page
 Per-tool breakdown: current spend → recommended action → savings + 1-
sentence reason
 Hero: total monthly savings + total annual savings, big and clear
 For audits showing >$500/mo savings: surface Credex prominently as the way to
capture more of that savings
 For audits showing <$100/mo or already-optimal: be honest. “You’re spending
well.” Don’t manufacture savings. Still capture the lead with a “notify me when
new optimizations apply to your stack” signup
Visual quality matters. This is the page that gets screenshotted and shared.
4. AI-generated personalized summary
Use the Anthropic API (preferred — apply for free credits if you don’t have access) or
any LLM to generate a ~100-word personalized summary paragraph based on the audit.
Must handle API failures gracefully (fallback to a templated summary). Your full prompt
goes in PROMPTS.md .
This is the one feature where you must use AI. For the audit math itself, hardcoded
rules are correct — knowing when not to use AI is part of the test.
 CONFIDENTIAL
5. Lead capture + storage
 Email capture with optional fields: company name, role, team size
 Stored in a real backend: Supabase, Firebase, Cloudflare D1, your own Postgres
on Render — your call
 Sends a transactional email (Resend / Postmark / SES free tier) confirming the
audit and noting Credex will reach out for high-savings cases
 Basic abuse protection: rate limit, honeypot, or hCaptcha. Document your choice
and why.
6. Shareable result URL
Each audit gets a unique public URL
 Identifying details (company name, email) stripped from the public version. Tools
and savings numbers shown.
 Open Graph tags for clean link previews (Twitter card too)
 This is the viral loop — design accordingly
Bonus (only attempt after MVP works end-to-end)
PDF export of the full report
 Embeddable widget version ( <script> tag a blogger could drop in)
 Benchmark mode: “your AI spend per developer is $X — companies your size
average $Y”
 Referral codes — share the tool, both parties get a perk
 A short blog post or Twitter thread draft pitching the tool, written as if you were
launching it. 
w are using deepseek for audit gen. see .env.local. ok. pls work and make this project the best. ensure every component is linked and no file is of waste


### Reason

I used them so, just to ensure that all is present and this helps detect things that might be missed by human eyes or what I must have not seen/caught.