import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { useForgotPasswordMutatioin } from "@/features/authentication/api/forgot-password";
import Alert from "@/features/ui/alert/alert";
import Button from "@/features/ui/button/button";
import TextField from "@/features/ui/text-field/text-field";
import classes from "./sign-in-form.module.css";

interface FormValues {
  email: string;
}

const initialValues: FormValues = {
  email: "",
};

const ForgotPasswordForm = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    values: initialValues,
  });

  const forgotPasswordMutation = useForgotPasswordMutatioin();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setErrorMessage("");
    setSuccessMessage("");

    forgotPasswordMutation.mutate(data, {
      onSuccess: () => {
        setSuccessMessage("Email sent. Please check your email to continue");
      },
      onError: () => {
        setErrorMessage("Something went wrong.");
      },
    });
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

      <Button
        loading={forgotPasswordMutation.isLoading}
        disabled={forgotPasswordMutation.isLoading}
      >
        Send password reset email
      </Button>
    </form>
  );
};

export default ForgotPasswordForm;
