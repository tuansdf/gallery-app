import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import styles from "./sign-in-form.module.css";
import { useLoginMutation } from "/src/features/authentication/stores/auth-api-slice";
import { setCredentials } from "/src/features/authentication/stores/auth-slice";
import { ErrorMessage } from "/src/features/authentication/utils/constants";
import { FormRegex } from "/src/features/authentication/utils/validators";
import Button from "/src/features/ui/button/button";
import TextField from "/src/features/ui/text-field/text-field";

const initialValues = {
  email: "",
  password: "",
};

interface FormInput {
  email: string;
  password: string;
}

export default function SignInForm() {
  const [requestError, setRequestError] = useState("");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInput>({ values: initialValues });

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    setRequestError("");

    const { email, password } = data;
    try {
      const data = await login({
        email,
        password,
      }).unwrap();

      dispatch(setCredentials(data));

      reset();
      navigate("/");
    } catch (e) {
      setRequestError("Email or password is wrong");
      console.error(e);
    }
  };

  const isAnyFieldError = Object.keys(errors).length !== 0 || requestError;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <TextField
        type="text"
        placeholder="Email"
        {...register("email", {
          required: {
            value: true,
            message: "Please enter your email",
          },
          pattern: {
            value: FormRegex.EMAIL,
            message: ErrorMessage.EMAIL,
          },
        })}
      />
      <TextField
        type="password"
        placeholder="Password"
        {...register("password", {
          required: {
            value: true,
            message: "Please enter your password",
          },
          pattern: {
            value: FormRegex.PASSWORD,
            message: ErrorMessage.PASSWORD,
          },
        })}
      />
      {isAnyFieldError ? (
        <ul className={styles["error-container"]}>
          {errors.email?.message ? (
            <li className={styles.error}>{errors.email.message}</li>
          ) : null}
          {errors.password?.message ? (
            <li className={styles.error}>{errors.password.message}</li>
          ) : null}
          {requestError ? (
            <li className={styles.error}>{requestError}</li>
          ) : null}
        </ul>
      ) : null}
      <Button isLoading={isLoading}>Sign In</Button>
    </form>
  );
}
