export function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div
        className="
          rounded-2xl bg-zinc-800
          px-4 py-3 text-white
        "
      >
        <div className="flex gap-1">
          <span className="animate-bounce">
            .
          </span>

          <span className="animate-bounce delay-100">
            .
          </span>

          <span className="animate-bounce delay-200">
            .
          </span>
        </div>
      </div>
    </div>
  );
}