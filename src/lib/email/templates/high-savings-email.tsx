interface HighSavingsEmailProps {
  estimatedSavings: number;
}

export default function HighSavingsEmail({
  estimatedSavings,
}: HighSavingsEmailProps) {
  return (
    <div
      style={{
        fontFamily:
          "Arial, sans-serif",

        padding: "32px",

        background: "#0a0a0a",

        color: "#ffffff",
      }}
    >
      <h1>
        Significant Savings
        Identified
      </h1>

      <p>
        Your audit identified
        approximately $
        {estimatedSavings}
        /month in potential
        AI spend savings.
      </p>

      <p>
        Credex may be able to
        reduce costs even
        further using AI
        infrastructure
        credits.
      </p>

      <p>
        Our team may reach
        out shortly with
        additional
        recommendations.
      </p>

      <hr />

      <p
        style={{
          opacity: 0.7,
        }}
      >
        StackAudit · AI Spend
        Optimization
      </p>
    </div>
  );
}