"use client";

import { useState } from "react";
import clsx from "clsx";

import "../common.module.css";
import css from "./Select.module.css";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export default function Select({ onInput, className, children, ...props }: SelectProps): React.ReactNode {
  const [validationError, setValidationError] = useState<string>("");

  // See: https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/badInput#detecting_bad_input
  function handleInput(ev: React.InputEvent<HTMLSelectElement>) {
    const input = ev.currentTarget;
    input.reportValidity();
    setValidationError(input.validity.valid ? "" : input.validationMessage);
    if (onInput) onInput(ev);
  }

  return (
    <div className={clsx(css["wrapper"], className)}>
      <select {...props} className={clsx(css["select"], className)} onInput={handleInput}>
        {children}
      </select>
      {validationError && <p className={css["validity"]}>{validationError}</p>}
    </div>
  );
}
