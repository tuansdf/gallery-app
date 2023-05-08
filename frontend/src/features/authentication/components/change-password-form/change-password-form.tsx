import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import Alert from "@/components/alert/alert";
import Button from "@/components/button/button";
import TextField from "@/components/text-field/text-field";
import { useChangePasswordMutation } from "@/features/authentication/api/change-password";
import classes from "./change-password-form.module.css";

const formSchema = z.object({
  oldPassword: z
    .string()
    .min(1, "Please provide your current password")
    .max(64, "Password must have fewer than 64 characters"),
  newPassword: z
    .string()
    .min(8, "Password must have more than 8 characters")
    .max(64, "Password must have fewer than 64 characters"),
});

type FormValues = z.infer<typeof formSchema>;

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
    resolver: zodResolver(formSchema),
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
        {...register("oldPassword")}
      />
      <TextField
        type="password"
        label="New password"
        error={!!errors.newPassword?.message}
        helperText={errors.newPassword?.message}
        containerClassName={classes["text-field"]}
        {...register("newPassword")}
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
