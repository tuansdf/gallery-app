import { Link } from "react-router-dom";
import styles from "./sign-in-page.module.css";
import SignInForm from "/src/features/authentication/components/sign-in-form/sign-in-form";

export default function SignInPage() {
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
        <h1 className={styles.heading}>Welcome back</h1>
        <SignInForm />
        <span className={styles.notice}>
          Don't have an account? <Link to="/sign-up">Sign Up</Link>
        </span>
      </div>
    </main>
  );
}
