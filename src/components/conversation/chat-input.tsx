"use client";

import { useState } from "react";

interface ChatInputProps {
  onSend: (
    value: string
  ) => void;
}

export function ChatInput({
  onSend,
}: ChatInputProps) {
    const [value, setValue] =
        useState("");

    function handleSubmit(
        e: React.FormEvent
    ) {
        e.preventDefault();

        if (!value.trim()) return;

        onSend(value);

        setValue("");
    }

    return (
        <form
        onSubmit={handleSubmit}
        className="flex gap-3"
        >
        <input
            type="text"
            value={value}
            onChange={(e) =>
            setValue(e.target.value)
            }
            placeholder="Type your answer..."
            className="
            flex-1 rounded-xl border
            border-zinc-700 bg-zinc-900
            px-4 py-3 text-white
            outline-none
            "
        />

        <button
            type="submit"
            className="
            rounded-xl bg-white
            px-5 py-3 font-medium
            text-black
            "
        >
            Send
        </button>
        </form>
    );
}