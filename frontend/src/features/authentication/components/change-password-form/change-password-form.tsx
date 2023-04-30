import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { useChangePasswordMutation } from "@/features/authentication/stores/auth-api-slice";
import { ErrorMessage } from "@/features/authentication/utils/constants";
import { FormRegex } from "@/features/authentication/utils/validators";
import Alert from "@/features/ui/alert/alert";
import Button from "@/features/ui/button/button";
import TextField from "@/features/ui/text-field/text-field";
import classes from "./change-password-form.module.css";

interface FormValues {
  oldPassword: string;
  newPassword: string;
}

const initialValues: FormValues = {
  oldPassword: "",
  newPassword: "",
};

interface Props {
  email: string;
}

const ChangePasswordForm = ({ email }: Props) => {
  const [isError, setIsError] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    values: initialValues,
  });

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsError(false);
    setIsSuccess(false);
    try {
      await changePassword({ ...data, email }).unwrap();
      setIsSuccess(true);
      reset();
    } catch (error) {
      console.error(error);
      setIsError(true);
    }
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

      {isError ? (
        <Alert severity="error" className={classes["alert"]}>
          Something went wrong.
        </Alert>
      ) : null}
      {isSuccess ? (
        <Alert severity="success" className={classes["alert"]}>
          Password changed successfully
        </Alert>
      ) : null}

      <Button
        loading={isLoading}
        disabled={isLoading}
        className={classes["btn"]}
      >
        Save
      </Button>
    </form>
  );
};

export default ChangePasswordForm;
