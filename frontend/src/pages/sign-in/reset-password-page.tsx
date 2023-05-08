import { Link, useSearchParams } from "react-router-dom";

import Alert from "@/components/alert/alert";
import Card from "@/components/card/card";
import ResetPasswordForm from "@/features/authentication/components/sign-in-form/reset-password-form";
import classes from "./sign-in-page.module.css";

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");
  if (!token) {
    return <Alert severity="error">Token invalid</Alert>;
  }

  return (
    <Card className={classes["card"]}>
      <h1 className={classes["heading"]}>Enter your new password</h1>
      <ResetPasswordForm resetToken={token} />
      <div className={classes["notice-container"]}>
        <span className={classes["notice"]}>Back to</span>{" "}
        <Link to="/sign-in">Sign In</Link>
      </div>
    </Card>
  );
};

export default ResetPasswordPage;
