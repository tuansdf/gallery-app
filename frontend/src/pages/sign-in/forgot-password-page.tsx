import { Link } from "react-router-dom";
import styles from "./sign-in-page.module.css";
import ForgotPasswordForm from "/src/features/authentication/components/sign-in-form/forgot-password-form";

const ForgotPasswordPage = () => {
  return (
    <>
      <h1 className={styles.heading}>Reset your password</h1>
      <ForgotPasswordForm />
      <div className={styles["notice-group"]}>
        <span className={styles.notice}>Back to</span>{" "}
        <Link to="/sign-in">login</Link>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
