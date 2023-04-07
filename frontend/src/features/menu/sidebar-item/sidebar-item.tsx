import clsx from "clsx";
import { NavLink } from "react-router-dom";
import styles from "./sidebar-item.module.css";

interface Props {
  text: string;
  type?: "link" | "button";
  to?: string;
  onClick?: () => void;
}

const SidebarItem = ({ text, to, type = "link", onClick }: Props) => {
  if (type === "button") {
    return (
      <button onClick={onClick} className={styles.main}>
        {text}
      </button>
    );
  }
  return (
    <NavLink
      to={to || "/"}
      className={({ isActive }) =>
        clsx(styles.main, { [styles.active]: isActive })
      }
    >
      {text}
    </NavLink>
  );
};

export default SidebarItem;
