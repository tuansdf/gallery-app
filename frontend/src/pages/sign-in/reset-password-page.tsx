import { useSearchParams } from "react-router-dom";
import styles from "./sign-in-page.module.css";
import ResetPasswordForm from "/src/features/authentication/components/sign-in-form/reset-password-form";

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");
  if (!token) {
    return <div className={styles.heading}>Token invalid</div>;
  }

  return (
    <>
      <h1 className={styles.heading}>Enter your new password</h1>
      <ResetPasswordForm resetToken={token} />
    </>
  );
};

export default ResetPasswordPage;
