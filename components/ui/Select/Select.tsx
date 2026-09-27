"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

import SlimSelect from "slim-select";
import "slim-select/styles";

import "../common.module.css";
import css from "./Select.module.css";

const slimSelectStyles = {
  main: css["select-main"],
  mainOpen: css["select-main--open"],
  placeholder: css["select-placeholder"],

  content: css["select-content"],
  contentOpen: css["select-content--open"],

  list: css["select-list"],

  option: css["select-option"],
  highlighted: css["select-option--highlighted"],
  selected: css["select-option--selected"],
};

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export default function Select({ children, className, onInput, ...props }: SelectProps): React.ReactNode {
  const select = useRef<HTMLSelectElement | null>(null);
  const [validationError, setValidationError] = useState<string>("");

  // See: https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/badInput#detecting_bad_input
  function handleInput(ev: React.InputEvent<HTMLSelectElement>) {
    const input = ev.currentTarget;
    input.reportValidity();
    setValidationError(input.validity.valid ? "" : input.validationMessage);
    if (onInput) onInput(ev);
  }

  useEffect(() => {
    if (!select) return;

    new SlimSelect({
      select: select.current as Element,
      cssClasses: slimSelectStyles,
      settings: {
        showSearch: false,
      },
    });
  });

  return (
    <div className={clsx(css["wrapper"], className)}>
      <select {...props} ref={select} onInput={handleInput}>
        {children}
      </select>
      {/* Not sure if this is needed, but just in case */}
      {validationError && <p className={css["validity"]}>{validationError}</p>}
    </div>
  );
}
