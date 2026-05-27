"use client";

import Link from "next/link";
import { CheckCircle2, ArrowUpRight, Code } from "lucide-react";

export default function PricingPage() {
	return (
		<>
			{/* Navigation */}
			<nav className="sticky top-0 z-40 border-b border-zinc-800/20 bg-zinc-950/60 backdrop-blur-2xl">
				<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
					<div className="flex items-center gap-2.5 group cursor-pointer">
						<div className="w-9 h-9 bg-gradient-to-br from-blue-500 via-cyan-400 to-blue-400 rounded-xl flex items-center justify-center font-bold text-sm text-zinc-950 shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/60 transition-all duration-300 group-hover:scale-105">
							SA
						</div>
						<span className="font-bold text-base text-zinc-50 tracking-tight">StackAudit</span>
					</div>
					<div className="hidden md:flex items-center gap-10">
						<Link href="/" className="text-sm font-medium text-zinc-400 hover:text-cyan-300 transition-all duration-300 relative group">
							Home
							<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300"></span>
						</Link>
						<a href="/faq" className="text-sm font-medium text-zinc-400 hover:text-cyan-300 transition-all duration-300 relative group">
							FAQ
							<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300"></span>
						</a>
					</div>
				</div>
			</nav>

			<main className="bg-zinc-950">
				{/* Hero Section */}
				<section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-16 pb-20 border-b border-zinc-800/20">
					<div className="absolute inset-0 overflow-hidden pointer-events-none">
						<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl opacity-20 animate-glow-pulse"></div>
						<div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl opacity-20 animate-glow-pulse" style={{ animationDelay: "1s" }}></div>
					</div>

					<div className="relative z-10 max-w-4xl mx-auto text-center">
						<h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-tight">
							<span className="text-zinc-50">Simple, transparent </span>
							<span className="gradient-text">pricing</span>
						</h1>
						<p className="text-lg sm:text-xl text-zinc-400 mb-8 max-w-2xl mx-auto leading-relaxed font-medium">
							Start for free. Upgrade only when you need it. No surprises, no hidden fees.
						</p>
					</div>
				</section>

				{/* Pricing Cards */}
				<section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 border-b border-zinc-800/20">
					<div className="max-w-6xl mx-auto">
						<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
							{[
								{
									name: "Starter",
									price: "$0",
									period: "forever free",
									description: "Perfect for individuals and small teams",
									features: [
										"1 free audit per month",
										"Basic spend analysis",
										"Tool detection (15+ tools)",
										"Shareable reports",
										"Email support",
										"Up to 5 team members",
									],
									highlight: false,
									cta: "Get Started",
								},
								{
									name: "Professional",
									price: "$29",
									period: "per month",
									description: "For growing teams that want more",
									features: [
										"Unlimited audits",
										"Advanced analytics",
										"Per-developer breakdowns",
										"Historical tracking",
										"Team benchmarking",
										"Priority support",
										"Up to 50 team members",
										"Custom integrations",
										"API access",
									],
									highlight: true,
									cta: "Start Free Trial",
								},
								{
									name: "Enterprise",
									price: "Custom",
									period: "contact us",
									description: "For large organizations with custom needs",
									features: [
										"Everything in Professional",
										"Unlimited team members",
										"Single sign-on (SSO)",
										"Advanced security",
										"Dedicated support",
										"Custom contracts",
										"SLA guarantees",
										"White-label options",
									],
									highlight: false,
									cta: "Contact Sales",
								},
							].map((plan, idx) => (
								<div
									key={idx}
									className={`relative p-8 rounded-2xl border transition-all duration-300 group ${
										plan.highlight
											? "border-cyan-500/50 bg-gradient-to-br from-cyan-950/30 to-blue-950/30 ring-2 ring-cyan-500/30 shadow-2xl shadow-cyan-500/20 scale-105"
											: "border-zinc-800/60 bg-gradient-to-br from-zinc-900/60 to-zinc-800/30 hover:border-cyan-500/50 hover:bg-zinc-800/60 hover:shadow-lg hover:shadow-cyan-500/20"
									}`}
								>
									{plan.highlight && (
										<div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
											<span className="px-4 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-zinc-950 font-bold text-sm">
												Most Popular
											</span>
										</div>
									)}

									<div className="mb-8">
										<h3 className="text-2xl font-bold text-zinc-50 mb-2">{plan.name}</h3>
										<p className="text-sm text-zinc-400 mb-6">{plan.description}</p>
										<div className="mb-2">
											<span className="text-5xl font-bold text-zinc-50">{plan.price}</span>
											<span className="text-sm text-zinc-400 font-medium ml-2">{plan.period}</span>
										</div>
									</div>

									<button className={`w-full py-3 rounded-xl font-bold text-lg transition-all duration-300 mb-8 ${
										plan.highlight
											? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-400 hover:to-blue-400 hover:shadow-2xl hover:shadow-cyan-500/40 hover:scale-110 active:scale-95"
											: "border-2 border-zinc-700 text-zinc-100 hover:border-cyan-500/60 hover:text-cyan-300 hover:bg-zinc-900/50 hover:shadow-lg hover:shadow-cyan-500/20"
									}`}>
										{plan.cta}
									</button>

									<ul className="space-y-4">
										{plan.features.map((feature, fidx) => (
											<li key={fidx} className="flex items-start gap-3">
												<CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
												<span className="text-sm text-zinc-300 font-medium">{feature}</span>
											</li>
										))}
									</ul>
								</div>
							))}
						</div>

						{/* Billing Note */}
						<div className="max-w-2xl mx-auto text-center p-6 rounded-xl border border-zinc-800/60 bg-gradient-to-br from-zinc-900/60 to-zinc-800/30">
							<p className="text-sm text-zinc-400 font-medium">
								Annual billing available at{" "}
								<span className="text-cyan-300 font-bold">20% discount</span>. No credit card required to start.
							</p>
						</div>
					</div>
				</section>

				{/* FAQ Section */}
				<section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 border-b border-zinc-800/20">
					<div className="max-w-4xl mx-auto">
						<div className="text-center mb-16">
							<h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-50 mb-4">
								Pricing FAQ
							</h2>
							<p className="text-lg text-zinc-400 font-medium">
								Common questions about our plans and pricing.
							</p>
						</div>

						<div className="space-y-6">
							{[
								{
									q: "Can I try Professional for free?",
									a: "Yes! All Professional features come with a 14-day free trial. No credit card required.",
								},
								{
									q: "Do you offer discounts for annual billing?",
									a: "Yes, we offer 20% off when you pay annually. For Enterprise plans, we can customize billing arrangements.",
								},
								{
									q: "Can I cancel anytime?",
									a: "Absolutely. There are no long-term contracts. Cancel your subscription anytime from your account settings.",
								},
								{
									q: "What's included in the free plan?",
									a: "The free Starter plan includes 1 audit per month, basic spend analysis, tool detection, shareable reports, and support for up to 5 team members.",
								},
								{
									q: "Is there a limit to how many audits I can run?",
									a: "On Starter, you get 1 free audit per month. Professional and Enterprise have unlimited audits.",
								},
								{
									q: "Do you offer refunds?",
									a: "We offer a 30-day money-back guarantee. If you're not satisfied with your subscription within 30 days, we'll refund 100%.",
								},
							].map((item, idx) => (
								<div
									key={idx}
									className="p-6 rounded-xl border border-zinc-800/60 bg-gradient-to-br from-zinc-900/60 to-zinc-800/30 hover:border-cyan-500/50 hover:bg-zinc-800/60 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20"
								>
									<h3 className="text-lg font-bold text-zinc-50 mb-3">{item.q}</h3>
									<p className="text-sm text-zinc-400 leading-relaxed">{item.a}</p>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* CTA Section */}
				<section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-zinc-800/20">
					<div className="max-w-4xl mx-auto text-center">
						<h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-50 mb-6 leading-tight">
							Ready to start?
						</h2>
						<p className="text-lg sm:text-xl text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
							Generate your free audit in 45 seconds. See exactly where your team can save.
						</p>

						<button className="group relative px-8 sm:px-12 py-5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-lg hover:from-blue-500 hover:to-cyan-400 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/50 hover:scale-110 active:scale-95 inline-flex items-center gap-3 overflow-hidden">
							<span className="relative z-10 flex items-center gap-3">
								Start Your Free Audit
								<ArrowUpRight className="w-5 h-5 group-hover:translate-x-1.5 group-hover:-translate-y-1.5 transition-transform duration-300" />
							</span>
							<div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
						</button>
					</div>
				</section>

				{/* Footer */}
				<footer className="border-t border-zinc-800/40 bg-gradient-to-b from-zinc-900/50 to-zinc-950">
					<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 pb-12 border-b border-zinc-800/40">
							<div>
								<div className="flex items-center gap-2.5 mb-4">
									<div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
										<span className="text-zinc-950 font-bold text-xs">SA</span>
									</div>
									<span className="font-bold text-zinc-50">StackAudit</span>
								</div>
								<p className="text-sm text-zinc-400 leading-relaxed">Instant AI spend audits for engineering teams.</p>
							</div>
							<div>
								<h4 className="text-sm font-bold text-zinc-50 mb-4 uppercase tracking-wider">Product</h4>
								<ul className="space-y-3">
									<li><Link href="/" className="text-sm text-zinc-400 hover:text-cyan-300 transition-all duration-300 font-medium">Home</Link></li>
									<li><Link href="/features" className="text-sm text-zinc-400 hover:text-cyan-300 transition-all duration-300 font-medium">Features</Link></li>
									<li><span className="text-sm text-zinc-400 font-medium">Documentation unavailable in this submission</span></li>
								</ul>
							</div>
							<div>
								<h4 className="text-sm font-bold text-zinc-50 mb-4 uppercase tracking-wider">Company</h4>
								<ul className="space-y-3">
									<li><span className="text-sm text-zinc-400 font-medium">Blog unavailable in this submission</span></li>
									<li><span className="text-sm text-zinc-400 font-medium">Changelog unavailable in this submission</span></li>
									<li><a href="/faq" className="text-sm text-zinc-400 hover:text-cyan-300 transition-all duration-300 font-medium">FAQ</a></li>
								</ul>
							</div>
							<div>
								<h4 className="text-sm font-bold text-zinc-50 mb-4 uppercase tracking-wider">Legal</h4>
								<ul className="space-y-3">
									<li><span className="text-sm text-zinc-400 font-medium">Privacy handled externally</span></li>
									<li><span className="text-sm text-zinc-400 font-medium">Terms handled externally</span></li>
									<li><span className="text-sm text-zinc-400 font-medium">Contact via homepage footer</span></li>
								</ul>
							</div>
						</div>
						<div className="flex flex-col sm:flex-row items-center justify-between gap-6">
							<p className="text-sm text-zinc-500 font-medium">© 2024 StackAudit. Built with Next.js.</p>
							<a href="https://github.com" className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-zinc-800/60 hover:border-cyan-500/50 text-sm text-zinc-400 hover:text-cyan-300 transition-all duration-300 font-semibold hover:shadow-lg hover:shadow-cyan-500/20 hover:bg-zinc-900/50">
								<Code className="w-4 h-4" />
								GitHub
							</a>
						</div>
					</div>
				</footer>
			</main>
		</>
	);
}
