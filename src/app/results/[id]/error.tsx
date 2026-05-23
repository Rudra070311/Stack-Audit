"use client";

export default function Error({
    error,
}: {
    error: Error;
}) {
	return (
		<main
		className="
			flex min-h-screen
			items-center justify-center
			bg-black px-6 text-white
		"
		>
			<div
				className="
				max-w-md rounded-3xl
				border border-red-900/50
				bg-red-950/20 p-8
				"
			>
				<h1
				className="
					text-2xl font-bold
					text-red-400
				"
				>
					Failed to load audit
				</h1>

				<p className="mt-4 text-zinc-300">
					{error.message}
				</p>
			</div>
		</main>
	);
}