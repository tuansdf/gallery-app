import SignUpForm from "@/features/authentication/components/sign-up-form/sign-up-form";
import Card from "@/features/ui/card/card";
import { Link } from "react-router-dom";
import classes from "./sign-up-page.module.css";

const SignUpPage = () => {
  return (
    <main className={classes["main"]}>
      <div className={classes["left"]}>
        <div className={classes["backdrop"]}></div>
        <div className={classes["contribution"]}>
          Photo by{" "}
          <a href="https://unsplash.com/@davidmarcu?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            David Marcu
          </a>{" "}
          on{" "}
          <a href="https://unsplash.com/images/nature?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Unsplash
          </a>
        </div>
      </div>

      <Card className={classes["right"]}>
        <h1 className={classes["heading"]}>Create your account</h1>
        <SignUpForm />
        <div className={classes["notice"]}>
          Have an account? <Link to="/sign-in">Sign In</Link>
        </div>
      </Card>
    </main>
  );
};

export default SignUpPage;
