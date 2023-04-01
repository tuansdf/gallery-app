import styles from "./sign-in-page.module.css";
import ForgotPasswordForm from "/src/features/authentication/components/sign-in-form/forgot-password-form";

const ForgotPasswordPage = () => {
  return (
    <>
      <h1 className={styles.heading}>Reset your password</h1>
      <ForgotPasswordForm />
    </>
  );
};

export default ForgotPasswordPage;
