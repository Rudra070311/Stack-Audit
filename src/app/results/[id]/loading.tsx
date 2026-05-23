export default function Loading() {
  return (
    <main
      className="
        flex min-h-screen
        items-center justify-center
        bg-black text-white
      "
    >
      <div className="text-center">
        <div
          className="
            mx-auto mb-4 h-10 w-10
            animate-spin rounded-full
            border-2 border-zinc-700
            border-t-white
          "
        />

        <p className="text-zinc-400">
          Loading audit results...
        </p>
      </div>
    </main>
  );
}