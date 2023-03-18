import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./sign-in-form.module.css";
import { ErrorMessage } from "/src/features/authentication/utils/constants";
import {
  validateEmail,
  validatePassword,
} from "/src/features/authentication/utils/validators";
import Button from "/src/features/ui/button/button";
import TextField from "/src/features/ui/text-field/text-field";

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

  const validateAllFields = (): boolean => {
    resetAllErrors();

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid) {
      setEmailError(ErrorMessage.EMAIL);
    }
    if (!isPasswordValid) {
      setPasswordError(ErrorMessage.PASSWORD);
    }
    if (!isEmailValid || !isPasswordValid) {
      return false;
    }

    return true;
  };
  const resetAllErrors = (): void => {
    setEmailError("");
    setPasswordError("");
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isAllFieldsValid = validateAllFields();
    if (!isAllFieldsValid) {
      return;
    }
  };

  const isAnyFieldError = emailError || passwordError;

  return (
    <form onSubmit={handleSubmit} className={styles["input-container"]}>
      <TextField
        type="text"
        placeholder="Email"
        onChange={updateEmail}
        value={email}
      />
      <TextField
        type="password"
        placeholder="Password"
        onChange={updatePassword}
        value={password}
      />
      {isAnyFieldError ? (
        <ul className={styles["error-container"]}>
          {emailError ? <li className={styles.error}>{emailError}</li> : null}
          {passwordError ? (
            <li className={styles.error}>{passwordError}</li>
          ) : null}
        </ul>
      ) : null}
      <Button>Sign In</Button>
    </form>
  );
}
