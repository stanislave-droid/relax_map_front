import clsx from "clsx";
import "../common.module.css";
import css from "./Button.module.css";

interface ButtonProps {
  type?: "submit" | "reset" | "button";
  onClick?: () => void;
  children: React.ReactNode;

  disabled?: boolean;
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export default function Button({ type, onClick, children, disabled, className, variant = "primary", size = "md" }: ButtonProps): React.ReactNode {
  const variantClass = css[`button--variant-${variant}`];
  const sizeClass = css[`button--size-${size}`];

  return (
    <button className={clsx(css.button, variantClass, sizeClass, className)} disabled={disabled} type={type} onClick={onClick}>
      {children}
    </button>
  );
}
