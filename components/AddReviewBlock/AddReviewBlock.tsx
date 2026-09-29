import clsx from "clsx";
import css from "./AddReviewBlock.module.css";
import Modal from "../ui/Modal/Modal";
import AddReviewForm from "../forms/AddReviewForm/AddReviewForm";

interface AddReviewBlockProps {
  onClose: () => void;
}

export default function AddReviewBlock({ onClose }: AddReviewBlockProps) {
  return (
    <Modal onClose={onClose}>
      <div className={clsx(css.add_review_block)}>
        <h1 className={clsx(css.title)}>Залишити відгук</h1>
        <AddReviewForm
          onSubmit={(values) => console.log(values)}
          onCancel={() => console.log("cancelled")}
          isLoading={false}
        />
      </div>
    </Modal>
  );
}
