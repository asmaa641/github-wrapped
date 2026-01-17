"use client";

export default function ProgressBar({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  const progress = ((current + 1) / total) * 100;

  return (
    <div
      style={{
        height: 4,
        width: "100%",
        backgroundColor: "#161b22",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${progress}%`,
          backgroundColor: "#58a6ff",
          transition: "width 0.4s ease",
        }}
      />
    </div>
  );
}
