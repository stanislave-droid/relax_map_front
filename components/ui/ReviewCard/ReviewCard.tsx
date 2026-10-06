<<<<<<< HEAD
=======
import Link from "next/link";
>>>>>>> 2d40f6eb220ae7e370cda688be6d7e43ce1586f3
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
<<<<<<< HEAD
  const { rate, description, userName, locationId } = feedback;
=======
  const { rate, description, userName, ownerId, locationId } = feedback;
>>>>>>> 2d40f6eb220ae7e370cda688be6d7e43ce1586f3

  return (
    <article className={css.card}>
      <RatingStars value={rate} />
      <p className={css.text}>{description}</p>
      <div className={css.authorInfo}>
<<<<<<< HEAD
        <p className={css.author}>{userName}</p>
        {showLocation && locationId?.name && (
          <p className={css.location}>{locationId.name}</p>
=======
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
>>>>>>> 2d40f6eb220ae7e370cda688be6d7e43ce1586f3
        )}
      </div>
    </article>
  );
}
