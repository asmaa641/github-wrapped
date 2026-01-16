import SlideLayout from "../components/SlideLayout";

export default function IntroSlide({ username }: { username: string }) {
  return (
    <SlideLayout>
      <h1
        style={{
          fontSize: "56px",
          fontWeight: 800,
          marginBottom: "16px",
        }}
      >
        GitHub Wrapped 🎁
      </h1>

      <p style={{ fontSize: "24px", color: "#8b949e" }}>
        {username}, here’s your coding year in review.
      </p>
    </SlideLayout>
  );
}
