"use client";

import { ChevronRight, Zap, TrendingDown, Share2, Sparkles, BarChart3, ArrowUpRight, Code } from "lucide-react";
import Image from "next/image";

export default function MarketingPage() {
	return (
		<>
			{/* Navigation */}
			<nav className="sticky top-0 z-40 border-b border-zinc-800/40 bg-zinc-950/80 backdrop-blur-xl">
				<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
					<div className="flex items-center gap-2">
						<div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center">
							<span className="text-zinc-950 font-bold text-sm">SA</span>
						</div>
						<span className="font-semibold text-zinc-50">StackAudit</span>
					</div>
					<div className="hidden md:flex items-center gap-8">
						<a href="#features" className="text-sm text-zinc-400 hover:text-zinc-50 transition-colors">
							Features
						</a>
						<a href="#how-it-works" className="text-sm text-zinc-400 hover:text-zinc-50 transition-colors">
							How It Works
						</a>
						<a href="#" className="text-sm text-zinc-400 hover:text-zinc-50 transition-colors">
							Pricing
						</a>
					</div>
				</div>
			</nav>

			<main className="bg-zinc-950">
				{/* Hero Section */}
				<section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-16 pb-20">
					{/* Animated background elements */}
					<div className="absolute inset-0 overflow-hidden pointer-events-none">
						<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl opacity-20 animate-glow-pulse"></div>
						<div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl opacity-20 animate-glow-pulse" style={{ animationDelay: "1s" }}></div>
						<div className="absolute -bottom-1/4 left-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl opacity-10"></div>
					</div>

					<div className="relative z-10 max-w-4xl mx-auto text-center">
						{/* Trust badge */}
						<div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
							<span className="w-2 h-2 rounded-full bg-green-500"></span>
							<span className="text-sm text-zinc-400">No login required • Free audit</span>
						</div>

						{/* Main headline */}
						<h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
							<span className="text-zinc-50">You're probably </span>
							<span className="gradient-text">overspending on AI</span>
							<span className="text-zinc-50">.</span>
						</h1>

						{/* Subheadline */}
						<p className="text-lg sm:text-xl text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed">
							Teams waste thousands yearly on overlapping AI coding tools. StackAudit analyzes your stack in seconds and shows exactly where to cut costs.
						</p>

						{/* CTA Buttons */}
						<div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
							<button className="group px-8 py-4 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold text-lg hover:shadow-glow transition-all duration-300 hover:scale-105 active:scale-100 flex items-center justify-center gap-2">
								Run Free Audit
								<ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
							</button>
							<button className="px-8 py-4 rounded-lg border border-zinc-700 text-zinc-100 font-semibold text-lg hover:border-zinc-600 hover:bg-zinc-900/50 transition-all duration-300 flex items-center justify-center gap-2">
								See Example Report
								<ChevronRight className="w-5 h-5" />
							</button>
						</div>

						{/* Stats row */}
						<div className="grid grid-cols-3 gap-4 mb-20 max-w-2xl mx-auto">
							<div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/30 backdrop-blur-sm">
								<div className="text-2xl font-bold text-blue-400">$4.2K</div>
								<div className="text-xs text-zinc-500 mt-1">Avg savings found</div>
							</div>
							<div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/30 backdrop-blur-sm">
								<div className="text-2xl font-bold text-cyan-400">45s</div>
								<div className="text-xs text-zinc-500 mt-1">Audit generation</div>
							</div>
							<div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/30 backdrop-blur-sm">
								<div className="text-2xl font-bold text-emerald-400">15+</div>
								<div className="text-xs text-zinc-500 mt-1">Tools detected</div>
							</div>
						</div>

						{/* Floating savings cards */}
						<div className="relative h-64 sm:h-80 mb-12">
							{/* Card 1 */}
							<div className="absolute left-0 top-0 sm:left-4 sm:top-8 animate-float">
								<div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm w-48 sm:w-56">
									<div className="text-sm text-zinc-400 mb-2">Claude Pro</div>
									<div className="flex items-baseline gap-1">
										<span className="text-2xl font-bold text-zinc-50">$200</span>
										<span className="text-sm text-zinc-500">/mo unused</span>
									</div>
								</div>
							</div>

							{/* Card 2 */}
							<div className="absolute right-0 top-12 sm:right-4 sm:top-20 animate-float" style={{ animationDelay: "0.7s" }}>
								<div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm w-48 sm:w-56">
									<div className="text-sm text-zinc-400 mb-2">Cursor Seats</div>
									<div className="flex items-baseline gap-1">
										<span className="text-2xl font-bold text-zinc-50">$450</span>
										<span className="text-sm text-zinc-500">upgrade available</span>
									</div>
								</div>
							</div>

							{/* Card 3 */}
							<div className="absolute left-1/2 bottom-0 sm:left-1/4 sm:bottom-4 animate-float" style={{ animationDelay: "1.4s", transform: "translateX(-50%)" }}>
								<div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm w-48 sm:w-56">
									<div className="text-sm text-zinc-400 mb-2">Copilot Redundancy</div>
									<div className="flex items-baseline gap-1">
										<span className="text-2xl font-bold text-zinc-50">$720</span>
										<span className="text-sm text-zinc-500">can consolidate</span>
									</div>
								</div>
							</div>
						</div>

						{/* AI Tools row */}
						<div className="mt-32 pt-12 border-t border-zinc-800">
							<div className="text-sm text-zinc-500 mb-8">Supports your entire stack</div>
							<div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12">
								{[
									{ name: "Cursor", emoji: "⌘" },
									{ name: "Claude", emoji: "🧠" },
									{ name: "OpenAI", emoji: "✨" },
									{ name: "Gemini", emoji: "🎨" },
									{ name: "Copilot", emoji: "💡" },
									{ name: "Windsurf", emoji: "🌊" },
								].map((tool) => (
									<div key={tool.name} className="flex items-center gap-2 text-zinc-400 hover:text-zinc-200 transition-colors">
										<span className="text-2xl">{tool.emoji}</span>
										<span className="text-sm font-medium">{tool.name}</span>
									</div>
								))}
							</div>
						</div>
					</div>
				</section>

				{/* Social Proof Section */}
				<section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-zinc-800">
					<div className="max-w-6xl mx-auto">
						<div className="text-center mb-16">
							<h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-50 mb-4">
								The opportunity is massive
							</h2>
							<p className="text-lg text-zinc-400 max-w-2xl mx-auto">
								Engineering teams are throwing away thousands on overlapping subscriptions. We're helping them find it.
							</p>
						</div>

						{/* Stats Grid */}
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
							{[
								{
									label: "Monthly waste per team",
									value: "$3,200+",
									icon: TrendingDown,
									color: "from-red-500/20 to-orange-500/20",
									textColor: "text-red-400",
								},
								{
									label: "Tools per developer",
									value: "4.2 average",
									icon: Zap,
									color: "from-yellow-500/20 to-orange-500/20",
									textColor: "text-yellow-400",
								},
								{
									label: "Overlap detected",
									value: "38% of costs",
									icon: BarChart3,
									color: "from-blue-500/20 to-cyan-500/20",
									textColor: "text-blue-400",
								},
							].map((stat, idx) => {
								const Icon = stat.icon;
								return (
									<div
										key={idx}
										className="group p-8 rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-800/50 hover:border-zinc-700 hover:shadow-glow transition-all duration-300"
									>
										<div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
											<Icon className={`w-6 h-6 ${stat.textColor}`} />
										</div>
										<div className="text-4xl font-bold text-zinc-50 mb-2">{stat.value}</div>
										<div className="text-zinc-400 text-sm">{stat.label}</div>
									</div>
								);
							})}
						</div>
					</div>
				</section>

				{/* Features Section */}
				<section id="features" className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-zinc-800">
					<div className="max-w-6xl mx-auto">
						<div className="text-center mb-16">
							<h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-50 mb-4">
								Built for engineering teams
							</h2>
							<p className="text-lg text-zinc-400 max-w-2xl mx-auto">
								Deep analysis without the complexity. Run a full audit in 45 seconds.
							</p>
						</div>

						{/* Features Grid */}
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{[
								{
									icon: Zap,
									title: "Instant AI spend audit",
									description: "Upload your stack and get a complete spend analysis in seconds, not hours.",
									color: "from-yellow-500/20 to-orange-500/20",
									textColor: "text-yellow-400",
								},
								{
									icon: BarChart3,
									title: "Benchmark per developer",
									description: "See exactly how much each developer's tooling costs and compare across teams.",
									color: "from-blue-500/20 to-cyan-500/20",
									textColor: "text-blue-400",
								},
								{
									icon: Sparkles,
									title: "AI recommendations",
									description: "Get personalized suggestions on which tools to consolidate or upgrade.",
									color: "from-purple-500/20 to-pink-500/20",
									textColor: "text-purple-400",
								},
								{
									icon: Share2,
									title: "Shareable audit links",
									description: "Share results with your team and leadership instantly. No account required.",
									color: "from-green-500/20 to-emerald-500/20",
									textColor: "text-green-400",
								},
								{
									icon: TrendingDown,
									title: "Vendor downgrades",
									description: "Find plans that fit your usage patterns and save immediately.",
									color: "from-red-500/20 to-orange-500/20",
									textColor: "text-red-400",
								},
								{
									icon: Sparkles,
									title: "Smart summaries",
									description: "AI-generated executive summary of findings and next steps.",
									color: "from-indigo-500/20 to-blue-500/20",
									textColor: "text-indigo-400",
								},
							].map((feature, idx) => {
								const Icon = feature.icon;
								return (
									<div
										key={idx}
										className="group p-6 rounded-2xl border border-zinc-800 bg-zinc-900/30 hover:border-zinc-700 hover:bg-zinc-900/60 transition-all duration-300 hover:shadow-glow"
									>
										<div
											className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
										>
											<Icon className={`w-6 h-6 ${feature.textColor}`} />
										</div>
										<h3 className="text-lg font-semibold text-zinc-50 mb-2">{feature.title}</h3>
										<p className="text-sm text-zinc-400 leading-relaxed">{feature.description}</p>
									</div>
								);
							})}
						</div>
					</div>
				</section>

				{/* How It Works Section */}
				<section id="how-it-works" className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-zinc-800">
					<div className="max-w-6xl mx-auto">
						<div className="text-center mb-16">
							<h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-50 mb-4">
								Simple process, powerful results
							</h2>
							<p className="text-lg text-zinc-400 max-w-2xl mx-auto">
								Get your audit in three simple steps.
							</p>
						</div>

						{/* Steps */}
						<div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
							{[
								{
									step: 1,
									title: "Enter your stack",
									description: "List the AI tools your team uses. Takes 2 minutes. No login needed.",
									detail: "Cursor, Claude, OpenAI, Copilot, Gemini, and more.",
								},
								{
									step: 2,
									title: "Analyze spend",
									description: "Our AI analyzes overlaps, usage patterns, and pricing tiers.",
									detail: "Benchmarks your costs against similar teams.",
								},
								{
									step: 3,
									title: "Get recommendations",
									description: "See exactly where you can save and how much you'll cut costs.",
									detail: "Share the report with your team instantly.",
								},
							].map((item, idx) => (
								<div key={idx} className="relative">
									{/* Connector line */}
									{idx < 2 && (
										<div className="hidden md:block absolute top-1/4 left-[calc(50%+40px)] right-[-50px] h-1 bg-gradient-to-r from-blue-500/50 to-cyan-500/10"></div>
									)}

									<div className="relative z-10">
										{/* Step number */}
										<div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center mb-6 font-bold text-white text-lg">
											{item.step}
										</div>

										{/* Card */}
										<div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/30 hover:border-zinc-700 transition-all duration-300">
											<h3 className="text-lg font-semibold text-zinc-50 mb-2">{item.title}</h3>
											<p className="text-sm text-zinc-400 mb-4">{item.description}</p>
											<p className="text-xs text-zinc-500 border-t border-zinc-800 pt-4">{item.detail}</p>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Live Preview Section */}
				<section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-zinc-800">
					<div className="max-w-6xl mx-auto">
						<div className="text-center mb-16">
							<h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-50 mb-4">
								See your savings in real-time
							</h2>
							<p className="text-lg text-zinc-400 max-w-2xl mx-auto">
								This is what your audit report looks like.
							</p>
						</div>

						{/* Preview Card */}
						<div className="relative max-w-4xl mx-auto">
							{/* Background glow */}
							<div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-3xl blur-2xl opacity-30"></div>

							{/* Main card */}
							<div className="relative p-8 sm:p-12 rounded-3xl border border-zinc-700 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
								{/* Header */}
								<div className="mb-8 pb-8 border-b border-zinc-700">
									<div className="flex items-start justify-between mb-6">
										<div>
											<div className="text-sm text-zinc-400 mb-2">Your AI Stack Audit</div>
											<h3 className="text-2xl sm:text-3xl font-bold text-zinc-50">Engineering Team Report</h3>
										</div>
										<div className="text-right">
											<div className="text-xs text-zinc-500 mb-2">Generated today</div>
											<button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-700 hover:border-zinc-600 text-sm font-medium text-zinc-400 hover:text-zinc-200 transition-all">
												<Share2 className="w-4 h-4" />
												Share
											</button>
										</div>
									</div>
								</div>

								{/* Key metrics */}
								<div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
									<div className="p-6 rounded-xl border border-zinc-700/50 bg-zinc-900/50">
										<div className="text-sm text-zinc-400 mb-2">Monthly savings available</div>
										<div className="text-3xl sm:text-4xl font-bold text-emerald-400">$3,840</div>
										<div className="text-xs text-zinc-500 mt-2">33% of current spend</div>
									</div>
									<div className="p-6 rounded-xl border border-zinc-700/50 bg-zinc-900/50">
										<div className="text-sm text-zinc-400 mb-2">Recommended spend</div>
										<div className="text-3xl sm:text-4xl font-bold text-blue-400">$7,700</div>
										<div className="text-xs text-zinc-500 mt-2">Down from $11,540</div>
									</div>
									<div className="p-6 rounded-xl border border-zinc-700/50 bg-zinc-900/50">
										<div className="text-sm text-zinc-400 mb-2">Annual impact</div>
										<div className="text-3xl sm:text-4xl font-bold text-cyan-400">$46,080</div>
										<div className="text-xs text-zinc-500 mt-2">Full year savings</div>
									</div>
								</div>

								{/* Recommendations */}
								<div className="mb-8 p-6 rounded-xl border border-zinc-700/50 bg-blue-950/30">
									<h4 className="text-sm font-semibold text-blue-400 mb-4">Top Recommendations</h4>
									<ul className="space-y-3">
										<li className="flex items-start gap-3">
											<ChevronRight className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
											<span className="text-sm text-zinc-300">Consolidate Cursor & Copilot Pro (redundant 2-seat license) — Save $300/mo</span>
										</li>
										<li className="flex items-start gap-3">
											<ChevronRight className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
											<span className="text-sm text-zinc-300">Downgrade Claude Pro → Claude Teams (better per-seat pricing) — Save $1,200/mo</span>
										</li>
										<li className="flex items-start gap-3">
											<ChevronRight className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
											<span className="text-sm text-zinc-300">Remove Gemini Advanced (unused for 6+ months) — Save $320/mo</span>
										</li>
									</ul>
								</div>

								{/* AI Summary */}
								<div className="p-6 rounded-xl border border-zinc-700/50 bg-zinc-900/30">
									<div className="flex items-start gap-3 mb-3">
										<Sparkles className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
										<h4 className="text-sm font-semibold text-purple-400">AI Summary</h4>
									</div>
									<p className="text-sm text-zinc-300 leading-relaxed">
										Your team is spending ~$11,540/month across 5 AI tools. We found 3 primary overlaps and 1 unused subscription. By consolidating to a 
										<span className="text-emerald-400 font-semibold"> focused stack of 3 tools</span>, you can maintain capability while reducing costs by 33%. The recommended approach prioritizes Claude Teams for primary coding, Cursor for IDE integration, and OpenAI API-only access to reduce unnecessary subscriptions.
									</p>
								</div>

								{/* Share link */}
								<div className="mt-8 pt-8 border-t border-zinc-700">
									<div className="text-xs text-zinc-500 mb-3">Share this report</div>
									<div className="flex items-center gap-2 p-4 rounded-lg border border-zinc-700 bg-zinc-900/50">
										<code className="flex-1 text-xs text-zinc-400 truncate">stackaudit.io/r/team-xyz-4k2m</code>
										<button className="px-3 py-1 rounded text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors">Copy</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Testimonials Section */}
				<section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-zinc-800">
					<div className="max-w-6xl mx-auto">
						<div className="text-center mb-16">
							<h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-50 mb-4">
								Trusted by engineering teams
							</h2>
						</div>

						{/* Testimonials Grid */}
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							{[
								{
									name: "Alex Chen",
									role: "Engineering Manager, YC S23",
									content: "Found $4.2K in monthly savings we didn't even know existed. The recommendations were spot-on.",
									avatar: "AC",
									color: "from-blue-400 to-cyan-400",
								},
								{
									name: "Jordan Patel",
									role: "CTO, Series A SaaS",
									content: "We ran this in the team Slack, got results in a minute. Literally saved us tens of thousands this year.",
									avatar: "JP",
									color: "from-purple-400 to-pink-400",
								},
								{
									name: "Sam Rodriguez",
									role: "Head of Ops, Venture Studio",
									content: "This should be the first thing you run when building your tool stack. No fluff, just facts.",
									avatar: "SR",
									color: "from-emerald-400 to-cyan-400",
								},
							].map((testimonial, idx) => (
								<div
									key={idx}
									className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/30 hover:border-zinc-700 hover:shadow-glow transition-all duration-300"
								>
									{/* Quote mark */}
									<div className="text-4xl text-zinc-700 mb-4">"</div>

									{/* Content */}
									<p className="text-base text-zinc-300 mb-6 leading-relaxed">{testimonial.content}</p>

									{/* Author */}
									<div className="flex items-center gap-3">
										<div
											className={`w-10 h-10 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-sm font-semibold text-zinc-950`}
										>
											{testimonial.avatar}
										</div>
										<div>
											<div className="text-sm font-semibold text-zinc-50">{testimonial.name}</div>
											<div className="text-xs text-zinc-500">{testimonial.role}</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Final CTA Section */}
				<section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-zinc-800">
					<div className="max-w-4xl mx-auto text-center">
						{/* Background glow */}
						<div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 rounded-3xl blur-3xl opacity-20 -z-10"></div>

						<h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-50 mb-6">
							Stop paying retail for AI tooling
						</h2>
						<p className="text-lg sm:text-xl text-zinc-400 mb-12 max-w-2xl mx-auto">
							Your free audit is ready. See exactly where your team is overspending and how to fix it in seconds.
						</p>

						<button className="group px-8 sm:px-10 py-4 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold text-lg hover:shadow-glow-lg transition-all duration-300 hover:scale-105 active:scale-100 inline-flex items-center gap-2">
							Generate Free Audit
							<ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
						</button>

						<p className="text-sm text-zinc-500 mt-6">
							Trusted by 500+ engineering teams • No credit card required
						</p>
					</div>
				</section>

				{/* Footer */}
				<footer className="border-t border-zinc-800 bg-zinc-900/50">
					<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 pb-12 border-b border-zinc-800">
							{/* Brand */}
							<div>
								<div className="flex items-center gap-2 mb-4">
									<div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center">
										<span className="text-zinc-950 font-bold text-sm">SA</span>
									</div>
									<span className="font-semibold text-zinc-50">StackAudit</span>
								</div>
								<p className="text-sm text-zinc-500">Instant AI spend audits for engineering teams.</p>
							</div>

							{/* Links */}
							<div>
								<h4 className="text-sm font-semibold text-zinc-50 mb-4">Product</h4>
								<ul className="space-y-3">
									<li>
										<a href="#" className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors">
											Features
										</a>
									</li>
									<li>
										<a href="#" className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors">
											Pricing
										</a>
									</li>
									<li>
										<a href="#" className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors">
											Documentation
										</a>
									</li>
								</ul>
							</div>

							{/* Company */}
							<div>
								<h4 className="text-sm font-semibold text-zinc-50 mb-4">Company</h4>
								<ul className="space-y-3">
									<li>
										<a href="#" className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors">
											Blog
										</a>
									</li>
									<li>
										<a href="#" className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors">
											Changelog
										</a>
									</li>
									<li>
										<a href="#" className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors">
											Status
										</a>
									</li>
								</ul>
							</div>

							{/* Legal */}
							<div>
								<h4 className="text-sm font-semibold text-zinc-50 mb-4">Legal</h4>
								<ul className="space-y-3">
									<li>
										<a href="#" className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors">
											Privacy
										</a>
									</li>
									<li>
										<a href="#" className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors">
											Terms
										</a>
									</li>
									<li>
										<a href="#" className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors">
											Contact
										</a>
									</li>
								</ul>
							</div>
						</div>

						{/* Bottom footer */}
						<div className="flex flex-col sm:flex-row items-center justify-between gap-6">
							<p className="text-sm text-zinc-500">
								© 2024 StackAudit. Built with Next.js.
							</p>
							<a
								href="https://github.com"
								className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-800 hover:border-zinc-700 text-sm text-zinc-400 hover:text-zinc-200 transition-all"
							>
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
