import clsx from "clsx";

import Backdrop from "@/components/backdrop/backdrop";
import {
  authLogout,
  useAuthUser,
} from "@/features/authentication/stores/auth-store";
import BookIcon from "@/features/icons/book-icon";
import LogOutIcon from "@/features/icons/log-out-icon.tsx";
import SettingIcon from "@/features/icons/setting-icon.tsx";
import SidebarItem from "@/features/menu/components/sidebar-item/sidebar-item";
import {
  useIsSidebarOpen,
  useSidebarActions,
} from "@/features/menu/stores/sidebar-store";
import classes from "./sidebar.module.css";

const Sidebar = () => {
  const authUser = useAuthUser();
  const isSidebarOpen = useIsSidebarOpen();
  const { closeSidebar } = useSidebarActions();

  if (!authUser) return null;

  const handleLogout = () => {
    authLogout();
  };
  const handleClose = () => {
    closeSidebar();
  };

  const userFullName = authUser.firstName + " " + authUser.lastName;

  return (
    <>
      <aside
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
            <div className={classes["info-name"]}>{userFullName}</div>
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
      </aside>

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
