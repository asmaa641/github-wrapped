import SlideLayout from "../components/SlideLayout";

export default function StarsSlide({ stars }: { stars: number }) {
  return (
    <SlideLayout title="Community impact">
        <p style={{ fontSize: "20px", color: "#8b949e" }}>
        Overall, you achieved...
      </p>
      <div style={{ fontSize: "96px", fontWeight: 900, color: "#f78166" }}>
        {stars.toLocaleString()}
      </div>

      <p style={{ fontSize: "20px", color: "#8b949e" }}>
        total stars across your repositories
      </p>
    </SlideLayout>
  );
}
