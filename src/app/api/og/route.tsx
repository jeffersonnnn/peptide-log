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
          background: "linear-gradient(135deg, #151515 0%, #1B1B1B 50%, #151515 100%)",
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
              background: "linear-gradient(135deg, #A7B4BA, #E4E2D8)",
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
          <span style={{ color: "#E4E2D8" }}>Peptide</span>
          <span style={{ color: "#9B9B9B" }}>Log</span>
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
                  background: "rgba(228, 226, 216, 0.06)",
                  border: "1px solid rgba(224, 232, 236, 0.3)",
                  borderRadius: "999px",
                  padding: "10px 24px",
                  color: "#E4E2D8",
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
