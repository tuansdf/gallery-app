import { Outlet } from "react-router-dom";
import styles from "./index-layout.module.css";
import Sidebar from "/src/features/menu/sidebar/sidebar";

const IndexLayout = () => {
  return (
    <div className={styles.main}>
      <Sidebar />
      <div className={styles.container}>
        <Outlet />
      </div>
    </div>
  );
};

export default IndexLayout;
