import Spinner from "@/components/ui/Spinner/Spinner";
import css from "./loading-page.module.css";
import clsx from "clsx";

export default function LoadingPage() {
  return (
    <div className={clsx("container", css.wrapper)}>
      <p className={css.loading}>Page is loading, please wait a bit...</p>
      <Spinner />
    </div>
  );
}
