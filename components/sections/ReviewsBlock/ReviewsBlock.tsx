import { Feedback } from "@/types/feedback";
import ReviewsBlockClient from "./ReviewsBlockClient";
import css from "./ReviewsBlock.module.css";

interface ReviewsBlockProps {
  title: string;
  feedbacks: Feedback[];
  showLocation?: boolean;
<<<<<<< HEAD
=======
  action?: React.ReactNode;
>>>>>>> 2d40f6eb220ae7e370cda688be6d7e43ce1586f3
}

const ReviewsBlock = ({
  title,
  feedbacks,
  showLocation = false,
<<<<<<< HEAD
=======
  action,
>>>>>>> 2d40f6eb220ae7e370cda688be6d7e43ce1586f3
}: ReviewsBlockProps) => {
  return (
    <section className={css.reviews}>
      <div className="container">
<<<<<<< HEAD
        <h2 className={css.title}>{title}</h2>
=======
        <div className={css.header}>
          <h2 className={css.title}>{title}</h2>
          {action}
        </div>
>>>>>>> 2d40f6eb220ae7e370cda688be6d7e43ce1586f3

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
