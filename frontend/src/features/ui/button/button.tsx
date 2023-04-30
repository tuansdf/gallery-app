import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

import LoadingIcon from "@/features/icons/loading-icon";
import classes from "./button.module.css";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export default function Button({
  children,
  className,
  loading,
  ...restProps
}: Props) {
  return (
    <button
      className={clsx(
        classes["button"],
        { [classes["is-loading"]]: loading },
        className
      )}
      {...restProps}
    >
      {loading ? <LoadingIcon className={classes["icon"]} /> : null}
      {children}
    </button>
  );
}
