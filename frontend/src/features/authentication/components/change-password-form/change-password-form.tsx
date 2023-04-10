import { SubmitHandler, useForm } from "react-hook-form";

import { useState } from "react";
import styles from "./change-password-form.module.css";
import { useChangePasswordMutation } from "/src/features/authentication/stores/auth-api-slice";
import Alert from "/src/features/ui/alert/alert";
import Button from "/src/features/ui/button/button";
import TextField from "/src/features/ui/text-field/text-field";

interface FormInput {
  oldPassword: string;
  newPassword: string;
}

const initialValues: FormInput = {
  oldPassword: "",
  newPassword: "",
};

interface Props {
  email: string;
}

const ChangePasswordForm = ({ email }: Props) => {
  const [isError, setIsError] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const { register, handleSubmit, reset } = useForm<FormInput>({
    values: initialValues,
  });

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    setIsError(false);
    setIsSuccess(false);
    try {
      await changePassword({ ...data, email }).unwrap();
      setIsSuccess(true);
      reset();
    } catch (error) {
      console.error(error);
      setIsError(true);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <label htmlFor="">Email</label>
      <TextField type="text" value={email} readOnly />
      <label htmlFor="">Current Password</label>
      <TextField
        type="password"
        {...register("oldPassword", { required: true })}
      />
      <label htmlFor="">New Password</label>
      <TextField
        type="password"
        {...register("newPassword", { required: true })}
      />

      {isError || isSuccess ? (
        <div className={styles["alert-container"]}>
          {isError ? (
            <Alert variant="danger">Something went wrong.</Alert>
          ) : null}
          {isSuccess ? (
            <Alert variant="success">Password changed successfully</Alert>
          ) : null}
        </div>
      ) : null}

      <Button isLoading={isLoading}>Save</Button>
    </form>
  );
};

export default ChangePasswordForm;
