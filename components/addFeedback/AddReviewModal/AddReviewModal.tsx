"use client";

import clsx from "clsx";
import css from "./AddReviewModal.module.css";
import Modal from "../../ui/Modal/Modal";
import AddReviewForm from "../../forms/AddReviewForm/AddReviewForm";
import { useState } from "react";
import { AddReviewFormValues } from "@/components/forms/AddReviewForm/AddReviewForm";
import { fetchCreatedReviews } from "@/lib/api/clientApi";
import { ApiError } from "@/lib/api/clientApi";
import showToast, { showError } from "@/components/ui/Toast/Toast";
import AuthErrorModal from "../AuthErrorModal/AuthErrorModal";

import { useQueryClient } from "@tanstack/react-query";

interface AddReviewBlockProps {
  onClose: () => void;
  isOpen: boolean;
  locationId: string;
}

export default function AddReviewBlock({
  onClose,
  isOpen,
  locationId,
}: AddReviewBlockProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showAuthErrorModal, setShowAuthErrorModal] = useState(false);

  const queryClient = useQueryClient();

  const handleSubmit = async (values: AddReviewFormValues) => {
    setIsLoading(true);
    try {
      await fetchCreatedReviews(locationId, values);

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["feedbacks", locationId] }),
        queryClient.invalidateQueries({ queryKey: ["location", locationId] }),
      ]);

      onClose();
      showToast("Відгук відправлено на модерацію", "communication");
    } catch (e) {
      const status = (e as ApiError)?.response?.status;
      if (status === 401) {
        setShowAuthErrorModal(true);
        return;
      }
      showError(
        (e as ApiError)?.response?.data?.message ??
          "Не вдалося надіслати відгук",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuthClose = () => {
    setShowAuthErrorModal(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {!showAuthErrorModal && (
        <Modal onClose={onClose}>
          <div className={clsx(css.add_review_block)}>
            <h1 className={clsx(css.title)}>Залишити відгук</h1>
            <AddReviewForm
              onSubmit={handleSubmit}
              onCancel={onClose}
              isLoading={isLoading}
            />
          </div>
        </Modal>
      )}
      {showAuthErrorModal && <AuthErrorModal onClose={handleAuthClose} />}
    </>
  );
}
