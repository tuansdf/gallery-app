import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

import styles from "./button.module.css";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button({ children, className, ...rest }: Props) {
  return (
    <button className={clsx(styles.button, className)} {...rest}>
      {children}
    </button>
  );
}
