import { InputHTMLAttributes, forwardRef, useId } from "react";

import clsx from "clsx";
import classes from "./text-field.module.css";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
  helperText?: string;
  error?: boolean;
  label?: string;
}

const TextField = forwardRef<HTMLInputElement, Props>(
  (
    { label, helperText, error, className, containerClassName, ...rest },
    ref
  ) => {
    const inputId = useId();

    return (
      <div
        className={clsx(
          classes["input-container"],
          { [classes["is-error"]]: error },
          containerClassName
        )}
      >
        {label ? (
          <label className={clsx(classes["label"])} htmlFor={inputId}>
            {label}
          </label>
        ) : null}
        <input
          id={inputId}
          className={clsx(classes["input"], className)}
          {...rest}
          ref={ref}
        />
        {helperText ? (
          <p className={clsx(classes["helper-text"])}>{helperText}</p>
        ) : null}
      </div>
    );
  }
);

export default TextField;
