import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { useForgotPasswordMutation } from "@/features/authentication/stores/auth-api-slice";
import Alert from "@/features/ui/alert/alert";
import Button from "@/features/ui/button/button";
import TextField from "@/features/ui/text-field/text-field";
import classes from "./sign-in-form.module.css";

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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes["form"]}>
      <TextField
        type="text"
        label="Email"
        error={!!errors.email?.message}
        helperText={errors.email?.message}
        {...register("email", { required: true })}
      />

      {successMessage ? (
        <Alert severity="success" className={classes["alert"]}>
          {successMessage}
        </Alert>
      ) : null}

      {errorMessage ? (
        <Alert severity="error" className={classes["alert"]}>
          {errorMessage}
        </Alert>
      ) : null}

      <Button loading={isLoading}>Send password reset email</Button>
    </form>
  );
};

export default ForgotPasswordForm;
