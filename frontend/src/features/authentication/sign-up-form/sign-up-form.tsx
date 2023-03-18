import { ChangeEvent, FormEvent, useState } from "react";

import styles from "./sign-up-form.module.css";
import { ErrorMessage } from "/src/features/authentication/utils/constants";
import {
  validateEmail,
  validatePassword,
} from "/src/features/authentication/utils/validators";
import Button from "/src/features/ui/button/button";
import TextField from "/src/features/ui/text-field/text-field";

const SignUpForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");

  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
  const [firstNameError, setFirstNameError] = useState<string>("");
  const [lastNameError, setLastNameError] = useState<string>("");

  const updateEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const updatePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const updateConfirmPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };
  const updateFirstName = (e: ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };
  const updateLastName = (e: ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  const validateAllFields = (): boolean => {
    resetAllErrors();

    let isAnyError = false;

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!firstName) {
      setFirstNameError("Please enter your first name");
      isAnyError = true;
    }
    if (!lastName) {
      setLastNameError("Please enter your last name");
      isAnyError = true;
    }
    if (!isEmailValid) {
      setEmailError(ErrorMessage.EMAIL);
      isAnyError = true;
    }
    if (!isPasswordValid) {
      setPasswordError(ErrorMessage.PASSWORD);
      isAnyError = true;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError("Confirm password does not match");
      isAnyError = true;
    }

    return isAnyError;
  };
  const resetAllErrors = () => {
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setFirstNameError("");
    setLastNameError("");
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isAllFieldsValid = validateAllFields();
    if (!isAllFieldsValid) {
      return;
    }

    console.log("submitted");
  };

  const isAnyFieldError =
    firstNameError ||
    lastNameError ||
    emailError ||
    passwordError ||
    confirmPasswordError;

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <TextField
        type="text"
        placeholder="First Name"
        onChange={updateFirstName}
        value={firstName}
      />
      <TextField
        type="text"
        placeholder="Last Name"
        onChange={updateLastName}
        value={lastName}
      />
      <TextField
        type="email"
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
      <TextField
        type="password"
        placeholder="Confirm your password"
        onChange={updateConfirmPassword}
        value={confirmPassword}
      />
      {isAnyFieldError ? (
        <ul className={styles["error-container"]}>
          {firstNameError ? (
            <li className={styles.error}>{firstNameError}</li>
          ) : null}
          {lastNameError ? (
            <li className={styles.error}>{lastNameError}</li>
          ) : null}
          {emailError ? <li className={styles.error}>{emailError}</li> : null}
          {passwordError ? (
            <li className={styles.error}>{passwordError}</li>
          ) : null}
          {confirmPasswordError ? (
            <li className={styles.error}>{confirmPasswordError}</li>
          ) : null}
        </ul>
      ) : null}
      <Button>Sign Up</Button>
    </form>
  );
};

export default SignUpForm;
