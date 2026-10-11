"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

import SlimSelect from "slim-select";
import "slim-select/styles";

import "../common.module.css";
import css from "./Select.module.css";
import { FieldProps } from "formik";

const slimSelectStyles = {
  main: css["select-main"],
  mainOpen: css["select-main--open"],
  placeholder: css["select-placeholder"],

  content: css["select-content"],
  contentOpen: css["select-content--open"],
  dirAbove: css["select-content--above"],
  dirBelow: css["select-content--below"],

  list: css["select-list"],

  option: css["select-option"],
  highlighted: css["select-option--highlighted"],
  selected: css["select-option--selected"],
};

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export default function Select({ children, className, value, onInput, onChange, ...props }: SelectProps): React.ReactNode {
  const select = useRef<HTMLSelectElement | null>(null);
  const [validationError, setValidationError] = useState<string>("");

  // See: https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/badInput#detecting_bad_input
  function handleUpdate<EV>(callback?: (ev: EV) => void) {
    return (ev: EV) => {
      if (select.current) {
        const s = select.current;
        s.reportValidity();
        setValidationError(s.validity.valid ? "" : s.validationMessage);
      }
      if (callback) callback(ev);
    };
  }

  const [slimSelect, setSlimSelect] = useState<SlimSelect | null>(null);

  // Creating SlimSelect instance on first render.
  // We have to do this through `useEffect` to avoid recreating the instance on every render,
  // and `useMemo` does not work because we use a ref (`select.current`)
  useEffect(() => {
    if (!select.current) return;

    setSlimSelect(
      new SlimSelect({
        select: select.current,
        cssClasses: slimSelectStyles,
        settings: {
          showSearch: false,
        },
      }),
    );
  }, []);

  // SlimSelect does not update visual display when value of backing `<select>` changes,
  // so we have to do it manually
  useEffect(() => {
    if (!select.current) return;

    // Dancing around typing issues
    const v = (() => {
      switch (typeof value) {
        case "number":
          return select.current?.options[value].value;
        case "string":
          return value;
        case "object":
          return new Array(...value);
        default:
          return undefined;
      }
    })();

    slimSelect?.setSelected(v || "");
  }, [slimSelect, value]);

  return (
    <div className={clsx(css["wrapper"], className)}>
      <select {...props} ref={select} onInput={handleUpdate(onInput)} onChange={handleUpdate(onChange)}>
        {children}
      </select>
      {/* Not sure if this is needed, but just in case */}
      {validationError && <p className={css["validity"]}>{validationError}</p>}
    </div>
  );
}

// eslint-disable @typescript-eslint/no-unused-vars
/**
 * Usage: `<Field component={SelectFormik} name="..." id="...">{options}</Field>`
 */
export function SelectFormik({ field, form, ...props }: FieldProps) {
  return <Select {...field} {...props} />;
}
