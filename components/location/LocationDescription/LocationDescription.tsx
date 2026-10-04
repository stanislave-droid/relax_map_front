import css from "./LocationDescription.module.css";

interface LocationDescriptionProps {
  description: string;
}

export default function LocationDescription({
  description,
}: LocationDescriptionProps) {
  const paragraphs = description
    .split(/\n\s*\n/)
    .filter((paragraph) => paragraph.trim());

  return (
    <div className={css.description}>
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph.trim()}</p>
      ))}
    </div>
  );
}
