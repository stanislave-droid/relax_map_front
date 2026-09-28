import toast from "react-hot-toast";
import "../common.module.css";
import css from "./Toast.module.css";
import Button from "../Button/Button";
import Icon, { IconName } from "../Icon/Icon";
import clsx from "clsx";

export type ToastStyle = "info" | "error";

interface ToastProps {
  children: React.ReactNode;
  icon?: IconName;
  onClose?: () => void;
}

function Toast({ onClose, icon, children }: ToastProps): React.ReactNode {
  return (
    <div className={clsx(css["toast"], !icon && css["toast--no-icon"])}>
      {icon && <Icon name={icon} className={css["icon"]}/>}
      <p className={css["message"]}>{children}</p>
      {onClose && (
        <Button variant="ghost" size="icon-sm" onClick={onClose} className={css["close-btn"]}>
          <Icon name="close" />
        </Button>
      )}
    </div>
  );
}

export default function showToast(message: string, icon?: IconName, style?: ToastStyle) {
  const toastId = toast(
    <Toast icon={icon} onClose={() => toast.dismiss(toastId)}>
      {message}
    </Toast>,
    {
      className: clsx(css["wrapper"], css[`wrapper--${style}`]),
    },
  );
}

export function showError(message: string) {
  showToast(message, "close", "error");
}
