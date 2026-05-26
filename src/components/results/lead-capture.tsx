"use client";

import { useState } from "react";

export function LeadCapture() {
  const [email, setEmail] =
    useState("");

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    await fetch("/api/lead", {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        email,
      }),
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
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
        Get Full Report
      </h3>

      <div
        className="
          mt-4 flex gap-3
        "
      >
        <input
          type="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          className="
            flex-1 rounded-xl
            border border-zinc-700
            bg-zinc-950 p-3
            text-zinc-300
          "
        />

        <button
          type="submit"
          className="
            rounded-xl
            bg-white px-5 py-3
            text-black
          "
        >
          Submit
        </button>
      </div>
    </form>
  );
}