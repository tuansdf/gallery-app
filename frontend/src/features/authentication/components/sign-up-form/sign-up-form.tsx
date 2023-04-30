import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { useRegisterMutation } from "@/features/authentication/stores/auth-api-slice";
import { ErrorMessage } from "@/features/authentication/utils/constants";
import { FormRegex } from "@/features/authentication/utils/validators";
import Alert from "@/features/ui/alert/alert";
import Button from "@/features/ui/button/button";
import TextField from "@/features/ui/text-field/text-field";
import classes from "./sign-up-form.module.css";

const initialValues = {
  email: "",
  password: "",
  confirmPassword: "",
  firstName: "",
  lastName: "",
};

interface FormInput {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

const SignUpForm = () => {
  const [requestError, setRequestError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<FormInput>({ values: initialValues });

  const [registerApi, { isLoading }] = useRegisterMutation();

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    setRequestError("");

    const { email, password, firstName, lastName } = data;
    try {
      await registerApi({
        email,
        password,
        firstName,
        lastName,
      }).unwrap();

      reset();
      setSuccessMessage(
        "Account has been registered. Please check your email to activate your account."
      );
    } catch (e) {
      setRequestError("Something went wrong.");
      console.error(e);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes["form"]}>
      <TextField
        type="text"
        label="First Name"
        error={!!errors.firstName?.message}
        helperText={errors.firstName?.message}
        containerClassName={classes["text-field"]}
        {...register("firstName", {
          required: {
            value: true,
            message: "Please enter your first name",
          },
        })}
      />
      <TextField
        type="text"
        label="Last Name"
        error={!!errors.lastName?.message}
        helperText={errors.lastName?.message}
        containerClassName={classes["text-field"]}
        {...register("lastName", {
          required: {
            value: true,
            message: "Please enter your last name",
          },
        })}
      />
      <TextField
        type="email"
        label="Email"
        error={!!errors.email?.message}
        helperText={errors.email?.message}
        containerClassName={classes["text-field"]}
        {...register("email", {
          required: {
            value: true,
            message: "Please enter your email",
          },
          pattern: {
            value: FormRegex.EMAIL,
            message: ErrorMessage.EMAIL,
          },
        })}
      />
      <TextField
        type="password"
        label="Password"
        error={!!errors.password?.message}
        helperText={errors.password?.message}
        containerClassName={classes["text-field"]}
        {...register("password", {
          required: {
            value: true,
            message: "Please enter a password",
          },
          pattern: {
            value: FormRegex.PASSWORD,
            message: ErrorMessage.PASSWORD,
          },
        })}
      />

      {requestError ? <Alert severity="error">{requestError}</Alert> : null}

      {successMessage ? (
        <Alert severity="success">{successMessage}</Alert>
      ) : null}

      <Button loading={isLoading}>Sign Up</Button>
    </form>
  );
};

export default SignUpForm;
