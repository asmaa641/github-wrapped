"use client";

import { motion } from "framer-motion";
import SlideLayout from "../components/SlideLayout";
import { container, fadeUp, bigReveal } from "../components/reveal";

export default function LanguagesSlide({
  languages,
}: {
  languages: string[];
}) {
  return (
    <SlideLayout title="Your tools">
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        style={{ display: "flex", flexDirection: "column", gap: 20 }}
      >
        <motion.p variants={fadeUp} style={tease}>
          Every developer has their favorites.
        </motion.p>

        <motion.p variants={fadeUp} style={tease}>
          Yours were pretty clear.
        </motion.p>

        <motion.div variants={bigReveal} style={languageList}>
          {languages.map((lang) => (
            <span key={lang}>{lang}</span>
          ))}
        </motion.div>

        <motion.p variants={fadeUp} style={caption}>
          Languages you worked with the most this year
        </motion.p>
      </motion.div>
    </SlideLayout>
  );
}

const tease: React.CSSProperties = {
  fontSize: 22,
  color: "#8b949e",
};

const languageList: React.CSSProperties = {
  fontSize: 36,
  fontWeight: 800,
  display: "flex",
  gap: 16,
  flexWrap: "wrap",
};

const caption: React.CSSProperties = {
  fontSize: 16,
  color: "#8b949e",
};
