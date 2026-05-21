"use client";

interface SpendInputProps {
  value: number;
  onChange: (value: number) => void;
}

export function SpendInput({
  value,
  onChange,
}: SpendInputProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm text-zinc-400">
        Monthly Spend ($)
      </label>

      <input
        type="number"
        min={0}
        value={value}
        onChange={(e) =>
          onChange(Number(e.target.value))
        }
        className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-white outline-none focus:border-zinc-600"
      />
    </div>
  );
}