import clsx from "clsx";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import { closeSidebar } from "@/features/menu/menu-store";
import useMediaQuery from "@/hooks/use-media-query";
import classes from "./sidebar-item.module.css";

interface Props {
  text: string;
  type?: "link" | "button";
  to?: string;
  onClick?: () => void;
}

const SidebarItem = ({ text, to, type = "link", onClick }: Props) => {
  const matches = useMediaQuery("(min-width: 1000px)");

  const dispatch = useDispatch();

  const handleLinkClick = () => {
    if (matches) return;
    dispatch(closeSidebar());
  };

  if (type === "button") {
    return (
      <button onClick={onClick} className={classes["item"]}>
        {text}
      </button>
    );
  }
  return (
    <NavLink
      to={to || "/"}
      className={({ isActive }) =>
        clsx(classes["item"], { [classes["active"]]: isActive })
      }
      onClick={handleLinkClick}
    >
      {text}
    </NavLink>
  );
};

export default SidebarItem;
