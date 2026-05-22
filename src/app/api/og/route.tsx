import { ImageResponse } from "next/og";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0F0F14 0%, #1A1A2E 50%, #0F0F14 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "16px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
            }}
          >
            💉
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            fontSize: "72px",
            fontWeight: 700,
            letterSpacing: "-3px",
          }}
        >
          <span style={{ color: "#818CF8" }}>Peptide</span>
          <span style={{ color: "#E8E8ED" }}>Log</span>
        </div>

        <p
          style={{
            color: "rgba(232, 232, 237, 0.5)",
            fontSize: "28px",
            marginTop: "16px",
          }}
        >
          Free reconstitution calculator with visual syringe guide
        </p>

        <div
          style={{
            display: "flex",
            gap: "16px",
            marginTop: "40px",
          }}
        >
          {["Visual Syringe", "17 Peptides", "Stack Presets", "Free Forever"].map(
            (f) => (
              <div
                key={f}
                style={{
                  background: "rgba(79, 70, 229, 0.15)",
                  border: "1px solid rgba(79, 70, 229, 0.3)",
                  borderRadius: "999px",
                  padding: "10px 24px",
                  color: "#818CF8",
                  fontSize: "20px",
                }}
              >
                {f}
              </div>
            )
          )}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
