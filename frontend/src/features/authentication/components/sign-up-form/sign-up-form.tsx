import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import Alert from "@/components/alert/alert";
import Button from "@/components/button/button";
import TextField from "@/components/text-field/text-field";
import { useRegisterMutation } from "@/features/authentication/api/register";
import classes from "./sign-up-form.module.css";

const formSchema = z.object({
  email: z
    .string()
    .email("Please provide a valid email address")
    .max(64, "Email is too long"),
  password: z
    .string()
    .min(8, "Password must have more than 8 characters")
    .max(64, "Password must have fewer than 64 characters"),
  lastName: z
    .string()
    .min(1, "Please provide your last name")
    .max(64, "Name is too long"),
  firstName: z
    .string()
    .min(1, "Please provide your first name")
    .max(64, "Name is too long"),
});

type FormValues = z.infer<typeof formSchema>;

const defaultValues: FormValues = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
};

const SignUpForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ defaultValues, resolver: zodResolver(formSchema) });

  const registerMutation = useRegisterMutation();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setErrorMessage("");
    setSuccessMessage("");

    registerMutation.mutate(data, {
      onSuccess: () => {
        reset();
        setSuccessMessage(
          "Account has been registered. Please check your email to activate your account."
        );
      },
      onError: () => {
        setErrorMessage("Something went wrong!");
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes["form"]}>
      <TextField
        type="text"
        label="First Name"
        error={!!errors.firstName?.message}
        helperText={errors.firstName?.message}
        containerClassName={classes["text-field"]}
        {...register("firstName")}
      />
      <TextField
        type="text"
        label="Last Name"
        error={!!errors.lastName?.message}
        helperText={errors.lastName?.message}
        containerClassName={classes["text-field"]}
        {...register("lastName")}
      />
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

      {errorMessage ? <Alert severity="error">{errorMessage}</Alert> : null}

      {successMessage ? (
        <Alert severity="success" className={classes["alert"]}>
          {successMessage}
        </Alert>
      ) : null}

      <Button
        loading={registerMutation.isLoading}
        disabled={registerMutation.isLoading}
      >
        Sign Up
      </Button>
    </form>
  );
};

export default SignUpForm;
