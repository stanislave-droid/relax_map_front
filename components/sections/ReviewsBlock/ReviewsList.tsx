import { getAllFeedbacks } from "@/lib/api/serverApi";
import ReviewsBlockClient from "./ReviewsBlockClient";

const ReviewsList = async () => {
  const data = await getAllFeedbacks().catch(() => null);

  if (!data) {
    return <p>Не вдалося завантажити відгуки</p>;
  }

  if (data.feedbacks.length === 0) {
    return <p>Відгуків поки немає</p>;
  }

  return <ReviewsBlockClient feedbacks={data.feedbacks} />;
};

export default ReviewsList;
