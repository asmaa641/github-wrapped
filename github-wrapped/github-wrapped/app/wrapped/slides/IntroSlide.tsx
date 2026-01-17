"use client";

import { motion } from "framer-motion";
import SlideLayout from "../components/SlideLayout";
import { container, fadeUp, bigReveal } from "../components/reveal";

export default function IntroSlide({ username }: { username: string }) {
  return (
    <SlideLayout>
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        style={{ display: "flex", flexDirection: "column", gap: 24 }}
      >
        <motion.p variants={fadeUp} style={muted}>
          GitHub Wrapped
        </motion.p>

        <motion.h1 variants={bigReveal} style={headline}>
          {username},
          <br />
          this was your year in code.
        </motion.h1>

        <motion.p variants={fadeUp} style={muted}>
          Let’s take a look.
        </motion.p>
      </motion.div>
    </SlideLayout>
  );
}

const muted: React.CSSProperties = {
  fontSize: 18,
  color: "#8b949e",
};

const headline: React.CSSProperties = {
  fontSize: 52,
  fontWeight: 800,
  lineHeight: 1.1,
};
