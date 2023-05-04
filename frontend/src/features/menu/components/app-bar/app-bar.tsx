import { useContext } from "react";

import HamburgerIcon from "@/features/icons/hamburger-icon";
import { AppBarContext } from "@/features/menu/context/app-bar-provider";
import { useAppBarTitle } from "@/features/menu/stores/app-bar-store";
import { useSidebarActions } from "@/features/menu/stores/sidebar-store";
import Button from "@/features/ui/button/button";
import classes from "./app-bar.module.css";

const AppBar = () => {
  const { trailing } = useContext(AppBarContext);

  const appBarTitle = useAppBarTitle();
  const { toggleSidebar } = useSidebarActions();

  const handleSidebarClick = () => {
    toggleSidebar();
  };

  return (
    <div className={classes["app-bar"]}>
      <Button
        shape="circle"
        variant="text"
        color="secondary"
        className={classes["menu-button"]}
        onClick={handleSidebarClick}
      >
        <HamburgerIcon className={classes["menu-icon"]} />
      </Button>

      <h1 className={classes["title"]}>{appBarTitle}</h1>

      <div className={classes["trailing"]}>{trailing}</div>
    </div>
  );
};

export default AppBar;
