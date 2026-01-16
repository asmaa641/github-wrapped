import SlideLayout from "../components/SlideLayout";

type Props = {
  username: string;
  commits: number;
  stars: number;
  topLanguages: string[];
  personality: string;
};

export default function SummarySlide({
  username,
  commits,
  stars,
  topLanguages,
  personality,
}: Props) {
  return (
    <SlideLayout title="Year in review">
      <h1
        style={{
          fontSize: "40px",
          fontWeight: 800,
          lineHeight: 1.2,
          marginBottom: "24px",
        }}
      >
        {username}, this was your GitHub year.
      </h1>

      <p
        style={{
          fontSize: "20px",
          color: "#8b949e",
          maxWidth: "640px",
          marginBottom: "24px",
        }}
      >
        You made <strong style={{ color: "#e6edf3" }}>{commits}</strong>{" "}
        meaningful contributions, earned{" "}
        <strong style={{ color: "#e6edf3" }}>{stars}</strong> stars from the
        community, and worked primarily with{" "}
        <strong style={{ color: "#e6edf3" }}>
          {topLanguages.join(", ")}
        </strong>
        .
      </p>

      <p
        style={{
          fontSize: "22px",
          fontWeight: 600,
        }}
      >
        Your coding style this year can be summed up as:
      </p>

      <p
        style={{
          fontSize: "32px",
          fontWeight: 800,
          marginTop: "8px",
        }}
      >
        {personality}
      </p>

      <p
        style={{
          fontSize: "16px",
          color: "#8b949e",
          marginTop: "32px",
        }}
      >
        Thanks for building, sharing, and shipping code in 2025.
      </p>
    </SlideLayout>
  );
}
