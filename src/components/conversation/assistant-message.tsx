interface AssistantMessageProps {
  content: string;
}

export function AssistantMessage({
  content,
}: AssistantMessageProps) {
    return (
        <div className="flex justify-start">
        <div
            className="
            max-w-[80%] rounded-2xl
            bg-zinc-800 px-4 py-3
            text-sm text-white
            "
        >
            {content}
        </div>
        </div>
    );
}