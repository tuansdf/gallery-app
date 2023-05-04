import clsx from "clsx";
import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

import { useSidebarActions } from "@/features/menu/stores/sidebar-store";
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

  const { closeSidebar } = useSidebarActions();

  const handleLinkClick = () => {
    if (matches) return;
    closeSidebar();
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
