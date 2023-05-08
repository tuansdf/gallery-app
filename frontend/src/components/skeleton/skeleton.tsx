import clsx from "clsx";
import { HTMLAttributes } from "react";

import classes from "./skeleton.module.css";

interface Props extends HTMLAttributes<HTMLDivElement> {}

const Skeleton = ({ className, ...restProps }: Props) => {
  return (
    <div className={clsx(classes["skeleton"], className)} {...restProps}></div>
  );
};

export default Skeleton;
