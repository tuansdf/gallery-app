import { Outlet } from "react-router-dom";
import styles from "./sign-in-page.module.css";

const SignInLayout = () => {
  return (
    <main className={styles.main}>
      <div className={styles.backdrop}></div>
      <div className={styles.contribution}>
        Photo by{" "}
        <a href="https://unsplash.com/@davidmarcu?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
          David Marcu
        </a>{" "}
        on{" "}
        <a href="https://unsplash.com/images/nature?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
          Unsplash
        </a>
      </div>

      <div className={styles["form-container"]}>
        <Outlet />
      </div>
    </main>
  );
};

export default SignInLayout;
