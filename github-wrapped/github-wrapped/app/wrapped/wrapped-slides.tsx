"use client";

import { useState } from "react";
import { WrappedData } from "./page";

import IntroSlide from "./slides/IntroSlide";
import CommitsSlide from "./slides/CommitsSlide";
import StarsSlide from "./slides/StarsSlide";
import LanguagesSlide from "./slides/LanguageSlide";
import PersonalitySlide from "./slides/PersonalitySlide";
import SummarySlide from "./slides/SummarySlide";


export default function WrappedSlides({ data }: { data: WrappedData }) {
  const slides = [
    <IntroSlide key="intro" username={data.username} />,
    <CommitsSlide key="commits" commits={data.commits} />,
    <StarsSlide key="stars" stars={data.stars} />,
    <LanguagesSlide key="languages" languages={data.topLanguages} />,
    <PersonalitySlide key="personality" personality={data.personality} personalityDescription={data.personalityDescription}/>,
    <SummarySlide
    key="summary"
    username={data.username}
    commits={data.commits}
    stars={data.stars}
    topLanguages={data.topLanguages}
    personality={data.personality}
  />,
  ];

  const [index, setIndex] = useState(0);

  return (
    <main
      style={{
        height: "100vh",
        backgroundColor: "#0d1117",
        color: "#e6edf3",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Slides */}
      <div style={{ flex: 1 }}>{slides[index]}</div>

      {/* Navigation */}
      <footer
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "24px 40px",
          borderTop: "1px solid #30363d",
        }}
      >
        <button
          onClick={() => setIndex((i) => Math.max(i - 1, 0))}
          disabled={index === 0}
          style={navButton}
        >
          Back
        </button>

        <span style={{ color: "#8b949e" }}>
          {index + 1} / {slides.length}
        </span>

        <button
          onClick={() =>
            setIndex((i) => Math.min(i + 1, slides.length - 1))
          }
          disabled={index === slides.length - 1}
          style={navButton}
        >
          Next
        </button>
      </footer>
    </main>
  );
}

const navButton: React.CSSProperties = {
  background: "transparent",
  border: "1px solid #30363d",
  color: "#e6edf3",
  padding: "8px 16px",
  borderRadius: "6px",
  cursor: "pointer",
};
