import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import Alert from "@/components/alert/alert";
import Button from "@/components/button/button";
import TextField from "@/components/text-field/text-field";
import { useForgotPasswordMutatioin } from "@/features/authentication/api/forgot-password";
import classes from "./sign-in-form.module.css";

const formSchema = z.object({
  email: z.string().email("Please provide your email"),
});

type FormValues = z.infer<typeof formSchema>;

const defaultValues: FormValues = {
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
    defaultValues,
    resolver: zodResolver(formSchema),
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
        type="email"
        label="Email"
        error={!!errors.email?.message}
        helperText={errors.email?.message}
        {...register("email")}
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
