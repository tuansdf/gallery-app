import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import Alert from "@/components/alert/alert";
import Button from "@/components/button/button";
import TextField from "@/components/text-field/text-field";
import { useCreateAlbumMutation } from "@/features/albums/api/create-album";
import classes from "./create-album-form.module.css";

const formSchema = z.object({
  name: z
    .string()
    .min(1, "Please provide a name for the album")
    .max(64, "Name is too long"),
});

type FormValues = z.infer<typeof formSchema>;

const defaultValues: FormValues = {
  name: "",
};

interface Props {
  onSuccess?: () => void;
}

const CreateAlbumForm = ({ onSuccess }: Props) => {
  const { register, handleSubmit, reset, setFocus } = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(formSchema),
  });

  const createAlbumMutation = useCreateAlbumMutation();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    createAlbumMutation.mutate(data, {
      onSuccess: () => {
        reset();
        onSuccess?.();
      },
    });
  };

  useEffect(() => {
    setFocus("name");
  }, [setFocus]);

  return (
    <form className={classes["form"]} onSubmit={handleSubmit(onSubmit)}>
      <TextField type="text" placeholder="Name" {...register("name")} />
      {createAlbumMutation.isError ? (
        <Alert severity="error">Something went wrong!</Alert>
      ) : null}
      <Button color="primary" loading={createAlbumMutation.isLoading}>
        Create
      </Button>
    </form>
  );
};

export default CreateAlbumForm;
