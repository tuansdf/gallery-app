import { PropsWithChildren } from "react";

import Card from "@/features/ui/card/card";
import classes from "./modal.module.css";

interface Props extends PropsWithChildren {
  isOpen: boolean;
  onClose: () => void;
}

const Modal = ({ children, isOpen, onClose }: Props) => {
  if (!isOpen) return null;

  return (
    <div className={classes["modal"]}>
      {/* backdrop */}
      <div className={classes["backdrop"]} onClick={onClose}></div>
      {/* content */}
      <Card className={classes["content"]}>{children}</Card>
    </div>
  );
};

export default Modal;
