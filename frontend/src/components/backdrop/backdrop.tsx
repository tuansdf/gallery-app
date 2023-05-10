import clsx from "clsx";
import { AnimatePresence, HTMLMotionProps, m } from "framer-motion";

import classes from "./backdrop.module.css";

interface Props extends HTMLMotionProps<"div"> {
  show?: boolean;
}

const Backdrop = ({
  show = true,
  className,
  children,
  ...restProps
}: Props) => {
  return (
    <AnimatePresence>
      {show ? (
        <m.div
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={clsx(classes["backdrop"], className)}
          {...restProps}
        >
          {children}
        </m.div>
      ) : null}
    </AnimatePresence>
  );
};

export default Backdrop;
