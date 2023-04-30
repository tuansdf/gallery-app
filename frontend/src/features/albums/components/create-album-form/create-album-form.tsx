import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { useCreateAlbumMutation } from "@/features/albums/stores/albums-api-slice";
import Alert from "@/features/ui/alert/alert";
import Button from "@/features/ui/button/button";
import TextField from "@/features/ui/text-field/text-field";
import styles from "./create-album-form.module.css";

type FormValues = {
  name: string;
};

const initialValues: FormValues = {
  name: "",
};

interface Props {
  onSuccess?: () => void;
}

const CreateAlbumForm = ({ onSuccess }: Props) => {
  const { register, handleSubmit, reset, setFocus } = useForm<FormValues>({
    values: initialValues,
  });

  const [createAlbum, { isLoading, isError }] = useCreateAlbumMutation();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      await createAlbum(data).unwrap();
      reset();
      onSuccess?.();
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    setFocus("name");
  }, [setFocus]);

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <TextField
        type="text"
        placeholder="Name"
        {...register("name", { required: true })}
      />
      {isError ? <Alert severity="error">Something went wrong!</Alert> : null}
      <Button loading={isLoading}>Create</Button>
    </form>
  );
};

export default CreateAlbumForm;
