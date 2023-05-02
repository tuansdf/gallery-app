import clsx from "clsx";
import { HTMLAttributes, PropsWithChildren } from "react";

import classes from "./card.module.css";

interface Props extends PropsWithChildren, HTMLAttributes<HTMLDivElement> {}

const Card = ({ children, className, ...restProps }: Props) => {
  return (
    <div className={clsx(classes["card"], className)} {...restProps}>
      {children}
    </div>
  );
};

export default Card;
