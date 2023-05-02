import clsx from "clsx";
import { ReactNode } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import { closeSidebar } from "@/features/menu/stores/menu-store";
import useMediaQuery from "@/hooks/use-media-query";
import classes from "./sidebar-item.module.css";

interface Props {
  text: string;
  type?: "link" | "button";
  to?: string;
  leading?: ReactNode;
  onClick?: () => void;
}

const SidebarItem = ({ text, to, type = "link", leading, onClick }: Props) => {
  const matches = useMediaQuery("(min-width: 1000px)");

  const dispatch = useDispatch();

  const handleLinkClick = () => {
    if (matches) return;
    dispatch(closeSidebar());
  };

  if (type === "button") {
    return (
      <button onClick={onClick} className={classes["item"]}>
        {leading}
        <span>{text}</span>
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
      {leading}
      <span>{text}</span>
    </NavLink>
  );
};

export default SidebarItem;
