import clsx from "clsx";
import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  HTMLAttributes,
} from "react";

import LoadingIcon from "@/features/icons/loading-icon";
import classes from "./button.module.css";

type ButtonComponent = "button" | "div" | "a";

type HTMLProps<T extends ButtonComponent> = T extends "button"
  ? ButtonHTMLAttributes<HTMLButtonElement>
  : T extends "div"
  ? HTMLAttributes<HTMLDivElement>
  : AnchorHTMLAttributes<HTMLAnchorElement>;

type Props<T extends ButtonComponent> = {
  loading?: boolean;
  variant?: "text" | "contained";
  color?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
  shape?: "circle" | "rectangle";
  component?: T;
} & HTMLProps<T>;

const Button = <T extends ButtonComponent>({
  children,
  className,
  loading,
  variant = "contained",
  color = "primary",
  size = "medium",
  shape = "rectangle",
  component = "button" as T,
  ...restProps
}: Props<T>) => {
  const Component = component;

  return (
    // @ts-ignore
    <Component
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
    </Component>
  );
};

export default Button;
