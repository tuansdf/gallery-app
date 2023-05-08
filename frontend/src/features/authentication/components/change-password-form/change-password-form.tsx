import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import Alert from "@/components/alert/alert";
import Button from "@/components/button/button";
import TextField from "@/components/text-field/text-field";
import { useChangePasswordMutation } from "@/features/authentication/api/change-password";
import { ErrorMessage } from "@/features/authentication/utils/constants";
import { FormRegex } from "@/features/authentication/utils/validators";
import classes from "./change-password-form.module.css";

interface FormValues {
  oldPassword: string;
  newPassword: string;
}

const defaultValues: FormValues = {
  oldPassword: "",
  newPassword: "",
};

interface Props {
  email: string;
}

const ChangePasswordForm = ({ email }: Props) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
  });

  const changePasswordMutation = useChangePasswordMutation();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setErrorMessage("");
    setSuccessMessage("");

    changePasswordMutation.mutate(data, {
      onSuccess: () => {
        reset();
        setSuccessMessage("Password changed successfully.");
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
        value={email}
        readOnly
        disabled
        containerClassName={classes["text-field"]}
      />
      <TextField
        type="password"
        label="Current password"
        error={!!errors.oldPassword?.message}
        helperText={errors.oldPassword?.message}
        containerClassName={classes["text-field"]}
        {...register("oldPassword", {
          required: {
            value: true,
            message: "Please enter your password",
          },
        })}
      />
      <TextField
        type="password"
        label="New password"
        error={!!errors.newPassword?.message}
        helperText={errors.newPassword?.message}
        containerClassName={classes["text-field"]}
        {...register("newPassword", {
          required: {
            value: true,
            message: "Please enter a new password",
          },
          pattern: {
            value: FormRegex.PASSWORD,
            message: ErrorMessage.PASSWORD,
          },
        })}
      />

      {errorMessage ? (
        <Alert severity="error" className={classes["alert"]}>
          {errorMessage}
        </Alert>
      ) : null}
      {successMessage ? (
        <Alert severity="success" className={classes["alert"]}>
          {successMessage}
        </Alert>
      ) : null}

      <Button
        loading={changePasswordMutation.isLoading}
        disabled={changePasswordMutation.isLoading}
        className={classes["btn"]}
      >
        Save
      </Button>
    </form>
  );
};

export default ChangePasswordForm;
