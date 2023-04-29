import { useDispatch, useSelector } from "react-redux";

import {
  logout,
  selectCurrentUser,
} from "@/features/authentication/stores/auth-slice";
import SidebarItem from "@/features/menu/sidebar-item/sidebar-item";
import clsx from "clsx";
import { useState } from "react";
import styles from "./sidebar.module.css";

const Sidebar = () => {
  const [isSidebarClosed, setIsSidebarClosed] = useState(false);
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  if (!user) return null;

  const toggleSidebar = () => {
    setIsSidebarClosed((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className={clsx(styles.main, { [styles.closed]: isSidebarClosed })}>
      <button onClick={toggleSidebar} className={styles["close-button"]}>
        {isSidebarClosed ? (
          // open
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          // close
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </button>
      <div className={styles.container}>
        {/* avatar */}
        <div className={styles.avatar}></div>
        {/* name */}
        <div
          className={styles.name}
        >{`${user.firstName} ${user.lastName}`}</div>

        <SidebarItem to="/" text="All Albums" />
        <SidebarItem to="/settings" text="Settings" />
        <SidebarItem type="button" onClick={handleLogout} text="Log out" />
      </div>
    </div>
  );
};

export default Sidebar;
