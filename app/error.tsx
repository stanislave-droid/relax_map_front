"use client";

import css from "./error-page.module.css";
import Icon from "@/components/ui/Icon/Icon";

export default function ErrorPage({ error }: { error: Error }) {
  return (
    <div className={css.wrapper}>
      <p className={css.errorText}>
        Error occured while loading:
        <span className={css.errorMessage}> {error.message}</span>
      </p>
      <Icon name="error" className={css.errorIcon} />
    </div>
  );
}
