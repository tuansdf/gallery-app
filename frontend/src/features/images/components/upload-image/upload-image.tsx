import { ChangeEvent, useId } from "react";

import UploadIcon from "@/features/icons/upload-icon";
import { CreateImageRequest } from "@/features/images/image-types";
import { useCreateImageMutation } from "@/features/images/stores/images-api-slice";
import Button from "@/features/ui/button/button";
import classes from "./upload-image.module.css";

interface Props {
  albumId: string;
}

const UploadImage = ({ albumId }: Props) => {
  const inputId = useId();

  const [createImage, { isLoading: isUploading }] = useCreateImageMutation();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.target.files?.[0];
    if (!imageFile) return;
    try {
      const data: CreateImageRequest = {
        image: imageFile,
        albumId,
      };
      createImage(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form>
      <input
        className={classes["hidden"]}
        id={inputId}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={handleChange}
        disabled={isUploading}
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
