import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";

import {
  logout,
  selectCurrentUser,
} from "@/features/authentication/stores/auth-slice";
import { closeSidebar, selectIsSidebarOpen } from "@/features/menu/menu-store";
import SidebarItem from "@/features/menu/sidebar-item/sidebar-item";
import Backdrop from "@/features/ui/backdrop/backdrop";
import classes from "./sidebar.module.css";

const Sidebar = () => {
  const isSidebarOpen = useSelector(selectIsSidebarOpen);
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  if (!user) return null;

  const handleLogout = () => {
    dispatch(logout());
  };
  const handleClose = () => {
    dispatch(closeSidebar());
  };

  return (
    <>
      <div
        className={clsx(classes["sidebar"], {
          [classes["closed"]]: !isSidebarOpen,
        })}
      >
        <div className={classes["container"]}>
          {/* avatar */}
          <div className={classes["avatar"]}></div>
          {/* name */}
          <div
            className={classes["name"]}
          >{`${user.firstName} ${user.lastName}`}</div>

          <SidebarItem to="/" text="All Albums" />
          <SidebarItem to="/settings" text="Settings" />
          <SidebarItem type="button" onClick={handleLogout} text="Log out" />
        </div>
      </div>

      {isSidebarOpen ? (
        <Backdrop className={classes["backdrop"]} onClick={handleClose} />
      ) : null}
    </>
  );
};

export default Sidebar;
