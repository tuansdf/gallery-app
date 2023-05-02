import { Outlet } from "react-router-dom";

import AppBar from "@/features/menu/app-bar/app-bar";
import Sidebar from "@/features/menu/sidebar/sidebar";
import classes from "./index-layout.module.css";

const IndexLayout = () => {
  return (
    <div className={classes["main-layout"]}>
      <Sidebar />
      <div className={classes["right-outer-container"]}>
        <AppBar />
        <div className={classes["right-inner-container"]}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default IndexLayout;
