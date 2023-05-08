import { Link } from "react-router-dom";

import Card from "@/components/card/card";
import ForgotPasswordForm from "@/features/authentication/components/sign-in-form/forgot-password-form";
import classes from "./sign-in-page.module.css";

const ForgotPasswordPage = () => {
  return (
    <Card className={classes["card"]}>
      <h1 className={classes["heading"]}>Reset your password</h1>
      <ForgotPasswordForm />
      <div className={classes["notice-container"]}>
        <span className={classes["notice"]}>Go back to</span>{" "}
        <Link to="/sign-in" className={classes["notice-link"]}>
          Sign In
        </Link>
      </div>
    </Card>
  );
};

export default ForgotPasswordPage;
