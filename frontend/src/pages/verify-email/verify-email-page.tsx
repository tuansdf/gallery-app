import { Link, useSearchParams } from "react-router-dom";

import { useVerifyEmailQuery } from "@/features/authentication/stores/auth-api-slice";
import Alert from "@/features/ui/alert/alert";
import classes from "./verify-email-page.module.css";

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";

  const { isLoading, isError } = useVerifyEmailQuery({ token });

  if (isLoading) return <div className={classes["loading"]}>Loading...</div>;

  return (
    <div className={classes["main"]}>
      {isError ? (
        <Alert severity="error">Link is invalid</Alert>
      ) : (
        <Alert severity="success">Your account has been verified.</Alert>
      )}
      <div className={classes["info"]}>
        Go back to <Link to="/sign-in">Sign In</Link>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
