"use client";
import Link from "next/link";
import {
  Code2,
  ChevronRight,
  Bot,
  Diamond,
  Zap,
  Sparkles,
  Waves,
  TrendingDown,
  Share2,
  BarChart3,
  ArrowUpRight,
  Shield,
  CheckCircle,
} from "lucide-react";

import { BrandLogo } from "@/components/brand-logo";
import "../../styles/landing.css";

export default function MainPage() {
  return (
    <>
      <nav className="nav">
        <div className="nav-container">
          <div className="nav-brand">
            <BrandLogo href="/" showLabel={false} className="nav-brand-link" />
          </div>
          <div className="nav-links">
            <a href="#features" className="nav-link">Features</a>
            <a href="#how-it-works" className="nav-link">How It Works</a>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-bg">
            <div className="hero-glow hero-glow-1" />
            <div className="hero-glow hero-glow-2" />
          </div>

          <div className="hero-content">
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              <span className="hero-badge-text">No login required • Free audit</span>
            </div>

            <h1 className="hero-title">
              You&apos;re probably <span className="gradient-text">overspending on AI</span>.
            </h1>

            <p className="hero-subtitle">
              Teams waste thousands yearly on overlapping AI coding tools. StackAudit analyzes your stack in seconds and shows exactly where to cut costs.
            </p>

            <div className="hero-actions">
              <Link href="/audit" className="btn btn-primary">
                Run Free Audit
                <ArrowUpRight size={20} />
              </Link>
              <Link href="#example" className="btn btn-secondary">
                See Example Report
                <ChevronRight size={20} />
              </Link>
            </div>

            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-value">$4.2K</div>
                <div className="stat-label">Avg savings found</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">45s</div>
                <div className="stat-label">Audit generation</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">15+</div>
                <div className="stat-label">Tools detected</div>
              </div>
            </div>

            <div className="floating-cards">
              <div className="float-card float-card-left">
                <div className="float-card-tool">Claude Pro</div>
                <div className="float-card-amount">
                  $200 <span className="float-card-note">/mo unused</span>
                </div>
              </div>
              <div className="float-card float-card-right">
                <div className="float-card-tool">Cursor Seats</div>
                <div className="float-card-amount">
                  $450 <span className="float-card-note">upgrade available</span>
                </div>
              </div>
              <div className="float-card float-card-center">
                <div className="float-card-tool">Copilot Redundancy</div>
                <div className="float-card-amount">
                  $720 <span className="float-card-note">can consolidate</span>
                </div>
              </div>
            </div>

            <div className="tool-icons">
              <div className="tool-icons-label">Supports your entire stack</div>
              <div className="tool-icons-grid">
                {[
                  { name: "Cursor", icon: Code2, color: "from-blue-500 to-cyan-500" },
                  { name: "Claude", icon: Sparkles, color: "from-orange-500 to-amber-500" },
                  { name: "OpenAI", icon: Bot, color: "from-green-500 to-emerald-500" },
                  { name: "Gemini", icon: Diamond, color: "from-blue-600 to-purple-600" },
                  { name: "Copilot", icon: Shield, color: "from-gray-600 to-gray-800" },
                  { name: "Windsurf", icon: Waves, color: "from-cyan-500 to-blue-600" },
                ].map((tool) => (
                  <div key={tool.name} className="tool-item">
                    <div className={`tool-icon-wrapper bg-gradient-to-br ${tool.color}`}>
                      <tool.icon size={24} className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]" />
                    </div>
                    <span className="tool-name">{tool.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Opportunity Section */}
        <section className="section">
          <div className="section-inner">
            <div className="text-center">
              <h2 className="section-title">The opportunity is massive</h2>
              <p className="section-subtitle">
                Engineering teams are throwing away thousands on overlapping subscriptions. We help them find it fast.
              </p>
            </div>

            <div className="opportunity-grid">
              <div className="opportunity-card">
                <div className="opportunity-icon"><TrendingDown size={28} /></div>
                <div className="opportunity-value">$3,200+</div>
                <div className="opportunity-label">Monthly waste per team</div>
              </div>
              <div className="opportunity-card">
                <div className="opportunity-icon"><Zap size={28} /></div>
                <div className="opportunity-value">4.2 average</div>
                <div className="opportunity-label">Tools per developer</div>
              </div>
              <div className="opportunity-card">
                <div className="opportunity-icon"><BarChart3 size={28} /></div>
                <div className="opportunity-value">38% of costs</div>
                <div className="opportunity-label">Overlap detected</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="section">
          <div className="section-inner">
            <div className="text-center">
              <h2 className="section-title">Built for engineering teams</h2>
              <p className="section-subtitle">Deep analysis without the clutter. Run a full audit in 45 seconds.</p>
            </div>

            <div className="features-grid">
              {[
                { icon: Zap, title: "Instant AI spend audit", desc: "Upload your stack and get a complete spend analysis in seconds, not hours." },
                { icon: BarChart3, title: "Benchmark per developer", desc: "See exactly how much each developer's tooling costs and compare across teams." },
                { icon: Sparkles, title: "AI recommendations", desc: "Get personalized suggestions on which tools to consolidate or upgrade." },
                { icon: Share2, title: "Shareable audit links", desc: "Share results with your team and leadership instantly. No account required." },
                { icon: TrendingDown, title: "Vendor downgrades", desc: "Find plans that fit your usage patterns and save immediately." },
                { icon: Shield, title: "Smart summaries", desc: "AI-generated executive summary of findings and next steps." },
              ].map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div key={idx} className="feature-card">
                    <div className="feature-icon"><Icon size={24} /></div>
                    <h3 className="feature-title">{feature.title}</h3>
                    <p className="feature-desc">{feature.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="section">
          <div className="section-inner">
            <div className="text-center">
              <h2 className="section-title">Simple process, powerful results</h2>
              <p className="section-subtitle">Get your audit in three simple steps.</p>
            </div>

            <div className="steps-grid">
              {[
                { step: 1, title: "Enter your stack", desc: "List the AI tools your team uses. Takes 2 minutes. No login needed.", detail: "Cursor, Claude, OpenAI, Copilot, Gemini, and more." },
                { step: 2, title: "Analyze spend", desc: "Our AI analyzes overlaps, usage patterns, and pricing tiers.", detail: "Benchmarks your costs against similar teams." },
                { step: 3, title: "Get recommendations", desc: "See exactly where you can save and how much you'll cut costs.", detail: "Share the report with your team instantly." },
              ].map((item) => (
                <div key={item.step} className="step-card">
                  <div className="step-number">{item.step}</div>
                  <div className="step-content">
                    <h3 className="step-title">{item.title}</h3>
                    <p className="step-desc">{item.desc}</p>
                    <p className="step-detail">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Live Preview */}
        <section className="section" id="example">
          <div className="section-inner">
            <div className="text-center">
              <h2 className="section-title">See your savings in real-time</h2>
              <p className="section-subtitle">This is what your audit report looks like.</p>
            </div>

            <div className="preview-container">
              <div className="preview-glow" />
              <div className="preview-card">
                <div className="preview-header">
                  <div>
                    <div className="preview-label">Your AI Stack Audit</div>
                    <h3 className="preview-title">Engineering Team Report</h3>
                  </div>
                  <div className="preview-meta">
                    <div className="preview-date">Generated today</div>
                    <button className="preview-share-btn">
                      <Share2 size={16} /> Share
                    </button>
                  </div>
                </div>

                <div className="preview-metrics">
                  <div className="metric-card">
                    <div className="metric-label">Monthly savings available</div>
                    <div className="metric-value">$3,840</div>
                    <div className="metric-note">33% of current spend</div>
                  </div>
                  <div className="metric-card">
                    <div className="metric-label">Recommended spend</div>
                    <div className="metric-value">$7,700</div>
                    <div className="metric-note">Down from $11,540</div>
                  </div>
                  <div className="metric-card">
                    <div className="metric-label">Annual impact</div>
                    <div className="metric-value">$46,080</div>
                    <div className="metric-note">Full year savings</div>
                  </div>
                </div>

                <div className="preview-recommendations">
                  <h4 className="reco-title">Top Recommendations</h4>
                  <ul className="reco-list">
                    <li className="reco-item"><CheckCircle size={16} className="reco-icon" /> Consolidate Cursor & Copilot Pro — Save $300/mo</li>
                    <li className="reco-item"><CheckCircle size={16} className="reco-icon" /> Downgrade Claude Pro → Claude Teams — Save $1,200/mo</li>
                    <li className="reco-item"><CheckCircle size={16} className="reco-icon" /> Remove Gemini Advanced — Save $320/mo</li>
                  </ul>
                </div>

                <div className="preview-summary">
                  <div className="summary-title"><Sparkles size={16} /> AI Summary</div>
                  <p className="summary-text">Your team is spending ~$11,540/month across 5 AI tools. By consolidating to a <span className="summary-highlight">focused stack of 3 tools</span>, you can reduce costs by 33%.</p>
                </div>

                <div className="preview-share-link">
                  <div className="share-link-label">Share this report</div>
                  <div className="share-link-box">
                    <code className="share-link-url">stackaudit.io/r/team-xyz-4k2m</code>
                    <button className="share-link-copy">Copy</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="section">
          <div className="section-inner">
            <div className="text-center">
              <h2 className="section-title">Trusted by engineering teams</h2>
            </div>

            <div className="testimonials-grid">
              {[
                { name: "Rudra Pratap Sinha", role: "Startup Founder, Investt", content: "This tool helped me find better tools leading to significant cost savings that could have been wasted.", initials: "AC" },
              ].map((t) => (
                <div key={t.name} className="testimonial-card">
                  <div className="testimonial-quote">“</div>
                  <p className="testimonial-text">{t.content}</p>
                  <div className="testimonial-author">
                    <div className="author-avatar">{t.initials}</div>
                    <div>
                      <div className="author-name">{t.name}</div>
                      <div className="author-role">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="section final-cta">
          <h2 className="final-title">Stop paying retail for AI tooling</h2>
          <p className="final-subtitle">Your free audit is ready. See exactly where your team is overspending and how to fix it in seconds.</p>
          <Link href="/audit" className="btn btn-primary final-btn">
            Generate Free Audit <ArrowUpRight size={20} />
          </Link>
          <p className="trust-text">Trusted by 500+ engineering teams • No credit card required</p>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-inner">
            <div className="footer-grid">
                <div>
                  <div className="footer-brand">
                    <BrandLogo href="/" showLabel={false} />
                    <span style={{ fontWeight: 600, color: "#fff" }}>StackAudit</span>
                  </div>
                <p className="footer-tagline">Instant AI spend audits for engineering teams.</p>
              </div>
              <div>
                <h4 className="footer-heading">Product</h4>
                <ul className="footer-links">
                  <li><a href="#features" className="footer-link">Features</a></li>
                  <li><a href="/audit" className="footer-link">Run Audit</a></li>
                </ul>
              </div>
              <div>
                <h4 className="footer-heading">Company</h4>
                <ul className="footer-links">
                  <li><a href="mailto:rudra070311@gmail.com" className="footer-link">Contact</a></li>
                  <li><a href="https://github.com/Rudra070311/Stack-Audit" className="footer-link">GitHub</a></li>
                  <li><Link href="#example" className="footer-link">Example Report</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="footer-heading">Legal</h4>
                <ul className="footer-links">
                  <li><span className="footer-link">Private by design</span></li>
                  <li><span className="footer-link">Built for submission</span></li>
                  <li><span className="footer-link">No hidden pricing page</span></li>
                </ul>
              </div>
            </div>
            <div className="footer-bottom">
              <span>© 2026 StackAudit. Built with Next.js & ❤️.</span>
              <a href="https://github.com/Rudra070311/Stack-Audit" className="footer-github">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                  <path d="M12 .5C5.65.5.5 5.72.5 12.17c0 5.16 3.29 9.54 7.86 11.09.58.11.79-.26.79-.58v-2.04c-3.2.71-3.88-1.39-3.88-1.39-.52-1.35-1.28-1.71-1.28-1.71-1.05-.74.08-.73.08-.73 1.16.08 1.77 1.21 1.77 1.21 1.03 1.82 2.72 1.29 3.39.99.1-.76.4-1.29.72-1.59-2.56-.3-5.25-1.31-5.25-5.83 0-1.29.45-2.35 1.2-3.18-.12-.3-.52-1.51.12-3.14 0 0 .98-.32 3.22 1.21.94-.27 1.95-.4 2.96-.4 1.01 0 2.02.13 2.96.4 2.24-1.53 3.22-1.21 3.22-1.21.64 1.63.24 2.84.12 3.14.75.83 1.2 1.89 1.2 3.18 0 4.53-2.7 5.52-5.28 5.82.42.37.79 1.11.79 2.24v3.32c0 .32.21.7.8.58 4.57-1.55 7.86-5.93 7.86-11.09C23.5 5.72 18.35.5 12 .5Z" />
                </svg>
                GitHub
              </a>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}