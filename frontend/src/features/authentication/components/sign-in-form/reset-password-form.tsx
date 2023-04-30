import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { useResetPasswordMutation } from "@/features/authentication/stores/auth-api-slice";
import Alert from "@/features/ui/alert/alert";
import Button from "@/features/ui/button/button";
import TextField from "@/features/ui/text-field/text-field";
import classes from "./sign-in-form.module.css";

interface FormInput {
  password: string;
}

const initialValues: FormInput = {
  password: "",
};

interface Props {
  resetToken: string;
}

const ResetPasswordForm = ({ resetToken }: Props) => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    values: initialValues,
  });

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const onSubmit: SubmitHandler<FormInput> = async ({ password }) => {
    setSuccessMessage("");
    setErrorMessage("");
    try {
      const data = { password, token: resetToken };
      await resetPassword(data).unwrap();
      setSuccessMessage("Password changed successfully");
    } catch (error) {
      console.error(error);
      setErrorMessage("Something went wrong.");
    }
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

      <Button loading={isLoading}>Reset your password</Button>
    </form>
  );
};

export default ResetPasswordForm;
