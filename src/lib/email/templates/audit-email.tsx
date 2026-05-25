interface AuditEmailProps {
  email: string;

  companyName?: string;

  role?: string;
}

export default function AuditEmail({
  email,

  companyName,

  role,
}: AuditEmailProps) {
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
        Your StackAudit Report
      </h1>

      <p>
        Thanks for using
        StackAudit.
      </p>

      <p>
        We generated your AI
        spend audit successfully.
      </p>

      {companyName && (
        <p>
          Company:
          {" "}
          {companyName}
        </p>
      )}

      {role && (
        <p>
          Role:
          {" "}
          {role}
        </p>
      )}

      <p>
        We’ll notify you if
        new savings or
        optimization
        opportunities appear.
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