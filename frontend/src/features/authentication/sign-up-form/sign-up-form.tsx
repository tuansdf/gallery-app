import { useForm } from "react-hook-form";
import styles from "./sign-up-form.module.css";
import { ErrorMessage } from "/src/features/authentication/utils/constants";
import { FormRegex } from "/src/features/authentication/utils/validators";
import Button from "/src/features/ui/button/button";
import TextField from "/src/features/ui/text-field/text-field";

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
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormInput>({ values: initialValues });

  const onSubmit = () => {
    console.log("submitted");
  };

  const isAnyFieldError = Object.keys(errors).length !== 0;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <TextField
        type="text"
        placeholder="First Name"
        {...register("firstName", {
          required: {
            value: true,
            message: "Please enter your first name",
          },
        })}
      />
      <TextField
        type="text"
        placeholder="Last Name"
        {...register("lastName", {
          required: {
            value: true,
            message: "Please enter your last name",
          },
        })}
      />
      <TextField
        type="email"
        placeholder="Email"
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
        placeholder="Password"
        {...register("password", {
          required: {
            value: true,
            message: "Please enter a password",
          },
          pattern: {
            value: FormRegex.PASSWORD,
            message: ErrorMessage.PASSWORD,
          },
          validate: (value) =>
            value !== getValues("confirmPassword") &&
            "Confirm password does not match",
        })}
      />
      <TextField
        type="password"
        placeholder="Confirm your password"
        {...register("confirmPassword", {
          required: {
            value: true,
            message: "Please confirm your password",
          },
          validate: (value) =>
            value !== getValues("password") &&
            "Confirm password does not match",
        })}
      />
      {isAnyFieldError ? (
        <ul className={styles["error-container"]}>
          {errors.firstName?.message ? (
            <li className={styles.error}>{errors.firstName.message}</li>
          ) : null}
          {errors.lastName?.message ? (
            <li className={styles.error}>{errors.lastName.message}</li>
          ) : null}
          {errors.email?.message ? (
            <li className={styles.error}>{errors.email.message}</li>
          ) : null}
          {errors.password?.message ? (
            <li className={styles.error}>{errors.password.message}</li>
          ) : null}
          {errors.confirmPassword?.message &&
          errors.password?.message !== errors.confirmPassword.message ? (
            <li className={styles.error}>{errors.confirmPassword.message}</li>
          ) : null}
        </ul>
      ) : null}
      <Button>Sign Up</Button>
    </form>
  );
};

export default SignUpForm;
