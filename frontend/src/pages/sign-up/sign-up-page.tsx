import { Link } from "react-router-dom";
import styles from "./sign-up-page.module.css";
import SignUpForm from "/src/features/authentication/sign-up-form/sign-up-form";

const SignUpPage = () => {
  return (
    <main className={styles.main}>
      <div className={styles.left}>
        <div className={styles.backdrop}></div>
        <div className={styles.contribution}>
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

      <div className={styles.right}>
        <h1 className={styles.heading}>Create your account</h1>
        <SignUpForm />
        <div className={styles.notice}>
          Have an account? <Link to="/sign-in">Sign In</Link>
        </div>
      </div>
    </main>
  );
};

export default SignUpPage;
