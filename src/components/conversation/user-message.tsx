interface UserMessageProps {
  content: string;
}

export function UserMessage({
  content,
}: UserMessageProps) {
  return (
    <div className="flex justify-end">
      <div
        className="
          max-w-[80%] rounded-2xl
          bg-white px-4 py-3
          text-sm text-black
        "
      >
        {content}
      </div>
    </div>
  );
}