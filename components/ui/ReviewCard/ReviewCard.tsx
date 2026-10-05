import RatingStars from "../RatingStars/RatingStars";
import { Feedback } from "@/types/feedback";
import css from "./ReviewCard.module.css";

interface ReviewCardProps {
  feedback: Feedback;
  showLocation?: boolean;
}

export default function ReviewCard({
  feedback,
  showLocation = false,
}: ReviewCardProps) {
  const { rate, description, userName, locationId } = feedback;

  return (
    <article className={css.card}>
      <RatingStars value={rate} />
      <p className={css.text}>{description}</p>
      <div className={css.authorInfo}>
        <p className={css.author}>{userName}</p>
        {showLocation && locationId?.name && (
          <p className={css.location}>{locationId.name}</p>
        )}
      </div>
    </article>
  );
}
