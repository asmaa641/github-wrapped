import React from "react";

type Props = {
  username: string;
  commits: number;
  stars: number;
  topLanguages: string[];
  personality: string;
};

const ShareCard = React.forwardRef<HTMLDivElement, Props>(
  ({ username, commits, stars, topLanguages, personality }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          width: 1080,
          height: 1080,
          background:
            "radial-gradient(1200px 700px at top, #1f2937, #0d1117)",
          color: "#e6edf3",
          padding: 72,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont",
        }}
      >
        {/* Header */}
        <div>
          <p style={eyebrow}>GitHub Wrapped · 2025</p>
          <h1 style={usernameStyle}>{username}</h1>
        </div>

        {/* Personality block */}
        <div>
          <p style={sectionTitle}>Your coding personality</p>
          <h2 style={personalityStyle}>{personality}</h2>
          <p style={description}>
            This reflects how you approached coding this year — the kinds of
            problems you gravitated towards and the tools you trusted most.
          </p>
        </div>

        {/* Stats block */}
        <div>
          <p style={sectionTitle}>Your year in numbers</p>
          <div style={{ display: "flex", gap: 64 }}>
            <Stat
              label="Commits"
              value={commits}
              subtitle="Contributions you made across repositories"
            />
            <Stat
              label="Stars"
              value={stars}
              subtitle="Times your work was starred by others"
            />
          </div>
        </div>

        {/* Languages block */}
        <div>
          <p style={sectionTitle}>Languages you worked with most</p>
          <p style={languagesStyle}>
            {topLanguages.join(" · ")}
          </p>
          <p style={description}>
            These languages shaped most of your projects and problem-solving
            this year.
          </p>
        </div>

        {/* Footer */}
        <p style={footer}>
          Generated with GitHub Wrapped · A snapshot of your year in code
        </p>
      </div>
    );
  }
);

export default ShareCard;

/* ----------------- Small components ----------------- */

function Stat({
  label,
  value,
  subtitle,
}: {
  label: string;
  value: number;
  subtitle: string;
}) {
  return (
    <div style={{ maxWidth: 300 }}>
      <p style={statLabel}>{label}</p>
      <p style={statValue}>{value.toLocaleString()}</p>
      <p style={statSubtitle}>{subtitle}</p>
    </div>
  );
}

/* ----------------- Styles ----------------- */

const eyebrow: React.CSSProperties = {
  color: "#9ca3af",
  fontSize: 14,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  marginBottom: 12,
};

const usernameStyle: React.CSSProperties = {
  fontSize: 46,
  fontWeight: 800,
};

const sectionTitle: React.CSSProperties = {
  fontSize: 18,
  color: "#9ca3af",
  marginBottom: 8,
};

const personalityStyle: React.CSSProperties = {
  fontSize: 42,
  fontWeight: 900,
  lineHeight: 1.1,
};

const description: React.CSSProperties = {
  fontSize: 18,
  color: "#c9d1d9",
  maxWidth: 700,
  marginTop: 8,
};

const statLabel: React.CSSProperties = {
  fontSize: 16,
  color: "#9ca3af",
};

const statValue: React.CSSProperties = {
  fontSize: 36,
  fontWeight: 800,
};

const statSubtitle: React.CSSProperties = {
  fontSize: 16,
  color: "#c9d1d9",
};

const languagesStyle: React.CSSProperties = {
  fontSize: 28,
  fontWeight: 700,
};

const footer: React.CSSProperties = {
  fontSize: 14,
  color: "#9ca3af",
};
