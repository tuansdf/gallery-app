import clsx from "clsx";
import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion";

import classes from "./backdrop.module.css";

interface Props extends HTMLMotionProps<"div"> {
  show?: boolean;
}

const Backdrop = ({ show = true, className, ...restProps }: Props) => {
  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={clsx(classes["backdrop"], className)}
          {...restProps}
        ></motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default Backdrop;
