import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./sign-in-form.module.css";
import Button from "/src/features/ui/button/button";
import TextField from "/src/features/ui/text-field/text-field";

// password with at least 8 characters, at least
// 1 uppercase letter, 1 lowercase letter, 1 number
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const EMAIL_ERR_MSG = "Please provide a valid email address";
const PASSWORD_ERR_MSG = `Please provide a password with at least\n
  - 8 characters\n
  - 1 uppercase letter\n
  - 1 lowercase letter\n
  - 1 number`;

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const updateEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const updatePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const validateEmail = (): boolean => {
    return EMAIL_REGEX.test(email);
  };
  const validatePassword = (): boolean => {
    return PASSWORD_REGEX.test(password);
  };
  const validateAllFields = (): boolean => {
    setEmailError("");
    setPasswordError("");

    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (!isEmailValid) {
      setEmailError(EMAIL_ERR_MSG);
    }
    if (!isPasswordValid) {
      setPasswordError(PASSWORD_ERR_MSG);
    }
    if (!isEmailValid || !isPasswordValid) {
      return false;
    }

    return true;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isAllFieldsValid = validateAllFields();
    if (!isAllFieldsValid) {
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles["input-container"]}>
      <TextField type="text" placeholder="Email" onChange={updateEmail} />
      <TextField
        type="password"
        placeholder="Password"
        onChange={updatePassword}
      />
      {emailError || passwordError ? (
        <div className={styles["error-container"]}>
          {emailError ? <div className={styles.error}>{emailError}</div> : null}
          {passwordError ? (
            <div className={styles.error}>{passwordError}</div>
          ) : null}
        </div>
      ) : null}
      <Button>Sign In</Button>
    </form>
  );
}
