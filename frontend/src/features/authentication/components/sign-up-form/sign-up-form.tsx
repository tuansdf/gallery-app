import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import Alert from "@/components/alert/alert";
import Button from "@/components/button/button";
import TextField from "@/components/text-field/text-field";
import { useRegisterMutation } from "@/features/authentication/api/register";
import { ErrorMessage } from "@/features/authentication/utils/constants";
import { FormRegex } from "@/features/authentication/utils/validators";
import classes from "./sign-up-form.module.css";

interface FormValues {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

const defaultValues: FormValues = {
  email: "",
  password: "",
  confirmPassword: "",
  firstName: "",
  lastName: "",
};

const SignUpForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ defaultValues });

  const registerMutation = useRegisterMutation();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setErrorMessage("");
    setSuccessMessage("");

    registerMutation.mutate(data, {
      onSuccess: () => {
        reset();
        setSuccessMessage(
          "Account has been registered. Please check your email to activate your account."
        );
      },
      onError: () => {
        setErrorMessage("Something went wrong!");
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes["form"]}>
      <TextField
        type="text"
        label="First Name"
        error={!!errors.firstName?.message}
        helperText={errors.firstName?.message}
        containerClassName={classes["text-field"]}
        {...register("firstName", {
          required: {
            value: true,
            message: "Please enter your first name",
          },
        })}
      />
      <TextField
        type="text"
        label="Last Name"
        error={!!errors.lastName?.message}
        helperText={errors.lastName?.message}
        containerClassName={classes["text-field"]}
        {...register("lastName", {
          required: {
            value: true,
            message: "Please enter your last name",
          },
        })}
      />
      <TextField
        type="email"
        label="Email"
        error={!!errors.email?.message}
        helperText={errors.email?.message}
        containerClassName={classes["text-field"]}
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
        label="Password"
        error={!!errors.password?.message}
        helperText={errors.password?.message}
        containerClassName={classes["text-field"]}
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

      {errorMessage ? <Alert severity="error">{errorMessage}</Alert> : null}

      {successMessage ? (
        <Alert severity="success" className={classes["alert"]}>
          {successMessage}
        </Alert>
      ) : null}

      <Button
        loading={registerMutation.isLoading}
        disabled={registerMutation.isLoading}
      >
        Sign Up
      </Button>
    </form>
  );
};

export default SignUpForm;
