import { InputHTMLAttributes } from "react";

import clsx from "clsx";
import styles from "./text-field.module.css";

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

export default function TextField({ className, ...rest }: Props) {
  return <input className={clsx(styles.input, className)} {...rest} />;
}
