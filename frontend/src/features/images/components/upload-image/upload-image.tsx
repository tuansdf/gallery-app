import { ChangeEventHandler, useId } from "react";

import Button from "@/components/button/button";
import UploadIcon from "@/features/icons/upload-icon";
import { useCreateImageMutation } from "@/features/images/api/create-image";
import { useUploadImageActions } from "@/features/images/stores/upload-image-store";
import classes from "./upload-image.module.css";

interface Props {
  albumId: string;
}

const UploadImage = ({ albumId }: Props) => {
  const inputId = useId();

  const { startUploading, finishUploading } = useUploadImageActions();

  const createImageMutation = useCreateImageMutation(albumId);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const imageFile = event.target.files?.[0];
    if (!imageFile) return;
    const data = {
      image: imageFile,
      albumId,
    };
    startUploading();
    createImageMutation.mutate(data, { onSettled: () => finishUploading() });
  };

  return (
    <form>
      <input
        className={classes["hidden"]}
        id={inputId}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={handleChange}
        disabled={createImageMutation.isLoading}
      />
      <label htmlFor={inputId}>
        <Button variant="text" color="secondary" shape="circle" component="div">
          <UploadIcon className={classes["upload-icon"]} />
        </Button>
      </label>
    </form>
  );
};

export default UploadImage;
