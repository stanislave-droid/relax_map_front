"use client";

import { useId, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import Button from "@/components/ui/Button/Button";
import Spinner from "@/components/ui/Spinner/Spinner";
import Icon from "@/components/ui/Icon/Icon"; // ті ж іконки, що в RatingStars
import Textarea from "@/components/ui/Textarea/Textarea"; // аналог Input, але multiline
import css from "./AddReviewForm.module.css";

export type AddReviewFormValues = { rate: number; description: string };

const initialValues: AddReviewFormValues = { rate: 0, description: "" };

const addReviewValidationSchema = Yup.object().shape({
  rate: Yup.number()
    .min(1, "Оберіть оцінку від 1 до 5")
    .max(5, "Оберіть оцінку від 1 до 5")
    .required("Оберіть оцінку"),
  description: Yup.string()
    .trim()
    .min(10, "Відгук має містити мінімум 10 символів")
    .max(1000, "Відгук має містити максимум 1000 символів")
    .required("Опишіть свої враження"),
});

export interface AddReviewFormProps {
  onSubmit: (values: {
    rate: number;
    description: string;
  }) => Promise<void> | void;
  onCancel?: () => void;
  isLoading?: boolean;
}

type StarRatingInputProps = {
  value: number;
  onChange: (v: number) => void;
  onBlur: () => void;
  disabled?: boolean;
  invalid?: boolean;
};

function StarRatingInput({
  value,
  onChange,
  onBlur,
  disabled,
  invalid,
}: StarRatingInputProps) {
  const [hovered, setHovered] = useState(0);
  const active = hovered || value;

  return (
    <div
      role="radiogroup"
      aria-label="Оцінка"
      aria-invalid={invalid}
      className={clsx(css.stars, invalid && css.starsInvalid)}
      onMouseLeave={() => setHovered(0)}
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= active;
        return (
          <button
            key={star}
            type="button"
            role="radio"
            aria-checked={value === star}
            aria-label={`Оцінка ${star} з 5`}
            disabled={disabled}
            className={clsx(css.star, filled && css.starActive)}
            onMouseEnter={() => !disabled && setHovered(star)}
            onMouseMove={() => !disabled && setHovered(star)}
            onFocus={() => !disabled && setHovered(star)}
            onBlur={() => {
              setHovered(0);
              onBlur();
            }}
            onClick={() => {
              onChange(star);
              setHovered(star);
            }}
          >
            <Icon
              name={filled ? "star_filled" : "star_empty"}
              width={32}
              height={32}
              aria-hidden="true"
            />
          </button>
        );
      })}
    </div>
  );
}

export default function AddReviewForm({
  onSubmit,
  onCancel,
  isLoading,
}: AddReviewFormProps) {
  const fieldId = useId();
  const description = `${fieldId}-description`;

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={addReviewValidationSchema}
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue, setFieldTouched }) => (
          <Form className={css.form} noValidate>
            <div className={css.field}>
              <label className={css.label} htmlFor={description}>
                Відгук*
              </label>
              <Field
                id={description}
                as={Textarea}
                name="description"
                placeholder="Напишіть нам відгук..."
                rows={5}
                maxLength={1000}
                className={css.textarea}
              />
              <ErrorMessage
                name="description"
                component="span"
                className={css.error}
              />
            </div>

            <div className={css.field}>
              <StarRatingInput
                value={values.rate}
                disabled={isLoading}
                onChange={(v) => {
                  setFieldValue("rate", v);
                  setFieldTouched("rate", true, false);
                }}
                onBlur={() => setFieldTouched("rate", true)}
              />
              <ErrorMessage
                name="rate"
                component="span"
                className={css.error}
              />
            </div>

            <div className={css.actions}>
              {onCancel && (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={onCancel}
                  disabled={isLoading}
                >
                  Відмінити
                </Button>
              )}

              <Button type="submit" disabled={isLoading}>
                {isLoading ? <Spinner size={24} /> : "Надіслати"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
