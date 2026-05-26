"use client";

import { ChevronDown, Code, ArrowUpRight, Search } from "lucide-react";
import { useState } from "react";

export default function FaqPage() {
	const [expandedCategory, setExpandedCategory] = useState<string | null>("general");
	const [searchQuery, setSearchQuery] = useState("");

	const faqData = {
		general: {
			title: "General",
			icon: "❓",
			faqs: [
				{
					q: "What is StackAudit?",
					a: "StackAudit is an AI-powered platform that analyzes your team's AI tooling spend and provides personalized recommendations to optimize costs. It helps you identify overlaps, consolidation opportunities, and better-fitting plans.",
				},
				{
					q: "How does the audit work?",
					a: "Simply enter the AI tools your team uses and some basic info (team size, current spend). Our AI analyzes your stack in 45 seconds and generates a detailed audit report with recommendations.",
				},
				{
					q: "What tools does StackAudit support?",
					a: "We support 15+ AI tools including Cursor, Claude, OpenAI, GitHub Copilot, Google Gemini, Windsurf, and more. We're constantly adding support for new tools.",
				},
				{
					q: "Is my data secure?",
					a: "Yes. We use enterprise-grade encryption, secure data storage, and never sell your data. You can also generate shareable reports without creating an account.",
				},
			],
		},
		audits: {
			title: "Audits & Reports",
			icon: "📊",
			faqs: [
				{
					q: "How long does an audit take?",
					a: "Our AI analyzes your stack in just 45 seconds. You'll get a complete spend analysis, recommendations, and a shareable report instantly.",
				},
				{
					q: "Can I share my audit with my team?",
					a: "Absolutely! Every audit generates a unique shareable link. Your team can view the report without needing an account.",
				},
				{
					q: "How often should I run audits?",
					a: "We recommend running an audit monthly to track trends and catch new optimization opportunities as your team grows or changes tools.",
				},
				{
					q: "Can I export my audit results?",
					a: "Yes! Professional and Enterprise plans can export audits as PDF, CSV, or through our API. You can also integrate with tools like Slack.",
				},
			],
		},
		recommendations: {
			title: "Recommendations",
			icon: "💡",
			faqs: [
				{
					q: "How accurate are the recommendations?",
					a: "Our AI analyzes usage patterns, pricing, feature overlap, and team size to provide highly personalized recommendations. Most teams save 30-40% by following them.",
				},
				{
					q: "Can I customize recommendations?",
					a: "Yes! Our AI learns from your feedback. Mark recommendations as helpful or irrelevant to improve future suggestions.",
				},
				{
					q: "What if I disagree with a recommendation?",
					a: "You can always dismiss recommendations. Our system learns from your choices and won't suggest similar changes.",
				},
				{
					q: "Do you recommend paid tier changes?",
					a: "Yes, we analyze whether you're overpaying for your usage. We might recommend downgrading to a lower tier or switching to a plan that better fits your needs.",
				},
			],
		},
		billing: {
			title: "Billing & Pricing",
			icon: "💳",
			faqs: [
				{
					q: "How much does StackAudit cost?",
					a: "StackAudit is free to start with 1 audit per month. Professional plans are $29/month (unlimited audits). We also offer custom Enterprise pricing.",
				},
				{
					q: "Do you offer a free trial?",
					a: "Yes! Professional plans come with a 14-day free trial. No credit card required.",
				},
				{
					q: "Is there a money-back guarantee?",
					a: "Yes, we offer a 30-day money-back guarantee. If you're not satisfied, we'll refund 100%.",
				},
				{
					q: "Can I cancel anytime?",
					a: "Absolutely. Cancel your subscription anytime from your account settings. No long-term contracts or cancellation fees.",
				},
			],
		},
		advanced: {
			title: "Advanced Features",
			icon: "⚙️",
			faqs: [
				{
					q: "What's included in per-developer breakdowns?",
					a: "This shows exactly how much each team member's tools cost. Identify expensive outliers, compare across team members, and track trends over time.",
				},
				{
					q: "How does team benchmarking work?",
					a: "We compare your spend against similar-sized teams in your industry. See how you stack up and identify optimization opportunities.",
				},
				{
					q: "Can I set budget alerts?",
					a: "Yes! Professional and Enterprise plans can set spend thresholds. We'll notify you via email if you're trending over budget.",
				},
				{
					q: "Do you have an API?",
					a: "Yes! Professional and Enterprise plans have access to our REST API and GraphQL API for custom integrations.",
				},
			],
		},
	};

	const categories = Object.entries(faqData);

	const filteredCategories = searchQuery
		? categories.filter(([_, data]) =>
				data.faqs.some(
					(faq) =>
						faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
						faq.a.toLowerCase().includes(searchQuery.toLowerCase())
				)
		)
		: categories;

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
						<a href="/" className="text-sm font-medium text-zinc-400 hover:text-cyan-300 transition-all duration-300 relative group">
							Home
							<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300"></span>
						</a>
						<a href="/features" className="text-sm font-medium text-zinc-400 hover:text-cyan-300 transition-all duration-300 relative group">
							Features
							<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300"></span>
						</a>
						<a href="/pricing" className="text-sm font-medium text-zinc-400 hover:text-cyan-300 transition-all duration-300 relative group">
							Pricing
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

					<div className="relative z-10 max-w-4xl mx-auto text-center w-full">
						<h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-tight">
							<span className="text-zinc-50">Frequently asked </span>
							<span className="gradient-text">questions</span>
						</h1>
						<p className="text-lg sm:text-xl text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
							Can't find the answer you're looking for? Contact our support team.
						</p>

						{/* Search Box */}
						<div className="max-w-2xl mx-auto relative">
							<Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-400 pointer-events-none" />
							<input
								type="text"
								placeholder="Search for answers..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="w-full pl-12 pr-6 py-4 rounded-xl border border-zinc-800/60 bg-gradient-to-br from-zinc-900/60 to-zinc-800/30 text-zinc-50 placeholder-zinc-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all duration-300 font-medium"
							/>
						</div>
					</div>
				</section>

				{/* FAQ Sections */}
				<section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
					<div className="max-w-4xl mx-auto">
						<div className="space-y-8">
							{filteredCategories.map(([key, category]) => (
								<div key={key} className="rounded-xl border border-zinc-800/60 bg-gradient-to-br from-zinc-900/60 to-zinc-800/30 overflow-hidden hover:border-cyan-500/50 hover:bg-zinc-800/60 transition-all duration-300">
									<button
										onClick={() =>
											setExpandedCategory(
												expandedCategory === key ? null : key
											)
										}
										className="w-full px-8 py-6 flex items-center justify-between hover:bg-zinc-800/50 transition-colors duration-300"
									>
										<div className="flex items-center gap-4">
											<span className="text-3xl">{category.icon}</span>
											<h2 className="text-2xl font-bold text-zinc-50 text-left">{category.title}</h2>
										</div>
										<ChevronDown
											className={`w-6 h-6 text-cyan-400 transition-transform duration-300 ${
												expandedCategory === key
													? "transform rotate-180"
													: ""
											}`}
										/>
									</button>

									{expandedCategory === key && (
										<div className="border-t border-zinc-700/60 divide-y divide-zinc-700/60">
											{category.faqs.map((faq, idx) => (
												<div
													key={idx}
													className="px-8 py-6 hover:bg-zinc-800/30 transition-colors duration-300"
												>
													<h3 className="text-base font-bold text-zinc-50 mb-3">
														{faq.q}
													</h3>
													<p className="text-sm text-zinc-400 leading-relaxed">
														{faq.a}
													</p>
												</div>
											))}
										</div>
									)}
								</div>
							))}
						</div>

						{filteredCategories.length === 0 && (
							<div className="text-center py-12">
								<p className="text-lg text-zinc-400 font-medium">
									No results found for "{searchQuery}"
								</p>
								<button
									onClick={() => setSearchQuery("")}
									className="mt-4 text-cyan-400 hover:text-cyan-300 font-medium underline"
								>
									Clear search
								</button>
							</div>
						)}
					</div>
				</section>

				{/* Contact Section */}
				<section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-zinc-800/20">
					<div className="max-w-4xl mx-auto text-center">
						<h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-50 mb-6 leading-tight">
							Still have questions?
						</h2>
						<p className="text-lg text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
							Our support team is here to help. Reach out anytime.
						</p>

						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<a
								href="mailto:support@stackaudit.io"
								className="group px-8 py-4 rounded-xl border-2 border-zinc-700 text-zinc-100 font-bold text-lg hover:border-cyan-500/60 hover:bg-zinc-900/80 hover:text-cyan-300 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 hover:scale-105 active:scale-95"
							>
								Email Support
							</a>
							<button className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-lg hover:from-blue-500 hover:to-cyan-400 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/50 hover:scale-110 active:scale-95 inline-flex items-center gap-2 overflow-hidden">
								<span className="relative z-10 flex items-center gap-2">
									Start Free Audit
									<ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
								</span>
								<div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
							</button>
						</div>
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
									<li><a href="/" className="text-sm text-zinc-400 hover:text-cyan-300 transition-all duration-300 font-medium">Features</a></li>
									<li><a href="/pricing" className="text-sm text-zinc-400 hover:text-cyan-300 transition-all duration-300 font-medium">Pricing</a></li>
									<li><a href="#" className="text-sm text-zinc-400 hover:text-cyan-300 transition-all duration-300 font-medium">Documentation</a></li>
								</ul>
							</div>
							<div>
								<h4 className="text-sm font-bold text-zinc-50 mb-4 uppercase tracking-wider">Company</h4>
								<ul className="space-y-3">
									<li><a href="#" className="text-sm text-zinc-400 hover:text-cyan-300 transition-all duration-300 font-medium">Blog</a></li>
									<li><a href="#" className="text-sm text-zinc-400 hover:text-cyan-300 transition-all duration-300 font-medium">Changelog</a></li>
									<li><a href="#" className="text-sm text-zinc-400 hover:text-cyan-300 transition-all duration-300 font-medium">Status</a></li>
								</ul>
							</div>
							<div>
								<h4 className="text-sm font-bold text-zinc-50 mb-4 uppercase tracking-wider">Legal</h4>
								<ul className="space-y-3">
									<li><a href="#" className="text-sm text-zinc-400 hover:text-cyan-300 transition-all duration-300 font-medium">Privacy</a></li>
									<li><a href="#" className="text-sm text-zinc-400 hover:text-cyan-300 transition-all duration-300 font-medium">Terms</a></li>
									<li><a href="#" className="text-sm text-zinc-400 hover:text-cyan-300 transition-all duration-300 font-medium">Contact</a></li>
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
