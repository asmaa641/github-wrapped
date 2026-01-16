import Image from "next/image";

export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
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
          gap: "32px",
        }}
      >
        {/* Title (same as SlideLayout title style) */}
        <h2
          style={{
            color: "#8b949e",
            fontSize: "18px",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          2025 GitHub Wrapped
        </h2>

        {/* Main heading */}
        <h1
          style={{
            fontSize: "48px",
            fontWeight: 800,
            lineHeight: 1.1,
          }}
        >
          Your coding year,
          <br />
          visualized.
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "20px",
            color: "#8b949e",
            maxWidth: "520px",
          }}
        >
          Log in with your GitHub account to generate your personalized Wrapped.
        </p>

        {/* Login button */}
        <a
          href="/api/auth/login"
          style={{
            marginTop: "16px",
            width: "fit-content",
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            padding: "10px 20px",
            borderRadius: "999px",
            border: "1px solid #30363d",
            backgroundColor: "#161b22",
            color: "#e6edf3",
            fontWeight: 500,
            textDecoration: "none",
          }}
        >
          <Image
            src="/GITHUB-LOGO1.svg"
            alt="GitHub logo"
            width={32}
            height={32}
            style={{ filter: "invert(1)" }}
          />
          Log in with GitHub
        </a>
      </section>
    </div>
  );
}
