import { useDispatch } from "react-redux";

import HamburgerIcon from "@/features/icons/hamburger-icon";
import { toggleSidebar } from "@/features/menu/menu-store";
import Button from "@/features/ui/button/button";
import classes from "./app-bar.module.css";

const AppBar = () => {
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
    </div>
  );
};

export default AppBar;
