import { useForm } from "react-hook-form";
import styles from "./sign-in-form.module.css";
import { ErrorMessage } from "/src/features/authentication/utils/constants";
import { FormRegex } from "/src/features/authentication/utils/validators";
import Button from "/src/features/ui/button/button";
import TextField from "/src/features/ui/text-field/text-field";

const initialValues = {
  email: "",
  password: "",
};

interface FormInput {
  email: string;
  password: string;
}

export default function SignInForm() {
  const {
    register,
    handleSubmit,
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
            message: "Please enter your password",
          },
          pattern: {
            value: FormRegex.PASSWORD,
            message: ErrorMessage.PASSWORD,
          },
        })}
      />
      {isAnyFieldError ? (
        <ul className={styles["error-container"]}>
          {errors.email?.message ? (
            <li className={styles.error}>{errors.email.message}</li>
          ) : null}
          {errors.password?.message ? (
            <li className={styles.error}>{errors.password.message}</li>
          ) : null}
        </ul>
      ) : null}
      <Button>Sign In</Button>
    </form>
  );
}
