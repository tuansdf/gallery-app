import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import Alert from "@/components/alert/alert";
import Button from "@/components/button/button";
import TextField from "@/components/text-field/text-field";
import { useLoginMutation } from "@/features/authentication/api/login";
import { setAuthCredentials } from "@/features/authentication/stores/auth-store";
import classes from "./sign-in-form.module.css";

const formSchema = z.object({
  email: z
    .string()
    .email("Please provide a valid email address")
    .max(64, "Email is too long"),
  password: z
    .string()
    .min(1, "Please provide a password")
    .max(64, "Password is too long"),
});

type FormValues = z.infer<typeof formSchema>;

const defaultValues: FormValues = {
  email: "",
  password: "",
};

export default function SignInForm() {
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ defaultValues, resolver: zodResolver(formSchema) });

  const loginMutation = useLoginMutation();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setErrorMessage("");

    loginMutation.mutate(data, {
      onSuccess: (data) => {
        reset();
        setAuthCredentials(data);
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
        error={!!errors.email?.message}
        helperText={errors.email?.message}
        containerClassName={classes["text-field"]}
        {...register("email")}
      />
      <TextField
        type="password"
        label="Password"
        error={!!errors.password?.message}
        helperText={errors.password?.message}
        containerClassName={classes["text-field"]}
        {...register("password")}
      />

      {errorMessage ? (
        <Alert severity="error" className={classes["alert"]}>
          {errorMessage}
        </Alert>
      ) : null}

      <Button
        loading={loginMutation.isLoading}
        disabled={loginMutation.isLoading}
      >
        Sign In
      </Button>
    </form>
  );
}
