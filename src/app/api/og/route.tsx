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
          background: "linear-gradient(135deg, #0A0A0B 0%, #141416 50%, #0A0A0B 100%)",
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
              background: "linear-gradient(135deg, #00C805, #24E634)",
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
          <span style={{ color: "#00C805" }}>Peptide</span>
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
                  background: "rgba(0, 200, 5, 0.15)",
                  border: "1px solid rgba(0, 200, 5, 0.3)",
                  borderRadius: "999px",
                  padding: "10px 24px",
                  color: "#00C805",
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
