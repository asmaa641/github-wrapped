import SlideLayout from "../components/SlideLayout";
type Props = {
  languages: string[];
};

export default function LanguagesSlide({ languages }: Props) {
  return (
    <SlideLayout title="Your top languages">
      <h1 style={{ fontSize: "64px", fontWeight: 800 }}>
      <ul>
        {languages.map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
       </h1>
  </SlideLayout>
  );
}
