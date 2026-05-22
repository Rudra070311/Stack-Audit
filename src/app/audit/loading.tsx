export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-6">
      <div
        className="
          w-full max-w-xl rounded-3xl
          border border-zinc-800
          bg-zinc-900/50 p-8
          backdrop-blur
        "
      >
        <div className="animate-pulse space-y-6">
          <div className="h-6 w-48 rounded bg-zinc-800" />

          <div className="h-4 w-72 rounded bg-zinc-800" />

          <div className="space-y-4 pt-4">
            <div className="h-12 rounded-xl bg-zinc-800" />

            <div className="h-12 rounded-xl bg-zinc-800" />

            <div className="h-12 rounded-xl bg-zinc-800" />

            <div className="h-12 rounded-xl bg-zinc-800" />

            <div className="h-12 rounded-xl bg-zinc-700" />
          </div>
        </div>
      </div>
    </div>
  );
}