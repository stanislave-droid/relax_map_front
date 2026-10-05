import Image from "next/image";
import Link from "@/components/ui/Link/Link";
import RatingStars from "@/components/ui/RatingStars/RatingStars";
import css from "./LocationInfoBlock.module.css";

interface LocationInfoBlockProps {
  name: string;
  rating: number;
  region: string;
  type: string;
  imageUrl: string;
  author: {
    id: string;
    name: string;
    avatarUrl: string | null;
  };
}

export default function LocationInfoBlock({
  name,
  rating,
  region,
  type,
  imageUrl,
  author,
}: LocationInfoBlockProps) {
  return (
    <section className={css.locationInfo}>
      <div className={css.content}>
        <div className={css.meta}>
          <div className={css.rating}>
            <RatingStars value={rating} className={css.ratingStars} />
            <span>{rating}</span>
          </div>

          <h1 className={css.title}>{name}</h1>

          <p className={css.detail}>
            <strong>Регіон:</strong> {region}
          </p>

          <p className={css.detail}>
            <strong>Тип локації:</strong> {type}
          </p>

          <div className={css.author}>
            <strong className={css.authorLabel}>Автор статті:</strong>

            <Link href={`/profile/${author.id}`} className={css.authorLink}>
              {author.avatarUrl && (
                <Image
                  src={author.avatarUrl}
                  alt={author.name}
                  width={32}
                  height={32}
                  className={css.avatar}
                />
              )}

              <span>{author.name}</span>
            </Link>
          </div>
        </div>

        <div className={css.imageWrapper}>
          <Image
            src={imageUrl}
            alt={name}
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 1439px) 100vw, 50vw"
            className={css.image}
            priority
          />
        </div>
      </div>
    </section>
  );
}
