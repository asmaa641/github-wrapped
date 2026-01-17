"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { WrappedData } from "./page";

import IntroSlide from "./slides/IntroSlide";
import CommitsSlide from "./slides/CommitsSlide";
import StarsSlide from "./slides/StarsSlide";
import LanguagesSlide from "./slides/LanguageSlide";
import ActivitySlide from "./slides/ActivitySlide";
import PersonalitySlide from "./slides/PersonalitySlide";
import SummarySlide from "./slides/SummarySlide";

import ProgressBar from "./components/ProgressBar";

export default function WrappedSlides({ data }: { data: WrappedData }) {
  const slides = [
    <IntroSlide key="intro" username={data.username} />,
    <CommitsSlide key="commits" commits={data.commits} />,
    <StarsSlide key="stars" stars={data.stars} />,
    <LanguagesSlide key="languages" languages={data.topLanguages} />,
    <ActivitySlide
      key="activity"
      mostActiveDay={data.mostActiveDay}
      mostActiveDayCount={data.mostActiveDayCount}
    />,
    <PersonalitySlide
      key="personality"
      personality={data.personality}
      personalityDescription={data.personalityDescription}
    />,
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
  const [direction, setDirection] = useState(1);

  const next = () => {
    if (index < slides.length - 1) {
      setDirection(1);
      setIndex(index + 1);
    }
  };

  const prev = () => {
    if (index > 0) {
      setDirection(-1);
      setIndex(index - 1);
    }
  };

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
      {/* Progress bar */}
      <ProgressBar current={index} total={slides.length} />

      {/* Slide stage */}
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            style={{ position: "absolute", inset: 0 }}
          >
            {slides[index]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer nav */}
      <footer
        style={{
          height: 72,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 40px",
          borderTop: "1px solid #30363d",
        }}
      >
        <button onClick={prev} disabled={index === 0} style={navButton}>
          ← Back
        </button>

        <span style={{ color: "#8b949e", fontSize: 14 }}>
          {index + 1} / {slides.length}
        </span>

        <button
          onClick={next}
          disabled={index === slides.length - 1}
          style={navButton}
        >
          Next →
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
  borderRadius: 999,
  fontSize: 14,
};
