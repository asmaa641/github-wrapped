"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import * as htmlToImage from "html-to-image";
import SlideLayout from "../components/SlideLayout";
import ShareCard from "../components/ShareCard";
import { fadeUp } from "../components/reveal";

type Props = {
  username: string;
  commits: number;
  stars: number;
  topLanguages: string[];
  personality: string;
};

export default function SummarySlide({
  username,
  commits,
  stars,
  topLanguages,
  personality,
}: Props) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!cardRef.current) return;

    const dataUrl = await htmlToImage.toPng(cardRef.current, {
      pixelRatio: 2,
    });

    const link = document.createElement("a");
    link.download = "github-wrapped-2025.png";
    link.href = dataUrl;
    link.click();
  };

  return (
    <SlideLayout title="That’s a wrap">
      <motion.div
        initial="hidden"
        animate="visible"
        style={{ display: "flex", flexDirection: "column", gap: 24 }}
      >
        <motion.h1 variants={fadeUp} style={headline}>
          {username}, that was your year on GitHub.
        </motion.h1>

        <motion.p variants={fadeUp} style={paragraph}>
          You made <strong>{commits}</strong> contributions, earned{" "}
          <strong>{stars}</strong> stars from the community, and spent most of
          your time working with{" "}
          <strong>{topLanguages.join(", ")}</strong>.
        </motion.p>

        <motion.p variants={fadeUp} style={paragraph}>
          Your coding style this year can best be described as:
        </motion.p>

        <motion.h2 variants={fadeUp} style={personalityStyle}>
          {personality}
        </motion.h2>

        <motion.button
          variants={fadeUp}
          onClick={handleDownload}
          style={downloadButton}
        >
          Download your Wrapped
        </motion.button>
      </motion.div>

      {/* Hidden Share Image */}
      <div style={{ position: "absolute", left: "-9999px", top: 0 }}>
        <ShareCard
          ref={cardRef}
          username={username}
          commits={commits}
          stars={stars}
          topLanguages={topLanguages}
          personality={personality}
        />
      </div>
    </SlideLayout>
  );
}

const headline: React.CSSProperties = {
  fontSize: 40,
  fontWeight: 800,
};

const paragraph: React.CSSProperties = {
  fontSize: 20,
  color: "#8b949e",
  maxWidth: 700,
};

const personalityStyle: React.CSSProperties = {
  fontSize: 32,
  fontWeight: 900,
};

const downloadButton: React.CSSProperties = {
  marginTop: 16,
  width: "fit-content",
  padding: "10px 20px",
  borderRadius: 999,
  border: "1px solid #30363d",
  backgroundColor: "#161b22",
  color: "#e6edf3",
  fontWeight: 500,
  cursor: "pointer",
};
