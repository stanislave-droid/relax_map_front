"use client";

import { ReactNode } from "react";
import { createPortal } from "react-dom";
import Icon from "@/components/ui/Icon/Icon";
import css from "./Modal.module.css";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
  className?: string;
}

const Modal = ({ children, onClose, className }: ModalProps) => {
  return createPortal(
    <div className={css.backdrop} onClick={onClose}>
      <div
        className={`${css.modal} ${className ?? ""}`}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className={css.closeButton}
          onClick={onClose}
          aria-label="Закрити"
        >
          <Icon name="close" />
        </button>

        {children}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
