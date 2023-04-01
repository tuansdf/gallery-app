import clsx from "clsx";
import { PropsWithChildren } from "react";
import styles from "./alert.module.css";

interface Props extends PropsWithChildren {
  variant: "danger" | "success" | "info";
}

const Alert = ({ variant, children }: Props) => {
  return (
    <div className={clsx(styles.main, styles[`is-${variant}`])}>{children}</div>
  );
};

export default Alert;
