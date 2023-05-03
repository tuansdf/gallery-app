import { AnimatePresence, m } from "framer-motion";
import { PropsWithChildren } from "react";
import { createPortal } from "react-dom";

import Backdrop from "@/features/ui/backdrop/backdrop";
import Card from "@/features/ui/card/card";
import classes from "./modal.module.css";

interface Props extends PropsWithChildren {
  isOpen: boolean;
  onClose: () => void;
}

const Modal = ({ children, isOpen, onClose }: Props) => {
  return createPortal(
    <AnimatePresence>
      {isOpen ? (
        <m.div
          role="dialog"
          className={classes["modal"]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Backdrop
            onClick={onClose}
            className={classes["backdrop"]}
            role="button"
          />
          <Card className={classes["content"]}>{children}</Card>
        </m.div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
};

export default Modal;
