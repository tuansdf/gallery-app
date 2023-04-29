import { SubmitHandler, useForm } from "react-hook-form";

import { useState } from "react";
import styles from "./sign-up-form.module.css";
import { useRegisterMutation } from "@/features/authentication/stores/auth-api-slice";
import { ErrorMessage } from "@/features/authentication/utils/constants";
import { FormRegex } from "@/features/authentication/utils/validators";
import Button from "@/features/ui/button/button";
import TextField from "@/features/ui/text-field/text-field";

const initialValues = {
  email: "",
  password: "",
  confirmPassword: "",
  firstName: "",
  lastName: "",
};

interface FormInput {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

const SignUpForm = () => {
  const [requestError, setRequestError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<FormInput>({ values: initialValues });

  const [registerApi, { isLoading }] = useRegisterMutation();

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    setRequestError("");

    const { email, password, firstName, lastName } = data;
    try {
      await registerApi({
        email,
        password,
        firstName,
        lastName,
      }).unwrap();

      reset();
      setSuccessMessage(
        "Account has been registered. Please check your email to activate your account."
      );
    } catch (e) {
      setRequestError("Something went wrong.");
      console.error(e);
    }
  };

  const isAnyFieldError = Object.keys(errors).length !== 0 || requestError;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <TextField
        type="text"
        placeholder="First Name"
        {...register("firstName", {
          required: {
            value: true,
            message: "Please enter your first name",
          },
        })}
      />
      <TextField
        type="text"
        placeholder="Last Name"
        {...register("lastName", {
          required: {
            value: true,
            message: "Please enter your last name",
          },
        })}
      />
      <TextField
        type="email"
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
            message: "Please enter a password",
          },
          pattern: {
            value: FormRegex.PASSWORD,
            message: ErrorMessage.PASSWORD,
          },
        })}
      />

      {isAnyFieldError ? (
        <ul className={styles["error-container"]}>
          {errors.firstName?.message ? (
            <li className={styles.error}>{errors.firstName.message}</li>
          ) : null}
          {errors.lastName?.message ? (
            <li className={styles.error}>{errors.lastName.message}</li>
          ) : null}
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

      {successMessage ? (
        <div className={styles.success}>{successMessage}</div>
      ) : null}

      <Button isLoading={isLoading}>Sign Up</Button>
    </form>
  );
};

export default SignUpForm;
