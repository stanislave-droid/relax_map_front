import css from "./LogoutModal.module.css";
import Button from "@/components/ui/Button/Button";
import Icon from "@/components/ui/Icon/Icon";

const LogoutModal = () => {
  return (
    <div className={css.backdrop}>
      <div className={css.modal}>
        <button type="button" className={css.closeButton} aria-label="Закрити">
          <Icon name="close" />
        </button>
        <div className={css.content}>
          <h2 className={css.title}>Ви точно хочете вийти?</h2>
          <p className={css.text}>Ми будемо сумувати за вами!</p>
        </div>
        <div className={css.actions}>
          <Button variant="secondary">Відмінити</Button>

          <Button variant="primary">Вийти</Button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
