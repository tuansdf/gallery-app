import clsx from "clsx";
import { HTMLAttributes, PropsWithChildren } from "react";

import CheckCircleIcon from "@/features/icons/check-circle-icon";
import ExclamationCircleIcon from "@/features/icons/exclamation-circle-icon";
import classes from "./alert.module.css";

interface Props extends PropsWithChildren, HTMLAttributes<HTMLDivElement> {
  severity: "error" | "success" | "info";
}

const Alert = ({ severity, className, children }: Props) => {
  return (
    <div
      className={clsx(classes["alert"], classes[`is-${severity}`], className)}
    >
      {severity === "error" || severity === "info" ? (
        <ExclamationCircleIcon className={classes["icon"]} />
      ) : null}
      {severity === "success" ? (
        <CheckCircleIcon className={classes["icon"]} />
      ) : null}
      <span>{children}</span>
    </div>
  );
};

export default Alert;
