import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./create-album-form.module.css";
import { useCreateAlbumMutation } from "/src/features/albums/stores/albums-api-slice";
import Alert from "/src/features/ui/alert/alert";
import Button from "/src/features/ui/button/button";
import TextField from "/src/features/ui/text-field/text-field";

type FormInputs = {
  name: string;
};

const initialValues: FormInputs = {
  name: "",
};

interface Props {
  onSuccess?: () => void;
}

const CreateAlbumForm = ({ onSuccess }: Props) => {
  const { register, handleSubmit, reset } = useForm<FormInputs>({
    values: initialValues,
  });

  const [createAlbum, { isLoading, isError }] = useCreateAlbumMutation();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      await createAlbum(data).unwrap();
      reset();
      onSuccess?.();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <TextField
        type="text"
        placeholder="Name"
        {...register("name", { required: true })}
      />
      {isError ? <Alert variant="danger">Something went wrong!</Alert> : null}
      <Button isLoading={isLoading}>Create</Button>
    </form>
  );
};

export default CreateAlbumForm;
