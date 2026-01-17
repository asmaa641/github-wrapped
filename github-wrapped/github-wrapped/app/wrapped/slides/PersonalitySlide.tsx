"use client";

import { motion } from "framer-motion";
import SlideLayout from "../components/SlideLayout";
import { container, fadeUp, bigReveal } from "../components/reveal";

export default function PersonalitySlide({
  personality,
  personalityDescription,
}: {
  personality: string;
  personalityDescription: string;
}) {
  return (
    <SlideLayout title="Your coding style">
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        style={{ display: "flex", flexDirection: "column", gap: 24 }}
      >
        <motion.p variants={fadeUp} style={tease}>
          Based on how you coded this year…
        </motion.p>

        <motion.p variants={fadeUp} style={tease}>
          One pattern stood out.
        </motion.p>

        <motion.h1 variants={bigReveal} style={personalityStyle}>
          {personality}
        </motion.h1>

        <motion.p variants={fadeUp} style={description}>
          {personalityDescription}
        </motion.p>
      </motion.div>
    </SlideLayout>
  );
}

const tease: React.CSSProperties = {
  fontSize: 22,
  color: "#8b949e",
};

const personalityStyle: React.CSSProperties = {
  fontSize: 48,
  fontWeight: 900,
};

const description: React.CSSProperties = {
  fontSize: 18,
  color: "#8b949e",
  maxWidth: 640,
};
