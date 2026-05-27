"use client";

import Link from "next/link";
import { ChevronRight, Zap, BarChart3, Sparkles, Share2, TrendingDown, Code, CheckCircle2, ArrowUpRight } from "lucide-react";

export default function FeaturesPage() {
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
							<span className="text-zinc-50">Powerful features </span>
							<span className="gradient-text">built for teams</span>
						</h1>
						<p className="text-lg sm:text-xl text-zinc-400 mb-8 max-w-2xl mx-auto leading-relaxed font-medium">
							Everything you need to understand, optimize, and control your AI tooling spend.
						</p>
					</div>
				</section>

				{/* Core Features Section */}
				<section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 border-b border-zinc-800/20">
					<div className="max-w-6xl mx-auto">
						<div className="mb-16">
							<h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-50 mb-4">
								The complete toolkit
							</h2>
							<p className="text-lg text-zinc-400 font-medium">
								From audit to analysis to optimization recommendations.
							</p>
						</div>

						{/* Features Grid */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							{[
								{
									icon: Zap,
									title: "Instant AI Stack Audit",
									description: "Upload your tools in seconds. Our AI analyzes your current spending, identifies overlaps, and benchmarks against industry standards.",
									features: ["45-second analysis", "Real-time metrics", "Zero setup required"],
									color: "from-yellow-500/20 to-orange-500/20",
									textColor: "text-yellow-400",
								},
								{
									icon: BarChart3,
									title: "Per-Developer Cost Breakdown",
									description: "See exactly how much each team member's tooling costs. Identify expensive outliers and optimize team-wide spend.",
									features: ["Individual costs", "Team comparisons", "Trend analysis"],
									color: "from-blue-500/20 to-cyan-500/20",
									textColor: "text-blue-400",
								},
								{
									icon: Sparkles,
									title: "AI-Powered Recommendations",
									description: "Get personalized suggestions based on your usage patterns. Our AI recommends consolidation, downgrades, and strategic changes.",
									features: ["Usage patterns", "Consolidation tips", "Plan optimization"],
									color: "from-purple-500/20 to-pink-500/20",
									textColor: "text-purple-400",
								},
								{
									icon: TrendingDown,
									title: "Real Savings Calculator",
									description: "See exactly how much you'll save by implementing recommendations. Track monthly and annual impact.",
									features: ["Monthly savings", "Annual projections", "ROI tracking"],
									color: "from-red-500/20 to-orange-500/20",
									textColor: "text-red-400",
								},
								{
									icon: Share2,
									title: "Shareable Audit Reports",
									description: "Generate beautiful, interactive reports and share with your team. No account or login required for viewers.",
									features: ["Beautiful PDFs", "Interactive links", "Team collaboration"],
									color: "from-green-500/20 to-emerald-500/20",
									textColor: "text-green-400",
								},
								{
									icon: Code,
									title: "Tool Detection Engine",
									description: "Automatically detects 15+ AI coding tools. Supports Cursor, Claude, OpenAI, Copilot, Gemini, and more.",
									features: ["15+ tools supported", "Auto-detection", "Custom tools"],
									color: "from-indigo-500/20 to-blue-500/20",
									textColor: "text-indigo-400",
								},
							].map((feature, idx) => {
								const Icon = feature.icon;
								return (
									<div
										key={idx}
										className="group p-8 rounded-xl border border-zinc-800/60 bg-gradient-to-br from-zinc-900/60 to-zinc-800/30 hover:border-cyan-500/50 hover:bg-zinc-800/60 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20"
									>
										<div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-125 transition-transform duration-300`}>
											<Icon className={`w-6 h-6 ${feature.textColor}`} />
										</div>
										<h3 className="text-xl font-bold text-zinc-50 mb-3">{feature.title}</h3>
										<p className="text-sm text-zinc-400 mb-6 leading-relaxed">{feature.description}</p>
										<ul className="space-y-2">
											{feature.features.map((f, fidx) => (
												<li key={fidx} className="flex items-center gap-2 text-sm text-zinc-300">
													<CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
													{f}
												</li>
											))}
										</ul>
									</div>
								);
							})}
						</div>
					</div>
				</section>

				{/* Advanced Features Section */}
				<section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 border-b border-zinc-800/20">
					<div className="max-w-6xl mx-auto">
						<div className="mb-16">
							<h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-50 mb-4">
								Advanced capabilities
							</h2>
							<p className="text-lg text-zinc-400 font-medium">
								Enterprise-grade features for serious optimization.
							</p>
						</div>

						<div className="space-y-8">
							{[
								{
									title: "Historical Tracking",
									description: "Monitor spend trends over months and years. Identify seasonal patterns and track progress on optimization goals.",
									benefits: ["Month-over-month trends", "Year-over-year comparisons", "Anomaly detection"],
									image: "📊",
								},
								{
									title: "Team Benchmarking",
									description: "See how your team's spend compares to similar-sized companies in your industry. Identify optimization opportunities.",
									benefits: ["Industry benchmarks", "Size-based comparisons", "Best practice insights"],
									image: "🏆",
								},
								{
									title: "Vendor Optimization",
									description: "Deep-dive analysis of each vendor. See exactly which plans fit your usage and which are overkill.",
									benefits: ["Plan recommendations", "Usage matching", "Feature overlap detection"],
									image: "🎯",
								},
								{
									title: "Budget Alerts",
									description: "Get notified when spend exceeds targets or trends suggest overspending. Stay on top of costs.",
									benefits: ["Threshold alerts", "Trend notifications", "Email summaries"],
									image: "🔔",
								},
							].map((feature, idx) => (
								<div
									key={idx}
									className="group p-8 sm:p-12 rounded-xl border border-zinc-800/60 bg-gradient-to-br from-zinc-900/60 to-zinc-800/30 hover:border-cyan-500/50 hover:bg-zinc-800/60 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 hover:scale-105"
								>
									<div className="flex flex-col sm:flex-row gap-8 items-start">
										<div className="text-5xl flex-shrink-0">{feature.image}</div>
										<div className="flex-1">
											<h3 className="text-2xl font-bold text-zinc-50 mb-3">{feature.title}</h3>
											<p className="text-sm text-zinc-400 mb-6 leading-relaxed">{feature.description}</p>
											<ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
												{feature.benefits.map((benefit, bidx) => (
													<li key={bidx} className="flex items-center gap-2 text-sm text-zinc-300">
														<ChevronRight className="w-4 h-4 text-cyan-400 flex-shrink-0" />
														{benefit}
													</li>
												))}
											</ul>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Integration & API Section */}
				<section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 border-b border-zinc-800/20">
					<div className="max-w-6xl mx-auto">
						<div className="text-center mb-16">
							<h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-50 mb-4">
								Integrations & APIs
							</h2>
							<p className="text-lg text-zinc-400 max-w-2xl mx-auto font-medium">
								Seamlessly integrate with your existing tools and workflows.
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{[
								"Slack Integration",
								"GitHub Actions",
								"Webhook Support",
								"REST API",
								"GraphQL API",
								"CSV Export",
								"PDF Reports",
								"Email Reports",
								"Custom Domains",
							].map((integration, idx) => (
								<div
									key={idx}
									className="group p-6 rounded-xl border border-zinc-800/60 bg-gradient-to-br from-zinc-900/60 to-zinc-800/30 hover:border-cyan-500/50 hover:bg-zinc-800/60 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 hover:scale-105 cursor-pointer"
								>
									<div className="flex items-center justify-between">
										<span className="text-base font-semibold text-zinc-50">{integration}</span>
										<ArrowUpRight className="w-5 h-5 text-cyan-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
									</div>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* CTA Section */}
				<section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-zinc-800/20">
					<div className="max-w-4xl mx-auto text-center">
						<h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-50 mb-6 leading-tight">
							Ready to optimize?
						</h2>
						<p className="text-lg sm:text-xl text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
							Start your free audit today. See exactly where you can save, no credit card required.
						</p>

						<button className="group relative px-8 sm:px-12 py-5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-lg hover:from-blue-500 hover:to-cyan-400 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/50 hover:scale-110 active:scale-95 inline-flex items-center gap-3 overflow-hidden">
							<span className="relative z-10 flex items-center gap-3">
								Generate Free Audit
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
