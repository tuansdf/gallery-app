import { AnimatePresence, m } from "framer-motion";
import { PropsWithChildren } from "react";

import Backdrop from "@/features/ui/backdrop/backdrop";
import Card from "@/features/ui/card/card";
import classes from "./modal.module.css";

interface Props extends PropsWithChildren {
  isOpen: boolean;
  onClose: () => void;
}

const Modal = ({ children, isOpen, onClose }: Props) => {
  return (
    <AnimatePresence>
      {isOpen ? (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={classes["modal"]}
        >
          {/* backdrop */}
          <Backdrop onClick={onClose} className={classes["backdrop"]} />
          {/* content */}
          <Card className={classes["content"]}>{children}</Card>
        </m.div>
      ) : null}
    </AnimatePresence>
  );
};

export default Modal;
