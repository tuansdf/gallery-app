import { useDispatch, useSelector } from "react-redux";

import styles from "./sidebar.module.css";
import {
  logout,
  selectCurrentUser,
} from "/src/features/authentication/stores/auth-slice";
import SidebarItem from "/src/features/menu/sidebar-item/sidebar-item";

const Sidebar = () => {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  if (!user) return null;

  const handleLogout = () => {
    dispatch(logout(""));
  };

  return (
    <div className={styles.main}>
      {/* avatar */}
      <div className={styles.avatar}></div>
      {/* name */}
      <div className={styles.name}>{`${user.firstName} ${user.lastName}`}</div>

      <SidebarItem to="/" text="All Albums" />
      <SidebarItem to="/settings" text="Settings" />
      <SidebarItem type="button" onClick={handleLogout} text="Log out" />
    </div>
  );
};

export default Sidebar;
