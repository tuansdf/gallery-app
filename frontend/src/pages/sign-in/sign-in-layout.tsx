import { Outlet } from "react-router-dom";
import classes from "./sign-in-layout.module.css";

const SignInLayout = () => {
  return (
    <main className={classes.main}>
      <div className={classes.backdrop}></div>
      <div className={classes.contribution}>
        Photo by{" "}
        <a href="https://unsplash.com/@davidmarcu?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
          David Marcu
        </a>{" "}
        on{" "}
        <a href="https://unsplash.com/images/nature?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
          Unsplash
        </a>
      </div>

      <div className={classes["form-container"]}>
        <Outlet />
      </div>
    </main>
  );
};

export default SignInLayout;
