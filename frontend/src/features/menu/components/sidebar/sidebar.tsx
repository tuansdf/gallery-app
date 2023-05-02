import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";

import {
  logout,
  selectCurrentUser,
} from "@/features/authentication/stores/auth-slice";
import BookIcon from "@/features/icons/book-icon";
import LogOutIcon from "@/features/icons/log-out-icon.tsx";
import SettingIcon from "@/features/icons/setting-icon.tsx";
import SidebarItem from "@/features/menu/components/sidebar-item/sidebar-item";
import {
  closeSidebar,
  selectIsSidebarOpen,
} from "@/features/menu/stores/menu-store";
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
          {/* info */}
          <div className={classes["info"]}>
            {/* avatar */}
            <div className={classes["info-avatar"]}></div>
            {/* name */}
            <div
              className={classes["info-name"]}
            >{`${user.firstName} ${user.lastName}`}</div>
          </div>

          <div className={classes["sidebar-items"]}>
            <SidebarItem
              leading={<BookIcon className={classes["sidebar-icon"]} />}
              to="/"
              text="All albums"
            />
            <SidebarItem
              leading={<SettingIcon className={classes["sidebar-icon"]} />}
              to="/settings"
              text="Settings"
            />
            <SidebarItem
              leading={<LogOutIcon className={classes["sidebar-icon"]} />}
              type="button"
              onClick={handleLogout}
              text="Log out"
            />
          </div>
        </div>
      </div>

      <Backdrop
        className={classes["backdrop"]}
        onClick={handleClose}
        role="button"
        show={isSidebarOpen}
      />
    </>
  );
};

export default Sidebar;
