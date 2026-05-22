"use client";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({
  error,
  reset,
}: ErrorProps) {
  console.error(error);

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-6">
      <div
        className="
          w-full max-w-lg rounded-3xl
          border border-red-900/40
          bg-zinc-900/50 p-8
          text-center backdrop-blur
        "
      >
        <div className="mb-4 text-5xl">
          ⚠️
        </div>

        <h2 className="text-2xl font-semibold text-white">
          Something went wrong
        </h2>

        <p className="mt-3 text-zinc-400">
          An unexpected error occurred while
          loading the audit flow.
        </p>

        <button
          onClick={reset}
          className="
            mt-6 rounded-xl bg-white
            px-5 py-3 font-medium
            text-black transition
            hover:opacity-90
          "
        >
          Try Again
        </button>
      </div>
    </div>
  );
}