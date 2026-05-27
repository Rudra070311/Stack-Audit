import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 to-zinc-900 flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold gradient-text mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-zinc-100 mb-2">Page Not Found</h2>
          <p className="text-zinc-400 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="flex flex-col gap-4">
          <Link
            href="/"
            className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
          >
            Back to Home
          </Link>
          <Link
            href="/audit"
            className="inline-block px-6 py-3 rounded-lg border border-zinc-700 text-zinc-300 font-semibold hover:border-cyan-500/50 hover:text-cyan-300 transition-all"
          >
            Run an Audit
          </Link>
        </div>
      </div>
    </div>
  );
}

