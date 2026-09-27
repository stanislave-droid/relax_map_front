import css from "./LogoutModal.module.css";
import Button from "@/components/ui/Button/Button";
import Modal from "@/components/ui/Modal/Modal";

interface LogoutModalProps {
  onClose: () => void;
}

const LogoutModal = ({ onClose }: LogoutModalProps) => {
  return (
    <Modal onClose={onClose} className={css.modal}>
      <div className={css.content}>
        <h2 className={css.title}>Ви точно хочете вийти?</h2>
        <p className={css.text}>Ми будемо сумувати за вами!</p>
      </div>

      <div className={css.actions}>
        <Button variant="secondary" onClick={onClose}>
          Відмінити
        </Button>

        <Button variant="primary">Вийти</Button>
      </div>
    </Modal>
  );
};

export default LogoutModal;
