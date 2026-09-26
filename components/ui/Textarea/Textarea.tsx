"use client";

import { useState } from "react";
import clsx from "clsx";

import "../common.module.css";
import css from "./Textarea.module.css";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function Textarea({ onInput, className, ...props }: TextareaProps): React.ReactNode {
  const [validationError, setValidationError] = useState<string>("");

  // See: https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/badInput#detecting_bad_input
  function handleInput(ev: React.InputEvent<HTMLTextAreaElement>) {
    const input = ev.currentTarget;
    input.reportValidity();
    setValidationError(input.validity.valid ? "" : input.validationMessage);
    if (onInput) onInput(ev);
  }

  return (
    <div className={clsx(css["wrapper"], className)}>
      <textarea {...props} className={css["textarea"]} onInput={handleInput}></textarea>
      {validationError && <p className={css["validity"]}>{validationError}</p>}
    </div>
  );
}