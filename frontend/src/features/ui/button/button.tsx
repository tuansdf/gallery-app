import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

import styles from "./button.module.css";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export default function Button({
  children,
  className,
  isLoading,
  ...rest
}: Props) {
  return (
    <button className={clsx(styles.button, className)} {...rest}>
      {isLoading ? "Loading..." : children}
    </button>
  );
}
