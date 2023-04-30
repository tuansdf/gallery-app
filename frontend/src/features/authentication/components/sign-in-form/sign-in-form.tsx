import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useLoginMutation } from "@/features/authentication/stores/auth-api-slice";
import { setCredentials } from "@/features/authentication/stores/auth-slice";
import { ErrorMessage } from "@/features/authentication/utils/constants";
import { FormRegex } from "@/features/authentication/utils/validators";
import Alert from "@/features/ui/alert/alert";
import Button from "@/features/ui/button/button";
import TextField from "@/features/ui/text-field/text-field";
import classes from "./sign-in-form.module.css";

const initialValues = {
  email: "",
  password: "",
};

interface FormInput {
  email: string;
  password: string;
}

export default function SignInForm() {
  const [requestError, setRequestError] = useState("");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInput>({ values: initialValues });

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    setRequestError("");

    const { email, password } = data;
    try {
      const data = await login({
        email,
        password,
      }).unwrap();

      dispatch(setCredentials(data));

      reset();
      navigate("/", { replace: true });
    } catch (e) {
      setRequestError("Email or password is wrong");
      console.error(e);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes["form"]}>
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
            message: "Please enter your password",
          },
          pattern: {
            value: FormRegex.PASSWORD,
            message: ErrorMessage.PASSWORD,
          },
        })}
      />

      {requestError ? (
        <Alert severity="error" className={classes["alert"]}>
          {requestError}
        </Alert>
      ) : null}

      <Button loading={isLoading}>Sign In</Button>
    </form>
  );
}
