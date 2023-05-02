import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

import LoadingIcon from "@/features/icons/loading-icon";
import classes from "./button.module.css";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: "text" | "contained";
  color?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
  shape?: "circle" | "rectangle";
}

export default function Button({
  children,
  className,
  loading,
  variant = "contained",
  color = "primary",
  size = "medium",
  shape = "rectangle",
  ...restProps
}: Props) {
  return (
    <button
      className={clsx(
        classes["button"],
        classes[`is-shape-${shape}`],
        classes[`is-variant-${variant}`],
        classes[`is-color-${color}`],
        classes[`is-size-${size}`],
        className
      )}
      {...restProps}
    >
      {loading ? <LoadingIcon className={classes["icon"]} /> : null}
      {children}
    </button>
  );
}
