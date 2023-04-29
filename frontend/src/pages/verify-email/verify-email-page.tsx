import { Link, useSearchParams } from "react-router-dom";
import styles from "./verify-email-page.module.css";
import { useVerifyEmailQuery } from "@/features/authentication/stores/auth-api-slice";

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";

  const { isLoading, isError } = useVerifyEmailQuery({ token });

  if (isLoading) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.main}>
      {isError ? (
        <div className={styles.error}>Link is invalid</div>
      ) : (
        <div className={styles.success}>Your account has been verified.</div>
      )}
      <div className={styles.info}>
        Go back to <Link to="/sign-in">Sign In</Link>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
