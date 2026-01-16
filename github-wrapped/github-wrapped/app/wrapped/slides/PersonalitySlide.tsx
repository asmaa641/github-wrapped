import SlideLayout from "../components/SlideLayout";

export default function PersonalitySlide({
  personality,
  personalityDescription,
}: {
  personality: string;
  personalityDescription: string;
}) {
  return (
    <SlideLayout title="Your coding personality">
      <h1 style={{ fontSize: "64px", fontWeight: 800 }}>
        {personality}
      </h1>

      <p style={{ fontSize: "22px", color: "#8b949e", marginTop: "12px" }}>
        {personalityDescription}
      </p>
    </SlideLayout>
  );
}
