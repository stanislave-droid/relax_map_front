import "../common.module.css";
import css from "./Spinner.module.css";
import { SpinnerDotted } from "spinners-react";

interface SpinnerProps {
  size?: number;
}

export default function Spinner({size = 48}: SpinnerProps): React.ReactNode {
  return <SpinnerDotted color="var(--color-coral)" size={size}/>;
}
