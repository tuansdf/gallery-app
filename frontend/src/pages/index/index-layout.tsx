import { Outlet } from "react-router-dom";

import AppBar from "@/features/menu/components/app-bar/app-bar";
import Sidebar from "@/features/menu/components/sidebar/sidebar";
import AppBarProvider from "@/features/menu/context/app-bar-provider";
import classes from "./index-layout.module.css";

const IndexLayout = () => {
  return (
    <div className={classes["main-layout"]}>
      <Sidebar />
      <div className={classes["right-outer-container"]}>
        <AppBarProvider>
          <AppBar />
          <div className={classes["right-inner-container"]}>
            <Outlet />
          </div>
        </AppBarProvider>
      </div>
    </div>
  );
};

export default IndexLayout;
