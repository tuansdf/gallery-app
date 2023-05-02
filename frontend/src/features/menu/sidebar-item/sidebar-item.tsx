import clsx from "clsx";
import { NavLink } from "react-router-dom";

import classes from "./sidebar-item.module.css";

interface Props {
  text: string;
  type?: "link" | "button";
  to?: string;
  onClick?: () => void;
}

const SidebarItem = ({ text, to, type = "link", onClick }: Props) => {
  if (type === "button") {
    return (
      <button onClick={onClick} className={classes["main"]}>
        {text}
      </button>
    );
  }
  return (
    <NavLink
      to={to || "/"}
      className={({ isActive }) =>
        clsx(classes["main"], { [classes["active"]]: isActive })
      }
    >
      {text}
    </NavLink>
  );
};

export default SidebarItem;
