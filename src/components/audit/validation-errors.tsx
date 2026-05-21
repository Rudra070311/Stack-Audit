interface ValidationErrorsProps {
  message?: string;
}

export function ValidationErrors({
  message,
}: ValidationErrorsProps) {
  if (!message) return null;

  return (
    <p className="text-sm text-red-400">
      {message}
    </p>
  );
}