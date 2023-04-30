import SignInForm from "@/features/authentication/components/sign-in-form/sign-in-form";
import Card from "@/features/ui/card/card";
import { Link } from "react-router-dom";
import classes from "./sign-in-page.module.css";

export default function SignInPage() {
  return (
    <Card className={classes.card}>
      <h1 className={classes.heading}>Welcome back</h1>
      <SignInForm />

      <div className={classes["notice-group"]}>
        <div className={classes.notice}>
          Don't have an account? <Link to="/sign-up">Sign Up</Link>
        </div>
        <div className={classes.notice}>
          <Link to="/forgot-password">Forgot your password?</Link>
        </div>
      </div>
    </Card>
  );
}
