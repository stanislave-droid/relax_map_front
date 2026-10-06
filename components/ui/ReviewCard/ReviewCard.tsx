import Link from "next/link";
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
  const { rate, description, userName, ownerId, locationId } = feedback;

  return (
    <article className={css.card}>
      <RatingStars value={rate} />
      <p className={css.text}>{description}</p>
      <div className={css.authorInfo}>
        {ownerId ? (
          <Link href={`/profile/${ownerId}`} className={css.author}>
            {userName}
          </Link>
        ) : (
          <p className={css.author}>{userName}</p>
        )}

        {showLocation && locationId?.name && (
          <Link href={`/locations/${locationId._id}`} className={css.location}>
            {locationId.name}
          </Link>
        )}
      </div>
    </article>
  );
}
