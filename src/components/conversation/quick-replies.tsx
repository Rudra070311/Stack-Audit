interface QuickRepliesProps {
  replies: string[];

  onSelect: (
    value: string
  ) => void;
}

export function QuickReplies({
  replies,
  onSelect,
}: QuickRepliesProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {replies.map((reply) => (
        <button
          key={reply}
          onClick={() =>
            onSelect(reply)
          }
          className="
            rounded-xl border border-zinc-700
            bg-zinc-900 px-4 py-2
            text-sm text-white transition
            hover:border-zinc-500
          "
        >
          {reply}
        </button>
      ))}
    </div>
  );
}