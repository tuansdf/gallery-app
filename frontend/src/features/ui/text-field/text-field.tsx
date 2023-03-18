import { InputHTMLAttributes, forwardRef } from "react";

import clsx from "clsx";
import styles from "./text-field.module.css";

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

const TextField = forwardRef<HTMLInputElement, Props>(
  ({ className, ...rest }, ref) => {
    return (
      <input className={clsx(styles.input, className)} {...rest} ref={ref} />
    );
  }
);

export default TextField;
