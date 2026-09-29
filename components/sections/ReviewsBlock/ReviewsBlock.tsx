import { Suspense } from "react";
import Spinner from "@/components/ui/Spinner/Spinner";
import css from "./ReviewsBlock.module.css";
import ReviewsList from "./ReviewsList";

interface ReviewsBlockProps {
  title?: string;
}

const ReviewsBlock = ({ title }: ReviewsBlockProps) => {
  return (
    <section className={css.reviews}>
      <div className="container">
        {title && <h2 className={css.title}>{title}</h2>}

        <Suspense fallback={<Spinner />}>
          <ReviewsList />
        </Suspense>
      </div>
    </section>
  );
};

export default ReviewsBlock;
