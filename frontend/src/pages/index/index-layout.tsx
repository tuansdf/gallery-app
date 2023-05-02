import { Outlet } from "react-router-dom";

import Sidebar from "@/features/menu/sidebar/sidebar";
import classes from "./index-layout.module.css";

const IndexLayout = () => {
  return (
    <div className={classes["main"]}>
      <Sidebar />
      <div className={classes["container"]}>
        <Outlet />
      </div>
    </div>
  );
};

export default IndexLayout;
