export default function Loading() {
  return (
    <main
      style={{
        height: "100vh",
        backgroundColor: "#0d1117",
        color: "#e6edf3",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: "900px",
          padding: "40px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "24px",
        }}
      >
        <h2
          style={{
            color: "#8b949e",
            fontSize: "18px",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          GitHub Wrapped
        </h2>

        <h1
          style={{
            fontSize: "48px",
            fontWeight: 800,
            lineHeight: 1.1,
          }}
        >
          Crunching your
          <br />
          GitHub stats…
        </h1>

        <p
          style={{
            fontSize: "20px",
            color: "#8b949e",
            maxWidth: "520px",
          }}
        >
          This may take a few seconds. We’re analyzing your year in code.
        </p>

        <p
          style={{
            fontSize: "14px",
            color: "#8b949e",
            marginTop: "8px",
          }}
        >
          Please don’t refresh ⏳
        </p>
      </section>
    </main>
  );
}
