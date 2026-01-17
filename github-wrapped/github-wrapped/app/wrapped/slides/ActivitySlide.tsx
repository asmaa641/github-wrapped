"use client";

import { motion } from "framer-motion";
import SlideLayout from "../components/SlideLayout";
import { container, fadeUp, bigReveal } from "../components/reveal";

export default function ActivitySlide({
  mostActiveDay,
  mostActiveDayCount,
}: {
  mostActiveDay: string;
  mostActiveDayCount: number;
}) {
  const day = new Date(mostActiveDay).toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <SlideLayout title="Your peak moment">
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        style={{ display: "flex", flexDirection: "column", gap: 20 }}
      >
        <motion.p variants={fadeUp} style={tease}>
          There was one day…
        </motion.p>

        <motion.p variants={fadeUp} style={tease}>
          …where everything clicked.
        </motion.p>

        <motion.div variants={bigReveal} style={bigText}>
          {day}
        </motion.div>

        <motion.p variants={fadeUp} style={caption}>
          {mostActiveDayCount} contributions in one day
        </motion.p>
      </motion.div>
    </SlideLayout>
  );
}

const tease: React.CSSProperties = {
  fontSize: 22,
  color: "#8b949e",
};

const bigText: React.CSSProperties = {
  fontSize: 36,
  fontWeight: 800,
};

const caption: React.CSSProperties = {
  fontSize: 16,
  color: "#8b949e",
};
