interface SubmitButtonProps {
  loading?: boolean;
  disabled?: boolean;
}

export function SubmitButton({
  loading = false,
  disabled = false,
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={loading || disabled}
      className="
        w-full rounded-xl bg-white px-4 py-3
        font-medium text-black transition-all
        hover:opacity-90
        disabled:cursor-not-allowed
        disabled:opacity-50
      "
    >
      {loading
        ? "Generating Audit..."
        : "Generate Audit"}
    </button>
  );
}