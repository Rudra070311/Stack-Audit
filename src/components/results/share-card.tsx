interface ShareCardProps {
  url: string;
}

export function ShareCard({
  url,
}: ShareCardProps) {
  async function copyLink() {
    await navigator.clipboard.writeText(
      url
    );
  }

  return (
    <div
      className="
        rounded-2xl
        border border-zinc-800
        bg-zinc-900
        p-6
      "
    >
      <h3
        className="
          text-lg font-semibold
          text-white
        "
      >
        Share Audit
      </h3>

      <div
        className="
          mt-4 flex gap-3
        "
      >
        <input
          value={url}
          readOnly
          className="
            flex-1 rounded-xl
            border border-zinc-700
            bg-zinc-950 p-3
            text-sm text-zinc-300
          "
        />

        <button
          onClick={copyLink}
          className="
            rounded-xl
            bg-white px-4 py-2
            text-black
          "
        >
          Copy
        </button>
      </div>
    </div>
  );
}