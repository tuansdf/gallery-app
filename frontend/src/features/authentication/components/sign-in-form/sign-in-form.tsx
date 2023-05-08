import { SubmitHandler, useForm } from "react-hook-form";

import Alert from "@/components/alert/alert";
import Button from "@/components/button/button";
import TextField from "@/components/text-field/text-field";
import { useLoginMutation } from "@/features/authentication/api/login";
import { setAuthCredentials } from "@/features/authentication/stores/auth-store";
import { ErrorMessage } from "@/features/authentication/utils/constants";
import { FormRegex } from "@/features/authentication/utils/validators";
import { useState } from "react";
import classes from "./sign-in-form.module.css";

interface FormValues {
  email: string;
  password: string;
}

const defaultValues: FormValues = {
  email: "",
  password: "",
};

export default function SignInForm() {
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ defaultValues });

  const loginMutation = useLoginMutation();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setErrorMessage("");

    loginMutation.mutate(data, {
      onSuccess: (data) => {
        reset();
        setAuthCredentials(data);
      },
      onError: () => {
        setErrorMessage("Something went wrong!");
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes["form"]}>
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
            message: "Please enter your password",
          },
        })}
      />

      {errorMessage ? (
        <Alert severity="error" className={classes["alert"]}>
          {errorMessage}
        </Alert>
      ) : null}

      <Button
        loading={loginMutation.isLoading}
        disabled={loginMutation.isLoading}
      >
        Sign In
      </Button>
    </form>
  );
}
