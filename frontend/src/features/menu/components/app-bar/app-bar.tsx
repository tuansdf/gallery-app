import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import HamburgerIcon from "@/features/icons/hamburger-icon";
import { AppBarContext } from "@/features/menu/context/app-bar-provider";
import { selectAppBarTitle } from "@/features/menu/stores/app-bar-store";
import { toggleSidebar } from "@/features/menu/stores/menu-store";
import Button from "@/features/ui/button/button";
import classes from "./app-bar.module.css";

const AppBar = () => {
  const { trailing } = useContext(AppBarContext);

  const appBarTitle = useSelector(selectAppBarTitle);
  const dispatch = useDispatch();

  const handleMenuClick = () => {
    dispatch(toggleSidebar());
  };

  return (
    <div className={classes["app-bar"]}>
      <Button
        shape="circle"
        variant="text"
        color="secondary"
        className={classes["menu-button"]}
        onClick={handleMenuClick}
      >
        <HamburgerIcon className={classes["menu-icon"]} />
      </Button>

      <h1 className={classes["title"]}>{appBarTitle}</h1>

      <div className={classes["trailing"]}>{trailing}</div>
    </div>
  );
};

export default AppBar;
