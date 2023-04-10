import { PropsWithChildren } from "react";
import styles from "./modal.module.css";

interface Props extends PropsWithChildren {
  isOpen: boolean;
  onClose: () => void;
}

const Modal = ({ children, isOpen, onClose }: Props) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      {/* backdrop */}
      <div className={styles.backdrop} onClick={onClose}></div>
      {/* content */}
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Modal;
