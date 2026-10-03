"use client";

import { useRouter } from "next/navigation";
import Modal from "@/components/ui/Modal/Modal";
import Button from "@/components/ui/Button/Button";
import css from "./AuthErrorModal.module.css";

interface AuthErrorModalProps {
  onClose: () => void;
}

export default function AuthErrorModal({ onClose }: AuthErrorModalProps) {
  const router = useRouter();

  return (
    <Modal onClose={onClose} className={css.modal}>
      <div className={css.content}>
        <h2 className={css.title}>Помилка під час додавання відгуку</h2>
        <p className={css.text}>
          Щоб залишити відгук вам треба увійти, якщо ще немає облікового запису
          зареєструйтесь
        </p>
      </div>

      <div className={css.actions}>
        <Button variant="secondary" onClick={() => router.push("/sign-in")}>
          Увійти
        </Button>
        <Button variant="primary" onClick={() => router.push("/sign-up")}>
          Зареєструватись
        </Button>
      </div>
    </Modal>
  );
}
