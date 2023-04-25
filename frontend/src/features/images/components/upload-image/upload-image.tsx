import { ChangeEvent, useId } from "react";

import styles from "./upload-image.module.css";
import { CreateImageRequest } from "/src/features/images/image-types";
import { useCreateImageMutation } from "/src/features/images/stores/images-api-slice";

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
        className={styles.hidden}
        id={inputId}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={handleChange}
        disabled={isUploading}
      />
      <label htmlFor={inputId} className={styles["create-btn"]}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
        </svg>
      </label>
    </form>
  );
};

export default UploadImage;
