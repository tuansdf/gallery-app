import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import Alert from "@/components/alert/alert";
import { useVerifyEmailMutation } from "@/features/authentication/api/verify-emaill";
import classes from "./verify-email-page.module.css";

const VerifyEmailPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";

  const verifyEmailMutation = useVerifyEmailMutation();

  useEffect(() => {
    const data = { token };
    verifyEmailMutation.mutate(data, {
      onSuccess: () => {
        setSuccessMessage("Your account has been verified");
      },
      onError: () => {
        setErrorMessage("Something went wrong!");
      },
    });
  }, []);

  return (
    <div className={classes["main"]}>
      {verifyEmailMutation.isLoading ? (
        <Alert severity="info">Loading...</Alert>
      ) : errorMessage ? (
        <Alert severity="error">Link is invalid</Alert>
      ) : successMessage ? (
        <Alert severity="success">Your account has been verified.</Alert>
      ) : null}
      <div className={classes["info"]}>
        Go back to <Link to="/sign-in">Sign In</Link>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
