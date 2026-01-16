import SlideLayout from "../components/SlideLayout";

export default function CommitsSlide({ commits }: { commits: number }) {
  return (
    <SlideLayout title="Your GitHub contributions">
      <div style={{ fontSize: "96px", fontWeight: 900, color: "#58a6ff" }}>
        {commits.toLocaleString()}
      </div>

      <p style={{ fontSize: "20px", color: "#8b949e" }}>
        Clearly, you were busy this year commiting away!
      </p>
    </SlideLayout>
  );
}
