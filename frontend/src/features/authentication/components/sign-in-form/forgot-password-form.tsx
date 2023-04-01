import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./sign-in-form.module.css";
import { useForgotPasswordMutation } from "/src/features/authentication/stores/auth-api-slice";
import Button from "/src/features/ui/button/button";
import TextField from "/src/features/ui/text-field/text-field";

interface FormInput {
  email: string;
}

const initialValues: FormInput = {
  email: "",
};

const ForgotPasswordForm = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    values: initialValues,
  });

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    setErrorMessage("");
    setSuccessMessage("");
    try {
      await forgotPassword(data).unwrap();
      setSuccessMessage("Email sent. Please check your email to continue");
    } catch (error) {
      console.error(error);
      setErrorMessage("Something went wrong.");
    }
  };

  const isError = errors.root?.message || errorMessage;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <TextField
        type="text"
        placeholder="Email"
        {...register("email", { required: true })}
      />
      {successMessage ? (
        <div className={styles.success}>{successMessage}</div>
      ) : null}
      {isError ? (
        <div className={styles["error-container"]}>
          {errors.email?.message ? (
            <div className={styles.error}>{errors.email.message}</div>
          ) : null}

          {errorMessage ? (
            <div className={styles.error}>{errorMessage}</div>
          ) : null}
        </div>
      ) : null}
      <Button isLoading={isLoading}>Send password reset email</Button>
    </form>
  );
};

export default ForgotPasswordForm;
