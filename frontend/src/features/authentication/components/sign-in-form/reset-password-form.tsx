import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./sign-in-form.module.css";
import { useResetPasswordMutation } from "/src/features/authentication/stores/auth-api-slice";
import Button from "/src/features/ui/button/button";
import TextField from "/src/features/ui/text-field/text-field";

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

  const isError = errors.root?.message || errorMessage;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <TextField
        type="password"
        placeholder="Password"
        {...register("password", { required: true })}
      />
      {successMessage ? (
        <div className={styles.success}>{successMessage}</div>
      ) : null}
      {isError ? (
        <div className={styles["error-container"]}>
          {errors.password?.message ? (
            <div className={styles.error}>{errors.password.message}</div>
          ) : null}

          {errorMessage ? (
            <div className={styles.error}>{errorMessage}</div>
          ) : null}
        </div>
      ) : null}
      <Button isLoading={isLoading}>Reset your password</Button>
    </form>
  );
};

export default ResetPasswordForm;
