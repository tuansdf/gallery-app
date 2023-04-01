import { Link } from "react-router-dom";
import styles from "./sign-in-page.module.css";
import SignInForm from "/src/features/authentication/components/sign-in-form/sign-in-form";

export default function SignInPage() {
  return (
    <>
      <h1 className={styles.heading}>Welcome back</h1>
      <SignInForm />

      <div className={styles["notice-group"]}>
        <div className={styles.notice}>
          Don't have an account? <Link to="/sign-up">Sign Up</Link>
        </div>
        <div className={styles.notice}>
          <Link to="/forgot-password">Forgot your password?</Link>
        </div>
      </div>
    </>
  );
}
