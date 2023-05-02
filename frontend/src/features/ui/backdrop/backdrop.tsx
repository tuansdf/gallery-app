import { HTMLAttributes } from "react";

import clsx from "clsx";
import classes from "./backdrop.module.css";

interface Props extends HTMLAttributes<HTMLDivElement> {}

const Backdrop = ({ className, ...restProps }: Props) => {
  return (
    <div className={clsx(classes["backdrop"], className)} {...restProps}></div>
  );
};

export default Backdrop;
