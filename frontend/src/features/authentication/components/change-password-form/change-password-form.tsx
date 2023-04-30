import { SubmitHandler, useForm } from "react-hook-form";

import { useChangePasswordMutation } from "@/features/authentication/stores/auth-api-slice";
import Alert from "@/features/ui/alert/alert";
import Button from "@/features/ui/button/button";
import TextField from "@/features/ui/text-field/text-field";
import { useState } from "react";
import styles from "./change-password-form.module.css";

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
            <Alert severity="error">Something went wrong.</Alert>
          ) : null}
          {isSuccess ? (
            <Alert severity="success">Password changed successfully</Alert>
          ) : null}
        </div>
      ) : null}

      <Button loading={isLoading}>Save</Button>
    </form>
  );
};

export default ChangePasswordForm;
