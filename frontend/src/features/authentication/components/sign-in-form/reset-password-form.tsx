import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import Alert from "@/components/alert/alert";
import Button from "@/components/button/button";
import TextField from "@/components/text-field/text-field";
import { useResetPasswordMutation } from "@/features/authentication/api/reset-password";
import classes from "./sign-in-form.module.css";

interface FormValues {
  password: string;
}

const defaultValues: FormValues = {
  password: "",
};

interface Props {
  resetToken: string;
}

const ResetPasswordForm = ({ resetToken }: Props) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
  });

  const resetPasswordMutation = useResetPasswordMutation();

  const onSubmit: SubmitHandler<FormValues> = async ({ password }) => {
    setSuccessMessage("");
    setErrorMessage("");

    const data = { password, token: resetToken };
    resetPasswordMutation.mutate(data, {
      onSuccess: () => {
        setSuccessMessage("Password changed successfully");
      },
      onError: () => {
        setErrorMessage("Something went wrong.");
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes["form"]}>
      <TextField
        type="password"
        placeholder="Password"
        error={!!errors.password?.message}
        helperText={errors.password?.message}
        {...register("password", { required: true })}
      />

      {successMessage ? (
        <Alert severity="success" className={classes["alert"]}>
          {successMessage}
        </Alert>
      ) : null}

      {successMessage ? (
        <Alert severity="error" className={classes["alert"]}>
          {errorMessage}
        </Alert>
      ) : null}

      <Button
        loading={resetPasswordMutation.isLoading}
        disabled={resetPasswordMutation.isLoading}
      >
        Reset your password
      </Button>
    </form>
  );
};

export default ResetPasswordForm;
