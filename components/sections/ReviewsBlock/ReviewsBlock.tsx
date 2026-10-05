import { Feedback } from "@/types/feedback";
import ReviewsBlockClient from "./ReviewsBlockClient";
import css from "./ReviewsBlock.module.css";

interface ReviewsBlockProps {
  title: string;
  feedbacks: Feedback[];
  showLocation?: boolean;
}

const ReviewsBlock = ({
  title,
  feedbacks,
  showLocation = false,
}: ReviewsBlockProps) => {
  return (
    <section className={css.reviews}>
      <div className="container">
        <h2 className={css.title}>{title}</h2>

        {feedbacks.length > 0 ? (
          <ReviewsBlockClient
            feedbacks={feedbacks}
            showLocation={showLocation}
          />
        ) : (
          <p>Відгуків поки немає</p>
        )}
      </div>
    </section>
  );
};

export default ReviewsBlock;
