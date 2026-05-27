1. The hardest bug I hit this week, and how I debugged it

The hardest bug this week was the AI summary pipeline failing silently while the API route itself was still returning a successful response. The frontend kept showing fallback summaries even though the AI integration looked correct at first glance. Initially I thought the issue was in the prompt formatting because the request body looked fine and the fetch call was not crashing.

I started debugging by checking whether the API route itself was failing, so I added logs at every stage. Then I tested the providers separately. I realized GitHub Models was failing because the endpoint and model naming were slightly wrong, while OpenRouter was failing because I had not actually configured the environment variables yet in .env.local.

At one point I also thought the JSON parsing was broken because the response shape between providers was slightly different. I logged the raw response and noticed one provider was returning an error payload instead of choices. That completely changed the debugging direction.

What finally fixed it was:

creating a proper provider abstraction,
adding provider-specific error handling,
checking response.ok,
logging raw API errors,
and adding fallback summaries so the app still worked even if AI generation failed.

That bug honestly taught me a lot about production reliability. A feature “working locally” means nothing if the failure path is terrible.

2. A decision I reversed mid-week, and what made me reverse it

Mid-week I originally decided to use a heavy UI component setup with shadcn everywhere because I thought it would make the app look more professional quickly. After implementing part of it, I realized I was spending too much time managing UI structure instead of building the actual product logic and user flow.

I reversed the decision and simplified the component system into custom Tailwind components. That ended up being much faster and honestly gave me more control over the final design. It also reduced dependency overhead and made the codebase easier to understand.

Another reason I reversed it was because this project is being judged more on thinking, architecture, and shipping quality rather than whether I used the trendiest UI setup. I realized I was optimizing for “looking advanced” instead of actually making progress.

The reversal sped up development a lot. Once I simplified the UI approach, I completed the audit flow, AI pipeline, backend routes, and results system much faster. That was probably one of the best decisions I made during the week.

3. What I would build in week 2 if I had it

If I had a second week, I would focus heavily on making StackAudit feel like a real launch-ready startup product rather than just an MVP with good engineering.

The first thing I would build is benchmark intelligence. I want users to see how their AI spend compares to similar teams by company size, role distribution, and use case. That would make the audits feel much more credible and data-driven.

I would also build deeper analytics and dashboards for returning companies. Right now the app gives a one-time audit, but week 2 could turn it into an ongoing AI spend monitoring platform.

Another big addition would be proper PDF exports with polished branded reports. A lot of engineering managers or founders would want to share these internally with finance teams.

I would also improve the viral loop. Right now shareable URLs exist, but I would add better Open Graph previews, referral systems, and public benchmark pages.

Finally, I would improve the audit engine itself with much more nuanced pricing logic, usage modeling, and edge cases. Right now it is strong for an MVP, but with another week I could make the recommendations much smarter and closer to what a real finance operations product would do.

4. How I used AI tools

I used AI tools very aggressively during development, but mostly as productivity multipliers rather than as decision makers. I used GitHub Copilot heavily for repetitive TypeScript boilerplate, component scaffolding, and Tailwind generation. I also used ChatGPT for architecture planning, debugging ideas, API integration help, and improving the structure of the audit engine.

One thing I did not trust AI with was pricing accuracy. For all pricing data, I manually verified values from official pricing pages because hallucinated pricing would completely damage the credibility of the project. I also did not trust AI-generated architecture blindly. I kept simplifying systems whenever they became unnecessarily complex.

One specific time AI was wrong was during the GitHub Models integration. The AI suggested a model name and endpoint combination that looked valid syntactically, but the API kept failing. I caught it by reading the actual provider documentation and comparing the expected response format. That debugging process made me realize AI-generated integration code often looks convincing even when it is subtly incorrect.

Overall, I treated AI like a very fast junior engineer. Extremely useful for speed, but still something I had to review critically.

5. Self-rating

Discipline: 8/10
I consistently worked across multiple days, maintained a devlog, and kept shipping even on shorter sessions instead of disappearing for days.

Code quality: 9/10
The architecture is clean and modular, but with more time I would refactor some repeated logic and improve testing coverage.

Design sense: 8/10
The product has a modern SaaS aesthetic and feels much more polished than a typical student project, though there is still room for refinement.

Problem-solving: 9/10
I think this was my strongest area because a lot of the project involved debugging infrastructure, simplifying decisions, and recovering from integration failures quickly.

Entrepreneurial thinking: 8.5/10
I tried to think beyond coding by focusing on user value, lead generation, credibility, pricing logic, and what would actually make founders use or share the product.