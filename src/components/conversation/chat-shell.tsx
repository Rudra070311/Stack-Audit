interface ChatShellProps {
  children: React.ReactNode;
}

export function ChatShell({
  children,
}: ChatShellProps) {
    return (
        <div
        className="
            h-[600px] overflow-y-auto
            rounded-3xl border border-zinc-800
            bg-zinc-900/50 p-6
            backdrop-blur
        "
        >
        <div className="space-y-4">
            {children}
        </div>
        </div>
    );
}