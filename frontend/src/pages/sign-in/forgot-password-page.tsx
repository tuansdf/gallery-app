import ForgotPasswordForm from "@/features/authentication/components/sign-in-form/forgot-password-form";
import Card from "@/features/ui/card/card";
import { Link } from "react-router-dom";
import classes from "./sign-in-page.module.css";

const ForgotPasswordPage = () => {
  return (
    <Card className={classes["card"]}>
      <h1 className={classes["heading"]}>Reset your password</h1>
      <ForgotPasswordForm />
      <div className={classes["notice-group"]}>
        <span className={classes["notice"]}>Go back to</span>{" "}
        <Link to="/sign-in">Sign In</Link>
      </div>
    </Card>
  );
};

export default ForgotPasswordPage;
