type Props = {
  title?: string;
  children: React.ReactNode;
};

export default function SlideLayout({ title, children }: Props) {
  return (
    <section
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        maxWidth: "900px",
        margin: "0 auto",
        padding: "40px",
      }}
    >
      {title && (
        <h2
          style={{
            color: "#8b949e",
            fontSize: "18px",
            fontWeight: 500,
            marginBottom: "16px",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          {title}
        </h2>
      )}

      {children}
    </section>
  );
}
