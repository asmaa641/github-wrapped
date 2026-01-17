"use client";

import { motion } from "framer-motion";
import SlideLayout from "../components/SlideLayout";
import AnimatedNumber from "../components/AnimatedNumber";
import { container, fadeUp, bigReveal } from "../components/reveal";

export default function CommitsSlide({ commits }: { commits: number }) {
  return (
    <SlideLayout title="Your year in code">
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        style={{ display: "flex", flexDirection: "column", gap: 20 }}
      >
        <motion.p variants={fadeUp} style={tease}>
          You showed up to code.
        </motion.p>

        <motion.p variants={fadeUp} style={tease}>
          Again. And again.
        </motion.p>

        <motion.div variants={bigReveal} style={bigNumber}>
          <AnimatedNumber value={commits} />
        </motion.div>

        <motion.p variants={fadeUp} style={caption}>
          Commits that counted as GitHub contributions in 2025
        </motion.p>
      </motion.div>
    </SlideLayout>
  );
}

const tease: React.CSSProperties = {
  fontSize: 22,
  color: "#8b949e",
};

const bigNumber: React.CSSProperties = {
  fontSize: 96,
  fontWeight: 900,
  color: "#58a6ff",
};

const caption: React.CSSProperties = {
  fontSize: 16,
  color: "#8b949e",
};
